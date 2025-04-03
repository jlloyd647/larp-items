'use client';

import type { Character } from '@/types';
import { useTraitStore } from '@/stores/useTraitStore';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddTraitScrollList from './AddTraitScrollList';
import { useCharacterStore } from '@/stores/useCharacterStore';
import RemoveTraitScrollList from './RemoveTraitScrollList';

type CharacterTraitListProps = {
  character: Character;
};

const CharacterTraitList = ({ character }: CharacterTraitListProps) => {
  const allTraits = useTraitStore((state) => state.traits);

  const updatedCharacter = useCharacterStore((state) =>
    state.characters.find((c) => c.id === character.id)
  );

  const characterToUse = updatedCharacter || character;

  const getTraitName = (traitId: number): string => {
    const trait = allTraits.find((t) => t.id === traitId);
    return trait ? `${trait.type === 'Bane' ? 'Bane - ' : 'Boon - '}${trait.name}` : `Unknown Trait (${traitId})`;
  };

  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">Traits</p>
      <div className="flex gap-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">+ Add Trait</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Add Trait</DialogTitle>
            <AddTraitScrollList characterId={character.id} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">- Remove Trait</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Remove Trait</DialogTitle>
            <RemoveTraitScrollList characterId={character.id} />
          </DialogContent>
        </Dialog>
      </div>

      {characterToUse?.traits?.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          This character has no traits yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {characterToUse?.traits?.map((trait) => (
            <div
              key={trait}
              className="rounded border px-3 py-1 text-sm bg-muted"
            >
              {getTraitName(trait)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CharacterTraitList;
