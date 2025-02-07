import { redirect } from "@sveltejs/kit";
import db from "$lib/db.js";
import { games } from "$lib/leaderboards.js";

export async function load({ params }) {
    const game = games.find(g => g.name === params.game);
    if (!game) return { game: null, players: [] };
    return { game: game, players: await getLeaderboard(game) };
}

async function getLeaderboard(game) {
    const fields = { uuid: 1, "player.username": 1, "player.ranks": 1 };
    for (let stat of game.stats) fields[stat] = 1;

    let players = [];
    if (game.name === "trophies") {
        players = await db.collection("players")
        .find({})
        .project(fields)
        .toArray();
    } else {
        players = await db.collection("players")
        .find({ "player.statistics": { $exists: true } })
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