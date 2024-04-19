export const levels = [
    { range: [0, 9], level: 400, icon: "1", colour: "background-color: #9ca3af" },
    { range: [10, 19], level: 600, icon: "2", colour: "background-color: #22c55e" },
    { range: [20, 29], level: 800, icon: "3", colour: "background-color: #3b82f6" },
    { range: [30, 39], level: 1000, icon: "4", colour: "background-color: #a855f7" },
    { range: [40, 49], level: 1200, icon: "5", colour: "background-color: #f59e0b" },
    { range: [50, 59], level: 1500, icon: "6", colour: "background-color: #ef4444" },
    { range: [60, 79], level: 2000, icon: "7", colour: "background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(51,205,132,1) 0%, rgba(117,244,242,1) 50%, rgba(65,223,255,1) 100%);" },
    { range: [80, 99], level: 2500, icon: "8", colour: "background: linear-gradient(90deg, rgba(226,113,203,1) 0%, rgba(244,147,223,1) 30%, rgba(187,252,251,1) 70%, rgba(137,235,255,1) 100%);" },
    { range: [100, 199], level: 3000, icon: "9", colour: "background: linear-gradient(90deg, rgba(226,113,203,1) 0%, rgba(255,157,55,1) 0%, rgba(254,221,165,1) 50%, rgba(255,127,231,1) 100%);" },
]

export function getCurrentLevel(level) {
    let totalForCurrent = 0;
    for (let tier of levels) {
        if (level > tier.range[1]) {
            totalForCurrent += (tier.level * 10);
        } else {
            for (let i = tier.range[0]; i < level; i++) {
                totalForCurrent += tier.level;
            }
        }
    }
    return totalForCurrent;
}

export function getNextLevel(level) {
    let totalForNext = 0;
    for (let tier of levels) {
        if (level > tier.range[1]) {
            totalForNext += (tier.level * 10);
        } else {
            for (let i = tier.range[0]; i <= level; i++) {
                totalForNext += tier.level;
            }
        }
    }
    return totalForNext;
}

export function calculateProgress(level, trophies) {
    return ((trophies - getCurrentLevel(level)) / (getNextLevel(level) - getCurrentLevel(level)));
}

export function getIcon(level) {
    const current = levels.find((tier) => level >= tier.range[0] && level <= tier.range[1]);
    return current.icon;
}

export function getColour(level) {
    const current = levels.find((tier) => level >= tier.range[0] && level <= tier.range[1]);
    return current.colour;
}