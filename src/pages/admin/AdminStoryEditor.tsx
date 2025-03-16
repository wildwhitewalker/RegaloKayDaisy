
import React, { useState } from 'react';
import PageHeading from '@/components/PageHeading';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

const AdminStoryEditor = () => {
  const { storyEvents, addStoryEvent, removeStoryEvent } = useWedding();
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    description: '',
    image: '/placeholder.svg'
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      addStoryEvent(newEvent);
      setNewEvent({
        date: '',
        title: '',
        description: '',
        image: '/placeholder.svg'
      });
    }
  };

  return (
    <div>
      <PageHeading title="Our Story Editor" subtitle="Add and edit important moments in your journey" center={false} />
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input 
                type="date" 
                value={newEvent.date} 
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                placeholder="Event Title" 
                value={newEvent.title} 
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                placeholder="Describe this moment..." 
                value={newEvent.description} 
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                placeholder="Image URL (optional)" 
                value={newEvent.image} 
                onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddEvent} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Timeline
          </Button>
        </CardFooter>
      </Card>
      
      <h3 className="text-xl font-semibold mb-4">Current Timeline</h3>
      
      <div className="space-y-4">
        {storyEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <h4 className="text-lg font-semibold mt-1">{event.title}</h4>
                  <p className="mt-2">{event.description}</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => removeStoryEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {storyEvents.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">
            No events added to your story timeline yet. Add your first event above!
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminStoryEditor;
