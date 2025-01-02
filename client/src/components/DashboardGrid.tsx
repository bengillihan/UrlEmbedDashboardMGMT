import { DashboardEmbed } from './DashboardEmbed';
import { DASHBOARD_URLS } from '@/lib/config';

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 p-6">
      {DASHBOARD_URLS.map((dashboard) => (
        <div key={dashboard.id} className="w-full">
          <DashboardEmbed 
            url={dashboard.url} 
            title={dashboard.title}
          />
        </div>
      ))}
    </div>
  );
}
