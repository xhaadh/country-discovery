import React, { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  onTrigger: () => void;
  disabled?: boolean;
}

const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({ 
  onTrigger, 
  disabled = false 
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onTrigger();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [onTrigger, disabled]);

  return <div ref={observerRef} className="h-2" />;
};

export default InfiniteScrollTrigger;