'use client';

import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
  selectedPlayerId: number | null; // Changed to number for consistency with player.id
  setSelectedPlayerId: (id: number) => void;
  selectedCharacterId: number | null;
  setSelectedCharacterId: (id: number | null) => void;
};

const PlayerSelector = ({
  list,
  selectedPlayerId,
  setSelectedPlayerId,
  selectedCharacterId,
  setSelectedCharacterId,
}: PlayerSelectorProps) => {
  const [search, setSearch] = useState('');
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const characters = useCharacterStore((state) => state.characters);

  const getCharactersForPlayer = useCharacterStore(
    (state) => state.getCharactersForPlayer
  );

  const filteredList = list.filter((player) =>
    showInactive
      ? player.inactive === true
      : !player.inactive && player.name.toLowerCase().includes(search.toLowerCase())
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
                    setSelectedPlayerId(player.id)
                    setSelectedCharacterId(null)
                    }
                  }
                  variant={selectedPlayerId === player.id ? 'default' : 'ghost'}
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
                          setSelectedCharacterId(character.id)
                          setSelectedPlayerId(0)
                        }

                        }
                        variant={selectedCharacterId === character.id ? 'default' : 'ghost'}
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
      <div className="mb-2 flex items-center space-x-2 justify-end">
        <Label htmlFor="showInactive" className="text-sm cursor-pointer">
          Show Inactive Players
        </Label>
        <Checkbox
          id="showInactive"
          checked={showInactive}
          onCheckedChange={(checked) => {
            setShowInactive(!!checked);
            setSelectedPlayerId(0);
            setSelectedCharacterId(null);
          }}
        />
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[300px]">
            Add New Player
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Player</DialogTitle>
          </DialogHeader>

          <AddPlayerForm
            closeDialog={() => setIsAddDialogOpen(false)}
            setSelectedPlayerId={setSelectedPlayerId}
            setSelectedCharacter={setSelectedCharacterId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerSelector;
