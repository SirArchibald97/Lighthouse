import { error, redirect } from '@sveltejs/kit';
import { API_KEY } from "$env/static/private";
import { getPlayer } from "$lib/query.js";
import { formatUUID } from "$lib/utils.js";
import { playerData } from '$lib/stores.js';
import { getRankIcon } from '../../../lib/utils.js';

export async function load({ params }) {
    return {
        uuid: "19f9fd28-558c-4959-98c2-fb1a18bed0a1",
        player: {
            username: "SirArchibald97",
            ranks: ["MODERATOR", "GRAND_CHAMP"],
            status: { online: false },
            party: { active: false, members: [] },
            friends: [
                { 
                    uuid: "75f4dd93-f1d2-4e1a-88ab-736b6e6547ab",
                    username: "Feferi",
                    ranks: ["MODERATOR", "GRAND_CHAMP", "GRAND_CHAMP_ROYALE"],
                    status: { online: false }
                },
                { 
                    uuid: "75f4dd93-f1d2-4e1a-88ab-736b6e6547ab",
                    username: "Feferi",
                    ranks: ["MODERATOR", "GRAND_CHAMP", "GRAND_CHAMP_ROYALE"],
                    status: { online: false }
                },
                { 
                    uuid: "75f4dd93-f1d2-4e1a-88ab-736b6e6547ab",
                    username: "Feferi",
                    ranks: ["MODERATOR", "GRAND_CHAMP", "GRAND_CHAMP_ROYALE"],
                    status: { online: false }
                },
                { 
                    uuid: "75f4dd93-f1d2-4e1a-88ab-736b6e6547ab",
                    username: "Feferi",
                    ranks: ["MODERATOR", "GRAND_CHAMP", "GRAND_CHAMP_ROYALE"],
                    status: { online: false }
                }
            ],
            currency: {
                coins: 1000,
                gems: 10,
                silver: 0,
                materialDust: 0
            }
        }   
    }

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
        console.log(username);

        throw redirect(301, `/player/${username}`);
    }
}