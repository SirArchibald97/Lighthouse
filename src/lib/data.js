export const badges = {
    battle_box: [
        { name: "Ace in the Box", description: "Eliminate all 4 members of the opposing team", icon: "ace_in_the_box", stat: "battle_box_quads_ace" },
        { name: "Ace From Afar", description: "Eliminate all 4 members of the opposing team using ranged weapons", icon: "ace_from_afar", stat: "battle_box_quads_ace_from_afar" },
        { name: "Aerial Assault", description: "Eliminate a player using a ranged weapon whilst levitating", icon: "aerial_assault", stat: "battle_box_quads_aerial_assault" },
        { name: "Blind Brawl", description: "Eliminate a player whilst blind", icon: "blind_brawl", stat: "battle_box_quads_blind_brawl" },
        { name: "Demolitions Expert", description: "Elimiate 3 enemies with explosives in a single round", icon: "demolitions_expert", stat: "battle_box_quads_demolitions_expert" },
        { name: "Flawless Battle", description: "Place 1st as a team without any member of your team dying", icon: "flawless_battle", stat: "battle_box_quads_flawless_battle" },
        { name: "Savior Ace", description: "Eliminate all 4 enemies as the last player standing", icon: "savior_ace", stat: "battle_box_quads_leave_it_to_me" },
        { name: "Stealthy Takedown", description: "Eliminate an enemy whilst invisible", icon: "stealthy_takedown", stat: "battle_box_quads_stealthy_takedown" },
        { name: "Ultimate Ace", description: "Eliminate all 12 enemies in a game", icon: "ultimate_ace", stat: "battle_box_quads_ultimate_ace" },
        { name: "Untouchable Assassin", description: "Place 1st as a team whilst taking no damage and getting at least 4 eliminations", icon: "untouchable_assassin", stat: "battle_box_quads_untouchable_assassin" },
    ],
    sky_battle: [
        { name: "Creeper Coffin", description: "Get an elimination using a Creeper you spawned", icon: "creeper_coffin", stat: "sky_battle_quads_creeper_coffin" },
        { name: "Fallen Warrior", description: "Die after getting 8 eliminations in a single game", icon: "fallen_warrior", stat: "sky_battle_quads_fallen_warrior" },
        { name: "Personal Feast", description: "Eat 12 or more pieces of steak in a single game", icon: "personal_feast", stat: "sky_battle_quads_personal_feast" },
        { name: "Sky Lord", description: "Get at least 10 eliminations in a single game", icon: "sky_lord", stat: "sky_battle_quads_sky_lord" },
        { name: "Sky Sniper", description: "Get an elimination with a ranged weapon from over 50 blocks away", icon: "sky_sniper", stat: "sky_battle_quads_sky_sniper" },
        { name: "Team Crusher", description: "Eliminate all 4 members of an enemy team", icon: "team_crusher", stat: "sky_battle_quads_team_crusher" },
        { name: "Untouchable Champion", description: "Reach a survival placement of 1st without taking damage", icon: "untouchable_champion", stat: "sky_battle_quads_untouchable_champion" },
        { name: "Wings to Fly", description: "Don't touch the ground for 30s after using a levitation spark", icon: "wings_to_fly", stat: "sky_battle_quads_wings_to_fly" },
    ]
}

export function calculateBadgeCompletion(player, badges) {
    let completed = 0;
    for (let badge of badges) {
        if (player.statistics[badge.stat].value > 0) completed++;
    }
    return Math.round((completed / badges.length) * 100);
}