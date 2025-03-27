'use client';

import { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../ui/tabs';

import type { Character, Player } from '@/types';

import CharacterView from './CharacterView';
import CharacterEditForm from './CharacterEditForm';

import { useSkillStore } from '@/stores/useSkillStore';
import CharacterPrintCard from './CharacterPrintCard';
import { Button } from '../ui/button';

type CharacterFormProps = {
  selectedCharacter: Character;
};

export const CharacterForm = ({ selectedCharacter }: CharacterFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit' | 'card'>('view');
  const printRef = useRef<HTMLDivElement>(null);

  const getSkillById = useSkillStore((state) => state.getSkillById);
  const getSkillNameWithRank = (skillId: number, rank: number) => {
    const skill = getSkillById(skillId);
    return skill ? `${skill.name} R${rank}` : `Skill ${skillId} R${rank}`;
  };

  const handlePrint = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
  
    const printContents = ref.current.innerHTML;
  
    // Create a hidden iframe
    const printFrame = document.createElement('iframe');
    printFrame.name = 'print-frame';
    printFrame.style.position = 'absolute';
    printFrame.style.left = '-9999px';
    document.body.appendChild(printFrame);
  
    const frameDoc = printFrame.contentWindow?.document;
    if (!frameDoc) return;
  
    // Write the print content and styles
    frameDoc.open();
    frameDoc.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @page {
              size: 148mm 105mm; /* A6 landscape */
              margin: 0;
            }
            html, body {
              width: 148mm;
              height: 105mm;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            .card-frame {
              width: 148mm;
              height: 105mm;
              padding: 8mm;
              font-family: monospace;
              font-size: 10px;
            }
          </style>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="card-frame">
            ${printContents}
          </div>
        </body>
      </html>
    `);
    frameDoc.close();
  
    // Print after short delay to ensure rendering is done
    setTimeout(() => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      document.body.removeChild(printFrame);
    }, 250);
  };

  return (
    <Card className="w-[1000px] h-[500px]">
      <CardContent>
        <Tabs value={tab} onValueChange={(value) => setTab(value as 'view' | 'edit' | 'card')} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="view">Character View</TabsTrigger>
            <TabsTrigger value="edit">Character Edit</TabsTrigger>
            <TabsTrigger value="card">Character Card</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <CharacterView character={selectedCharacter} />
          </TabsContent>

          <TabsContent value="edit">
            <CharacterEditForm character={selectedCharacter} />
          </TabsContent>

          <TabsContent value="card">
            <div ref={printRef} className="border border-gray-200 p-4">
              <CharacterPrintCard />
            </div>

            <Button onClick={() => handlePrint(printRef)}>
              🖨️ Print Character Card
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CharacterForm;
