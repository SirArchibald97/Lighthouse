<script>
    import { badges, calculateBadgeTier, calculateMaxTrophies, calculateTrophies } from '$lib/badges.js';
    import tooltip from "$lib/tooltip.js";

    export let game;
    export let stats;

    const icons = { "dojo": "parkour_warrior", "survivor": "parkour_warrior" };
</script>

<div>
    <div class="flex flex-row mt-4 mb-2">
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2">•</span>
        <div class="flex flex-row gap-x-1 mb-2 self-center">
            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="text-slate-600 self-center text-lg font-semibold">
                {calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0}<span class="font-normal text-slate-500">
                    /{calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0} ({Math.round((calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])) / calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))) * 100)}%)
                </span>
            </span>
        </div>
    </div>
    {#if badges[game]}
    <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-4">
        {#each badges[game] as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class={`flex flex-row font-semibold ${stats.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>
                        {badge.name}
                        <span class="text-md text-slate-800 px-2 self-center">•</span>
                        <span class="text-slate-800 flex flex-row gap-x-1 text-sm">
                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
                            <span class="self-center">{badge.trophies.toLocaleString()}</span>
                        </span>
                    </p>
                    <p>Completed <span class="font-semibold">{badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat].toLocaleString()}</span> time{stats[badge.stat] === 1 ? "" : "s"}</p>
                </div>
            </div>
        {/each}
    </div>
    {/if}
    
    {#if badges[`${game}_tiered`]}
    <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-2 gap-4 mt-5">
        {#each badges[`${game}_tiered`] as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class="font-semibold flex flex-row gap-x-2">{badge.name} {calculateBadgeTier(stats[badge.stat], badge.tiers).tier.name}
                        {#if stats[badge.stat] >= badge.tiers[badge.tiers.length - 1].amount}<span class="text-slate-400 font-normal">({stats[badge.stat].toLocaleString()})</span>{/if}
                        <span>•</span>
                        <span class="flex flex-row gap-x-1">
                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
                            <span class="text-sm self-center">{calculateTrophies(stats, [badge])}</span>
                        </span>
                    </p>
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
    {/if}
</div>