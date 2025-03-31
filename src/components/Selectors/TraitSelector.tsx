'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Trait } from '@/types';
import AddTraitForm from '../TraitForm/AddTraitForm';

type TraitSelectorProps = {
  list: Trait[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

const TraitSelector = ({ list, selectedId, setSelectedId }: TraitSelectorProps) => {
  const [search, setSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredList = list.filter((boon) =>
    boon.name.toLowerCase().includes(search.toLowerCase())
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
        {filteredList.map((trait) => (
          <div className="flex items-center" key={trait.id}>
            <Button
              onClick={() => setSelectedId(trait.id)}
              variant={selectedId === trait.id ? 'default' : 'ghost'}
              className="flex-grow justify-start py-2 px-4 mb-1 last:mb-0"
            >
              {(trait.type === 'Bane' ? 'Bane - ' : 'Boon - ') + trait.name}
            </Button>
          </div>
        ))}
      </ScrollArea>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-full">
            Add Boon or Bane
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Boon or Bane</DialogTitle>
          </DialogHeader>
          <AddTraitForm closeDialog={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TraitSelector;