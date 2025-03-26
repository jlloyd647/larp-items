import { usePlayerStore } from '@/stores/usePlayerStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Player, Character } from '@/types/index';

type AddPlayerFormProps = {
  closeDialog: () => void;
  setSelectedPlayer: (player: Player) => void;
  setSelectedCharacter: (char: Character | null) => void;
};

const AddPlayerForm = ({
  closeDialog,
  setSelectedPlayer,
  setSelectedCharacter,
}: AddPlayerFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addPlayer = usePlayerStore((s) => s.addPlayer);
  const players = usePlayerStore((s) => s.players);

  const handleSubmit = () => {
    const nextId = Math.max(0, ...players.map((p) => p.id)) + 1;

    const newPlayer: Player = {
      id: nextId,
      name,
      email,
      emergencyContactName: null,
      emergencyContactNumber: null,
      liabilityWaiver: false,
    };

    addPlayer(newPlayer);
    setSelectedPlayer(newPlayer);
    setSelectedCharacter(null);
    closeDialog();
  };

  const isDisabled = !name.trim() || !email.trim();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <Button disabled={isDisabled} onClick={handleSubmit}>
        Add Player
      </Button>
    </div>
  );
};

export default AddPlayerForm;