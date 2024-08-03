import db from "$lib/db.js";
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const user = JSON.parse(cookies.get("user") || "{}");
    if (!user.discord_id) {
        return { loggedIn: false }
    } 

    const result = await db.collection("accounts").findOne({ discord_id: user.discord_id });
    if (result?.minecraft) {
        return { loggedIn: true, linked: true, account: result.minecraft };
    } else {
        return { loggedIn: true, linked: false };
    }
}

export const actions = {
    link: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = await data.get("username");
        if (username.length < 3 || username.length > 16) {
            return { error: "Invalid username" };
        }

        const user = JSON.parse(cookies.get("user") || "{}");
        if (!user.discord_id) {
            throw redirect(301, "/");
        }

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { id, name } = await mj_res.json();
        await db.collection("accounts").updateOne({ discord_id: user.discord_id }, { $set: { minecraft: { uuid: id, username: name } } });
        const result = await db.collection("accounts").findOne({ discord_id: user.discord_id });

        cookies.set("user", JSON.stringify(result), { path: "/" });
        
        throw redirect(301, "/");
    },

    lookup: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    },
}