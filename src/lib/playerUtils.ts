import { Player, Character } from "../types";
import { players } from "./playerConsts";
import { characters } from "./charConsts";

// Get all characters for a specific player
export const getCharactersForPlayer = async (playerId: number): Promise<Character[]> => {
  return characters.filter(character => character.playerId === playerId);
}

// Get a player with their characters
// export function getPlayerWithCharacters(playerId: number) {
//   const player = players.find(p => p.playerId === playerId);
//   if (!player) return null;
  
//   const playerCharacters = getCharactersForPlayer(playerId);
  
//   return {
//     ...player,
//     characters: playerCharacters
//   };
// }

// Get player for a specific character
// export function getPlayerForCharacter(characterId: number): Player | undefined {
//   const character = characters.find(c => c.id === characterId);
//   if (!character) return undefined;
  
//   return players.find(p => p.id === character.playerId);
// }