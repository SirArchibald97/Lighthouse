<script>
    import { badges, calculateBadgeTier } from "$lib/badges.js";
    import { slide } from "svelte/transition";
    import tooltip from "$lib/tooltip.js";

    export let data;

    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }

    const allTieredBadges = [
        { stats: data.player.statistics.battle_box, icons: "battle_box", badges: badges.battle_box_tiered }, 
        { stats: data.player.statistics.sky_battle.quads, icons: "sky_battle", badges: badges.sky_battle_tiered },
        { stats: data.player.statistics.tgttos, icons: "tgttos", badges: badges.tgttos_tiered}, 
        { stats: data.player.statistics.hitw, icons: "hitw", badges: badges.hitw_tiered },
        { stats: data.player.statistics.dynaball, icons: "dynaball", badges: badges.dynaball_tiered }, 
        { stats: data.player.statistics.pkw.dojo, icons: "parkour_warrior", badges: badges.dojo_tiered },
        { stats: data.player.statistics.pkw.survivor, icons: "parkour_warrior", badges: badges.survivor_tiered }, 
        { stats: data.player.statistics.rocket_spleef, icons: "rocket_spleef", badges: badges.rocket_spleef_tiered }
    ];

    const gamesLeft = [];
    for (const { stats, icons, badges } of allTieredBadges) {
        for (const badge of badges) {
            if (badge.suggestionStat) {
                const components = badge.suggestionStat.split("/");
                // number of stats left divided by the average stat per game
                const averagePerGame = (stats[components[0]] / stats[components[1]]) || 0;
                const statsLeft = badge.tiers[badge.tiers.length - 1].amount - stats[badge.stat];
                gamesLeft.push({ stats, icons, badge, average: Math.round(averagePerGame * 10) / 10, gamesLeft: Math.ceil(statsLeft / averagePerGame) || 0 });
                console.log(components, stats[components[0]], stats[components[1]], averagePerGame, statsLeft, Math.ceil(statsLeft / averagePerGame));
            }
        }
    }
    const sortedBadges = gamesLeft.sort((a, b) => a.gamesLeft - b.gamesLeft);
    const mostGamesLeft = sortedBadges[sortedBadges.length - 1].gamesLeft;
    const easyBadges = sortedBadges.filter(b => b.gamesLeft > 0 && b.gamesLeft < (mostGamesLeft * (1/5)));
    const mediumBadges = sortedBadges.filter(b => b.gamesLeft >= (mostGamesLeft * (1/5)) && b.gamesLeft < (mostGamesLeft * (3 / 5)));
    const hardBadges = sortedBadges.filter(b => b.gamesLeft >= (mostGamesLeft * (3 / 5)));
    const completedBadges = sortedBadges.filter(b => b.gamesLeft <= 0);

    const tiers = { "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7 };

    const exceptions = [
        { cycle: "completion", badges: ["Standard Completionist", "Advanced Completionist", "Expert Completionist", "Standard Leaper", "Advanced Leaper", "Expert Leaper"] }
    ];

    function getCycleText(item, average) {
        let text = "game";
        for (const exception of exceptions) {
            if (exception.badges.includes(item.badge.name)) text = exception.cycle;
        }
        return average ? text : (item.gamesLeft === 1 ? text : `${text}s`);
    }
</script>

<div class="rounded-sm p-4">
    {#if data.player.statistics}
        <div class="flex flex-col gap-y-1 mb-4">
            <p class="text-3xl font-bold">Badges</p>
            <p class="text-md font-normal text-neutral-700 dark:text-neutral-300">How long will it take to complete each tiered badge based on your current averages?</p>
        </div>

        <div class="flex flex-col gap-y-4">
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "easy" ? null : "easy")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Easiest Badges Icon" />
                    <p class="text-xl font-semibold">Easy Badges</p>
                </button>
                {#if expandedCategory === "easy"}
                    <div transition:slide={{ duration: 400 }}>
                        <div class="mt-4 flex flex-col gap-y-3">
                            {#if easyBadges.length > 0}
                                {#each easyBadges as item}
                                    <div class="flex flex-col sm:flex-row gap-x-2">
                                        <img use:tooltip title={item.badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${item.icons}/${item.badge.icon}.png`} alt={item.badge.name} />
                                        <div class="flex flex-col items-start mt-2 sm:mt-0">
                                            <p class="font-semibold text-yellow-500">{item.badge.name} {tiers[calculateBadgeTier(item.stats[item.badge.stat], item.badge.tiers).tier.name] || 0}/7</p>
                                            <p>Average of <span class="font-semibold">{item.average.toLocaleString()}</span> completions per {getCycleText(item, true)}, badge complete in <span class="font-semibold">~{item.gamesLeft.toLocaleString()}</span> {getCycleText(item)}!</p>
                                        </div>
                                    </div>                        
                                {/each}
                            {:else}
                                <p>Nothing to show here!</p>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>

            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "medium" ? null : "medium")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/icons/warnings/orange.png" alt="Medium Badges Icon" />
                    <p class="text-xl font-semibold">Medium Badges</p>
                </button>
                {#if expandedCategory === "medium"}
                    <div transition:slide={{ duration: 400 }}>
                        <div class="mt-4 flex flex-col gap-y-3">
                            {#if mediumBadges.length > 0}
                                {#each mediumBadges as item}
                                    <div class="flex flex-col sm:flex-row gap-x-2">
                                        <img use:tooltip title={item.badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${item.icons}/${item.badge.icon}.png`} alt={item.badge.name} />
                                        <div class="flex flex-col items-start mt-2 sm:mt-0">
                                            <p class="font-semibold text-orange-500">{item.badge.name} {tiers[calculateBadgeTier(item.stats[item.badge.stat], item.badge.tiers).tier.name] || 0}/7</p>
                                            <p>Average of <span class="font-semibold">{item.average.toLocaleString()}</span> completions per game, badge complete in <span class="font-semibold">~{item.gamesLeft.toLocaleString()}</span> games!</p>
                                        </div>
                                    </div>
                                {/each}
                            {:else}
                                <p>Nothing to show here!</p>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>

            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "hard" ? null : "hard")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/icons/warnings/red.png" alt="Hardest Badges Icon" />
                    <p class="text-xl font-semibold">Hard Badges</p>
                </button>
                {#if expandedCategory === "hard"}
                    <div transition:slide={{ duration: 400 }}>
                        <div class="mt-4 flex flex-col gap-y-3">
                            {#if hardBadges.length > 0}
                                {#each hardBadges as item}
                                    <div class="flex flex-col sm:flex-row gap-x-2">
                                        <img use:tooltip title={item.badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${item.icons}/${item.badge.icon}.png`} alt={item.badge.name} />
                                        <div class="flex flex-col items-start mt-2 sm:mt-0">
                                            <p class="font-semibold text-red-500">{item.badge.name} {tiers[calculateBadgeTier(item.stats[item.badge.stat], item.badge.tiers).tier.name] || 0}/7</p>
                                            <p>Average of <span class="font-semibold">{item.average.toLocaleString()}</span> completions per game, badge complete in <span class="font-semibold">~{item.gamesLeft.toLocaleString()}</span> games!</p>
                                        </div>
                                    </div>                        
                                {/each}
                            {:else}
                                <p>Nothing to show here!</p>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>

            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "complete" ? null : "complete")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.discordapp.com/emojis/1042056406997663844.webp?size=96&quality=lossless" alt="Completed Badges Icon" />
                    <p class="text-xl font-semibold">Completed Badges</p>
                </button>
                {#if expandedCategory === "complete"}
                    <div transition:slide={{ duration: 400 }}>
                        <div class="mt-4 flex flex-col gap-y-3">
                            {#if completedBadges.length > 0}
                                {#each completedBadges as item}
                                    <div class="flex flex-col sm:flex-row gap-x-2">
                                        <img use:tooltip title={item.badge.description} class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${item.icons}/${item.badge.icon}.png`} alt={item.badge.name} />
                                        <div class="flex flex-col items-start mt-2 sm:mt-0">
                                            <p class="font-semibold text-green-500">{item.badge.name} {tiers[calculateBadgeTier(item.stats[item.badge.stat], item.badge.tiers).tier.name] || 0}/7</p>
                                            <p>Average of <span class="font-semibold">{item.average.toLocaleString()}</span> completions per game</p>
                                        </div>
                                    </div>                        
                                {/each}
                            {:else}
                                <p>Nothing to show here!</p>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <p class="text-xl">Statistics are disabled!</p>
    {/if}
</div>