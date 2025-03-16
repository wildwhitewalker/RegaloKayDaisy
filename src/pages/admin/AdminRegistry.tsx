
import React, { useState } from 'react';
import PageHeading from '@/components/PageHeading';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Link, ExternalLink } from 'lucide-react';

const AdminRegistry = () => {
  const { giftRegistry, addGiftRegistryItem, removeGiftRegistryItem } = useWedding();
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    link: '',
    image: '/placeholder.svg'
  });

  const handleAddItem = () => {
    if (newItem.title && newItem.description) {
      addGiftRegistryItem(newItem);
      setNewItem({
        title: '',
        description: '',
        link: '',
        image: '/placeholder.svg'
      });
    }
  };

  return (
    <div>
      <PageHeading title="Gift Registry Editor" subtitle="Manage your gift registry options" center={false} />
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Registry Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                placeholder="Registry Title" 
                value={newItem.title} 
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link (Optional)</label>
              <Input 
                placeholder="https://..." 
                value={newItem.link} 
                onChange={(e) => setNewItem({...newItem, link: e.target.value})}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                placeholder="Describe this registry..." 
                value={newItem.description} 
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                placeholder="Image URL" 
                value={newItem.image} 
                onChange={(e) => setNewItem({...newItem, image: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddItem} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Registry Item
          </Button>
        </CardFooter>
      </Card>
      
      <h3 className="text-xl font-semibold mb-4">Current Registry Items</h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {giftRegistry.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm">{item.description}</p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 text-sm flex items-center text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> Visit Registry
                    </a>
                  )}
                </div>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => removeGiftRegistryItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {giftRegistry.length === 0 && (
          <p className="col-span-full text-center py-8 text-muted-foreground">
            No registry items added yet. Add your first item above!
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminRegistry;
