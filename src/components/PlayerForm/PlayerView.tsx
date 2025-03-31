'use client';

import { useState } from 'react';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CreateCharacterForm from './CreateCharacterForm';

type PlayerViewProps = {
  playerId: number;
  setSelectedPlayerId: (id: number | null) => void;
  setSelectedCharacterId: (id: number | null) => void;
};

const PlayerView = ({ playerId, setSelectedPlayerId, setSelectedCharacterId }: PlayerViewProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const player = usePlayerStore((state) =>
    state.players.find((p) => p.id === playerId)
  );

  const getCharactersForPlayer = useCharacterStore((state) => state.getCharactersForPlayer);
  const characters = getCharactersForPlayer(playerId);

  if (!player) return null;

  return (
    <>
      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left: Name + Email */}
        <div className="space-y-2 text-sm">
          <div className="flex gap-x-2">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{player.name}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{player.email ?? '—'}</span>
          </div>
        </div>

        {/* Right: Emergency Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex gap-x-2">
            <span className="text-muted-foreground">Emergency Contact:</span>
            <span className="font-medium">{player.emergencyContactName ?? '—'}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-muted-foreground">Contact Number:</span>
            <span className="font-medium">{player.emergencyContactNumber ?? '—'}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-muted-foreground">Liability Waiver:</span>
            <span className="font-medium">
              {player.liabilityWaiverSigned ? 'Signed' : 'Not Signed'}
            </span>
          </div>
        </div>
      </div>

      {/* Character List */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Characters</h3>
        {characters.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">No characters yet.</p>
        ) : (
          <ul className="list-disc list-inside pl-4">
            {characters.map((char) => (
              <li key={char.id}>{char.name}</li>
            ))}
          </ul>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-2">Create New Character</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Character</DialogTitle>
            </DialogHeader>
            <CreateCharacterForm playerId={player.id} setOpen={setDialogOpen} setSelectedPlayerId={setSelectedPlayerId} setSelectedCharacterId={setSelectedCharacterId} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PlayerView;
