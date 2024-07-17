export const openables = [
    // +-------------------+
    // |  TREASURE CHESTS  |
    // +-------------------+
    { name: "Bronze Treasure Chest", icon: "/openables/bronze_chest.png", crate: "treasure", type: "bronze",
        rewards: [
            { name: "Core", chance: 40, rewards: [
                { reward: "Common Cosmetic Core", amount: 1, chance: 32 },
                { reward: "Uncommon Cosmetic Core", amount: 1, chance: 20 },
                { reward: "Rare Cosmetic Core", amount: 1, chance: 8 },
                { reward: "Silver Treasure Core", amount: 1, chance: 10 },
                { reward: "Attunement Catalyst", amount: 2, chance: 12 },
                { reward: "Common Power Shard", amount: 1, chance: 10 },
                { reward: "Uncommon Power Shard", amount: 1, chance: 6 },
                { reward: "Rare Power Shard", amount: 1, chance: 2 }
            ]},
            { name: "Quest Scroll", chance: 34, rewards: [
                { reward: "Common Quest Scroll", amount: 3, chance: 35 },
                { reward: "Uncommon Quest Scroll", amount: 2, chance: 15 },
                { reward: "Rare Quest Scroll", amount: 1, chance: 5 },
                { reward: "Quest Reroll Token", amount: 3, chance: 35 },
                { reward: "Quest Refresh Token", amount: 1, chance: 10 }
            ]},
            { name: "Relic", chance: 10, rewards: [
                { reward: "Common Relic Blueprint", amount: 1, chance: 45 },
                { reward: "Uncommon Relic Blueprint", amount: 1, chance: 24 },
                { reward: "Rare Relic Blueprint", amount: 1, chance: 8 },
                { reward: "Common Glimmering Relic Blueprint", amount: 1, chance: 6 },
                { reward: "Uncommon Glimmering Relic Blueprint", amount: 1, chance: 2 }
            ]},
            { name: "Material", chance: 10, rewards: [
                { reward: "Natural Material Crate", amount: 1, chance: 25 },
                { reward: "Oceanic Material Crate", amount: 1, chance: 25 },
                { reward: "Mechanical Material Crate", amount: 1, chance: 25 },
                { reward: "Magical Material Crate", amount: 1, chance: 25 }
            ]},
            { name: "Chroma", chance: 6, rewards: [
                { reward: "Natural Chroma Pack", amount: 1, chance: 25 },
                { reward: "Oceanic Chroma Pack", amount: 1, chance: 25 },
                { reward: "Mechanical Chroma Pack", amount: 1, chance: 25 },
                { reward: "Magical Chroma Pack", amount: 1, chance: 25 }
            ]}
        ]
    },
    { name: "Silver Treasure Chest", icon: "/openables/silver_chest.png", crate: "treasure", type: "silver",
        rewards: [
            { name: "Core", chance: 32, rewards: [
                { reward: "Uncommon Cosmetic Core", amount: 3, chance: 27 },
                { reward: "Rare Cosmetic Core", amount: 2, chance: 20 },
                { reward: "Epic Cosmetic Core", amount: 1, chance: 8 },
                { reward: "Legendary Cosmetic Core", amount: 1, chance: 3 },
                { reward: "Mythic Cosmetic Core", amount: 1, chance: 2 },
                { reward: "Golden Treasure Core", amount: 1, chance: 7 },
                { reward: "Attunement Catalyst", amount: 4, chance: 10 },
                { reward: "Crafting Catalyst", amount: 1, chance: 5 },
                { reward: "Uncommon Power Shard", amount: 1, chance: 10 },
                { reward: "Rare Power Shard", amount: 1, chance: 6 },
                { reward: "Epic Power Shard", amount: 1, chance: 2 }
            ]},
            { name: "Quest Scroll", chance: 25, rewards: [
                { reward: "Uncommon Quest Scroll", amount: 5, chance: 35 },
                { reward: "Rare Quest Scroll", amount: 3, chance: 15 },
                { reward: "Epic Quest Scroll", amount: 2, chance: 5 },
                { reward: "Quest Reroll Token", amount: 7, chance: 35 },
                { reward: "Quest Refresh Token", amount: 3, chance: 10 }
            ]},
            { name: "Relic", chance: 15, rewards: [
                { reward: "Uncommon Relic Blueprint", amount: 1, chance: 56 },
                { reward: "Rare Relic Blueprint", amount: 1, chance: 24 },
                { reward: "Epic Relic Blueprint", amount: 1, chance: 8 },
                { reward: "Uncommon Glimmering Relic Blueprint", amount: 1, chance: 8 },
                { reward: "Rare Glimmering Relic Blueprint", amount: 1, chance: 3 },
                { reward: "Epic Glimmering Relic Blueprint", amount: 1, chance: 1 }
            ]},
            { name: "Material", chance: 18, rewards: [
                { reward: "Natural Material Crate", amount: 2, chance: 25 },
                { reward: "Oceanic Material Crate", amount: 2, chance: 25 },
                { reward: "Mechanical Material Crate", amount: 2, chance: 25 },
                { reward: "Magical Material Crate", amount: 2, chance: 25 }
            ]},
            { name: "Chroma", chance: 10, rewards: [
                { reward: "Natural Chroma Pack", amount: 1, chance: 22.5 },
                { reward: "Oceanic Chroma Pack", amount: 1, chance: 22.5 },
                { reward: "Mechanical Chroma Pack", amount: 1, chance: 22.5 },
                { reward: "Magical Chroma Pack", amount: 1, chance: 22.5 },
                { reward: "Prismatic Chroma Pack", amount: 1, chance: 10 },
            ]}
        ]
    },
    { name: "Golden Treasure Chest", icon: "/openables/golden_chest.png", crate: "treasure", type: "golden",
        rewards: [
            { name: "Core", chance: 30, rewards: [
                { reward: "Epic Cosmetic Core", amount: 3, chance: 19 },
                { reward: "Legendary Cosmetic Core", amount: 2, chance: 17 },
                { reward: "Legendary Cosmetic Core", amount: 3, chance: 13 },
                { reward: "Mythic Cosmetic Core", amount: 1, chance: 13 },
                { reward: "Mythic Cosmetic Core", amount: 2, chance: 6 },
                { reward: "Attunement Catalyst", amount: 10, chance: 11 },
                { reward: "Crafting Catalyst", amount: 4, chance: 7 },
                { reward: "Epic Power Shard", amount: 2, chance: 8 },
                { reward: "Legendary Power Shard", amount: 2, chance: 8 }
            ]},
            { name: "Quest Scroll", chance: 27, rewards: [
                { reward: "Epic Quest Scroll", amount: 5, chance: 15 },
                { reward: "Legendary Quest Scroll", amount: 3, chance: 25 },
                { reward: "Legendary Quest Scroll", amount: 5, chance: 20 },
                { reward: "Quest Reroll Token", amount: 25, chance: 15 },
                { reward: "Quest Refresh Token", amount: 10, chance: 25 }
            ]},
            { name: "Relic", chance: 15, rewards: [
                { reward: "Epic Relic Blueprint", amount: 1, chance: 68 },
                { reward: "Legendary Relic Blueprint", amount: 1, chance: 24 },
                { reward: "Epic Glimmering Relic Blueprint", amount: 1, chance: 6 },
                { reward: "Legendary Glimmering Relic Blueprint", amount: 1, chance: 2 }
            ]},
            { name: "Material", chance: 18, rewards: [
                { reward: "Natural Material Crate", amount: 3, chance: 25 },
                { reward: "Oceanic Material Crate", amount: 3, chance: 25 },
                { reward: "Mechanical Material Crate", amount: 3, chance: 25 },
                { reward: "Magical Material Crate", amount: 3, chance: 25 }
            ]},
            { name: "Chroma", chance: 10, rewards: [
                { reward: "Natural Chroma Pack", amount: 2, chance: 15 },
                { reward: "Oceanic Chroma Pack", amount: 2, chance: 15 },
                { reward: "Mechanical Chroma Pack", amount: 2, chance: 15 },
                { reward: "Magical Chroma Pack", amount: 2, chance: 15 },
                { reward: "Prismatic Chroma Pack", amount: 1, chance: 40 }
            ]}
        ]
    },

    // +-------------------+
    // |   REWARD CRATES   |
    // +-------------------+
    { name: "Common Reward Crate", icon: "/openables/common_reward.png", crate: "reward", type: "common",
        rewards: [
            { name: "Coins", chance: 100, pool: [200, 300], currency: true },
            { name: "Silver", chance: 100, pool: [20, 30], currency: true },
            { name: "Core", chance: 30, rewards: [
                { reward: "Common Cosmetic Core", amount: 1, chance: 75 },
                { reward: "Uncommon Cosmetic Core", amount: 1, chance: 15 },
                { reward: "Bronze Treasure Core", amount: 1, chance: 10 }
            ]}
        ]
    },
    { name: "Uncommon Reward Crate", icon: "/openables/uncommon_reward.png", crate: "reward", type: "uncommon",
        rewards: [
            { name: "Coins", chance: 100, pool: [450, 750], currency: true, average: 600 },
            { name: "Silver", chance: 100, pool: [45, 75], currency: true, average: 60 },
            { name: "Core", chance: 60, pool: [
                { reward: "Common Cosmetic Core", amount: 1, chance: 47 },
                { reward: "Uncommon Cosmetic Core", amount: 1, chance: 10 },
                { reward: "Rare Cosmetic Core", amount: 1, chance: 3 },
                { reward: "Bronze Treasure Core", amount: 1, chance: 15 },
                { reward: "Material Core", amount: 1, chance: 25 }
            ]}
        ]
    },
    { name: "Rare Reward Crate", icon: "/openables/rare_reward.png", crate: "reward", type: "rare", 
        rewards: [
            { name: "Coins", chance: 100, pool: [1000, 1500], currency: true },
            { name: "Silver", chance: 100, pool: [100, 150], currency: true },
            { name: "Core", chance: 60, pool: [
                { reward: "Uncommon Cosmetic Core", amount: 1, chance: 25 },
                { reward: "Rare Cosmetic Core", amount: 1, chance: 15 },
                { reward: "Bronze Treasure Core", amount: 1, chance: 10 },
                { reward: "Silver Treasure Core", amount: 1, chance: 20 },
                { reward: "Material Core", amount: 1, chance: 30 }
            ]}
        ] 
    },
    { name: "Epic Reward Crate", icon: "/openables/epic_reward.png", crate: "reward", type: "epic",
        rewards: [
            { name: "Coins", chance: 100, pool: [2000, 3000], currency: true },
            { name: "Silver", chance: 100, pool: [200, 300], currency: true },
            { name: "Core", chance: 100, pool: [
                { reward: "Rare Cosmetic Core", amount: 1, chance: 26 },
                { reward: "Epic Cosmetic Core", amount: 1, chance: 10 },
                { reward: "Legendary Cosmetic Core", amount: 1, chance: 4 },
                { reward: "Bronze Treasure Core", amount: 1, chance: 15 },
                { reward: "Silver Treasure Core", amount: 1, chance: 100 },
                { reward: "Material Core", amount: 1, chance: 35 }
            ]}
        ]
    },
    { name: "Legendary Reward Crate", icon: "/openables/legendary_reward.png", crate: "reward", type: "legendary",
        rewards: [
            { name: "Coins", chance: 100, pool: [3500, 5500], currency: true },
            { name: "Silver", chance: 100, pool: [350, 550], currency: true },
            { name: "Core", chance: 100, pool: [
                { reward: "Epic Cosmetic Core", amount: 1, chance: 50 },
                { reward: "Legendary Cosmetic Core", amount: 1, chance: 10 },
                { reward: "Silver Treasure Core", amount: 1, chance: 30 },
                { reward: "Golden Treasure Core", amount: 1, chance: 10 },
            ]}
        ]
    },

    // +-------------------+
    // |  MATERIAL CRATES  |
    // +-------------------+
    { name: "Magical Material Crate", icon: "/openables/magical.png", crate: "material", type: "magical",
        rewards: [
            { name: "Material Dust", chance: 100, pool: [50, 100], currency: true, average: 75 },
            { name: "Materials", chance: 100, pool: [
                { name: "Foggy Crystal", amount: 1, chance: 51, average: 0.3 * 0.51 },
                { name: "Jade Eye", amount: 1, chance: 25, average: 0.3 * 0.25 },
                { name: "Frigid Sapphire", amount: 1, chance: 15, average: 0.3 * 0.15 },
                { name: "Amethyst Tablet", amount: 1, chance: 7, average: 0.3 * 0.07 },
                { name: "Crystallized Sunset", amount: 1, chance: 2, average: 0.3 * 0.02 }
            ]}
        ]
    },
    { name: "Oceanic Material Crate", icon: "/openables/oceanic.png", crate: "material", type: "oceanic",
        rewards: [
            { name: "Material Dust", chance: 100, pool: [50, 100], currency: true, average: 75 },
            { name: "Materials", chance: 100, pool: [
                { name: "Bland Water", amount: 1, chance: 51, average: 0.3 * 0.51 },
                { name: "Seaweed Goo", amount: 1, chance: 25, average: 0.3 * 0.25 },
                { name: "Deep Brine", amount: 1, chance: 15, average: 0.3 * 0.15 },
                { name: "Virulent Vial", amount: 1, chance: 7, average: 0.3 * 0.07 },
                { name: "Bottled Sunrise", amount: 1, chance: 2, average: 0.3 * 0.02 }
            ]}
        ]
    },
    { name: "Mechanical Material Crate", icon: "/openables/mechanical.png", crate: "material", type: "mechanical",
        rewards: [
            { name: "Material Dust", chance: 100, pool: [50, 100], currency: true, average: 75 },
            { name: "Materials", chance: 100, pool: [
                { name: "Iron Bolt", amount: 1, chance: 51, average: 0.3 * 0.51 },
                { name: "Copper Chunk", amount: 1, chance: 25, average: 0.3 * 0.25 },
                { name: "Cobalt Rod", amount: 1, chance: 15, average: 0.3 * 0.15 },
                { name: "Titanium Plate", amount: 1, chance: 7, average: 0.3 * 0.07 },
                { name: "Solarflame Bar", amount: 1, chance: 2, average: 0.3 * 0.02 }
            ]}
        ]
    },
    { name: "Natural Material Crate", icon: "/openables/natural.png", crate: "material", type: "natural",
        rewards: [
            { name: "Material Dust", chance: 100, pool: [50, 100], currency: true, average: 75 },
            { name: "Materials", chance: 100, pool: [
                { name: "Pale Bloom", amount: 1, chance: 51, average: 0.3 * 0.51 },
                { name: "Verdant Moss", amount: 1, chance: 25, average: 0.3 * 0.25 },
                { name: "Sky Poppy", amount: 1, chance: 15, average: 0.3 * 0.15 },
                { name: "Nightshade Lily", amount: 1, chance: 7, average: 0.3 * 0.07 },
                { name: "Sparkling Sunflower", amount: 1, chance: 2, average: 0.3 * 0.02 }
            ]}
        ]
    },
];

