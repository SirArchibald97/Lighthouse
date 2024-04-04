import { SAD_API_KEY, DEV } from "$env/static/private";
import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

export async function load({ cookies }) {
    // fetch top 4 most searched username's from the database
    const topRequests = await db.collection("requests").find({ username: { $ne: "SirArchibald97" } }).sort({ requests: -1 }).limit(4).toArray();

    const profiles = [];
    if (topRequests.length === 0) return { profiles: [] };

    const uuids = topRequests.map(request => request.uuid);
    const res = await fetch(`${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/islandstats/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json", "auth": `${SAD_API_KEY}` },
        body: JSON.stringify({ uuids })
    });
    const { players } = await res.json();
    for (let player of players) {
        profiles.push({ uuid: player.uuid, username: player.username, player: player })
    }

    const favourites = cookies.get("favourites") ? JSON.parse(cookies.get("favourites")) : [];

    return { profiles, favourites };
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