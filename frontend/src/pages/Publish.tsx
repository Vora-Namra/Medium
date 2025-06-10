

import { Appbar } from '../components/Appbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { type ChangeEvent, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const Publish = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!title.trim()) {
      return alert("Please enter a title first.");
    }
    setLoadingAI(true);
    try {
        const prompt = description
          ? `Improve the following blog post. Keep it informative, engaging, and beginner-friendly. Do NOT use any special characters (like ** or ##) for formatting or headings. Keep it as plain text with paragraph breaks.
        Title: ${title}
        Content: ${description}`
          : `Write a well-structured, informative blog post for the title provided. Avoid using any special characters (like ** or ##) for formatting. Start with an introductory paragraph, and then write clear body paragraphs and a conclusion.
        Title: ${title}`;

      const res = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
      setDescription(res.text || '');
    } catch (e) {
      console.error("Gemini error:", e);
      alert("Failed to generate content. Try again.");
    } finally {
      setLoadingAI(false);
    }
  };

const handlePublish = async () => {
  if (!title.trim() || !description.trim()) return;

  setLoading(true); 
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      { title, content: description },
      { headers: { Authorization: token! } }
    );

    toast.success("Blog published successfully!", {
      position: "top-center",
      className: "toast-black-white",
      autoClose: 2000,
    });

    setTimeout(() => navigate(`/blog/${data.id}`), 1500);

  } catch (e) {
    console.error(e);
    toast.error("Failed to publish the blog.", {
      position: "top-center",
      className: "toast-black-white",
      autoClose: 3000,
    });
  } finally {
    setLoading(false); 
  }
};


  return (<>
  <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
        />
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Appbar />
      <main className="flex flex-1 justify-center items-start py-8 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="w-full max-w-3xl mx-6 space-y-12">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-3xl font-light tracking-wide text-black/90">Craft Your Narrative</h1>
            <div className="mt-2 w-24 h-[2px] mx-auto bg-black/20"></div>
          </div>

          {/* Editor Card */}
          <div className="bg-white backdrop-blur-sm rounded-3xl border border-black/5 shadow-lg overflow-hidden">
            {/* Title */}
            <section className="p-8 border-b border-black/5">
              <label className="block text-sm uppercase tracking-widest text-black/60 mb-3">Title</label>
              <textarea
                onChange={e => setTitle(e.target.value)}
                value={title}
                placeholder="An intriguing title..."
                rows={1}
                className="w-full font-bold bg-transparent text-4xl placeholder:text-black/20 focus:outline-none resize-none transition"
                style={{ height: 'auto' }}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }}
                required
              />
              <div className="mt-6 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-black/5"></div>
                <div className="text-sm text-black/40 italic">
                  {title ? `${title.length} characters` : "Title awaits your inspiration"}
                </div>
              </div>
            </section>

            {/* Content & AI Panel */}
            <section className="p-8 space-y-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm uppercase tracking-widest text-black/60 font-semibold">
                  Content
                </label>
                <button
                  onClick={handleGenerate}
                  disabled={loadingAI}
                  className="px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition"
                >
                  {loadingAI ? "Generating..." : description ? "Enhance with AI" : "Generate with AI"}
                </button>
              </div>
              <TextEditor onChange={e => setDescription(e.target.value)} content={description} />
              <div className="mt-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-black/5"></div>
                <div className="text-sm text-black/40 italic">
                  {description ? `${description.length} characters` : "Awaiting your narrative"}
                </div>
              </div>
            </section>
          </div>

          {/* Publish Button */}
          <div className="flex justify-center">
                <button
            disabled={!title.trim() || !description.trim() || loading}
            onClick={handlePublish}
            className={`
              relative px-8 py-3 rounded-md 
              ${title && description && !loading ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
              after:content-[''] after:absolute after:inset-0 after:border-[1.5px] after:border-black
              after:translate-x-1 after:translate-y-1 after:-z-10
              ${title && description && !loading ? 'hover:after:translate-x-0.5 hover:after:translate-y-0.5' : ''}
              active:scale-[0.99]
              transition-all duration-200
            `}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>

          </div>
        </div>
      </main>
    </div>
    </>
  );
};

function TextEditor({
  onChange,
  content,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
}) {
  return (
    <textarea
      onChange={onChange}
      value={content}
      placeholder="Share your thoughts here..."
      rows={10}
      className="w-full bg-[#fafafa] rounded-lg px-6 py-5 text-base text-black/90 leading-relaxed placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/20 resize-none min-h-[20rem]"
      style={{ height: 'auto' }}
      onInput={e => {
        const el = e.currentTarget;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }}
      required
    />
  );
}

export default Publish;
