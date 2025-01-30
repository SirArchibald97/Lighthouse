export const levels = [
    { range: [0, 9], trophies: 500, icon: "0", colour: "background-color: #202121" },
    { range: [10, 19], trophies: 750, icon: "1", colour: "background-color: #9ca3af" },
    { range: [20, 29], trophies: 1000, icon: "2", colour: "background-color: #22c55e" },
    { range: [30, 39], trophies: 1250, icon: "3", colour: "background-color: #3b82f6" },
    { range: [40, 49], trophies: 1500, icon: "4", colour: "background-color: #a855f7" },
    { range: [50, 59], trophies: 2000, icon: "5", colour: "background-color: #f59e0b" },
    { range: [60, 69], trophies: 2500, icon: "6", colour: "background-color: #ef4444" },
    { range: [70, 79], trophies: 3000, icon: "7", colour: "background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(51,205,132,1) 0%, rgba(117,244,242,1) 50%, rgba(65,223,255,1) 100%);" },
    { range: [80, 89], trophies: 3500, icon: "8", colour: "background: linear-gradient(90deg, rgba(226,113,203,1) 0%, rgba(244,147,223,1) 30%, rgba(187,252,251,1) 70%, rgba(137,235,255,1) 100%);" },
    { range: [90, 99], trophies: 4000, icon: "9", colour: "background: linear-gradient(90deg, rgba(226,113,203,1) 0%, rgba(255,157,55,1) 0%, rgba(254,221,165,1) 50%, rgba(255,127,231,1) 100%);" },
    { range: [100, 110], trophies: 5000, icon: "10", colour: "background: linear-gradient(90deg, rgba(137,235,255,1) 100%, rgba(255,157,55,1) 0%, rgba(254,221,165,1) 50%, rgba(255,127,231,1) 100%);" },
];

export const fishingLevels = [
    { range: [0, 0], trophies: 20 },
    { range: [1, 1], trophies: 40 },
    { range: [2, 2], trophies: 60 },
    { range: [3, 3], trophies: 80 },
    { range: [4, 9], trophies: 100 },
    { range: [10, 19], trophies: 200 },
    { range: [20, 29], trophies: 300 },
    { range: [30, 39], trophies: 400 },
    { range: [40, 49], trophies: 500 },
    { range: [50, 54], trophies: 500 },
    { range: [55, 59], trophies: 600 },
    { range: [60, 69], trophies: 600 },
    { range: [70, 79], trophies: 700 },
    { range: [80, 84], trophies: 700 },
    { range: [85, 89], trophies: 800 },
    { range: [90, 94], trophies: 800 },
    { range: [95, 99], trophies: 1000 },
    { range: [100, 1000], trophies: 10000 },
];

export function trophiesToNextEvolution(player) {
    const currentTotalTrophies = player.trophies.total;
    let runningTotalForNextEvolution = 0;
    for (let level = 0; level < player.crownLevel.levelData.nextEvolutionLevel; level++) {
        runningTotalForNextEvolution += levels.find(l => level >= l.range[0] && level <= l.range[1]).trophies;
    }
    return runningTotalForNextEvolution - currentTotalTrophies;
}

export function trophiesToNextFishingEvolution(player) {
    const currentTotalTrophies = player.trophies.angler.total;
    let runningTotalForNextEvolution = 0;
    for (let level = 0; level < player.crownLevel.fishingLevelData.nextEvolutionLevel; level++) {
        runningTotalForNextEvolution += fishingLevels.find(l => level >= l.range[0] && level <= l.range[1]).trophies;
    }
    return runningTotalForNextEvolution - currentTotalTrophies;
}

export function getIcon(level) {
    const current = levels.find((tier) => level >= tier.range[0] && level <= tier.range[1]) || levels[0];
    return current.icon;
}

export function getColour(level) {
    const current = levels.find((tier) => level >= tier.range[0] && level <= tier.range[1]) || levels[0];
    return current.colour;
}