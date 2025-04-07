'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useMagicItemStore } from '@/stores/useMagicItemStore';
import type { MagicItem } from '@/types';

type MagicItemEditFormProps = {
  characterId: number;
  closeDialog: () => void;
  existingItem?: MagicItem;
};

const MagicItemEditForm = ({ characterId, closeDialog, existingItem }: MagicItemEditFormProps) => {
  const [name, setName] = useState('');
  const [coreName, setCoreName] = useState('');
  const [coreDesc, setCoreDesc] = useState('');
  const [minorAbilities, setMinorAbilities] = useState<any[]>([]);
  const [majorAbilities, setMajorAbilities] = useState<any[]>([]);

  const items = useMagicItemStore((s) => s.items);
  const addItem = useMagicItemStore((s) => s.addItem);
  const updateItem = useMagicItemStore((s) => s.updateItem);

  useEffect(() => {
    if (existingItem) {
      setName(existingItem.name);
      setCoreName(existingItem.coreAbilityName);
      setCoreDesc(existingItem.coreAbilityDescription);
      setMinorAbilities(existingItem.minorAbilities ?? []);
      setMajorAbilities(existingItem.majorAbilities ?? []);
    }
  }, [existingItem]);

  const getNextId = () => {
    const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
    return maxId + 1;
  };

  const handleSubmit = () => {
    if (!name || !coreName || !coreDesc) return;

    const baseData = {
      name,
      coreAbilityName: coreName,
      coreAbilityDescription: coreDesc,
      characterId,
      cXpSpent: existingItem?.cXpSpent ?? 0,
      minorAbilities,
      majorAbilities,
      deleted: false,
    };

    if (existingItem) {
      updateItem(existingItem.id, baseData);
    } else {
      addItem({
        ...baseData,
        id: getNextId(),
      });
    }

    closeDialog();
  };

  const updateMinor = (index: number, key: string, value: any) => {
    setMinorAbilities((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [key]: value } : m))
    );
  };

  const updateMajor = (index: number, key: string, value: any) => {
    setMajorAbilities((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [key]: value } : m))
    );
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Core Ability Name" value={coreName} onChange={(e) => setCoreName(e.target.value)} />
      <Textarea placeholder="Core Ability Description" value={coreDesc} onChange={(e) => setCoreDesc(e.target.value)} />

      <div className="space-y-2 border-t pt-4">
        <h4 className="font-semibold">Minor Abilities</h4>
        {minorAbilities.map((a, i) => (
          <div key={i} className="space-y-1 border p-2 rounded-md">
            <Input placeholder="Name" value={a.name} onChange={(e) => updateMinor(i, 'name', e.target.value)} />
            <Textarea placeholder="Description" value={a.description} onChange={(e) => updateMinor(i, 'description', e.target.value)} />
            <div className="flex gap-4 pt-1">
              <Checkbox checked={a.box1 ?? false} onCheckedChange={(v) => updateMinor(i, 'box1', v === true)} /> Box 1
              <Checkbox checked={a.box2 ?? false} onCheckedChange={(v) => updateMinor(i, 'box2', v === true)} /> Box 2
              <Checkbox checked={a.box3 ?? false} onCheckedChange={(v) => updateMinor(i, 'box3', v === true)} /> Box 3
            </div>
            <Button variant="ghost" className="text-red-500 mt-2" onClick={() => setMinorAbilities((prev) => prev.filter((_, j) => j !== i))}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            setMinorAbilities((prev) => {
              const maxId = Math.max(0, ...prev.map((a) => a.id ?? 0));
              return [...prev, { id: maxId + 1, name: '', description: '', box1: false }];
            })
          }
        >
          + Add Minor Ability
        </Button>
      </div>

      <div className="space-y-2 border-t pt-4">
        <h4 className="font-semibold">Major Abilities</h4>
        {majorAbilities.map((a, i) => (
          <div key={i} className="space-y-1 border p-2 rounded-md">
            <Input placeholder="Name" value={a.name} onChange={(e) => updateMajor(i, 'name', e.target.value)} />
            <Textarea placeholder="Description" value={a.description} onChange={(e) => updateMajor(i, 'description', e.target.value)} />
            <div className="flex gap-4 pt-1">
              <Checkbox checked={a.box1 ?? false} onCheckedChange={(v) => updateMajor(i, 'box1', v === true)} /> Box 1
              <Checkbox checked={a.box2 ?? false} onCheckedChange={(v) => updateMajor(i, 'box2', v === true)} /> Box 2
              <Checkbox checked={a.box3 ?? false} onCheckedChange={(v) => updateMajor(i, 'box3', v === true)} /> Box 3
            </div>
            <Button variant="ghost" className="text-red-500 mt-2" onClick={() => setMajorAbilities((prev) => prev.filter((_, j) => j !== i))}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            setMajorAbilities((prev) => {
              const maxId = Math.max(0, ...prev.map((a) => a.id ?? 0));
              return [...prev, { id: maxId + 1, name: '', description: '', box1: false, box2: false, box3: false }];
            })
          }
        >
          + Add Major Ability
        </Button>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={closeDialog}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!name || !coreName || !coreDesc}>
          {existingItem ? 'Update' : 'Create'}
        </Button>
      </div>
    </div>
  );
};

export default MagicItemEditForm;
