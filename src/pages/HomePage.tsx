import React, { useEffect } from 'react';
import { ArtisanRecipe, Player, Character, Skill } from "@/types";
import RecipeForm from '@/components/RecipeForm';
import CharacterForm from '@/components/CharacterForm/CharacterForm';
import PlayerForm from '@/components/PlayerForm/PlayerForm';
import SkillForm from '@/components/SkillForm/SkillForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recipes } from '@/lib/consts';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSkillStore } from '@/stores/useSkillStore';
import RecipeSelector from '@/components/RecipeSelector';
import PlayerSelector from '@/components/PlayerSelector';
import SkillSelector from '@/components/SkillSelector';

const HomePage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<ArtisanRecipe>(recipes[0]);
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(null);
  const [selectedCharacter, setSelectedCharacter] = React.useState<Character | null>(null);
  const [selectedSkill, setSelectedSkill] = React.useState<Skill | null>(null);
  const players = usePlayerStore((state) => state.players);
  const skills = useSkillStore((state) => state.skills);

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
            <TabsTrigger value="events">Events</TabsTrigger>
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
            Coming Soon
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
                <PlayerSelector list={players} setSelectedPlayer={setSelectedPlayer} setSelectedCharacter={setSelectedCharacter} />
              </div>
              <div>
                {selectedCharacter ? <CharacterForm selectedCharacter={selectedCharacter}/> : <PlayerForm selectedPlayer={selectedPlayer}/>}
              </div>
            </div>
          </TabsContent>  
          <TabsContent value="skills">
            <div className='flex flex-row gap-4'>
              <div>
                <SkillSelector list={skills} setSelected={setSelectedSkill}/>
              </div>
              <div>
                {selectedSkill && (<SkillForm skill={selectedSkill} />)}
              </div>
            </div>
          </TabsContent>  
          <TabsContent value="magic">
            Coming Soon
          </TabsContent>  
          <TabsContent value="events">
            Coming Soon
          </TabsContent>  
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;