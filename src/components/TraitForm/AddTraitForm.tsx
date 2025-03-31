'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { COURTS, ELEMENTALS } from '@/lib/consts';
import { useTraitStore } from '@/stores/useTraitStore';
import { Trait } from '@/types';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

type AddTraitFormProps = {
  closeDialog: () => void;
};

const AddTraitForm = ({ closeDialog }: AddTraitFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState<'Court' | 'Elemental'>('Court');
  const [sourceId, setSourceId] = useState<number | null>(null);
  const [rank, setRank] = useState(1);
  const [type, setType] = useState<'Boon' | 'Bane'>('Boon');

  const traits = useTraitStore((s) => s.traits);
  const addTrait = useTraitStore((s) => s.addTrait);

  const handleSubmit = () => {
    const nextId = Math.max(0, ...traits.map((t) => t.id)) + 1;

    const newTrait: Trait = {
      id: nextId,
      name,
      description,
      source,
      sourceId: sourceId ?? 0,
      rank,
      type,
    };

    addTrait(newTrait);
    closeDialog();
  };

  const sourceOptions = source === 'Court' ? COURTS : ELEMENTALS;
  const isDisabled = !name.trim() || !description.trim() || sourceId === null;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={(val) => setType(val as 'Boon' | 'Bane')}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Boon">Boon</SelectItem>
            <SelectItem value="Bane">Bane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="source">Source</Label>
        <Select value={source} onValueChange={(val) => {
          setSource(val as 'Court' | 'Elemental');
          setSourceId(null);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Court">Court</SelectItem>
            <SelectItem value="Elemental">Elemental</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sourceId">{source} Name</Label>
        <Select value={sourceId?.toString()} onValueChange={(val) => setSourceId(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder={`Select a ${source}`} />
          </SelectTrigger>
          <SelectContent>
            {sourceOptions.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Rank</Label>
        <RadioGroup defaultValue="1" onValueChange={(val) => setRank(Number(val))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="rank-1" />
            <Label htmlFor="rank-1">Rank 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="rank-2" />
            <Label htmlFor="rank-2">Rank 2</Label>
          </div>
        </RadioGroup>
      </div>

      <Button disabled={isDisabled} onClick={handleSubmit}>
        Add Trait
      </Button>
    </div>
  );
};

export default AddTraitForm;
