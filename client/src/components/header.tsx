import { Button } from "@/components/ui/button";
import { Pencil, Eye, FileDown } from "lucide-react";

interface HeaderProps {
  editMode: boolean;
  onEditClick: () => void;
  onPreviewClick: () => void;
  onExportPDF: () => void;
}

const Header = ({ editMode, onEditClick, onPreviewClick, onExportPDF }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-blue-600">Estimation Generator</h1>
        </div>
        <div className="flex items-center space-x-3 mt-3 sm:mt-0">
          <Button
            variant={editMode ? "default" : "outline"}
            className={editMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            onClick={onEditClick}
          >
            <Pencil className="h-5 w-5 mr-1" />
            Edit Mode
          </Button>
          <Button
            variant={!editMode ? "default" : "outline"}
            className={!editMode ? "bg-cyan-600 text-white hover:bg-cyan-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            onClick={onPreviewClick}
          >
            <Eye className="h-5 w-5 mr-1" />
            Preview
          </Button>
          <Button
            onClick={onExportPDF}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <FileDown className="h-5 w-5 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
