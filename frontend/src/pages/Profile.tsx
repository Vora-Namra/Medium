// // src/pages/ProfilePage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import { BlogCard } from "../components/BlogCard";
// import { BACKEND_URL } from "../config";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { signupInput } from '@100xdevs/medium-common';

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   published: boolean;
// }

// interface UserProfile {
//   id: number;
//   name: string;
//   username: string;
//   blogs: Blog[];
// }

// export const ProfilePage = () => {
// //   const navigate = useNavigate();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);

//   // form fields
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // possible validation errors
//   const [formError, setFormError] = useState("");
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   // fetch profile on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get<{ user: UserProfile }>(
//         `${BACKEND_URL}/api/v1/user/profile`,
//         { headers: { Authorization: token! } }
//       )
//       .then((res) => {
//         const u = res.data.user;
//         setUser(u);
//         setName(u.name);
//         setUsername(u.username);
//       })
//       .catch((err) => {
//         console.error("Profile load error:", err.response || err);
//         toast.error("Failed to load profile");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const saveProfile = () => {
//     setFormError("");
//     setFieldErrors({});
//     // client-side validation via signupInput
//     const parseResult = signupInput.safeParse({ name, username, password });
//     if (!parseResult.success) {
//       const errors: Record<string, string> = {};
//       parseResult.error.errors.forEach(e => {
//         if (e.path.length) errors[e.path[0]] = e.message;
//       });
//       setFieldErrors(errors);
//       return;
//     }

//     const token = localStorage.getItem("token");
//     axios
//       .put<{ user: UserProfile }>(
//         `${BACKEND_URL}/api/v1/user/profile`,
//         { name, username, ...(password && { password }) },
//         { headers: { Authorization: token! } }
//       )
//       .then((res) => {
//         setUser(res.data.user);
//         setEditing(false);
//         setPassword("");
//         toast.success("Profile updated!");
//       })
//       .catch((err) => {
//         const msg = err.response?.data?.error || "Failed to update profile";
//         setFormError(msg);
//         console.error("Profile update error:", err.response?.data || err);
//         toast.error(msg);
//       });
//   };

//   if (loading) return <div className="p-10">Loading…</div>;
//   if (!user) return <div className="p-10 text-red-500">Could not load profile.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-8">
//       <ToastContainer position="top-center" autoClose={2000} theme="dark" />

//       {/* Profile Card */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Your Profile</h1>
//           {!editing ? (
//             <button
//               onClick={() => setEditing(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Edit
//             </button>
//           ) : (
//             <div className="space-x-2">
//               <button
//                 onClick={saveProfile}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setEditing(false);
//                   setName(user.name);
//                   setUsername(user.username);
//                   setPassword("");
//                   setFormError("");
//                   setFieldErrors({});
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Validation/Error */}
//         {formError && <div className="mt-2 text-sm text-red-500">{formError}</div>}

//         {/* Profile Form */}
//         <div className="mt-6 grid grid-cols-1 gap-4">
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               disabled={!editing}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`mt-1 block w-full rounded-md border ${
//                 editing ? "border-gray-300" : "border-transparent bg-gray-100"
//               } p-2`}
//             />
//             {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               disabled={!editing}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className={`mt-1 block w-full rounded-md border ${
//                 editing ? "border-gray-300" : "border-transparent bg-gray-100"
//               } p-2`}
//             />
//             {fieldErrors.username && <p className="text-xs text-red-500">{fieldErrors.username}</p>}
//           </div>

//           {editing && (
//             <div>
//               <label className="block text-sm font-medium">New Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full rounded-md border border-gray-300 p-2"
//                 placeholder="Leave blank to keep current"
//               />
//               {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
//               <p className="text-xs text-gray-500 mt-1">
//                 Leave blank to keep your current password.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Blogs List */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Your Blogs</h2>
//         {user.blogs.length === 0 ? (
//           <p className="text-gray-500">You haven’t written any blogs yet.</p>
//         ) : (
//           user.blogs.map((b) => (
//             <BlogCard
//               key={b.id}
//               id={b.id}
//               authorName={user.name}
//               title={b.title}
//               content={b.content}
//               publishedDate={b.published ? "Published" : "Draft"}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };
""// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { BlogCard } from "../components/BlogCard";
import { BACKEND_URL } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { Appbar } from "../components/Appbar";

interface Blog {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  username: string;
  blogs: Blog[];
}

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().email("Invalid email address"),
  password: z.string().optional(),
});

export const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get<{ user: UserProfile }>(`${BACKEND_URL}/api/v1/user/profile`, {
        headers: { Authorization: token! },
      })
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setName(u.name);
        setUsername(u.username);
      })
      .catch((err) => {
        console.error("Profile load error:", err.response || err);
        toast.error("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = () => {
    setFormError("");
    setFieldErrors({});

    const parseResult = updateUserSchema.safeParse({ name, username, password });
    if (!parseResult.success) {
      const errors: Record<string, string> = {};
      parseResult.error.errors.forEach((e) => {
        if (e.path.length) errors[e.path[0]] = e.message;
      });
      setFieldErrors(errors);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = { name, username };
    if (password) payload.password = password;

    const token = localStorage.getItem("token");
    axios
      .put<{ user: UserProfile }>(`${BACKEND_URL}/api/v1/user/profile`, payload, {
        headers: { Authorization: token! },
      })
      .then((res) => {
        setUser(res.data.user);
        setEditing(false);
        setPassword("");
        toast.success("Profile updated!");
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Failed to update profile";
        setFormError(msg);
        console.error("Profile update error:", err.response?.data || err);
        toast.error(msg);
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen  text-white">
        <Spinner />
      </div>
    );
  if (!user)
    return <div className="p-10  text-white">Could not load profile.</div>;

  return (
    <>          
    <Appbar />
    <div className="max-w-3xl mx-auto p-6 space-y-8  text-white min-h-screen">
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      {/* Profile Card */}
      <div className="bg-zinc-900 shadow-md rounded-lg p-6 border border-zinc-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-white text-gray-600 rounded hover:bg-gray-200"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setName(user.name);
                  setUsername(user.username);
                  setPassword("");
                  setFormError("");
                  setFieldErrors({});
                }}
                className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {formError && <div className="mt-2 text-sm text-red-400">{formError}</div>}

        <div className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              disabled={!editing}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                editing ? "border-gray-600" : "border-transparent bg-zinc-800"
              } p-2 text-white bg-gray-800`}
            />
            {fieldErrors.name && <p className="text-xs text-red-400">{fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              disabled={!editing}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                editing ? "border-gray-600" : "border-transparent bg-zinc-800"
              } p-2 text-white bg-black`}
            />
            {fieldErrors.username && <p className="text-xs text-red-400">{fieldErrors.username}</p>}
          </div>

          {editing && (
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 p-2 text-white bg-black"
                placeholder="Leave blank to keep current"
              />
              {fieldErrors.password && <p className="text-xs text-red-400">{fieldErrors.password}</p>}
              <p className="text-xs text-gray-400 mt-1">
                Leave blank to keep your current password.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Blogs List */}
      <div className="space-y-4 text-black">
        <h2 className="text-xl font-semibold">Your Blogs</h2>
        {user.blogs.length === 0 ? (
          <p className="">You haven’t written any blogs yet.</p>
        ) : (
          user.blogs.map((b) => (
            <BlogCard
              key={b.id}
              id={b.id}
              authorName={user.name}
              title={b.title}
              content={b.content}
              publishedDate={b.published ? "Published" : "Draft"}
            />
          ))
        )}
      </div>
    </div>
    </>

  );
};
