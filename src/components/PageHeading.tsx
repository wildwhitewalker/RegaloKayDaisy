
import React from 'react';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-3 text-gradient animate-fade-in">
        {title}
      </h1>
      {subtitle && (
        <p className="text-wedding-dark/80 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1 bg-wedding-accent mx-auto mt-6 rounded-full animate-fade-in" style={{ animationDelay: '0.3s' }}></div>
    </div>
  );
};

export default PageHeading;
