import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const allowedPages = ['leaderboards', 'compare', 'leagues', 'discord'];
    if (!allowedPages.includes(params.player)) {
        throw redirect(301, `/player/${params.player}`);
    }
}