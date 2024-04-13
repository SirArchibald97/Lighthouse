<script>
    import Leaderboard from "./Leaderboard.svelte";
    import { badges } from "$lib/data.js";

    export let players;

    let stats = [
        { name: "Unique Medals", value: "unique_medals" },
        { name: "Total Medals", value: "total_medals" },
        { name: "Unique Standards", value: "unique_standard" },
        { name: "Unique Advanced", value: "unique_advanced" },
        { name: "Unique Experts", value: "unique_expert" },
        { name: "Total Standards", value: "total_standard" },
        { name: "Total Advanced", value: "total_advanced" },
        { name: "Total Experts", value: "total_expert" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
        {#each stats as stat}
            <Leaderboard game="pkw.dojo" isBadge={false} stat={stat.value} name={stat.name} leaderboard={players} />
        {/each}
        {#each badges.dojo_tiered as badge}
            <Leaderboard game="pkw.dojo" isBadge={false} badge={badge} leaderboard={players} />
        {/each}
    </div>
</div>