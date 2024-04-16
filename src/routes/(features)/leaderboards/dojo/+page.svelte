<script>
    import Footer from "$lib/components/Footer.svelte";
    import Leaderboard from "$lib/components/leaderboards/Leaderboard.svelte";

    export let data;

    let stats = [
        { name: "Unique Medals", value: "statistics.pkw.dojo.unique_medals" },
        { name: "Total Medals", value: "statistics.pkw.dojo.total_medals" },
        { name: "Unique Standards", value: "statistics.pkw.dojo.unique_standard" },
        { name: "Unique Advanced", value: "statistics.pkw.dojo.unique_advanced" },
        { name: "Unique Experts", value: "statistics.pkw.dojo.unique_expert" },
        { name: "Total Standards", value: "statistics.pkw.dojo.total_standard" },
        { name: "Total Advanced", value: "statistics.pkw.dojo.total_advanced" },
        { name: "Total Experts", value: "statistics.pkw.dojo.total_expert" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="flex flex-row justify-between mt-6 mx-4 sm:mx-44">
        <a href="/leaderboards" class="flex-none px-3 border-2 border-slate-300 py-1 bg-white rounded-md hover:bg-slate-100 hover:scale-105 duration-100 self-center">Go Back</a>
        <div class="flex flex-row gap-x-2 self-center flex-grow justify-center">
            <img src="https://cdn.islandstats.xyz/games/pkw/solo/icon.png" alt="Dynaball Logo" class="w-12 h-12 self-center" />
            <p class="text-center text-3xl font-semibold self-center">Parkour Warrior Dojo Leaderboards</p>
        </div>
    </div>

    <div class="flex flex-col mb-8 gap-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
            {#each stats as stat}
                <Leaderboard name={stat.name} stat={stat.value} players={data.players} />
            {/each}
        </div>
    </div>
</div>

<Footer absolute={false} />