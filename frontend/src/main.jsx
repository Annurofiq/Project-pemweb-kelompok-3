import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Importing CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import "animate.css";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// Importing React Router
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Project-pemweb-kelompok-3">
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
