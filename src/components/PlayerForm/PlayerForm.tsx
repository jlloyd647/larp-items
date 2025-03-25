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
import PlayerView from './PlayerView';
import PlayerEditForm from './PlayerEditForm';
import type { Player } from '@/types';

type PlayerFormProps = {
  selectedPlayer: Player;
};

export const PlayerForm = ({ selectedPlayer }: PlayerFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');

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
        <Tabs value={tab} onValueChange={(value) => setTab(value as 'view' | 'edit')} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="view">View Info</TabsTrigger>
            <TabsTrigger value="edit">Edit Info</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <PlayerView player={selectedPlayer} />
          </TabsContent>

          <TabsContent value="edit">
            <PlayerEditForm player={selectedPlayer} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlayerForm;
