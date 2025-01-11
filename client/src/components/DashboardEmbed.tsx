import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface DashboardEmbedProps {
  url: string;
  title: string;
}

export function DashboardEmbed({ url, title }: DashboardEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Add auth token to Salesflow URL if it's the Salesflow dashboard
  const embedUrl = url.includes('sales-service-portal-bdgillihan.replit.app') 
    ? `${url}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTE0MTAxMzYsImlhdCI6MTczNTg1ODEzNiwic3ViIjoiZGFzaGJvYXJkX2VtYmVkIiwidXNlcl9pZCI6MSwiZW1haWwiOiJiZW5naWxsaWhhbkBhbXBvd2Vyc3lzLmNvbSJ9.W8vHe57Wi-WlbQxcS0l9juCzW4HJXgnI3-I4gu6OZZo`
    : url;

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

        <iframe 
          src={embedUrl}
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