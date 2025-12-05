import React from 'react';
import { motion } from 'framer-motion';
import CanvasModel from '../components/CanvasModel';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="hero-greeting">Hi, my name is</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1 className="hero-title">Shantanu Gopal Vispute.</h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="hero-subtitle">I build Digital Universes.</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p className="hero-description">
                            I'm a Computer Engineering student passionate about coding, technology, and crafting exceptional digital experiences.
                            <br />
                            Currently studying at Guru Gobind Singh College of Engineering and Research Center.
                            <CanvasModel />
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="hero-btns"
                    >
                        <a href="./Web_CV.pdf" download="Shantanu_Vispute_CV.pdf" className="btn">
                            Download my CV
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-model"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
