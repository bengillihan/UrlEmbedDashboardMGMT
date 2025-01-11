import { useState } from 'react';
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
  const [needsAuth, setNeedsAuth] = useState(false);

  const handleLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    setIsLoading(false);
    setHasError(false);
    // Check if we're redirected to a login page
    const frame = event.target as HTMLIFrameElement;
    if (frame.contentWindow?.location.href.includes('/login')) {
      setNeedsAuth(true);
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleLogin = () => {
    // Open Salesflow in a new tab for authentication
    window.open(url, '_blank');
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
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load dashboard</h3>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
          </div>
        )}

        {needsAuth && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
              <p className="text-sm text-gray-600 mb-4">Please log in to view the {title} dashboard</p>
              <Button onClick={handleLogin}>
                Log In to {title}
              </Button>
            </div>
          </div>
        )}

        <iframe 
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