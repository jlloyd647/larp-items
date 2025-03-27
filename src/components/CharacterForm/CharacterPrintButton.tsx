'use client';

import { Button } from '@/components/ui/button';

const CharacterPrintButton = () => {
  const handlePrint = () => {
    window.electron?.ipcRenderer.send('print-character-card');
  };

  return (
    <Button onClick={handlePrint}>
      🖨️ Print Character Card
    </Button>
  );
};

export default CharacterPrintButton;
