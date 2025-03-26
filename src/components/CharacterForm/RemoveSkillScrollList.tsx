'use client';

import { useCharacterStore } from '@/stores/useCharacterStore';
import { useSkillStore } from '@/stores/useSkillStore';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  characterId: number;
};

const RemoveSkillScrollList = ({ characterId }: Props) => {
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );

  const skills = useSkillStore((s) => s.skills);
  const getSkillById = useSkillStore((s) => s.getSkillById);
  const removeSkill = useCharacterStore((s) => s.removeSkillFromCharacter);

  if (!character) return <div>Character not found</div>;

  const handleRemove = () => {
    if (selectedSkillId !== null) {
      removeSkill(characterId, selectedSkillId);
      setSelectedSkillId(null);
    }
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <h2 className="text-lg font-medium">Remove a Skill</h2>

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {character.skills.map((charSkill) => {
            const skill = getSkillById(charSkill.skillId);
            if (!skill) return null;

            return (
              <li
                key={charSkill.skillId}
                onClick={() => setSelectedSkillId(charSkill.skillId)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  selectedSkillId === charSkill.skillId && 'bg-muted font-medium hover:bg-muted',
                  selectedSkillId !== charSkill.skillId && 'hover:bg-muted'
                )}
              >
                {skill.name} ({charSkill.rank}/{skill.ranks})
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <Button
        onClick={handleRemove}
        disabled={selectedSkillId === null}
        variant="destructive"
      >
        Remove Selected Skill
      </Button>
    </Card>
  );
};

export default RemoveSkillScrollList;
