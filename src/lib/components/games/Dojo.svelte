<script>
    import { badges, calculateTrophies, calculateMaxTrophies, calculateBadgeTier } from "$lib/badges.js";
    import tooltip from "$lib/tooltip.js";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-12">
        <div>
            <p>Unique Medals: <span class="font-semibold">{stats.unique_medals.toLocaleString()}</span></p>
            <p>Total Medals: <span class="font-semibold">{stats.total_medals.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Unique Standard Completions: <span class="font-semibold">{stats.unique_standard.toLocaleString()}</span></p>
            <p>Unique Advanced Completions: <span class="font-semibold">{stats.unique_advanced.toLocaleString()}</span></p>
            <p>Unique Expert Completions: <span class="font-semibold">{stats.unique_expert.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Total Standard Completions: <span class="font-semibold">{stats.total_standard.toLocaleString()}</span></p>
            <p>Total Advanced Completions: <span class="font-semibold">{stats.total_advanced.toLocaleString()}</span></p>
            <p>Total Expert Completions: <span class="font-semibold">{stats.total_expert.toLocaleString()}</span></p>
        </div>
    </div>

    <div class="flex flex-row mt-4 mb-2">
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2">•</span>
        <div class="flex flex-row gap-x-1 mb-2">
            <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="text-slate-600 self-center text-lg font-semibold">{calculateTrophies(stats, badges.dojo_tiered)}<span class="font-normal text-slate-500">/{calculateMaxTrophies(badges.dojo_tiered)} ({Math.round((calculateTrophies(stats, badges.dojo_tiered) / calculateMaxTrophies(badges.dojo_tiered)) * 100)}%)</span></span>
        </div>
    </div>                                        
    <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
        {#each badges.dojo_tiered as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/pkw/${badge.icon}.png`} alt={badge.name} />
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