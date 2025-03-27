'use client';

import { useEffect, useState } from 'react';
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
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import type { Skill } from '@/types';
import SkillEditForm from './SkillEditForm';

type SkillFormProps = {
  skill: Skill;
};

export const SkillForm = ({ skill }: SkillFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');

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
    </Card>
  );
};

export default SkillForm;
