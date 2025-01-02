import { DashboardGrid } from '@/components/DashboardGrid';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
        </div>
      </header>

      <main className="container mx-auto">
        <DashboardGrid />
      </main>
    </div>
  );
}
