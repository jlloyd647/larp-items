'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useEventStore } from '@/stores/useEventStore';
import type { Event } from '@/types';
import type { Character } from '@/types';

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

  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [characterUpdates, setCharacterUpdates] = useState<{
    [charId: number]: {
      bank?: number;
      courtXp?: number;
      deaths?: number;
    };
  }>({});

  const [eventEnded, setEventEnded] = useState(event.eventCompleted ?? false);

  useEffect(() => {
    setCharacterUpdates(event.characterUpdates ?? {});
  }, [event.characterUpdates]);

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
      characterUpdates,
    });
    setEditingName(false);
    setEditingDate(false);
  };

  const handleEndEvent = () => {
    const allCharacters = useCharacterStore.getState().characters;
    const patchCharacter = useCharacterStore.getState().patchCharacter;
    const selectedEvent = useEventStore.getState().getEventById(event.id);

    allCharacters.forEach((char) => {
      const isPlayed = isChecked(char.id, char.playerId);
      const updates: Partial<Character> = {
        xp: char.xp + (isPlayed ? 10 : 5),
      };

      const entry = characterUpdates[char.id];
      if (entry?.bank) updates.bank = (char.bank ?? 0) + entry.bank;
      if (entry?.courtXp) updates.courtXp = (char.courtXp ?? 0) + entry.courtXp;
      if (entry?.deaths) updates.deaths = (char.deaths ?? 0) + entry.deaths;
      patchCharacter(char.id, updates);
    });

    if (selectedEvent) {
      useEventStore.getState().updateEvent({
        ...selectedEvent,
        eventCompleted: true,
      });
      setEventEnded(true);
    }
  };

  const handleOpenEvent = () => {
    const allCharacters = useCharacterStore.getState().characters;
    const patchCharacter = useCharacterStore.getState().patchCharacter;
    const selectedEvent = useEventStore.getState().getEventById(event.id);

    allCharacters.forEach((char) => {
      const isPlayed = isChecked(char.id, char.playerId);
      const updates: Partial<Character> = {
        xp: char.xp - (isPlayed ? 10 : 5),
      };

      const entry = characterUpdates[char.id];
      if (entry?.bank) updates.bank = (char.bank ?? 0) - entry.bank;
      if (entry?.courtXp) updates.courtXp = (char.courtXp ?? 0) - entry.courtXp;
      if (entry?.deaths) updates.deaths = (char.deaths ?? 0) - entry.deaths;
      patchCharacter(char.id, updates);
    });

    if (selectedEvent) {
      useEventStore.getState().updateEvent({
        ...selectedEvent,
        eventCompleted: false,
      });
      setEventEnded(false);
    }
  }

  const handleDeleteEvent = () => {
    const selectedEvent = useEventStore.getState().getEventById(event.id);
    if (selectedEvent) {
      useEventStore.getState().updateEvent({
        ...selectedEvent,
        deleted: true,
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const hasChanges = useMemo(() => {
    return (
      name !== event.name ||
      date !== event.date ||
      JSON.stringify(attendees) !== JSON.stringify(event.attendees) ||
      JSON.stringify(characterUpdates) !== JSON.stringify(event.characterUpdates ?? {})
    );
  }, [name, date, attendees, characterUpdates, event]);

  return (
    <Card className="w-[1000px] h-[500px]">
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
        <div className="flex justify-end gap-4 pr-4 pb-2 text-sm text-muted-foreground">
          <span>Bank +</span>
          <span>Court XP +</span>
          <span>Deaths +</span>
        </div>
        <ScrollArea className="h-[300px] border rounded-md p-2">
          <div className="space-y-2">
            {[...characters]
              .filter((char) => !char.deleted)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((char) => {
                const player = players.find((p) => p.id === char.playerId);
                if (!player) return null;

                const checked = isChecked(char.id, player.id);

                return (
                  <div
                    key={char.id}
                    className="flex flex-wrap items-center justify-between gap-2 border-b py-2"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) =>
                          toggleAttendee(char.id, player.id, value === true)
                        }
                        disabled={eventEnded}
                      />
                      <span className="text-sm">
                        {char.name}{' '}
                        <span className="text-muted-foreground">({player.name})</span>
                      </span>
                    </div>

                    <input
                      type="number"
                      placeholder="Bank +"
                      value={characterUpdates[char.id]?.bank ?? ''}
                      className="w-[80px] border rounded px-2 py-1 text-sm"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setCharacterUpdates((prev) => ({
                          ...prev,
                          [char.id]: {
                            ...prev[char.id],
                            bank: isNaN(value) || value === 0 ? undefined : value,
                          },
                        }));
                      }}
                      disabled={eventEnded}
                    />

                    <input
                      type="number"
                      placeholder="Court XP +"
                      value={characterUpdates[char.id]?.courtXp ?? ''}
                      className="w-[100px] border rounded px-2 py-1 text-sm"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setCharacterUpdates((prev) => ({
                          ...prev,
                          [char.id]: {
                            ...prev[char.id],
                            courtXp: isNaN(value) || value === 0 ? undefined : value,
                          },
                        }));
                      }}
                      disabled={eventEnded}
                    />

                    <input
                      type="number"
                      placeholder="Deaths +"
                      value={characterUpdates[char.id]?.deaths ?? ''}
                      className="w-[80px] border rounded px-2 py-1 text-sm"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setCharacterUpdates((prev) => ({
                          ...prev,
                          [char.id]: {
                            ...prev[char.id],
                            deaths: isNaN(value) || value === 0 ? undefined : value,
                          },
                        }));
                      }}
                      disabled={eventEnded}
                    />
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button onClick={handleSave} disabled={!hasChanges}>Save Changes</Button>
        <Button onClick={handleEndEvent} disabled={eventEnded}>End Event</Button>
        <Dialog open={showOpenDialog} onOpenChange={setShowOpenDialog}>
          <DialogTrigger asChild>
            <Button disabled={!eventEnded} variant="destructive">
              Open Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reopen Event?</DialogTitle>
              <DialogDescription>
                Reopening this event will revert all XP, Court XP, Bank, and Deaths gained during the event.
                <br />
                If you only need to make small corrections, it's better to edit the character directly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOpenDialog(false)}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleOpenEvent();
                  setShowOpenDialog(false);
                }}
              >
                Reopen Anyway
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  disabled={eventEnded}
                >
                  Delete Event
                </Button>
              </div>
            </TooltipTrigger>
            {eventEnded && (
              <TooltipContent>
                Completed events cannot be deleted.
              </TooltipContent>
            )}
          </Tooltip>

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Deleting this event is <strong>irreversible</strong> and will hide it from all event lists.
                  Character data won't be rolled back, and this change cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteEvent}>
                  Yes, Delete Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default EventForm;
