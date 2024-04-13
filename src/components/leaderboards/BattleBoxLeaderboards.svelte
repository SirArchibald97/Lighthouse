<script>
    import Leaderboard from "./Leaderboard.svelte";
    import { badges } from "$lib/data.js";

    export let players;

    let stats = [
        { name: "Wins", value: "team_first_place" },
        { name: "Losses", value: "team_losses" },
        { name: "WLR", value: "team_wlr" },
        { name: "Kills", value: "kills" },
        { name: "Deaths", value: "deaths" },
        { name: "KDR", value: "kdr" },
        { name: "Rounds Won", value: "rounds_won" }
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
        {#each stats as stat}
            <Leaderboard game="battle_box" isBadge={false} stat={stat.value} name={stat.name} leaderboard={players} />
        {/each}
        {#each badges.battle_box as badge}
            <Leaderboard game="battle_box" isBadge={true} badge={badge} leaderboard={players} />
        {/each}
    </div>
</div>