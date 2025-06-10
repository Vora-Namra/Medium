

// // src/components/Appbar.tsx
// import { Link, useNavigate } from "react-router-dom";
// import { Avatar } from "./BlogCard";

// export const Appbar = () => {
//   const navigate = useNavigate();
//   const storedData = localStorage.getItem("userdata");

//   // Display only the initial letter, uppercase
//   const initial = storedData
//     ? JSON.parse(storedData).name.charAt(0).toUpperCase()
//     : "";

//   const handleSignOut = () => {
//     localStorage.removeItem("userdata");
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   return (
//     <div className="border-b flex justify-between px-10 py-4 items-center">
//       <Link to="/blogs" className="flex items-center">
//         <span className="text-3xl font-black tracking-tight">MEDIUM</span>
//       </Link>

//       <div className="flex items-center space-x-4">
//         <Link to="/publish">
//           <button
//             type="button"
//             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
//           >
//             New
//           </button>
//         </Link>

//         {storedData ? (
//           <>
//             <Link to="/profile">
//               <Avatar name={initial} size="big" />
//             </Link>
//             <button
//               onClick={handleSignOut}
//               className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 font-medium rounded-full text-sm px-5 py-2.5"
//             >
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <Link to="/signin">
//             <button
//               className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 font-medium rounded-full text-sm px-5 py-2.5"
//             >
//               Sign In
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };



// src/components/Appbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("userdata");

  // Display only the initial letter, uppercase
  const initial = storedData
    ? JSON.parse(storedData).name.charAt(0).toUpperCase()
    : "";

  const handleSignOut = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleNewClick = () => {
    if (storedData) {
      navigate("/publish");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="border-b flex justify-between px-10 py-4 items-center">
      <Link to="/blogs" className="flex items-center">
        <span className="text-3xl font-black tracking-tight">MEDIUM</span>
      </Link>

      <div className="flex items-center space-x-4">
        {/* NEW BUTTON: routes to /publish if signed in, else to /signin */}
        <button
          onClick={handleNewClick}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
        >
          New
        </button>

        {storedData ? (
          <>
            <Link to="/profile">
              <Avatar name={initial} size="big" />
            </Link>
            <button
              onClick={handleSignOut}
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/signin">
            <button
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
