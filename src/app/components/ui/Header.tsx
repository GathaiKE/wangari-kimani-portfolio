"use client"

import React, { useState, useEffect, useRef } from 'react';
import {
  FaInfinity,
  FaSun,
  FaMoon,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaKaggle,
  FaDiscord
} from 'react-icons/fa';
import { useTheme } from '@/app/context/themeContext';
import { Social, Route } from '@/app/interfaces';
import { FaX } from 'react-icons/fa6';
import { SiGooglecolab } from 'react-icons/si';


interface HeaderProps {
  routes: Route[];
  socials: Social
}
const Header = (componentData: HeaderProps) => {
  const { darkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {socials, routes}=componentData

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleSmoothScroll: EventListener = (e) => {
      e.preventDefault();

      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href')?.replace('#', '');
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      setIsMenuOpen(false);
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <header
        className={`fixed top-0 w-full z-50 py-5 backdrop-blur-md transition-all duration-300 ${isScrolled
            ? 'bg-surface/80 dark:bg-surface-dark/80 shadow-lg'
            : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Hamburger menu button on LEFT */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
                }`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1.5'
                }`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></div>
            </button>

            {/* Theme Toggle Button - visible on mobile now */}
            <button
              onClick={toggleTheme}
              className="text-text dark:text-text-dark text-xl hover:text-primary dark:hover:text-primary-dark transition-all duration-300 hover:rotate-[30deg] md:hidden"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Logo on RIGHT */}
          <div className="flex items-center text-2xl font-bold text-primary textglow-primary dark:text-primary-dark">
            <FaInfinity className="mr-2 glow-icon" />
            <span>Wangari Kimani</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {routes.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.path.toLowerCase()}`}
                    className="text-text dark:text-text-dark font-medium hover:text-primary dark:hover:text-primary-dark transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary dark:after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.path}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme toggle for desktop */}
          <div className="hidden md:block">
            <button
              onClick={toggleTheme}
              className="text-text dark:text-text-dark text-xl hover:text-primary dark:hover:text-primary-dark transition-all duration-300 hover:rotate-[30deg]"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Slides in from LEFT */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-surface dark:bg-surface-dark shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="p-6 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
            {/* Logo in menu header */}
            <div className="flex items-center text-xl font-bold text-primary dark:text-primary-dark">
              <FaInfinity className="mr-2" />
              <span>Wangari</span>
            </div>

            {/* Close button on right */}
            <button
              className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-4 px-4">
              {routes.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.path.toLowerCase()}`}
                    className="block py-3 px-4 rounded-lg text-text dark:text-text-dark font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.path}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons at Bottom */}
          <div className="p-6 border-t border-gray-300 dark:border-gray-700">
            <div className="flex justify-center space-x-6">
              {[
                { icon: <FaLinkedin />, link:  socials.linkedIn },
                { icon: <FaGithub />, link:  socials.github },
                { icon: <FaKaggle />, link:  socials.kaggle },
                { icon: <SiGooglecolab />, link:  socials.colab },
                { icon: <FaDiscord />, link:  socials.discord },
                { icon: <FaX />, link:  socials.twitter }
              ].filter(item => ((item.link && item.link.trim() !== ''))).slice(0,3).map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
                  aria-label="GitHub"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;