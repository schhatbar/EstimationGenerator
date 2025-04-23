import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { EstimationProvider } from "./context/estimation-context";

createRoot(document.getElementById("root")!).render(
  <EstimationProvider>
    <App />
  </EstimationProvider>
);
