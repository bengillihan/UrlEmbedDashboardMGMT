import { DashboardEmbed } from '@/components/DashboardEmbed';
import { DASHBOARD_URLS } from '@/lib/config';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardGrid() {
  return (
    <Tabs defaultValue={DASHBOARD_URLS[0].id} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {DASHBOARD_URLS.map((dashboard) => (
          <TabsTrigger key={dashboard.id} value={dashboard.id}>
            {dashboard.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {DASHBOARD_URLS.map((dashboard) => (
        <TabsContent key={dashboard.id} value={dashboard.id} className="h-screen">
          <DashboardEmbed 
            url={dashboard.url} 
            title={dashboard.title}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}