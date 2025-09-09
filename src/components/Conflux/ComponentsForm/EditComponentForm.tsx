import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useComponentStore } from '@/stores/ConfluxStores/useComponentStore';

type EditComponentFormProps = {
  componentId: number;
  onClose: () => void;
};

const EditComponentForm = ({ componentId, onClose }: EditComponentFormProps) => {
  const component = useComponentStore((state) =>
    state.components.find((c) => c.id === componentId)
  );
  const updateComponent = useComponentStore((state) => state.updateComponent);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (component) {
      setName(component.name);
      setDescription(component.description);
      setLevel(component.level.toString());
      setType(component.type);
      setHasChanges(false);
    }
  }, [component]);

  const handleSave = () => {
    if (!component) return;

    updateComponent({
      ...component,
      name,
      description,
      level: parseInt(level, 10),
      type,
    });

    setHasChanges(false);
    onClose();
  };

  if (!component) return <p className="text-sm text-destructive">Component not found.</p>;

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label htmlFor="component-name">Name</Label>
        <Input
          id="component-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>

      <div>
        <Label htmlFor="component-description">Description</Label>
        <Textarea
          id="component-description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>

      <div>
        <Label htmlFor="component-level">Level</Label>
        <Input
          id="component-level"
          type="number"
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>

      <div>
        <Label htmlFor="component-type">Type</Label>
        <Input
          id="component-type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!hasChanges}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditComponentForm;
