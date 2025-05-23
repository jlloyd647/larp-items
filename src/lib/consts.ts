import type { Item, CraftedItem, ArtisanRecipe, GunsmithingRecipe } from "../types";

export const items: Item[] = [
  { id: 1001, name: "Black Pine", type: "Wood" },
  { id: 1002, name: "Silver Palm", type: "Wood" },
  { id: 1003, name: "Prismatic Oak", type: "Wood" },
  { id: 1004, name: "Metallica", type: "Metal" },
  { id: 1005, name: "Lead", type: "Metal" },
  { id: 1006, name: "Solid Neon", type: "Metal" },
  { id: 1007, name: "Hare Metal", type: "Metal" },
  { id: 1008, name: "Quick Silver", type: "Metal" },
  { id: 1009, name: "Common", type: "Leather" },
  { id: 1010, name: "Fine", type: "Leather" },
  { id: 1011, name: "Mythic", type: "Leather" },
  { id: 1012, name: "Forbidden", type: "Leather" },
  { id: 1013, name: "Swamp Glass", type: "Glass" },
  { id: 1014, name: "Sea Glass", type: "Glass" },
  { id: 1015, name: "Aurelionite Glass", type: "Glass" },
  { id: 1016, name: "Linen Cloth", type: "Cloth" },
  { id: 1017, name: "Spindle Silk", type: "Cloth" },
  { id: 1018, name: "Dream Cloth", type: "Cloth" },
  { id: 1019, name: "Jakal Fang", type: "Monster" },
  { id: 1020, name: "Noct Fang", type: "Monster" },
  { id: 1021, name: "Black Powder", type: "Alchemy" },
  { id: 1022, name: "Guncotton", type: "Alchemy" },
  { id: 1023, name: "Nitro", type: "Alchemy" },
];

export const craftedItems: CraftedItem[] = [
  { id: 1001, name: "Serrated Edging", type: "Artisan"},
  { id: 1002, name: "Injector", type: "Artisan"},
  { id: 1003, name: "Verita Gem: Weapon Imbue Magic", type: "Magic"},
  { id: 1004, name: "R1-Trigger", type: "Drug"},
  { id: 1005, name: "Epoxy Adhesive", type: "Alchemy"},
  { id: 1006, name: "Tissue Adhesive", type: "Alchemy"},
]

