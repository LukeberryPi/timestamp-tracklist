import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="h-14 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-neutral-100 hover:text-accent transition-colors font-mono tracking-tight"
          >
            TT
          </Link>
          <nav className="flex gap-2">
            <Link to="/">
              <Button variant="ghost" size="default">Home</Button>
            </Link>
            <Link to="/submit">
              <Button variant="default" size="default">Upload</Button>
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#111111',
            border: '1px solid #262626',
            color: '#e5e5e5',
          },
        }}
      />
    </div>
  );
}
