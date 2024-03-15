import { SAD_API_KEY, DEV } from "$env/static/private";
import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

export async function load() {
    // fetch top 4 most searched username's from the database
    const topRequests = await db.collection("requests").find({ username: { $ne: "SirArchibald97" } }).sort({ requests_current: -1 }).limit(4).toArray();

    const profiles = [];
    if (topRequests.length === 0) return { profiles: [] };
    for (let request of topRequests) {
        // fetch player data from the MCC Island API
        const res = await fetch(`${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/islandstats/${request.uuid}`, { headers: { "auth": `${SAD_API_KEY}` } });
        const { player } = await res.json();
        if (player) profiles.push({ uuid: request.uuid, username: request.username, player: player });
    }
    return { profiles };
}

export const actions = {
    // redirects to the provided player's profile page
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    }
}