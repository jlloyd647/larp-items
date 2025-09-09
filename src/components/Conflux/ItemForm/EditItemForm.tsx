import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNonMagicItemStore } from '@/stores/ConfluxStores/useNonMagicStore';
import ComponentSelectionDropdown from '@/components/ComponentSelectionDropdown';
import { useComponentStore } from "@/stores/ConfluxStores/useComponentStore";

type EditItemFormProps = {
  itemId: number;
  onClose: () => void;
};

const EditItemForm = ({ itemId, onClose }: EditItemFormProps) => {
  const item = useNonMagicItemStore((state) =>
    state.getNonMagicItemById(itemId)
  );
  const updateItem = useNonMagicItemStore((state) => state.updateNonMagicItem);
  const components = useComponentStore((state) => state.components);

  const [name, setName] = useState('');
  const [craftingLevel, setCraftingLevel] = useState('');
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [effects, setEffects] = useState('');
  const [mind, setMind] = useState(0);
  const [willpower, setWillpower] = useState(0);
  const [requiredLores, setRequiredLores] = useState('');
  const [tagEffects, setTagEffects] = useState('');
  const [generalizedEnchantment, setGeneralizedEnchantment] = useState(false);
  const [isStackable, setIsStackable] = useState(false);
  const [baseStackSize, setBaseStackSize] = useState(0);
  const [enchantmentSlots, setEnchantmentSlots] = useState(0);
  const [requirementsToCopy, setRequirementsToCopy] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<
    { componentId: number; quantity: number; level?: number }[]
  >([]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCraftingLevel(item.craftingLevel.toString());
      setType(item.type);
      setTime(item.time);
      setLocation(item.location);
      setEffects(item.effects);
      setMind(item.mind || 0);
      setWillpower(item.willpower || 0);
      setRequiredLores(item.requiredLores?.join(', ') || '');
      setTagEffects(item.tagEffects || '');
      setGeneralizedEnchantment(item.generalizedEnchantment);
      setIsStackable(item.isStackable || false);
      setBaseStackSize(item.baseStackSize || 1);
      setEnchantmentSlots(item.enchantmentSlots || 0);
      setRequirementsToCopy(item.requirementsToCopy || '');
      setHasChanges(false);
    }
  }, [item]);

  const handleSave = () => {
    if (!item) return;

    updateItem({
      ...item,
      name,
      craftingLevel: parseInt(craftingLevel, 10),
      type,
      time,
      location,
      effects,
      mind,
      willpower,
      requiredLores: requiredLores.split(',').map((lore) => lore.trim()),
      tagEffects,
      generalizedEnchantment,
      isStackable,
      baseStackSize,
      enchantmentSlots,
      requirementsToCopy,
      // components: selectedComponents, // Include selected components
    });

    setHasChanges(false);
    onClose();
  };

  const handleComponentSelection = (
    updatedComponents: { id: number; quantity: number; level: number }[]
  ) => {
    setSelectedComponents(
      updatedComponents.map((comp) => ({
        componentId: comp.id,
        quantity: comp.quantity,
        level: comp.level,
      }))
    );
    setHasChanges(true);
  };

  if (!item) return <p className="text-sm text-destructive">Item not found.</p>;

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1">
        <Label htmlFor="item-name">Name</Label>
        <Input
          id="item-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="item-effects">Effects</Label>
        <Textarea
          id="item-effects"
          value={effects}
          onChange={(e) => {
            setEffects(e.target.value);
            setHasChanges(true);
          }}
          className="border rounded px-2 py-1 w-full"
          rows={4}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="item-tag-effects">Tag Effects</Label>
        <Input
          id="item-tag-effects"
          value={tagEffects}
          onChange={(e) => {
            setTagEffects(e.target.value);
            setHasChanges(true);
          }}
          className="border rounded px-2 py-1 w-full"
          rows={2}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="item-is-stackable">Is Stackable</Label>
        <div className="flex items-center space-x-2">
          <input
            id="item-is-stackable"
            type="checkbox"
            checked={isStackable}
            onChange={(e) => {
              setIsStackable(e.target.checked);
              setHasChanges(true);
            }}
          />
        </div>
        <Label htmlFor="item-effects">Base Stack Size</Label>
        <Input
          id="item-base-stack-size"
          type="number"
          value={baseStackSize}
          onChange={(e) => {
            setBaseStackSize(parseInt(e.target.value, 10));
            setHasChanges(true);
          }}
        />
      </div>

      {/* <div className="space-y-1">
        <Label>Components</Label>
        <ComponentSelectionDropdown
          components={components}
          selectedComponentIds={selectedComponents.map((c) => c.componentId)}
        />
      </div> */}

      <div className="flex space-x-4">
        <div className="space-y-1 flex-1">
          <Label htmlFor="item-time">Time</Label>
          <Input
            id="item-time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setHasChanges(true);
            }}
          />
        </div>

        <div className="space-y-1 flex-1">
          <Label htmlFor="item-location">Location</Label>
          <Input
            id="item-location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setHasChanges(true);
            }}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="space-y-1 flex-1">
          <Label htmlFor="item-mind">Mind</Label>
          <Input
            id="item-mind"
            type="number"
            value={mind}
            onChange={(e) => {
              setMind(parseInt(e.target.value, 10));
              setHasChanges(true);
            }}
          />
        </div>

        <div className="space-y-1 flex-1">
          <Label htmlFor="item-willpower">Willpower</Label>
          <Input
            id="item-willpower"
            type="number"
            value={willpower}
            onChange={(e) => {
              setWillpower(parseInt(e.target.value, 10));
              setHasChanges(true);
            }}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="space-y-1 flex-1">
          <Label htmlFor="item-enchantment-slots">Enchantment Slots</Label>
          <Input
            id="item-enchantment-slots"
            type="number"
            value={enchantmentSlots}
            onChange={(e) => {
              setEnchantmentSlots(parseInt(e.target.value, 10));
              setHasChanges(true);
            }}
          />
        </div>

        <div className="space-y-1 flex-1">
          <Label htmlFor="item-generalized-enchantment">Generalized Enchantment</Label>
          <div className="flex items-center space-x-2">
            <input
              id="item-generalized-enchantment"
              type="checkbox"
              checked={generalizedEnchantment}
              onChange={(e) => {
                setGeneralizedEnchantment(e.target.checked);
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!hasChanges}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditItemForm;
