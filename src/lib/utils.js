export async function formatUUID(uuid) {
    return uuid.substr(0,8) + "-" + uuid.substr(8,4) + "-" + uuid.substr(12,4) + "-" + uuid.substr(16,4) + "-" + uuid.substr(20);
}

export function getRankIcon(ranks) {
    const rankIcons = {
        "NOXCREW": "noxcrew.png",
        "MODERATOR": "moderator.png",
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