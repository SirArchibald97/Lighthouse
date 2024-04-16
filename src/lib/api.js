import { redirect } from "@sveltejs/kit";
import { PUBLIC_DISCORD_OAUTH_URL } from "$env/static/public";

export function login() {
    redirect(301, PUBLIC_DISCORD_OAUTH_URL);
}