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
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Description:</strong> {desc || 'No description'}</p>
              <p><strong>XP Cost:</strong> {xpCost}</p>
              <p><strong>Ranks:</strong> {ranks}</p>
              <p><strong>Skill Cost:</strong> {skillCost}</p>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <form className="space-y-4">
              <div>
                <Label htmlFor="skill-name">Name</Label>
                <Input
                  id="skill-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="skill-desc">Description</Label>
                <Textarea
                  id="skill-desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="xp-cost">XP Cost</Label>
                <Input
                  id="xp-cost"
                  type="number"
                  value={xpCost}
                  onChange={(e) => setXpCost(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="ranks">Ranks</Label>
                <Input
                  id="ranks"
                  type="number"
                  value={ranks}
                  onChange={(e) => setRanks(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="skill-cost">Skill Cost</Label>
                <Input
                  id="skill-cost"
                  type="number"
                  value={skillCost}
                  onChange={(e) => setSkillCost(e.target.value)}
                />
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SkillForm;
