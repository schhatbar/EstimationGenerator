import { useState, useRef } from "react";
import Header from "@/components/header";
import EditPanel from "@/components/edit-panel";
import EstimationDocument from "@/components/estimation-document";
import TextEditorModal from "@/components/text-editor-modal";
import ListEditorModal from "@/components/list-editor-modal";
import { useEstimation } from "@/hooks/use-estimation";
import { generatePDF } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [editMode, setEditMode] = useState(false);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [isListEditorOpen, setIsListEditorOpen] = useState(false);
  const [currentEditingElement, setCurrentEditingElement] = useState<string | null>(null);
  const [currentEditContent, setCurrentEditContent] = useState("");
  const estimationRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { estimationState } = useEstimation();

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePreviewClick = () => {
    setEditMode(false);
  };

  const handleExportPDF = async () => {
    if (!estimationRef.current) return;

    try {
      await generatePDF(
        estimationRef.current,
        `${estimationState.projectTitle.replace(/\s+/g, "-").toLowerCase()}-estimation.pdf`
      );
      toast({
        title: "PDF Generated Successfully",
        description: "Your estimation document has been exported to PDF.",
      });
    } catch (error) {
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openTextEditor = (elementId: string, content: string) => {
    setCurrentEditingElement(elementId);
    setCurrentEditContent(content);
    setIsTextEditorOpen(true);
  };

  const openListEditor = (elementId: string) => {
    setCurrentEditingElement(elementId);
    setIsListEditorOpen(true);
  };

  const closeTextEditor = () => {
    setIsTextEditorOpen(false);
    setCurrentEditingElement(null);
    setCurrentEditContent("");
  };

  const closeListEditor = () => {
    setIsListEditorOpen(false);
    setCurrentEditingElement(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        editMode={editMode}
        onEditClick={handleEditClick}
        onPreviewClick={handlePreviewClick}
        onExportPDF={handleExportPDF}
      />
      
      <div className="container mx-auto flex flex-col md:flex-row">
        {editMode && (
          <EditPanel />
        )}
        
        <main className={`w-full ${editMode ? 'md:w-3/4' : 'md:w-full'} bg-gray-100 p-4`}>
          <EstimationDocument
            ref={estimationRef}
            editMode={editMode}
            onOpenTextEditor={openTextEditor}
            onOpenListEditor={openListEditor}
          />
        </main>
      </div>

      {isTextEditorOpen && currentEditingElement && (
        <TextEditorModal
          isOpen={isTextEditorOpen}
          elementId={currentEditingElement}
          initialContent={currentEditContent}
          onClose={closeTextEditor}
        />
      )}

      {isListEditorOpen && currentEditingElement && (
        <ListEditorModal
          isOpen={isListEditorOpen}
          elementId={currentEditingElement}
          onClose={closeListEditor}
        />
      )}
    </div>
  );
};

export default Home;
