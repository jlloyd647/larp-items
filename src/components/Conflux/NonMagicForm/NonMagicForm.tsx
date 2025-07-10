import React from "react";
import { useState } from 'react';
import { useNonMagicItemStore } from "@/stores/ConfluxStores/useNonMagicStore";
import { useComponentStore } from "@/stores/ConfluxStores/useComponentStore";
import type { NonMagicItem } from "@/confluxTypes";
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
import ConfirmConfluxPrint from "../ConfirmConfluxPrint";

type NonMagicFormProps = {
  nonMagicItem: NonMagicItem;
  adminView?: boolean;
};

const NonMagicForm: React.FC<NonMagicFormProps> = ({ nonMagicItem, adminView }) => {
  const deleteNonMagicItem = useNonMagicItemStore((state) => state.deleteNonMagicItem);
  const [tab, setTab] = useState<'view' | 'edit'>('view');

  const predefinedComponentMap: Record<string, string> = {
    "-1": "Crystal (Any)",
    "-2": "Fiber (Any)",
    "-3": "Herbal (Any)",
    "-4": "Liquid (Any)",
    "-5": "Metal (Any)",
    "-6": "Viscera (Any)",
    "-7": "Wood (Any)",
  };

  const getComponentName = (componentId: number): string => {
    const key = componentId.toString();
    if (predefinedComponentMap[key]) {
      return predefinedComponentMap[key];
    }
    const component = useComponentStore.getState().getComponentById(componentId);
    return component?.name || "Unknown Component";
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>
          {nonMagicItem.name || 'Unnamed Item'}
          {` | Crafting Level: ${nonMagicItem.craftingLevel} | Type: ${nonMagicItem.type || 'Unknown'}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as 'view' | 'edit')}>

            <TabsList className="mb-4">
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              {adminView && (
                <TabsTrigger value="edit">Edit</TabsTrigger>
              )}
            </TabsList>


          <TabsContent value="view">
            <div className="space-y-2">
              <p><strong>Description:</strong> {nonMagicItem.effects || 'No description'}</p>
              <hr className="my-4 border-t border-gray-300" />
              
              <div className="flex space-x-4">
                <p><strong>Time:</strong> {nonMagicItem.time || 'N/A'}</p>
                <p><strong>Location:</strong> {nonMagicItem.location || 'N/A'}</p>
              </div>

              <div className="flex space-x-4">
                <p><strong>Mind:</strong> {nonMagicItem.mind || 'N/A'}</p>
                <p><strong>Willpower:</strong> {nonMagicItem.willpower || 'N/A'}</p>
              </div>

                            <hr className="my-4 border-t border-gray-300" />
              <div className="flex space-x-4">
                <p><strong>Enchantment Slots:</strong> {nonMagicItem.enchantmentSlots || 'N/A'}</p>
              </div>
              <p><strong>Required Lores:</strong> {nonMagicItem.requiredLores?.join(', ') || 'None'}</p>
              <p><strong>Requirements to Copy:</strong> {nonMagicItem.requirementsToCopy || 'N/A'}</p>
            </div>
          </TabsContent>

          <TabsContent value="components">
            <p><strong>Components:</strong></p>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Required Components</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {nonMagicItem.components.map((component, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{getComponentName(component.componentId)}</td>
                      <td className="border border-gray-300 px-4 py-2">{component.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">{component.level || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </TabsContent>

          <TabsContent value="edit">
            <p>Edit functionality is under development.</p>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="justify-end space-x-2">
        <Dialog open={false}>
          {adminView && (
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Item</Button>
            </DialogTrigger>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Delete {nonMagicItem.name || 'Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="text-sm text-muted-foreground">
              <p>
                Are you sure you want to delete <strong>{nonMagicItem.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <ConfirmConfluxPrint 
                nonMagicItem={nonMagicItem}
              />
              <Button
                variant="destructive"
                onClick={() => deleteNonMagicItem(nonMagicItem.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ConfirmConfluxPrint 
          disabled={false} 
          nonMagicItem={nonMagicItem} 
        />
      </CardFooter>
    </Card>
  );
};

export default NonMagicForm;
