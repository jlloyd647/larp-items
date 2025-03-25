import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArtisanRecipe } from "@/types";
import { items } from "@/lib/consts";
import ConfirmPrint from './ConfirmPrint';
import { Button } from './ui/button';

type Recipe = {
  selectedRecipe: ArtisanRecipe;
}

const RecipeForm = ({selectedRecipe}: Recipe) => {
  const [primaryResourceText, setPrimaryResourceText] = React.useState<string | null | undefined>(null);
  const [secondaryResourceText, setSecondaryResourceText] = React.useState<string | null | undefined>(null);
  const [selectedPrimaryResourceId, setSelectedPrimaryResourceId] = React.useState<string>('');
  const [selectedSecondaryResourceId, setSelectedSecondaryResourceId] = React.useState<string>('');
  const [itemUses, setItemUses] = React.useState<number | null>(null);
  
  useEffect(() => {
    setSelectedPrimaryResourceId('');
    setSelectedSecondaryResourceId('');
    setPrimaryResourceText(null);
    setSecondaryResourceText(null);
  }, [selectedRecipe]);
  
  const handlePrimaryResourceChange = (value: string) => {
    setSelectedPrimaryResourceId(value); // Store the ID
    setPrimaryResourceText(selectedRecipe?.primaryResource.find(ingredient => ingredient.id === parseInt(value))?.description);
    setItemUses(selectedRecipe?.primaryResource?.find(ingredient => ingredient?.id === parseInt(value))?.uses);
  }
  
  const handleSecondaryResourceChange = (value: string) => {
    setSelectedSecondaryResourceId(value); // Store the ID
    setSecondaryResourceText(selectedRecipe?.secondaryResource?.find(ingredient => ingredient.id === parseInt(value))?.description);
    setItemUses(selectedRecipe?.secondaryResource?.find(ingredient => ingredient?.id === parseInt(value))?.uses);
  }

  const isConfirmPrintDisabled = (): boolean => {
    // Primary resource must always be selected
    if (!selectedPrimaryResourceId) {
      return true;
    }
    
    // If secondary resource exists, it must be selected
    if (selectedRecipe?.secondaryResource && selectedRecipe.secondaryResource.length > 0) {
      return !selectedSecondaryResourceId;
    }
    
    // Primary is selected and secondary isn't required
    return false;
  };

  return (
    <Card className="w-[1000px] h-[451px]">
      <CardHeader>
        <CardTitle>{selectedRecipe?.name}</CardTitle>
        <CardDescription>{selectedRecipe?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          {selectedRecipe?.primaryResource && (
            <div className="flex flex-row gap-4">
              <div className="w-[200px]">
                <Select 
                  value={selectedPrimaryResourceId} 
                  onValueChange={handlePrimaryResourceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRecipe?.primaryResource.map((ingredient) => (
                      <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                        {items?.find(item => item?.id === ingredient?.id)?.name} x{selectedRecipe?.primaryResourceQuantity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p>{primaryResourceText}</p>
              </div>
            </div>
          )}

          {selectedRecipe?.secondaryResource && (
            <div className="flex flex-row gap-4">
              <div className="w-[200px]">
                <Select 
                  value={selectedSecondaryResourceId}
                  onValueChange={handleSecondaryResourceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRecipe?.secondaryResource?.map((ingredient) => (
                      <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                        {items?.find(item => item?.id === ingredient?.id)?.name} x{selectedRecipe?.secondaryResourceQuantity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p>{secondaryResourceText}</p>
              </div>
            </div>
          )}

          <div className="flex flex-row gap-4">
            <ConfirmPrint 
              disabled={isConfirmPrintDisabled()}
              selectedRecipe={selectedRecipe}
              selectedPrimaryResource={items?.find(item => item?.id === parseInt(selectedPrimaryResourceId || '0'))?.name}
              selectedSecondaryResource={items?.find(item => item?.id === parseInt(selectedSecondaryResourceId || '0'))?.name}
              primaryResourceText={primaryResourceText}
              secondaryResourceText={secondaryResourceText}
              itemUses={itemUses}
            />
            <Button variant={'outline'} onClick={() => {
              setSelectedPrimaryResourceId('');
              setSelectedSecondaryResourceId('');
              setPrimaryResourceText(null);
              setSecondaryResourceText(null);
            }}>Clear</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;