'use client';

const CharacterPrintCard = () => {
  return (
    <div
      style={{
        width: '148mm',
        height: '105mm',
        overflow: 'hidden', // 👈 prevents sneaky overflow
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        background: 'white',
      }}
    >
      <div>
        <p><strong>Player:</strong> John Doe</p>
        <p><strong>Character:</strong> Nightblade</p>
        <p><strong>Court:</strong> Radiant</p>
      </div>

      <div>
        <p><strong>XP:</strong> 30</p>
        <p><strong>Bank:</strong> 5</p>
        <p><strong>Body:</strong> 3</p>
        <p><strong>Skill:</strong> 2</p>
      </div>
    </div>
  );
};

export default CharacterPrintCard;