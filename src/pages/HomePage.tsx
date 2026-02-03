import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Hero - asymmetric, bold */}
        <div className="space-y-8">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
            <span className="block animate-fade-in-up">Timestamp</span>
            <span className="block text-accent animate-fade-in-up animation-delay-100">Tracklist</span>
          </h1>

          <p className="text-xl text-neutral-400 max-w-md animate-fade-in-up animation-delay-200">
            Upload your Rekordbox .cue file.
            <br />
            Get YouTube-ready timestamps instantly.
          </p>

          <div className="animate-fade-in-up animation-delay-300">
            <Link to="/submit">
              <Button size="lg" className="mt-4">
                Upload .cue file
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Minimal feature hints */}
        <div className="mt-32 pt-12 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-neutral-500">
            <div className="animate-fade-in-up animation-delay-400">01 — Drop file</div>
            <div className="animate-fade-in-up animation-delay-500">02 — Set offset</div>
            <div className="animate-fade-in-up animation-delay-600">03 — Copy tracklist</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </main>
  );
}
