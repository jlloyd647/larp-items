import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ArtisanRecipe } from "@/types";
import { Input } from "./ui/input";
import PrinterTest from "@/components/PrinterTest";

interface ConfirmPrintProps {
  disabled: boolean;
  selectedRecipe: ArtisanRecipe,
  selectedPrimaryResource: string | null | undefined;
  selectedSecondaryResource: string | null | undefined;
  primaryResourceText?: string | null | undefined;
  secondaryResourceText?: string | null | undefined;
  itemUses?: number | null;
}

const ConfirmPrint: React.FC<ConfirmPrintProps> = ({
  disabled,
  selectedRecipe,
  selectedPrimaryResource,
  selectedSecondaryResource,
  primaryResourceText,
  secondaryResourceText,
  itemUses,
}) => {
  const [open, setOpen] = useState(false);
  const [uses, setUses] = useState(1);
  const [disableStacks, setDisableStacks] = useState(false);
  const [stackText, setStackText] = useState<string>('Stack Size');
  

  useEffect(() => {
    if (open) {
      if (itemUses && itemUses > 1) {
        setUses(itemUses);
        setDisableStacks(true);
        setStackText('Multi-use consumables cannot be stacked');
      } else {
        setDisableStacks(false);
        setStackText('Stack Size');
        setUses(1);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Confirm</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Recipe</DialogTitle>
        </DialogHeader>
        <p>{selectedRecipe.name}</p>
        <p>{selectedPrimaryResource} x{itemUses && itemUses > 1 ? selectedRecipe.primaryResourceQuantity : selectedRecipe.primaryResourceQuantity * uses}</p>
        {selectedSecondaryResource && <p>{selectedSecondaryResource} x{itemUses && itemUses > 1? selectedRecipe?.secondaryResourceQuantity : selectedRecipe?.secondaryResourceQuantity * uses}</p>}
        <Input
          placeholder={stackText}
          className="mb-4"
          disabled={disableStacks}
          onChange={(e) => {
            setUses(Number.isInteger(parseInt(e.target.value)) ? parseInt(e.target.value) : 1)
          }}
          />
          <PrinterTest 
            name={selectedRecipe.name} 
            description={selectedRecipe.description}
            primaryResourceText={primaryResourceText} 
            secondaryResourceText={secondaryResourceText}
            uses={uses}
          />
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPrint;