<script>
    import Footer from "$lib/components/Footer.svelte";
    import Leaderboard from "$lib/components/Leaderboard.svelte";
    import { badges } from "$lib/badges.js";

    export let data;

    let stats = [
        { name: "Wins", value: "statistics.rocket_spleef.first_place" },
        { name: "Losses", value: "statistics.rocket_spleef.losses" },
        { name: "WLR", value: "statistics.rocket_spleef.wlr" },
        { name: "Kills", value: "statistics.rocket_spleef.kills" },
        { name: "Deaths", value: "statistics.rocket_spleef.deaths" },
        { name: "KDR", value: "statistics.rocket_spleef.kdr" },
        { name: "Melee Kills", value: "statistics.rocket_spleef.melee_kills" },
        { name: "Players Outlived", value: "statistics.rocket_spleef.players_outlived" },
        { name: "Rockets Fired", value: "statistics.rocket_spleef.rockets_fired" },
        { name: "Rockets Hit", value: "statistics.rocket_spleef.rockets_hit" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the game Rocket Spleef Rush on the MCC Island Minecraft server" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="flex flex-row justify-between mt-6 mx-4 sm:mx-44">
        <a href="/leaderboards" class="flex-none px-3 border-2 border-slate-300 py-1 bg-white rounded-md hover:bg-slate-100 hover:scale-105 duration-100 self-center">Go Back</a>
        <div class="flex flex-row gap-x-2 self-center flex-grow justify-center">
            <img src="https://cdn.islandstats.xyz/games/rocket_spleef/icon.png" alt="Rocket Spleef Rush Icon" class="w-12 h-12 self-center" />
            <p class="text-center text-3xl font-semibold self-center">Rocket Spleef Rush Leaderboards</p>
        </div>
    </div>

    <div class="flex flex-col mb-8 gap-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
            {#each stats as stat}
                <Leaderboard name={stat.name} stat={stat.value} display={stat.display || null} players={data.players} />
            {/each}
            {#each badges.rocket_spleef as badge}
                <Leaderboard name={badge.name} stat={badge.stat.startsWith("!") ? `statistics.rocket_spleef.${badge.stat.slice(1, badge.stat.length)}` : `statistics.rocket_spleef.badges.${badge.stat}`} players={data.players} badge={badge} game="rocket_spleef" />
            {/each}
        </div>
    </div>
</div>

<Footer absolute={false} />