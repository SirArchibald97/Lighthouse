<script>
    import Badges from "$lib/components/games/Badges.svelte";
    import { calculatePercentage } from '$lib/utils.js';

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-2 text-md">
        <div>
            <p>Games Won: <span class="font-semibold">{stats.first_place.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{stats.losses.toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{stats.wlr?.toLocaleString() || "Infinity"}</span> <span class="text-slate-500">({calculatePercentage(stats.first_place, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Deaths: <span class="font-semibold">{stats.deaths.toLocaleString()}</span></p>
            <p>KDR: <span class="font-semibold">{stats.kdr?.toLocaleString() || "Infinity"}</span></p>
        </div>
        <div>
            <p>Rockets Fired: <span class="font-semibold">{stats.rockets_fired.toLocaleString()}</span></p>
            <p>Rockets Hit: <span class="font-semibold">{stats.rockets_hit.toLocaleString()}</span></p>
            <p>Hits to Fired Ratio: <span class="font-semibold">{(Math.floor((stats.rockets_hit / stats.rockets_fired) * 100) / 100 || 0).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.rockets_hit, stats.rockets_fired)}%)</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>First Place: <span class="font-semibold">{stats.first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.first_place / stats.games_played) * 100)}%)</span></p>
            <p>Top 3: <span class="font-semibold">{(stats.top_three - stats.first_place).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.top_three - stats.first_place) / stats.games_played) * 100)}%)</span></p>
            <p>Top 5: <span class="font-semibold">{(stats.top_five - stats.top_three).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.top_five - stats.top_three) / stats.games_played) * 100)}%)</span></p>
            <p>Top 8: <span class="font-semibold">{(stats.top_eight - stats.top_five).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.top_eight - stats.top_five) / stats.games_played) * 100)}%)</span></p>
        </div>
        <div>
            <p>Melee Kills: <span class="font-semibold">{stats.melee_kills.toLocaleString()}</span></p>
            <p>Players Outlived: <span class="font-semibold">{stats.players_outlived.toLocaleString()}</span></p>
            <p>Survived 1 minute: <span class="font-semibold">{stats.survive_60s.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.survive_60s, stats.games_played)}%)</span></p>
        </div>
    </div>
    
    <Badges {stats} game="rocket_spleef" />
</div>