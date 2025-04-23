import { forwardRef } from "react";
import { useEstimation } from "@/hooks/use-estimation";
import { Check, CircleDot } from "lucide-react";

interface EstimationDocumentProps {
  editMode: boolean;
  onOpenTextEditor: (elementId: string, content: string) => void;
  onOpenListEditor: (elementId: string) => void;
}

const EstimationDocument = forwardRef<HTMLDivElement, EstimationDocumentProps>(
  ({ editMode, onOpenTextEditor, onOpenListEditor }, ref) => {
    const { estimationState } = useEstimation();

    // Handler for editable elements
    const handleEditableClick = (e: React.MouseEvent, elementId: string) => {
      if (!editMode) return;

      e.preventDefault();
      e.stopPropagation();

      const element = e.currentTarget;
      const content = element.innerHTML.replace(/<span class="edit-indicator">.*?<\/span>/, "").trim();

      // Check if this is a list
      if (
        elementId === "scopeList" ||
        elementId === "deliverablesList" ||
        elementId === "additionalServicesList" ||
        elementId === "exclusionsList" ||
        elementId === "paymentMilestones"
      ) {
        onOpenListEditor(elementId);
      } else {
        onOpenTextEditor(elementId, content);
      }
    };

    return (
      <div 
        ref={ref} 
        id="estimationDocument" 
        className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto"
        style={{
          "--primary-color": estimationState.primaryColor,
          "--secondary-color": estimationState.secondaryColor,
        } as React.CSSProperties}
      >
        <div className="p-8">
          {/* Header */}
          <header className="text-center pb-8 border-b border-gray-300">
            <div 
              className="mb-4" 
              data-editable="true" 
              id="logoContainer"
              onClick={(e) => handleEditableClick(e, "logoContainer")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.logoUrl ? (
                <img src={estimationState.logoUrl} alt="Company Logo" className="max-h-16 mx-auto" />
              ) : (
                <h1 className="text-3xl font-semibold" style={{ color: estimationState.primaryColor }}>
                  {estimationState.companyName}
                </h1>
              )}
            </div>
            <h1 
              className="text-2xl font-bold" 
              style={{ color: estimationState.primaryColor }}
              data-editable="true" 
              id="projectTitle"
              onClick={(e) => handleEditableClick(e, "projectTitle")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.projectTitle}
            </h1>
          </header>
          
          {/* Company and Client Info */}
          <div className="flex flex-col md:flex-row justify-between my-8 pb-5 border-b border-gray-200">
            <div className="client-details">
              <h3 className="font-semibold">Client:</h3>
              <p 
                data-editable="true" 
                id="clientNameDisplay"
                onClick={(e) => handleEditableClick(e, "clientNameDisplay")}
              >
                <span className="edit-indicator">✎</span>
                {estimationState.clientName}
              </p>
            </div>
            
            <div className="quote-details text-right">
              <h2 
                className="text-xl font-semibold"
                style={{ color: estimationState.primaryColor }}
                data-editable="true" 
                id="quoteNumberDisplay"
                onClick={(e) => handleEditableClick(e, "quoteNumberDisplay")}
              >
                <span className="edit-indicator">✎</span>
                Quote #: {estimationState.quoteNumber}
              </h2>
              <p className="mt-2">
                <strong>Date:</strong>{" "}
                <span 
                  data-editable="true" 
                  id="quoteDateDisplay"
                  onClick={(e) => handleEditableClick(e, "quoteDateDisplay")}
                >
                  <span className="edit-indicator">✎</span>
                  {estimationState.quoteDateFormatted}
                </span>
              </p>
              <p>
                <strong>Valid Until:</strong>{" "}
                <span 
                  data-editable="true" 
                  id="validUntilDisplay"
                  onClick={(e) => handleEditableClick(e, "validUntilDisplay")}
                >
                  <span className="edit-indicator">✎</span>
                  {estimationState.validUntilFormatted}
                </span>
              </p>
            </div>
          </div>
          
          {/* Project Overview */}
          <section className="my-8">
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Project Overview
            </h2>
            <p 
              data-editable="true" 
              id="projectOverview"
              onClick={(e) => handleEditableClick(e, "projectOverview")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.projectOverview}
            </p>
          </section>
          
          {/* Scope of Work */}
          <section className="my-8">
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Scope of Work
            </h2>
            <ul 
              className="pl-8 space-y-2" 
              data-editable="true" 
              id="scopeList"
              onClick={(e) => handleEditableClick(e, "scopeList")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.scopeList.map((item, index) => (
                <li 
                  key={index} 
                  className="relative pl-6"
                  style={{ 
                    position: 'relative',
                  }}
                >
                  <Check 
                    className="absolute left-0 top-1" 
                    size={16} 
                    style={{ color: estimationState.successColor }} 
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          
          {/* Deliverables */}
          <section className="my-8">
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Deliverables
            </h2>
            <ul 
              className="pl-8 space-y-2" 
              data-editable="true" 
              id="deliverablesList"
              onClick={(e) => handleEditableClick(e, "deliverablesList")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.deliverablesList.map((item, index) => (
                <li 
                  key={index} 
                  className="relative pl-6"
                  style={{ 
                    position: 'relative',
                  }}
                >
                  <Check 
                    className="absolute left-0 top-1" 
                    size={16} 
                    style={{ color: estimationState.successColor }} 
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          
          {/* Timeline */}
          <section className="my-8 bg-gray-50 p-5 rounded-md">
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Timeline
            </h2>
            <p 
              data-editable="true" 
              id="timeline"
              onClick={(e) => handleEditableClick(e, "timeline")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.timeline}
            </p>
          </section>
          
          {/* Cost */}
          <section className="my-8 bg-blue-50 p-5 rounded-md">
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Commercials
            </h2>
            <div 
              className="text-2xl font-bold my-4" 
              style={{ color: estimationState.primaryColor }}
              data-editable="true" 
              id="totalCost"
              onClick={(e) => handleEditableClick(e, "totalCost")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.totalCost}
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Payment Milestones:</h3>
              <div 
                className="space-y-2" 
                data-editable="true" 
                id="paymentMilestones"
                onClick={(e) => handleEditableClick(e, "paymentMilestones")}
              >
                <span className="edit-indicator">✎</span>
                {estimationState.paymentMilestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className="flex justify-between pb-2 border-b border-dashed border-gray-300"
                  >
                    <span>{milestone.description}</span>
                    <span className="font-medium">{milestone.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Additional Services */}
          <section className="my-8 bg-blue-50 p-5 rounded-md border-l-4" style={{ borderLeftColor: estimationState.secondaryColor }}>
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Additional Services
            </h2>
            <ul 
              className="pl-8 space-y-2" 
              data-editable="true" 
              id="additionalServicesList"
              onClick={(e) => handleEditableClick(e, "additionalServicesList")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.additionalServicesList.map((item, index) => (
                <li 
                  key={index} 
                  className="relative pl-6"
                  style={{ 
                    position: 'relative',
                  }}
                >
                  <Check 
                    className="absolute left-0 top-1" 
                    size={16} 
                    style={{ color: estimationState.successColor }} 
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p 
              className="italic mt-2" 
              data-editable="true" 
              id="additionalServicesNote"
              onClick={(e) => handleEditableClick(e, "additionalServicesNote")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.additionalServicesNote}
            </p>
          </section>
          
          {/* Exclusions */}
          <section className="my-8">
            <h2 
              className="text-xl font-semibold pb-2 border-b border-gray-200 mb-4"
              style={{ color: estimationState.secondaryColor }}
            >
              Exclusions / Additional Costs
            </h2>
            <ul 
              className="pl-8 space-y-2" 
              data-editable="true" 
              id="exclusionsList"
              onClick={(e) => handleEditableClick(e, "exclusionsList")}
            >
              <span className="edit-indicator">✎</span>
              {estimationState.exclusionsList.map((item, index) => (
                <li 
                  key={index} 
                  className="relative pl-6"
                  style={{ 
                    position: 'relative',
                  }}
                >
                  <CircleDot 
                    className="absolute left-0 top-1" 
                    size={16} 
                    style={{ color: estimationState.darkColor }} 
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          
          {/* Signature Area */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-12">
            <div className="w-full md:w-1/2 border-t border-gray-800 pt-3 text-center">
              <p 
                data-editable="true" 
                id="companySignature"
                onClick={(e) => handleEditableClick(e, "companySignature")}
              >
                <span className="edit-indicator">✎</span>
                For {estimationState.companyName}
              </p>
              <div className="h-16"></div>
              <p>Authorized Signature</p>
            </div>
            
            <div className="w-full md:w-1/2 border-t border-gray-800 pt-3 text-center">
              <p 
                data-editable="true" 
                id="clientSignature"
                onClick={(e) => handleEditableClick(e, "clientSignature")}
              >
                <span className="edit-indicator">✎</span>
                For Client
              </p>
              <div className="h-16"></div>
              <p>Authorized Signature</p>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="mb-4">Thank you for considering our services. We look forward to working with you!</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center">
                <span className="mr-1">📧</span>
                <span 
                  data-editable="true" 
                  id="emailDisplay"
                  onClick={(e) => handleEditableClick(e, "emailDisplay")}
                >
                  <span className="edit-indicator">✎</span>
                  {estimationState.companyEmail}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">📱</span>
                <span 
                  data-editable="true" 
                  id="phoneDisplay"
                  onClick={(e) => handleEditableClick(e, "phoneDisplay")}
                >
                  <span className="edit-indicator">✎</span>
                  {estimationState.companyPhone}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🌐</span>
                <span 
                  data-editable="true" 
                  id="websiteDisplay"
                  onClick={(e) => handleEditableClick(e, "websiteDisplay")}
                >
                  <span className="edit-indicator">✎</span>
                  {estimationState.companyWebsite}
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
);

EstimationDocument.displayName = "EstimationDocument";

export default EstimationDocument;
