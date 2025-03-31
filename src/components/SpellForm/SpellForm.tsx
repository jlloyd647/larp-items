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
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

import type { Spell } from '@/types';
import { useSpellStore } from '@/stores/useSpellStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import SpellEditForm from './SpellEditForm';

type SpellFormProps = {
  spell: Spell;
};

export const SpellForm = ({ spell }: SpellFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteSpell = useSpellStore((state) => state.deleteSpell);
  const characters = useCharacterStore((state) => state.characters);

  const charactersWithSpell = characters.filter((char) =>
    char.spells?.some((s) => s.spellId === spell.id)
  );
  const isSpellInUse = charactersWithSpell.length > 0;

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{spell.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <div className="space-y-2 text-sm">
              <p><strong>Description:</strong> {spell.description}</p>
              <p><strong>Category:</strong> {spell.category}</p>
              <p><strong>XP Cost:</strong> {spell.xpCost}</p>
              <p><strong>Skill Cost:</strong> {spell.skillCost}</p>
              {spell.specialEffect && (
                <p><strong>Special Effect:</strong> {spell.specialEffect}</p>
              )}
              <p><strong>Rank:</strong> {spell.rank}</p>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <SpellEditForm spellId={spell.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Spell</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isSpellInUse ? 'Cannot Delete Spell' : 'Confirm Delete'}
              </DialogTitle>
            </DialogHeader>

            {isSpellInUse ? (
              <div className="text-sm text-muted-foreground">
                <p>This spell is currently used by the following characters:</p>
                <ul className="mt-2 list-disc pl-6 text-sm text-red-600">
                  {charactersWithSpell.map((char) => (
                    <li key={char.id}>{char.name}</li>
                  ))}
                </ul>
                <p className="mt-2">Please remove it before deletion.</p>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>
                  Are you sure you want to delete <strong>{spell.name}</strong>? This action cannot be undone.
                </p>
              </div>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() => {
                  if (!isSpellInUse) deleteSpell(spell.id);
                  setDialogOpen(false);
                }}
                disabled={isSpellInUse}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default SpellForm;
