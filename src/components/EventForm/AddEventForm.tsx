'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEventStore } from '@/stores/useEventStore';

type AddEventFormProps = {
  closeDialog: () => void;
};

const AddEventForm = ({ closeDialog }: AddEventFormProps) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const addEvent = useEventStore((s) => s.addEvent);
  const events = useEventStore((s) => s.events);

  const getNextId = () => {
    const maxId = events.reduce((max, event) => Math.max(max, event.id), 0);
    return maxId + 1;
  };

  const handleSubmit = () => {
    if (!name || !date) return;

    addEvent({
      id: getNextId(),
      name,
      date,
      attendees: [],
      characterUpdates: {},
      eventCompleted: false,
    });

    closeDialog();
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!name || !date}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default AddEventForm;
