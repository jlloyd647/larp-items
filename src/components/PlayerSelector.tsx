import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible"
import { getCharactersForPlayer } from "@/lib/playerUtils"

type ListProps<T> = {
  setSelectedPlayer: React.Dispatch<React.SetStateAction<T>>;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<T>>;
  list: T[];
}

const PlayerSelector = <T extends { id: number, name: string}>({ list, setSelectedPlayer, setSelectedCharacter }: ListProps<T>) => {
  const [search, setSearch] = useState("");

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
        {filteredList.map((player) => (
          <Collapsible key={player.id}>
            <div className="flex items-center">
              <Button
                onClick={() => setSelectedPlayer(player)}
                variant="ghost"
                className="flex-grow justify-start py-2 px-4 mb-1 last:mb-0"
              >
                {player.name}
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="pl-4">
                {getCharactersForPlayer(player.id).map((character) => (
                  <Button 
                    onClick={() => setSelectedCharacter(character)}
                    key={character.id} 
                    variant="ghost" 
                    className="w-full justify-start py-2 px-4 mb-1 last:mb-0"
                  >
                    {character.name}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </ScrollArea>
    </div>
  );
};

export default PlayerSelector;