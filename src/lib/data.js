export const badges = {
    battle_box: [
        { name: "Ace in the Box", description: "Eliminate all 4 members of the opposing team", icon: "ace_in_the_box", stat: "ace" },
        { name: "Ace From Afar", description: "Eliminate all 4 members of the opposing team using ranged weapons", icon: "ace_from_afar", stat: "ace_from_afar" },
        { name: "Aerial Assault", description: "Eliminate a player using a ranged weapon whilst levitating", icon: "aerial_assault", stat: "aerial_assault" },
        { name: "Blind Brawl", description: "Eliminate a player whilst blind", icon: "blind_brawl", stat: "blind_brawl" },
        { name: "Demolitions Expert", description: "Eliminate 3 enemies with explosives in a single round", icon: "demolitions_expert", stat: "demolitions_expert" },
        { name: "Flawless Battle", description: "Place 1st as a team without any member of your team dying", icon: "flawless_battle", stat: "flawless_battle" },
        { name: "Savior Ace", description: "Eliminate all 4 enemies as the last player standing", icon: "savior_ace", stat: "leave_it_to_me" },
        { name: "Stealthy Takedown", description: "Eliminate an enemy whilst invisible", icon: "stealthy_takedown", stat: "stealthy_takedown" },
        { name: "Ultimate Ace", description: "Eliminate all 12 enemies in a game", icon: "ultimate_ace", stat: "ultimate_ace" },
        { name: "Untouchable Assassin", description: "Place 1st as a team whilst taking no damage and getting at least 4 eliminations", icon: "untouchable_assassin", stat: "untouchable_assassin" },
    ],
    battle_box_tiered: [
        { name: "Battle Box Player", description: "Play all 3 rounds of games of Battle Box", icon: "battle_box_player", stat: "games_played", tiers: [
            { name: "I", amount: 15 }, { name: "II", amount: 50 }, { name: "III", amount: 125 }, { name: "IV", amount: 250 },
            { name: "V", amount: 475 }, { name: "VI", amount: 800 }, { name: "VII", amount: 1300 },
        ]},
        { name: "Battle Box Warrior", description: "Eliminate players in Battle Box", icon: "battle_box_warrior", stat: "kills", tiers: [
            { name: "I", amount: 25 }, { name: "II", amount: 75 }, { name: "III", amount: 175 }, { name: "IV", amount: 400 },
            { name: "V", amount: 700 }, { name: "VI", amount: 1200 }, { name: "VII", amount: 2000 },    
        ]},
        { name: "Battle Box Champion", description: "Finish games of Battle Box with your team in 1st place", icon: "battle_box_champion", stat: "team_first_place", tiers: [
            { name: "I", amount: 5 }, { name: "II", amount: 15 }, { name: "III", amount: 35 }, { name: "IV", amount: 75 },
            { name: "V", amount: 155 }, { name: "VI", amount: 250 }, { name: "VII", amount: 400 },    
        ]},
        { name: "Battle Box Expert", description: "Win rounds of Battle Box", icon: "battle_box_expert", stat: "rounds_won", tiers: [
            { name: "I", amount: 25 }, { name: "II", amount: 75 }, { name: "III", amount: 175 }, { name: "IV", amount: 375 },
            { name: "V", amount: 600 }, { name: "VI", amount: 1200 }, { name: "VII", amount: 2000 },    
        ]}
    ],
    sky_battle: [
        { name: "Creeper Coffin", description: "Get an elimination using a Creeper you spawned", icon: "creeper_coffin", stat: "creeper_coffin" },
        { name: "Fallen Warrior", description: "Die after getting 8 eliminations in a single game", icon: "fallen_warrior", stat: "fallen_warrior" },
        { name: "Personal Feast", description: "Eat 12 or more pieces of steak in a single game", icon: "personal_feast", stat: "personal_feast" },
        { name: "Sky Lord", description: "Get at least 10 eliminations in a single game", icon: "sky_lord", stat: "sky_lord" },
        { name: "Sky Sniper", description: "Get an elimination with a ranged weapon from over 50 blocks away", icon: "sky_sniper", stat: "sky_sniper" },
        { name: "Team Crusher", description: "Eliminate all 4 members of an enemy team", icon: "team_crusher", stat: "team_crusher" },
        { name: "Untouchable Champion", description: "Reach a survival placement of 1st without taking damage", icon: "untouchable_champion", stat: "untouchable_champion" },
        { name: "Wings to Fly", description: "Don't touch the ground for 30s after using a levitation spark", icon: "wings_to_fly", stat: "wings_to_fly" },
    ],
    sky_battle_tiered: [
        { name: "Sky Battle Player", description: "Survive for at least 60s in games of Sky Battle", icon: "sky_battle_player", stat: "survived_minute", tiers: [
            { name: "I", amount: 30 }, { name: "II", amount: 90 }, { name: "III", amount: 200 }, { name: "IV", amount: 450 },
            { name: "V", amount: 800 }, { name: "VI", amount: 1400 }, { name: "VII", amount: 2300 },
        ]},
        { name: "Sky Battle Warrior", description: "Eliminate players in games of Sky Battle", icon: "sky_battle_warrior", stat: "kills", tiers: [
            { name: "I", amount: 25 }, { name: "II", amount: 75 }, { name: "III", amount: 150 }, { name: "IV", amount: 350 },
            { name: "V", amount: 600 }, { name: "VI", amount: 1000 }, { name: "VII", amount: 1700 },    
        ]},
        { name: "Sky Battle Champion", description: "Reach survival placement of 1st in games of Sky Battle", icon: "sky_battle_champion", stat: "solo_first_place", tiers: [
            { name: "I", amount: 2 }, { name: "II", amount: 5 }, { name: "III", amount: 15 }, { name: "IV", amount: 25 },
            { name: "V", amount: 50 }, { name: "VI", amount: 100 }, { name: "VII", amount: 150 },    
        ]},
        { name: "Sky Battle Expert", description: "Reach survival placement of 8 or better in games of Sky Battle", icon: "sky_battle_expert", stat: "solo_top_eight", tiers: [
            { name: "I", amount: 20 }, { name: "II", amount: 65 }, { name: "III", amount: 150 }, { name: "IV", amount: 325 },
            { name: "V", amount: 575 }, { name: "VI", amount: 1000 }, { name: "VII", amount: 1600 },
        ]}
    ],
    tgttos: [
        { name: "Got the Worm", description: "Place 1st with the Early Birds modifier active", icon: "got_the_worm", stat: "got_the_worm" },
        { name: "Jackpot", description: "Place 7th in every round of a TGTTOS game", icon: "jackpot", stat: "jackpot" },
        { name: "Pave the Way", description: "Place 1st without placing blocks on a map where you can place blocks", icon: "pave_the_way", stat: "pave_the_way" },
        { name: "Slapdown", description: "Punch a chicken with a slapstick", icon: "slapdown", stat: "slapdown" },
        { name: "Triple Champion", description: "Place 1st in every round of TGTTOS game", icon: "triple_champion", stat: "triple_champion" },
        { name: "Ultimate Comeback", description: "Place 1st after getting knocked into the void", icon: "ultimate_comeback", stat: "ultimate_comeback" },
        { name: "Untouchable Speedster", description: "Place 1st without being hit with the Double Time modifier is active", icon: "untouchable_speedster", stat: "untouchable_speedster" },
        { name: "Victorious Pacifist", description: "Place 1st without punching anyone", icon: "victorious_pacifist", stat: "victorious_pacifist" },
    ],
    tgttos_tiered: [
        { name: "Chicken Puncher", description: "Punch chickens in games of TGTTOS", icon: "chicken_puncher", stat: "chickens_punched", tiers: [
            { name: "I", amount: 50 }, { name: "II", amount: 150 }, { name: "III", amount: 320 }, { name: "IV", amount: 700 },
            { name: "V", amount: 1300 }, { name: "VI", amount: 2250 }, { name: "VII", amount: 3750 },
        ]},
        { name: "Round Champion", description: "Finish rounds of TGTTOS in 1st place", icon: "tgttos_round_champion", stat: "round_first_place", tiers: [
            { name: "I", amount: 2 }, { name: "II", amount: 7 }, { name: "III", amount: 15 }, { name: "IV", amount: 35 },
            { name: "V", amount: 60 }, { name: "VI", amount: 110 }, { name: "VII", amount: 180 },    
        ]},
        { name: "Round Expert", description: "Finish rounds of TGTTOS in 5th place or better", icon: "tgttos_round_expert", stat: "round_top_five", tiers: [
            { name: "I", amount: 15 }, { name: "II", amount: 50 }, { name: "III", amount: 110 }, { name: "IV", amount: 250 },
            { name: "V", amount: 425 }, { name: "VI", amount: 750 }, { name: "VII", amount: 1250 },    
        ]},
        { name: "TGTTOS Champion", description: "Finish games of TGTTOS in 1st place", icon: "tgttos_champion", stat: "first_place", tiers: [
            { name: "I", amount: 1 }, { name: "II", amount: 2 }, { name: "III", amount: 5 }, { name: "IV", amount: 10 },
            { name: "V", amount: 20 }, { name: "VI", amount: 40 }, { name: "VII", amount: 60 },    
        ]},
        { name: "TGTTOS Expert", description: "Finish games of TGTTOS in 5th place or better", icon: "tgttos_expert", stat: "top_five", tiers: [
            { name: "I", amount: 5 }, { name: "II", amount: 15 }, { name: "III", amount: 35 }, { name: "IV", amount: 75 },
            { name: "V", amount: 125 }, { name: "VI", amount: 225 }, { name: "VII", amount: 375 },    
        ]}
    ],
    hitw: [
        { name: "Blaze of Glory", description: "Finish 3rd or higher in a game where you punched a blaze", icon: "blaze_of_glory", stat: "blaze_of_glory" },
        { name: "Bullet Time", description: "Survive being hit by the matrix trap", icon: "bullet_time", stat: "bullet_time" },
        { name: "Something in the Waves", description: "Catch a fish during a game of HITW", icon: "something_in_the_waves", stat: "fish_catcher" },
        { name: "Barely Broiled", description: "Survive being launched by a hot potato", icon: "barely_broiled", stat: "hot_potato_survivor" },
        { name: "Monster Catch", description: "Hook a guardian with a fishing rod", icon: "monster_catch", stat: "monster_catcher" },
        { name: "Slimey Rivalry", description: "Survival all 4 minutes of a game of HITW", icon: "slimey_rivalry", stat: "slimey_rivalry" },
    ],
    hitw_tiered: [
        { name: "HITW Champion", description: "Finish games of HITW in 1st place or survive till the end", icon: "hitw_champion", stat: "first_place", tiers: [
            { name: "I", amount: 2 }, { name: "II", amount: 5 }, { name: "III", amount: 10 }, { name: "IV", amount: 25 },
            { name: "V", amount: 40 }, { name: "VI", amount: 70 }, { name: "VII", amount: 125 },
        ]},
        { name: "HITW Expert", description: "Finish games of HITW in 5th place or better", icon: "hitw_expert", stat: "top_five", tiers: [
            { name: "I", amount: 10 }, { name: "II", amount: 25 }, { name: "III", amount: 75 }, { name: "IV", amount: 125 },
            { name: "V", amount: 250 }, { name: "VI", amount: 425 }, { name: "VII", amount: 700 },
        ]},
        { name: "Bring on the Wall", description: "Dodge walls in games of HITW", icon: "bring_on_the_wall", stat: "walls_dodged", tiers: [
            { name: "I", amount: 350 }, { name: "II", amount: 1100 }, { name: "III", amount: 2500 }, { name: "IV", amount: 5500 },
            { name: "V", amount: 10000 }, { name: "VI", amount: 15000 }, { name: "VII", amount: 30000 },
        ]},
    ],
    dynaball: [
        { name: "Airstrike Assassin", description: "Eliminate 2 players within 15 seconds of using an airstrike", icon: "airstrike_assassin", stat: "airstrike_eliminate_2" },
        { name: "Dynaballin", description: "Eliminate 3 players within 10 seconds", icon: "dynaballin", stat: "fast_triple_kill" },
        { name: "Dynamite Dreadlord", description: "Eliminate 5 players within a single game", icon: "dynaballin", stat: "eliminate_5" },
        { name: "Final Survivor", description: "Win a game whilst being the only remaining player of your team", icon: "final_survivor", stat: "only_survivor" },
        { name: "Massive Repairs", description: "Place 200 repair blocks in a single game", icon: "massive_repairs", stat: "repair_200" },
        { name: "Tactical Powder", description: "Turn an enemy crate into powder with a powder bomb", icon: "tactical_powder", stat: "powder_bomb_crate" },
        { name: "Ultimate Baller", description: "Win a game as the only remaining player against at least 3 enemies", icon: "ultimate_baller", stat: "only_survivor_against_3" },
    ],
    dynaball_tiered: [
        { name: "Dynaball Champion", description: "Win games of Dynaball while surviving till the end", icon: "dynaball_champion", stat: "wins", tiers: [
            { name: "I", amount: 3 }, { name: "II", amount: 7 }, { name: "III", amount: 15 }, { name: "IV", amount: 30 },
            { name: "V", amount: 60 }, { name: "VI", amount: 100 }, { name: "VII", amount: 175 },
        ]},
        { name: "Dynaball Demolitionist", description: "Destroy blocks in games of Dynaball", icon: "dynaball_demolitionist", stat: "blocks_destroyed", tiers: [
            { name: "I", amount: 2000 }, { name: "II", amount: 6000 }, { name: "III", amount: 15000 }, { name: "IV", amount: 30000 },
            { name: "V", amount: 60000 }, { name: "VI", amount: 100000 }, { name: "VII", amount: 150000 },
        ]},
        { name: "Dynaball Sniper", description: "Eliminate players in games of Dynaball", icon: "dynaball_sniper", stat: "kills", tiers: [
            { name: "I", amount: 10 }, { name: "II", amount: 30 }, { name: "III", amount: 75 }, { name: "IV", amount: 150 },
            { name: "V", amount: 275 }, { name: "VI", amount: 450 }, { name: "VII", amount: 800 },    
        ]},
        { name: "Dynaball Engineer", description: "Place repair blocks in games of Dynaball", icon: "dynaball_engineer", stat: "blocks_placed", tiers: [
            { name: "I", amount: 1000 }, { name: "II", amount: 3000 }, { name: "III", amount: 7000}, { name: "IV", amount: 15000 },
            { name: "V", amount: 25000 }, { name: "VI", amount: 45000 }, { name: "VII", amount: 80000 },
        ]},
        { name: "Spawner Smasher", description: "Destroy spawners in games of Dynaball", icon: "dynaball_spawner_smasher", stat: "spawners_destroyed", tiers: [
            { name: "I", amount: 10 }, { name: "II", amount: 30 }, { name: "III", amount: 75 }, { name: "IV", amount: 150 },
            { name: "V", amount: 275 }, { name: "VI", amount: 450 }, { name: "VII", amount: 800 },    
        ]},
        { name: "Dynaball Survivor", description: "Survive for at least 2 minutes in games of Dynaball", icon: "dynaball_survivor", stat: "survive_2m", tiers: [
            { name: "I", amount: 15 }, { name: "II", amount: 50 }, { name: "III", amount: 100 }, { name: "IV", amount: 200 },
            { name: "V", amount: 375 }, { name: "VI", amount: 600 }, { name: "VII", amount: 1100 },    
        ]}
    ],
    dojo_tiered: [
        { name: "Standard Completionist", description: "Perform a Standard completion on all courses of a PKW Dojo rotation", icon: "pkw_standard_completionist", stat: "unique_rot_standard", tiers: [
            { name: "I", amount: 1 }, { name: "II", amount: 2 }, { name: "III", amount: 3 }, { name: "IV", amount: 5 },
            { name: "V", amount: 7 }, { name: "VI", amount: 10 }, { name: "VII", amount: 15 },
        ]},
        { name: "Advanced Completionist", description: "Perform an Advanced completion on all courses of a PKW Dojo rotation", icon: "pkw_advanced_completionist", stat: "unique_rot_advanced", tiers: [
            { name: "I", amount: 1 }, { name: "II", amount: 2 }, { name: "III", amount: 3 }, { name: "IV", amount: 5 },
            { name: "V", amount: 7 }, { name: "VI", amount: 10 }, { name: "VII", amount: 15 },
        ]},
        { name: "Expert Completionist", description: "Perform an Expert completion on all courses of a PKW Dojo rotation", icon: "pkw_expert_completionist", stat: "unique_rot_expert", tiers: [
            { name: "I", amount: 1 }, { name: "II", amount: 2 }, { name: "III", amount: 3 }, { name: "IV", amount: 5 },
            { name: "V", amount: 7 }, { name: "VI", amount: 10 }, { name: "VII", amount: 15 },
        ]},
        { name: "Standard Leaper", description: "Perform Standard completions on unique PKW Dojo courses", icon: "pkw_standard_leaper", stat: "unique_standard", tiers: [
            { name: "I", amount: 7 }, { name: "II", amount: 15 }, { name: "III", amount: 25 }, { name: "IV", amount: 45 },
            { name: "V", amount: 75 }, { name: "VI", amount: 125 }, { name: "VII", amount: 200 },
        ]},
        { name: "Advanced Leaper", description: "Perform Advanced completions on unique PKW Dojo courses", icon: "pkw_advanced_leaper", stat: "unique_advanced", tiers: [
            { name: "I", amount: 7 }, { name: "II", amount: 15 }, { name: "III", amount: 25 }, { name: "IV", amount: 45 },
            { name: "V", amount: 75 }, { name: "VI", amount: 125 }, { name: "VII", amount: 200 },
        ]},
        { name: "Expert Leaper", description: "Perform Expert completions on unique PKW Dojo courses", icon: "pkw_expert_leaper", stat: "unique_expert", tiers: [
            { name: "I", amount: 7 }, { name: "II", amount: 15 }, { name: "III", amount: 25 }, { name: "IV", amount: 45 },
            { name: "V", amount: 75 }, { name: "VI", amount: 125 }, { name: "VII", amount: 200 },
        ]},
    ],
    survivor_tiered: [
        { name: "PKW Champion", description: "Win the final duel in games of Parkour Warrior Survivor", icon: "parkour_warrior_champion", stat: "wins", tiers: [
            { name: "I", amount: 1 }, { name: "II", amount: 3 }, { name: "III", amount: 5 }, { name: "IV", amount: 15 },
            { name: "V", amount: 25 }, { name: "VI", amount: 45 }, { name: "VII", amount: 75 },
        ]},
        { name: "PKW Finalist", description: "Complete Leap 6 in games of Parkour Warrior Survivor", icon: "parkour_warrior_finalist", stat: "leap_6", tiers: [
            { name: "I", amount: 10 }, { name: "II", amount: 25 }, { name: "III", amount: 60 }, { name: "IV", amount: 120 },
            { name: "V", amount: 225 }, { name: "VI", amount: 375 }, { name: "VII", amount: 625 },
        ]},
        { name: "PKW Assassin", description: "Eliminate players in games of Parkour Warrior Survivor", icon: "parkour_warrior_finalist", stat: "kills", tiers: [
            { name: "I", amount: 100 }, { name: "II", amount: 350 }, { name: "III", amount: 800 }, { name: "IV", amount: 1750 },
            { name: "V", amount: 3000 }, { name: "VI", amount: 5000 }, { name: "VII", amount: 8000 },
        ]},
    ]
}

