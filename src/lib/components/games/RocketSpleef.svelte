<script>
    import { badges, calculateBadgeTier, calculateMaxTrophies, calculateTrophies } from '$lib/badges.js';
    import tooltip from "$lib/tooltip.js";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
        <div>
            <p>Games Won: <span class="font-semibold">{stats.first_place.toLocaleString()}</span></p>
            <p>Games Lost: <span class="font-semibold">{stats.losses.toLocaleString()}</span></p>
            <p>WLR: <span class="font-semibold">{stats.wlr.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Kills: <span class="font-semibold">{stats.kills.toLocaleString()}</span></p>
            <p>Deaths: <span class="font-semibold">{stats.deaths.toLocaleString()}</span></p>
            <p>KDR: <span class="font-semibold">{stats.kdr.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Rockets Fired: <span class="font-semibold">{stats.rockets_fired.toLocaleString()}</span></p>
            <p>Rockets Hit: <span class="font-semibold">{stats.rockets_hit.toLocaleString()}</span></p>
            <p>Rocket Hit Rate: <span class="font-semibold">{stats.rocket_hit_rate.toLocaleString()}%</span></p>
        </div>
        <div>
            <p>Melee Kills: <span class="font-semibold">{stats.melee_kills.toLocaleString()}</span></p>
            <p>Players Outlived: <span class="font-semibold">{stats.players_outlived.toLocaleString()}</span></p>
            <p>Survived 1 minute: <span class="font-semibold">{stats.survive_60s.toLocaleString()}</span></p>
        </div>
    </div>
    
    <div class="flex flex-row mt-4 mb-2">
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2">•</span>
        <div class="flex flex-row gap-x-1 mb-2">
            <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="text-slate-600 self-center text-lg font-semibold">{calculateTrophies(stats, badges.rocket_spleef.concat(badges.rocket_spleef_tiered))}<span class="font-normal text-slate-500">/{calculateMaxTrophies(badges.rocket_spleef.concat(badges.rocket_spleef_tiered))} ({Math.round((calculateTrophies(stats, badges.rocket_spleef.concat(badges.rocket_spleef_tiered)) / calculateMaxTrophies(badges.rocket_spleef.concat(badges.rocket_spleef_tiered))) * 100)}%)</span></span>
        </div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
        {#each badges.rocket_spleef as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/rsr/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class={`font-semibold ${stats.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                    <p>Completed <span class="font-semibold">{stats.badges[badge.stat].toLocaleString()}</span> time{stats[badge.stat] === 1 ? "" : "s"}</p>
                </div>
            </div>
        {/each}
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
        {#each badges.rocket_spleef_tiered as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/rsr/${badge.icon}.png`} alt={badge.name} />
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