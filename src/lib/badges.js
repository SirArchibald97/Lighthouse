export const badges = {
    battle_box: [
        { name: "Ace in the Box", description: "Eliminate all 4 members of the opposing team", icon: "ace_in_the_box", stat: "ace", trophies: 70 },
        { name: "Ace From Afar", description: "Eliminate all 4 members of the opposing team using ranged weapons", icon: "ace_from_afar", stat: "ace_from_afar", trophies: 100 },
        { name: "Aerial Assault", description: "Eliminate a player using a ranged weapon whilst levitating", icon: "aerial_assault", stat: "aerial_assault", trophies: 50 },
        { name: "Blind Brawl", description: "Eliminate a player whilst blind", icon: "blind_brawl", stat: "blind_brawl", trophies: 30 },
        { name: "Demolitions Expert", description: "Eliminate 3 enemies with explosives in a single round", icon: "demolitions_expert", stat: "demolitions_expert", trophies: 100 },
        { name: "Flawless Battle", description: "Place 1st as a team without any member of your team dying", icon: "flawless_battle", stat: "flawless_battle", trophies: 70 },
        { name: "Savior Ace", description: "Eliminate all 4 enemies as the last player standing", icon: "savior_ace", stat: "leave_it_to_me", trophies: 100 },
        { name: "Stealthy Takedown", description: "Eliminate an enemy whilst invisible", icon: "stealthy_takedown", stat: "stealthy_takedown", trophies: 30 },
        { name: "Ultimate Ace", description: "Eliminate all 12 enemies in a game", icon: "ultimate_ace", stat: "ultimate_ace", trophies: 150 },
        { name: "Untouchable Assassin", description: "Place 1st as a team whilst taking no damage and getting at least 4 eliminations", icon: "untouchable_assassin", stat: "untouchable_assassin", trophies: 70 },
    ],
    battle_box_tiered: [
        { name: "Battle Box Player", description: "Play all 3 rounds of games of Battle Box", icon: "battle_box_player", stat: "games_played", tiers: [
            { name: "I", amount: 15, trophies: 10 },
            { name: "II", amount: 50, trophies: 20 },
            { name: "III", amount: 125, trophies: 30 },
            { name: "IV", amount: 250, trophies: 50 },
            { name: "V", amount: 475, trophies: 75 },
            { name: "VI", amount: 800, trophies: 100 },
            { name: "VII", amount: 1300, trophies: 125 },
        ]},
        { name: "Battle Box Warrior", description: "Eliminate players in Battle Box", icon: "battle_box_warrior", stat: "kills", tiers: [
            { name: "I", amount: 25, trophies: 10 },
            { name: "II", amount: 75, trophies: 20 },
            { name: "III", amount: 175, trophies: 30 },
            { name: "IV", amount: 400, trophies: 50 },
            { name: "V", amount: 700, trophies: 75 },
            { name: "VI", amount: 1200, trophies: 100 },
            { name: "VII", amount: 2000, trophies: 125 },    
        ]},
        { name: "Battle Box Champion", description: "Finish games of Battle Box with your team in 1st place", icon: "battle_box_champion", stat: "team_first_place", tiers: [
            { name: "I", amount: 5, trophies: 10 },
            { name: "II", amount: 15, trophies: 20 },
            { name: "III", amount: 35, trophies: 30 },
            { name: "IV", amount: 75, trophies: 50 },
            { name: "V", amount: 155, trophies: 75 },
            { name: "VI", amount: 250, trophies: 100 },
            { name: "VII", amount: 400, trophies: 125 },    
        ]},
        { name: "Battle Box Expert", description: "Win rounds of Battle Box", icon: "battle_box_expert", stat: "rounds_won", tiers: [
            { name: "I", amount: 25, trophies: 10 },
            { name: "II", amount: 75, trophies: 20 },
            { name: "III", amount: 175, trophies: 30 },
            { name: "IV", amount: 375, trophies: 50 },
            { name: "V", amount: 600, trophies: 75 },
            { name: "VI", amount: 1200, trophies: 100 },
            { name: "VII", amount: 2000, trophies: 125 },    
        ]}
    ],
    sky_battle: [
        { name: "Creeper Coffin", description: "Get an elimination using a Creeper you spawned", icon: "creeper_coffin", stat: "creeper_coffin", trophies: 10 },
        { name: "Fallen Warrior", description: "Die after getting 8 eliminations in a single game", icon: "fallen_warrior", stat: "fallen_warrior", trophies: 25 },
        { name: "Personal Feast", description: "Eat 12 or more pieces of steak in a single game", icon: "personal_feast", stat: "personal_feast", trophies: 35 },
        { name: "Sky Lord", description: "Get at least 10 eliminations in a single game", icon: "sky_lord", stat: "sky_lord", trophies: 25 },
        { name: "Sky Sniper", description: "Get an elimination with a ranged weapon from over 50 blocks away", icon: "sky_sniper", stat: "sky_sniper", trophies: 35 },
        { name: "Team Crusher", description: "Eliminate all 4 members of an enemy team", icon: "team_crusher", stat: "team_crusher", trophies: 15 },
        { name: "Untouchable Champion", description: "Reach a survival placement of 1st without taking damage", icon: "untouchable_champion", stat: "untouchable_champion", trophies: 50 },
        { name: "Wings to Fly", description: "Don't touch the ground for 30s after using a levitation spark", icon: "wings_to_fly", stat: "wings_to_fly", trophies: 15 },
    ],
    sky_battle_tiered: [
        { name: "Sky Battle Player", description: "Survive for at least 60s in games of Sky Battle", icon: "sky_battle_player", stat: "survived_minute", tiers: [
            { name: "I", amount: 30, trophies: 10 },
            { name: "II", amount: 90, trophies: 20 },
            { name: "III", amount: 200, trophies: 30 },
            { name: "IV", amount: 450, trophies: 50 },
            { name: "V", amount: 800, trophies: 75 },
            { name: "VI", amount: 1400, trophies: 100 },
            { name: "VII", amount: 2300, trophies: 125 },
        ]},
        { name: "Sky Battle Warrior", description: "Eliminate players in games of Sky Battle", icon: "sky_battle_warrior", stat: "kills", tiers: [
            { name: "I", amount: 25, trophies: 10 },
            { name: "II", amount: 75, trophies: 20 },
            { name: "III", amount: 150, trophies: 30 },
            { name: "IV", amount: 350, trophies: 50 },
            { name: "V", amount: 600, trophies: 75 },
            { name: "VI", amount: 1000, trophies: 100 },
            { name: "VII", amount: 1700, trophies: 125 },    
        ]},
        { name: "Sky Battle Champion", description: "Reach survival placement of 1st in games of Sky Battle", icon: "sky_battle_champion", stat: "solo_first_place", tiers: [
            { name: "I", amount: 2, trophies: 10 },
            { name: "II", amount: 5, trophies: 20 },
            { name: "III", amount: 15, trophies: 30 },
            { name: "IV", amount: 25, trophies: 50 },
            { name: "V", amount: 50, trophies: 75 },
            { name: "VI", amount: 100, trophies: 100 },
            { name: "VII", amount: 150, trophies: 125 },    
        ]},
        { name: "Sky Battle Expert", description: "Reach survival placement of 8 or better in games of Sky Battle", icon: "sky_battle_expert", stat: "solo_top_eight", tiers: [
            { name: "I", amount: 20, trophies: 10 },
            { name: "II", amount: 65, trophies: 20 },
            { name: "III", amount: 150, trophies: 30 },
            { name: "IV", amount: 325, trophies: 50 },
            { name: "V", amount: 575, trophies: 75 },
            { name: "VI", amount: 1000, trophies: 100 },
            { name: "VII", amount: 1600, trophies: 125 },
        ]}
    ],
    tgttos: [
        { name: "Got the Worm", description: "Place 1st with the Early Birds modifier active", icon: "got_the_worm", stat: "got_the_worm", trophies: 30 },
        { name: "Jackpot", description: "Place 7th in every round of a TGTTOS game", icon: "jackpot", stat: "jackpot", trophies: 50 },
        { name: "Pave the Way", description: "Place 1st without placing blocks on a map where you can place blocks", icon: "pave_the_way", stat: "pave_the_way", trophies: 50 },
        { name: "Slapdown", description: "Punch a chicken with a slapstick", icon: "slapdown", stat: "slapdown", trophies: 10 },
        { name: "Triple Champion", description: "Place 1st in every round of TGTTOS game", icon: "triple_champion", stat: "triple_champion", trophies: 100 },
        { name: "Ultimate Comeback", description: "Place 1st after getting knocked into the void", icon: "ultimate_comeback", stat: "ultimate_comeback", trophies: 70 },
        { name: "Untouchable Speedster", description: "Place 1st without being hit with the Double Time modifier is active", icon: "untouchable_speedster", stat: "untouchable_speedster", trophies: 100 },
        { name: "Victorious Pacifist", description: "Place 1st without punching anyone", icon: "victorious_pacifist", stat: "victorious_pacifist", trophies: 50 },
    ],
    tgttos_tiered: [
        { name: "Chicken Puncher", description: "Punch chickens in games of TGTTOS", icon: "chicken_puncher", stat: "chickens_punched", tiers: [
            { name: "I", amount: 50, trophies: 10 },
            { name: "II", amount: 150, trophies: 20 },
            { name: "III", amount: 320, trophies: 30 },
            { name: "IV", amount: 700, trophies: 50 },
            { name: "V", amount: 1300, trophies: 75 },
            { name: "VI", amount: 2250, trophies: 100 },
            { name: "VII", amount: 3750, trophies: 125 },
        ]},
        { name: "Round Champion", description: "Finish rounds of TGTTOS in 1st place", icon: "tgttos_round_champion", stat: "round_first_place", tiers: [
            { name: "I", amount: 2, trophies: 10 },
            { name: "II", amount: 7, trophies: 20 },
            { name: "III", amount: 15, trophies: 30 },
            { name: "IV", amount: 35, trophies: 50 },
            { name: "V", amount: 60, trophies: 75 },
            { name: "VI", amount: 110, trophies: 100 },
            { name: "VII", amount: 180, trophies: 125 },    
        ]},
        { name: "Round Expert", description: "Finish rounds of TGTTOS in 5th place or better", icon: "tgttos_round_expert", stat: "round_top_five", tiers: [
            { name: "I", amount: 15, trophies: 10 },
            { name: "II", amount: 50, trophies: 20 },
            { name: "III", amount: 110, trophies: 30 },
            { name: "IV", amount: 250, trophies: 50 },
            { name: "V", amount: 425, trophies: 75 },
            { name: "VI", amount: 750, trophies: 100 },
            { name: "VII", amount: 1250, trophies: 125 },    
        ]},
        { name: "TGTTOS Champion", description: "Finish games of TGTTOS in 1st place", icon: "tgttos_champion", stat: "first_place", tiers: [
            { name: "I", amount: 1, trophies: 10 },
            { name: "II", amount: 2, trophies: 20 },
            { name: "III", amount: 5, trophies: 30 },
            { name: "IV", amount: 10, trophies: 50 },
            { name: "V", amount: 20, trophies: 75 },
            { name: "VI", amount: 40, trophies: 100 },
            { name: "VII", amount: 60, trophies: 125 },    
        ]},
        { name: "TGTTOS Expert", description: "Finish games of TGTTOS in 5th place or better", icon: "tgttos_expert", stat: "top_five", tiers: [
            { name: "I", amount: 5, trophies: 10 },
            { name: "II", amount: 15, trophies: 20 },
            { name: "III", amount: 35, trophies: 30 },
            { name: "IV", amount: 75, trophies: 50 },
            { name: "V", amount: 125, trophies: 75 },
            { name: "VI", amount: 225, trophies: 100 }, 
            { name: "VII", amount: 375, trophies: 125 },    
        ]}
    ],
    hitw: [
        { name: "Blaze of Glory", description: "Finish 3rd or higher in a game where you punched a blaze", icon: "blaze_of_glory", stat: "blaze_of_glory", trophies: 50 },
        { name: "Bullet Time", description: "Survive being hit by the matrix trap", icon: "bullet_time", stat: "bullet_time", trophies: 30 },
        { name: "Something in the Waves", description: "Catch a fish during a game of HITW", icon: "something_in_the_waves", stat: "fish_catcher", trophies: 70 },
        { name: "Barely Broiled", description: "Survive being launched by a hot potato", icon: "barely_broiled", stat: "hot_potato_survivor", trophies: 50 },
        { name: "Monster Catch", description: "Hook a guardian with a fishing rod", icon: "monster_catch", stat: "monster_catcher", trophies: 100 },
        { name: "Slimey Rivalry", description: "Survival all 4 minutes of a game of HITW", icon: "slimey_rivalry", stat: "slimey_rivalry", trophies: 70 },
    ],
    hitw_tiered: [
        { name: "HITW Champion", description: "Finish games of HITW in 1st place or survive till the end", icon: "hitw_champion", stat: "first_place", tiers: [
            { name: "I", amount: 2, trophies: 10 },
            { name: "II", amount: 5, trophies: 20 },
            { name: "III", amount: 10, trophies: 30 },
            { name: "IV", amount: 25, trophies: 50 },
            { name: "V", amount: 40, trophies: 75 },
            { name: "VI", amount: 70, trophies: 100 },
            { name: "VII", amount: 125, trophies: 125 },
        ]},
        { name: "HITW Expert", description: "Finish games of HITW in 5th place or better", icon: "hitw_expert", stat: "top_five", tiers: [
            { name: "I", amount: 10, trophies: 10 },
            { name: "II", amount: 25, trophies: 20 },
            { name: "III", amount: 75, trophies: 30 },
            { name: "IV", amount: 125, trophies: 50 },
            { name: "V", amount: 250, trophies: 75 },
            { name: "VI", amount: 425, trophies: 100 },
            { name: "VII", amount: 700, trophies: 125 },
        ]},
        { name: "Bring on the Wall", description: "Dodge walls in games of HITW", icon: "bring_on_the_wall", stat: "walls_dodged", tiers: [
            { name: "I", amount: 350, trophies: 10 },
            { name: "II", amount: 1100, trophies: 20 },
            { name: "III", amount: 2500, trophies: 30 },
            { name: "IV", amount: 5500, trophies: 50 },
            { name: "V", amount: 10000, trophies: 75 },
            { name: "VI", amount: 15000, trophies: 100 },
            { name: "VII", amount: 30000, trophies: 125 },
        ]},
    ],
    dynaball: [
        { name: "Airstrike Assassin", description: "Eliminate 2 players within 15 seconds of using an airstrike", icon: "airstrike_assassin", stat: "airstrike_eliminate_2", trophies: 70 },
        { name: "Dynaballin", description: "Eliminate 3 players within 10 seconds", icon: "dynaballin", stat: "fast_triple_kill", trophies: 100 },
        { name: "Dynamite Dreadlord", description: "Eliminate 5 players within a single game", icon: "dynasniper", stat: "eliminate_5", trophies: 100 },
        { name: "Final Survivor", description: "Win a game whilst being the only remaining player of your team", icon: "final_survivor", stat: "only_survivor", trophies: 70 },
        { name: "Massive Repairs", description: "Place 200 repair blocks in a single game", icon: "massive_repairs", stat: "repair_200", trophies: 30 },
        { name: "Tactical Powder", description: "Turn an enemy crate into powder with a powder bomb", icon: "tactical_powder", stat: "powder_bomb_crate", trophies: 30 },
        { name: "Ultimate Baller", description: "Win a game as the only remaining player against at least 3 enemies", icon: "ultimate_baller", stat: "only_survivor_against_3", trophies: 70 },
    ],
    dynaball_tiered: [
        { name: "Dynaball Champion", description: "Win games of Dynaball while surviving till the end", icon: "dynaball_champion", stat: "wins", tiers: [
            { name: "I", amount: 3, trophies: 10 },
            { name: "II", amount: 7, trophies: 20 },
            { name: "III", amount: 15, trophies: 30 },
            { name: "IV", amount: 30, trophies: 50 },
            { name: "V", amount: 60, trophies: 75 },
            { name: "VI", amount: 100, trophies: 100 },
            { name: "VII", amount: 175, trophies: 125 },
        ]},
        { name: "Dynaball Demolitionist", description: "Destroy blocks in games of Dynaball", icon: "dynaball_demolitionist", stat: "blocks_destroyed", tiers: [
            { name: "I", amount: 2000, trophies: 10 },
            { name: "II", amount: 6000, trophies: 20 },
            { name: "III", amount: 15000, trophies: 30 },
            { name: "IV", amount: 30000, trophies: 50 },
            { name: "V", amount: 60000, trophies: 75 },
            { name: "VI", amount: 100000, trophies: 100 },
            { name: "VII", amount: 150000, trophies: 125 },
        ]},
        { name: "Dynaball Sniper", description: "Eliminate players in games of Dynaball", icon: "dynaball_sniper", stat: "kills", tiers: [
            { name: "I", amount: 10, trophies: 10 },
            { name: "II", amount: 30, trophies: 20 },
            { name: "III", amount: 75, trophies: 30 },
            { name: "IV", amount: 150, trophies: 50 },
            { name: "V", amount: 275, trophies: 75 },
            { name: "VI", amount: 450, trophies: 100 },
            { name: "VII", amount: 800, trophies: 125 },    
        ]},
        { name: "Dynaball Engineer", description: "Place repair blocks in games of Dynaball", icon: "dynaball_engineer", stat: "blocks_placed", tiers: [
            { name: "I", amount: 1000, trophies: 10 },
            { name: "II", amount: 3000, trophies: 20 },
            { name: "III", amount: 7000, trophies: 30 },
            { name: "IV", amount: 15000, trophies: 50 },
            { name: "V", amount: 25000, trophies: 75 },
            { name: "VI", amount: 45000, trophies: 100 },
            { name: "VII", amount: 80000, trophies: 125 },
        ]},
        { name: "Spawner Smasher", description: "Destroy spawners in games of Dynaball", icon: "dynaball_spawner_smasher", stat: "spawners_destroyed", tiers: [
            { name: "I", amount: 10, trophies: 10 },
            { name: "II", amount: 30, trophies: 20 },
            { name: "III", amount: 75, trophies: 30 },
            { name: "IV", amount: 150, trophies: 50 },
            { name: "V", amount: 275, trophies: 75 },
            { name: "VI", amount: 450, trophies: 100 },
            { name: "VII", amount: 800, trophies: 125 },    
        ]},
        { name: "Dynaball Survivor", description: "Survive for at least 2 minutes in games of Dynaball", icon: "dynaball_survivor", stat: "survive_2m", tiers: [
            { name: "I", amount: 15, trophies: 10 },
            { name: "II", amount: 50, trophies: 20 },
            { name: "III", amount: 100, trophies: 30 }, 
            { name: "IV", amount: 200, trophies: 50 },
            { name: "V", amount: 375, trophies: 75 },
            { name: "VI", amount: 600, trophies: 100 },
            { name: "VII", amount: 1100, trophies: 125 },    
        ]}
    ],
    dojo_tiered: [
        { name: "Standard Completionist", description: "Perform a Standard completion on all courses of a PKW Dojo rotation", icon: "pkw_standard_completionist", stat: "unique_rot_standard", tiers: [
            { name: "I", amount: 1, trophies: 10 },
            { name: "II", amount: 2, trophies: 20 },
            { name: "III", amount: 3, trophies: 30 },
            { name: "IV", amount: 5, trophies: 50 },
            { name: "V", amount: 7, trophies: 75 },
            { name: "VI", amount: 10, trophies: 100 },
            { name: "VII", amount: 15, trophies: 125 },
        ]},
        { name: "Advanced Completionist", description: "Perform an Advanced completion on all courses of a PKW Dojo rotation", icon: "pkw_advanced_completionist", stat: "unique_rot_advanced", tiers: [
            { name: "I", amount: 1, trophies: 10 },
            { name: "II", amount: 2, trophies: 20 },
            { name: "III", amount: 3, trophies: 30 },
            { name: "IV", amount: 5, trophies: 50 },
            { name: "V", amount: 7, trophies: 75 },
            { name: "VI", amount: 10, trophies: 100 },
            { name: "VII", amount: 15, trophies: 125 },
        ]},
        { name: "Expert Completionist", description: "Perform an Expert completion on all courses of a PKW Dojo rotation", icon: "pkw_expert_completionist", stat: "unique_rot_expert", tiers: [
            { name: "I", amount: 1, trophies: 10 },
            { name: "II", amount: 2, trophies: 20 },
            { name: "III", amount: 3, trophies: 30 },
            { name: "IV", amount: 5, trophies: 50 },
            { name: "V", amount: 7, trophies: 75 },
            { name: "VI", amount: 10, trophies: 100 },
            { name: "VII", amount: 15, trophies: 125 },
        ]},
        { name: "Standard Leaper", description: "Perform Standard completions on unique PKW Dojo courses", icon: "pkw_standard_leaper", stat: "unique_standard", tiers: [
            { name: "I", amount: 7, trophies: 10 },
            { name: "II", amount: 15, trophies: 20 },
            { name: "III", amount: 25, trophies: 30 },
            { name: "IV", amount: 45, trophies: 50 },
            { name: "V", amount: 75, trophies: 75 }, 
            { name: "VI", amount: 125, trophies: 100 },
            { name: "VII", amount: 200, trophies: 125 },
        ]},
        { name: "Advanced Leaper", description: "Perform Advanced completions on unique PKW Dojo courses", icon: "pkw_advanced_leaper", stat: "unique_advanced", tiers: [
            { name: "I", amount: 7, trophies: 10 },
            { name: "II", amount: 15, trophies: 20 },
            { name: "III", amount: 25, trophies: 30 },
            { name: "IV", amount: 45, trophies: 50 },
            { name: "V", amount: 75, trophies: 75 },
            { name: "VI", amount: 125, trophies: 100 },
            { name: "VII", amount: 200, trophies: 125 },
        ]},
        { name: "Expert Leaper", description: "Perform Expert completions on unique PKW Dojo courses", icon: "pkw_expert_leaper", stat: "unique_expert", tiers: [
            { name: "I", amount: 7, trophies: 10 },
            { name: "II", amount: 15, trophies: 20 },
            { name: "III", amount: 25, trophies: 30 },
            { name: "IV", amount: 45, trophies: 50 },
            { name: "V", amount: 75, trophies: 75 },
            { name: "VI", amount: 125, trophies: 100 },
            { name: "VII", amount: 200, trophies: 125 },
        ]},
    ],
    survivor_tiered: [
        { name: "PKW Champion", description: "Win the final duel in games of Parkour Warrior Survivor", icon: "parkour_warrior_champion", stat: "wins", tiers: [
            { name: "I", amount: 1, trophies: 10 },
            { name: "II", amount: 3, trophies: 20 },
            { name: "III", amount: 5, trophies: 30 },
            { name: "IV", amount: 15, trophies: 50 },
            { name: "V", amount: 25, trophies: 75 },
            { name: "VI", amount: 45, trophies: 100 },
            { name: "VII", amount: 75, trophies: 125 },
        ]},
        { name: "PKW Finalist", description: "Complete Leap 6 in games of Parkour Warrior Survivor", icon: "parkour_warrior_finalist", stat: "leap_6", tiers: [
            { name: "I", amount: 10, trophies: 10 },
            { name: "II", amount: 25, trophies: 20 },
            { name: "III", amount: 6, trophies: 30 },
            { name: "IV", amount: 120, trophies: 50 },
            { name: "V", amount: 225, trophies: 75 },
            { name: "VI", amount: 375, trophies: 100 },
            { name: "VII", amount: 625, trophies: 125 },
        ]},
        { name: "PKW Assassin", description: "Eliminate players in games of Parkour Warrior Survivor", icon: "parkour_warrior_ninja", stat: "kills", tiers: [
            { name: "I", amount: 100, trophies: 10 },
            { name: "II", amount: 350, trophies: 20 },
            { name: "III", amount: 800, trophies: 30 },
            { name: "IV", amount: 1750, trophies: 50 },
            { name: "V", amount: 3000, trophies: 75 },
            { name: "VI", amount: 5000, trophies: 100 },
            { name: "VII", amount: 8000, trophies: 125 },
        ]},
    ],
    rocket_spleef: [
        { name: "Advanced Tactics", description: "Survive 60 seconds without deploying your elytra", icon: "advanced_tactics", stat: "survive_60s_without_gliding", trophies: 50 },
        { name: "Careful Glider", description: "Win a game without dropping below 50% elytra durability", icon: "careful_glider", stat: "win_above_half_durability", trophies: 70 },
        { name: "Flawless Rocketeer", description: "Win without using any updrafts", icon: "flawless_rocketeer", stat: "win_without_updraft", trophies: 50 },
        { name: "Rocket Brawler", description: "Punch 3 players within 10 seconds", icon: "rocket_brawler", stat: "fast_punch", trophies: 30 },
        { name: "Rocket Rush", description: "Eliminate 3 players within 20 seconds", icon: "rocket_rush", stat: "fast_triple_kill", trophies: 100 },
        { name: "Spleef Sniper", description: "Land a direct hit with a rocket on a player at least 40 blocks away", icon: "rocket_spleef_sniper", stat: "distant_direct", trophies: 70 },
        { name: "Spleef Slapdown", description: "Eliminate a player by punching them into the void before they next land", icon: "spleef_slapdown", stat: "!melee_kills", trophies: 35 },
        { name: "Ultimate Rocketeer", description: "Eliminate 5 players in a single game", icon: "ultimate_rocketeer", stat: "eliminate_5", trophies: 100 },
    ],
    rocket_spleef_tiered: [
        { name: "Rocket Spleef Champion", description: "Place 1st in games of Rocket Spleef Rush", icon: "rocket_spleef_champion", stat: "first_place", tiers: [
            { name: "I", amount: 2, trophies: 10 },
            { name: "II", amount: 5, trophies: 20 },
            { name: "III", amount: 10, trophies: 30 },
            { name: "IV", amount: 25, trophies: 50 },
            { name: "V", amount: 50, trophies: 75 },
            { name: "VI", amount: 100, trophies: 100 },
            { name: "VII", amount: 150, trophies: 125 },
		]},
		{ name: "Rocket Spleef Expert", description: "Place in the top 5 in games of Rocket Spleef Rush", icon: "rocket_spleef_expert", stat: "top_five", tiers: [
            { name: "I", amount: 10, trophies: 10 },
            { name: "II", amount: 30, trophies: 20 },
            { name: "III", amount: 75, trophies: 30 },
            { name: "IV", amount: 150, trophies: 50 },
            { name: "V", amount: 275, trophies: 75 },
            { name: "VI", amount: 450, trophies: 100 },
            { name: "VII", amount: 800, trophies: 125 },
        ]},
		{ name: "Rocket Spleef Glider", description: "Survive for at least 1 minute in games of Rocket Spleef Rush", icon: "rocket_spleef_glider", stat: "survive_60s", tiers: [
            { name: "I", amount: 20, trophies: 10 },
            { name: "II", amount: 60, trophies: 20 },
            { name: "III", amount: 150, trophies: 30 },
            { name: "IV", amount: 300, trophies: 50 },
            { name: "V", amount: 550, trophies: 75 },
            { name: "VI", amount: 950, trophies: 100 },
            { name: "VII", amount: 1550, trophies: 125 },
        ]},
		{ name: "Rocket Spleef Warrior", description: "Land direct hits with rockets during games of Rocket Spleef Rush", icon: "rocket_spleef_warrior", stat: "rockets_hit", tiers: [
            { name: "I", amount: 50, trophies: 10 },
            { name: "II", amount: 150, trophies: 20 },
            { name: "III", amount: 350, trophies: 30 },
            { name: "IV", amount: 750, trophies: 50 },
            { name: "V", amount: 1350, trophies: 75 },
            { name: "VI", amount: 2500, trophies: 100 },
            { name: "VII", amount: 4000, trophies: 125 },
        ]},
		{ name: "Rocket Spleef Survivor", description: "Outlive players during games of Rocket Spleef Rush", icon: "rocket_spleef_survivor", stat: "players_outlived", tiers: [
            { name: "I", amount: 150, trophies: 10 },
            { name: "II", amount: 500, trophies: 20 },
            { name: "III", amount: 1100, trophies: 30 },
            { name: "IV", amount: 2500, trophies: 50 },
            { name: "V", amount: 4500, trophies: 75 },
            { name: "VI", amount: 7500, trophies: 100 },
            { name: "VII", amount: 12500, trophies: 125 },
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

export function calculateTrophies(stats, badges) {
    let trophies = 0;
    for (let badge of badges) {
        if (badge.tiers) {
            for (let tier of badge.tiers) {
                if (stats[badge.stat] >= tier.amount) {
                    trophies += tier.trophies;
                }
            }
        } else {
            if (stats.badges[badge.stat] > 0) {
                trophies += badge.trophies;
            }
        }
    }
    return trophies;
}

export function calculateTotalTrophies(stats) {
    let trophies = 0;
    let games = [
        { stats: stats.battle_box, badges: badges.battle_box.concat(badges.battle_box_tiered) },
        { stats: stats.sky_battle.quads, badges: badges.sky_battle.concat(badges.sky_battle_tiered) },
        { stats: stats.tgttos, badges: badges.tgttos.concat(badges.tgttos_tiered) },
        { stats: stats.hitw, badges: badges.hitw.concat(badges.hitw_tiered) },
        { stats: stats.dynaball, badges: badges.dynaball.concat(badges.dynaball_tiered) },
        { stats: stats.pkw.dojo, badges: badges.dojo_tiered },
        { stats: stats.pkw.survivor, badges: badges.survivor_tiered }
    ];
    for (let { stats, badges } of games) {
        for (let badge of badges) {
            if (badge.tiers) {
                for (let tier of badge.tiers) {
                    if (stats[badge.stat] >= tier.amount) {
                        trophies += tier.trophies;
                    }
                }
            } else {
                if (stats.badges[badge.stat] > 0) {
                    trophies += badge.trophies;
                }
            }
        }
    }
    return trophies;
}

export function calculateMaxTrophies(badges) {
    let trophies = 0;
    for (let badge of badges) {
        if (badge.tiers) {
            for (let tier of badge.tiers) {
                trophies += tier.trophies;
            }
        } else {
            trophies += badge.trophies;
        }
    }
    return trophies;
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