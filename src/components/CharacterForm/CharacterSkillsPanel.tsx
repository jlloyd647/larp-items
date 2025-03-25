'use client';

import { useCharacterStore } from '@/stores/useCharacterStore';
import { useSkillStore } from '@/stores/useSkillStore';
import { Button } from '../ui/button';
import type { Character } from '@/types';

type Props = {
  character: Character;
};

const CharacterSkillsPanel = ({ character }: Props) => {
  const skills = useSkillStore((s) => s.getSkillsByIds(character.skills));
  const allSkills = useSkillStore((s) => s.skills);

  const addSkill = useCharacterStore((s) => s.addSkillToCharacter);
  const removeSkill = useCharacterStore((s) => s.removeSkillFromCharacter);

  const availableSkills = allSkills.filter((s) => !character.skills.includes(s.id));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg">Current Skills</h3>
        <ul className="list-disc list-inside">
          {skills.map((skill) => (
            <li key={skill.id} className="flex items-center justify-between">
              {skill.name}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeSkill(character.id, skill.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">Add Skill</h4>
        <ul className="list-disc list-inside max-h-64 overflow-y-auto">
          {availableSkills.map((skill) => (
            <li key={skill.id} className="flex items-center justify-between">
              {skill.name}
              <Button
                size="sm"
                onClick={() => addSkill(character.id, skill.id)}
              >
                Add
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterSkillsPanel;