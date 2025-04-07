import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddEventForm from "@/components/EventForm/AddEventForm"

type EventSelectorProps = {
  list: Event[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

const ScrollableList = ({ list, selectedId, setSelectedId }: EventSelectorProps) => {
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredList = list
  .filter((event) => !event.deleted)
  .filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[300px]">
      <Input
        placeholder="Search ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[400px] rounded-md border p-4">
        {filteredList.map((event) => (
            <div className="flex items-center">
              <Button
                onClick={() => setSelectedId(event.id)}
                variant={selectedId === event.id ? 'default' : 'ghost'}
                className="flex-grow justify-start py-2 px-4 mb-1 last:mb-0"
              >
                {event.name}
              </Button>
            </div>
        ))}
      </ScrollArea>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-full">
            Create New Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>

          <AddEventForm closeDialog={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrollableList;