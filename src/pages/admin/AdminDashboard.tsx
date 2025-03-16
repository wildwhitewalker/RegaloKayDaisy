
import React from 'react';
import PageHeading from '@/components/PageHeading';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { weddingDetails, guestResponses } = useWedding();
  
  const totalGuests = guestResponses.reduce((acc, response) => {
    return response.attending ? acc + response.numberOfGuests : acc;
  }, 0);
  
  return (
    <div>
      <PageHeading title="Admin Dashboard" subtitle="Welcome to your wedding dashboard" center={false} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Wedding Details</CardTitle>
            <CardDescription>Key information about your special day</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{weddingDetails.brideName} & {weddingDetails.groomName}</p>
            <p>{new Date(weddingDetails.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p>{weddingDetails.venue}, {weddingDetails.location}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/details'}>
              Edit Details
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>RSVP Status</CardTitle>
            <CardDescription>Guest response summary</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalGuests} Attending</p>
            <p>{guestResponses.length} Responses received</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/guests'}>
              View Guest List
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
            <CardDescription>Shared photos and videos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Manage Gallery</p>
            <p>Review and moderate uploaded content</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/gallery'}>
              View Gallery
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
