export function PageHeader({
    title,
    description
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div className="border-b bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto py-16">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{description}</p>
        </div>
      </div>
    );
  }