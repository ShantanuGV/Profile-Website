import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

import About from '../sections/About';
import Contact from '../sections/Contact';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleClick = () => setNav(!nav);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { id: 'about', link: 'About', href: '/about' },
        { id: 'skills', link: 'Skills', href: '/skills' },
        { id: 'projects', link: 'Projects', href: '/projects' },
        { id: 'experience', link: 'Experience', href: '/experience' },
        { id: 'contact', link: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${nav ? 'menu-active' : ''}`}>
            <div className="navbar-container">
                <div className="logo">
                    <a href="/">Shantanu</a>
                </div>

                <ul className="nav-menu">
                    {links.map(({ id, link, href }) => (
                        <li key={id} className="nav-item">
                            <Link
                                to={id}
                                smooth={true}
                                duration={500}
                                className="nav-link"
                                href={href}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hamburger" onClick={handleClick}>
                    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>
            </div>

            <div className={nav ? 'mobile-menu active' : 'mobile-menu'}>
                <ul>
                    {links.map(({ id, link, href }) => (
                        <li key={id} className="mobile-nav-item">
                            <Link
                                onClick={handleClick}
                                to={id}
                                smooth={true}
                                duration={500}
                                href={href}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
