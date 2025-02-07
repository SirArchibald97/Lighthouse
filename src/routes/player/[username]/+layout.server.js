import { redirect } from '@sveltejs/kit';
import { SAD_API_KEY, DEV_MODE } from "$env/static/private";
import { formatUUID } from "$lib/utils.js";

export async function load({ params, cookies }) {
    // check username is an existing Minecraft account
    const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${params.username}`);
    const { id, name } = await mj_res.json();
    if (!id) return { success: false, player: {} };
    if (params.username !== name) throw redirect(301, `/player/${name}`);
    
    return fetchPlayer(cookies, await formatUUID(id), name);
}

async function fetchPlayer(cookies, uuid, name) {
    // fetch player data from the MCC Island API
    const res = await fetch(`${DEV_MODE === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/lighthouse/player/${uuid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Accept": "application/json", "auth": `${SAD_API_KEY}` },
    });
    const data = await res.json();
    const player = data?.player || null;

    if (player) {
        //const user = cookies.get("user") ? JSON.parse(cookies.get("user")) : null;
        return { success: data.success, player };
    } else {
        return { success: false };
    }
}