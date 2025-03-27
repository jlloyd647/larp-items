'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { useBoonStore } from '@/stores/useBoonStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import type { Character } from '@/types';
import { cn } from '@/lib/utils';

type AddBoonScrollListProps = {
  character: Character;
};

const AddBoonScrollList = ({ character }: AddBoonScrollListProps) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const boons = useBoonStore((s) => s.boons);
  const addBoonToCharacter = useCharacterStore((s) => s.addBoonToCharacter);

  const characterBoons = character.boons ?? [];

  useEffect(() => {
    console.log(character.court);
    console.log(boons);
  }, []);

  const filteredBoons = boons.filter((boon) => {
    const matchesCourt = boon.source === 'Court' && Number(boon.sourceId) === Number(character.court);
    const matchesElemental = boon.source === 'Elemental' && Number(boon.sourceId) === Number(character.elemental);
    const matchesSearch = boon.name.toLowerCase().includes(search.toLowerCase());

    return (matchesCourt || matchesElemental) && matchesSearch;
  });

  const handleAdd = () => {
    if (selected !== null && !characterBoons.includes(selected)) {
      addBoonToCharacter(character.id, selected);
      setSelected(null);
      setSearch('');
    }
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <Input
        placeholder="Search boons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {filteredBoons.map((boon) => {
            const owned = characterBoons.includes(boon.id);
            const isSelected = selected === boon.id;

            return (
              <li
                key={boon.id}
                onClick={() => !owned && setSelected(boon.id)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  owned
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-muted',
                  isSelected && !owned && 'bg-muted font-medium'
                )}
              >
                {boon.name} {owned && <span className="italic text-xs">(owned)</span>}
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <Button onClick={handleAdd} disabled={selected === null || characterBoons.includes(selected)}>
        Add Selected Boon
      </Button>
    </Card>
  );
};

export default AddBoonScrollList;
