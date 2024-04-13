import { redirect } from "@sveltejs/kit";

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

    bbleaderboards: async () => { throw redirect(301, "/leaderboards/battlebox"); },
    sbleaderboards: async () => { throw redirect(301, "/leaderboards/skybattle"); },
    tgttosleaderboards: async () => { throw redirect(301, "/leaderboards/tgttos"); },
    hitwleaderboards: async () => { throw redirect(301, "/leaderboards/hitw"); },
    dynaballleaderboards: async () => { throw redirect(301, "/leaderboards/dynaball"); },
    dojoleaderboards: async () => { throw redirect(301, "/leaderboards/dojo"); },
    survivorleaderboards: async () => { throw redirect(301, "/leaderboards/survivor"); },
    miscleaderboards: async () => { throw redirect(301, "/leaderboards/misc"); },
}