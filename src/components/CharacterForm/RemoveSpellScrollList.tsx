'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { useSpellStore } from '@/stores/useSpellStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { cn } from '@/lib/utils';

type RemoveSpellScrollListProps = {
  characterId: number;
};

const RemoveSpellScrollList = ({ characterId }: RemoveSpellScrollListProps) => {
  const [selectedSpellId, setSelectedSpellId] = useState<number | null>(null);

  const character = useCharacterStore((state) =>
    state.characters.find((c) => Number(c.id) === Number(characterId))
  );
  const removeSpell = useCharacterStore((state) => state.removeSpellFromCharacter);
  const getSpellById = useSpellStore((state) => state.getSpellById);

  if (!character) return <div>Character not found</div>;
  const spells = character.spells ?? [];

  const handleRemove = () => {
    if (selectedSpellId === null) return;

    console.log('Removing spell:', selectedSpellId, 'from character:', characterId);
    removeSpell(characterId, selectedSpellId);

    setSelectedSpellId(null);
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {spells.map((spellObj) => {
            const spell = getSpellById(spellObj.spellId);
            const label = spell
              ? `${spell.name} (CxP: ${spellObj.cxpUsed}, ${spell.xpCost === 0 ? 'Free' : 'Paid'})`
              : `Unknown Spell (${spellObj.spellId})`;

            return (
              <li
                key={spellObj.spellId}
                onClick={() => setSelectedSpellId(spellObj.spellId)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  'hover:bg-muted',
                  selectedSpellId === spellObj.spellId && 'bg-muted font-medium'
                )}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <Button onClick={handleRemove} disabled={selectedSpellId === null} variant="destructive">
        Remove Selected Spell
      </Button>
    </Card>
  );
};

export default RemoveSpellScrollList;
