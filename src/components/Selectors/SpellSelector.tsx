import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Spell } from "@/types"
import AddSpellForm from "../SpellForm/AddSpellForm"

type SpellSelectorProps = {
  list: Spell[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

const ScrollableList = ({ list, selectedId, setSelectedId }: SpellSelectorProps) => {
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredList = list.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase())
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
        {filteredList.map((spell) => (
            <div className="flex items-center">
              <Button
                onClick={() => setSelectedId(spell.id)}
                variant={selectedId === spell.id ? 'default' : 'ghost'}
                className="flex-grow justify-start py-2 px-4 mb-1 last:mb-0"
              >
                {spell.name}
              </Button>
            </div>
        ))}
      </ScrollArea>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-full" disabled>
            Add Spell
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Spell</DialogTitle>
          </DialogHeader>
          <AddSpellForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrollableList;