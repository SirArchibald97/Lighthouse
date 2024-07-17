<script>
    import { badges, calculateBadgeTier, calculateMaxTrophies, calculateTrophies } from '$lib/badges.js';
    import tooltip from "$lib/tooltip.js";

    export let game;
    export let stats;

    let estimates = false;
    function toggleEstimates() { estimates = !estimates; }

    let gamesLeft = [];
    for (const badge of badges[`${game}_tiered`] || []) {
        if (badge.suggestionStat) {
            const components = badge.suggestionStat.split("/");
            // number of stats left divided by the average stat per game
            const averagePerGame = stats[components[0]] / stats[components[1]];
            const statsLeft = badge.tiers[badge.tiers.length - 1].amount - stats[badge.stat];
            gamesLeft.push({ average: Math.round(averagePerGame * 10) / 10, gamesLeft: Math.ceil(statsLeft / averagePerGame) });
        }
    }

    const icons = { "dojo": "parkour_warrior", "survivor": "parkour_warrior" };
</script>

<div class="text-neutral-900 dark:text-neutral-100">
    <div class="flex flex-row mt-4 mb-2">
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2 text-neutral-800 dark:text-neutral-500">•</span>
        <div class="flex flex-row gap-x-1 mb-2 self-center text-neutral-700 dark:text-neutral-200">
            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="self-center text-lg font-semibold">
                {calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0}<span class="font-normal">
                    /{calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0} ({Math.round((calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])) / calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))) * 100)}%)
                </span>
            </span>
        </div>
    </div>
    {#if badges[game]}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each badges[game] as badge}
            <div class="flex flex-col sm:flex-row gap-x-2">
                <img use:tooltip title={badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                <div class="flex flex-col items-start mt-2 sm:mt-0">
                    <p class={`flex flex-row font-semibold ${(badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat]) > 0 ? "text-green-500" : "text-red-500"}`}>
                        {badge.name}
                        <span class="text-md text-neutral-800 dark:text-neutral-500 px-2 self-center">•</span>
                        <span class="text-slate-800 flex flex-row gap-x-1 text-sm">
                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
                            <span class="self-center dark:text-neutral-300">{badge.trophies.toLocaleString()}</span>
                        </span>
                    </p>
                    <p>Completed <span class="font-semibold">{badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat].toLocaleString()}</span> time{stats[badge.stat] === 1 ? "" : "s"}</p>
                </div>
            </div>
        {/each}
    </div>
    {/if}
    
    {#if badges[`${game}_tiered`]}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
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
                        {#if estimates}
                            {#if stats[badge.stat] >= badge.tiers[badge.tiers.length - 1].amount}
                                <span class="text-green-500">Completed!</span>
                            {:else}
                                <span class="text-neutral-600 dark:text-neutral-400">
                                    <span class="font-semibold">{gamesLeft[badges[`${game}_tiered`].indexOf(badge)].average?.toLocaleString()}</span> per game, completed in 
                                    <span class="font-semibold">~{gamesLeft[badges[`${game}_tiered`].indexOf(badge)].gamesLeft?.toLocaleString()}</span> more games!
                                </span>
                            {/if}
                        {:else}
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
                        {/if}
                    </p>
                </div>
            </div>
        {/each}
    </div>

    <div class="my-4"></div>

    <div class="flex flex-row gap-x-2">
        <p class="self-center text-neutral-800 dark:text-neutral-300">Toggle estimates</p>
        <button type="button" on:click={toggleEstimates} class="self-center group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full" role="switch" aria-checked="false">
            <span class="sr-only">Use setting</span>
            <span class="pointer-events-none absolute h-full w-full rounded-md"></span>
            <span class={`${estimates ? "bg-red-500" : "bg-neutral-200 dark:bg-neutral-800"} pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out`}></span>
            <span class={`${estimates ? "translate-x-5" : "translate-x-0"} bg-neutral-100 dark:bg-neutral-700 pointer-events-none absolute left-0 inline-block h-5 w-5 translate-x-0 transform rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out`}></span>
        </button>
    </div>
    {/if}
</div>