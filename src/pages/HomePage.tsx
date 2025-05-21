import React, { useEffect } from 'react';
import { ArtisanRecipe, GunsmithingRecipe, Player, Character, Skill, Event } from "@/types";
import RecipeForm from '@/components/RecipeForm';
import CharacterForm from '@/components/CharacterForm/CharacterForm';
import PlayerForm from '@/components/PlayerForm/PlayerForm';
import SkillForm from '@/components/SkillForm/SkillForm';
import EventForm from '@/components/EventForm/EventForm';
import SpellForm from '@/components/SpellForm/SpellForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recipes, gunsmithingRecipes } from '@/lib/consts';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSkillStore } from '@/stores/useSkillStore';
import { useEventStore } from '@/stores/useEventStore';
import { useSpellStore } from '@/stores/useSpellStore';
import RecipeSelector from '@/components/Selectors/RecipeSelector';
import PlayerSelector from '@/components/Selectors/PlayerSelector';
import SkillSelector from '@/components/Selectors/SkillSelector';
import EventSelector from '@/components/Selectors/EventSelector';
import SpellSelector from '@/components/Selectors/SpellSelector';
import GistSyncPanel from '@/components/DataSync/GistSyncPanel';
import { useBoonStore } from '@/stores/useBoonStore';
import TraitSelector from '@/components/Selectors/TraitSelector';
import { useTraitStore } from '@/stores/useTraitStore';
import TraitForm from '@/components/TraitForm/TraitForm';
import { useCharacterStore } from '@/stores/useCharacterStore';

const HomePage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<ArtisanRecipe>(recipes[0]);
  const [selectedGSRecipe, setSelectedGSRecipe] = React.useState<GunsmithingRecipe>(gunsmithingRecipes[0]);
  const [selectedPlayerId, setSelectedPlayerId] = React.useState<number | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = React.useState<number | null>(null);
  const [selectedEventId, setSelectedEventId] = React.useState<number | null>(null);
  const [selectedSpellId, setSelectedSpellId] = React.useState<number | null>(null);
  const [selectedTraitId, setSelectedTraitId] = React.useState<number | null>(null);
  const [selectedSkillId, setSelectedSkillId] = React.useState<number | null>(null);
  const players = usePlayerStore((state) => state.players);
  const skills = useSkillStore((state) => state.skills);
  const events = useEventStore((state) => state.events);
  const spells = useSpellStore((state) => state.spells);
  const traits = useTraitStore((state) => state.traits);

  const selectedPlayer = usePlayerStore((s) => s.getPlayerById(selectedPlayerId ?? -1));
  const selectedCharacter = useCharacterStore((s) => s.getCharacterById(selectedCharacterId ?? -1));
  const selectedEvent = useEventStore((s) => s.getEventById(selectedEventId ?? -1));
  const selectedSpell = useSpellStore((s) => s.getSpellById(selectedSpellId ?? -1));
  const selectedSkill = useSkillStore((s) => s.getSkillById(selectedSkillId ?? -1));
  const selectedTrait = useTraitStore((s) => s.getTraitById(selectedTraitId ?? -1));

  return (
    <div className="">
      <div className=''>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="artisan">Artisan</TabsTrigger>
            <TabsTrigger value="gunsmith">Gunsmith</TabsTrigger>
            <TabsTrigger value="alchemy">Alchemy</TabsTrigger>
            <TabsTrigger value="jewelcrafting">Jewelcrafting</TabsTrigger>
            <TabsTrigger value="artificer">Artificer</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="magic">Magic</TabsTrigger>
            <TabsTrigger value="boons-and-banes">Boons & Banes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          <TabsContent value="artisan">
            <div className='flex flex-row gap-4'>
              <div>
                <RecipeSelector list={recipes} setSelected={setSelectedRecipe}/>
              </div>
              <div>
                {selectedRecipe && (<RecipeForm selectedRecipe={selectedRecipe}/>)}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="gunsmith">
            <div className='flex flex-row gap-4'>
              <div>
                <RecipeSelector list={gunsmithingRecipes} setSelected={setSelectedGSRecipe}/>
              </div>
              <div>
                {selectedGSRecipe && (<RecipeForm selectedRecipe={selectedGSRecipe}/>)}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="alchemy">
            Coming Soon
          </TabsContent>
          <TabsContent value="jewelcrafting">
            Coming Soon
          </TabsContent>
          <TabsContent value="artificer">
            Coming Soon
          </TabsContent>      
          <TabsContent value="players">
            <div className='flex flex-row gap-4'>
              <div>
                <PlayerSelector 
                  list={players} 
                  selectedPlayerId={selectedPlayerId}
                  setSelectedPlayerId={setSelectedPlayerId}
                  selectedCharacterId={selectedCharacterId}
                  setSelectedCharacterId={setSelectedCharacterId}
                  />
              </div>
              <div>
                {selectedCharacter ? (
                  <CharacterForm key={selectedCharacterId} character={selectedCharacter}
                  />
                ) : selectedPlayer ? (
                  <PlayerForm key={selectedPlayerId} player={selectedPlayer} setSelectedPlayerId={setSelectedPlayerId} setSelectedCharacterId={setSelectedCharacterId} />
                ) : null}
              </div>
            </div>
          </TabsContent>  
          <TabsContent value="skills">
            <div className='flex flex-row gap-4'>
              <div>
                <SkillSelector 
                  list={skills} 
                  selectedId={selectedSkillId}
                  setSelectedId={setSelectedSkillId}
                />
              </div>
              <div>
                {selectedSkill && (<SkillForm key={selectedSkillId} skill={selectedSkill} />)}
              </div>
            </div>
          </TabsContent>  
          <TabsContent value="magic">
            <div className='flex flex-row gap-4'>
              <div>
                <SpellSelector 
                  list={spells}
                  selectedId={selectedSpellId}
                  setSelectedId={setSelectedSpellId}
                />
              </div>
              <div>
                {selectedSpell && (<SpellForm key={selectedSpellId} spell={selectedSpell} />)}
              </div>
            </div>
          </TabsContent>  
          <TabsContent value="boons-and-banes">
            <div className='flex flex-row gap-4'>
              <div>
                <TraitSelector list={traits} selectedId={selectedTraitId} setSelectedId={setSelectedTraitId} />  
              </div>
              <div>
                {selectedTrait && (<TraitForm key={selectedTraitId} trait={selectedTrait} />)}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className='flex flex-row gap-4'>
              <div>
                <EventSelector
                  list={events}
                  selectedId={selectedEventId}
                  setSelectedId={setSelectedEventId}
                />
              </div>
              <div>
                {selectedEventId && (<EventForm key={selectedEventId} event={selectedEvent} />)}
              </div>
            </div>
          </TabsContent>  
          <TabsContent value="data">
            <GistSyncPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;