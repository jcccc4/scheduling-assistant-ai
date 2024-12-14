# Database Setup Instructions

1. Install PostgreSQL if not already installed

2. Update the `.env` file with your PostgreSQL credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/taskdb"
```

3. Install dependencies:
```bash
npm install
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Create and apply database migrations:
```bash
npx prisma migrate dev --name init
```

The application is now configured to use PostgreSQL with Prisma ORM for storing task data. The following endpoints are available:

- GET /api/tasks - Fetch all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks - Update an existing task
- DELETE /api/tasks - Delete a task

Make sure to properly handle the response from these endpoints in your frontend components.