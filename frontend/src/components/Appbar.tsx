
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Appbar = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("userdata");

  const initial = storedData
    ? JSON.parse(storedData).name.charAt(0).toUpperCase()
    : "";

  const handleSignOut = () => {
    try{
      localStorage.removeItem("userdata");
    localStorage.removeItem("token");
    toast.success("Sign out successful!", {
      position: "top-center",
      className: "toast-black-white",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  } catch (error) {
    console.error("Error during sign out:", error);
    toast.error("Sign out failed. Please try again.", {
      position: "top-center",
      className: "toast-black-white",
      autoClose: 2000,
    });
  }
}

  const handleNewClick = () => {
    if (storedData) {
      navigate("/publish");
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
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
    <div className="border-b border-black flex justify-between px-10 py-4 items-center">
      <Link to="/blogs" className="flex items-center">
        <span className="text-3xl font-black tracking-tight">MEDIUM</span>
      </Link>

      <div className="flex items-center space-x-4">
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
    </>
  );
};
