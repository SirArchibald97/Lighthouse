import db from "$lib/db.js";
import { redirect } from '@sveltejs/kit';
import { DISCORD_REDIRECT_URI, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';

export async function load({ url, cookies }) {
    const code = url.searchParams.get('code');
    if (!code) throw redirect(301, "/");

    const authRes = await fetch(`https://discord.com/api/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code || "",
            redirect_uri: DISCORD_REDIRECT_URI,
            scope: 'identify email guilds guilds.join',
        }),
    });
    const { access_token } = await authRes.json();

    const userRes = await fetch(`https://discord.com/api/users/@me`, { headers: { Authorization: `Bearer ${access_token}` } });
    const user = await userRes.json();
    
    const result = await db.collection("accounts").findOne({ discord_id: user.id });
    if (!result) {
        console.log("Creating account...")
        await db.collection("accounts").insertOne({ discord_id: user.id });
        cookies.set("user", JSON.stringify({ discord_id: user.id }), { path: "/", maxAge: 60 * 60 * 24 * 30 });
        throw redirect(301, "/link");
    } else if (!result.minecraft) {
        console.log("Redirecting to link...")
        cookies.set("user", JSON.stringify({ discord_id: user.id }), { path: "/", maxAge: 60 * 60 * 24 * 30 });
        throw redirect(301, "/link");
    } else {
        console.log("Redirecting to home...")
        cookies.set("user", JSON.stringify(result), { path: "/", maxAge: 60 * 60 * 24 * 30 });
        throw redirect(301, "/");
    }
}