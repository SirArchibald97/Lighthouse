<script>
    import Footer from "$lib/components/Footer.svelte";
    import Leaderboard from "$lib/components/Leaderboard.svelte";
    import { badges } from "$lib/badges.js";

    export let data;

    let stats = [
        { name: "Wins", value: "statistics.dynaball.wins" },
        { name: "Losses", value: "statistics.dynaball.losses" },
        { name: "WLR", value: "statistics.dynaball.wlr" },
        { name: "Players Stuck", value: "statistics.dynaball.players_stuck" },
        { name: "Spawners Broken", value: "statistics.dynaball.spawners_destroyed" },
        { name: "Blocks Destroyed", value: "statistics.dynaball.blocks_destroyed" },
        { name: "Blocks Placed", value: "statistics.dynaball.blocks_placed" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="flex flex-col-reverse gap-y-4 sm:flex-row justify-between mt-6 mx-4 sm:mx-44">
        <a href="/leaderboards" class="flex-none px-3 border-2 border-slate-300 py-1 bg-white rounded-md hover:bg-slate-100 hover:scale-105 duration-100 self-center">Go Back</a>
        <div class="flex flex-row gap-x-3 self-center flex-grow justify-center">
            <img src="https://cdn.islandstats.xyz/games/dynaball/icon.png" alt="Dynaball Logo" class="w-8 h-8 sm:w-12 sm:h-12 self-center" />
            <p class="text-center text-2xl sm:text-3xl font-semibold self-center">Dynaball Leaderboards</p>
        </div>
    </div>

    <div class="flex flex-col mb-8 gap-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
            {#each stats as stat}
                <Leaderboard name={stat.name} stat={stat.value} players={data.players} />
            {/each}
            {#each badges.dynaball as badge}
                <Leaderboard name={badge.name} stat={`statistics.dynaball.badges.${badge.stat}`} players={data.players} badge={badge} game="dynaball" />
            {/each}
        </div>
    </div>
</div>

<Footer absolute={false} />