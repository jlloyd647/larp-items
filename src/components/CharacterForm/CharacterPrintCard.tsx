'use client';

import { useCharacterStore } from '@/stores/useCharacterStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSkillStore } from '@/stores/useSkillStore';
import { useTraitStore } from '@/stores/useTraitStore';
import { COURTS } from '@/lib/consts';

type CharacterPrintCardProps = {
  characterId: number;
  playerId: number;
  body: number;
  skill: number;
};

const CharacterPrintCard = ({ characterId, playerId, body, skill }: CharacterPrintCardProps) => {
  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === characterId)
  );

  const getSkillById = useSkillStore((state) => state.getSkillById);
  const getTraitById = useTraitStore((state) => state.getTraitById);
  const getCourtXpSpent = useCharacterStore((state) => state.getCourtXpSpentForCharacter);
  const getXpSpentForCharacter = useCharacterStore((state) => state.getXpSpentForCharacter);
  const getCourtName = (id: number) => {
    return COURTS.find((c) => Number(c.id) === Number(id))?.name || `Unknown (${id})`;
  };

  const player = usePlayerStore((state) =>
    state.players.find((p) => p.id === playerId));

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
          <p><strong>Player:</strong> {player?.name}</p>
          <p><strong>Character:</strong> {character.name}</p>
          <p><strong>Court:</strong> {getCourtName(character?.court)}</p>
        </div>
        <div className={"col-2"} style={{ flex: 1 }}>
          <p><strong>XP (Spent):</strong> {character.xp} ({ getXpSpentForCharacter(characterId) })</p>
          <p><strong>Court XP (Spent):</strong> {character.courtXp} ({ getCourtXpSpent(characterId) })</p>
          <p>{/* Future Display Here */}</p>
        </div>
        <div className={"col-3"} style={{ flex: 1 }}>
          <p><strong>Bank:</strong> {character.bank} </p>
          <p><strong>Deaths (Total):</strong> {character.deaths} </p>
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
