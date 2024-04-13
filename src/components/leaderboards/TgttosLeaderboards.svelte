<script>
    import Leaderboard from "./Leaderboard.svelte";
    import { badges } from "$lib/data.js";

    export let players;

    let stats = [
        { name: "Game Wins", value: "first_place" },
        { name: "Game Losses", value: "game_losses" },
        { name: "Game WLR", value: "game_wlr" },
        { name: "Round Wins", value: "round_first_place" },
        { name: "Round Losses", value: "round_losses" },
        { name: "Round WLR", value: "round_wlr" },
        { name: "Kills", value: "kills" },
        { name: "Deaths", value: "deaths" },
        { name: "KDR", value: "kdr" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
        {#each stats as stat}
            <Leaderboard game="tgttos" isBadge={false} stat={stat.value} name={stat.name} leaderboard={players} />
        {/each}
        {#each badges.tgttos as badge}
            <Leaderboard game="tgttos" isBadge={true} badge={badge} leaderboard={players} />
        {/each}
    </div>
</div>