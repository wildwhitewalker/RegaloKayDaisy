
import React, { useState, useRef } from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import PageHeading from '@/components/PageHeading';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Heart, Upload, Video } from 'lucide-react';
import { toast } from 'sonner';

const GalleryPage: React.FC = () => {
  const { galleryItems, addGalleryItem, likeGalleryItem } = useWedding();
  const [uploadName, setUploadName] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (uploadType === 'image' && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (uploadType === 'video' && !file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }
    
    // For demo purposes, we'll just use a placeholder since we can't actually upload files
    const fileUrl = uploadType === 'image' ? '/placeholder.svg' : '/placeholder.svg';
    
    addGalleryItem({
      type: uploadType,
      url: fileUrl,
      caption: uploadCaption,
      uploadedBy: uploadName,
    });
    
    // Reset form
    setUploadName('');
    setUploadCaption('');
    setIsDialogOpen(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const sortedGalleryItems = [...galleryItems].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  
  const imageItems = sortedGalleryItems.filter(item => item.type === 'image');
  const videoItems = sortedGalleryItems.filter(item => item.type === 'video');
  
  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <PageHeading
        title="Photo Gallery"
        subtitle="Share and explore precious moments from our special day."
      />
      
      <div className="flex justify-center mb-12">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-wedding-accent hover:bg-wedding-accent/90 text-white">
              <Upload size={16} className="mr-2" />
              Upload Photo or Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-wedding-dark">Share Your Memories</DialogTitle>
              <DialogDescription>
                Upload your photos and videos from our special day to share with everyone.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={uploadType === 'image' ? 'default' : 'outline'}
                  className={uploadType === 'image' ? 'bg-wedding-accent hover:bg-wedding-accent/90 text-white' : ''}
                  onClick={() => setUploadType('image')}
                >
                  <Camera size={16} className="mr-2" />
                  Photo
                </Button>
                <Button
                  type="button"
                  variant={uploadType === 'video' ? 'default' : 'outline'}
                  className={uploadType === 'video' ? 'bg-wedding-accent hover:bg-wedding-accent/90 text-white' : ''}
                  onClick={() => setUploadType('video')}
                >
                  <Video size={16} className="mr-2" />
                  Video
                </Button>
              </div>
              
              <div>
                <Label htmlFor="uploadName">Your Name</Label>
                <Input
                  id="uploadName"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="uploadCaption">Caption (Optional)</Label>
                <Input
                  id="uploadCaption"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Add a caption to your upload"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="fileUpload">
                  {uploadType === 'image' ? 'Choose Photo' : 'Choose Video'}
                </Label>
                <Input
                  id="fileUpload"
                  ref={fileInputRef}
                  type="file"
                  accept={uploadType === 'image' ? 'image/*' : 'video/*'}
                  className="mt-1"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {sortedGalleryItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-wedding-dark/70 mb-4">No photos or videos have been uploaded yet.</p>
              <p className="text-wedding-dark/70">Be the first to share a memory from our special day!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedGalleryItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index % 9 * 50}>
                  <Card className="overflow-hidden border-wedding-accent/30">
                    <div className="relative h-64">
                      <img 
                        src={item.url} 
                        alt={item.caption || 'Wedding gallery item'} 
                        className="w-full h-full object-cover object-center"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                            <Video size={32} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      {item.caption && (
                        <p className="text-wedding-dark mb-2">{item.caption}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-wedding-dark/70">
                          By {item.uploadedBy || 'Anonymous'}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-wedding-accent hover:text-wedding-accent hover:bg-wedding-accent/10"
                          onClick={() => likeGalleryItem(item.id)}
                        >
                          <Heart size={16} className="mr-1" />
                          {item.likes}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="photos">
          {imageItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-wedding-dark/70 mb-4">No photos have been uploaded yet.</p>
              <p className="text-wedding-dark/70">Be the first to share a photo from our special day!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imageItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index % 9 * 50}>
                  <Card className="overflow-hidden border-wedding-accent/30">
                    <div className="h-64">
                      <img 
                        src={item.url} 
                        alt={item.caption || 'Wedding gallery item'} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <CardContent className="p-4">
                      {item.caption && (
                        <p className="text-wedding-dark mb-2">{item.caption}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-wedding-dark/70">
                          By {item.uploadedBy || 'Anonymous'}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-wedding-accent hover:text-wedding-accent hover:bg-wedding-accent/10"
                          onClick={() => likeGalleryItem(item.id)}
                        >
                          <Heart size={16} className="mr-1" />
                          {item.likes}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos">
          {videoItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-wedding-dark/70 mb-4">No videos have been uploaded yet.</p>
              <p className="text-wedding-dark/70">Be the first to share a video from our special day!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videoItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index % 9 * 50}>
                  <Card className="overflow-hidden border-wedding-accent/30">
                    <div className="relative h-64">
                      <img 
                        src={item.url} 
                        alt={item.caption || 'Wedding gallery item'} 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                          <Video size={32} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      {item.caption && (
                        <p className="text-wedding-dark mb-2">{item.caption}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-wedding-dark/70">
                          By {item.uploadedBy || 'Anonymous'}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-wedding-accent hover:text-wedding-accent hover:bg-wedding-accent/10"
                          onClick={() => likeGalleryItem(item.id)}
                        >
                          <Heart size={16} className="mr-1" />
                          {item.likes}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GalleryPage;
