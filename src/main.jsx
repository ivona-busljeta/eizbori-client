import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css";
import {PersonsView} from "./components/person/PersonsView.jsx";
import {NavBar} from "./components/NavBar.jsx";
import {ElectionsView} from "./components/election/ElectionsView.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar/>
    },
    {
        path: "/registar",
        element: <PersonsView/>
    },
    {
        path: "/izbori",
        element: <ElectionsView/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
