
import React, { useState, useEffect } from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const { weddingDetails, isAdmin } = useWedding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/details', label: 'Details' },
    { path: '/rsvp', label: 'RSVP' },
    { path: '/registry', label: 'Registry' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl text-wedding-dark">
          {weddingDetails.groomName} & {weddingDetails.brideName}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-wedding-dark hover:text-wedding-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent hover:text-white">
                Admin
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-wedding-dark" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-xl text-wedding-dark hover:text-wedding-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4"
            >
              <Button variant="outline" className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent hover:text-white">
                Admin
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
