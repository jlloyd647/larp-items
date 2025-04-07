'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import MagicItemEditForm from './MagicItemEditForm';
import { useMagicItemStore } from '@/stores/useMagicItemStore';
import { useCharacterStore } from '@/stores/useCharacterStore';


type MagicItemViewProps = {
  magicItemId: number | null;
  characterId: number;
};

export const MagicItemView = ({ magicItemId, characterId }: MagicItemViewProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [pendingAbilityId, setPendingAbilityId] = useState<number | null>(null);
  const [pendingAbilityType, setPendingAbilityType] = useState<'minor' | 'major'>('minor');
  const [pendingBoxKey, setPendingBoxKey] = useState<'box1' | 'box2' | 'box3'>('box1');
  const [showCxPDialog, setShowCxPDialog] = useState(false);
  const item = useMagicItemStore((s) =>
    magicItemId !== null ? s.getItemById(magicItemId) : undefined
  );
  const updateCharacterMagicItemCxp = useCharacterStore((s) => s.updateCharacterMagicItemCxp);

  const getCheckboxStyle = (spent: number | undefined) => {
    return spent === 5
      ? 'border-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white'
      : 'border-black data-[state=checked]:bg-black data-[state=checked]:text-white';
  };

  const handleBoxChange = (
    type: 'minor' | 'major',
    abilityId: number,
    boxKey: 'box1' | 'box2' | 'box3',
    checked: boolean
  ) => {
    setPendingAbilityId(abilityId);
    setPendingAbilityType(type);
    setPendingBoxKey(boxKey);
  
    if (checked) {
      setShowCxPDialog(true);
    } else {
      const update = useMagicItemStore.getState();
      if (type === 'minor') {
        update.updateMinorAbility(item!.id, abilityId, {
          [boxKey]: { checked: false, spent: 0 },
        });
      } else {
        update.updateMajorAbility(item!.id, abilityId, {
          [boxKey]: { checked: false, spent: 0 },
        });
      }
  
      // Decrease CxP
      updateCharacterMagicItemCxp(item!.characterId, -5);
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{item?.name || 'Unnamed Magic Item'}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Court XP Spent: {item?.cXpSpent ?? 0}
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowEditDialog(true)}>
              {item ? 'Edit' : 'Create'} Magic Item
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Core */}
          <div>
            <h3 className="font-semibold text-md mb-1">Core Ability</h3>
            <div className="grid grid-cols-[200px_1fr] gap-2 border-b pb-2">
              <span className="font-medium">{item?.coreAbilityName || '-'}</span>
              <span>{item?.coreAbilityDescription || '-'}</span>
            </div>
          </div>

          {/* Minor */}
          <div>
            <h3 className="font-semibold text-md mb-1">Minor Abilities</h3>
            {(item?.minorAbilities?.length ?? 0) > 0 ? (
              item!.minorAbilities!.map((ability, idx) => (
                <div
                  key={ability.id}
                  className="grid grid-cols-[200px_1fr_auto] gap-2 items-center border-b pb-2"
                >
                  <span className="font-medium">{ability.name}</span>
                  <span>{ability.description}</span>
                  <div className="flex gap-2">
                    {(['box1', 'box2'] as const).map(
                      (boxKey) =>
                        ability[boxKey] && (
                          <Checkbox
                            className={getCheckboxStyle(ability[boxKey]?.spent)}
                            key={boxKey}
                            checked={ability[boxKey]?.checked ?? false}
                            onCheckedChange={(checked) =>
                              handleBoxChange('minor', ability.id, boxKey, Boolean(checked))
                            }
                          />
                        )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No minor abilities</p>
            )}
          </div>

          {/* Major */}
          <div>
            <h3 className="font-semibold text-md mb-1">Major Abilities</h3>
            {(item?.majorAbilities?.length ?? 0) > 0 ? (
              item!.majorAbilities!.map((ability, idx) => (
                <div
                  key={ability.id}
                  className="grid grid-cols-[200px_1fr_auto] gap-2 items-center border-b pb-2"
                >
                  <span className="font-medium">{ability.name}</span>
                  <span>{ability.description}</span>
                  <div className="flex gap-2">
                    {(['box1', 'box2', 'box3'] as const).map(
                      (boxKey) =>
                        ability[boxKey] && (
                          <Checkbox
                            key={boxKey}
                            checked={ability[boxKey]?.checked ?? false}
                            onCheckedChange={(checked) =>
                              handleBoxChange('major', ability.id, boxKey, Boolean(checked))
                            }
                          />
                        )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No major abilities</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{item ? 'Edit' : 'Create'} Magic Item</DialogTitle>
          </DialogHeader>
          <MagicItemEditForm
            characterId={characterId}
            existingItem={item ?? undefined}
            closeDialog={() => setShowEditDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showCxPDialog} onOpenChange={setShowCxPDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Box as Used</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (!item || pendingAbilityId === null) return;
                const update = useMagicItemStore.getState();
                if (pendingAbilityType === 'minor') {
                  update.updateMinorAbility(item.id, pendingAbilityId, {
                    [pendingBoxKey]: { checked: true, spent: 0 },
                  });
                } else {
                  update.updateMajorAbility(item.id, pendingAbilityId, {
                    [pendingBoxKey]: { checked: true, spent: 0 },
                  });
                }
                setShowCxPDialog(false);
              }}
            >
              Free
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!item || pendingAbilityId === null) return;
                const update = useMagicItemStore.getState();

                if (pendingAbilityType === 'minor') {
                  update.updateMinorAbility(item.id, pendingAbilityId, {
                    [pendingBoxKey]: { checked: true, spent: 5 },
                  });
                } else {
                  update.updateMajorAbility(item.id, pendingAbilityId, {
                    [pendingBoxKey]: { checked: true, spent: 5 },
                  });
                }

                // 🔵 Update the character's Magic Item CxP
                updateCharacterMagicItemCxp(item.characterId, 5);

                setShowCxPDialog(false);
              }}
            >
              Costs 5 CxP
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MagicItemView;