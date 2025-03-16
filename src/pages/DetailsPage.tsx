
import React from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import PageHeading from '@/components/PageHeading';
import AnimatedSection from '@/components/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Shirt } from 'lucide-react';

const DetailsPage: React.FC = () => {
  const { weddingDetails } = useWedding();
  
  const formattedDate = new Date(weddingDetails.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time (assuming format is HH:MM in 24h format)
  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const amPm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${amPm}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <PageHeading
        title="Wedding Details"
        subtitle="Everything you need to know about our special day."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Date & Time */}
        <AnimatedSection>
          <Card className="h-full border-wedding-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-wedding-accent/10 text-wedding-accent mb-6 mx-auto">
                <CalendarDays size={28} />
              </div>
              <h3 className="font-serif text-2xl text-center text-wedding-dark mb-4">Date & Time</h3>
              <div className="text-center">
                <p className="text-lg font-medium text-wedding-dark">{formattedDate}</p>
                <p className="text-wedding-dark/80 mb-4">{formatTime(weddingDetails.time)}</p>
                <Button 
                  variant="outline" 
                  className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent/10"
                  onClick={() => {
                    // Create calendar event URL
                    const event = {
                      text: `${weddingDetails.groomName} & ${weddingDetails.brideName}'s Wedding`,
                      dates: `${weddingDetails.date.replace(/-/g, '')}T${weddingDetails.time.replace(':', '')}00`,
                      location: `${weddingDetails.venue}, ${weddingDetails.location}`,
                    };
                    
                    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}/${event.dates}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent('We look forward to celebrating with you!')}`, '_blank');
                  }}
                >
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        {/* Location */}
        <AnimatedSection delay={100}>
          <Card className="h-full border-wedding-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-wedding-accent/10 text-wedding-accent mb-6 mx-auto">
                <MapPin size={28} />
              </div>
              <h3 className="font-serif text-2xl text-center text-wedding-dark mb-4">Venue</h3>
              <div className="text-center">
                <p className="text-lg font-medium text-wedding-dark">{weddingDetails.venue}</p>
                <p className="text-wedding-dark/80 mb-4">{weddingDetails.location}</p>
                <Button 
                  variant="outline" 
                  className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent/10"
                  onClick={() => {
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(`${weddingDetails.venue}, ${weddingDetails.location}`)}`, '_blank');
                  }}
                >
                  View Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        {/* Schedule */}
        <AnimatedSection delay={200}>
          <Card className="h-full border-wedding-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-wedding-accent/10 text-wedding-accent mb-6 mx-auto">
                <Clock size={28} />
              </div>
              <h3 className="font-serif text-2xl text-center text-wedding-dark mb-4">Schedule</h3>
              <div className="space-y-4">
                <div className="border-b border-wedding-accent/20 pb-2">
                  <p className="font-medium text-wedding-dark">2:30 PM</p>
                  <p className="text-wedding-dark/80">Guest Arrival</p>
                </div>
                <div className="border-b border-wedding-accent/20 pb-2">
                  <p className="font-medium text-wedding-dark">3:00 PM</p>
                  <p className="text-wedding-dark/80">Ceremony Begins</p>
                </div>
                <div className="border-b border-wedding-accent/20 pb-2">
                  <p className="font-medium text-wedding-dark">4:00 PM</p>
                  <p className="text-wedding-dark/80">Cocktail Hour</p>
                </div>
                <div>
                  <p className="font-medium text-wedding-dark">5:00 PM</p>
                  <p className="text-wedding-dark/80">Reception & Dinner</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        {/* Dress Code */}
        <AnimatedSection delay={300}>
          <Card className="h-full border-wedding-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-wedding-accent/10 text-wedding-accent mb-6 mx-auto">
                <Shirt size={28} />
              </div>
              <h3 className="font-serif text-2xl text-center text-wedding-dark mb-4">Dress Code</h3>
              <div className="text-center">
                <p className="text-lg font-medium text-wedding-dark mb-2">{weddingDetails.dressCode}</p>
                <p className="text-wedding-dark/80">
                  We invite you to dress in formal attire to celebrate our special day. 
                  For men, suits or tuxedos are appropriate. For women, cocktail dresses 
                  or formal gowns are suggested.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
      
      {/* Additional Information */}
      <AnimatedSection delay={400} className="mt-12 max-w-4xl mx-auto">
        <Card className="border-wedding-accent/30">
          <CardContent className="p-6">
            <h3 className="font-serif text-2xl text-center text-wedding-dark mb-6">Additional Information</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl text-wedding-dark mb-2">Accommodations</h4>
                <p className="text-wedding-dark/80">
                  For guests traveling from out of town, we have reserved a block of rooms at 
                  the Grand Hotel. Please mention our wedding when booking to receive the special rate.
                </p>
              </div>
              
              <div>
                <h4 className="font-serif text-xl text-wedding-dark mb-2">Transportation</h4>
                <p className="text-wedding-dark/80">
                  Parking is available at the venue. We will also be providing shuttle service from 
                  the Grand Hotel to the venue and back. Shuttles will depart from the hotel lobby 
                  at 2:00 PM.
                </p>
              </div>
              
              <div>
                <h4 className="font-serif text-xl text-wedding-dark mb-2">Weather</h4>
                <p className="text-wedding-dark/80">
                  The ceremony and reception will be held indoors, but there may be outdoor 
                  photo opportunities. April in Butuan City is typically warm and pleasant, 
                  but we recommend bringing a light jacket for the evening.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
};

export default DetailsPage;
