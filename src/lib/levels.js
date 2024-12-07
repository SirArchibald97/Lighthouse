export const levels = [
    { range: [0, 9], icon: "0", colour: "background-color: #202121" },
    { range: [10, 19], icon: "1", colour: "background-color: #9ca3af" },
    { range: [20, 29], icon: "2", colour: "background-color: #22c55e" },
    { range: [30, 39], icon: "3", colour: "background-color: #3b82f6" },
    { range: [40, 49], icon: "4", colour: "background-color: #a855f7" },
    { range: [50, 59], icon: "5", colour: "background-color: #f59e0b" },
    { range: [60, 69], icon: "6", colour: "background-color: #ef4444" },
    { range: [70, 79], icon: "7", colour: "background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(51,205,132,1) 0%, rgba(117,244,242,1) 50%, rgba(65,223,255,1) 100%);" },
    { range: [80, 89], icon: "8", colour: "background: linear-gradient(90deg, rgba(226,113,203,1) 0%, rgba(244,147,223,1) 30%, rgba(187,252,251,1) 70%, rgba(137,235,255,1) 100%);" },
    { range: [90, 99], icon: "9", colour: "background: linear-gradient(90deg, rgba(226,113,203,1) 0%, rgba(255,157,55,1) 0%, rgba(254,221,165,1) 50%, rgba(255,127,231,1) 100%);" },
    { range: [100, 110], icon: "10", colour: "background: linear-gradient(90deg, rgba(137,235,255,1) 100%, rgba(255,157,55,1) 0%, rgba(254,221,165,1) 50%, rgba(255,127,231,1) 100%);" },
];

export function calculateNextEvolution(player) {
    const trophiesObtained = ((10 - (player.trophies.nextEvolutionLevel - player.trophies.level)) * player.trophies.nextLevel.obtainable) + player.trophies.nextLevel.obtained;
    return (player.trophies.nextEvolutionLevel - player.trophies.level) * player.trophies.nextLevel.obtainable - trophiesObtained;
}

export function getIcon(level) {
    const current = levels.find((tier) => level >= tier.range[0] && level <= tier.range[1]) || levels[0];
    return current.icon;
}

export function getColour(level) {
    const current = levels.find((tier) => level >= tier.range[0] && level <= tier.range[1]) || levels[0];
    return current.colour;
}