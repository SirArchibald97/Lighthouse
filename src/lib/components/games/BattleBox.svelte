<script>
	import Badges from '$lib/components/games/Badges.svelte';
    import { calculatePercentage } from "$lib/utils.js";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
        <div>
            <p>Rounds Won: <span class="font-semibold">{stats.rounds_won.toLocaleString()}</span></p>
            <p>Rounds Lost: <span class="font-semibold">{((stats.games_played * 3) - stats.rounds_won).toLocaleString()}</span></p>
            <p>Round WLR: <span class="font-semibold">{(Math.floor((stats.rounds_won / ((stats.games_played * 3) - stats.rounds_won)) * 100) / 100 || 0).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.rounds_won, stats.games_played * 3)}%)</span></p>
        </div>
        <div>
            <p>Games Won: <span class="font-semibold">{stats.team_first_place.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{(stats.games_played - stats.team_first_place).toLocaleString()}</span></p>
            <p>Game WLR: <span class="font-semibold">{(Math.floor((stats.team_first_place / (stats.games_played - stats.team_first_place)) * 100) / 100 || 0).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_first_place, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Deaths: <span class="font-semibold">{stats.deaths.toLocaleString()}</span></p>
            <p>KDR: <span class="font-semibold">{(Math.floor((stats.kills / stats.deaths) * 100) / 100 || 0).toLocaleString()}</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>Team 1st Places: <span class="font-semibold">{stats.team_first_place.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_first_place, stats.games_played)}%)</span></p>
            <p>Team 2nd Places: <span class="font-semibold">{(stats.team_second_place - stats.team_first_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_second_place - stats.team_first_place, stats.games_played)}%)</span></p>
            <p>Team 3rd Places: <span class="font-semibold">{(stats.team_third_place - stats.team_second_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_third_place - stats.team_second_place, stats.games_played)}%)</span></p>
            <p>Team 4th Places: <span class="font-semibold">{(stats.team_fourth_place - stats.team_third_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.team_fourth_place - stats.team_third_place, stats.games_played)}%)</span></p>
        </div>
        <div>
            <p>Individual 1st Places: <span class="font-semibold">{stats.solo_first_place.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_first_place, stats.games_played)}%)</span></p>
            <p>Individual Top 3: <span class="font-semibold">{(stats.solo_top_three - stats.solo_first_place).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_top_three - stats.solo_first_place, stats.games_played)}%)</span></p>
            <p>Individual Top 5: <span class="font-semibold">{(stats.solo_top_five - stats.solo_top_three).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.solo_top_five - stats.solo_top_three, stats.games_played)}%)</span></p>
            <p>Concrete Broken: <span class="font-semibold">{stats.blocks_broken.toLocaleString()}</span> </p>
            <p>Concrete Placed: <span class="font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Melee Kills: <span class="font-semibold">{stats.melee_kills.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.melee_kills, stats.kills)}%)</span></p>
            <p>Ranged Kills: <span class="font-semibold">{stats.ranged_kills.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.ranged_kills, stats.kills)}%)</span></p>
            <p>Explosive Kills: <span class="font-semibold">{stats.explosive_kills.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(stats.explosive_kills, stats.kills)}%)</span></p>
        </div>
    </div>
    
    <Badges {stats} game="battle_box" />
</div>