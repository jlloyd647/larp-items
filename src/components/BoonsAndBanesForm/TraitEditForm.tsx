'use client';

import { useTraitStore } from '@/stores/useTraitStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { COURTS, ELEMENTALS } from '@/lib/consts';
import { useState, useEffect } from 'react';

type TraitEditFormProps = {
  traitId: number;
};

const TraitEditForm = ({ traitId }: TraitEditFormProps) => {
  const trait = useTraitStore((state) =>
    state.traits.find((t) => t.id === traitId)
  );
  const updateTrait = useTraitStore((state) => state.updateTrait);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState<'Court' | 'Elemental'>('Court');
  const [sourceId, setSourceId] = useState(1);
  const [rank, setRank] = useState(1);
  const [type, setType] = useState<'Boon' | 'Bane'>('Boon');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (trait) {
      setName(trait.name);
      setDescription(trait.description);
      setSource(trait.source);
      setSourceId(trait.sourceId);
      setRank(trait.rank);
      setType(trait.type);
      setHasChanges(false);
    }
  }, [trait]);

  useEffect(() => {
    if (!trait) return;

    const changed =
      name !== trait.name ||
      description !== trait.description ||
      source !== trait.source ||
      sourceId !== trait.sourceId ||
      rank !== trait.rank ||
      type !== trait.type;

    setHasChanges(changed);
  }, [name, description, source, sourceId, rank, type, trait]);

  const handleSave = () => {
    if (!trait || !hasChanges) return;

    updateTrait({
      ...trait,
      name,
      description,
      source,
      sourceId,
      rank,
      type,
    });

    setHasChanges(false);
  };

  if (!trait) return <p className="text-sm text-destructive">Trait not found.</p>;

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label htmlFor="trait-name">Name</Label>
        <Input
          id="trait-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="trait-description">Description</Label>
        <Textarea
          id="trait-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="trait-rank">Rank</Label>
        <Input
          id="trait-rank"
          type="number"
          value={rank}
          onChange={(e) => setRank(Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="trait-type">Type</Label>
        <select
          id="trait-type"
          value={type}
          onChange={(e) => setType(e.target.value as 'Boon' | 'Bane')}
          className="w-full border rounded p-2"
        >
          <option value="Boon">Boon</option>
          <option value="Bane">Bane</option>
        </select>
      </div>

      <div>
        <Label htmlFor="trait-source">Source</Label>
        <select
          id="trait-source"
          value={source}
          onChange={(e) => {
            setSource(e.target.value as 'Court' | 'Elemental');
            setSourceId(1); // reset on switch
          }}
          className="w-full border rounded p-2"
        >
          <option value="Court">Court</option>
          <option value="Elemental">Elemental</option>
        </select>
      </div>

      <div>
        <Label htmlFor="trait-sourceId">{source} Name</Label>
        <select
          id="trait-sourceId"
          value={sourceId}
          onChange={(e) => setSourceId(Number(e.target.value))}
          className="w-full border rounded p-2"
        >
          {(source === 'Court' ? COURTS : ELEMENTALS).map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        onClick={handleSave}
        className="w-full mt-4"
        disabled={!hasChanges}
      >
        💾 Save Trait
      </Button>
    </form>
  );
};

export default TraitEditForm;
