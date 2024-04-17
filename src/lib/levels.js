export const levels = [
    { range: [0, 10], level: 400, icon: "", colour: "#ef4444" },
    { range: [11, 20], level: 600, icon: "", colour: "#22c55e" },
    { range: [21, 30], level: 800, icon: "", colour: "#3b82f6" },
    { range: [31, 40], level: 1000, icon: "", colour: "#a855f7" },
    { range: [41, 50], level: 1200, icon: "", colour: "#f59e0b" },
    { range: [51, 60], level: 1400, icon: "", colour: "#f59e0b" },
    { range: [61, 80], level: 1600, icon: "", colour: "#f59e0b" },
    { range: [81, 100], level: 1800, icon: "", colour: "#f59e0b" },
]

export function calculateProgress(level) {
    const currentLevel = levels.find(l => level >= l.range[0] && level <= l.range[1]);
    const nextLevel = levels.indexOf(currentLevel) === levels.length - 1 ? currentLevel : levels[levels.indexOf(currentLevel) + 1];
    const progress = (level - currentLevel.range[0]) / (nextLevel.range[1] - currentLevel.range[0]);
    return progress;
}

export function getNextLevel(level, trophies) {
    let totalForNext = 0;
    for (let tier of levels) {
        if (level > tier.range[1]) {
            totalForNext += (tier.level * 10);
        } else {
            for (let i = tier.range[0]; i <= level + 1; i++) {
                totalForNext += tier.level;
            }
        }
    }
    return totalForNext;
}