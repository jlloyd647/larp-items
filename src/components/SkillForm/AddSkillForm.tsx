'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSkillStore } from "@/stores/useSkillStore";
import type { Skill } from "@/types";

const categoryOptions = ["Adaptability", "Combat", "Gunslinger", "Doctoring", "Social", "Espionage"]; // Adjust as needed

const AddSkillForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const addSkill = useSkillStore((state) => state.addSkill);
  const existingSkills = useSkillStore((state) => state.skills);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Combat");
  const [xpCost, setXpCost] = useState(0);
  const [skillCost, setSkillCost] = useState(0);
  const [ranks, setRanks] = useState(1); // can be 1 or 2

  const reset = () => {
    setName("");
    setDesc("");
    setCategory("Combat");
    setXpCost(0);
    setSkillCost(0);
    setRanks(1);
  };

  const handleAdd = () => {
    if (!name || !desc) return;

    const newSkill: Skill = {
      id: Math.max(0, ...existingSkills.map((s) => s.id)) + 1,
      name,
      desc,
      category,
      xpCost,
      skillCost,
      ranks,
    };

    addSkill(newSkill);
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
        <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Category</Label>
        <div className="flex gap-2">
          {categoryOptions.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "ghost"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Ranks</Label>
        <Input type="number" value={ranks} onChange={(e) => setRanks(Number(e.target.value))} />
      </div>

      <div className="space-y-1">
        <Label>XP Cost</Label>
        <Input type="number" value={xpCost} onChange={(e) => setXpCost(Number(e.target.value))} />
      </div>

      <div className="space-y-1">
        <Label>Skill Cost</Label>
        <Input type="number" value={skillCost} onChange={(e) => setSkillCost(Number(e.target.value))} />
      </div>

      <Button onClick={handleAdd} disabled={!name || !desc}>
        Add Skill
      </Button>
    </div>
  );
};

export default AddSkillForm;
