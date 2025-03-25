import type { Character } from '@/types';

type CharacterViewProps = {
  character: Character;
};

const CharacterView = ({ character }: CharacterViewProps) => {
  return (
    <div className="space-y-2">
      <p><strong>Name:</strong> {character.name}</p>
      <p><strong>XP:</strong> {character.xp}</p>
      <div>
        <strong>Skills:</strong>
        <ul className="list-disc list-inside">
          {character.skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterView;
