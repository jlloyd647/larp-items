'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../ui/tabs';
import type { Character } from '@/types';

import CharacterView from './CharacterView';
import CharacterEditForm from './CharacterEditForm';
import CharacterCard from './CharacterCard';

type CharacterFormProps = {
  selectedCharacter: Character;
};

export const CharacterForm = ({ selectedCharacter }: CharacterFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit' | 'card'>('view');

  return (
    <Card className="w-[1000px] h-[500px]">
      <CardContent>
        <Tabs value={tab} onValueChange={(value) => setTab(value as 'view' | 'edit' | 'card')} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="view">Character View</TabsTrigger>
            <TabsTrigger value="edit">Character Edit</TabsTrigger>
            <TabsTrigger value="card">Character Card</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <CharacterView character={selectedCharacter} />
          </TabsContent>

          <TabsContent value="edit">
            <CharacterEditForm character={selectedCharacter} />
          </TabsContent>

          <TabsContent value="card">
            <CharacterCard character={selectedCharacter} />
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end">
        {tab === 'card' && (
          <CharacterCard.PrintButton character={selectedCharacter} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CharacterForm;
