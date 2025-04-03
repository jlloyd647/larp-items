'use client';

import { useCharacterStore } from '@/stores/useCharacterStore';
import { useSkillStore } from '@/stores/useSkillStore';
import { useTraitStore } from '@/stores/useTraitStore';

type CharacterPrintCardProps = {
  characterId: number;
  body: number;
  skill: number;
};

const CharacterPrintCard = ({ characterId, body, skill }: CharacterPrintCardProps) => {
  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );

  const getSkillById = useSkillStore((state) => state.getSkillById);
  const getTraitById = useTraitStore((state) => state.getTraitById);

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
        className={"card-header"}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8mm',
          width: '100%',
        }}>
        <div className={"col-1" } style={{ flex: 1 }}>
          <p><strong>Player:</strong> {/* Replace with player lookup if needed */}John Doe</p>
          <p><strong>Character:</strong> {character.name}</p>
          <p><strong>Court:</strong> {character.court}</p>
        </div>
        <div className={"col-2"} style={{ flex: 1 }}>
          <p><strong>XP:</strong> {character.xp}</p>
          <p><strong>Court XP:</strong> {/* Placeholder */} 20</p>
          <p><strong>Something:</strong> {/*Placeholder */} Stuff</p>
        </div>
        <div className={"col-3"} style={{ flex: 1 }}>
          <p><strong>Bank:</strong> {/* Placeholder */} 200</p>
          <p><strong>Deaths (Total):</strong> {/* Placeholder */} 1</p>
          <p><strong>Deaths (Event):</strong></p>
        </div>
      </div>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        className="card-skills"
        style={{
          width: '66.66%',
          display: 'flex',
          flexDirection: 'column', // 🔁 this stacks children vertically
          paddingTop: '2mm',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12pt',
            marginBottom: '2mm',
          }}
        >
          <span style={{ marginRight: '4mm', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Learned Skills</span>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#ccc' }}></div>
        </div>

        <div
          className="skills-list"
          style={{
            fontSize: '8pt',
            columnCount: 2,
            columnGap: '2mm',
          }}
        >
          {character.skills && character.skills.length > 0 && (
            <ul style={{ margin: 0, padding: 0, listStylePosition: 'inside', listStyleType: 'none' }}>
              {character.skills.map((skill, index) => {
                const skillData = getSkillById(skill.skillId);
                const name = skillData?.name ?? 'Unknown skill';
                const cost = skillData?.skillCost ? ` (${skillData.skillCost})` : '';
                const rank = skill.rank ? ` R${skill.rank}` : '';

                return (
                  <li key={index}>
                    {name}
                    {rank}
                    {cost}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

        <div
          className="card-traits"
          style={{
            width: '33.33%',
            paddingLeft: '5mm',
            paddingTop: '2mm'
          }}
        >
          <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12pt',
            marginBottom: '2mm',
          }}
            >
            <span style={{ marginRight: '4mm', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Traits</span>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#ccc' }}></div>
          </div>
          <p><strong>Body:</strong> {body}</p>
          <br />
          <p><strong>Skill:</strong> {skill}</p>
          <br />
          <p><strong>Boons</strong></p>
          {character.traits && character.traits.length > 0 && (
            <ul style={{ fontSize: '8pt', paddingLeft: '4mm' }}>
              {
                character.traits
                .filter((traitId) => {
                  const trait = getTraitById(traitId);
                  return trait?.type === 'Boon';
                })
                .map((traitId, index) => {
                  const trait = getTraitById(traitId);
                  return (
                    <li key={index}>
                      {trait ? trait.name : 'Unknown boon'}
                    </li>
                  );
                })
              }
            </ul>
          )}
          <p><strong>Banes</strong></p>
          {character.traits && character.traits.length > 0 && (
            <ul style={{ fontSize: '8pt', paddingLeft: '4mm' }}>
              {
                character.traits
                .filter((traitId) => {
                  const trait = getTraitById(traitId);
                  return trait?.type === 'Bane';
                })
                .map((traitId, index) => {
                  const trait = getTraitById(traitId);
                  return (
                    <li key={index}>
                      {trait ? trait.name : 'Unknown Bane'}
                    </li>
                  );
                })
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterPrintCard;