export const recipes: ArtisanRecipe[] = [
  { id: 1, name: "Bandage", description: "A simple bandage for minor wounds.", 
    primaryResource: [
      {id: 1016, description: 'Adds 3 minutes to Bleed Out'},
      {id: 1017, description: 'Adds 10 minutes to Bleed Out'},
      {id: 1018, description: 'Adds 60 minutes to Bleed Out'}],
    primaryResourceQuantity: 1,
  },
  { id: 2, name: "Needle & Suture", description: "For stitching up larger wounds.",
    primaryResource: [
      {id: 1004, description: 'Reduce the skill cost of Mend Wounds by 2'}
    ],
    primaryResourceQuantity: 1,
    secondaryResource: [
      {id: 1016, description: '1 Use', uses: 1},
      {id: 1017, description: '8 Uses', uses: 8},
      {id: 1018, description: '25 Uses', uses: 25}
    ],
    secondaryResourceQuantity: 1,
  },
  { id: 3, name: "Splint", description: "For stabilizing broken bones.",
    primaryResource: [
      {id: 1015, description: 'Reduce the cost of Reset Limb by 1'},
      {id: 1016, description: 'Additionally, Reset Limb is now a 3 count'},
      {id: 1017, description: 'Additionally, Reset Limb is instant'}],
    primaryResourceQuantity: 1,
  },
  { id: 4, name: "Scalpel", description: "A sharp blade for surgical procedures.",
    primaryResource: [
      {id: 1013, description: 'Reduces Field Surgery Time to 3 minutes'},
      {id: 1015, description: 'Reduces Field Surgery Time to 1 minute'},
      ],
    primaryResourceQuantity: 1,
    secondaryResource: [
      {id: 1004, description: '1 Use', uses: 1},
      {id: 1005, description: '2 Uses', uses: 2},
      {id: 1006, description: '8 Uses', uses: 8}
    ],
    secondaryResourceQuantity: 1,
  },
  { id: 5, name: "Injector", description: "Allows use of alchemy on an unconscious target as if it were injested.",
    primaryResource: [
      {id: 1004, description: 'No Known Modifiers'},
      {id: 1005, description: 'No Known Modifiers'},
      {id: 1006, description: 'No Known Modifiers'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1013, description: 'No Known Modifiers'},
      {id: 1014, description: 'No Known Modifiers'},
      {id: 1015, description: 'No Known Modifiers'},
    ],
    secondaryResourceQuantity: 2,
  },
  { id: 6, name: "Lock Pick", description: "Modifies the Pick Lock skill.",
    primaryResource: [
      {id: 1005, description: 'Reduces Pick Lock count by 30 seconds'},
      {id: 1006, description: 'Reuces Pick Lock count by 60 seconds'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1010, description: 'Reduces skill cost by 1'},
      {id: 1011, description: 'Reduces skill cost by 2'},
    ],
    secondaryResourceQuantity: 1, 
  },
  { id: 7, name: "Shield Repair Kit", description: "Can be used to purge a shield of its Broken status.",
    primaryResource: [
      {id: 1004, description: 'Purge Broken status after 60 count'},
      {id: 1005, description: 'Purge Broken status after 30 count'},
      {id: 1006, description: 'Purge Broken status instantly'},
      ],
    primaryResourceQuantity: 3,
    secondaryResource: [
      {id: 1009, description: 'No modifier'},
      {id: 1010, description: 'No modifier'},
      {id: 1011, description: 'Shield also gains a single use of Resist Break until the next reset'},
    ],
    secondaryResourceQuantity: 3,
  },
  { id: 8, name: "Doorbuster", description: "Reduces the time it takes to purge the Barricade status",
    primaryResource: [
      {id: 1004, description: 'No modifier'},
      ],
    primaryResourceQuantity: 5,
    secondaryResource: [
      {id: 1013, description: 'Barricade time is reduced by half'},
      {id: 1015, description: 'Instantly removes the Barricade status'},
    ],
    secondaryResourceQuantity: 3,
  },
  { id: 9, name: "Lockbar", description: "Puts the Barricade status on a door or other opening.",
    primaryResource: [
      {id: 1004, description: 'Barricade 30'},
      {id: 1005, description: 'Barricade 60'},
      {id: 1006, description: 'Barricade 180'},
      ],
    primaryResourceQuantity: 5,
    secondaryResource: [
      {id: 1010, description: '1 Use', uses: 1},
      {id: 1011, description: '3 Uses', uses: 3},
      {id: 1012, description: '8 Uses', uses: 8},
    ],
    secondaryResourceQuantity: 3, 
  },
  { id: 10, name: "Kevlar Shield Cover", description: "Allows shields to block bullets for a duration",
    primaryResource: [
      {id: 1010, description: 'One Combat'},
      {id: 1011, description: 'One Reset'},
      ],
    primaryResourceQuantity: 3,
    craftedResource: []
  },
  { id: 11, name: "Safety Goggles", description: "Allows the wearer to resist alchemy",
    primaryResource: [
      {id: 1014, description: 'Resist Self-Inflicted Alchemy'},
      {id: 1015, description: 'Resist Alchemy'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1010, description: '1 Resist'},
      {id: 1011, description: '3 Resists'},
      {id: 1012, description: '10 Minute Immunity'},
    ],
    secondaryResourceQuantity: 3,
    craftedResource: []
  },
  { id: 12, name: "Light Armor Repair Kit", description: "Modifies the Light Armor Affinity skill",
    primaryResource: [
      {id: 1013, description: 'Increases the armor repaired to 10'},
      {id: 1014, description: 'Increases the armor repaired to to 15'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1004, description: '1 Use', uses: 1},
      {id: 1005, description: '6 Uses', uses: 6},
    ],
    secondaryResourceQuantity: 1,
  },
  { id: 13, name: "Handle Padding", description: "Reduces cost of either Shield Bash or Shield Guard skill.",
    primaryResource: [
      {id: 1005, description: 'Reduces skill cost by 1'},
      {id: 1006, description: 'Reduces skill cost by 2'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1009, description: '1 Use', uses: 1},
      {id: 1010, description: '3 Uses', uses: 3},
      {id: 1011, description: 'One Encounter'},
    ],
    secondaryResourceQuantity: 1,
  },
  { id: 14, name: "Serrated Edging", description: "Increases damage done on your next Backstab skill use.",
    primaryResource: [
      {id: 1004, description: 'Adds 10 damage to Backstab'},
      {id: 1005, description: 'Adds 20 damage to Backstab'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1010, description: '1 Use', uses: 1},
    ],
    secondaryResourceQuantity: 2,
  },
  { id: 15, name: "Rope Clip", description: "Reduces the time it takes to inflict the Captured status with Rope Use.",
    primaryResource: [
      {id: 1010, description: 'Reduces time to 30 seconds'},
      {id: 1011, description: 'Reduces time to 3 seconds'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1004, description: '1 Use', uses: 1},
      {id: 1005, description: '3 Uses', uses: 3},
      {id: 1006, description: 'Increases time required for Escapism by 120 seconds'},
    ], 
    secondaryResourceQuantity: 1,
  },
  { id: 16, name: "Pocket Knife", description: "Reduces the time it takes to use Escapism.",
    primaryResource: [
      {id: 1005, description: 'Reduces time to 3 minutes'},
      {id: 1006, description: 'Reduces time to 1 minute'},
      ],
    primaryResourceQuantity: 1,
    secondaryResource: [
      {id: 1002, description: '1 Use', uses: 1},
      {id: 1003, description: '3 Uses', uses: 3},
    ],
    secondaryResourceQuantity: 2, 
  },
  { id: 17, name: "Shoe Soles", description: "Enhances the Avoidance skill.",
    primaryResource: [
      {id: 1009, description: 'Reduces skill cost by 2'},
      {id: 1010, description: 'Reduces skill cost by 4'},
      ],
    primaryResourceQuantity: 3,
    secondaryResource: [
      {id: 1001, description: '1 Use', uses: 1},
      {id: 1002, description: '3 Uses', uses: 3},
      {id: 1003, description: '8 Uses', uses: 8},
    ], 
    secondaryResourceQuantity: 1,
  },
  { id: 18, name: "R1-Trigger", description: "Enhances the Mortal Strike skill.",
    primaryResource: [
      {id: 1004, description: 'Reduces skill cost by 1'},
      {id: 1005, description: 'Reduces skill cost by 2'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1001, description: 'No Known Modifiers'},
      {id: 1002, description: 'Increase base damage to 12'},
      {id: 1003, description: 'Increase base damage to 20'},
    ],
    secondaryResourceQuantity: 1, 
  },
  { id: 19, name: "Fine Hilt", description: "Enhances the Parry skill.",
    primaryResource: [
      {id: 1009, description: 'Reduces skill cost by 1'},
      {id: 1010, description: 'Reduces skill cost by 2'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1001, description: 'Duration: 1 Combat'},
      {id: 1002, description: 'Duration: 1 Reset'},
      {id: 1003, description: 'Duration: 1 Event'},
    ],
    secondaryResourceQuantity: 2,
  },
  { id: 20, name: "Shield Boss", description: "Enhances the Shield Bash skill.",
    primaryResource: [
      {id: 1004, description: 'Reduces skill cost by 1'},
      {id: 1005, description: 'Reduces skill cost by 2'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1001, description: 'No Known Modifieres'},
    ],
    secondaryResourceQuantity: 2, 
  },
  // { id: 21, name: "Base Doctor Bag", description: "xxx",
  //   primaryResource: [
  //     {id: 111, description: 'xxx'},
  //     ],
  //   secondaryResource: [], 
  //   craftedResource: []
  // },
  // { id: 22, name: "Advanced Doctor Bag", description: "xxx",
  //   primaryResource: [
  //     {id: 111, description: 'xxx'},
  //     ],
  //   secondaryResource: [], 
  //   craftedResource: []
  // },
  // { id: 23, name: "Surgeon's Kit", description: "xxx",
  //   primaryResource: [
  //     {id: 111, description: 'xxx'},
  //     ],
  //   secondaryResource: [], 
  //   craftedResource: []
  // },
  { id: 24, name: "Voltage Detector", description: "Used to detect electronic devices. RESTRICTED",
    primaryResource: [
      {id: 1014, description: 'On Person'},
      {id: 1015, description: 'Radius 10'},
      ],
    primaryResourceQuantity: 3,
    secondaryResource: [
      {id: 1005, description: '1 Use', uses: 1},
      {id: 1006, description: '3 Uses', uses: 3},
    ],
    secondaryResourceQuantity: 4, 
  },
  { id: 25, name: "One-Use Neon Batteries", description: "Low-powered batteries with 3 charges of the item being used. MOD",
    primaryResource: [
      {id: 1004, description: 'No Known Modifiers'},
      ],
    primaryResourceQuantity: 2,
    secondaryResource: [
      {id: 1014, description: '3 Uses', uses: 3},
    ],
    secondaryResourceQuantity: 1,
  },
];

