'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useEventStore } from '@/stores/useEventStore';
import type { Event } from '@/types';

type EventFormProps = {
  event: Event;
};

export const EventForm = ({ event }: EventFormProps) => {
  const players = usePlayerStore((s) => s.players);
  const characters = useCharacterStore((s) => s.characters);
  const updateEvent = useEventStore((s) => s.updateEvent);

  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [attendees, setAttendees] = useState(event.attendees);

  const [editingName, setEditingName] = useState(false);
  const [editingDate, setEditingDate] = useState(false);

  const isChecked = (charId: number, playerId: number) =>
    attendees.some(
      (a) => a.characterId === charId && a.playerId === playerId
    );

  const toggleAttendee = (charId: number, playerId: number, checked: boolean) => {
    const updated = checked
      ? [...attendees, { playerId, characterId: charId }]
      : attendees.filter(
          (a) => !(a.characterId === charId && a.playerId === playerId)
        );
    setAttendees(updated);
  };

  const handleSave = () => {
    updateEvent({
      ...event,
      name,
      date,
      attendees,
    });
    setEditingName(false);
    setEditingDate(false);
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {editingName ? (
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <span className="text-lg font-medium">{name}</span>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingName(!editingName)}
          >
            <Pencil className="w-4 h-4 mr-1" />
            {editingName ? 'Done' : undefined}
          </Button>
        </div>

        {/* Date Row */}
        <div className="flex items-center gap-2">
          {editingDate ? (
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <span className="text-muted-foreground">{date}</span>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingDate(!editingDate)}
          >
            <Pencil className="w-4 h-4 mr-1" />
            {editingDate ? 'Done' : undefined}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">Characters Played</p>
        <ScrollArea className="h-[300px] border rounded-md p-2">
          <div className="space-y-2">
          {[...characters]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((char) => {
              const player = players.find((p) => p.id === char.playerId);
              if (!player) return null;

              const checked = isChecked(char.id, player.id);

              return (
                <label key={char.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(value) =>
                      toggleAttendee(char.id, player.id, value === true)
                    }
                  />
                  <span className="text-sm">
                    {char.name}{' '}
                    <span className="text-muted-foreground">({player.name})</span>
                  </span>
                </label>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default EventForm;
