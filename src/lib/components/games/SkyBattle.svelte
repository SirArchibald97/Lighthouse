<script>
    import Badges from "$lib/components/games/Badges.svelte";
    import { calculatePercentage } from "$lib/utils.js";

    let category = "quads";
    function switchCategory(newCategory) { category = newCategory; }

    export let ostats;
    $: stats = ostats[category];
</script>

<div class="flex flex-col gap-y-4">
    <div class="flex flex-row gap-x-2 mt-4 mb-2">
        <button on:click={() => switchCategory("quads")} class={`hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${category === "quads" ? "bg-neutral-300 dark:bg-neutral-700" : ""}`}>Quads</button>
        <button on:click={() => switchCategory("summer")} class={`hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${category === "summer" ? "bg-neutral-300 dark:bg-neutral-700" : ""}`}>Summer</button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-2 text-md">
        <div>
            <p>Games Won: <span class="font-semibold">{stats.solo_first_place.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{(stats.games_played - stats.solo_first_place).toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{(Math.floor((stats.solo_first_place / (stats.games_played - stats.solo_first_place)) * 100) / 100 || 0).toLocaleString() || "Infinity"}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_first_place, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Deaths: <span class="font-semibold">{stats.deaths.toLocaleString()}</span></p>
            <p>KDR: <span class="font-semibold">{(Math.floor((stats.kills / stats.deaths) * 100) / 100 || 0).toLocaleString() || "Infinity"}</span></p>
        </div>
        <div>
            <p>Melee Kills: <span class="font-semibold">{stats.melee_kills.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.melee_kills, stats.kills)}%)</span></p>
            <p>Ranged Kills: <span class="font-semibold">{stats.ranged_kills.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.ranged_kills, stats.kills)}%)</span></p>
            <p>Explosive Kills: <span class="font-semibold">{stats.explosive_kills.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.explosive_kills, stats.kills)}%)</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>Individual 1st Places: <span class="font-semibold">{stats.solo_first_place.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_first_place, stats.games_played)}%)</span></p>
            <p>Individual Top 3: <span class="font-semibold">{(stats.solo_top_three - stats.solo_first_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_top_three - stats.solo_first_place, stats.games_played)}%)</span></p>
            <p>Individual Top 5: <span class="font-semibold">{(stats.solo_top_five - stats.solo_top_three).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_top_five - stats.solo_top_three, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Team 1st Places: <span class="font-semibold">{stats.team_first_place.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_first_place, stats.games_played)}%)</span></p>
            <p>Team 2nd Places: <span class="font-semibold">{(stats.team_second_place - stats.team_first_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_second_place - stats.team_first_place, stats.games_played)}%)</span></p>
            <p>Team 3rd Places: <span class="font-semibold">{(stats.team_third_place - stats.team_second_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_third_place - stats.team_second_place, stats.games_played)}%)</span></p>
            <p>Team 4th Places: <span class="font-semibold">{(stats.team_fourth_place - stats.team_third_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_fourth_place - stats.team_third_place, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Chests Looted: <span class="font-semibold">{stats.chests_looted.toLocaleString()}</span></p>
            <p>Golden Chests Looted: <span class="font-semibold">{stats.golden_chests_looted.toLocaleString()}</span></p>
            <p>Survived 1 minute: <span class="font-semibold">{(stats.survived_minute - stats.survived_two_minute).toLocaleString()}</span> time{stats.survived_minute !== 1 ? "s" : ""}</p>
            <p>Survived 2 minutes: <span class="font-semibold">{stats.survived_two_minute.toLocaleString()}</span> time{stats.survived_two_minute !== 1 ? "s" : ""}</p>
        </div>
    </div>

    <Badges {stats} game="sky_battle" />
</div>