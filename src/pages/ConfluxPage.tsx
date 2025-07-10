import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentSelector from '@/components/Selectors/Conflux/ComponentSelector';
import NonMagicSelector from '@/components/Selectors/Conflux/NonMagicSelector';
import { useComponentStore } from '@/stores/ConfluxStores/useComponentStore';
import { useNonMagicItemStore } from '@/stores/ConfluxStores/useNonMagicStore';
import { ComponentForm } from '@/components/Conflux/ComponentsForm/ComponentForm';
import NonMagicForm from '@/components/Conflux/NonMagicForm/NonMagicForm';

// import { RecipeSelector } from '@/components/Selectors/Conflux/RecipeSelector';
// import { useRecipeStore } from '@/stores/ConfluxStores/useRecipeStore';
// import { RecipeForm } from '@/components/Conflux/RecipeForm/RecipeForm';
import { ArtisanRecipe } from '@/types';

const ConfluxPage: React.FC = () => {
  const components = useComponentStore((state) => state.components);
  const [selectedComponentId, setSelectedComponentId] = React.useState<number | null>(null);
  const nonMagicItems = useNonMagicItemStore((state) => state.nonMagicItems);
  const [selectedNonMagicId, setSelectedNonMagicId] = React.useState<number | null>(null);

  const selectedComponent = useComponentStore((s) => s.getComponentById(selectedComponentId ?? -1));
  const selectedNonMagic = useNonMagicItemStore((s) => s.getNonMagicItemById(selectedNonMagicId ?? -1));
  // const recipes = useRecipeStore((state) => state.recipes);
  const [selectedRecipe, setSelectedRecipe] = React.useState<ArtisanRecipe | null>(null);

  return (
    <div className="">
      <div className=''>
        <Tabs defaultValue="non-magic" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="crafting">Crafting</TabsTrigger>
            <TabsTrigger value="non-magic">Non-Magic</TabsTrigger>
            <TabsTrigger value="alchemy">Alchemy</TabsTrigger>
            <TabsTrigger value="enchantment">Enchantment</TabsTrigger>
            <TabsTrigger value="ritual-crystal">Ritual Crystal</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          <TabsContent value="crafting">
            {/* <div className='flex flex-row gap-4'>
              <div>
                <RecipeSelector list={recipes} setSelected={setSelectedRecipe}/>
              </div>
              <div>
                {selectedRecipe && (<RecipeForm selectedRecipe={selectedRecipe}/>)}
              </div>
            </div> */}
          </TabsContent>
          <TabsContent value="non-magic">
            <div className='flex flex-row gap-4'>
              <div>
                <NonMagicSelector
                  list={nonMagicItems}
                  selectedId={null}
                  setSelectedId={() => {}}
                />
              </div>
              <div>
                {selectedNonMagic && (<NonMagicForm key={selectedNonMagicId} nonMagicItem={selectedNonMagic} />)}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="alchemy">
            Coming Soon
          </TabsContent>
          <TabsContent value="enchantment">
            Coming Soon
          </TabsContent>
          <TabsContent value="ritual-crystal">
            Coming Soon
          </TabsContent>
          <TabsContent value="components">
            <div className='flex flex-row gap-4'>
              <div>
                <ComponentSelector
                  list={components}
                  selectedId={selectedComponentId}
                  setSelectedId={setSelectedComponentId}
                />
              </div>
              <div>
                {selectedComponent && (<ComponentForm key={selectedComponentId} component={selectedComponent} />)}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="data">
            Coming Soon
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfluxPage;