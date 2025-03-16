
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLoginPage: React.FC = () => {
  const { setIsAdmin } = useWedding();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, use "admin123" as the password
    if (password === 'admin123') {
      setIsAdmin(true);
      toast.success('Successfully logged in');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid password');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-20 mt-10 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-wedding-accent/30">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-wedding-accent/10 text-wedding-accent mb-6 mx-auto">
              <Lock size={28} />
            </div>
            <CardTitle className="font-serif text-3xl text-wedding-dark">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-wedding-accent hover:bg-wedding-accent/90 text-white"
              >
                Log In
              </Button>
              <p className="text-center text-sm text-wedding-dark/60 mt-4">
                For demo purposes, use password: "admin123"
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
