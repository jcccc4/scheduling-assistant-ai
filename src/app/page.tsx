import { getServerSession } from "next-auth";
import { HeroSection } from "@/app/_components/landing-page/hero-section";
import { FeaturesSection } from "@/app/_components/landing-page/features-section";
import { TestimonialsSection } from "@/app/_components/landing-page/testimonials-section";
import { CTASection } from "@/app/_components/landing-page/cta-section";
import { redirect } from "next/navigation";
import { Navbar } from "@/app/_components/landing-page/navbar";
import { PricingSection } from "./_components/landing-page/pricing-section";

export default async function Home() {
  const session = await getServerSession();
  const isSignedIn = !!session;

  if (isSignedIn) {
    redirect("/webapp");
  }

  return (
    <main className="flex flex-col w-full">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
