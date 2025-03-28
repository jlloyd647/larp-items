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

import type { Trait } from '@/types';
import { useTraitStore } from '@/stores/useTraitStore';
import { useCharacterStore } from '@/stores/useCharacterStore';

type TraitFormProps = {
  trait: Trait;
};

export const TraitForm = ({ trait }: TraitFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteTrait = useTraitStore((state) => state.deleteTrait);
  const characters = useCharacterStore((state) => state.characters);

  const charactersWithTrait = characters.filter((char) =>
    char.boons?.some((t) => t === trait.id) || char.banes?.some((t) => t === trait.id)
  );
  const isTraitInUse = charactersWithTrait.length > 0;

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{trait.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <div className="space-y-2 text-sm">
              <p><strong>Description:</strong> {trait.description}</p>
              <p><strong>Type:</strong> {trait.type}</p>
              <p><strong>Source:</strong> {trait.source}</p>
              <p><strong>Source ID:</strong> {trait.sourceId}</p>
              <p><strong>Rank:</strong> {trait.rank}</p>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            {/* Editing inputs can be placed here in the future */}
            <p className="text-muted-foreground text-sm">Editing not yet implemented.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Trait</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isTraitInUse ? 'Cannot Delete Trait' : 'Confirm Delete'}
              </DialogTitle>
            </DialogHeader>

            {isTraitInUse ? (
              <div className="text-sm text-muted-foreground">
                <p>This trait is currently used by the following characters:</p>
                <ul className="mt-2 list-disc pl-6 text-sm text-red-600">
                  {charactersWithTrait.map((char) => (
                    <li key={char.id}>{char.name}</li>
                  ))}
                </ul>
                <p className="mt-2">Please remove it before deletion.</p>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>
                  Are you sure you want to delete <strong>{trait.name}</strong>? This action cannot be undone.
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
                  if (!isTraitInUse) deleteTrait(trait.id);
                  setDialogOpen(false);
                }}
                disabled={isTraitInUse}
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

export default TraitForm;
