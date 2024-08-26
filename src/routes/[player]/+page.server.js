import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const allowedPages = ['leaderboards', 'compare', 'leagues', 'discord', 'api', 'link', 'simulator'];
    if (!allowedPages.includes(params.player) && !params.player.includes(".")) {
        throw redirect(301, `/player/${params.player}`);
    }
}