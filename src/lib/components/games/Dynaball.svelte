<script>
    import { badges, calculateTrophies, calculateMaxTrophies, calculateBadgeTier } from "$lib/badges.js";
    import tooltip from "$lib/tooltip.js";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
        <div>
            <p>Games Won: <span class="font-semibold">{stats.wins.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{(stats.games_played - stats.wins).toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{(Math.floor((stats.wins / (stats.games_played - stats.wins)) * 100) / 100 || 0).toLocaleString()}</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Players Stuck: <span class="font-semibold">{stats.players_stuck.toLocaleString()}</span></p>
            <p>Spawners Broken: <span class="font-semibold">{stats.spawners_destroyed.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{stats.games_played.toLocaleString()}</span></p>
            <p>Blocks Destroyed: <span class="font-semibold">{stats.blocks_destroyed.toLocaleString()}</span></p>
            <p>Blocks Placed: <span class="font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Survived 1 Minute: <span class="font-semibold">{(stats.survive_1m - stats.survive_2m).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.survive_1m - stats.survive_2m) / stats.games_played) * 100)}%)</span></p>
            <p>Survived 2 Minutes: <span class="font-semibold">{(stats.survive_2m - stats.survive_3m).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.survive_2m - stats.survive_3m) / stats.games_played) * 100)}%)</span></p>
            <p>Survived 3 Minutes: <span class="font-semibold">{(stats.survive_3m - stats.survive_4m).toLocaleString()}</span> <span class="text-slate-500">({Math.round(((stats.survive_3m - stats.survive_4m) / stats.games_played) * 100)}%)</span></p>
            <p>Survived 4 Minutes: <span class="font-semibold">{stats.survive_4m.toLocaleString()}</span> <span class="text-slate-500">({Math.round((stats.survive_4m / stats.games_played) * 100)}%)</span></p>
        </div>
    </div>

    <div class="flex flex-row mt-4 mb-2">
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2">•</span>
        <div class="flex flex-row gap-x-1 mb-2">
            <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="text-slate-600 self-center text-lg font-semibold">{calculateTrophies(stats, badges.dynaball.concat(badges.dynaball_tiered))}<span class="font-normal text-slate-500">/{calculateMaxTrophies(badges.dynaball.concat(badges.dynaball_tiered))} ({Math.round((calculateTrophies(stats, badges.dynaball.concat(badges.dynaball_tiered)) / calculateMaxTrophies(badges.dynaball.concat(badges.dynaball_tiered))) * 100)}%)</span></span>
        </div>
    </div>                                        
    <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
        {#each badges.dynaball as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/dynaball/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class={`font-semibold ${stats.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                    <p>Completed <span class="font-semibold">{stats.badges[badge.stat].toLocaleString()}</span> time{stats.badges[badge.stat] === 1 ? "" : "s"}</p>
                </div>
            </div>
        {/each}
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-1 2xl:grid-cols-2 gap-5 mt-5">
        {#each badges.dynaball_tiered as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/dynaball/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class="font-semibold">{badge.name} {calculateBadgeTier(stats[badge.stat], badge.tiers).tier.name} {#if stats[badge.stat] >= badge.tiers[badge.tiers.length - 1].amount}<span class="text-slate-400 font-normal">({stats[badge.stat].toLocaleString()})</span>{/if} </p>
                    <p>
                        {#each badge.tiers as tier}
                            {#if stats[badge.stat] >= tier.amount}
                                <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                            {:else}
                                {#if calculateBadgeTier(stats[badge.stat], badge.tiers).next.name === tier.name}
                                    <span class="text-red-500">{stats[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                {:else}
                                    <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                {/if}
                            {/if}
                        
                            {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                        {/each}
                    </p>  
                </div>
            </div>
        {/each}
    </div>
</div>