import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentSelector from '@/components/Selectors/Conflux/ComponentSelector';
import NonMagicSelector from '@/components/Selectors/Conflux/ItemSelector';
import { useComponentStore } from '@/stores/ConfluxStores/useComponentStore';
import { useNonMagicItemStore } from '@/stores/ConfluxStores/useNonMagicStore';
import { ComponentForm } from '@/components/Conflux/ComponentsForm/ComponentForm';
import AdminForm from '@/components/Conflux/AdminForm/AdminForm';
import NonMagicForm from '@/components/Conflux/ItemForm/ItemForm';
import GistSyncPanelConflux from '@/components/DataSync/GistSyncPanelConflux';

import { ArtisanRecipe } from '@/types';

const ConfluxPage: React.FC = () => {
  const components = useComponentStore((state) => state.components);
  const [selectedComponentId, setSelectedComponentId] = React.useState<number | null>(null);
  const nonMagicItems = useNonMagicItemStore((state) => state.nonMagicItems);
  const [selectedNonMagicId, setSelectedNonMagicId] = React.useState<number | null>(null);

  const selectedComponent = useComponentStore((s) => s.getComponentById(selectedComponentId ?? -1));
  const selectedNonMagic = useNonMagicItemStore((s) => s.getNonMagicItemById(selectedNonMagicId ?? -1));

  const [adminView, setAdminView] = React.useState(false);
  const [printPlayerStub, setPrintPlayerStub] = React.useState(false);

  return (
    <div className="">
      <div className=''>
        <Tabs defaultValue="non-magic" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="crafting">Crafting</TabsTrigger>
            {adminView && <TabsTrigger value="non-magic">Item Manager</TabsTrigger>}
            {adminView && <TabsTrigger value="components">Component Manager</TabsTrigger>}
            {adminView && <TabsTrigger value="data">Data</TabsTrigger>}
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="crafting">
            <div className='flex flex-row gap-4'>
              <div>
                <NonMagicSelector
                  list={nonMagicItems}
                  selectedId={selectedNonMagicId}
                  setSelectedId={setSelectedNonMagicId}
                  adminView={false}
                />
              </div>
              <div>
                {selectedNonMagic && (
                  <NonMagicForm key={selectedNonMagicId} nonMagicItem={selectedNonMagic} adminView={false} printPlayerStub={printPlayerStub} />
                )}
              </div>
            </div>
          </TabsContent>
          {adminView && (
            <TabsContent value="non-magic">
              <div className='flex flex-row gap-4'>
                <div>
                  <NonMagicSelector
                    list={nonMagicItems}
                    selectedId={selectedNonMagicId}
                    setSelectedId={setSelectedNonMagicId}
                    adminView={true}
                  />
                </div>
                <div>
                  {selectedNonMagic && (
                    <NonMagicForm key={selectedNonMagicId} nonMagicItem={selectedNonMagic} adminView={true} />
                  )}
                </div>
              </div>
            </TabsContent>
          )}
          {adminView && (
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
          )}
          {adminView && (
            <TabsContent value="data">
              <GistSyncPanelConflux />
            </TabsContent>
          )}
          <TabsContent value="admin">
            <div className='flex flex-row gap-4'>
              <div>
                <AdminForm adminView={adminView} setAdminView={setAdminView} printPlayerStub={printPlayerStub} setPrintPlayerStub={setPrintPlayerStub} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfluxPage;