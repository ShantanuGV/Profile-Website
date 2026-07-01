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

    const handleSend = async (e) => {
    e.preventDefault();

    if (status === "sending") return;

    setStatus("sending");

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to send");
        }

        setStatus("sent");

        setFormData({
            name: "",
            email: "",
            message: "",
        });

        setTimeout(() => {
            setStatus("idle");
        }, 4000);

    } catch (err) {
        console.error(err);
        alert("Failed to send message.");
        setStatus("idle");
    }
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
