
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCharacterStore } from '@/stores/useCharacterStore'; // Already imported
import { Button } from '../ui/button';

const courtOptions = ['Courtless', 'Catalytic', 'Feral', 'Radiant', 'Umbral', 'Undying'];

type CreateCharacterFormProps = {
  playerId: number;
};

const CreateCharacterForm = ({ playerId }: CreateCharacterFormProps) => {
  const addCharacter = useCharacterStore((s) => s.addCharacter);
  const characters = useCharacterStore((s) => s.characters);

  const [name, setName] = useState('');
  const [xp, setXp] = useState('');
  const [court, setCourt] = useState('');

  const handleSubmit = () => {
    const nextId = Math.max(0, ...characters.map((c) => c.id)) + 1;

    addCharacter({
      id: nextId,
      playerId,
      name,
      xp: Number(xp),
      court,
      courtXp: 0,
      bank: 0,
      skills: [],
    });

    // Optionally reset or close modal (shadcn handles closing if you place it in a controlled Dialog)
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

      <div>
        <Label>Court</Label>
        <Select value={court} onValueChange={setCourt}>
          <SelectTrigger>
            <SelectValue placeholder="Select a court" />
          </SelectTrigger>
          <SelectContent>
            {courtOptions.map((courtOption) => (
              <SelectItem key={courtOption} value={courtOption}>
                {courtOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSubmit} disabled={!name || !xp || !court}>
        Add Character
      </Button>
    </div>
  );
};

export default CreateCharacterForm;