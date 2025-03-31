import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSpellStore } from '@/stores/useSpellStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Spell } from '@/types';

type SpellEditFormProps = {
  spellId: number;
};

const categoryOptions = ['Arcane Magic', 'Artificing', 'Shadow Magic', 'Wild Magic'];

const SpellEditForm = ({ spellId }: SpellEditFormProps) => {
  const spell = useSpellStore((state) => state.getSpellById(spellId));
  const updateSpell = useSpellStore((state) => state.updateSpell);

  const [form, setForm] = useState<Spell | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (spell) {
      setForm(spell);
      setHasChanges(false);
    }
  }, [spell]);

  const handleChange = (field: keyof Spell, value: any) => {
    if (!form) return;
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  useEffect(() => {
    if (!spell || !form) return;

    const changed =
      form.name !== spell.name ||
      form.description !== spell.description ||
      form.category !== spell.category ||
      form.xpCost !== spell.xpCost ||
      form.skillCost !== spell.skillCost ||
      form.rank !== spell.rank ||
      (form.specialEffect ?? '') !== (spell.specialEffect ?? '');

    setHasChanges(changed);
  }, [form, spell]);

  const handleSave = () => {
    if (!form || !hasChanges) return;
    updateSpell(form);
    setHasChanges(false);
  };

  if (!form) return <p className="text-sm text-destructive">Spell not found.</p>;

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
      </div>
      <div>
        <Label>Category</Label>
        <Select value={form.category} onValueChange={(value) => handleChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>XP Cost</Label>
        <Input
          type="number"
          value={form.xpCost}
          onChange={(e) => handleChange('xpCost', Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Skill Cost</Label>
        <Input
          type="number"
          value={form.skillCost}
          onChange={(e) => handleChange('skillCost', Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Rank</Label>
        <Input
          type="number"
          value={form.rank}
          onChange={(e) => handleChange('rank', Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Special Effect</Label>
        <Input
          value={form.specialEffect ?? ''}
          onChange={(e) => handleChange('specialEffect', e.target.value)}
        />
      </div>

      <Button onClick={handleSave} disabled={!hasChanges} className="w-full mt-2">
        💾 Save Changes
      </Button>
    </div>
  );
};

export default SpellEditForm;
