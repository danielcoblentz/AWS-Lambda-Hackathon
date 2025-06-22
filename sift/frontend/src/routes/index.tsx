import React from "react";
import ReactDOM from "react-dom/client";
import Login from "../../src/pages/login"; // Import the login component

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Login /> {/* Directly render the Login component */}
    </React.StrictMode>
);