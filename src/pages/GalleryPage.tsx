
import React, { useState, useRef } from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import { useIsMobile } from '@/hooks/use-mobile';
import PageHeading from '@/components/PageHeading';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Camera, 
  Heart, 
  Upload, 
  Video, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  GalleryHorizontal,
  Loader 
} from 'lucide-react';
import { toast } from 'sonner';

const GalleryLightbox = ({ 
  isOpen, 
  onClose, 
  currentItem, 
  onPrevious, 
  onNext 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentItem: any; 
  onPrevious: () => void; 
  onNext: () => void; 
}) => {
  if (!isOpen || !currentItem) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <div className="relative max-w-4xl max-h-[80vh] w-full mx-4">
        <img 
          src={currentItem.url} 
          alt={currentItem.caption || 'Gallery image'} 
          className="w-full h-full object-contain"
        />
        
        {currentItem.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
            <p className="text-white">{currentItem.caption}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-white/70">By {currentItem.uploadedBy || 'Anonymous'}</p>
              <div className="flex items-center text-white/70">
                <Heart className="h-4 w-4 mr-1" /> {currentItem.likes}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
        onClick={onNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const { galleryItems, addGalleryItem, likeGalleryItem } = useWedding();
  const [uploadName, setUploadName] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxItem, setCurrentLightboxItem] = useState<number | null>(null);
  
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
    
    // Simulate file upload
    setIsUploading(true);
    
    // For demo purposes, we'll just use a placeholder since we can't actually upload files
    setTimeout(() => {
      const fileUrl = uploadType === 'image' ? '/placeholder.svg' : '/placeholder.svg';
      
      addGalleryItem({
        type: uploadType,
        url: fileUrl,
        caption: uploadCaption,
        uploadedBy: uploadName || 'Anonymous',
      });
      
      // Reset form
      setUploadName('');
      setUploadCaption('');
      setIsDialogOpen(false);
      setIsUploading(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success('Your content has been uploaded to the gallery!');
    }, 1500);
  };
  
  const openLightbox = (index: number) => {
    setCurrentLightboxItem(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const goToPreviousImage = () => {
    if (currentLightboxItem === null) return;
    
    const newIndex = currentLightboxItem > 0 
      ? currentLightboxItem - 1 
      : sortedGalleryItems.length - 1;
    
    setCurrentLightboxItem(newIndex);
  };
  
  const goToNextImage = () => {
    if (currentLightboxItem === null) return;
    
    const newIndex = currentLightboxItem < sortedGalleryItems.length - 1 
      ? currentLightboxItem + 1 
      : 0;
    
    setCurrentLightboxItem(newIndex);
  };
  
  const handleLightboxKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPreviousImage();
    if (e.key === 'ArrowRight') goToNextImage();
  };
  
  React.useEffect(() => {
    window.addEventListener('keydown', handleLightboxKeyDown);
    return () => {
      window.removeEventListener('keydown', handleLightboxKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentLightboxItem]);
  
  const sortedGalleryItems = [...galleryItems].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  
  const imageItems = sortedGalleryItems.filter(item => item.type === 'image');
  const videoItems = sortedGalleryItems.filter(item => item.type === 'video');
  
  const UploadForm = () => (
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
          disabled={isUploading}
        />
      </div>
      
      {isUploading && (
        <div className="flex justify-center">
          <Loader className="animate-spin text-wedding-accent h-6 w-6" />
          <span className="ml-2 text-wedding-dark">Uploading...</span>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <PageHeading
        title="Photo Gallery"
        subtitle="Share and explore precious moments from our special day."
      />
      
      <div className="flex justify-center mb-12">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-wedding-accent hover:bg-wedding-accent/90 text-white">
                <Upload size={16} className="mr-2" />
                Upload Photo or Video
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl text-wedding-dark">Share Your Memories</SheetTitle>
                <SheetDescription>
                  Upload your photos and videos from our special day to share with everyone.
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[80vh] py-4">
                <UploadForm />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        ) : (
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
              <UploadForm />
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <Tabs defaultValue="all" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
          <TabsTrigger value="all">
            <GalleryHorizontal className="h-4 w-4 mr-2" /> All
          </TabsTrigger>
          <TabsTrigger value="photos">
            <Camera className="h-4 w-4 mr-2" /> Photos
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" /> Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {sortedGalleryItems.length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-wedding-accent/20 rounded-full flex items-center justify-center">
                <GalleryHorizontal className="h-8 w-8 text-wedding-accent" />
              </div>
              <p className="text-wedding-dark/70 font-medium mb-4">No photos or videos have been uploaded yet.</p>
              <p className="text-wedding-dark/70">Be the first to share a memory from our special day!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedGalleryItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index % 9 * 50}>
                  <Card className="overflow-hidden border-wedding-accent/30 hover:shadow-md transition-all">
                    <div 
                      className="relative h-64 cursor-pointer"
                      onClick={() => item.type === 'image' ? openLightbox(index) : null}
                    >
                      <img 
                        src={item.url} 
                        alt={item.caption || 'Wedding gallery item'} 
                        className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
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
                        <p className="text-wedding-dark mb-2 line-clamp-2">{item.caption}</p>
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
                          <Heart size={16} className={`mr-1 ${item.likes > 0 ? 'fill-wedding-accent' : ''}`} />
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
            <div className="text-center py-12 bg-secondary/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-wedding-accent/20 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-wedding-accent" />
              </div>
              <p className="text-wedding-dark/70 font-medium mb-4">No photos have been uploaded yet.</p>
              <p className="text-wedding-dark/70">Be the first to share a photo from our special day!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imageItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index % 9 * 50}>
                  <Card className="overflow-hidden border-wedding-accent/30 hover:shadow-md transition-all">
                    <div 
                      className="h-64 cursor-pointer"
                      onClick={() => openLightbox(sortedGalleryItems.findIndex(i => i.id === item.id))}
                    >
                      <img 
                        src={item.url} 
                        alt={item.caption || 'Wedding gallery item'} 
                        className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      {item.caption && (
                        <p className="text-wedding-dark mb-2 line-clamp-2">{item.caption}</p>
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
                          <Heart size={16} className={`mr-1 ${item.likes > 0 ? 'fill-wedding-accent' : ''}`} />
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
            <div className="text-center py-12 bg-secondary/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-wedding-accent/20 rounded-full flex items-center justify-center">
                <Video className="h-8 w-8 text-wedding-accent" />
              </div>
              <p className="text-wedding-dark/70 font-medium mb-4">No videos have been uploaded yet.</p>
              <p className="text-wedding-dark/70">Be the first to share a video from our special day!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videoItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index % 9 * 50}>
                  <Card className="overflow-hidden border-wedding-accent/30 hover:shadow-md transition-all">
                    <div className="relative h-64">
                      <img 
                        src={item.url} 
                        alt={item.caption || 'Wedding gallery item'} 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                          <Video size={32} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      {item.caption && (
                        <p className="text-wedding-dark mb-2 line-clamp-2">{item.caption}</p>
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
                          <Heart size={16} className={`mr-1 ${item.likes > 0 ? 'fill-wedding-accent' : ''}`} />
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
      
      {lightboxOpen && currentLightboxItem !== null && (
        <GalleryLightbox 
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          currentItem={sortedGalleryItems[currentLightboxItem]}
          onPrevious={goToPreviousImage}
          onNext={goToNextImage}
        />
      )}
    </div>
  );
};

export default GalleryPage;
