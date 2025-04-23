import { useContext } from "react";
import { EstimationContext } from "@/context/estimation-context";

export const useEstimation = () => {
  const context = useContext(EstimationContext);
  
  if (!context) {
    throw new Error("useEstimation must be used within an EstimationProvider");
  }
  
  return context;
};
