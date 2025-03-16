
import React from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '@/contexts/WeddingContext';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import AnimatedSection from '@/components/AnimatedSection';
import { Calendar, MapPin, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  const { weddingDetails } = useWedding();
  
  // Format the wedding date
  const formattedDate = new Date(weddingDetails.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <>
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(/placeholder.svg)',
        }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-wedding-dark/80 mb-3 animate-fade-in">
            We're Getting Married
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl text-wedding-dark mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {weddingDetails.groomName} <span className="text-wedding-accent">&</span> {weddingDetails.brideName}
          </h1>
          
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl text-wedding-dark mb-2">
              {formattedDate}
            </p>
            <p className="text-lg md:text-xl text-wedding-dark/80">
              {weddingDetails.venue}, {weddingDetails.location}
            </p>
          </div>
          
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CountdownTimer />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Link to="/rsvp">
              <Button className="bg-wedding-accent hover:bg-wedding-accent/90 text-white px-8 py-6">
                RSVP Now
              </Button>
            </Link>
            <Link to="/details">
              <Button variant="outline" className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent/10 px-8 py-6">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Welcome Section */}
      <section className="py-20 px-4 bg-wedding-secondary/50">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-wedding-dark">
              Welcome to Our Wedding Celebration
            </h2>
            <p className="text-lg text-wedding-dark/80 mb-8 max-w-3xl mx-auto">
              We're thrilled to celebrate our special day with our closest friends and family. 
              We've created this website to share all the details about our wedding day and 
              help you prepare for the celebration.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <AnimatedSection delay={100} className="bg-white p-6 rounded-lg shadow-md text-center">
              <Calendar className="mx-auto mb-4 text-wedding-accent" size={36} />
              <h3 className="font-serif text-xl mb-3 text-wedding-dark">The Big Day</h3>
              <p className="text-wedding-dark/70">
                {formattedDate} at {weddingDetails.time.substring(0, 5)}
              </p>
              <Link to="/details" className="inline-block mt-4 text-wedding-accent hover:underline">
                See All Details
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="mx-auto mb-4 text-wedding-accent" size={36} />
              <h3 className="font-serif text-xl mb-3 text-wedding-dark">The Venue</h3>
              <p className="text-wedding-dark/70">
                {weddingDetails.venue}, {weddingDetails.location}
              </p>
              <Link to="/details" className="inline-block mt-4 text-wedding-accent hover:underline">
                View Map
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={300} className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="mx-auto mb-4 text-wedding-accent" size={36} />
              <h3 className="font-serif text-xl mb-3 text-wedding-dark">Our Story</h3>
              <p className="text-wedding-dark/70">
                Learn about our journey and how we fell in love
              </p>
              <Link to="/our-story" className="inline-block mt-4 text-wedding-accent hover:underline">
                Read Our Story
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* RSVP Call to Action */}
      <section className="py-20 px-4 bg-wedding-primary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-wedding-dark">
              Will You Join Us?
            </h2>
            <p className="text-lg text-wedding-dark/80 mb-8 max-w-3xl mx-auto">
              We hope you can celebrate with us! Please let us know if you'll be attending by 
              submitting your RSVP.
            </p>
            <Link to="/rsvp">
              <Button className="bg-wedding-accent hover:bg-wedding-accent/90 text-white px-8 py-6 mt-4">
                RSVP Now
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default HomePage;
