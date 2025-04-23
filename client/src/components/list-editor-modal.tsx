import { useState, useEffect } from "react";
import { useEstimation } from "@/hooks/use-estimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface ListEditorModalProps {
  isOpen: boolean;
  elementId: string;
  onClose: () => void;
}

const ListEditorModal = ({ isOpen, elementId, onClose }: ListEditorModalProps) => {
  const [items, setItems] = useState<string[]>([]);
  const [paymentMilestones, setPaymentMilestones] = useState<Array<{ description: string; amount: string }>>([]);
  const { estimationState, updateEstimation } = useEstimation();

  useEffect(() => {
    if (elementId === "scopeList") {
      setItems([...estimationState.scopeList]);
    } else if (elementId === "deliverablesList") {
      setItems([...estimationState.deliverablesList]);
    } else if (elementId === "additionalServicesList") {
      setItems([...estimationState.additionalServicesList]);
    } else if (elementId === "exclusionsList") {
      setItems([...estimationState.exclusionsList]);
    } else if (elementId === "paymentMilestones") {
      setPaymentMilestones([...estimationState.paymentMilestones]);
    }
  }, [elementId, estimationState]);

  const handleAddItem = () => {
    if (elementId === "paymentMilestones") {
      setPaymentMilestones([...paymentMilestones, { description: "", amount: "" }]);
    } else {
      setItems([...items, ""]);
    }
  };

  const handleRemoveItem = (index: number) => {
    if (elementId === "paymentMilestones") {
      const updatedMilestones = [...paymentMilestones];
      updatedMilestones.splice(index, 1);
      setPaymentMilestones(updatedMilestones);
    } else {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const handleMilestoneChange = (index: number, field: "description" | "amount", value: string) => {
    const updatedMilestones = [...paymentMilestones];
    updatedMilestones[index][field] = value;
    setPaymentMilestones(updatedMilestones);
  };

  const handleSave = () => {
    if (elementId === "scopeList") {
      updateEstimation({ scopeList: items.filter(item => item.trim() !== "") });
    } else if (elementId === "deliverablesList") {
      updateEstimation({ deliverablesList: items.filter(item => item.trim() !== "") });
    } else if (elementId === "additionalServicesList") {
      updateEstimation({ additionalServicesList: items.filter(item => item.trim() !== "") });
    } else if (elementId === "exclusionsList") {
      updateEstimation({ exclusionsList: items.filter(item => item.trim() !== "") });
    } else if (elementId === "paymentMilestones") {
      updateEstimation({ paymentMilestones: paymentMilestones.filter(item => item.description.trim() !== "" || item.amount.trim() !== "") });
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit List Items</DialogTitle>
        </DialogHeader>
        
        <div className="my-4 space-y-4">
          {elementId === "paymentMilestones" ? (
            // Payment Milestones Editor
            paymentMilestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-grow space-y-2">
                  <Input
                    value={milestone.description}
                    onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                    placeholder="Milestone description"
                    className="w-full"
                  />
                  <Input
                    value={milestone.amount}
                    onChange={(e) => handleMilestoneChange(index, "amount", e.target.value)}
                    placeholder="Amount"
                    className="w-full"
                  />
                </div>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))
          ) : (
            // Regular List Editor
            items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder="List item"
                  className="flex-grow"
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))
          )}
        </div>
        
        <Button 
          onClick={handleAddItem} 
          variant="outline" 
          className="w-full bg-green-500 text-white hover:bg-green-600"
        >
          + Add New Item
        </Button>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListEditorModal;
