import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50">
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl">
        Manage Your Time
        <span className="text-blue-600"> Effortlessly</span>
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
        Transform your scheduling experience with our intelligent calendar solution. 
        Smart automation meets intuitive design to help you make the most of every day.
      </p>
      <div className="mt-10 flex items-center justify-center gap-6">
        <Button size="lg">
          Get Started Free
        </Button>
        <Button variant="outline" size="lg">
          See How It Works
        </Button>
      </div>
    </div>
  );
}