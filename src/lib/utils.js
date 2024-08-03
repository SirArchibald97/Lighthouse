export async function formatUUID(uuid) {
    return uuid.substr(0,8) + "-" + uuid.substr(8,4) + "-" + uuid.substr(12,4) + "-" + uuid.substr(16,4) + "-" + uuid.substr(20);
}

export function calculatePercentage(value, total) {
    return ((value / total) * 100) < 1 && ((value / total) * 100) > 0 ? "<1" : Math.round((value / total) * 100);
}

export function getRankIcon(ranks) {
    const rankIcons = {
        "NOXCREW": "noxcrew.png",
        "MODERATOR": "moderator.png",
        "CONTESTANT": "contestant.png",
        "CREATOR": "creator.png",
        "GRAND_CHAMP_ROYALE": "grand_champ_royale.png",
        "GRAND_CHAMP": "grand_champ.png",
        "CHAMP": "champ.png"
    };

    for (let rank in rankIcons) {
        if (ranks.includes(rank)) {
            return rankIcons[rank];
        }
    }
    return "default.png";
}

export function getRankName(ranks) {
    const rankNames = { "NOXCREW": "Noxcrew", "MODERATOR": "Moderator", "CONTESTANT": "Contestant", "CREATOR": "Creator", "GRAND_CHAMP_ROYALE": "Grand Champ Royale", "GRAND_CHAMP": "Grand Champ", "CHAMP": "Champ" };
    for (let rank in rankNames) {
        if (ranks?.includes(rank)) {
            return rankNames[rank];
        }
    }
    return "Default";
}

export function getStatusGame(game) {
    const games = {
        "SKY_BATTLE": "Sky Battle",
        "BATTLE_BOX": "Battle Box",
        "TGTTOS": "TGTTOS",
        "HOLE_IN_THE_WALL": "Hole in the Wall",
        "PARKOUR_WARRIOR": "PKW Dojo",
        "PARKOUR_WARRIOR_SURVIVOR": "PKW Survivor",
        "DYNABALL": "Dynaball",
        "ROCKET_SPLEEF": "Rocket Spleef Rush",
    };
    return games[game];
}

export function getStatusIcon(game) {
    const games = {
        "SKY_BATTLE": "sky_battle",
        "BATTLE_BOX": "battle_box",
        "TGTTOS": "tgttos",
        "HOLE_IN_THE_WALL": "hitw",
        "PARKOUR_WARRIOR": "parkour_warrior",
        "DYNABALL": "dynaball",
        "ROCKET_SPLEEF": "rocket_spleef",
    };
    return games[game];
}