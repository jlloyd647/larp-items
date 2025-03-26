import React from 'react';

interface PrinterTestProps {
  name?: string;  // Optional printer name
  description?: string; // Optional description
  primaryResourceText?: string | null; // Optional primary resource text
  secondaryResourceText?: string | null;
  uses?: number | null;
}

const PrinterTest: React.FC<PrinterTestProps> = ({
  name,
  description,
  primaryResourceText,
  secondaryResourceText,
  uses,
}) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const numberOfUses = "▢ ".repeat(uses);
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
              }
              .type {
                display: inline-block;
                border: 2px solid black;
                border-radius: 15px;
                padding: 2px 10px;
                font-size: 20;
              }
              .regular-text {
                font-size: 16;
              }
              .header {
                padding: 3px;
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
                <div class="type">Artisan<br />Consumable</div>
              </div>
              <p class="regular-text">${description}</p>
              ${primaryResourceText && `<p class="regular-text">${primaryResourceText}</p>`}
              ${secondaryResourceText !== null ? `<p class="regular-text">${secondaryResourceText}</p>` : ''}
              <div style="font-size: 24;">
                <p>Uses:</p>
                <p>${numberOfUses}</p>
              </div>
              <p class="regular-text">Creator: Jimothy</p>
              <p class="regular-text">Created: S4 E3</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
};

export default PrinterTest;