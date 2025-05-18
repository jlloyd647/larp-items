'use client';

import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useSpellStore } from '@/stores/useSpellStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { cn } from '@/lib/utils';
import type { Spell } from '@/types';

type AddSpellScrollListProps = {
  characterId: number;
};

const AddSpellScrollList = ({ characterId }: AddSpellScrollListProps) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Spell | null>(null);
  const [useCxp, setUseCxp] = useState(false);
  const [cxpUsed, setCxpUsed] = useState(0);
  const [useFreeSpell, setUseFreeSpell] = useState(false); // 👈 NEW

  const character = useCharacterStore((state) =>
    state.characters.find((c) => Number(c.id) === Number(characterId))
  );

  const spells = useSpellStore((state) => state.spells);
  const addSpell = useCharacterStore((state) => state.addSpellToCharacter);
  const courtXpSpent = useCharacterStore((state) => state.getCourtXpSpentForCharacter(character.id));

  if (!character) return <div>Character not found</div>;

  const filteredSpells = spells.filter((spell) =>
    spell.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!selected) return;

    const safeCxpUsed = useCxp ? Math.min(cxpUsed, character.courtXp) : 0;

    const spellToAdd = {
      spellId: selected.id,
      cxpUsed: safeCxpUsed,
      initialSpell: useFreeSpell,
      // If you later track xpUsed: xpUsed: useFreeSpell ? 0 : selected.xpCost,
    };

    console.log(
      `Adding spell ${selected.name} with ${useFreeSpell ? 0 : selected.xpCost} XP and ${safeCxpUsed} CxP`
    );

    addSpell(characterId, spellToAdd);

    // Reset
    setSelected(null);
    setUseFreeSpell(false);
    setUseCxp(false);
    setCxpUsed(0);
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <Input
        placeholder="Search spells..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {filteredSpells.map((spell) => {
            const alreadyKnown = character.spells?.some(
              (s) => s.spellId === spell.id
            );

            return (
              <li
                key={spell.id}
                onClick={() => !alreadyKnown && setSelected(spell)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  alreadyKnown ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted',
                  selected?.id === spell.id && !alreadyKnown && 'bg-muted font-medium'
                )}
              >
                {spell.name}
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      {/* Free Spell Checkbox */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="use-free-spell"
          checked={useFreeSpell}
          onCheckedChange={(val) => setUseFreeSpell(!!val)}
        />
        <Label htmlFor="use-free-spell">This is a free (first 3) spell</Label>
      </div>

      {/* CxP Checkbox + Input */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="use-cxp"
          checked={useCxp}
          onCheckedChange={(val) => {
            setUseCxp(!!val);
            if (!val) setCxpUsed(0);
          }}
        />
        <Label htmlFor="use-cxp">Use CxP</Label>
        {useCxp && (
          <>
            <Input
              type="number"
              min={0}
              max={character.courtXp}
              value={cxpUsed}
              onChange={(e) => setCxpUsed(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-muted-foreground text-sm">
              / {character.courtXp} CxP available (spent: {courtXpSpent + cxpUsed})
            </span>
          </>
        )}
      </div>

      {/* Spell Summary */}
      {selected && (
        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Selected Spell:</strong> {selected.name}
          </p>
          <p>
            <strong>XP Cost:</strong>{' '}
            {useFreeSpell ? 0 : selected.xpCost}
          </p>
        </div>
      )}

      <Button onClick={handleAdd} disabled={!selected}>
        Add Selected Spell
      </Button>
    </Card>
  );
};

export default AddSpellScrollList;
