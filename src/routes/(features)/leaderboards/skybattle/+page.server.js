import { DEV, SAD_API_KEY } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export async function load() {
    const res = await fetch(`${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/islandstats/leaderboard/sky_battle.quads`, {
        method: "get",
        headers: { "Content-Type": "application/json", "Accept": "application/json", "auth": SAD_API_KEY }
    });
    const { leaderboard } = await res.json();
    return { players: leaderboard };
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