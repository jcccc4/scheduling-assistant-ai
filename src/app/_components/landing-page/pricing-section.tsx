// src/app/pricing/page.tsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "0",
    featured: false,
    features: [
      "Basic task management",
      "Mobile app access",
      "2 reminders per task",
      "Basic sorting & filters",
    ],
  },
  {
    name: "Premium",
    description: "For power users who need more",
    price: "3.99",
    featured: true,
    features: [
      "Advanced sorting & filters",
      "Unlimited reminders",
      "Subtasks & dependencies",
      "Priority support",
      "Calendar integration",
      "Custom themes",
      "Data backup",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start for free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border ${
                plan.featured
                  ? "border-blue-600 shadow-lg scale-105"
                  : "border-gray-200"
              } p-8 bg-white relative`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                {plan.featured && (
                  <p className="text-sm text-gray-500 mt-2">
                    Billed annually (or ${(Number(plan.price) * 1.2).toFixed(2)}/month billed monthly)
                  </p>
                )}
              </div>

              <Button 
                className="w-full mb-6" 
                variant={plan.featured ? "default" : "outline"}
                size="lg"
              >
                {plan.price === "0" ? "Get Started" : "Upgrade Now"}
              </Button>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900">
                  Everything included:
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Add FAQ section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Can I try Premium features before subscribing?",
    answer: "Yes! We offer a 14-day free trial of our Premium plan. You'll get access to all Premium features with no commitment required.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! You can cancel your subscription at any time. If you cancel, you'll continue to have Premium access until the end of your current billing period.",
  },
  {
    question: "What happens to my tasks if I downgrade to Free?",
    answer: "Your tasks are always safe. If you downgrade, you'll maintain access to all your existing tasks, but Premium features will be limited until you upgrade again.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! Students can get 50% off Premium with a valid student email address. Contact our support team to learn more.",
  },
];