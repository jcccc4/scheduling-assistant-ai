# Task Assistant

A modern web application for managing tasks with an interactive calendar interface. Built using Next.js, React, and TypeScript, Task Assistant offers a clean and efficient way to organize your daily schedule.

## Features

- **Weekly Calendar View:** View your tasks in a clear weekly calendar format, with 24-hour time slots.
- **Intuitive Task Management:** Easily create, edit, and delete tasks. Set start and end times with precision.
- **Interactive UI:** Enjoy a smooth user experience with interactive elements and popover forms for easy task creation.
- **Responsive Design:** Works seamlessly across various devices, from desktops to mobile phones.
- **Real-time Updates:** See your changes reflected immediately in the calendar.
- **GMT Timezone:** Displays times in GMT for consistent time representation.

## Tech Stack

- **Next.js:** React Framework for building server-side rendered and static websites.
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static typing.
- **Tailwind CSS:** Rapidly build custom designs without writing much CSS.
- **Custom UI Components:** Reusable components built for consistency and efficiency.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
    # or
    yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
    # or
    yarn dev
   ```
4. Open http://localhost:3000 in your browser.

### Project Stucture

src/
├── app/                    # Next.js App Directory structure
│   ├── _components/       # Reusable components
│   │   └── calendar/      # Calendar-related components (views, events, form)
│   ├── layout.tsx         # Main app layout
│   └── globals.css        # Global CSS styles
├── components/            # Additional UI components
│   └── ui/               # UI library components (e.g., Popover)
└── lib/                  # Utility functions and types
    └── types.ts          # Type definitions


#Contributing
We welcome contributions! Here's how to get started:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature-name
3. Make your changes and commit them: git commit -m "Your descriptive commit message"
4. Push your branch: git push origin feature/your-feature-name
5. Open a pull request.
