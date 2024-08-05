import { redirect } from "@sveltejs/kit";
import db from "$lib/db.js";
import { badges } from "$lib/badges.js";

const games = {
    "trophies": {
        stats: ["player.level", "player.trophies"], title: "Trophy", icon: "https://cdn.islandstats.xyz/icons/trophies/yellow.png",
        boards: [
            { name: "Crown Level", stat: "trophies.total", display: "level", icon: "https://cdn.islandstats.xyz/icons/crowns/1.png" },
            { name: "Total Trophies", stat: "trophies.total", icon: "https://cdn.islandstats.xyz/icons/trophies/yellow.png" },
            { name: "Skill Trophies", stat: "trophies.skill.total", icon: "https://cdn.islandstats.xyz/icons/trophies/red.png" },
            { name: "Style Trophies", stat: "trophies.style.total", icon: "https://cdn.islandstats.xyz/icons/trophies/purple.png" },
            { name: "Bonus Trophies", stat: "trophies.bonus", icon: "https://cdn.islandstats.xyz/icons/trophies/silver.png" }
        ]
    },
    "battlebox": { 
        stats: ["player.statistics.battle_box"], title: "Battle Box", icon: "https://cdn.islandstats.xyz/games/battle_box/icon.png",
        boards: [
            { name: "Solo Wins", stat: "statistics.battle_box.solo_first_place" },
            { name: "Solo Losses", stat: "statistics.battle_box.solo_losses" },
            { name: "Solo WLR", stat: "statistics.battle_box.solo_wlr", ratio: "statistics.battle_box.games_played" },
            { name: "Team Wins", stat: "statistics.battle_box.team_first_place" },
            { name: "Team Losses", stat: "statistics.battle_box.team_losses" },
            { name: "Team WLR", stat: "statistics.battle_box.team_wlr", ratio: "statistics.battle_box.games_played" },
            { name: "Kills", stat: "statistics.battle_box.kills" },
            { name: "Deaths", stat: "statistics.battle_box.deaths" },
            { name: "KDR", stat: "statistics.battle_box.kdr", ratio: "statistics.battle_box.kills" },
            { name: "Rounds Won", stat: "statistics.battle_box.rounds_won" },
            { name: "Explosive Kills", stat: "statistics.battle_box.explosive_kills" },
            { name: "Ranged Kills", stat: "statistics.battle_box.ranged_kills" },
        ]
        .concat(badges.battle_box.map(b => { return { name: b.name, stat: `statistics.battle_box.badges.${b.stat}`, icon: `https://cdn.islandstats.xyz/badges/battle_box/${b.icon}.png`, tooltip: b.description } }))
    },
    "skybattle": { 
        stats: ["player.statistics.sky_battle"], title: "Sky Battle", icon: "https://cdn.islandstats.xyz/games/sky_battle/icon.png",
        boards: [
            { name: "Solo Wins", stat: "statistics.sky_battle.quads.solo_first_place" },
            { name: "Solo Losses", stat: "statistics.sky_battle.quads.solo_losses" },
            { name: "Solo WLR", stat: "statistics.sky_battle.quads.solo_wlr", ratio: "statistics.sky_battle.quads.games_played" },
            { name: "Team Wins", stat: "statistics.sky_battle.quads.team_first_place" },
            { name: "Team Losses", stat: "statistics.sky_battle.quads.team_losses" },
            { name: "Team WLR", stat: "statistics.sky_battle.quads.team_wlr", ratio: "statistics.sky_battle.quads.games_played" },
            { name: "Kills", stat: "statistics.sky_battle.quads.kills" },
            { name: "Deaths", stat: "statistics.sky_battle.quads.deaths" },
            { name: "KDR", stat: "statistics.sky_battle.quads.kdr", ratio: "statistics.sky_battle.quads.kills" },
            { name: "Chests Looted", stat: "statistics.sky_battle.quads.chests_looted" },
            { name: "Explosive Kills", stat: "statistics.sky_battle.quads.explosive_kills" },
            { name: "Ranged Kills", stat: "statistics.sky_battle.quads.ranged_kills" },
        ]
        .concat(badges.sky_battle.map(b => { return { name: b.name, stat: `statistics.sky_battle.quads.badges.${b.stat}`, icon: `https://cdn.islandstats.xyz/badges/sky_battle/${b.icon}.png`, tooltip: b.description } }))
    },
    "tgttos": { 
        stats: ["player.statistics.tgttos"], title: "TGTToS", icon: "https://cdn.islandstats.xyz/games/tgttos/icon.png",
        boards: [
            { name: "Wins", stat: "statistics.tgttos.first_place" },
            { name: "Losses", stat: "statistics.tgttos.game_losses" },
            { name: "WLR", stat: "statistics.tgttos.game_wlr", ratio: "statistics.tgttos.games_played" },
            { name: "Round Wins", stat: "statistics.tgttos.round_first_place" },
            { name: "Round Losses", stat: "statistics.tgttos.round_losses" },
            { name: "Round WLR", stat: "statistics.tgttos.round_wlr", ratio: "statistics.tgttos.games_played" },
            { name: "Chickens Punched", stat: "statistics.tgttos.chickens_punched" },
        ]
        .concat(badges.tgttos.map(b => { return { name: b.name, stat: `statistics.tgttos.badges.${b.stat}`, icon: `https://cdn.islandstats.xyz/badges/tgttos/${b.icon}.png`, tooltip: b.description } }))
    },
    "hitw": {
        stats: ["player.statistics.hitw"], title: "Hole in the Wall", icon: "https://cdn.islandstats.xyz/games/hitw/icon.png",
        boards: [
            { name: "Wins", stat: "statistics.hitw.first_place" },
            { name: "Losses", stat: "statistics.hitw.losses" },
            { name: "WLR", stat: "statistics.hitw.wlr", ratio: "statistics.hitw.games_played" },
            { name: "Walls Dodged", stat: "statistics.hitw.walls_dodged" },
            { name: "Players Outlived", stat: "statistics.hitw.players_outlived" },
        ]
        .concat(badges.hitw.map(b => { return { name: b.name, stat: `statistics.hitw.badges.${b.stat}`, icon: `https://cdn.islandstats.xyz/badges/hitw/${b.icon}.png`, tooltip: b.description } }))
    },
    "dynaball": {
        stats: ["player.statistics.dynaball"], title: "Dynaball", icon: "https://cdn.islandstats.xyz/games/dynaball/icon.png",
        boards: [
            { name: "Wins", stat: "statistics.dynaball.wins" },
            { name: "Losses", stat: "statistics.dynaball.losses" },
            { name: "WLR", stat: "statistics.dynaball.wlr", ratio: "statistics.dynaball.games_played" },
            { name: "Players Stuck", stat: "statistics.dynaball.players_stuck" },
            { name: "Spawners Broken", stat: "statistics.dynaball.spawners_destroyed" },
            { name: "Blocks Destroyed", stat: "statistics.dynaball.blocks_destroyed" },
            { name: "Blocks Placed", stat: "statistics.dynaball.blocks_placed" },
        ]
        .concat(badges.dynaball.map(b => { return { name: b.name, stat: `statistics.dynaball.badges.${b.stat}`, icon: `https://cdn.islandstats.xyz/badges/dynaball/${b.icon}.png`, tooltip: b.description } }))
    },
    "dojo": {
        stats: ["player.statistics.pkw.dojo"], title: "Dojo", icon: "https://cdn.islandstats.xyz/games/dojo/icon.png",
        boards: [
            { name: "Unique Medals", stat: "statistics.pkw.dojo.unique_medals" },
            { name: "Total Medals", stat: "statistics.pkw.dojo.total_medals" },
            { name: "Unique Standards", stat: "statistics.pkw.dojo.unique_standard" },
            { name: "Unique Advanced", stat: "statistics.pkw.dojo.unique_advanced" },
            { name: "Unique Experts", stat: "statistics.pkw.dojo.unique_expert" },
            { name: "Total Standards", stat: "statistics.pkw.dojo.total_standard" },
            { name: "Total Advanced", stat: "statistics.pkw.dojo.total_advanced" },
            { name: "Total Experts", stat: "statistics.pkw.dojo.total_expert" },
        ]
    },
    "survivor": {
        stats: ["player.statistics.pkw.survivor"], title: "Survivor", icon: "https://cdn.islandstats.xyz/games/survivor/icon.png",
        boards: [
            { name: "Wins", stat: "statistics.pkw.survivor.wins" },
            { name: "Losses", stat: "statistics.pkw.survivor.losses" },
            { name: "WLR", stat: "statistics.pkw.survivor.wlr", ratio: "statistics.pkw.survivor.games_played" },
            { name: "Players Outlived", stat: "statistics.pkw.survivor.kills" },
            { name: "Obstacles Completed", stat: "statistics.pkw.survivor.obstacles" },
        ]
    },
    "rsr": {
        stats: ["player.statistics.rocket_spleef"], title: "Rocket Spleef", icon: "https://cdn.islandstats.xyz/games/rocket_spleef/icon.png",
        boards: [
            { name: "Wins", stat: "statistics.rocket_spleef.first_place" },
            { name: "Losses", stat: "statistics.rocket_spleef.losses" },
            { name: "WLR", stat: "statistics.rocket_spleef.wlr", ratio: "statistics.rocket_spleef.games_played" },
            { name: "Kills", stat: "statistics.rocket_spleef.kills" },
            { name: "Deaths", stat: "statistics.rocket_spleef.deaths" },
            { name: "KDR", stat: "statistics.rocket_spleef.kdr", ratio: "statistics.rocket_spleef.kills" },
            { name: "Melee Kills", stat: "statistics.rocket_spleef.melee_kills" },
            { name: "Players Outlived", stat: "statistics.rocket_spleef.players_outlived" },
            { name: "Rockets Fired", stat: "statistics.rocket_spleef.rockets_fired" },
            { name: "Rockets Hit", stat: "statistics.rocket_spleef.rockets_hit" },
        ]
        .concat(badges.rocket_spleef.map(b => { return { name: b.name, stat: `statistics.rocket_spleef.badges.${b.stat}`, icon: `https://cdn.islandstats.xyz/badges/rocket_spleef/${b.icon}.png`, tooltip: b.description } }))
    },
    "misc": { 
        stats: ["player.statistics", "player.collections"], title: "Miscellaneious", icon: "https://cdn.islandstats.xyz/icons/currency/royal_reputation.png",
        boards: [
            { name: "Games Played", stat: "statistics.games_played" },
            { name: "Course Contributions", stat: "statistics.community_contribution" },
            { name: "Royal Reputation", stat: "collections.currency.royalReputation", icon: "https://cdn.islandstats.xyz/icons/currency/royal_reputation.png" },
            { name: "Faction XP", stat: "statistics.faction_total_xp" },
            { name: "Game XP", stat: "statistics.faction_game_xp" },
            { name: "Quest XP", stat: "statistics.faction_quest_xp" },
            { name: "Most Coins", stat: "collections.currency.peakCoins", icon: "https://cdn.islandstats.xyz/icons/currency/coin.png" },
        ],
    }
};

export async function load({ params }) {
    if (!games[params.game]) return { game: null, players: [] };
    return { game: games[params.game], players: await getLeaderboard(params.game) };
}

async function getLeaderboard(game) {
    const fields = { uuid: 1, "player.username": 1, "player.ranks": 1 };
    for (let stat of games[game].stats) fields[stat] = 1;

    let players = [];
    if (game === "trophies") {
        players = await db.collection("players")
        .find({})
        .project(fields)
        .toArray();
    } else {
        players = await db.collection("players")
        .find({ [`player.statistics`]: { $exists: true } })
        .project(fields)
        .toArray();
    }
    for (let player of players) player._id = player._id.toString();
    return players;
}

export const actions = {
    lookup: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    },
    
    home: async () => {
        throw redirect(301, "/");
    },
}