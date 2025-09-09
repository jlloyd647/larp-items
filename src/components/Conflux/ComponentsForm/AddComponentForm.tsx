'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useComponentStore } from "@/stores/ConfluxStores/useComponentStore";
import type { Component } from "@/confluxTypes";

const categoryOptions = ["Crystal", "Fiber", "Herbal", "Liquid", "Metal", "Viscera", "Wood"];

const AddComponentForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const addComponent = useComponentStore((state) => state.addComponent);
  const existingComponents = useComponentStore((state) => state.components);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Crystal");
  const [level, setLevel] = useState(0);

  const reset = () => {
    setName("");
    setDescription("");
    setLevel(0);
    setType("Crystal");
  };

  const handleAdd = () => {
    if (!name || !description) return;

    const newComponent: Component = {
      id: Math.max(0, ...existingComponents.map((c) => c.id)) + 1,
      name,
      description,
      level,
      type,
    };

    addComponent(newComponent);
    reset();
    onSubmit?.();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Type and Level</Label>
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-2 py-1 w-[60%]"
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="border rounded px-2 py-1 w-[40%]"
          >
            {[1, 2, 3].map((lvl) => (
              <option key={lvl} value={lvl}>
                Level {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={handleAdd} disabled={!name || !description}>
        Add Component
      </Button>
    </div>
  );
};

export default AddComponentForm;