export function calculateBadgeCompletion(player, gamemode, badges, tiered_badges) {
    let completed = 0;
    for (let badge of badges) {
        if (["sky_battle", "pkw"].includes(gamemode.split(".")[0])) {
            if (player.statistics[gamemode.split(".")[0]][gamemode.split(".")[1]].badges[badge.stat] > 0) completed++;
        } else {
            if (player.statistics[gamemode].badges[badge.stat] > 0) completed++;
        }
    }
    for (let badge of tiered_badges) {
        if (["sky_battle", "pkw"].includes(gamemode.split(".")[0])) {
            if (player.statistics[gamemode.split(".")[0]][gamemode.split(".")[1]][badge.stat] >= badge.tiers[badge.tiers.length - 1].amount) completed++;
        } else {
            if (player.statistics[gamemode][badge.stat] >= badge.tiers[badge.tiers.length - 1].amount) completed++;
        }
    }
    return Math.round((completed / (badges.length + tiered_badges.length)) * 100);
}

export function calculateBadgeTier(stat, tiers) {
    let playerTier = { name: "", amount: 0 };
    let nextTier = tiers[0];
    for (let tier of tiers) {
        if (stat >= tier.amount) {
            playerTier = tier;
            nextTier = tiers[tiers.indexOf(tier) + 1] || tiers[tiers.length - 1];
        }
    }
    return { tier: playerTier, next: nextTier}
}

export function getFastestTime(...times) {
    let fastest = times[0];
    for (let time of times) {
        if (time < fastest) fastest = time;
    }
    return fastest;
}

export function convertTicks(ticks) {
    const seconds = ticks / 20;
    let minutes = 0;
    for (let i = seconds; i >= 60; i -= 60) {
        minutes++;
    }
    return `${minutes}:${seconds - (minutes * 60)}`;
}