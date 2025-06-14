# Medium

A modern, serverless blogging application that combines edge‑served APIs with an intuitive, responsive UI. Users can securely register, write, and manage richly formatted posts—augmented by AI‑powered generation and enhancement. Under the hood, it leverages connection‑pooled database access for high throughput, JWT/bcrypt for secure sessions, and a clean, mobile‑first frontend to deliver a seamless writing and reading experience.

---

## Features
- **User Authentication**  
  Secure sign‑up and sign‑in with JWT-based sessions and bcrypt password hashing.
- **Real-Time Validation**  
  Form and input validation using Zod for consistent, type-safe data handling across both frontend and backend.
- **Dynamic AI Content Generation & Enhancement**  
  “Generate with AI” and “Enhance with AI” buttons powered by Google Gemini to auto‑create or improve blog drafts on the fly.
- **Profile Management**  
  View and inline-edit your profile (name, email, optional password) with live validation and toast feedback.
- **Blog Management**  
  Full CRUD for posts: create, update, delete, and view richly formatted articles (bold, paragraphs) via a simple markdown-like syntax.
- **Notifications**  
  Toast messages for success and error feedback using React‑Toastify.
- **Responsive UI**  
  Mobile-first design built with Tailwind CSS: auto‑resizing textareas, fluid typography, and interactive buttons.
- **Scalable Serverless Backend**  
  Cloudflare Workers + Hono framework for high-performance, edge‑served APIs with minimal cold starts.
- **Connection‑Pooled Data Layer**  
  Prisma ORM with PostgreSQL and connection pooling to ensure efficient database access under load.

---

## Tech Stack

| Layer             | Framework / Tool                                  |
|-------------------|---------------------------------------------------|
| **Backend**       | Cloudflare Workers, Hono, JWT, bcrypt             |
| **ORM / DB**      | Prisma with connection pooling, PostgreSQL        |
| **Validation**    | Zod                                               |
| **Frontend**      | React, TypeScript, Tailwind CSS                   |
| **AI**            | Google Gemini (via `@google/genai`)               |
| **Routing**       | react‑router‑dom                                  |
| **Notifications** | React‑Toastify                                    |
| **Deployment**    | Wrangler (Cloudflare), Vercel                     |

---

### Frontend
- **React** with **TypeScript** for a robust, component-based architecture.
- **react‑router‑dom** for client-side navigation and routing.
- **React‑Toastify** for Notifications
- **Zod** for frontend input validation
- **Tailwind** for modern & clean UI
- **Gemini** fro dynamic Blog Generation / Enhancement
- Hosted on **Vercel** 

### Backend
- **Cloudflare Workers** for serverless architecture, enabling ultra-fast backend processing.
- **Hono** framework for building performant web APIs with minimal overhead.
- **Zod** for schema validation, providing type safety for API requests.
- **Prisma ORM** for seamless database interaction, leveraging   **connection pooling** for optimal performance.
- **PostgreSQL** for the relational database, ensuring data integrity and flexibility.
- **JWT** for secure Authentication 
- **Bcrypt** for securing user credentials



## Installation

### Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** and **npm** (Node Package Manager)
- A **PostgreSQL instance** with **connection pooling** enabled
- A **Vercel** account for frontend deployment
- A **Cloudflare** account for backend deployment

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vora-Namra/medium.git
   cd medium
   ```

2. **Set up environment variables** in `.env` or in your Cloudflare Workers secrets:
   - `DATABASE_URL`: Your PostgreSQL database connection string with connection pooling.
   - `JWT_SECRET`: A secret key used for signing JWT tokens  in wrangler.jsonc .
   - `DIRECT_URL`: in Wrangler.jsonc for prisma 
   
    
3. **Prisma setup**:
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```
   - Apply database migrations to initialize your schema:
     ```bash
     npx prisma migrate dev --name init
     ```

4. **Deploy Backend to Cloudflare Workers**:
   - Ensure you've linked your Cloudflare account and configured Cloudflare Workers.
   - Deploy using `wrangler` or the Cloudflare dashboard.

### Frontend Setup
1. **Configure the backend URL** in the frontend:
   - In `config.ts`, set the `BACKEND_URL` to your Cloudflare Workers deployment URL.
   - In .env add your own `VITE_GEMINI_API_KEY` for blog Generation

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Deploy Frontend to Vercel**:
   - Push the frontend to a Git repository and connect it to your Vercel account.
   - Vercel will automatically deploy your application.

### Running Locally
To run the application locally during development, follow these steps:
1. Set up the backend and frontend as described above.
2. Ensure the backend is running (either locally or via Cloudflare Workers).
3. Start the React development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to access the application.

## Contributing
Feel free to open issues or submit pull requests to contribute to the development of this project. Contributions are always welcome!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
