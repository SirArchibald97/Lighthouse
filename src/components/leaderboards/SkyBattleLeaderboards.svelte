<script>
    import Leaderboard from "./Leaderboard.svelte";
    import { badges } from "$lib/data.js";

    export let players;

    let stats = [
        { name: "Individual Wins", value: "solo_first_place" },
        { name: "Individual Losses", value: "solo_losses" },
        { name: "Individual WLR", value: "solo_wlr" },
        { name: "Team Wins", value: "team_first_place" },
        { name: "Team Losses", value: "team_losses" },
        { name: "Team WLR", value: "team_wlr" },
        { name: "Kills", value: "kills" },
        { name: "Deaths", value: "deaths" },
        { name: "KDR", value: "kdr" },
        { name: "Chests Looted", value: "chests_looted" },
        { name: "Golden Chests Looted", value: "golden_chests_looted" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
        {#each stats as stat}
            <Leaderboard game="sky_battle.quads" isBadge={false} stat={stat.value} name={stat.name} leaderboard={players} />
        {/each}
        {#each badges.sky_battle as badge}
            <Leaderboard game="sky_battle.quads" isBadge={true} badge={badge} leaderboard={players} />
        {/each}
    </div>
</div>