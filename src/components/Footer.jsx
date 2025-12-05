import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://github.com/ShantanuGV" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/shantanu-vispute-0b3b3332b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://x.com/ShantnuGV/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shantnuvispute%2Bweb%40gmail.com" target="_blank"><FaEnvelope /></a>
            </div>
            <p className="footer-text">
                Designed & Built by Shantanu Gopal Vispute
            </p>
        </footer>
    );
};

export default Footer;
