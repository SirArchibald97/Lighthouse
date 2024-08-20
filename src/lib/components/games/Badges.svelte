<script>
    import { badges, calculateBadgeTier, calculateMaxTrophies, calculateTrophies } from '$lib/badges.js';
    import { calculatePercentage } from "$lib/utils.js";
    import { Confetti } from "svelte-confetti";
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

    function hasCompleted(badge) {
        return badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat];
    }
</script>

<div class="flex flex-col gap-x-4 text-neutral-900 dark:text-neutral-100">
    <div class="flex flex-row">
        {#if calculatePercentage(calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])), calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))) === 100}
            <Confetti />
        {/if}
        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2 text-neutral-800 dark:text-neutral-500">•</span>
        <div class="flex flex-row gap-x-1 mb-2 self-center text-neutral-700 dark:text-neutral-200">
            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="self-center flex flex-row gap-x-1 text-lg font-semibold">
                <span>{calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0}</span>
                <span class="font-normal">/</span>
                <span class="font-normal">{calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0}</span>
                <span class="font-normal text-neutral-500">({calculatePercentage(calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])), calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || [])))}%)</span>
            </span>
        </div>
        {#if calculatePercentage(calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])), calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))) === 100}
            <Confetti />
        {/if}
    </div>

    {#if badges[game]}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 *:border *:border-neutral-300 *:dark:border-neutral-800 *:p-2 *:rounded-md">
            {#each badges[game] as badge}
                <div class={`flex flex-col gap-y-2 text-md ${hasCompleted(badge) > 0 ? "bg-green-500/40" : ""}`}>
                    <div class="flex flex-row gap-x-2">
                        <img use:tooltip title={badge.description} class="w-16 h-16" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                        <div class="flex flex-col items-start mt-2 sm:mt-0 self-center">
                            <p class={`flex flex-row font-semibold ${(badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat]) > 0 ? "text-green-500" : "text-red-500"}`}>
                                {badge.name}
                            </p>
                            <p>{badge.description}</p>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between my-auto px-2">
                        <p>
                            {#if hasCompleted(badge) > 0}
                                Completed <span class="font-semibold">{hasCompleted(badge)}</span> time{hasCompleted(badge) === 1 ? "" : "s"}
                            {:else}
                                Not completed
                            {/if}
                        </p>
                        <p class="flex flex-row gap-x-1">
                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="w-6 h-6 self-center" />
                            {badge.trophies}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    
    {#if badges[`${game}_tiered`]}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 *:border *:border-neutral-300 *:dark:border-neutral-800 *:p-2 *:rounded-md">
            {#each badges[`${game}_tiered`] as badge}
                <div class="relative bg-green-500/40" style={`width: calc(100% * ${stats[badge.stat] / badge.tiers.reduce((a, b) => a + b.amount, 0)})`}>
                    <div class="absolute inset-0 z-10 p-2">
                        <div class="flex flex-row gap-x-2">
                            <img class="w-16 h-16" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                            <div class="flex flex-col items-start mt-2 sm:mt-0 self-center">
                                <p class={`flex flex-row font-semibold ${(badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat]) > 0 ? "text-green-500" : "text-red-500"}`}>
                                    {badge.name}
                                </p>
                                <p>{badge.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col text-md bg-green-500/40" style={`width: calc(100% * ${stats[badge.stat] / badge.tiers.reduce((a, b) => a + b.amount, 0)})`}>
                    
                    <div class="flex flex-row justify-between my-auto px-2">
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