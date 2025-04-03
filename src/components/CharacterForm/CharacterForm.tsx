'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader
} from '../ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../ui/tabs';

import type { Character } from '@/types';

import CharacterView from './CharacterView';
import CharacterEditForm from './CharacterEditForm';

import CharacterPrintCard from './CharacterPrintCard';
import CharacterSpellPrintCard from './CharacterSpellPrintCard';
import { Button } from '../ui/button';
import CharacterDelete from './CharacterDelete';
import { useCharacterStore } from '@/stores/useCharacterStore';

type CharacterFormProps = {
  character: Character;
};

export const CharacterForm = ({ character }: CharacterFormProps) => {
  const [tab, setTab] = useState<'view' | 'edit' | 'card'>('view');
  const [body, setBody] = useState<number>(15);
  const [skill, setSkill] = useState<number>(15);
  const printRef = useRef<HTMLDivElement>(null);
  const printSpellRef = useRef<HTMLDivElement>(null);

  const lesserStaminaRanks = useCharacterStore((state) => {
    return character?.skills.find((s) => s.skillId === 115)?.rank ?? 0;
  });

  useEffect(() => {
    setBody(15 + lesserStaminaRanks * 5);
  }, [lesserStaminaRanks]);

  useEffect(() => {
    const xp = character.xp ?? 0;

    if (xp >= 150) {
      setSkill(30);
    } else if (xp >= 90) {
      setSkill(25);
    } else if (xp >= 50) {
      setSkill(20);
    } else {
      setSkill(15);
    }
  }, [character])

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
      <CardHeader>
        <CardTitle>{character?.name ?? 'Unnamed Character'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(value) => setTab(value as 'view' | 'edit' | 'card')} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="view">Character View</TabsTrigger>
            <TabsTrigger value="edit">Character Edit</TabsTrigger>
            <TabsTrigger value="card">Character Card</TabsTrigger>
            <TabsTrigger value="delete">Delete Character</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <CharacterView character={character} body={body} skill={skill} />
          </TabsContent>

          <TabsContent value="edit">
            <CharacterEditForm characterId={character.id} />
          </TabsContent>

          <TabsContent value="card">
            <Button onClick={() => handlePrint(printRef)}>
              🖨️ Print Character Card
            </Button>
            {character?.spells?.length > 0 && (
              <Button onClick={() => handlePrint(printSpellRef)} className="ml-2">
                🖨️ Print Spell Card
              </Button>
            )}
            <div ref={printRef} className="border border-gray-200 p-4">
              <CharacterPrintCard characterId={character.id} body={body} skill={skill} />
            </div>

            {character?.spells?.length > 0 && (
              <div ref={printSpellRef} className="border border-gray-200 p-4">
                <CharacterSpellPrintCard characterId={character.id} />
              </div>
            )}
          </TabsContent>
          <TabsContent value="delete">
            <CharacterDelete characterId={character.id} characterName={character.name} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CharacterForm;
