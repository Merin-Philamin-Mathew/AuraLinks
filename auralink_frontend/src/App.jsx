import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import routes from "./config/routes"; 
import './colors.css'
const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Toaster position="top-right" richColors={true} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
