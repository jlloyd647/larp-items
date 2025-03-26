'use client';

import type { Character } from '@/types';
import { useSkillStore } from '@/stores/useSkillStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type CharacterViewProps = {
  character: Character;
};

const CharacterView = ({ character }: CharacterViewProps) => {
  const allSkills = useSkillStore((state) => state.skills);
  const xpSpent = useCharacterStore.getState().getCourtXpSpentForCharacter(character.id);

  const getSkillNameWithRank = (skillId: number, rank: number) => {
    const skill = allSkills.find((s) => s.id === skillId);
    if (!skill) return `Unknown Skill (${skillId})`;
    return skill.ranks > 1 ? `${skill.name} (${rank}/${skill.ranks})` : skill.name;
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-4 space-y-2">
        {/* Character Info Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{character.name}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">XP:</span>
            <span className="font-medium">{character.xp}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">XP Spent:</span>
            <span className="font-medium">{xpSpent}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-medium">{character.bank}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Court XP:</span>
            <span className="font-medium">{character.courtXp}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Court:</span>
            <span className="font-medium">{character.court}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Body</span>
            <span className="font-medium">{character.courtXp}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Skill</span>
            <span className="font-medium">{character.court}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Deaths</span>
            <span className="font-medium">{character.bank}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Magic Item</span>
            <span className="font-medium">{character.magicItem}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Magic Item CXp</span>
            <span className="font-medium">{character.magicItemCXp}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Community Points</span>
            <span className="font-medium">{character.communityPoints}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Path</span>
            <span className="font-medium">{character.path}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Prologue</span>
            <span className="font-medium">{character.prologue}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Race</span>
            <span className="font-medium">{character.characterRace}</span>
          </div>
        </div>

        {/* Skills grid (no changes) */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Skills</p>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterView;
