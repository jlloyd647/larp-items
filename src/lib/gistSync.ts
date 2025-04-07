import CryptoJS from 'crypto-js';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useTraitStore } from '@/stores/useTraitStore';
import { useSpellStore } from '@/stores/useSpellStore';
import { useSkillStore } from '@/stores/useSkillStore';

const ENCRYPTION_SECRET = import.meta.env.VITE_ENCRYPTION_SECRET;
if (!ENCRYPTION_SECRET) {
  throw new Error('VITE_ENCRYPTION_SECRET is not defined');
}

// 🔐 Encrypt/Decrypt utilities
const encrypt = (data: string): string =>
  CryptoJS.AES.encrypt(data, ENCRYPTION_SECRET).toString();

const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// 🔁 List of all localStorage store keys to sync
const STORE_KEYS = [
  'character-storage',
  'event-storage',
  'player-storage',
  'boon-storage',
  'skill-storage',
  'spell-storage',
  'trait-storage',
  'magic-item-storage',
  // add more as needed
];

// 📤 Upload all stores into one encrypted Gist file
export async function uploadAllStoresToGist(token: string, filename = 'larp-data.json') {
  const backup: Record<string, any> = {};

  for (const key of STORE_KEYS) {
    const data = localStorage.getItem(key);
    if (data) {
      backup[key] = JSON.parse(data);
    }
  }

  const encrypted = encrypt(JSON.stringify(backup));

  const response = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: 'Brink - LARP Management System Backup (Multi-store)',
      public: false,
      files: {
        [filename]: {
          content: encrypted,
        },
      },
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('Gist upload failed:', result);
    throw new Error(result.message || 'Gist upload failed');
  }

  return result.id;
}

// 📥 Load and decrypt the backup, then restore each store
export async function loadAllStoresFromGist(gistId: string, token: string, filename = 'larp-data.json') {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const gist = await response.json();
  const content = gist.files?.[filename]?.content;

  if (!content) {
    throw new Error('No file content found in Gist');
  }

  try {
    const decrypted = decrypt(content);
    const parsed = JSON.parse(decrypted);

    Object.entries(parsed).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });

    return true;
  } catch (err) {
    console.error('Decryption or parsing failed:', err);
    throw new Error('Failed to decrypt or parse data');
  }
}

// 📥 Loads all data from Gist
export async function pullAllDataFromGist() {
  const token = localStorage.getItem('gist_token');
  const gistId = localStorage.getItem('gist_id');
  if (!token || !gistId) return;

  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!res.ok) {
      console.error('❌ Failed to fetch Gist:', await res.text());
      return;
    }

    const gist = await res.json();
    const files = gist.files;

    if (files['players.json']) {
      const players = JSON.parse(files['players.json'].content);
      usePlayerStore.getState().setPlayers(players);
    }

    if (files['characters.json']) {
      const characters = JSON.parse(files['characters.json'].content);
      useCharacterStore.getState().setCharacters(characters);
    }

    if (files['traits.json']) {
      const traits = JSON.parse(files['traits.json'].content);
      useTraitStore.getState().setTraits(traits);
    }

    if (files['spells.json']) {
      const spells = JSON.parse(files['spells.json'].content);
      useSpellStore.getState().setSpells(spells);
    }

    if (files['skills.json']) {
      const skills = JSON.parse(files['skills.json'].content);
      useSkillStore.getState().setSkills(skills);
    }

    console.log('✅ Gist data pulled and applied to stores.');
  } catch (err) {
    console.error('❌ Error pulling Gist data:', err);
  }
}
