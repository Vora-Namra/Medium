import { useEffect } from "react";
import {Auth} from "../components/Auth"
import  Quote  from "../components/Quote"
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    
     const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/blogs", { replace: true });
    }
  }, [navigate]);
  
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
}