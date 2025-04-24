import { Route, Switch, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

// Create a custom hook for GitHub Pages compatible routing
const useBasePath = () => {
  const [basePath, setBasePath] = useState<string>("");
  
  useEffect(() => {
    // Check if we're running in GitHub Pages
    // This assumes the repository name is the first path segment
    const pathname = decodeURIComponent(window.location.pathname);
    const pathSegments = pathname.split('/');
    
    if (pathSegments.length > 1 && pathSegments[1]) {
      // We're in GitHub Pages or have a base path
      // For safety, let's clean the path
      const cleanSegment = pathSegments[1]
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/[^a-zA-Z0-9-]/g, ''); // Remove special characters
      
      setBasePath('/' + cleanSegment);
      console.log("Using base path:", '/' + cleanSegment);
    }
  }, []);
  
  return basePath;
};

function Router() {
  const basePath = useBasePath();
  
  return (
    // Use the base path as a prefix for all routes
    <WouterRouter base={basePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
