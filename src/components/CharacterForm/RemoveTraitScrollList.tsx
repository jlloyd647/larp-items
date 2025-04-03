'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useTraitStore } from '@/stores/useTraitStore';
import { cn } from '@/lib/utils';

type RemoveTraitScrollListProps = {
  characterId: number;
};

const RemoveTraitScrollList = ({ characterId }: RemoveTraitScrollListProps) => {
  const [selectedTraitId, setSelectedTraitId] = useState<number | null>(null);

  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );
  const removeTrait = useCharacterStore((state) => state.removeTraitFromCharacter);
  const getTraitById = useTraitStore((state) => state.getTraitById);

  if (!character) return <div>Character not found</div>;
  const traits = character.traits ?? [];

  const handleRemove = () => {
    if (selectedTraitId === null) return;

    removeTrait(characterId, selectedTraitId);
    setSelectedTraitId(null);
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <h2 className="text-lg font-medium">Remove a Trait</h2>

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {traits.map((traitObj) => {
            const trait = getTraitById(traitObj);
            const label = trait
              ? `${trait.type === 'Bane' ? 'Bane - ' : 'Boon - '}${trait.name}`
              : `Unknown Trait (${traitObj})`;

            return (
              <li
                key={traitObj}
                onClick={() => setSelectedTraitId(traitObj)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  'hover:bg-muted',
                  selectedTraitId === traitObj && 'bg-muted font-medium'
                )}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <Button onClick={handleRemove} disabled={selectedTraitId === null} variant="destructive">
        Remove Selected Trait
      </Button>
    </Card>
  );
};

export default RemoveTraitScrollList;
