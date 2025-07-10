import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { NonMagicItem } from "@/confluxTypes";
import PrinterTest from "./PrintConflux";
import { useComponentStore } from "@/stores/ConfluxStores/useComponentStore";

const predefinedComponentMap: Record<string, string> = {
  "-1": "Crystal (Any)",
  "-2": "Fiber (Any)",
  "-3": "Herbal (Any)",
  "-4": "Liquid (Any)",
  "-5": "Metal (Any)",
  "-6": "Viscera (Any)",
  "-7": "Wood (Any)",
};

type ConfirmConfluxPrintProps = {
  disabled: boolean;
  nonMagicItem: NonMagicItem;
};

const ConfirmConfluxPrint: React.FC<ConfirmConfluxPrintProps> = ({ disabled, nonMagicItem }) => {
  const [open, setOpen] = useState(false);
  const [stackSize, setStackSize] = useState(1);
  const [disableStacks, setDisableStacks] = useState(false);
  const [stackText, setStackText] = useState<string>("Stack Size");

  const getComponentName = (componentId: number): string => {
    const key = componentId.toString();
    if (predefinedComponentMap[key]) {
      return predefinedComponentMap[key];
    }
    const component = useComponentStore.getState().getComponentById(componentId);
    return component?.name || "Unknown Component";
  };

  useEffect(() => {
    if (open) {
      setDisableStacks(false);
      setStackText("Stack Size");
      setStackSize(1);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Print</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Item</DialogTitle>
        </DialogHeader>
        <p>{nonMagicItem.name}</p>
        <p><strong>Description:</strong> {nonMagicItem.effects || "No description available."}</p>
        <Input
          placeholder={stackText}
          className="mb-4"
          disabled={disableStacks}
          onChange={(e) => {
            setStackSize(Number.isInteger(parseInt(e.target.value)) ? parseInt(e.target.value) : 1);
          }}
        />
        {nonMagicItem.components.map((component, index) => (
          <p key={index}>
            {getComponentName(component.componentId)} x {component.quantity * stackSize}
          </p>
        ))}
        <PrinterTest 
          name={nonMagicItem.name} 
          uses={stackSize}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmConfluxPrint;