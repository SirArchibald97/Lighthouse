<script>
    import Leaderboard from "./Leaderboard.svelte";
    import { badges } from "$lib/data.js";

    export let players;

    let stats = [
        { name: "Wins", value: "wins" },
        { name: "Losses", value: "losses" },
        { name: "WLR", value: "wlr" },
        { name: "Players Outlived", value: "kills" },
        { name: "Obstacles Completed", value: "obstacles" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
        {#each stats as stat}
            <Leaderboard game="pkw.survivor" isBadge={false} stat={stat.value} name={stat.name} leaderboard={players} />
        {/each}
        {#each badges.survivor_tiered as badge}
            <Leaderboard game="pkw.survivor" isBadge={false} badge={badge} leaderboard={players} />
        {/each}
    </div>
</div>