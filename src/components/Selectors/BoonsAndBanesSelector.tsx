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
import type { Boon } from '@/types';
import { useBoonStore } from '@/stores/useBoonStore';
import AddBoonOrBaneForm from '../BoonsAndBanesForm/AddBoonOrBaneForm';

type BoonAndBaneSelectorProps = {
  list: Boon[];
  setSelectedBoon: (boon: Boon) => void;
};

const BoonAndBaneSelector = ({ list, setSelectedBoon }: BoonAndBaneSelector) => {
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
        {filteredList.map((boon) => (
          <div className="flex items-center" key={boon.id}>
            <Button
              onClick={() => setSelectedBoon(boon)}
              variant="ghost"
              className="flex-grow justify-start py-2 px-4 mb-1 last:mb-0"
            >
              {boon.name}
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
          <AddBoonOrBaneForm closeDialog={() => setIsAddDialogOpen(false)}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoonAndBaneSelector;
