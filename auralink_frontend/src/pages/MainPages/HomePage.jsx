import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loginUser } from "@/redux/userSlice";
import UserDashboard from "@/components/user/UserDashboard";
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import AuraLinksLoader from "@/components/utils/Loaders/AuraLinksLoader";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Select user from Redux store
  const { user_details, logged_in } = useSelector((state) => state.user);
  
  // Initialize dark mode from localStorage with the same key 'theme'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved preference
    if (savedTheme === null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedTheme === 'dark';
  });
  
  const [loading, setLoading] = useState(true); // Prevent rendering until user is set

  // Save dark mode preference whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Parse user data from URL and dispatch it to Redux
  useEffect(() => {
    console.log("Checking for user data in URL...");
    
    const params = new URLSearchParams(location.search);
    const user = {
      username: params.get("username"),
      email: params.get("email"),
      display_name: params.get("display_name"),
      avatar_url: params.get("avatar_url"),
      authenticated: params.get("authenticated") === "true",
    };

    console.log("Extracted User:", user);

    if (user.username && user.email) {
      dispatch(loginUser(user));
    }

    // Set loading to false after attempting to update user
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Small delay to ensure state updates
  }, [location.search, dispatch]);

  // Ensure page doesn't load until user data is processed
  if (loading) {
    <AuraLinksLoader/>
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header user={user_details} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {logged_in ? (
        <UserDashboard user={user_details} />
      ) : (
        <div className="text-center text-red-500 mt-20">User not logged in.</div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;