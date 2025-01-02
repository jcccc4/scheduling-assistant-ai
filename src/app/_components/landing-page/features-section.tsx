
const features = [
  {
    title: "Smart Scheduling",
    description: "AI-powered scheduling that learns from your preferences and optimizes your calendar.",
    icon: "🎯",
  },
  {
    title: "Team Collaboration",
    description: "Seamlessly work with your team members and coordinate schedules effortlessly.",
    icon: "👥",
  },
  {
    title: "Calendar Integration",
    description: "Sync with popular calendar services like Google Calendar and Outlook.",
    icon: "📅",
  },
  {
    title: "Task Management",
    description: "Organize and prioritize your tasks with an intuitive interface.",
    icon: "✅",
  },
  {
    title: "Analytics & Insights",
    description: "Get detailed insights into your productivity and time management.",
    icon: "📊",
  },
  {
    title: "Mobile Access",
    description: "Access your schedule and tasks from anywhere with our mobile app.",
    icon: "📱",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Features
        </h2>
        <p className="text-lg text-gray-600">
          Discover what makes TaskAssist the perfect solution for your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}