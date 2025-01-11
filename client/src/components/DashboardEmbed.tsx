import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardEmbedProps {
  url: string;
  title: string;
}

export function DashboardEmbed({ url, title }: DashboardEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0); // Used to force iframe refresh

  useEffect(() => {
    // Only set up refresh for Salesflow dashboard
    if (url.includes('sales-service-portal-bdgillihan')) {
      const refreshInterval = setInterval(() => {
        setKey(prev => prev + 1); // Force iframe refresh
      }, 5000); // Check every 5 seconds

      return () => clearInterval(refreshInterval);
    }
  }, [url]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleLogin = () => {
    // Open dashboard in a new tab and start refresh cycle
    window.open(url, '_blank');
    setKey(prev => prev + 1); // Immediately attempt a refresh
  };

  return (
    <Card className="w-full h-full">
      <CardContent className="p-0 h-full relative">
        {isLoading && (
          <div className="absolute inset-0 p-4">
            <Skeleton className="w-full h-full" />
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
              <p className="text-sm text-gray-600 mb-4">Please log in to view the {title} dashboard</p>
              <Button onClick={handleLogin}>
                Open {title} in New Tab
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                After logging in, return to this tab to view the dashboard
              </p>
            </div>
          </div>
        )}

        <iframe 
          key={key} // Force refresh when key changes
          src={url}
          title={title}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          allow="fullscreen"
        />
      </CardContent>
    </Card>
  );
}