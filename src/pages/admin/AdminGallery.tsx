
import React, { useState } from 'react';
import PageHeading from '@/components/PageHeading';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PlusCircle, Trash2, Image, Video } from 'lucide-react';

const AdminGallery = () => {
  const { galleryItems, addGalleryItem, removeGalleryItem } = useWedding();
  const [newItem, setNewItem] = useState({
    type: 'image' as 'image' | 'video',
    url: '',
    caption: '',
    uploadedBy: 'Admin'
  });

  const handleAddItem = () => {
    if (newItem.url) {
      addGalleryItem(newItem);
      setNewItem({
        type: 'image',
        url: '',
        caption: '',
        uploadedBy: 'Admin'
      });
    }
  };

  return (
    <div>
      <PageHeading title="Gallery Management" subtitle="Add and moderate gallery content" center={false} />
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Content Type</label>
              <ToggleGroup type="single" value={newItem.type} onValueChange={(value) => {
                if (value) setNewItem({...newItem, type: value as 'image' | 'video'});
              }}>
                <ToggleGroupItem value="image">
                  <Image className="h-4 w-4 mr-2" /> Image
                </ToggleGroupItem>
                <ToggleGroupItem value="video">
                  <Video className="h-4 w-4 mr-2" /> Video
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input 
                placeholder={`${newItem.type === 'image' ? 'Image' : 'Video'} URL`}
                value={newItem.url} 
                onChange={(e) => setNewItem({...newItem, url: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <Input 
                placeholder="Caption (optional)" 
                value={newItem.caption} 
                onChange={(e) => setNewItem({...newItem, caption: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddItem} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Gallery
          </Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-2 bg-muted">
                    {item.type === 'image' ? (
                      <img src={item.url} alt={item.caption || 'Gallery image'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm truncate">{item.caption || 'No caption'}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeGalleryItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {galleryItems.length === 0 && (
              <p className="col-span-full text-center py-8 text-muted-foreground">
                No gallery items added yet. Add your first item above!
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="images">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryItems.filter(item => item.type === 'image').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-2 bg-muted">
                    <img src={item.url} alt={item.caption || 'Gallery image'} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm truncate">{item.caption || 'No caption'}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeGalleryItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {galleryItems.filter(item => item.type === 'image').length === 0 && (
              <p className="col-span-full text-center py-8 text-muted-foreground">
                No images added yet. Add your first image above!
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryItems.filter(item => item.type === 'video').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-2 bg-muted flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm truncate">{item.caption || 'No caption'}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeGalleryItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {galleryItems.filter(item => item.type === 'video').length === 0 && (
              <p className="col-span-full text-center py-8 text-muted-foreground">
                No videos added yet. Add your first video above!
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminGallery;
