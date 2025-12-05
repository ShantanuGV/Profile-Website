import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative' }}
                >
                    <div className="section-highlight-number">01</div>
                    <h2 className="section-title"><span className="highlight">About Me</span></h2>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p>
                            Hello! I'm Shantanu, a Computer Engineering student who loves creating things that live in the digital universe.
                            My journey into development began when I first started experimenting with HTML, JavaScript, Python, C/C++, and Java — and I quickly discovered how exciting it is to bring ideas to life through code.
                        </p>
                        <br />
                        <p>
                            Over time, I’ve explored from game development and system-level projects to AI-based tools and interactive concepts. I've been learning about AI agents and experimenting with how they can solve real problems across different domains.
                        </p>
                        <br />
                    </motion.div>

                    <motion.div
                        className="about-img"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="img-wrapper">
                            <img src="Doma.jpg" alt="Shantanu Vispute" className="img-placeholder" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
