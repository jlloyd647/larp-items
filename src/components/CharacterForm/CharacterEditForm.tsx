'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '../ui/dialog';
import AddSkillScrollList from './AddSkillScrollList';
import RemoveSkillScrollList from './RemoveSkillScrollList';
import { COURTS, ELEMENTALS } from '@/lib/consts';
import { useCharacterStore } from '@/stores/useCharacterStore';
import type { Character } from '@/types';

type CharacterEditFormProps = {
  characterId: number;
};

const pathOptions = ['The Bargained', 'The Lost', 'The Seeker', 'The Taken'];
const prologueOptions = ['Established', 'New'];
const raceOptions = ['Kith', 'Air Elemental', 'Earth Elemental', 'Fire Elemental', 'Neon Elemental', 'Water Elemental'];
const courtOptions = ['Courtless', 'Catalytic', 'Feral', 'Radiant', 'Umbral', 'Undying'];

const CharacterEditForm = ({ characterId }: CharacterEditFormProps) => {
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  const liveCharacter = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );

  const [form, setForm] = useState<Character | null>(liveCharacter ?? null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (liveCharacter) setForm({ ...liveCharacter });
  }, [liveCharacter]);

  useEffect(() => {
    if (!form || !liveCharacter) return;
    setHasChanges(JSON.stringify(form) !== JSON.stringify(liveCharacter));
  }, [form, liveCharacter]);

  if (!form) return null;

  const updateField = <K extends keyof Character>(key: K, value: Character[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    if (!form) return;
    setIsSaving(true);
    try {
      updateCharacter(form);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const changedClass = (key: keyof Character) =>
    form[key] !== liveCharacter?.[key] ? 'border-yellow-500' : '';

  return (
    <form className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            className={changedClass('name')}
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </div>
        <div>
          <Label>Court</Label>
          <Select
            value={form.court ?? ''}
            onValueChange={(val) => updateField('court', val)}
          >
            <SelectTrigger className={changedClass('court')}>
              <SelectValue placeholder="Select court" />
            </SelectTrigger>
            <SelectContent>
              {COURTS.map((court) => (
                <SelectItem key={court.id} value={court.id.toString()}>
                  {court.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Race</Label>
          <Select
            value={form.characterRace ?? ''}
            onValueChange={(val) => {
              updateField('characterRace', val);
              val === 'Air Elemental' && updateField('elemental', 1);
              val === 'Earth Elemental' && updateField('elemental', 2);
              val === 'Fire Elemental' && updateField('elemental', 3);
              val === 'Neon Elemental' && updateField('elemental', 4);
              val === 'Water Elemental' && updateField('elemental', 5);
            }}
          >
            <SelectTrigger className={changedClass('characterRace')}>
              <SelectValue placeholder="Select race" />
            </SelectTrigger>
            <SelectContent>
              {raceOptions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label>XP</Label>
          <Input
            type="number"
            className={changedClass('xp')}
            value={form.xp}
            onChange={(e) => updateField('xp', Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Court XP</Label>
          <Input
            type="number"
            className={changedClass('courtXp')}
            value={form.courtXp}
            onChange={(e) => updateField('courtXp', Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Community Points</Label>
          <Input
            type="number"
            className={changedClass('communityPoints')}
            value={form.communityPoints}
            onChange={(e) => updateField('communityPoints', Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Bank</Label>
          <Input
            type="number"
            className={changedClass('bank')}
            value={form.bank}
            onChange={(e) => updateField('bank', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Path</Label>
          <Select
            value={form.path ?? ''}
            onValueChange={(val) => updateField('path', val)}
          >
            <SelectTrigger className={changedClass('path')}>
              <SelectValue placeholder="Select path" />
            </SelectTrigger>
            <SelectContent>
              {pathOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Prologue</Label>
          <Select
            value={form.prologue ?? ''}
            onValueChange={(val) => updateField('prologue', val)}
          >
            <SelectTrigger className={changedClass('prologue')}>
              <SelectValue placeholder="Select prologue" />
            </SelectTrigger>
            <SelectContent>
              {prologueOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Deaths</Label>
          <Input
            type="number"
            className={changedClass('deaths')}
            value={form.deaths}
            onChange={(e) => updateField('deaths', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Magic Item</Label>
          <Input
            className={changedClass('magicItem')}
            value={form.magicItem ?? ''}
            onChange={(e) => updateField('magicItem', e.target.value)}
          />
        </div>
        <div>
          <Label>Magic Item CXP</Label>
          <Input
            type="number"
            className={changedClass('magicItemCxp')}
            value={form.magicItemCxp}
            onChange={(e) => updateField('magicItemCxp', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
          variant={hasChanges ? 'default' : 'secondary'}
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Saving...
            </div>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CharacterEditForm;
