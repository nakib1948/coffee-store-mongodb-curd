import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffe from "./components/UpdateCoffe.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App>Hello world!</App>,
    loader:()=>fetch('http://localhost:3000/coffee')
  },
  {
    path:'addCoffee',
    element:<AddCoffee></AddCoffee>
  },
  {
    path:'updateCoffee/:id',
    element:<UpdateCoffe></UpdateCoffe>,
    loader:({params})=>fetch(`http://localhost:3000/coffee/${params.id}`)
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
