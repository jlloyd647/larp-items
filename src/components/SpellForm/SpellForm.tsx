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
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useSpellStore } from '@/stores/useSpellStore';
import type { Spell } from '@/types';

type SpellFormProps = {
  spell: Spell;
};

export const SpellForm = ({ spell }: SpellFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');

  const updateSpell = useSpellStore((s) => s.updateSpell);

  const [form, setForm] = useState({ ...spell });

  const handleChange = <K extends keyof Spell>(key: K, value: Spell[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateSpell(form);
    setTab('view');
  };

  return (
    <Card className="w-[600px]">
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          {/* View Tab */}
          <TabsContent value="view">
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Description:</strong> {form.description}</p>
              <p><strong>Category:</strong> {form.category}</p>
              <p><strong>XP Cost:</strong> {form.xpCost}</p>
              <p><strong>Skill Cost:</strong> {form.skillCost}</p>
              <p><strong>Rank:</strong> {form.rank}</p>
              {form.specialEffect && (
                <p><strong>Special Effect:</strong> {form.specialEffect}</p>
              )}
            </div>
          </TabsContent>

          {/* Edit Tab */}
          <TabsContent value="edit">
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => handleChange('category', e.target.value)} />
              </div>
              <div>
                <Label>XP Cost</Label>
                <Input value={form.xpCost} onChange={(e) => handleChange('xpCost', e.target.value)} />
              </div>
              <div>
                <Label>Skill Cost</Label>
                <Input value={form.skillCost} onChange={(e) => handleChange('skillCost', e.target.value)} />
              </div>
              <div>
                <Label>Rank</Label>
                <Input
                  type="number"
                  value={form.rank}
                  onChange={(e) => handleChange('rank', Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Special Effect</Label>
                <Input
                  value={form.specialEffect ?? ''}
                  onChange={(e) => handleChange('specialEffect', e.target.value)}
                />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SpellForm;
