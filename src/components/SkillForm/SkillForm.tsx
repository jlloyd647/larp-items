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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';

import type { Skill } from '@/types';
import SkillEditForm from './SkillEditForm';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useSkillStore } from '@/stores/useSkillStore';

type SkillFormProps = {
  skill: Skill;
};

export const SkillForm = ({ skill }: SkillFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteSkill = useSkillStore((state) => state.deleteSkill);
  const characterStore = useCharacterStore.getState();
  const charactersWithSkill = characterStore.characters.filter((char) =>
    char.skills.some((s) => s.skillId === skill.id)
  );
  
  const isSkillInUse = charactersWithSkill.length > 0;

  const [name, setName] = useState(skill?.name);
  const [desc, setDesc] = useState(skill?.desc);
  const [xpCost, setXpCost] = useState(skill?.xpCost.toString());
  const [ranks, setRanks] = useState(skill?.ranks.toString());
  const [skillCost, setSkillCost] = useState(skill?.skillCost.toString());

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{name || 'Unnamed Skill'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <div className="space-y-2">
              <p><strong>Description:</strong> {desc || 'No description'}</p>
              <p><strong>XP Cost:</strong> {xpCost}</p>
              <p><strong>Ranks:</strong> {ranks}</p>
              <p><strong>Skill Cost:</strong> {skillCost}</p>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <SkillEditForm skillId={skill.id} />
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Skill</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isSkillInUse ? 'Cannot Delete Skill' : 'Confirm Delete'}
              </DialogTitle>
            </DialogHeader>

            {isSkillInUse ? (
              <div className="text-sm text-muted-foreground">
                <p>This skill is currently used by the following characters:</p>
                <ul className="mt-2 list-disc pl-6 text-sm text-red-600">
                  {charactersWithSkill.map((char) => (
                    <li key={char.id}>{char.name}</li>
                  ))}
                </ul>
                <p className="mt-2">Please remove it before deletion.</p>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p>
                  Are you sure you want to delete <strong>{skill.name}</strong>? This action cannot be undone.
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
                  if (!isSkillInUse) deleteSkill(skill.id);
                  setDialogOpen(false);
                }}
                disabled={isSkillInUse}
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

export default SkillForm;
