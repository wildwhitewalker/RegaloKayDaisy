
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Gift, Home, Image, Info, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: <Home size={18} />,
      path: '/admin/dashboard',
    },
    {
      title: 'Wedding Details',
      icon: <Info size={18} />,
      path: '/admin/wedding-details',
    },
    {
      title: 'Our Story',
      icon: <CalendarDays size={18} />,
      path: '/admin/our-story',
    },
    {
      title: 'Guest List',
      icon: <Users size={18} />,
      path: '/admin/guest-list',
    },
    {
      title: 'Registry',
      icon: <Gift size={18} />,
      path: '/admin/registry',
    },
    {
      title: 'Gallery',
      icon: <Image size={18} />,
      path: '/admin/gallery',
    },
  ];
  
  return (
    <div className="w-64 bg-white border-r border-wedding-accent/20 h-screen fixed left-0 top-0 z-40 p-6">
      <div className="flex items-center justify-center mb-8">
        <Link to="/admin/dashboard" className="font-serif text-2xl text-wedding-dark">
          Admin Panel
        </Link>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start text-left font-normal',
                location.pathname === item.path
                  ? 'bg-wedding-accent/10 text-wedding-accent hover:bg-wedding-accent/20'
                  : 'text-wedding-dark hover:bg-wedding-accent/5 hover:text-wedding-accent'
              )}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-0 right-0 px-6">
        <Link to="/">
          <Button variant="outline" className="w-full border-wedding-accent text-wedding-accent hover:bg-wedding-accent/10">
            View Website
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
