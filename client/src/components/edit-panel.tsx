import { useEstimation } from "@/hooks/use-estimation";
import { formatDateToFriendlyString } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditPanel = () => {
  const { estimationState, updateEstimation } = useEstimation();

  return (
    <aside className="w-full md:w-1/4 bg-white p-4 md:min-h-screen">
      <div className="sticky top-20">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
        
        {/* Company Settings */}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Company Details</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-600 mb-1">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                value={estimationState.companyName}
                onChange={(e) => updateEstimation({ companyName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="logoUrl" className="text-sm font-medium text-gray-600 mb-1">Company Logo URL</Label>
              <Input
                id="logoUrl"
                type="text"
                value={estimationState.logoUrl}
                placeholder="https://example.com/logo.png"
                onChange={(e) => updateEstimation({ logoUrl: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="companyEmail" className="text-sm font-medium text-gray-600 mb-1">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={estimationState.companyEmail}
                onChange={(e) => updateEstimation({ companyEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="companyPhone" className="text-sm font-medium text-gray-600 mb-1">Phone</Label>
              <Input
                id="companyPhone"
                type="text"
                value={estimationState.companyPhone}
                onChange={(e) => updateEstimation({ companyPhone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="companyWebsite" className="text-sm font-medium text-gray-600 mb-1">Website</Label>
              <Input
                id="companyWebsite"
                type="text"
                value={estimationState.companyWebsite}
                onChange={(e) => updateEstimation({ companyWebsite: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        {/* Theme Settings */}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Theme Settings</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="primaryColor" className="text-sm font-medium text-gray-600 mb-1">Primary Color</Label>
              <Input
                id="primaryColor"
                type="color"
                className="w-full h-10"
                value={estimationState.primaryColor}
                onChange={(e) => {
                  updateEstimation({ primaryColor: e.target.value });
                  document.documentElement.style.setProperty('--primary-color', e.target.value);
                }}
              />
            </div>
            <div>
              <Label htmlFor="secondaryColor" className="text-sm font-medium text-gray-600 mb-1">Secondary Color</Label>
              <Input
                id="secondaryColor"
                type="color"
                className="w-full h-10"
                value={estimationState.secondaryColor}
                onChange={(e) => {
                  updateEstimation({ secondaryColor: e.target.value });
                  document.documentElement.style.setProperty('--secondary-color', e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Quote Settings */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">Quote Details</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="quoteNumber" className="text-sm font-medium text-gray-600 mb-1">Quote Number</Label>
              <Input
                id="quoteNumber"
                type="text"
                value={estimationState.quoteNumber}
                onChange={(e) => updateEstimation({ quoteNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quoteDate" className="text-sm font-medium text-gray-600 mb-1">Quote Date</Label>
              <Input
                id="quoteDate"
                type="date"
                value={estimationState.quoteDate}
                onChange={(e) => {
                  const date = e.target.value;
                  updateEstimation({ 
                    quoteDate: date,
                    quoteDateFormatted: formatDateToFriendlyString(date)
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="validUntil" className="text-sm font-medium text-gray-600 mb-1">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={estimationState.validUntil}
                onChange={(e) => {
                  const date = e.target.value;
                  updateEstimation({ 
                    validUntil: date,
                    validUntilFormatted: formatDateToFriendlyString(date)
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="clientName" className="text-sm font-medium text-gray-600 mb-1">Client Name</Label>
              <Input
                id="clientName"
                type="text"
                value={estimationState.clientName}
                onChange={(e) => updateEstimation({ clientName: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EditPanel;
