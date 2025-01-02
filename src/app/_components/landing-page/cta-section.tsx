'use client';
import GoogleButton from "@/components/authentication/google-button";

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="px-4 md:px-6 w-full">
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="space-y-2 ">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Join thousands of users who are already managing their tasks more efficiently.
            </p>
          </div>
          <div className="space-x-4">
            <GoogleButton isSignedIn={false} />
          </div>
        </div>
      </div>
    </section>
  );
}