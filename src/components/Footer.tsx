
import React from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { weddingDetails } = useWedding();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-wedding-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl text-wedding-dark mb-2">
            {weddingDetails.groomName} & {weddingDetails.brideName}
          </h2>
          <p className="text-wedding-dark/70">
            {new Date(weddingDetails.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        
        <div className="flex justify-center space-x-8 mb-8">
          <Link to="/" className="text-wedding-dark hover:text-wedding-accent transition-colors">
            Home
          </Link>
          <Link to="/our-story" className="text-wedding-dark hover:text-wedding-accent transition-colors">
            Our Story
          </Link>
          <Link to="/details" className="text-wedding-dark hover:text-wedding-accent transition-colors">
            Details
          </Link>
          <Link to="/rsvp" className="text-wedding-dark hover:text-wedding-accent transition-colors">
            RSVP
          </Link>
          <Link to="/registry" className="text-wedding-dark hover:text-wedding-accent transition-colors">
            Registry
          </Link>
          <Link to="/gallery" className="text-wedding-dark hover:text-wedding-accent transition-colors">
            Gallery
          </Link>
        </div>
        
        <div className="text-center text-wedding-dark/60 text-sm">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-wedding-accent" /> for our special day
          </p>
          <p className="mt-1">© {currentYear} | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
