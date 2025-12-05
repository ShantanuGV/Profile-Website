import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {

    const a = <a href="Snake and Ladder.zip" target="_blank"></a>

    const projects = [
        {
            title: 'Certificate Download Portal',
            description: 'A web-based portal that allows students or users to securely view and download certificates. Includes search functionality, a clean UI, and instant file retrieval.',
            tech: ['HTML', 'CSS', 'JavaScript', 'React'],
            github: 'https://github.com/ShantanuGV/Workshope_Website',
            external: 'https://workshopewebsitegcoerc.vercel.app/',
        },
        {
            title: 'Snake & Ladder Game',
            description: 'A fun, fully interactive Snake and Ladder game built using Pygame. Features dice animations, player movement, snakes, ladders, and a simple UI that makes gameplay engaging.',
            tech: ['Pygame', 'Python'],
            github: 'https://github.com/ShantanuGV/SnakesAndLadders',
            external: '#',
        },
    ];

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative' }}
                >
                    <div className="section-highlight-number">04</div>
                    <h2 className="section-title"><span className="highlight">Some Things I've Built</span></h2>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <div className="project-description">
                                    <p>{project.description}</p>
                                </div>
                                <ul className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <li key={i}>{tech}</li>
                                    ))}
                                </ul>
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                                    <a href={project.external} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
