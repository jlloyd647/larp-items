'use client';

import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import { Printer } from 'lucide-react';
import type { Character } from '@/types';

type CharacterCardProps = {
  character: Character;
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
    <div ref={printRef} className="print-content space-y-2 p-4 border rounded-md shadow-sm bg-white">
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
