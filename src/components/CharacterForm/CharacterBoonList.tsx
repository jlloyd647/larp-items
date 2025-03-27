'use client';

import type { Character } from '@/types';
import { useBoonStore } from '@/stores/useBoonStore';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddBoonScrollList from './AddBoonScrollList';

type CharacterBoonListProps = {
  character: Character;
};

const CharacterBoonList = ({ character }: CharacterBoonListProps) => {
  const allBoons = useBoonStore((state) => state.boons);

  const getBoonName = (boonId: number): string => {
    const boon = allBoons.find((b) => b.id === boonId);
    return boon ? `${boon.name} (Rank ${boon.rank})` : `Unknown Boon (${boonId})`;
  };

  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">Boons</p>
      <div className="flex gap-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">+ Add Boon</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Add Boon</DialogTitle>
            <AddBoonScrollList character={character} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">- Remove Boon</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Remove Boon</DialogTitle>
            <p className="text-sm text-muted-foreground">Coming soon</p>
          </DialogContent>
        </Dialog>
      </div>

      {character?.boons?.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          This character has no boons yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {character?.boons?.map((boonId) => (
            <div
              key={boonId}
              className="rounded border px-3 py-1 text-sm bg-muted"
            >
              {getBoonName(boonId)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CharacterBoonList;
