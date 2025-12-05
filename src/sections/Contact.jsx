import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container contact-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="contact-content"
                    style={{ position: 'relative' }}
                >
                    <div className="section-highlight-number">05</div>
                    <h2 className="section-title"><span className="highlight">What's Next?</span></h2>
                    <h2 className="contact-title">Get In Touch</h2>
                    <p className="contact-text">
                        I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shantnuvispute%2Bweb%40gmail.com&su=Hello!" className="btn contact-btn" target="_blank">Say Hello</a>
                </motion.div>
            </div>
        </section >
    );
};

export default Contact;
