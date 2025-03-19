import { loginUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const useUserFromURL = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("Entered useUserFromURL Hook");

    const params = new URLSearchParams(location.search);
    const user = {
      username: params.get("username"),
      email: params.get("email"),
      display_name: params.get("display_name"),
      avatar_url: params.get("avatar_url"),
      authenticated: params.get("authenticated") === "true",
    };

    console.log("Parsed user data from URL:", user);

    // Only dispatch if user data is valid
    if (user.username && user.email) {
      dispatch(loginUser(user));
    }
  }, [location.search, dispatch])
};

export default useUserFromURL;
