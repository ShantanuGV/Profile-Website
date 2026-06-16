import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); 
    // idle | sending | sent

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSend = (e) => {
        e.preventDefault();

        if (status === 'sending') return;

        setStatus('sending');

        const subject = `Portfolio Message from ${formData.name}`;
        const body = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
        `;

        const mailtoLink = `mailto:shantnuvispute+web@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // open email client
        window.location.href = mailtoLink;

        // show success after small delay
        setTimeout(() => {
            setStatus('sent');
        }, 1200);

        // reset after 3 sec
        setTimeout(() => {
            setStatus('idle');
        }, 4000);
    };

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

                    <h2 className="section-title">
                        <span className="highlight">What's Next?</span>
                    </h2>

                    <h2 className="contact-title">Get In Touch</h2>

                    <p className="contact-text">
                        I'm always open for opportunities or just a friendly hello.
                    </p>

                    <form className="contact-form" onSubmit={handleSend}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="message"
                            rows="6"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="btn contact-btn"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending'
                                ? 'Sending...'
                                : status === 'sent'
                                ? 'Message Sent ✓'
                                : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
