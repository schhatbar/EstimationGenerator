import React, { createContext, useState, useEffect } from "react";

// Define the state interface
export interface EstimationState {
  // Company details
  companyName: string;
  logoUrl: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  
  // Theme settings
  primaryColor: string;
  secondaryColor: string;
  darkColor: string;
  lightColor: string;
  successColor: string;
  borderColor: string;
  
  // Quote details
  quoteNumber: string;
  quoteDate: string;
  quoteDateFormatted: string;
  validUntil: string;
  validUntilFormatted: string;
  clientName: string;
  
  // Project details
  projectTitle: string;
  projectOverview: string;
  scopeList: string[];
  deliverablesList: string[];
  timeline: string;
  totalCost: string;
  paymentMilestones: Array<{ description: string; amount: string }>;
  additionalServicesList: string[];
  additionalServicesNote: string;
  exclusionsList: string[];
  companySignature: string;
  clientSignature: string;
}

// Define the context interface
interface EstimationContextType {
  estimationState: EstimationState;
  updateEstimation: (updates: Partial<EstimationState>) => void;
  updateSpecificContent: (elementId: string, content: string) => void;
  resetToDefaults: () => void;
}

// Default state values
const defaultState: EstimationState = {
  companyName: "Digitological",
  logoUrl: "",
  companyEmail: "support@digitological.com",
  companyPhone: "+91 6351302062",
  companyWebsite: "www.digitological.com",
  
  primaryColor: "#0056b3",
  secondaryColor: "#17a2b8",
  darkColor: "#343a40",
  lightColor: "#f8f9fa",
  successColor: "#28a745",
  borderColor: "#dee2e6",
  
  quoteNumber: "WD-2025-04-11",
  quoteDate: "2025-04-11",
  quoteDateFormatted: "April 11, 2025",
  validUntil: "2025-05-11",
  validUntilFormatted: "May 11, 2025",
  clientName: "MicroActive",
  
  projectTitle: "WordPress Website Development Project Estimation",
  projectOverview: "We will design and develop a professional, responsive, and SEO-optimized website using WordPress CMS that mirrors the layout, structure, and functionality of the reference site while aligning with your brand identity.",
  
  scopeList: [
    "Custom WordPress theme design and development",
    "Homepage + Internal Pages (About Us, Products, Contact, etc.)",
    "Product listing pages with images, specs, and inquiry options",
    "Responsive mobile & tablet-friendly design",
    "Basic SEO setup (meta tags, URLs, etc.)",
    "Contact form with email notifications",
    "WhatsApp updates, SMS updates and E-mail Updates",
    "Speed & performance optimization",
    "SSL and basic security configuration",
    "Payment gateway",
    "Yoast SEO Setup (Subscription ₹9,000/- Per Year)",
    "6-months of post-launch support & maintenance"
  ],
  
  deliverablesList: [
    "Fully functional WordPress website",
    "Admin panel access with basic usage training",
    "Backup of site files and database",
    "Support for deployment on client's server"
  ],
  
  timeline: "<strong>Total Duration:</strong> 30 Working Days",
  
  totalCost: "Total Cost: ₹1,25,000.00/- (Rupees One Hundred and Twenty Five Thousand Only)",
  
  paymentMilestones: [
    { description: "50% Advance Payment upon project initiation", amount: "₹62,500/-" },
    { description: "50% Balance upon completion and prior to handover", amount: "₹62,500/-" },
    { description: "Content Creation (if selected)", amount: "₹10,000/-" },
    { description: "Yoast SEO Setup (if selected)", amount: "₹12,000/-" }
  ],
  
  additionalServicesList: [
    "Content Creation (if not provided by client): <strong>₹10,000/-</strong>"
  ],
  
  additionalServicesNote: "This includes professional copywriting for website pages, product descriptions, and basic SEO-optimized content.",
  
  exclusionsList: [
    "Domain & Hosting (can be arranged separately if required)",
    "Content writing or stock images (if not provided by client)",
    "Advanced features beyond scope will be quoted additionally",
    "Third Party Integrations Registration and Cost related to that (Whatsapp Updates, E-mail Updates and SMS updates)"
  ],
  
  companySignature: "For Digitological",
  clientSignature: "For Client"
};

// Create context with default values
export const EstimationContext = createContext<EstimationContextType>({
  estimationState: defaultState,
  updateEstimation: () => {},
  updateSpecificContent: () => {},
  resetToDefaults: () => {},
});

interface EstimationProviderProps {
  children: React.ReactNode;
}

export const EstimationProvider: React.FC<EstimationProviderProps> = ({ children }) => {
  // Load state from localStorage or use default
  const [state, setState] = useState<EstimationState>(() => {
    try {
      const savedState = localStorage.getItem("estimationState");
      return savedState ? JSON.parse(savedState) : defaultState;
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
      return defaultState;
    }
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("estimationState", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  }, [state]);

  // Update state with partial updates
  const updateEstimation = (updates: Partial<EstimationState>) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  // Update specific content based on element ID
  const updateSpecificContent = (elementId: string, content: string) => {
    switch (elementId) {
      case "logoContainer":
        updateEstimation({ companyName: content });
        break;
      case "projectTitle":
        updateEstimation({ projectTitle: content });
        break;
      case "clientNameDisplay":
        updateEstimation({ clientName: content });
        break;
      case "quoteNumberDisplay":
        // Strip "Quote #: " prefix if present
        updateEstimation({ 
          quoteNumber: content.replace(/Quote #:\s*/, "") 
        });
        break;
      case "quoteDateDisplay":
        updateEstimation({ quoteDateFormatted: content });
        break;
      case "validUntilDisplay":
        updateEstimation({ validUntilFormatted: content });
        break;
      case "projectOverview":
        updateEstimation({ projectOverview: content });
        break;
      case "timeline":
        updateEstimation({ timeline: content });
        break;
      case "totalCost":
        updateEstimation({ totalCost: content });
        break;
      case "additionalServicesNote":
        updateEstimation({ additionalServicesNote: content });
        break;
      case "companySignature":
        updateEstimation({ companySignature: content });
        break;
      case "clientSignature":
        updateEstimation({ clientSignature: content });
        break;
      case "emailDisplay":
        updateEstimation({ companyEmail: content });
        break;
      case "phoneDisplay":
        updateEstimation({ companyPhone: content });
        break;
      case "websiteDisplay":
        updateEstimation({ companyWebsite: content });
        break;
      default:
        break;
    }
  };

  // Reset to default values
  const resetToDefaults = () => {
    setState(defaultState);
  };

  // Apply theme colors to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', state.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', state.secondaryColor);
    document.documentElement.style.setProperty('--dark-color', state.darkColor);
    document.documentElement.style.setProperty('--light-color', state.lightColor);
    document.documentElement.style.setProperty('--success-color', state.successColor);
    document.documentElement.style.setProperty('--border-color', state.borderColor);
  }, [state.primaryColor, state.secondaryColor, state.darkColor, state.lightColor, state.successColor, state.borderColor]);

  return (
    <EstimationContext.Provider
      value={{
        estimationState: state,
        updateEstimation,
        updateSpecificContent,
        resetToDefaults,
      }}
    >
      {children}
    </EstimationContext.Provider>
  );
};
