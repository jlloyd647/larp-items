import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNonMagicItemStore } from "@/stores/ConfluxStores/useNonMagicStore";
import type { NonMagicItem } from "@/confluxTypes";

const AddNonMagic = ({ onSubmit }: { onSubmit?: () => void }) => {
  const addNonMagicItem = useNonMagicItemStore((state) => state.addNonMagicItem);
  const existingItems = useNonMagicItemStore((state) => state.nonMagicItems);

  const [name, setName] = useState("");
  const [type, setType] = useState("General");
  const [craftingLevel, setCraftingLevel] = useState(0);
  const [components, setComponents] = useState("[]");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [mind, setMind] = useState(0); // Updated to number
  const [willpower, setWillpower] = useState(0); // Updated to number
  const [requiredLores, setRequiredLores] = useState("");
  const [effects, setEffects] = useState("");
  const [generalizedEnchantment, setGeneralizedEnchantment] = useState(false);
  const [enchantmentSlots, setEnchantmentSlots] = useState(0);
  const [requirementsToCopy, setRequirementsToCopy] = useState("");

  const reset = () => {
    setName("");
    setType("General");
    setCraftingLevel(0);
    setComponents("[]");
    setTime("");
    setLocation("");
    setMind(0);
    setWillpower(0);
    setRequiredLores("");
    setEffects("");
    setGeneralizedEnchantment(false);
    setEnchantmentSlots(0);
    setRequirementsToCopy("");
  };

  const handleAdd = () => {
    if (!name || !effects) return;

    const newItem: NonMagicItem = {
      id: Math.max(0, ...existingItems.map((item) => item.id)) + 1,
      name,
      type,
      craftingLevel,
      components: JSON.parse(components),
      time,
      location,
      mind,
      willpower,
      requiredLores: requiredLores.split(",").map((lore) => lore.trim()),
      effects,
      generalizedEnchantment,
      enchantmentSlots,
      requirementsToCopy,
    };

    addNonMagicItem(newItem);
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
        <Label>Type</Label>
        <Input value={type} onChange={(e) => setType(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Crafting Level</Label>
        <Input
          type="number"
          value={craftingLevel}
          onChange={(e) => setCraftingLevel(Number(e.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label>Components (JSON)</Label>
        <Input value={components} onChange={(e) => setComponents(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Time</Label>
        <Input value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Mind</Label>
        <Input
          type="number"
          value={mind}
          onChange={(e) => setMind(Number(e.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label>Willpower</Label>
        <Input
          type="number"
          value={willpower}
          onChange={(e) => setWillpower(Number(e.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label>Required Lores (comma-separated)</Label>
        <Input value={requiredLores} onChange={(e) => setRequiredLores(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Effects</Label>
        <Input value={effects} onChange={(e) => setEffects(e.target.value)} />
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Label>Generalized Enchantment</Label>
          <Checkbox
            checked={generalizedEnchantment}
            onCheckedChange={(checked) => setGeneralizedEnchantment(checked === true)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Enchantment Slots</Label>
        <Input
          type="number"
          value={enchantmentSlots}
          onChange={(e) => setEnchantmentSlots(Number(e.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label>Requirements to Copy</Label>
        <Input
          value={requirementsToCopy}
          onChange={(e) => setRequirementsToCopy(e.target.value)}
        />
      </div>

      <Button onClick={handleAdd} disabled={!name || !effects}>
        Add Non-Magic Item
      </Button>
    </div>
  );
};

export default AddNonMagic;
