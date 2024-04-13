<script>
    import Leaderboard from "./Leaderboard.svelte";

    export let players;

    let stats = [
        { name: "Games Played", value: "games_played" },
        { name: "Course Contributions", value: "community_contribution" },
        { name: "Faction XP", value: "faction_total_xp" },
        { name: "Game XP", value: "faction_game_xp" },
        { name: "Quest XP", value: "faction_quest_xp" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
        {#each stats as stat}
            <Leaderboard game="" isBadge={false} stat={stat.value} name={stat.name} leaderboard={players} />
        {/each}
    </div>
</div>