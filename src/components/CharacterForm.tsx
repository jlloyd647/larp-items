import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Character } from '@/types';
import { Printer } from "lucide-react";

type SelectedCharacter = {
  selectedCharacter: Character;
}

export const CharacterForm = ({ selectedCharacter }: SelectedCharacter) => {
  const printComponentRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page { 
          size: landscape; /* Ensure landscape orientation */
          size: 148mm 105mm;
          margin: 5mm; 
        }
        body * { visibility: hidden; }
        .print-content, .print-content * { visibility: visible; }
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
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Check the react-to-print documentation for the exact props
  const handlePrint = useReactToPrint({
    documentTitle: `${selectedCharacter.name} Character Sheet`,
    // This should be the correct property name based on the error
    contentRef: printComponentRef,
    pageStyle: `
    @page {
      size: 148mm 105mm landscape; /* Swapped dimensions + landscape keyword */
      margin: 5mm;
    }
  `
    // Try this if contentRef doesn't work
    // content: () => printComponentRef.current,
  });

  return (
    <Card className="w-[1000px] h-[451px]">
      <CardHeader>
        <CardTitle>{selectedCharacter.name}</CardTitle>
        <CardDescription>Huh</CardDescription>
      </CardHeader>
      <CardContent>
      
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Character Sheet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterForm;