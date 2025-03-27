import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import AddSkillForm from "../SkillForm/AddSkillForm"
import { Skill } from "@/types"

type SkillSelectorProps = {
  list: Skill[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

const ScrollableList = ({ list, selectedId, setSelectedId }: SkillSelectorProps) => {
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredList = list.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    console.debug(filteredList)
  }, []);

  return (
    <div className="w-[300px]">
      <Input
        placeholder="Search ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[400px] rounded-md border p-4">
        {filteredList.map((listItem) => (
            <div className="flex items-center">
              <Button
                onClick={() => setSelectedId(listItem.id)}
                variant={selectedId === listItem.id ? 'default' : 'ghost'}
                className="flex-grow justify-start py-2 px-4 mb-1 last:mb-0"
              >
                {listItem.name}
              </Button>
            </div>
        ))}
      </ScrollArea>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-full" disabled>
            Add Skill
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
          </DialogHeader>
          <AddSkillForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrollableList;