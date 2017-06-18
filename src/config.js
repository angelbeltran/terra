/* game constants and configurations */
export const MAX_VILLAGES = 8
export const MAX_TRADE_POSTS = 4
export const MAX_TEMPLES = 3
export const MAX_STRONGHOLDS = 1
export const MAX_SANCTUARIES = 1
export const races = [
  'chaos_magicians',
  'giants',
  'nomads',
  'fakirs',
  'auren',
  'witches',
  'mermaids',
  'swarmlings',
  'halflings',
  'cultists',
  'engineers',
  'dwarfs',
  'alchemists',
  'darklings',
]
export const raceColors = {
  chaos_magicians: 'red',
  giants: 'red',
  nomads: 'yellow',
  fakirs: 'yellow',
  auren: 'green',
  witches: 'green',
  mermaids: 'blue',
  swarmlings: 'blue',
  halflings: 'brown',
  cultists: 'brown',
  engineers: 'gray',
  dwarfs: 'gray',
  alchemists: 'black',
  darklings: 'black',
}

export const startingValues = {
  chaos_magicians: {
    workers: 4,
    gold: 15,
    cultTrack: {
      red: 2,
      blue: 0,
      brown: 0,
      gray: 0,
    },
    power: [5, 7, 0],
  },
  giants: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 1,
      blue: 0,
      brown: 0,
      gray: 1,
    },
    power: [5, 7, 0],
  },
  nomads: {
    workers: 2,
    gold: 15,
    cultTrack: {
      red: 1,
      blue: 0,
      brown: 1,
      gray: 0,
    },
    power: [5, 7, 0],
  },
  fakirs: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 1,
      blue: 0,
      brown: 0,
      gray: 1,
    },
    power: [7, 5, 0],
  },
  auren: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 0,
      blue: 1,
      brown: 0,
      gray: 1,
    },
    power: [5, 7, 0],
  },
  witches: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 0,
      blue: 0,
      brown: 0,
      gray: 2,
    },
    power: [5, 7, 0],
  },
  mermaids: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 0,
      blue: 2,
      brown: 0,
      gray: 0,
    },
    power: [3, 9, 0],
  },
  swarmlings: {
    workers: 8,
    gold: 20,
    cultTrack: {
      red: 1,
      blue: 1,
      brown: 1,
      gray: 1,
    },
    power: [3, 9, 0],
  },
  halflings: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 0,
      blue: 0,
      brown: 1,
      gray: 1,
    },
    power: [9, 3, 0],
  },
  cultists: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 1,
      blue: 0,
      brown: 1,
      gray: 0,
    },
    power: [7, 5, 0],
  },
  engineers: {
    workers: 2,
    gold: 10,
    cultTrack: {
      red: 0,
      blue: 0,
      brown: 0,
      gray: 0,
    },
    power: [9, 3, 0],
  },
  dwarfs: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 0,
      blue: 0,
      brown: 2,
      gray: 0,
    },
    power: [7, 5, 0],
  },
  alchemists: {
    workers: 3,
    gold: 15,
    cultTrack: {
      red: 1,
      blue: 1,
      brown: 0,
      gray: 0,
    },
    power: [7, 5, 0],
  },
  darklings: {
    workers: 1,
    gold: 15,
    priests: 1,
    cultTrack: {
      red: 0,
      blue: 1,
      brown: 1,
      gray: 0,
    },
    power: [7, 5, 0],
  },
}
