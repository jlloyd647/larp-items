'use client';

import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../../ui/card';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../../ui/dialog';

import type { Component } from '@/confluxTypes';
// import SkillEditForm from './SkillEditForm';
import { useComponentStore } from '@/stores/ConfluxStores/useComponentStore';
import EditComponentForm from './EditComponentForm';

type ComponentFormProps = {
  component: Component;
};

export const ComponentForm = ({ component }: ComponentFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit'>('view');
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteComponent = useComponentStore((state) => state.deleteComponent);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{component?.name || 'Unnamed Component'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <div className="space-y-2">
              <p><strong>Description:</strong> {component?.description || 'No description'}</p>
              <p><strong>Tier Level:</strong> {component?.level}</p>
              <p><strong>Type:</strong> {component?.type || 'Unknown'}</p>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <EditComponentForm componentId={component.id} onClose={() => setTab('view')} />
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="justify-end">
        {tab !== 'edit' && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Component</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Delete {component.name || 'Component'}
                </DialogTitle>
              </DialogHeader>
              <div className="text-sm text-muted-foreground">
                <p>
                  Are you sure you want to delete <strong>{component.name}</strong>? This action cannot be undone.
                </p>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteComponent(component.id);
                    setDialogOpen(false);
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>  
          </Dialog>
        )}
      </CardFooter>  
    </Card>
  );
};

export default ComponentForm;
