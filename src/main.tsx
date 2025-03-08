
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the root element exists before attempting to render
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element. Check your HTML file.");
} else {
  createRoot(rootElement).render(<App />);
}
