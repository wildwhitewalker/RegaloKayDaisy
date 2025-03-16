
import React from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import PageHeading from '@/components/PageHeading';
import AnimatedSection from '@/components/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

const OurStoryPage: React.FC = () => {
  const { storyEvents } = useWedding();
  
  // Sort events chronologically
  const sortedEvents = [...storyEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <PageHeading
        title="Our Story"
        subtitle="How our journey of love began and the special moments that brought us here."
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Timeline */}
        <div className="relative border-l-2 border-wedding-accent/40 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-8 md:pl-0">
          {sortedEvents.map((event, index) => (
            <AnimatedSection
              key={event.id}
              delay={index * 100}
              className="mb-12 md:mb-16 md:w-1/2 md:clear-right relative timeline-item"
            >
              <div className={`md:float-${index % 2 === 0 ? 'left' : 'right'} md:pr-8 md:pl-0 ${index % 2 !== 0 ? 'md:translate-x-full md:pr-0 md:pl-8' : ''}`}>
                <Card className="border-wedding-accent/30 overflow-hidden">
                  {event.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500" 
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center text-wedding-accent mb-2">
                      <CalendarDays size={16} className="mr-2" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-wedding-dark mb-3">{event.title}</h3>
                    <p className="text-wedding-dark/80">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;
