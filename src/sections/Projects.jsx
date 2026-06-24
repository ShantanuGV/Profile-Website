import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const sliderRef = useRef(null);
    const pauseAutoScroll = useRef(false);

    const [activeDot, setActiveDot] = useState(0);

const projects = [
    {
        title: "Certificate Download Portal",
        description:
            "A web-based portal that allows students to securely view and download certificates.",
        tech: [
            "HTML", "CSS", "JavaScript", "React"
        ],
        github:
            "https://github.com/ShantanuGV/Workshope_Website",
        external: "https://workshopewebsitegcoerc.vercel.app/",
        image:
            "/Workshope_Website.webp",
        featured: true
    },

    {
        title: "Carbon Emission Forecasting",
        description:
            "A CO₂ emission forecasting dashboard that visualizes environmental data, predicts future emission trends, and tracks sustainability targets through interactive analytics and data-driven insights.",
        tech: [
            "Python", "Data Analysis", "Forecasting", "Dashboard"
        ],
        github:
            "https://github.com/ShantanuGV/Carbon-Emission-Forecasting",
        external:
            "https://carbon-emission-forecasting.onrender.com/",
        image:
            "Caobon.webp",
        featured: true
    },

    {
        title: "Snakes And Ladders",
        description:
            "A fully interactive Snake & Ladder game built using Pygame.",
        tech: [
            "Python",
            "Pygame"
        ],
        github:
            "https://github.com/ShantanuGV/SnakesAndLadders",
        
        image:
            "/SnakesAndLadders.webp",
        featured: false
    },
    {
  title: "CuresYou",
  description: "An art platform that transforms a user's name into unique large-scale typography inspired by real-world geographic features and satellite imagery, creating personalized visual artworks from natural patterns.",
  tech: ["Python", "AI", "Computer Vision", "Image Processing"],
  github:
            "https://github.com/ShantanuGV/CuresYou",
        external: "",
        image:
            "/curseyou.webp",
  external: "https://curesyou.vercel.app/",
  featured: true
},
{
  title: "Vhagar",
  description: "A desktop AI agent built with Python that can perform intelligent automation tasks, assist users with workflows, and serve as a foundation for advanced AI-powered desktop interactions.",
  tech: ["Python", "AI", "Automation"],
  github:
            "https://github.com/ShantanuGV/Vhagar",
        
        image:
            "/vhagar.webp",
  external: "",
  featured: true
}
];



    const duplicatedProjects =
        projects.length > 0
            ? [...projects]
            : [];


    const scrollToProject = (index) => {

        if (!sliderRef.current) return;


        pauseAutoScroll.current = true;


        const firstCard =
            sliderRef.current.querySelector(
                '.project-card'
            );


        if (!firstCard) return;


        const cardWidth =
            firstCard.offsetWidth + 25;


        sliderRef.current.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth',
        });


        setActiveDot(index);


        setTimeout(() => {
            pauseAutoScroll.current = false;
        }, 3000);
    };



    // AUTO SCROLL
    // AUTO SCROLL
useEffect(() => {

    const autoScroll = setInterval(() => {

        const slider = sliderRef.current;

        if (!slider) return;

        if (pauseAutoScroll.current) return;


        const card =
            slider.querySelector(".project-card");


        if (!card) return;


        const cardWidth =
            card.getBoundingClientRect().width + 25;


        const nextPosition =
            slider.scrollLeft + cardWidth;



        if (
            nextPosition >=
            slider.scrollWidth - slider.clientWidth
        ) {

            slider.scrollTo({
                left: 0,
                behavior: "smooth"
            });


            setActiveDot(0);

        } else {

            slider.scrollTo({
                left: nextPosition,
                behavior: "smooth"
            });


            setActiveDot(prev =>
                prev + 1 >= projects.length
                    ? 0
                    : prev + 1
            );

        }


    }, 2500);


    return () => clearInterval(autoScroll);


}, [projects]);



    return (

<section
id="projects"
className="section projects-section"
>

<div className="container">


<motion.div

initial={{
    opacity:0,
    y:20
}}

whileInView={{
    opacity:1,
    y:0
}}

transition={{
    duration:0.5
}}

viewport={{
    once:true
}}

style={{
    position:'relative'
}}

>


<div className="section-highlight-number">
03
</div>


<h2 className="section-title">

<span className="highlight">
Some Things I've Built
</span>

</h2>


</motion.div>





<div className="projects-slider-wrapper">


<div

className="projects-slider"

ref={sliderRef}


onMouseEnter={() =>
    pauseAutoScroll.current = true
}


onMouseLeave={() =>
    pauseAutoScroll.current = false
}

>


{
duplicatedProjects.map(
(project,index)=>(


<motion.div

key={index}

className="project-card"

initial={{
    opacity:0,
    y:20
}}

whileInView={{
    opacity:1,
    y:0
}}

whileHover={{
    y:-12,
    scale:1.03
}}

transition={{
    duration:0.35
}}

viewport={{
    once:true
}}

>


<img

src={
project.image ||
"https://picsum.photos/600/400"
}

alt={project.title}

className="project-image"

loading="lazy"

/>



<div className="project-content">


<h3 className="project-title">
{project.title}
</h3>



<p className="project-description">
{project.description}
</p>




<ul className="project-tech">


{
(project.tech || [])
.map(
(t,i)=>(

<li key={i}>
{t}
</li>

))
}


</ul>




<div className="project-links">


{
project.github &&

<a
href={project.github}
target="_blank"
rel="noopener noreferrer"
>

<FaGithub />

</a>

}



{
project.external &&

<a

href={project.external}

target="_blank"

rel="noopener noreferrer"

>

<FaExternalLinkAlt />

</a>

}



</div>



</div>



</motion.div>


))

}



</div>





<div className="slider-dots">


{
projects.map(
(_,index)=>(


<button

key={index}


className={
`dot ${
activeDot===index
?'active-dot'
:''
}`}


onClick={() =>
scrollToProject(index)
}


/>


))

}


</div>



</div>


</div>


</section>

);

};


export default Projects;
