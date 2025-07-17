import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNonMagicItemStore } from "@/stores/ConfluxStores/useNonMagicStore";
import { useComponentStore } from "@/stores/ConfluxStores/useComponentStore";
import type { NonMagicItem, ItemType } from "@/confluxTypes";
import ComponentSelectionDropdown from "@/components/ComponentSelectionDropdown";

const AddNonMagic = ({ onSubmit }: { onSubmit?: () => void }) => {
  const addNonMagicItem = useNonMagicItemStore((state) => state.addNonMagicItem);
  const existingItems = useNonMagicItemStore((state) => state.nonMagicItems);
  const components = useComponentStore((state) => state.components);

  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType | "">("");
  const [craftingLevel, setCraftingLevel] = useState<1 | 2 | 3>(1);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [mind, setMind] = useState(0); // Updated to number
  const [willpower, setWillpower] = useState(0); // Updated to number
  const [requiredLores, setRequiredLores] = useState("");
  const [effects, setEffects] = useState("");
  const [generalizedEnchantment, setGeneralizedEnchantment] = useState(false);
  const [enchantmentSlots, setEnchantmentSlots] = useState(0);
  const [requirementsToCopy, setRequirementsToCopy] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<
    { componentId: number; quantity: number; level?: number }[]
  >([]);

  const reset = () => {
    setName("");
    setCraftingLevel(1);
    setSelectedComponents([]); // Reset selected components
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

  const handleComponentSelection = (
    updatedComponents: { componentId: number; quantity: number; level?: number }[]
  ) => {
    setSelectedComponents(updatedComponents);
  };

  const handleAdd = () => {
    if (!name || !effects) return;

    const newItem: NonMagicItem = {
      id: Math.max(0, ...existingItems.map((item) => item.id)) + 1,
      name,
      type,
      craftingLevel,
      components: selectedComponents,
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
        <Label>Effects</Label>
        <textarea
          value={effects}
          onChange={(e) => setEffects(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          rows={4}
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label>Type</Label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ItemType)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              -- Select Type --
            </option>
            {["non-magic", "alchemy", "enchanting", "ritual crystal"].map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="w-2/5">
          <Label>Crafting Level</Label>
          <select
            value={craftingLevel}
            onChange={(e) => setCraftingLevel(Number(e.target.value) as 1 | 2 | 3)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {[1, 2, 3].map((level) => (
              <option key={level} value={level}>
                Level {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Components</Label>
        <ComponentSelectionDropdown
          components={components}
          selectedComponentIds={selectedComponents.map((c) => c.componentId)}
          onSelect={(ids) =>
            handleComponentSelection(
              ids.map((id) => ({
                componentId: id,
                quantity: 1, // Default quantity
                level: undefined, // Default level
              }))
            )
          }
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label>Time</Label>
          <Input value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="flex-1">
          <Label>Location</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label>Mind</Label>
          <Input
            type="number"
            value={mind}
            onChange={(e) => setMind(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <Label>Willpower</Label>
          <Input
            type="number"
            value={willpower}
            onChange={(e) => setWillpower(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label>Enchantment Slots</Label>
          <Input
            type="number"
            value={enchantmentSlots}
            onChange={(e) => setEnchantmentSlots(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label>Generalized Enchantment</Label>
          <Checkbox
            checked={generalizedEnchantment}
            onCheckedChange={(checked) => setGeneralizedEnchantment(checked === true)}
          />
        </div>
      </div>


      <div className="space-y-1">
        <Label>Required Lores</Label>
        <Input value={requiredLores} onChange={(e) => setRequiredLores(e.target.value)} />
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
