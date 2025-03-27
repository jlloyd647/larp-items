import type { Item, ArtisanRecipe } from "../types";

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
  { id: 1019, name: "Noct Fang", type: "Monster" },
  { id: 1020, name: "Black Powder", type: "Alchemy" },
  { id: 1020, name: "Guncotton", type: "Alchemy" },
  { id: 1020, name: "Nitro", type: "Alchemy" },

];

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

export const COURTS = [
  { id: 1, name: "Courtless" },
  { id: 2, name: "Catalytic" },
  { id: 3, name: "Feral" },
  { id: 4, name: "Radiant" },
  { id: 5, name: "Umbral" },
  { id: 6, name: "Undying" },
] as const;

export const ELEMENTALS = [
  { id: 1, name: "Air" },
  { id: 2, name: "Earth" },
  { id: 3, name: "Fire" },
  { id: 4, name: "Neon" },
  { id: 5, name: "Water" },
] as const;