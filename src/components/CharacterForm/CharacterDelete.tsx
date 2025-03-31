import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCharacterStore } from '@/stores/useCharacterStore';

const CharacterDelete = ({ characterId, characterName, setSelectedCharacter }: { characterId: number; characterName: string; setSelectedCharacter: (character: null) => void; }) => {
  const deleteCharacter = useCharacterStore((state) => state.deleteCharacter);
  const [confirmation, setConfirmation] = useState('');
  const [open, setOpen] = useState(false);

  const confirmed = confirmation === characterName;

  const handleDelete = () => {
    deleteCharacter(characterId);
    setOpen(false);
    setSelectedCharacter(null)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete Character</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle>Delete: {characterName}</DialogTitle>
        <p className="text-sm text-muted-foreground mb-2">
          This action is <strong>irreversible</strong>. To confirm, please type the character’s name below.
        </p>
        <Input
          placeholder={`Type "${characterName}" to confirm`}
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <div className="flex justify-end pt-4">
          <Button variant="destructive" onClick={handleDelete} disabled={!confirmed}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDelete;