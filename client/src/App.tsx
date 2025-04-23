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
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 1 && pathSegments[1]) {
      // We're in GitHub Pages or have a base path
      setBasePath('/' + pathSegments[1]);
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
