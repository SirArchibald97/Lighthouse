<script>
    import { badges, calculateBadgeTier, calculateMaxTrophies, calculateTrophies } from '$lib/badges.js';
    import tooltip from "$lib/tooltip.js";

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

    <div class="flex flex-row mt-4 mb-2">
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2">•</span>
        <div class="flex flex-row gap-x-1 mb-2">
            <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="text-slate-600 self-center text-lg font-semibold">{calculateTrophies(stats, badges.tgttos.concat(badges.tgttos_tiered))}<span class="font-normal text-slate-500">/{calculateMaxTrophies(badges.tgttos.concat(badges.tgttos_tiered))} ({Math.round((calculateTrophies(stats, badges.tgttos.concat(badges.tgttos_tiered)) / calculateMaxTrophies(badges.tgttos.concat(badges.tgttos_tiered))) * 100)}%)</span></span>
        </div>
    </div>                                        
    <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
        {#each badges.tgttos as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class={`font-semibold ${stats.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                    <p>Completed <span class="font-semibold">{stats.badges[badge.stat].toLocaleString()}</span> time{stats.badges[badge.stat] === 1 ? "" : "s"}</p>
                </div>
            </div>
        {/each}
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
        {#each badges.tgttos_tiered as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={badge.name} />
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