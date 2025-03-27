'use client';

import type { Character } from '@/types';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddSkillScrollList from './AddSkillScrollList';
import RemoveSkillScrollList from './RemoveSkillScrollList';

type CharacterSkillListProps = {
  character: Character;
  getSkillNameWithRank: (skillId: number, rank: number) => string;
};

const CharacterSkillList = ({
  character,
  getSkillNameWithRank,
}: CharacterSkillListProps) => {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">Skills</p>
      <div className="flex gap-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">+ Add Skill</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Add Skills</DialogTitle>
            <AddSkillScrollList characterId={character.id} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">- Remove Skill</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle>Remove Skills</DialogTitle>
            <RemoveSkillScrollList characterId={character.id} />
          </DialogContent>
        </Dialog>
      </div>
      {character.skills?.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          This character doesn't know any skills yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {character.skills.map((skillObj) => (
            <div
              key={skillObj.skillId}
              className="rounded border px-3 py-1 text-sm bg-muted"
            >
              {getSkillNameWithRank(skillObj.skillId, skillObj.rank)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CharacterSkillList;
