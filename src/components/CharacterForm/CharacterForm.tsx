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
import CharacterCardPDF from './CharacterCardPDF';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSkillStore } from '@/stores/useSkillStore';
import { useTraitStore } from '@/stores/useTraitStore';
import { useSpellStore } from '@/stores/useSpellStore';
import { generateCharacterCardPDF } from './CharacterCardPDF';
import CharacterSpellPrintCard from './CharacterSpellPrintCard';
import { Button } from '../ui/button';
import CharacterDelete from './CharacterDelete';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useMagicItemStore } from '@/stores/useMagicItemStore';
import MagicItemView from './MagicItemView';

type CharacterFormProps = {
  character: Character;
};

export const CharacterForm = ({ character }: CharacterFormProps) => {
  // Helper to get current date in mm-dd-yy format
  const getDateString = () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    return `${mm}-${dd}-${yy}`;
  };

  // Handler to open PDF in default viewer (hardcoded path)


  // Get player from player store
  const player = usePlayerStore((state) =>
    state.players.find((p) => p.id === character.playerId)
  );
  // Get skill and trait helpers from their stores
  const getSkillById = useSkillStore((state) => state.getSkillById);
  const getTraitById = useTraitStore((state) => state.getTraitById);
  // Get XP spent helpers from character store
  const getCourtXpSpent = useCharacterStore((state) => state.getCourtXpSpentForCharacter);
  const getXpSpentForCharacter = useCharacterStore((state) => state.getXpSpentForCharacter);

  // Enrich skills and traits
  const skills = character.skills?.map((skill) => {
    const skillData = getSkillById ? getSkillById(skill.skillId) : {};
    return { ...skill, ...skillData };
  }) || [];
  const traits = character.traits?.map((traitId) => {
    const traitData = getTraitById ? getTraitById(traitId) : {};
    return { ...traitData, id: traitId };
  }) || [];
  const xpSpent = getXpSpentForCharacter ? getXpSpentForCharacter(character.id) : 0;
  const courtXpSpent = getCourtXpSpent ? getCourtXpSpent(character.id) : 0;

  const getSpellById = useSpellStore((state) => state.getSpellById);
  const handleCreatePlayerPDF = async () => {
    const pdfBytes = await generateCharacterCardPDF({
      character,
      player,
      body,
      skill,
      skills,
      traits,
      xpSpent,
      courtXpSpent,
      getSpellById,
    });
    const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = getDateString();
    a.href = url;
    a.download = `${character.name || 'character'}-card-${dateStr}.pdf`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  const [tab, setTab] = useState<'view' | 'edit' | 'card'>('view');
  const [body, setBody] = useState<number>(15);
  const [skill, setSkill] = useState<number>(15);
  const printRef = useRef<HTMLDivElement>(null);


  const magicItem = useMagicItemStore((s) =>
    s.getItemByCharacterId(character.id).find((item) => !item.deleted)
  );
  
  const magicItemId = magicItem?.id ?? null;

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

  return (
    <Card className="w-[1000px] h-[500px]">
      <CardHeader>
        <CardTitle>{character?.name ?? 'Unnamed Character'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(value) => setTab(value as 'view' | 'edit' | 'card')} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="view">Character View</TabsTrigger>
            <TabsTrigger value="magic-item">Magic Item</TabsTrigger>
            <TabsTrigger value="edit">Character Edit</TabsTrigger>
            <TabsTrigger value="card">Character Card</TabsTrigger>
            <TabsTrigger value="delete">Delete Character</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <CharacterView character={character} magicItemId={magicItemId} body={body} skill={skill} />
          </TabsContent>

          <TabsContent value="magic-item">
            <MagicItemView magicItemId={magicItemId} characterId={character.id}/>
          </TabsContent>

          <TabsContent value="edit">
            <CharacterEditForm characterId={character.id} />
          </TabsContent>

          <TabsContent value="card">
              <Button onClick={handleCreatePlayerPDF} className="ml-2">
                🧾 Create Player PDF
            </Button>
            <div ref={printRef} className="border border-gray-200 p-4">
              <CharacterCardPDF characterId={character.id} playerId={character.playerId} body={body} skill={skill} />
            </div>
            <div ref={printRef} className="border border-gray-200 p-4">
              <CharacterPrintCard characterId={character.id} playerId={character.playerId} body={body} skill={skill} />
            </div>

            {character?.spells?.length > 0 && (
              <div className="border border-gray-200 p-4">
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
