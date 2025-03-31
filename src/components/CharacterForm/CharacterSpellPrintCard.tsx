'use client';

import { useCharacterStore } from '@/stores/useCharacterStore';
import { useSpellStore } from '@/stores/useSpellStore';

type CharacterPrintCardProps = {
  characterId: number;
};

const CharacterPrintCard = ({ characterId }: CharacterPrintCardProps) => {
  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );

  const getSpellById = useSpellStore((state) => state.getSpellById);

  if (!character) return null;

  return (
    <div
      style={{
        all: 'unset',
        fontFamily: 'Arial, sans-serif',
        width: '148mm',
        height: '105mm',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        background: 'white',
      }}
    >
      <div
        style={{
          fontSize: '8pt',
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            fontWeight: 'bold',
            borderBottom: '1px solid #ccc',
            paddingBottom: '2mm',
            marginBottom: '2mm',
          }}
        >
          <div style={{ width: '20%' }}>Name (Skill Cost)</div>
          <div style={{ width: '45%' }}>Effect</div>
          <div style={{ width: '35%' }}>Special</div>
        </div>

        { character.spells.map((spell) => {
          const characterSpell = getSpellById(spell.spellId);
          if (!characterSpell) return null; // Skip if spell not found

          return (
            <div key={characterSpell.id} style={{ display: 'flex', marginBottom: '1mm' }}>
              <div style={{ width: '20%' }}>{characterSpell.name} {characterSpell.skillCost > 0 && `(${characterSpell.skillCost})`}</div>
              <div style={{ width: '45%' }}>{characterSpell.description}</div>
              <div style={{ width: '35%' }}>{characterSpell.specialEffect || 'None'}</div>
            </div>
          );
        })}

      </div>


    </div>
  );
};

export default CharacterPrintCard;
