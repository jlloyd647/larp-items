import React, { useEffect } from 'react';
import { ArtisanRecipe, Player, Character } from "@/types";
import RecipeForm from '@/components/RecipeForm';
import CharacterForm from '@/components/CharacterForm';
import PlayerForm from '@/components/PlayerForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recipes } from '@/lib/consts';
import { players } from '@/lib/playerConsts';
import { characters } from '@/lib/charConsts';
import RecipeSelector from '@/components/RecipeSelector';
import PlayerSelector from '@/components/PlayerSelector';

const SamplePage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<ArtisanRecipe>(recipes[0]);
  const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>();
  const [selectedCharacter, setSelectedCharacter] = React.useState<Character | null>();

  useEffect(() => {
    setSelectedCharacter(null);
  }, [selectedPlayer]);


  return (
    <div className="">
      <div className=''>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="artisan">Artisan</TabsTrigger>
            <TabsTrigger value="gunsmith">Gunsmith</TabsTrigger>
            <TabsTrigger value="alchemy">Alchemy</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default SamplePage;