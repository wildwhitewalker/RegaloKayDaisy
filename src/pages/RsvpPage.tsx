
import React, { useState } from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import PageHeading from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const RSVPSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  attending: z.enum(['yes', 'no']),
  numberOfGuests: z.coerce.number().min(0).max(10),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type RSVPFormData = z.infer<typeof RSVPSchema>;

const RsvpPage: React.FC = () => {
  const { weddingDetails, addGuestResponse } = useWedding();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(RSVPSchema),
    defaultValues: {
      name: '',
      email: '',
      attending: 'yes',
      numberOfGuests: 0,
      dietaryRestrictions: '',
      message: '',
    },
  });

  const onSubmit = (data: RSVPFormData) => {
    addGuestResponse({
      name: data.name,
      email: data.email,
      attending: data.attending === 'yes',
      numberOfGuests: data.numberOfGuests,
      dietaryRestrictions: data.dietaryRestrictions || '',
      message: data.message || '',
    });
    
    setSubmitted(true);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const isAttending = form.watch('attending') === 'yes';

  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <PageHeading
        title="RSVP"
        subtitle="We would be delighted to have you join us on our special day. Please let us know if you'll be able to attend."
      />

      {submitted ? (
        <AnimatedSection className="max-w-lg mx-auto text-center">
          <Card className="border-wedding-accent/30">
            <CardContent className="pt-8 pb-6 px-6">
              <h3 className="font-serif text-2xl text-wedding-dark mb-4">Thank You!</h3>
              <p className="text-wedding-dark/80 mb-6">
                Your RSVP has been received. We're looking forward to celebrating with you!
              </p>
              <Button 
                variant="outline" 
                className="border-wedding-accent text-wedding-accent hover:bg-wedding-accent/10"
                onClick={() => setSubmitted(false)}
              >
                Submit another response
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      ) : (
        <AnimatedSection className="max-w-lg mx-auto">
          <Card className="border-wedding-accent/30">
            <CardContent className="pt-8 pb-6 px-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="attending"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Will you be attending?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" />
                              <Label htmlFor="yes">Yes, I'll be there</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" />
                              <Label htmlFor="no">Sorry, I can't make it</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isAttending && (
                    <>
                      <FormField
                        control={form.control}
                        name="numberOfGuests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of additional guests</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="10" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Not including yourself
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dietaryRestrictions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dietary Restrictions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please let us know of any dietary restrictions or allergies..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share a message or well wishes for the couple..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wedding-accent hover:bg-wedding-accent/90 text-white"
                  >
                    Submit RSVP
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}
      
      <AnimatedSection delay={200} className="max-w-lg mx-auto mt-12 text-center">
        <p className="text-wedding-dark/70">
          Please RSVP by <strong>{new Date(new Date(weddingDetails.date).setMonth(new Date(weddingDetails.date).getMonth() - 1)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
        </p>
        <p className="mt-2 text-wedding-dark/70">
          If you have any questions, please contact us at <a href="mailto:wedding@example.com" className="text-wedding-accent hover:underline">wedding@example.com</a>
        </p>
      </AnimatedSection>
    </div>
  );
};

export default RsvpPage;
