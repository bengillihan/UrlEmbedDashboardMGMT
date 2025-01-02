import { DashboardEmbed } from '@/components/DashboardEmbed';
import { DASHBOARD_URLS } from '@/lib/config';

export function DashboardGrid() {
  return (
    <div className="flex flex-col gap-8">
      {DASHBOARD_URLS.map((dashboard) => (
        <div key={dashboard.id} className="w-full h-screen">
          <DashboardEmbed 
            url={dashboard.url} 
            title={dashboard.title}
          />
        </div>
      ))}
    </div>
  );
}