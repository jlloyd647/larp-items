'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useTraitStore } from '@/stores/useTraitStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { cn } from '@/lib/utils';
import type { Trait } from '@/types';

type AddTraitScrollListProps = {
  characterId: number;
};

const AddTraitScrollList = ({ characterId }: AddTraitScrollListProps) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Trait | null>(null);

  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );

  const traits = useTraitStore((state) => state.traits);
  const addTrait = useCharacterStore((state) => state.addTraitToCharacter);

  if (!character) return <div>Character not found</div>;

  const filteredTraits = traits.filter((trait) => {
    const matchesSearch = trait.name.toLowerCase().includes(search.toLowerCase());
    const matchesSource =
      (trait.source === 'Court' && trait.sourceId == character.court) ||
      (trait.source === 'Elemental' && trait.sourceId == character.elemental);
  
    return matchesSearch && matchesSource;
  });

  const handleAdd = () => {
    if (!selected) return;

    addTrait(characterId, selected);
    setSelected(null);
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <Input
        placeholder="Search traits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {filteredTraits.map((trait) => {
            const alreadyHas = character.traits?.some((t) => t === trait.id);
            const isSelectable = !alreadyHas;

            return (
              <li
                key={trait.id}
                onClick={() => isSelectable && setSelected(trait)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  isSelectable ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed',
                  selected?.id === trait.id && isSelectable && 'bg-muted font-medium'
                )}
              >
                {(trait.type === 'Bane' ? 'Bane - ' : 'Boon - ') + trait.name}
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <Button onClick={handleAdd} disabled={!selected}>
        Add Selected Trait
      </Button>
    </Card>
  );
};

export default AddTraitScrollList;
