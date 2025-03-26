'use client';

import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';

import { useCharacterStore } from '@/stores/useCharacterStore';
import type { Player, Character } from '@/types/index';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddPlayerForm from '@/components/PlayerForm/AddPlayerForm';

type PlayerSelectorProps = {
  list: Player[];
  setSelectedPlayer: (player: Player | null) => void;
  setSelectedCharacter: (character: Character | null) => void;
};

const PlayerSelector = ({
  list,
  setSelectedPlayer,
  setSelectedCharacter,
}: PlayerSelectorProps) => {
  const [search, setSearch] = useState('');
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const characters = useCharacterStore((state) => state.characters);

  const getCharactersForPlayer = useCharacterStore(
    (state) => state.getCharactersForPlayer
  );

  const filteredList = list.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  // Watch for changes in character list
  useEffect(() => {
    if (expandedPlayerId) {
      const matching = characters.find((c) => c.playerId === expandedPlayerId);
      if (matching) {
        // Will re-render and populate the expanded list
        setExpandedPlayerId(expandedPlayerId);
      }
    }
  }, [characters]);

  return (
    <div className="w-[300px]">
      <Input
        placeholder="Search ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[400px] rounded-md border p-4">
        {filteredList.map((player) => {
          const isExpanded = Number(expandedPlayerId) === Number(player.id);
          const characters = getCharactersForPlayer(Number(player.id));

          return (
            <Collapsible
              key={player.id}
              open={isExpanded}
              onOpenChange={() =>
                setExpandedPlayerId(isExpanded ? null : player.id)
              }
            >
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    setSelectedPlayer(player)
                    setSelectedCharacter(null)
                    }
                  }
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
                  {characters.length > 0 ? (
                    characters.map((character) => (
                      <Button
                        key={character.id}
                        onClick={() => {
                          setSelectedCharacter(character)
                          setSelectedPlayer(null)
                        }

                        }
                        variant="ghost"
                        className="w-full justify-start py-2 px-4 mb-1 last:mb-0"
                      >
                        {character.name}
                      </Button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No characters
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </ScrollArea>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 w-[300px]">
            Add New Player
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Player</DialogTitle>
          </DialogHeader>

          <AddPlayerForm
            closeDialog={() => setIsAddDialogOpen(false)}
            setSelectedPlayer={setSelectedPlayer}
            setSelectedCharacter={setSelectedCharacter}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerSelector;