export const items = [
    { name: "Common Cosmetic Core", rarity: "common", icon: "/icons/common_core.png" },
    { name: "Uncommon Cosmetic Core", rarity: "uncommon", icon: "/icons/uncommon_core.png" },
    { name: "Rare Cosmetic Core", rarity: "rare", icon: "/icons/rare_core.png" },
    { name: "Epic Cosmetic Core", rarity: "epic", icon: "/icons/epic_core.png" },
    { name: "Legendary Cosmetic Core", rarity: "legendary", icon: "/icons/legendary_core.png" },
    { name: "Mythic Cosmetic Core", rarity: "mythic", icon: "/icons/mythic_core.png" },

    { name: "Bronze Treasure Core", rarity: "uncommon", icon: "/icons/bronze_core.png" },
    { name: "Silver Treasure Core", rarity: "rare", icon: "/icons/silver_core.png" },
    { name: "Golden Treasure Core", rarity: "epic", icon: "/icons/golden_core.png" },

    { name: "Material Core", rarity: "uncommon", icon: "/icons/material_core.png" },

    { name: "Attunement Catalyst", rarity: "rare", icon: "/icons/attunement_cat.png" },
    { name: "Crafting Catalyst", rarity: "epic", icon: "/icons/crafting_cat.png" },

    { name: "Common Power Shard", rarity: "common", icon: "/icons/common_shard.png" },
    { name: "Uncommon Power Shard", rarity: "uncommon", icon: "/icons/uncommon_shard.png" },
    { name: "Rare Power Shard", rarity: "rare", icon: "/icons/rare_shard.png" },
    { name: "Epic Power Shard", rarity: "epic", icon: "/icons/epic_shard.png" },
    { name: "Legendary Power Shard", rarity: "legendary", icon: "/icons/legendary_shard.png" },

    { name: "Common Quest Scroll", rarity: "common", icon: "/icons/common_scroll.png" },
    { name: "Uncommon Quest Scroll", rarity: "uncommon", icon: "/icons/uncommon_scroll.png" },
    { name: "Rare Quest Scroll", rarity: "rare", icon: "/icons/rare_scroll.png" },
    { name: "Epic Quest Scroll", rarity: "epic", icon: "/icons/epic_scroll.png" },
    { name: "Legendary Quest Scroll", rarity: "legendary", icon: "/icons/legendary_scroll.png" },

    { name: "Quest Reroll Token", rarity: "uncommon", icon: "/icons/reroll_token.png" },
    { name: "Quest Refresh Token", rarity: "epic", icon: "/icons/refresh_token.png" },

    { name: "Common Relic Blueprint", rarity: "common", icon: "/icons/common_blueprint.png" },
    { name: "Uncommon Relic Blueprint", rarity: "uncommon", icon: "/icons/uncommon_blueprint.png" },
    { name: "Rare Relic Blueprint", rarity: "rare", icon: "/icons/rare_blueprint.png" },
    { name: "Epic Relic Blueprint", rarity: "epic", icon: "/icons/epic_blueprint.png" },
    { name: "Legendary Relic Blueprint", rarity: "legendary", icon: "/icons/legendary_blueprint.png" },

    { name: "Common Glimmering Relic Blueprint", rarity: "common", icon: "/icons/common_glimmering.png" },
    { name: "Uncommon Glimmering Relic Blueprint", rarity: "uncommon", icon: "/icons/uncommon_glimmering.png" },
    { name: "Rare Glimmering Relic Blueprint", rarity: "rare", icon: "/icons/rare_glimmering.png" },
    { name: "Epic Glimmering Relic Blueprint", rarity: "epic", icon: "/icons/epic_glimmering.png" },
    { name: "Legendary Glimmering Relic Blueprint", rarity: "legendary", icon: "/icons/legendary_glimmering.png" },

    { name: "Natural Chroma Pack", rarity: "rare", icon: "/icons/natural_chroma.png" },
    { name: "Oceanic Chroma Pack", rarity: "rare", icon: "/icons/oceanic_chroma.png" },
    { name: "Mechanical Chroma Pack", rarity: "rare", icon: "/icons/mechanical_chroma.png" },
    { name: "Magical Chroma Pack", rarity: "rare", icon: "/icons/magical_chroma.png" },
    { name: "Prismatic Chroma Pack", rarity: "legendary", icon: "/icons/prismatic_chroma.gif" },

    { name: "Natural Material Crate", rarity: "rare", icon: "/openables/natural.png" },
    { name: "Oceanic Material Crate", rarity: "rare", icon: "/openables/oceanic.png" },
    { name: "Mechanical Material Crate", rarity: "rare", icon: "/openables/mechanical.png" },
    { name: "Magical Material Crate", rarity: "rare", icon: "/openables/magical.png" },

    { name: "Coins", rarity: "common", icon: "https://cdn.islandstats.xyz/icons/currency/coin.png" },
    { name: "Silver", rarity: "common", icon: "https://cdn.islandstats.xyz/icons/currency/silver.png" },
    { name: "Material Dust", rarity: "common", icon: "https://cdn.islandstats.xyz/icons/currency/material_dust.png" },

    // magical
    { name: "Foggy Crystal", rarity: "common", icon: "/icons/magical_common.png" },
    { name: "Jade Eye", rarity: "uncommon", icon: "/icons/magical_uncommon.png" },
    { name: "Frigid Sapphire", rarity: "rare", icon: "/icons/magical_rare.png" },
    { name: "Amethyst Tablet", rarity: "epic", icon: "/icons/magical_epic.png" },
    { name: "Crystallized Sunset", rarity: "legendary", icon: "/icons/magical_legendary.png" },

    // oceanic
    { name: "Bland Water", rarity: "common", icon: "/icons/oceanic_common.png" },
    { name: "Seaweed Goo", rarity: "uncommon", icon: "/icons/oceanic_uncommon.png" },
    { name: "Deep Brine", rarity: "rare", icon: "/icons/oceanic_rare.png" },
    { name: "Virulent Vial", rarity: "epic", icon: "/icons/oceanic_epic.png" },
    { name: "Bottled Sunrise", rarity: "legendary", icon: "/icons/oceanic_legendary.png" },

    // mechanical
    { name: "Iron Bolt", rarity: "common", icon: "/icons/mechanical_common.png" },
    { name: "Copper Chunk", rarity: "uncommon", icon: "/icons/mechanical_uncommon.png" },
    { name: "Cobalt Rod", rarity: "rare", icon: "/icons/mechanical_rare.png" },
    { name: "Titanium Plate", rarity: "epic", icon: "/icons/mechanical_epic.png" },
    { name: "Solarflame Bar", rarity: "legendary", icon: "/icons/mechanical_legendary.png" },

    // natural
    { name: "Pale Bloom", rarity: "common", icon: "/icons/nature_common.png" },
    { name: "Verdant Moss", rarity: "uncommon", icon: "/icons/nature_uncommon.png" },
    { name: "Sky Poppy", rarity: "rare", icon: "/icons/nature_rare.png" },
    { name: "Nightshade Lily", rarity: "epic", icon: "/icons/nature_epic.png" },
    { name: "Sparkling Sunflower", rarity: "legendary", icon: "/icons/nature_legendary.png" }
];

