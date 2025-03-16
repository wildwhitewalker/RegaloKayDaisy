
import React from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import PageHeading from '@/components/PageHeading';
import AnimatedSection from '@/components/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Gift } from 'lucide-react';

const RegistryPage: React.FC = () => {
  const { giftRegistry } = useWedding();
  
  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <PageHeading
        title="Gift Registry"
        subtitle="Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've created a registry to help guide you."
      />
      
      <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-wedding-dark/80">
          We're grateful for your love and support as we begin this new chapter of our lives together.
        </p>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {giftRegistry.map((item, index) => (
          <AnimatedSection key={item.id} delay={index * 100}>
            <Card className="h-full border-wedding-accent/30 overflow-hidden">
              {item.image && (
                <div className="h-52 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500" 
                  />
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl text-wedding-dark mb-3">{item.title}</h3>
                <p className="text-wedding-dark/80 mb-6">{item.description}</p>
                
                {item.link ? (
                  <Button 
                    variant="outline" 
                    className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent/10"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Registry
                  </Button>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="bg-wedding-primary/20 rounded-lg p-4 w-full max-w-xs mx-auto mb-4">
                      <p className="text-center text-wedding-dark font-medium">Bank Transfer Details</p>
                      <p className="text-center text-wedding-dark/80 text-sm mt-2">
                        Bank: Example Bank<br />
                        Account Name: Reg & Daisy<br />
                        Account Number: XXXX-XXXX-XXXX
                      </p>
                    </div>
                    <div className="bg-wedding-primary/20 rounded-lg p-4 w-full max-w-xs mx-auto">
                      <p className="text-center text-wedding-dark font-medium mb-2">Or Scan QR Code</p>
                      <div className="w-32 h-32 mx-auto bg-white p-2 rounded-md shadow-sm">
                        <img 
                          src="/placeholder.svg" 
                          alt="Payment QR Code" 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
      
      <AnimatedSection delay={300} className="mt-12 max-w-3xl mx-auto text-center">
        <Card className="border-wedding-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-wedding-accent/10 text-wedding-accent mb-6 mx-auto">
              <Gift size={28} />
            </div>
            <h3 className="font-serif text-2xl text-wedding-dark mb-4">Other Gift Ideas</h3>
            <p className="text-wedding-dark/80">
              If you prefer to give a physical gift not listed in our registry, 
              we would appreciate items that reflect your thoughtfulness and relationship with us. 
              Handmade gifts, keepsakes, or anything that comes from the heart would be cherished.
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
};

export default RegistryPage;
