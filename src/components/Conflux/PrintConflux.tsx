import React from 'react';

interface PrinterTestProps {
  name?: string;  // Optional printer name
  type?: string;
  charName?: string;
  tagEffects?: string;
  isStack?: boolean;
  uses?: number | null;
  disabled?: boolean; // New property to disable the print button
}

const PrinterTest: React.FC<PrinterTestProps> = ({
  name,
  type = "Unknown Type",
  charName = "Jimothy", // Default character name
  tagEffects = "No description provided",
  isStack = false,
  uses,
  disabled = false, // Default value for the new property
}) => {
  const handlePrint = () => {
    if (disabled) return; // Prevent printing if disabled

    const openPrintWindow = () => {
      return new Promise<void>((resolve) => {
        const printWindow = window.open('', '_blank');
        const numberOfUses = "▢ ".repeat(uses ?? 0);
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear().toString().slice(-2)}`;

        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Printer Test</title>
                <style>
                  body { 
                    font-family: monospace;
                    text-align: center;
                  }
                  .receipt {
                    margin: 0 auto;
                    padding: 10px;
                  }
                  .name {
                    font-size: 32px;
                    text-align: center;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    overflow-wrap: break-word;
                    max-width: 15ch;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .type {
                    font-size: 18px;
                    text-align: center;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    overflow-wrap: break-word;
                    max-width: 15ch;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid black;
                    border-radius: 15px;
                    padding: 4px 8px;
                  }
                  .regular-text {
                    font-size: 16;
                  }
                  .header {
                    padding: 3px;
                    display: flex;
                    flex-direction: column; /* or row, depending on your layout */
                    gap: 8px;
                  }
                  .page-break {
                    page-break-before: always;
                    break-before: page;
                  }  
                </style>
              </head>
              <body>
                <div class="receipt">
                  <div class="header">
                    <div class="name">${name}</div>
                    <div class="type">${type}</div>
                    <div class="desc">${tagEffects}</div>
                  </div>
                  ${ isStack ? `
                  <div style="font-size: 24;">
                    <p>Uses:</p>
                    <p>${numberOfUses}</p>
                  </div>
                  ` : ""}
                  <p class="regular-text">Creator: ${charName}</p>
                  <p class="regular-text">Created: ${formattedDate}</p>
                </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          setTimeout(() => {
            printWindow.close();
            resolve();
          }, 1000);
        }
      });
    };

    const openCrafterWindow = () => {
      return new Promise<void>((resolve) => {
        const crafterWindow = window.open('', '_blank');

        if (crafterWindow) {
          crafterWindow.document.write(`
            <html>
              <head>
                <title>Crafter Test</title>
                <style>
                  body { 
                    font-family: monospace;
                    text-align: center;
                  }
                  .receipt {
                    margin: 0 auto;
                    padding: 10px;
                  }
                </style>
              </head>
              <body>
                <div class="receipt">
                  This is a test
                </div>
              </body>
            </html>
          `);
          crafterWindow.document.close();
          crafterWindow.focus();
          crafterWindow.print();
          setTimeout(() => {
            crafterWindow.close();
            resolve();
          }, 1000);
        }
      });
    };

    openPrintWindow().then(() => openCrafterWindow());
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <button 
        className={`px-4 py-2 rounded text-white ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={handlePrint}
        disabled={disabled} // Bind the disabled prop to the button
      >
        Print
      </button>
    </div>
  );
};

export default PrinterTest;