'use client';

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSpellStore } from '@/stores/useSpellStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import AddSpellScrollList from './AddSpellScrollList';
import RemoveSpellScrollList from './RemoveSpellScrollList';
import type { Character } from '@/types';

type CharacterSpellListProps = {
  character: Character;
};

const CharacterSpellList = ({ character }: CharacterSpellListProps) => {
  const getSpellById = useSpellStore((state) => state.getSpellById);
  const updatedCharacter = useCharacterStore((state) =>
    state.characters.find((c) => c.id === character.id)
  );
  const characterToUse = updatedCharacter || character;

  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">Spells</p>

      <div className="flex gap-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              + Add Spell
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Add Spells</DialogTitle>
            <AddSpellScrollList characterId={character.id} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              - Remove Spell
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Remove Spell</DialogTitle>
            <RemoveSpellScrollList characterId={character.id} />
          </DialogContent>
        </Dialog>
      </div>

      {characterToUse.spells?.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          This character doesn't know any spells yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {characterToUse?.spells?.map((spellObj) => {
            const spell = getSpellById(spellObj.spellId);
            return (
              <div
                key={spellObj.spellId}
                className="rounded border px-3 py-1 text-sm bg-muted flex justify-between items-center"
              >
                <span>{spell?.name ?? 'Unknown Spell'}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CharacterSpellList;
