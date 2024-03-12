import { error, redirect } from '@sveltejs/kit';
import { API_KEY } from "$env/static/private";
import { getPlayer } from "$lib/query.js";
import { formatUUID, getRankIcon } from "$lib/utils.js";

export async function load({ params }) {
    const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${params.username}`);
    const { id } = await mj_res.json();
    if (!id) throw error(404);
    
    const query = getPlayer.replace("%%UUID%%", await formatUUID(id));
    const api_res = await fetch("https://api.mccisland.net/graphql", {
        headers: { "Content-Type": "application/json", "X-API-Key": `${API_KEY}` },
        method: "POST",
        body: JSON.stringify({ query })
    });
    const { data: { player }} = await api_res.json();

    if (player) {
        return { uuid: id, player, rank: getRankIcon(player.ranks) };
    } else return { success: false, player: {} };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");
        throw redirect(301, `/player/${username}`);
    }
}