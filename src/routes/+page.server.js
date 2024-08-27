import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

export async function load({ cookies }) {
    // fetch top 4 most searched username's from the database
    const profiles = [];
    const topRequests = await db.collection("requests").find({ username: { $ne: "SirArchibald97" } }).sort({ requests: -1 }).limit(7).toArray();
    if (topRequests.length === 0) return { profiles: [] };
    for (let entry of topRequests) {
        const player = await db.collection("players").findOne({ uuid: entry.uuid });
        if (player) profiles.push({ uuid: player.player.uuid, username: player.player.username, player: player.player });
    }

    const user = cookies.get("user") ? JSON.parse(cookies.get("user")) : null;
    return { profiles, user };
}

export const actions = {
    // redirects to the provided player's profile page
    lookup: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    },
}