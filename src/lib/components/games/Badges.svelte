<script>
    import { badges, calculateBadgeTier, calculateMaxTrophies, calculateTrophies } from '$lib/badges.js';
    import { calculatePercentage, shortenNumber } from "$lib/utils.js";
    import { Confetti } from "svelte-confetti";
    import { fade } from 'svelte/transition';

    export let game;
    export let stats;

    let shownObjectives = badges[game]?.map(b => false);
    function showObjective(index) { shownObjectives[index] = true; }

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

<div class="flex flex-col gap-x-4 gap-y-4 text-neutral-900 dark:text-neutral-100">
    <div class="flex flex-row">
        {#if calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])) === calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))}
            <Confetti />
        {/if}

        <span class="font-semibold text-xl">Badges</span>
        <span class="text-xl px-2 text-neutral-800 dark:text-neutral-500">•</span>
        <div class="flex flex-row gap-x-1 self-center text-neutral-700 dark:text-neutral-200">
            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies" class="w-5 h-5 self-center" />
            <span class="self-center flex flex-row gap-x-1 text-lg font-semibold">
                <span>{calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0}</span>
                <span class="font-normal">/</span>
                <span class="font-normal">{calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))?.toLocaleString() || 0}</span>
                <span class="font-normal text-neutral-500">({calculatePercentage(calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])), calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || [])))}%)</span>
            </span>
        </div>

        {#if calculateTrophies(stats, (badges[game] || []).concat(badges[`${game}_tiered`] || [])) === calculateMaxTrophies((badges[game] || []).concat(badges[`${game}_tiered`] || []))}
            <Confetti />
        {/if}
    </div>

    {#if badges[game]}
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 *:p-2 *:rounded-md text-md">
            {#each badges[game] as badge, index}
                <div class={`flex flex-col gap-y-2 text-md border-2 ${hasCompleted(badge) > 0 ? "bg-green-500/40 border-green-600" : "dark:border-neutral-800 border-neutral-300"}`}>
                    <div class="flex flex-row gap-x-2">
                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                        <div class="flex flex-col items-start mt-2 sm:mt-0 self-center">
                            <p class={`flex flex-row font-semibold ${(badge.stat.startsWith("!") ? stats[badge.stat.slice(1, badge.stat.length)] : stats.badges[badge.stat]) > 0 ? "text-green-500" : "text-red-500"}`}>
                                {badge.name}
                            </p>
                            {#if badge.secret}
                                {#if hasCompleted(badge) > 0}
                                    <p class="text-sm">{badge.description}</p>
                                {:else}
                                    {#if shownObjectives[index]}
                                        <p transition:fade={{ duration: 200 }} class="text-sm">{badge.description}</p>
                                    {:else}
                                        <button on:click={() => showObjective(index)} class="text-sm">???</button>
                                    {/if}
                                {/if}
                            {:else}
                                <p class="text-sm">{badge.description}</p>
                            {/if}
                        </div>
                    </div>
                    <div class="flex flex-row justify-between mt-auto px-2">
                        <p>
                            {#if hasCompleted(badge) > 0}
                                Completed <span class="font-semibold">{hasCompleted(badge).toLocaleString()}</span> time{hasCompleted(badge) === 1 ? "" : "s"}
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
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:p-2 *:rounded-md text-md">
            {#each badges[`${game}_tiered`] as badge}
                <div class={`flex flex-col gap-y-2 text-md border-2 ${calculateTrophies(stats, [badge]) === calculateMaxTrophies([badge]) ? "border-green-500 bg-green-500/40" : "dark:border-neutral-800 border-neutral-300"}`}>
                    <div class="flex flex-row gap-x-2">
                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${icons[game] || game}/${badge.icon}.png`} alt={badge.name} />
                        <div class="flex flex-col items-start mt-2 sm:mt-0 self-center">
                            <p class="font-semibold">
                                {badge.name} {calculateBadgeTier(stats[badge.stat], badge.tiers).tier.name}
                            </p>
                            <p class="text-sm">{badge.description}</p>
                        </div>
                    </div>
                    <p class="mx-2">
                        {#if estimates}
                            {#if stats[badge.stat] >= badge.tiers[badge.tiers.length - 1].amount}
                                <div class="flex flex-row gap-x-1">
                                    <span class="text-green-500 font-semibold self-center">Completed!</span>
                                    <span class="text-neutral-600 dark:text-neutral-400 self-center">Current average <span class="font-semibold">{gamesLeft[badges[`${game}_tiered`].indexOf(badge)].average?.toLocaleString()}</span> per game</span>
                                </div>
                            {:else}
                                <span class="text-neutral-600 dark:text-neutral-400">
                                    <span class="font-semibold">{gamesLeft[badges[`${game}_tiered`].indexOf(badge)].average?.toLocaleString()}</span> per game, completed in 
                                    <span class="font-semibold">~{gamesLeft[badges[`${game}_tiered`].indexOf(badge)].gamesLeft?.toLocaleString()}</span> more games!
                                </span>
                            {/if}
                        {:else}
                            {#each badge.tiers as tier}
                                {#if stats[badge.stat] >= tier.amount}
                                    <span class="text-green-500">{shortenNumber(tier.amount).toLocaleString()}</span>
                                {:else}
                                    {#if calculateBadgeTier(stats[badge.stat], badge.tiers).next.name === tier.name}
                                        <span class="text-red-500">{stats[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{shortenNumber(tier.amount).toLocaleString()}</span>
                                    {:else}
                                        <span class="text-red-500">{shortenNumber(tier.amount).toLocaleString()}</span>
                                    {/if}
                                {/if}
                            
                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400 pr-1">•</span>{/if}
                            {/each}
                            {#if calculateTrophies(stats, [badge]) === calculateMaxTrophies([badge])}<span class="text-neutral-400">({stats[badge.stat].toLocaleString()})</span>{/if}
                        {/if}
                    </p>
                    <p class="flex flex-row mt-auto gap-x-1">
                        <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="w-6 h-6 self-center" />
                        <span class="font-semibold">{calculateTrophies(stats, [badge])}</span> / <span>{calculateMaxTrophies([badge])}</span>
                    </p>
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