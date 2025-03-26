'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../ui/tabs';

import { useEffect, useState } from 'react';
import PlayerEditForm from './PlayerEditForm';
import type { Player } from '@/types';
import { Button } from '../ui/button';
import { useCharacterStore } from '@/stores/useCharacterStore';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import CreateCharacterForm from './CreateCharacterForm';

type PlayerFormProps = {
  selectedPlayer: Player;
};

export const PlayerForm = ({ selectedPlayer }: PlayerFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');
  const allCharacters = useCharacterStore((s) => s.characters);
  const playerCharacters = selectedPlayer
  ? allCharacters.filter((c) => Number(c.playerId) === Number(selectedPlayer.id))
  : [];

  // Reset to "view" whenever selectedPlayer changes
  useEffect(() => {
    setTab('view');
  }, [selectedPlayer?.id]);

  return (
    <Card className="w-[1000px] h-[500px]">
      <CardHeader>
        <CardTitle>{selectedPlayer?.name ?? 'Unnamed Player'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as 'view' | 'edit')}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="view">View Info</TabsTrigger>
            <TabsTrigger value="edit">Edit Info</TabsTrigger>
          </TabsList>

          {/* View Tab */}
          <TabsContent value="view">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Left: Name + Email */}
              <div className="space-y-2 text-sm">
                <div className="flex gap-x-2">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{selectedPlayer?.name}</span>
                </div>
                <div className="flex gap-x-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{selectedPlayer?.email ?? '—'}</span>
                </div>
              </div>

              {/* Right: Emergency Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex gap-x-2">
                  <span className="text-muted-foreground">Emergency Contact:</span>
                  <span className="font-medium">{selectedPlayer?.emergencyContactName ?? '—'}</span>
                </div>
                <div className="flex gap-x-2">
                  <span className="text-muted-foreground">Contact Number:</span>
                  <span className="font-medium">{selectedPlayer?.emergencyContactNumber ?? '—'}</span>
                </div>
                <div className="flex gap-x-2">
                  <span className="text-muted-foreground">Liability Waiver:</span>
                  <span className="font-medium">
                    {selectedPlayer?.liabilityWaiver ? 'Signed' : 'Not Signed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Character List */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Characters</h3>
              <ul className="list-disc list-inside pl-4">
                {playerCharacters.map((char) => (
                  <li key={char.id}>{char.name}</li>
                ))}
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-2">Create New Character</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Character</DialogTitle>
                  </DialogHeader>

                  <CreateCharacterForm playerId={selectedPlayer?.id} />
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          {/* Edit Tab */}
          <TabsContent value="edit">
            <PlayerEditForm player={selectedPlayer} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlayerForm;
