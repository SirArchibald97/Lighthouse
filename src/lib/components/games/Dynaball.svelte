<script>
	import Badges from "$lib/components/games/Badges.svelte";
    import { calculatePercentage } from "$lib/utils.js";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-2 text-md">
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>Games Won: <span class="font-semibold">{stats.wins.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{(stats.games_played - stats.wins).toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{stats.wlr.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.wins, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Deaths: <span class="font-semibold">{(stats.games_played - stats.losses).toLocaleString()}</span></p>
            <p>KDR: <span class="font-semibold">{stats.kdr.toLocaleString()}</span></p>
            <p>Players Stuck: <span class="font-semibold">{stats.players_stuck.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Spawners Broken: <span class="font-semibold">{stats.spawners_destroyed.toLocaleString()}</span></p>
            <p>Blocks Destroyed: <span class="font-semibold">{stats.blocks_destroyed.toLocaleString()}</span></p>
            <p>Blocks Placed: <span class="font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Survived 1 Minute: <span class="font-semibold">{(stats.survive_1m - stats.survive_2m).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.survive_1m - stats.survive_2m, stats.games_played)}%)</span></p>
            <p>Survived 2 Minutes: <span class="font-semibold">{(stats.survive_2m - stats.survive_3m).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.survive_2m - stats.survive_3m, stats.games_played)}%)</span></p>
            <p>Survived 3 Minutes: <span class="font-semibold">{(stats.survive_3m - stats.survive_4m).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.survive_3m - stats.survive_4m, stats.games_played)}%)</span></p>
            <p>Survived 4 Minutes: <span class="font-semibold">{stats.survive_4m.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.survive_4m, stats.games_played)}%)</span></p>
        </div>
    </div>

    <Badges {stats} game="dynaball" />
</div>