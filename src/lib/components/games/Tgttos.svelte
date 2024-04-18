<script>
	import Badges from '$lib/components/games/Badges.svelte';

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
        <div>
            <p>Games Won: <span class="font-semibold">{stats.first_place.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{(stats.games_played - stats.first_place).toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{(Math.floor((stats.first_place / (stats.games_played - stats.first_place)) * 100) / 100 || 0).toLocaleString()}</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Deaths: <span class="font-semibold">{stats.deaths.toLocaleString()}</span></p>
            <p>KDR: <span class="font-semibold">{(Math.floor((stats.kills / stats.deaths) * 100) / 100 || 0).toLocaleString()}</span></p>
        </div>
        <div>
            <p>Blocks Placed: <span class="font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
            <p>Blocks Broken: <span class="font-semibold">{stats.blocks_broken.toLocaleString()}</span></p>
            <p>Chickens Punched: <span class="font-semibold">{stats.chickens_punched.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>Game 1st Places: <span class="font-semibold">{stats.first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.first_place / stats.games_played) * 100)}%)</span></p>
            <p>Game Top 3: <span class="font-semibold">{(stats.top_three - stats.first_place).toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.top_three / stats.games_played) * 100)}%)</span></p>
            <p>Game Top 5: <span class="font-semibold">{(stats.top_five - stats.top_three).toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.top_five / stats.games_played) * 100)}%)</span></p>
        </div>
        <div>
            <p>Round 1st Places: <span class="font-semibold">{stats.round_first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.round_first_place / (stats.games_played * 3)) * 100)}%)</span></p>
            <p>Round Top 3: <span class="font-semibold">{(stats.round_top_three - stats.round_first_place).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.round_top_three - stats.round_first_place) / (stats.games_played * 3)) * 100)}%)</span></p>
            <p>Round Top 5: <span class="font-semibold">{(stats.round_top_five - stats.round_top_three).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.round_top_five - stats.round_top_three) / (stats.games_played * 3)) * 100)}%)</span></p>
            <p>Round Top 8: <span class="font-semibold">{(stats.round_top_eight - stats.round_top_five).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.round_top_eight - stats.round_top_five) / (stats.games_played * 3)) * 100)}%)</span></p>
        </div>
    </div>

    <Badges {stats} game="tgttos" />
</div>