export const gunsmithingRecipes: GunsmithingRecipe[] = [
  { id: 1, name: "Black Powder", description: "Common material used for Gunsmithing.", type: 'Powder',
    primaryResource: [
      {id: 1013},
    ],
    primaryResourceQuantity: 1,
  },
  { id: 2, name: "Guncotton", description: "Common material used for Gunsmithing.", type: 'Powder',
    primaryResource: [
      {id: 1014},
    ],
    primaryResourceQuantity: 2,
  },
  { id: 3, name: "Nitro", description: "Common material used for Gunsmithing.", type: 'Powder',
    primaryResource: [
      {id: 1015},
    ],
    primaryResourceQuantity: 3,
  },
  { id: 4, name: "Concussive Shot", description: "Short Waylay when delivered from behind", type: 'Bullet',
    secondaryResource: [
      {id: 1010},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1022, description: "Creates 1 bullet", uses: 1},
      {id: 1023, description: "Creates 3 bullet", uses: 3},
    ]
  },
  { id: 5, name: "Full Metal Jacket", description: "This bullet changes damage bullet damage from Pierce to Body: Low Cap Only", type: 'Bullet',
    secondaryResource: [
      {id: 1020},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1022, description: "Creates 1 bullet", uses: 1},
      {id: 1023, description: "Creates 3 bullet", uses: 3},
    ]
  },
  { id: 6, name: "Hollow Point", description: "This bullet calls a Short Desecrate: High Cap Only", type: 'Bullet',
    secondaryResource: [
      {id: 1019},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1022, description: "Creates 1 bullet", uses: 1},
      {id: 1023, description: "Creates 3 bullet", uses: 3},
    ]
  },
  { id: 7, name: "Loud Shot", description: "This bullet calls a Voice Range Quick Distraction", type: 'Bullet',
    secondaryResource: [
      {id: 1005},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1021, description: "Creates 1 bullet", uses: 1},
      {id: 1022, description: "Creates 3 bullet", uses: 3},
    ]
  },
  { id: 8, name: "Rending Shot", description: "This bullet calls a Short Poison", type: 'Bullet',
    secondaryResource: [
      {id: 1002},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1021, description: "Creates 1 bullet", uses: 1},
      {id: 1022, description: "Creates 3 bullet", uses: 3},
      {id: 1023, description: "Creates 6 bullet", uses: 6},
    ]
  },
  { id: 9, name: "Shatter Shot", description: "This bullet deals 25 Shatter damage", type: 'Bullet',
    secondaryResource: [
      {id: 1014},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1021, description: "Creates 1 bullet", uses: 1},
      {id: 1022, description: "Creates 3 bullet", uses: 3},
      {id: 1023, description: "Creates 6 bullet", uses: 6},
    ]
  },
  { id: 10, name: "Starshell", description: "Fires a bright, glowing flare that can be seen for miles.", type: 'Bullet',
    secondaryResource: [
      {id: 1013},
    ],
    secondaryResourceQuantity: 1,
    primaryResourceQuantity: 1,
    primaryResource: [
      {id: 1021, description: "Creates 1 bullet", uses: 1},
      {id: 1022, description: "Creates 3 bullet", uses: 3},
    ]
  },
    { id: 10, name: "Bayonet", description: "You may utilize your HC proficiences as one-handed proficiencies for one encounter. Does not stack with one-handed proficienciey: High Cap Only.", type: 'Attachment',
    primaryResource: [
      {id: 1013},
    ],
    primaryResourceQuantity: 3,
    craftedResource: [
      {id: 1001}
    ]
  },
    { id: 10, name: "Hidden Shot", description: "You may deal your gun damage as an 'Inflict' call three times per combat for one encounter: Low Cap Only.", type: 'Attachment',
    primaryResource: [
      {id: 1005},
    ],
    primaryResourceQuantity: 3,
    craftedResource: [
      {id: 1002}
    ]
  },
    { id: 10, name: "Magic Barrel", description: "Bullets now deal the 'Magic' tagline for one encounter.", type: 'Attachment',
    primaryResource: [
      {id: 1005},
    ],
    primaryResourceQuantity: 3,
    craftedResource: [
      {id: 1003}
    ]
  },
    { id: 10, name: "Neon Barrel", description: "Damage to Noct increased by 2 for one encounter.", type: 'Attachment',
    primaryResource: [
      {id: 1006},
    ],
    primaryResourceQuantity: 1,
    craftedResource: [
      {id: 1004}
    ]
  },
    { id: 10, name: "Neon Sight", description: "Reduces the skill cost of 'Aimed Shot' by 2 for one encounter.", type: 'Attachment',
    primaryResource: [
      {id: 1006},
    ],
    primaryResourceQuantity: 1,
    craftedResource: [
      {id: 1005}
    ]
  },
    { id: 10, name: "Silencer", description: "Reduces the skill cost of 'Muffled Shot' by 2 for one encounter.", type: 'Attachment',
    primaryResource: [
      {id: 1017},
    ],
    primaryResourceQuantity: 3,
    craftedResource: [
      {id: 1006}
    ]
  },
    { id: 10, name: "Sticky Handle", description: "Immune to the 'Disarm' tagline for one encounter.", type: 'Attachment',
    primaryResource: [
      {id: 1002},
    ],
    primaryResourceQuantity: 3,
    craftedResource: [
      {id: 1006}
    ]
  },
]

    

