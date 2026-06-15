export default async function handler(req, res) {
    const GITHUB_USERNAME = 'ShantanuGV';

    try {
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        );

        const repos = await reposResponse.json();

        const projects = [];

        for (const repo of repos) {
            try {
                const contentsResponse = await fetch(
                    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contents`
                );

                const contents = await contentsResponse.json();

                if (!Array.isArray(contents)) continue;

                const jsonFile = contents.find(
                    (file) =>
                        file.name.endsWith('.json') &&
                        file.name !== 'package.json'
                );

                if (!jsonFile) continue;

                const jsonResponse = await fetch(jsonFile.download_url);
                const projectData = await jsonResponse.json();

                const imageFile = contents.find((file) =>
                    /\.(webp|png|jpg|jpeg)$/i.test(file.name)
                );

                projects.push({
                    ...projectData,

                    github: repo.html_url,

                    image: imageFile
                        ? imageFile.download_url
                        : '/images/project-placeholder.png',
                });
            } catch (err) {
                console.error(
                    `Failed processing repo ${repo.name}`,
                    err
                );
            }
        }

        projects.sort((a, b) => {
            if (a.order && b.order)
                return a.order - b.order;

            return 0;
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to fetch projects',
        });
    }
}
