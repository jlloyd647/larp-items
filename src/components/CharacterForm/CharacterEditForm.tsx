'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import type { Character } from '@/types';
import CharacterSkillsPanel from './CharacterSkillsPanel';

type CharacterEditFormProps = {
  character: Character;
};

const CharacterEditForm = ({ character }: CharacterEditFormProps) => {
  const [name, setName] = useState(character.name);
  const [xp, setXp] = useState(character.xp.toString());

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="xp">XP</Label>
        <Input
          id="xp"
          type="number"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
        />
      </div>
      <CharacterSkillsPanel character={character} />

      {/* Future: Add skill editing, save button, etc. */}
    </form>
  );
};

export default CharacterEditForm;
