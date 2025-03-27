'use client';

import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import { Printer } from 'lucide-react';
import type { Character, Player } from '@/types';

type CharacterCardProps = {
  character: Character;
  player: Player;
};

const CharacterCard = ({ character }: CharacterCardProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page {
          size: 148mm 105mm landscape;
          margin: 5mm;
        }
        body * {
          visibility: hidden;
        }
        .print-content, .print-content * {
          visibility: visible;
        }
        .print-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 138mm;
          height: 95mm;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="border p-4 w-[600px] font-mono text-xs leading-tight space-y-2">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <p><strong>Player:</strong> {player.name}</p>
          <p><strong>Character:</strong> {character.name}</p>
          <p><strong>Court:</strong> {character.court}</p>
        </div>
        <div className="text-right">
          <p><strong>XP:</strong> {character.totalXp}/{character.courtXp}</p>
          <p><strong>XP Rem:</strong> {character.remainingXp}</p>
          <p><strong>Bank:</strong> {character.bank}</p>
        </div>
      </div>

      {/* Deaths */}
      <div className="flex justify-between">
        <p><strong>Deaths (Global):</strong> {character.deathsGlobal ?? 0}</p>
        <p><strong>Deaths (Event):</strong> {character.deathsEvent ?? 0}</p>
      </div>

      {/* Body & Skill */}
      <div className="flex justify-between">
        <p><strong>Body:</strong> {character.body}</p>
        <p><strong>Skill:</strong> {character.skill}</p>
      </div>

      {/* Boons */}
      <div>
        <strong>Boons</strong>
        <ul className="ml-4 list-disc">
          {character.boons?.map((boon, i) => <li key={i}>{boon}</li>)}
        </ul>
      </div>

      {/* Banes */}
      <div>
        <strong>Banes</strong>
        <ul className="ml-4 list-disc">
          {character.banes?.map((bane, i) => <li key={i}>{bane}</li>)}
        </ul>
      </div>

      {/* Learned Skills */}
      <div>
        <strong>Learned Skills</strong>
        <ul className="ml-4 list-disc">
          {character.skills?.map((skill, i) => (
            <li key={i}>
              {character.getSkillNameWithRank?.(skill.skillId, skill.rank) || `Skill ${skill.skillId} R${skill.rank}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Spells (Optional) */}
      {character.spells?.length > 0 && (
        <div>
          <strong>Spells</strong>
          <ul className="ml-4 list-disc">
            {character.spells.map((spell, i) => (
              <li key={i}>
                Spell {spell.spellId} {spell.cxpUsed > 0 ? `(CxP: ${spell.cxpUsed})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Add a named export for the print button
CharacterCard.PrintButton = ({ character }: { character: Character }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${character.name} Character Sheet`,
  });

  return (
    <>
      <CharacterCard character={character} ref={printRef} />
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print Character Sheet
      </Button>
    </>
  );
};

export default CharacterCard;
