<script>
	import Badges from "$lib/components/games/Badges.svelte";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-12">
        <div>
            <p>Survivor Wins: <span class="font-semibold">{stats.wins.toLocaleString()}</span></p>
            <p>Survivor Losses: <span class="font-semibold">{(stats.games_played - stats.wins).toLocaleString()}</span></p>
            <p>Survivor WLR: <span class="font-semibold">{(Math.floor((stats.wins / (stats.games_played - stats.wins)) * 100) / 100 || 0).toLocaleString()}</span></p>
        </div>
        <div>
            <p>Survivor Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>Survivor Players Eliminated: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Survivor Obstacles Completed: <span class="font-semibold">{stats.obstacles.toLocaleString()}</span></p>
        </div>
    </div>

    <Badges {stats} game="survivor" />
</div>