export function openTreasure(type, amount) {
    const rewardPools = openables.find(openable => openable.crate === "treasure" && openable.type === type).rewards;
    let rewards = [];
    // open the given amount of chests
    for (let i = 0; i < amount; i++) {
        // roll three times per chest
        for (let i = 0; i < 3; i++) {
            // generated a random number to choose the reward pool
            const poolRandom = Math.random() * 100;
            let poolTotal = 0;
            // loop through the pools, adding the chance of each pool to the total
            for (const pool of rewardPools) {
                // if the random number is less than the total chance so far plus the chance of the current pool, choose this pool
                if (poolRandom <= poolTotal + pool.chance) {
                    // generate a random number to choose the reward from the pool
                    const rewardRandom = Math.random() * 100;
                    let rewardTotal = 0;
                    // loop through the rewards, adding the chance of each reward to the total
                    for (const reward of pool.rewards) {
                        // if the random number is less than the total chance so far plus the chance of the current reward, choose this reward
                        if (rewardRandom <= rewardTotal + reward.chance) {
                            // if the reward already exists in the list, add the amount to the existing reward
                            if (rewards.find(r => r.item === reward.reward)) {
                                rewards.find(r => r.item === reward.reward).amount += reward.amount;
                                break;
                            // otherwise, create a new entry for the new reward
                            } else {
                                let chanceOfReward = 0;
                                for (let dupeReward of pool.rewards.filter(r => r.reward === reward.reward)) {
                                    chanceOfReward += 3 * (pool.chance / 100) * (dupeReward.chance / 100) * dupeReward.amount;
                                }
                                rewards.push({ item: reward.reward, amount: reward.amount, average: chanceOfReward });
                                break;
                            }
                        }
                        // add the chance of the reward to the total
                        rewardTotal += reward.chance;
                    }
                    break;
                }
                // add the chance of the pool to the total
                poolTotal += pool.chance;
            }
        }
    }
    return rewards;
}

