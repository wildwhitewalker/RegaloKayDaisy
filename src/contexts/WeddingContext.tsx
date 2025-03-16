
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Types for our data models
export interface WeddingDetails {
  brideName: string;
  groomName: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  dressCode: string;
}

export interface GuestResponse {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  numberOfGuests: number;
  dietaryRestrictions: string;
  message: string;
}

export interface StoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface GiftRegistry {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  uploadedBy?: string;
  uploadedAt: string;
  likes: number;
}

interface WeddingContextType {
  weddingDetails: WeddingDetails;
  storyEvents: StoryEvent[];
  guestResponses: GuestResponse[];
  giftRegistry: GiftRegistry[];
  galleryItems: GalleryItem[];
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  updateWeddingDetails: (details: Partial<WeddingDetails>) => void;
  addGuestResponse: (response: Omit<GuestResponse, 'id'>) => void;
  updateStoryEvents: (events: StoryEvent[]) => void;
  addStoryEvent: (event: Omit<StoryEvent, 'id'>) => void;
  removeStoryEvent: (id: string) => void;
  updateGiftRegistry: (registry: GiftRegistry[]) => void;
  addGiftRegistryItem: (item: Omit<GiftRegistry, 'id'>) => void;
  removeGiftRegistryItem: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'uploadedAt' | 'likes'>) => void;
  removeGalleryItem: (id: string) => void;
  likeGalleryItem: (id: string) => void;
}

// Default values
const defaultWeddingDetails: WeddingDetails = {
  brideName: 'Daisy',
  groomName: 'Reg',
  date: '2025-04-26',
  time: '15:00',
  location: 'Butuan City',
  venue: 'Grand Palace Wedding Hall',
  dressCode: 'Formal Attire',
};

const defaultStoryEvents: StoryEvent[] = [
  {
    id: '1',
    date: '2020-06-15',
    title: 'First Meeting',
    description: 'We met through mutual friends at a local coffee shop.',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    date: '2022-02-14',
    title: 'The Proposal',
    description: 'Under the stars at our favorite spot by the lake.',
    image: '/placeholder.svg',
  },
];

const defaultGiftRegistry: GiftRegistry[] = [
  {
    id: '1',
    title: 'Home Essentials',
    description: 'Help us build our new home together.',
    link: 'https://www.amazon.com/wedding/registry',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Cash Gift',
    description: 'Contribute to our honeymoon fund.',
    image: '/placeholder.svg',
  },
];

// Create context
const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with local storage or defaults
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>(() => {
    const saved = localStorage.getItem('weddingDetails');
    return saved ? JSON.parse(saved) : defaultWeddingDetails;
  });

  const [storyEvents, setStoryEvents] = useState<StoryEvent[]>(() => {
    const saved = localStorage.getItem('storyEvents');
    return saved ? JSON.parse(saved) : defaultStoryEvents;
  });

  const [guestResponses, setGuestResponses] = useState<GuestResponse[]>(() => {
    const saved = localStorage.getItem('guestResponses');
    return saved ? JSON.parse(saved) : [];
  });

  const [giftRegistry, setGiftRegistry] = useState<GiftRegistry[]>(() => {
    const saved = localStorage.getItem('giftRegistry');
    return saved ? JSON.parse(saved) : defaultGiftRegistry;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('galleryItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('weddingDetails', JSON.stringify(weddingDetails));
  }, [weddingDetails]);

  useEffect(() => {
    localStorage.setItem('storyEvents', JSON.stringify(storyEvents));
  }, [storyEvents]);

  useEffect(() => {
    localStorage.setItem('guestResponses', JSON.stringify(guestResponses));
  }, [guestResponses]);

  useEffect(() => {
    localStorage.setItem('giftRegistry', JSON.stringify(giftRegistry));
  }, [giftRegistry]);

  useEffect(() => {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
  }, [galleryItems]);

  // Methods to update state
  const updateWeddingDetails = (details: Partial<WeddingDetails>) => {
    setWeddingDetails((prev) => ({ ...prev, ...details }));
    toast.success('Wedding details updated');
  };

  const addGuestResponse = (response: Omit<GuestResponse, 'id'>) => {
    const newResponse = {
      ...response,
      id: Date.now().toString(),
    };
    setGuestResponses((prev) => [...prev, newResponse]);
    toast.success('Response submitted! Thank you.');
  };

  const updateStoryEvents = (events: StoryEvent[]) => {
    setStoryEvents(events);
    toast.success('Story events updated');
  };

  const addStoryEvent = (event: Omit<StoryEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setStoryEvents((prev) => [...prev, newEvent]);
    toast.success('Story event added');
  };

  const removeStoryEvent = (id: string) => {
    setStoryEvents((prev) => prev.filter((event) => event.id !== id));
    toast.success('Story event removed');
  };

  const updateGiftRegistry = (registry: GiftRegistry[]) => {
    setGiftRegistry(registry);
    toast.success('Gift registry updated');
  };

  const addGiftRegistryItem = (item: Omit<GiftRegistry, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setGiftRegistry((prev) => [...prev, newItem]);
    toast.success('Gift registry item added');
  };

  const removeGiftRegistryItem = (id: string) => {
    setGiftRegistry((prev) => prev.filter((item) => item.id !== id));
    toast.success('Gift registry item removed');
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id' | 'uploadedAt' | 'likes'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
      likes: 0,
    };
    setGalleryItems((prev) => [...prev, newItem]);
    toast.success('Gallery item added');
  };

  const removeGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Gallery item removed');
  };

  const likeGalleryItem = (id: string) => {
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <WeddingContext.Provider
      value={{
        weddingDetails,
        storyEvents,
        guestResponses,
        giftRegistry,
        galleryItems,
        isAdmin,
        setIsAdmin,
        updateWeddingDetails,
        addGuestResponse,
        updateStoryEvents,
        addStoryEvent,
        removeStoryEvent,
        updateGiftRegistry,
        addGiftRegistryItem,
        removeGiftRegistryItem,
        addGalleryItem,
        removeGalleryItem,
        likeGalleryItem,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = (): WeddingContextType => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
