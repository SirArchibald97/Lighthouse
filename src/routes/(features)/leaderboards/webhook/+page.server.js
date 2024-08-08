import db from "$lib/db.js";

export const actions = {
    add: async ({ request }) => {
        const form = await request.formData();
        const webhook = await form.get("webhook");
        const option = JSON.parse(await form.get("option"));
        if (!webhook) return { success: false, message: "No Webhook URL" };

        const result = await db.collection("leaderboard_webhooks").findOne({ url: webhook });
        try {
            const res = await fetch(webhook + "?wait=true", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: "Webhook created, stand by for updates!" }),
            });
            const data = await res.json();
            await db.collection("leaderboard_webhooks").updateOne({ url: webhook },
                {
                    $set: {
                        url: webhook,
                        leaderboards: result?.leaderboards 
                            ? [...result.leaderboards, { message: data.id, stat: option.display || option.stat, embed: {} }] 
                            : [{ message: data.id, stat: option.display || option.stat, embed: {} }],
                    },
                },
                { upsert: true }
            );
            return { success: true }
        } catch (err) {
            console.error(err);
            return { success: false, message: "Failed to send webhook to that URL!" };
        }
    },
}