import React from "react";
import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";

const features = [
  {
    title: "Read. Write. Connect.",
    description:
      "Explore thousands of stories, share your own, and connect with like-minded individuals. Medium is the place to express your ideas and be inspired.",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Minimalist Experience",
    description:
      "A distraction-free reading and writing environment, with a clean, modern design in mostly white and subtle black accents.",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Join the Conversation",
    description:
      "Engage with stories through comments, highlights, and reactions. Your voice matters.",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    ),
  },
];

const blogs = [
  {
    title: "How to build a modern blog with React & Tailwind",
    excerpt:
      "Step by step guide to building a beautiful and performant blog using React and Tailwind CSS.",
    author: {
      name: "Jane Doe",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "June 6, 2025",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Art of Minimalist Writing",
    excerpt:
      "Discover why less is more and how to convey your message with clarity and impact on Medium.",
    author: {
      name: "John Smith",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "June 3, 2025",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Staying Updated in the World of Tech",
    excerpt:
      "Tips and resources to help you never miss out on the latest developments and trends.",
    author: {
      name: "Priya Patel",
      avatar:
        "https://randomuser.me/api/portraits/women/68.jpg",
    },
    date: "June 1, 2025",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-100 text-black flex flex-col font-sans">
     
      <Appbar />

      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center px-6 py-20 bg-[radial-gradient(ellipse_at_top,_#23272f_0%,_#f4f5fa_95%)]">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center tracking-tight bg-gradient-to-br from-black via-gray-900 to-gray-500 bg-clip-text text-transparent">
          Discover your{" "}
          <span className="inline-block bg-black text-white px-3 py-1 rounded shadow">
            next story
          </span>{" "}
          on <span className="font-black text-black">Medium</span>
        </h1>
        <p className="text-lg md:text-2xl text-black/70 max-w-2xl text-center mt-4 mb-10 font-light">
          Dive into a world of ideas. Read, write, and share stories that matter.
        </p>
        <Link
          to="/signin"
          className="px-8 py-4 text-lg font-semibold bg-black text-white rounded-full shadow-lg hover:bg-gray-900 hover:scale-105 transition-all duration-200"
        >
          Get Started
        </Link>
      </header>

      {/* Features */}
      <section id="features" className="py-16 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl p-8 border  bg-gradient-to-b from-gray-900 via-gray-800 to-black hover:shadow-2xl transition"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-white/70 text-center">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Blogs */}
      <section
        id="discover"
        className="py-20 bg-[radial-gradient(ellipse_at_center,_#23272f_0%,_#f4f5fa_90%)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-black via-gray-800 to-gray-400 bg-clip-text text-transparent">
            Discover New Blogs & Stay Updated
          </h2>
          <p className="mb-10 text-lg text-gray-700 text-center max-w-2xl mx-auto font-light">
            Explore trending blogs from our vibrant community. Stay inspired and informed with stories from demo users.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {blogs.map((blog, idx) => (
              <a
                href={blog.link}
                key={idx}
                className="group bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition border border-gray-700 flex flex-col overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition"
                />
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-semibold text-xl mb-2 text-white group-hover:underline">{blog.title}</h3>
                  <p className="text-gray-200 mb-4 flex-1">{blog.excerpt}</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-9 h-9 rounded-full border border-gray-600 mr-3"
                    />
                    <div>
                      <div className="text-white font-medium">{blog.author.name}</div>
                      <div className="text-gray-400 text-sm">{blog.date}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-neutral-100 border-t border-gray-200">
        © {new Date().getFullYear()} MEDIUM. All rights reserved.
      </footer>
    </div>
  );
}