export function openReward(type, amount) {
    const possibleRewards = openables.find(openable => openable.crate === "reward" && openable.type === type).rewards;
    let rewards = [];
    for (let i = 0; i < amount; i++) {
        for (const reward of possibleRewards) {
            if (reward.currency) {
                if (rewards.find(r => r.item === reward.name)) {
                    rewards.find(r => r.item === reward.name).amount += Math.floor(Math.random() * (reward.pool[1] - reward.pool[0] + 1) + reward.pool[0]);
                } else {
                    rewards.push({ item: reward.name, amount: Math.floor(Math.random() * (reward.pool[1] - reward.pool[0] + 1) + reward.pool[0]), average: reward.pool[1] - ((reward.pool[1] - reward.pool[0]) / 2) });
                }
            } else {
                const random = Math.random() * 100;
                if (random <= reward.chance) {
                    const rewardRandom = Math.random() * 100;
                    let rewardTotal = 0;
                    for (const choice of reward.rewards) {
                        if (rewardRandom <= rewardTotal + choice.chance) {
                            if (rewards.find(r => r.item === choice.reward)) {
                                rewards.find(r => r.item === choice.reward).amount += choice.amount;
                                break;
                            } else {
                                rewards.push({ item: choice.reward, amount: choice.amount, average: (reward.chance / 100) * (choice.chance / 100) });
                                break;
                            }
                        }
                        rewardTotal += choice.chance;
                    }
                }
            }
        }
    }
    return rewards;
}

