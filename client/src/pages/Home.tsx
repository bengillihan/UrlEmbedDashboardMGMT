import { DashboardGrid } from '@/components/DashboardGrid';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto">
        <DashboardGrid />
      </main>
    </div>
  );
}