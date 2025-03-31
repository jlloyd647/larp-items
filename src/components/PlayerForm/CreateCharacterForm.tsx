
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { Button } from '../ui/button';

type CreateCharacterFormProps = {
  playerId: number;
  setOpen: (open: boolean) => void;
  setSelectedPlayerId: (id: number | null) => void;
  setSelectedCharacterId: (id: number) => void;
};

const CreateCharacterForm = ({
  playerId,
  setOpen,
  setSelectedPlayerId,
  setSelectedCharacterId,
}: CreateCharacterFormProps) => {
  const addCharacter = useCharacterStore((s) => s.addCharacter);
  const characters = useCharacterStore((s) => s.characters);

  const [name, setName] = useState('');
  const [xp, setXp] = useState('');

  const handleSubmit = () => {
    const nextId = Math.max(0, ...characters.map((c) => c.id)) + 1;

    addCharacter({
      id: nextId,
      playerId,
      name,
      xp: Number(xp),
      court: 1,
      courtXp: 0,
      bank: 0,
      skills: [],
      magicItem: '',
      magicItemCXp: 0,
      deaths: 0,
      path: '',
      prologue: '',
      communityPoints: 0,
      characterRace: '',
    });

    setSelectedPlayerId(null);
    setSelectedCharacterId(nextId);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Starting XP</Label>
        <Input
          type="number"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} disabled={!name || !xp}>
        Add Character
      </Button>
    </div>
  );
};

export default CreateCharacterForm;