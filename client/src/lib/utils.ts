import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToFriendlyString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Function to convert HTML content to PDF
export async function generatePDF(element: HTMLElement, filename: string): Promise<void> {
  try {
    const html2pdf = (await import("html2pdf.js")).default;
    
    // Hide edit indicators before converting
    const editIndicators = element.querySelectorAll(".edit-indicator");
    editIndicators.forEach((indicator) => {
      (indicator as HTMLElement).style.display = "none";
    });

    const options = {
      margin: 10,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    await html2pdf().set(options).from(element).save();

    // Show edit indicators again after PDF is generated
    editIndicators.forEach((indicator) => {
      (indicator as HTMLElement).style.display = "";
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
