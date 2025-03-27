'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSpellStore } from "@/stores/useSpellStore";
import type { Spell } from "@/types";

const categoryOptions = ["Arcane", "Shadow", "Wild"];

const AddSpellForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const addSpell = useSpellStore((state) => state.addSpell);
  const existingSpells = useSpellStore((state) => state.spells);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Arcane");
  const [rank, setRank] = useState(1);
  const [xpCost, setXpCost] = useState(0);
  const [skillCost, setSkillCost] = useState(0);
  const [specialEffect, setSpecialEffect] = useState("");

  const reset = () => {
    setName("");
    setDescription("");
    setCategory("Arcane");
    setRank(1);
    setXpCost(0);
    setSkillCost(0);
    setSpecialEffect("");
  };

  const handleAdd = () => {
    if (!name || !description || !category) return;

    const newSpell: Spell = {
      id: Math.max(0, ...existingSpells.map((s) => s.id)) + 1,
      name,
      description,
      category,
      xpCost,
      skillCost,
      rank,
      specialEffect: specialEffect || undefined,
    };

    addSpell(newSpell);
    reset();
    onSubmit?.(); // Close dialog if needed
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
        <Label>Rank</Label>
        <RadioGroup value={rank.toString()} onValueChange={(val) => setRank(Number(val))}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="1" id="rank-1" />
            <Label htmlFor="rank-1">1</Label>
            <RadioGroupItem value="2" id="rank-2" />
            <Label htmlFor="rank-2">2</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-1">
        <Label>XP Cost</Label>
        <Input type="number" value={xpCost} onChange={(e) => setXpCost(Number(e.target.value))} />
      </div>

      <div className="space-y-1">
        <Label>Skill Cost</Label>
        <Input type="number" value={skillCost} onChange={(e) => setSkillCost(Number(e.target.value))} />
      </div>

      <div className="space-y-1">
        <Label>Special Effect (optional)</Label>
        <Input value={specialEffect} onChange={(e) => setSpecialEffect(e.target.value)} />
      </div>

      <Button onClick={handleAdd} disabled={!name || !description}>
        Add Spell
      </Button>
    </div>
  );
};

export default AddSpellForm;
