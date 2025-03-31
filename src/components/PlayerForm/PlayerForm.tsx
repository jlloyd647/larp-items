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
import PlayerView from './PlayerView';

type PlayerFormProps = {
  player: Player;
  setSelectedPlayerId: (id: number | null) => void;
  setSelectedCharacterId: (id: number | null) => void; //
};

export const PlayerForm = ({ player, setSelectedPlayerId, setSelectedCharacterId }: PlayerFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');

  // Reset to "view" whenever selectedPlayer changes
  useEffect(() => {
    setTab('view');
  }, [player?.id]);

  return (
    <Card className="w-[1000px] h-[500px]">
      <CardHeader>
        <CardTitle>{player?.name ?? 'Unnamed Player'}</CardTitle>
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
            <PlayerView playerId={player.id} setSelectedPlayerId={setSelectedPlayerId} setSelectedCharacterId={setSelectedCharacterId}/>
          </TabsContent>

          {/* Edit Tab */}
          <TabsContent value="edit">
            <PlayerEditForm playerId={player.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlayerForm;
