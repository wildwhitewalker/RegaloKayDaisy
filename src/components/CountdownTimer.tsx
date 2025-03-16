
import React, { useState, useEffect } from 'react';
import { useWedding } from '@/contexts/WeddingContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const { weddingDetails } = useWedding();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date(`${weddingDetails.date}T${weddingDetails.time}`);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Wedding day has arrived or passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Set up interval to update countdown
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [weddingDetails.date, weddingDetails.time]);
  
  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];
  
  return (
    <div className="flex justify-center space-x-4 md:space-x-8">
      {timeBlocks.map((block, index) => (
        <div 
          key={block.label} 
          className="flex flex-col items-center animate-fade-in"
          style={{ animationDelay: `${0.1 * index}s` }}
        >
          <div className="bg-white bg-opacity-90 w-16 md:w-24 h-16 md:h-24 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-2xl md:text-4xl font-bold text-wedding-dark">
              {block.value < 10 ? `0${block.value}` : block.value}
            </span>
          </div>
          <span className="text-xs md:text-sm mt-2 text-wedding-dark font-medium">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
