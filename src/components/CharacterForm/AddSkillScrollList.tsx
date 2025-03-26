'use client';

import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useSkillStore } from '@/stores/useSkillStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types';

type AddSkillScrollListProps = {
  characterId: number;
};

const AddSkillScrollList = ({ characterId }: AddSkillScrollListProps) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Skill | null>(null);
  const [useCxp, setUseCxp] = useState(false);
  const [cxpUsed, setCxpUsed] = useState(0);

  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );

  const skills = useSkillStore((state) => state.skills);
  const addSkill = useCharacterStore((state) => state.addSkillToCharacter);

  if (!character) return <div>Character not found</div>;

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!selected) return;

    const safeCxpUsed = useCxp ? Math.min(cxpUsed, character.courtXp) : 0;

    addSkill(characterId, selected.id, safeCxpUsed);

    // Clear UI
    setUseCxp(false);
    setCxpUsed(0);
    setSelected(null);
  };

  return (
    <Card className="p-4 w-[400px] space-y-4">
      <Input
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />

      <ScrollArea className="h-[300px] border rounded-md p-2">
        <ul className="space-y-1">
          {filteredSkills.map((skill) => {
            const owned = character.skills.find((s) => s.skillId === skill.id);
            const currentRank = owned?.rank ?? 0;
            const maxRank = skill.ranks;
            const atMax = currentRank >= maxRank;
            const isSelectable = !atMax;

            return (
              <li
                key={skill.id}
                onClick={() => isSelectable && setSelected(skill)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded',
                  isSelectable ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed',
                  selected?.id === skill.id && isSelectable && 'bg-muted font-medium'
                )}
              >
                {skill.name} ({currentRank}/{maxRank})
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      {/* CxP Checkbox + Input */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="use-cxp"
          checked={useCxp}
          onCheckedChange={(val) => {
            setUseCxp(!!val);
            if (!val) setCxpUsed(0);
          }}
        />
        <Label htmlFor="use-cxp">Use CxP</Label>
        {useCxp && (
          <>
            <Input
              type="number"
              min={0}
              max={character.courtXp}
              value={cxpUsed}
              onChange={(e) => setCxpUsed(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-muted-foreground text-sm">
              / {character.courtXp}
            </span>
          </>
        )}
      </div>

      <Button onClick={handleAdd} disabled={!selected}>
        Add Selected Skill
      </Button>
    </Card>
  );
};

export default AddSkillScrollList;
