<script>
    import Footer from "$lib/components/Footer.svelte";
    import Leaderboard from "$lib/components/Leaderboard.svelte";

    export let data;

    let stats = [
        { name: "Games Played", value: "statistics.games_played" },
        { name: "Course Contributions", value: "statistics.community_contribution" },
        { name: "Royal Reputation", value: "collections.currency.royalReputation", icon: "icons/royal_reputation" },
        { name: "Faction XP", value: "statistics.faction_total_xp" },
        { name: "Game XP", value: "statistics.faction_game_xp" },
        { name: "Quest XP", value: "statistics.faction_quest_xp" },
        { name: "Most Coins", value: "collections.currency.peakCoins", icon: "icons/coin" },
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
            <img src="https://cdn.islandstats.xyz/icons/royal_reputation.png" alt="Dynaball Logo" class="w-12 h-12 self-center" />
            <p class="text-center text-3xl font-semibold self-center">Miscellaneous Leaderboards</p>
        </div>
    </div>

    <div class="flex flex-col mb-8 gap-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
            {#each stats as stat}
                <Leaderboard name={stat.name} stat={stat.value} icon={stat.icon || null} players={data.players} />
            {/each}
        </div>
    </div>
</div>

<Footer absolute={false} />