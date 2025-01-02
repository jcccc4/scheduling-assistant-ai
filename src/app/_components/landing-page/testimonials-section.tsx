
const testimonials = [
  {
    content: "This calendar app has completely transformed how I manage my time. The smart scheduling features are a game-changer.",
    author: "Sarah Johnson",
    role: "Product Manager",
    avatar: "/avatars/avatar-1.png"
  },
  {
    content: "The team coordination features have made it so much easier to schedule meetings across different time zones.",
    author: "Michael Chen",
    role: "Engineering Lead",
    avatar: "/avatars/avatar-2.png"
  },
  {
    content: "I love how the AI learns my preferences. It's like having a personal assistant that actually knows what I want.",
    author: "Emily Rodriguez",
    role: "Marketing Director",
    avatar: "/avatars/avatar-3.png"
  }
];

export function TestimonialsSection() {
  return (
    <div className="py-24 bg-gray-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by teams everywhere
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See what our users are saying about their experience with our calendar solution.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                <div>
                  <p className="text-lg leading-7 text-gray-600">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100">
                    {/* Replace with actual avatar images */}
                    <div className="h-full w-full rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.author}</h3>
                    <p className="text-sm leading-6 text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}