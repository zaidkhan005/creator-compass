import Image from "next/image";
import CreatorCompassForm from "@/app/components/CreatorCompassForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-primary-text flex flex-col">
      <header className="w-full py-6 px-6 sm:px-10 flex items-center justify-between">
        <div className="text-lg sm:text-xl font-display tracking-tight">
          Creator Compass
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent">
            Transform Data into Creative Genius
          </h1>
          <p className="text-secondary-text text-base sm:text-lg md:text-xl leading-relaxed">
            Your AI-powered co-pilot for YouTube brainstorming. Get a complete, data-driven
            content strategy in minutes.
          </p>

          <div className="mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
              <CreatorCompassForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 px-6 sm:px-10 text-center text-xs sm:text-sm text-secondary-text">
        © 2025 Creator Compass. Built with ❤️ in Doda, Jammu & Kashmir.
      </footer>
    </main>
  );
}