export const COURTS = [
  { id: 1, name: "Courtless" },
  { id: 2, name: "Catalytic" },
  { id: 3, name: "Feral" },
  { id: 4, name: "Radiant" },
  { id: 5, name: "Umbral" },
  { id: 6, name: "Undying" },
] as const;

export const ELEMENTALS = [
  { id: 1, name: "Air Elemental" },
  { id: 2, name: "Earth Elemental" },
  { id: 3, name: "Fire Elemental" },
  { id: 4, name: "Neon Elemental" },
  { id: 5, name: "Water Elemental" },
] as const;

export const SKILLS = [
  { id: 100, category: '1', desc: 'Xxxxxxxxxx', name: 'Blind Fighting', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 101, category: '1', desc: 'Xxxxxxxxxx', name: 'Cover Tracks', xpCost: 15, ranks: 2, skillCost: 5 }, 
  { id: 102, category: '1', desc: 'Xxxxxxxxxx', name: 'Journeymen Tracker', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 103, category: '1', desc: 'Xxxxxxxxxx', name: 'Rope Use', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 104, category: '1', desc: 'Xxxxxxxxxx', name: 'Sailing', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 105, category: '1', desc: 'Xxxxxxxxxx', name: 'Search Person', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 106, category: '1', desc: 'Xxxxxxxxxx', name: 'Spelunker', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 107, category: '1', desc: 'Xxxxxxxxxx', name: 'Survivalist', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 108, category: '2', desc: 'Xxxxxxxxxx', name: 'Avoidance', xpCost: 20, ranks: 1, skillCost: 6 }, 
  { id: 109, category: '2', desc: 'Xxxxxxxxxx', name: 'Backstab', xpCost: 5, ranks: 3, skillCost: 0 }, 
  { id: 110, category: '2', desc: 'Xxxxxxxxxx', name: 'Disable Limb', xpCost: 15, ranks: 1, skillCost: 3 }, 
  { id: 111, category: '2', desc: 'Xxxxxxxxxx', name: 'Dual Wield', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 112, category: '2', desc: 'Xxxxxxxxxx', name: 'Feat of Strength', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 113, category: '2', desc: 'Xxxxxxxxxx', name: 'Firm Grip', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 114, category: '2', desc: 'Xxxxxxxxxx', name: 'Heavy Armor Affinity', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 115, category: '2', desc: 'Xxxxxxxxxx', name: 'Lesser Stamina', xpCost: 5, ranks: 5, skillCost: 0 }, 
  { id: 116, category: '2', desc: 'Xxxxxxxxxx', name: 'Light Armor Affinity', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 117, category: '2', desc: 'Xxxxxxxxxx', name: 'Mortal Strike', xpCost: 10, ranks: 2, skillCost: 3 }, 
  { id: 118, category: '2', desc: 'Xxxxxxxxxx', name: 'One Handed Prof', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 119, category: '2', desc: 'Xxxxxxxxxx', name: 'Parry', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 120, category: '2', desc: 'Xxxxxxxxxx', name: 'Shield Bash', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 121, category: '2', desc: 'Xxxxxxxxxx', name: 'Shield Guard', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 122, category: '2', desc: 'Xxxxxxxxxx', name: 'Steady Footing', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 123, category: '2', desc: 'Xxxxxxxxxx', name: 'Sunder Armor', xpCost: 10, ranks: 1, skillCost: 5 }, 
  { id: 124, category: '2', desc: 'Xxxxxxxxxx', name: 'Two Handed Prof', xpCost: 5, ranks: 5, skillCost: 0 }, 
  { id: 125, category: '2', desc: 'Xxxxxxxxxx', name: 'Unavoidable', xpCost: 15, ranks: 1, skillCost: 2 }, 
  { id: 126, category: '3', desc: 'Xxxxxxxxxx', name: 'Aimed Shot', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 127, category: '3', desc: 'Xxxxxxxxxx', name: 'HC Gun Proficiency', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 128, category: '3', desc: 'Xxxxxxxxxx', name: 'LC Gun Proficiency', xpCost: 15, ranks: 4, skillCost: 0 }, 
  { id: 129, category: '3', desc: 'Xxxxxxxxxx', name: 'Muffled Shot', xpCost: 5, ranks: 1, skillCost: 2 }, 
  { id: 130, category: '3', desc: 'Xxxxxxxxxx', name: 'Threaten', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 131, category: '3', desc: 'Xxxxxxxxxx', name: 'Trick Shot', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 132, category: '3', desc: 'Xxxxxxxxxx', name: 'Warning Shot', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 134, category: '4', desc: 'Xxxxxxxxxx', name: 'Awaken', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 135, category: '4', desc: 'Xxxxxxxxxx', name: 'Detox', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 136, category: '4', desc: 'Xxxxxxxxxx', name: 'Diagnose', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 137, category: '4', desc: 'Xxxxxxxxxx', name: 'Ease Pain', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 138, category: '4', desc: 'Xxxxxxxxxx', name: 'Field Surgery', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 139, category: '4', desc: 'Xxxxxxxxxx', name: 'Firemans Carry', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 140, category: '4', desc: 'Xxxxxxxxxx', name: 'Mend Wound', xpCost: 10, ranks: 3, skillCost: 2 }, 
  { id: 141, category: '4', desc: 'Xxxxxxxxxx', name: 'Reset Limb', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 142, category: '4', desc: 'Xxxxxxxxxx', name: 'Treat Waylaid', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 143, category: '4', desc: 'Xxxxxxxxxx', name: 'Triage', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 144, category: '5', desc: 'Xxxxxxxxxx', name: 'Barter', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 145, category: '5', desc: 'Xxxxxxxxxx', name: 'Dauntless', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 146, category: '5', desc: 'Xxxxxxxxxx', name: 'Distraction', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 147, category: '5', desc: 'Xxxxxxxxxx', name: 'Chicanery', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 148, category: '5', desc: 'Xxxxxxxxxx', name: 'Feign Death', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 149, category: '5', desc: 'Xxxxxxxxxx', name: 'Forgery', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 150, category: '5', desc: 'Xxxxxxxxxx', name: 'Interrogation', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 151, category: '5', desc: 'Xxxxxxxxxx', name: 'Silver Tongue', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 152, category: '6', desc: 'Xxxxxxxxxx', name: 'Ambush', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 153, category: '6', desc: 'Xxxxxxxxxx', name: 'Escapism', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 154, category: '6', desc: 'Xxxxxxxxxx', name: 'Hamstring', xpCost: 5, ranks: 1, skillCost: 2 }, 
  { id: 155, category: '6', desc: 'Xxxxxxxxxx', name: 'Hide', xpCost: 15, ranks: 1, skillCost: 3 }, 
  { id: 156, category: '6', desc: 'Xxxxxxxxxx', name: 'PickLock: Journeyman', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 157, category: '6', desc: 'Xxxxxxxxxx', name: 'Smuggle', xpCost: 5, ranks: 3, skillCost: 0 }, 
  { id: 158, category: '6', desc: 'Xxxxxxxxxx', name: 'Waylay', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 159, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Arcane Knowledge', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 160, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Artificer Knowledge', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 161, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Shadow Magic Knowledge', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 162, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Wild Magic Knowledge', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 163, category: '7', desc: 'Xxxxxxxxxx', name: 'Jolt Proficiency', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 165, category: '7', desc: 'Xxxxxxxxxx', name: 'Artificer: Additional Socket', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 166, category: '7', desc: 'Xxxxxxxxxx', name: 'Artificer: Emergency Re-Fit', xpCost: 15, ranks: 2, skillCost: 0 }, 
  { id: 167, category: '7', desc: 'Xxxxxxxxxx', name: 'Artificer: Identify Gem', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 172, category: '8', desc: 'Xxxxxxxxxx', name: 'Artisan', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 173, category: '8', desc: 'Xxxxxxxxxx', name: 'Scrounger', xpCost: 10, ranks: 4, skillCost: 0 }, 
  { id: 174, category: '8', desc: 'Xxxxxxxxxx', name: 'Skinner/Tanner', xpCost: 10, ranks: 4, skillCost: 1 }, 
  { id: 175, category: '8', desc: 'Xxxxxxxxxx', name: 'Reduce, Reuse, Recycle', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 176, category: '8', desc: 'Xxxxxxxxxx', name: 'Art: Careful Reuse', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 179, category: '8', desc: 'Xxxxxxxxxx', name: 'Gunsmith', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 180, category: '8', desc: 'Xxxxxxxxxx', name: 'Casing Expert', xpCost: 15, ranks: 2, skillCost: 1 }, 
  { id: 181, category: '8', desc: 'Xxxxxxxxxx', name: 'Scrapper', xpCost: 15, ranks: 1, skillCost: 1 }, 
  { id: 183, category: '8', desc: 'Xxxxxxxxxx', name: 'Alchemy', xpCost: 10, ranks: 4, skillCost: 1 }, 
  { id: 184, category: '8', desc: 'Xxxxxxxxxx', name: 'Herbalist', xpCost: 10, ranks: 4, skillCost: 0 }, 
  { id: 185, category: '8', desc: 'Xxxxxxxxxx', name: 'Experimentalist', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 186, category: '8', desc: 'Xxxxxxxxxx', name: 'Distillation', xpCost: 5, ranks: 3, skillCost: 0 }, 
  { id: 187, category: '8', desc: 'Xxxxxxxxxx', name: 'JewelCrafting', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 219, category: '8', desc: 'Xxxxxxxxxx', name: 'Friends in the Mining Business', xpCost: 10, ranks: 4, skillCost: 0 }, 
  { id: 220, category: '8', desc: 'Xxxxxxxxxx', name: 'Enchantment!', xpCost: 15, ranks: 2, skillCost: 1 }, 
  { id: 188, category: '2', desc: 'Xxxxxxxxxx', name: 'Protector', xpCost: 10, ranks: 1, skillCost: 5 }, 
  { id: 189, category: '2', desc: 'Xxxxxxxxxx', name: 'Battle Mentor', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 190, category: '2', desc: 'Xxxxxxxxxx', name: 'Endure', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 191, category: '2', desc: 'Xxxxxxxxxx', name: 'Bolster', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 192, category: '2', desc: 'Xxxxxxxxxx', name: 'Gritted Teeth', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 193, category: '3', desc: 'Xxxxxxxxxx', name: 'Headshot', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 194, category: '3', desc: 'Xxxxxxxxxx', name: 'Trickier Shot', xpCost: 10, ranks: 1, skillCost: 5 }, 
  { id: 195, category: '3', desc: 'Xxxxxxxxxx', name: 'Hunters Mark', xpCost: 15, ranks: 1, skillCost: 3 }, 
  { id: 196, category: '3', desc: 'Xxxxxxxxxx', name: 'Take-Backsies', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 197, category: '3', desc: 'Xxxxxxxxxx', name: 'Gun Care', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 198, category: '4', desc: 'Xxxxxxxxxx', name: 'Resuscitate', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 199, category: '4', desc: 'Xxxxxxxxxx', name: 'Meat Wagon', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 200, category: '4', desc: 'Xxxxxxxxxx', name: 'Self-Surgery', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 201, category: '4', desc: 'Xxxxxxxxxx', name: 'Snap Out Of It', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 202, category: '4', desc: 'Xxxxxxxxxx', name: 'Doctors Ward', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 203, category: '6', desc: 'Xxxxxxxxxx', name: 'Sneak', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 204, category: '6', desc: 'Xxxxxxxxxx', name: 'Pick Lock: Adept', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 205, category: '6', desc: 'Xxxxxxxxxx', name: 'Light On Your Feet', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 206, category: '6', desc: 'Xxxxxxxxxx', name: 'Skin Of Your Teeth', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 207, category: '6', desc: 'Xxxxxxxxxx', name: 'Sicilian Gambit', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 208, category: '7', desc: 'Xxxxxxxxxx', name: 'Advanced Artificing', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 209, category: '7', desc: 'Xxxxxxxxxx', name: 'Acedia Specialist', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 210, category: '7', desc: 'Xxxxxxxxxx', name: 'Varitia Specialist', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 211, category: '7', desc: 'Xxxxxxxxxx', name: 'Ira Specialist', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 212, category: '7', desc: 'Xxxxxxxxxx', name: 'Gula Specialist', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 213, category: '7', desc: 'Xxxxxxxxxx', name: 'Redline', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 214, category: '7', desc: 'Xxxxxxxxxx', name: 'Scarlet Tears', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 215, category: '7', desc: 'Xxxxxxxxxx', name: 'Gluttony', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 216, category: '7', desc: 'Xxxxxxxxxx', name: 'Natures Fury', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 217, category: '7', desc: 'Xxxxxxxxxx', name: 'Natures Embrace', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 218, category: '7', desc: 'Xxxxxxxxxx', name: 'Natures Spite', xpCost: 20, ranks: 1, skillCost: 0 }, 
] as const;