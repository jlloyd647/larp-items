
import { COURTS } from '@/lib/consts';
import { PDFDocument, StandardFonts } from 'pdf-lib';

// Helper to get court name
const getCourtName = (id: number | undefined) => {
  if (typeof id === 'undefined') return 'Unknown';
  return COURTS.find((c) => Number(c.id) === Number(id))?.name || `Unknown (${id})`;
};


// Main PDF generation function
export async function generateCharacterCardPDF({ character, player, body, skill, skills, traits, xpSpent, courtXpSpent, getSpellById }: {
  character: any;
  player: any;
  body: number;
  skill: number;
  skills: any[];
  traits: any[];
  xpSpent: number;
  courtXpSpent: number;
  getSpellById: (id: number) => any;
}) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([842, 595]); // A4 landscape

  // Header: three columns, improved spacing
  page.drawText(`Player: ${player?.name || 'Unknown Player'}`, { x: 40, y: 550, size: 20, font });
  page.drawText(`Character: ${character?.name || 'Unknown Character'}`, { x: 40, y: 515, size: 20, font });
  page.drawText(`Court: ${getCourtName(character?.court)}`, { x: 40, y: 480, size: 20, font });

  page.drawText(`XP (Spent): ${character?.xp ?? 0} (${xpSpent})`, { x: 325, y: 550, size: 20, font });
  page.drawText(`Court XP (Spent): ${character?.courtXp ?? 0} (${courtXpSpent})`, { x: 325, y: 515, size: 20, font });

  page.drawText(`Bank: ${character?.bank ?? 0}`, { x: 650, y: 550, size: 24, font });
  page.drawText(`Deaths (Total): ${character?.deaths ?? 0}`, { x: 650, y: 515, size: 20, font });

  // Skills section
  page.drawText('Learned Skills', { x: 40, y: 440, size: 18, font });
  let skillY = 410;
  if (skills && skills.length > 0) {
    skills.forEach((skillObj: any, idx: number) => {
      const name = skillObj.name ?? 'Unknown skill';
      const cost = skillObj.skillCost ? ` (${skillObj.skillCost})` : '';
      const rank = skillObj.rank ? ` R${skillObj.rank}` : '';
      page.drawText(`${name}${rank}${cost}`, { x: 40 + (idx % 2) * 325, y: skillY - Math.floor(idx / 2) * 26, size: 16, font });
    });
  }

  // Traits section
  page.drawText('Traits', { x: 650, y: 440, size: 18, font });
  page.drawText(`Body: ${body}`, { x: 650, y: 410, size: 16, font });
  page.drawText(`Skill: ${skill}`, { x: 650, y: 390, size: 16, font });

  // Boons
  page.drawText('Boons:', { x: 650, y: 370, size: 16, font });
  let boonY = 350;
  if (traits && traits.length > 0) {
    traits
      .filter((trait: any) => trait.type === 'Boon')
      .forEach((trait: any, idx: number) => {
        page.drawText(trait.name ?? 'Unknown boon', { x: 670, y: boonY - idx * 22, size: 16, font });
      });
  }

  // Banes
  page.drawText('Banes:', { x: 650, y: boonY - 22 * 5, size: 16, font });
  let baneY = boonY - 22 * 6;
  if (traits && traits.length > 0) {
    traits
      .filter((trait: any) => trait.type === 'Bane')
      .forEach((trait: any, idx: number) => {
        page.drawText(trait.name ?? 'Unknown bane', { x: 670, y: baneY - idx * 22, size: 16, font });
      });
  }


  // Spell rows with pagination
  const wrapText = (text: string, maxLen: number) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    words.forEach(word => {
      if ((current + word).length > maxLen) {
        lines.push(current.trim());
        current = word + ' ';
      } else {
        current += word + ' ';
      }
    });
    if (current.trim()) lines.push(current.trim());
    return lines;
  };

  const SPELL_CARD_LINE_LIMIT = 29;
  let spellCardPage: any = null;
  let spellY = 520;
  let effectLineCount = 0;

  // Draw header and divider for spell card page
  const drawSpellHeader = (page: any) => {
    page.drawText('Name (Skill Cost)', { x: 40, y: 550, size: 16, font: fontBold });
    page.drawText('Effect', { x: 240, y: 550, size: 16, font: fontBold });
    page.drawText('Special', { x: 570, y: 550, size: 16, font: fontBold });
    page.drawLine({ start: { x: 40, y: 540 }, end: { x: 800, y: 540 }, thickness: 1, color: undefined });
  };

  // Only add spell card if character has magic (spells array exists and is non-empty)
  const hasMagic = Array.isArray(character.spells) && character.spells.length > 0;
  if (hasMagic && getSpellById) {
    character.spells.forEach((spellObj: any) => {
      const spell = getSpellById(spellObj.spellId);
      if (!spell) return;
      const name = spell.name || 'Unknown';
      const skillCost = spell.skillCost > 0 ? `(${spell.skillCost})` : '';
      const effect = spell.description || '';
      const special = spell.specialEffect || 'None';
      const effectLines = wrapText(effect, 45);
      const maxLines = Math.max(effectLines.length, 1);

      // If no page yet, or adding this spell would exceed the line limit, start a new page
      if (!spellCardPage || effectLineCount + maxLines > SPELL_CARD_LINE_LIMIT) {
        spellCardPage = pdfDoc.addPage([842, 595]);
        drawSpellHeader(spellCardPage);
        spellY = 520;
        effectLineCount = 0;
      }

      spellCardPage.drawText(`${name} ${skillCost}`, { x: 40, y: spellY, size: 12, font });
      effectLines.forEach((line, i) => {
        spellCardPage.drawText(line, { x: 240, y: spellY - i * 14, size: 12, font });
      });
      spellCardPage.drawText(special, { x: 570, y: spellY, size: 12, font });
      spellY -= maxLines * 14 + 6;
      effectLineCount += maxLines;
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Dummy React component for compatibility (if needed)
const CharacterCardPDF = () => null;
export default CharacterCardPDF;
