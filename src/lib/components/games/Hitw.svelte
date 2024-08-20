<script>
	import Badges from "$lib/components/games/Badges.svelte";
    import { calculatePercentage } from '$lib/utils.js';

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-2 text-md">
        <div>
            <p>Games Won: <span class="font-semibold">{stats.first_place.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{(stats.games_played - stats.first_place).toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{(Math.floor((stats.first_place / (stats.games_played - stats.first_place)) * 100) / 100 || 0).toLocaleString() || "Infinity"}</span> <span class="text-slate-500">({calculatePercentage(stats.first_place, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>1st Places: <span class="font-semibold">{stats.first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.first_place / stats.games_played) * 100)}%)</span></p>
            <p>Top 3: <span class="font-semibold">{(stats.top_three - stats.first_place).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.top_three - stats.first_place) / stats.games_played) * 100)}%)</span></p>
            <p>Top 5: <span class="font-semibold">{(stats.top_five - stats.top_three).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.top_five - stats.top_three) / stats.games_played) * 100)}%)</span></p>
        </div>
        <div>
            <p>Players Outlived: <span class="font-semibold">{stats.players_outlived.toLocaleString()}</span></p>
            <p>Walls Dodged: <span class="font-semibold">{stats.walls_dodged.toLocaleString()}</span></p>
            <p>Survived 1 minute: <span class="font-semibold">{(stats.survived_minute - stats.survived_two_minute).toLocaleString()}</span> time{stats.survived_minute === 1 ? "" : "s"} <span class="text-slate-500">({calculatePercentage((stats.survived_minute - stats.survived_two_minute), stats.games_played)}%)</span></p>
            <p>Survived 2 minutes: <span class="font-semibold">{stats.survived_two_minute.toLocaleString()}</span> time{stats.survived_two_minute === 1 ? "" : "s"} <span class="text-slate-500">({calculatePercentage(stats.survived_two_minute, stats.games_played)}%)</span></p>
        </div>
    </div>

    <Badges {stats} game="hitw" />
</div>