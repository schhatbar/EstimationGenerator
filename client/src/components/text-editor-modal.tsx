import { useState, useEffect } from "react";
import { useEstimation } from "@/hooks/use-estimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextEditorModalProps {
  isOpen: boolean;
  elementId: string;
  initialContent: string;
  onClose: () => void;
}

const TextEditorModal = ({ isOpen, elementId, initialContent, onClose }: TextEditorModalProps) => {
  const [content, setContent] = useState(initialContent);
  const { updateSpecificContent } = useEstimation();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = () => {
    updateSpecificContent(elementId, content);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        
        <div className="my-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px] w-full p-3"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TextEditorModal;
