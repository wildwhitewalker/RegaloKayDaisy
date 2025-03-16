
import React, { useState } from 'react';
import PageHeading from '@/components/PageHeading';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

const AdminDetailsEditor = () => {
  const { weddingDetails, updateWeddingDetails } = useWedding();
  const [formValues, setFormValues] = useState(weddingDetails);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWeddingDetails(formValues);
  };

  return (
    <div>
      <PageHeading title="Wedding Details Editor" subtitle="Update information about your special day" center={false} />
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Wedding Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Bride's Name</label>
                <Input 
                  name="brideName" 
                  value={formValues.brideName} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Groom's Name</label>
                <Input 
                  name="groomName" 
                  value={formValues.groomName} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Wedding Date</label>
                <Input 
                  type="date" 
                  name="date" 
                  value={formValues.date} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Wedding Time</label>
                <Input 
                  type="time" 
                  name="time" 
                  value={formValues.time} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location/City</label>
                <Input 
                  name="location" 
                  value={formValues.location} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Venue Name</label>
                <Input 
                  name="venue" 
                  value={formValues.venue} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Dress Code</label>
                <Input 
                  name="dressCode" 
                  value={formValues.dressCode} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Wedding Details
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AdminDetailsEditor;
