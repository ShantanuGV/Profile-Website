import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            company: 'Curiosity',
            role: 'Aspiring Software Engineer',
            date: 'Jun 2005 - Present',
            points: [
                'Still waiting for my first internship/official job.',
                'Until then, I work for curiosity.',
            ],
        },
    ];

    return (
        <section id="experience" className="section experience-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative' }}
                >
                    <div className="section-highlight-number">03</div>
                    <h2 className="section-title"><span className="highlight">Where I've Worked</span></h2>
                </motion.div>

                <div className="experience-list">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="experience-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="exp-role">{exp.role} <span className="highlight">@ {exp.company}</span></h3>
                            <p className="exp-date">{exp.date}</p>
                            <ul className="exp-points">
                                {exp.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
