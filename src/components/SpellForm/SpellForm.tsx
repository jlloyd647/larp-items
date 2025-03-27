'use client';

import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import type { Spell } from '@/types';
import SpellEditForm from './SpellEditForm';

type SpellFormProps = {
  spell: Spell;
};

export const SpellForm = ({ spell }: SpellFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{spell.name || 'Unnamed Skill'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          {/* View Tab */}
          <TabsContent value="view">
            <div className="space-y-2 text-sm">
              <p><strong>Description:</strong> {spell.description}</p>
              <p><strong>Category:</strong> {spell.category}</p>
              <p><strong>XP Cost:</strong> {spell.xpCost}</p>
              <p><strong>Skill Cost:</strong> {spell.skillCost}</p>
              <p><strong>Rank:</strong> {spell.rank}</p>
              {spell.specialEffect && (
                <p><strong>Special Effect:</strong> {spell.specialEffect}</p>
              )}
            </div>
          </TabsContent>

          {/* Edit Tab */}
          <TabsContent value="edit">
            <SpellEditForm spellId={spell.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpellForm;