export function openMaterial(type, amount) {
    const possibleRewards = openables.find(openable => openable.crate === "material" && openable.type === type).rewards;
    let rewards = [];
    for (let i = 0; i < amount; i++) {
        const materialDust = Math.floor(Math.random() * (100 - 50 + 1) + 50);
        if (rewards.find(r => r.item === "Material Dust")) {
            rewards.find(r => r.item === "Material Dust").amount += materialDust
        } else {
            rewards.push({ item: "Material Dust", amount: materialDust, average: 75 });
        }

        for (let j = 0; j < 7; j++) {
            for (const reward of possibleRewards) {
                const rewardRandom = Math.random() * 100;
                let rewardTotal = 0;
                for (const choice of reward.pool) {
                    if (rewardRandom <= rewardTotal + choice.chance) {
                        if (rewards.find(r => r.item === choice.name)) {
                            rewards.find(r => r.item === choice.name).amount += choice.amount;
                            break;
                        } else {
                            rewards.push({ item: choice.name, amount: choice.amount, average: 7 * (reward.chance / 100) * (choice.chance / 100) * choice.amount });
                            break;
                        }
                    }
                    rewardTotal += choice.chance;
                }
            }
        }

        const shardChance = Math.random() * 10;
        if (shardChance < 2) {
            let shard = null;
            const shardRandom = Math.random() * 100;
            if (shardRandom <= 65) {
                shard = "Common Power Shard";
            } else if (shardRandom <= 95) {
                shard = "Uncommon Power Shard";
            } else {
                shard = "Rare Power Shard";
            }

            if (rewards.find(r => r.item === shard)) {
                rewards.find(r => r.item === shard).amount += 1;
            } else {
                rewards.push({ item: shard, amount: 1, average: 0.1 });
            }
        }
    }
    return rewards;
}