'use client';

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

type PlayerSelectorProps = {
  list: Player[];
  setSelectedPlayer: (player: Player) => void;
  setSelectedCharacter: (character: Character) => void;
};

const PlayerSelector = ({
  list,
  setSelectedPlayer,
  setSelectedCharacter,
}: PlayerSelectorProps) => {
  const [search, setSearch] = useState('');
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  const getCharactersForPlayer = useCharacterStore(
    (state) => state.getCharactersForPlayer
  );

  const filteredList = list.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
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
        {filteredList.map((player) => {
          const isExpanded = expandedPlayerId === player.id;
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
                  {characters.length > 0 ? (
                    characters.map((character) => (
                      <Button
                        key={character.id}
                        onClick={() => setSelectedCharacter(character)}
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
    </div>
  );
};

export default PlayerSelector;
