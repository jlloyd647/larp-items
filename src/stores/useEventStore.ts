import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Event } from '@/types';

type EventState = {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: number) => void;
  getEventById: (id: number) => Event | undefined;
};

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: [
        {
          id: 1,
          name: 'Season 4 Event 1',
          date: "2024-09-21",
          attendees: [],
        },
        {
          id: 2,
          name: 'Season 4 Event 2',
          date: "2024-10-21",
          attendees: [],
        },
        {
          id: 3,
          name: 'Season 4 Event 3',
          date: "2025-03-21",
          attendees: [],
        },
        {
          id: 4,
          name: 'Season 4 Event 3',
          date: "2025-05-21",
          attendees: [],
        },
      ],

      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),

      updateEvent: (updatedEvent) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === updatedEvent.id ? updatedEvent : e
          ),
        })),

      deleteEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== eventId),
        })),

      getEventById: (id) => get().events.find((e) => e.id === id),
    }),
    {
      name: 'event-storage', // LocalStorage key
    }
  )
);
