<script>
    import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges.js";
    import { shortenNumber, calculatePercentage } from "$lib/utils.js";
    import { getColour } from "$lib/levels.js";
	import DoubleRightChevron from "$lib/svgs/DoubleRightChevron.svelte";
	import RightChevron from "$lib/svgs/RightChevron.svelte";
    import { onMount } from "svelte";

    export let data;

    const allTieredBadges = [
        { stats: data.player.statistics?.battle_box, icons: "battle_box", badges: badges.battle_box_tiered }, 
        { stats: data.player.statistics?.sky_battle.quads, icons: "sky_battle", badges: badges.sky_battle_tiered },
        { stats: data.player.statistics?.tgttos, icons: "tgttos", badges: badges.tgttos_tiered}, 
        { stats: data.player.statistics?.hitw, icons: "hitw", badges: badges.hitw_tiered },
        { stats: data.player.statistics?.dynaball, icons: "dynaball", badges: badges.dynaball_tiered }, 
        { stats: data.player.statistics?.pkw.dojo, icons: "parkour_warrior", icon: "parkour_warrior/solo", filter: "dojo", badges: badges.dojo_tiered },
        { stats: data.player.statistics?.pkw.survivor, icons: "parkour_warrior", filter: "survivor", badges: badges.survivor_tiered }, 
        { stats: data.player.statistics?.rocket_spleef, icons: "rocket_spleef", badges: badges.rocket_spleef_tiered }
    ];

    /* TOTAL MODE */
    let totalMode = false;
    function toggleMode() { totalMode = !totalMode; sortBadges(); }

    /* SORT BY MENU */
    let showSortMenu = false;
    function toggleSortMenu() { showSortMenu = !showSortMenu; }
    const sortModes = ["Games Left", "Trophies", "Progress"];
    let sortMode = sortModes[0];
    function selectMode(mode) { sortMode = mode; showSortMenu = false; sortBadges(); }
    onMount(() => {
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".relative")) {
                showSortMenu = false;
            }
        });
    });

    /* FILTER BY MENU */
    let showFilterMenu = false;
    function toggleFilterMenu() { showFilterMenu = !showFilterMenu; }
    const filters = [
        { name: "All", icon: "lobby", filter: false },
        { name: "Battle Box", icon: "battle_box", filter: "battle_box" },
        { name: "Sky Battle", icon: "sky_battle", filter: "sky_battle" },
        { name: "TGTTOS", icon: "tgttos", filter: "tgttos" },
        { name: "HITW", icon: "hitw", filter: "hitw" },
        { name: "Dynaball", icon: "dynaball", filter: "dynaball" },
        { name: "PKW Dojo", icon: "parkour_warrior/solo", filter: "dojo" },
        { name: "PKW Survivor", icon: "parkour_warrior", filter: "survivor" },
        { name: "Rocket Spleef", icon: "rocket_spleef", filter: "rocket_spleef" }
    ];
    let currentFilter = filters[0];
    function selectFilter(newFilter) { currentFilter = newFilter; showFilterMenu = false; sortBadges(); }
    onMount(() => {
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".relative")) {
                showFilterMenu = false;
            }
        });
    });

    let badgeList = [];
    if (data.player.statistics) {
        for (const { stats, icon, icons, filter, badges } of allTieredBadges) {
            for (const badge of badges) {
                if (badge.suggestionStat) {
                    const components = badge.suggestionStat.split("/");
                    const averagePerGame = (stats[components[0]] / stats[components[1]]) || 0;
                    badgeList.push({ 
                        stats,
                        icon, 
                        icons,
                        filter,
                        badge, 
                        average: Math.round(averagePerGame * 10) / 10,
                        total: {
                            gamesLeft: Math.ceil((badge.tiers[badge.tiers.length - 1].amount - stats[badge.stat]) / averagePerGame) || 0,
                            trophies: badge.tiers.reduce((a, b) => a += b.trophies, 0) - calculateTrophies(stats, [badge]),
                            progress: calculatePercentage(stats[badge.stat], badge.tiers[badge.tiers.length - 1].amount)
                        },
                        next: {
                            gamesLeft: Math.ceil((badge.tiers.find(t => t.name === calculateBadgeTier(stats[badge.stat], badge.tiers).next.name).amount - stats[badge.stat]) / averagePerGame) || 0,
                            trophies: calculateBadgeTier(stats[badge.stat], badge.tiers).next.trophies,
                            progress: calculatePercentage(stats[badge.stat], calculateBadgeTier(stats[badge.stat], badge.tiers).next.amount)
                        }
                    });
                }
            }
        }
    }
    

    let sortedBadges = [];
    function sortBadges() {
        if (sortMode === "Games Left") {
            sortedBadges = badgeList.sort((a, b) => totalMode ? a.total.gamesLeft - b.total.gamesLeft : a.next.gamesLeft - b.next.gamesLeft);
        } else if (sortMode === "Trophies") {
            sortedBadges = badgeList.sort((a, b) => totalMode ? b.total.trophies - a.total.trophies : b.next.trophies - a.next.trophies);
        } else if (sortMode === "Progress") {
            sortedBadges = badgeList.sort((a, b) => totalMode ? b.total.progress - a.total.progress : b.next.progress - a.next.progress);
        }

        for (const badge of sortedBadges) {
            if (badge.total.gamesLeft === Infinity) badge.total.gamesLeft = badge.badge.tiers[badge.badge.tiers.length - 1].amount;
            if (badge.next.gamesLeft === Infinity) badge.total.gamesLeft = calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).next.amount;
        }

        if (currentFilter.name !== "All") {
            sortedBadges = sortedBadges.filter(badge => (badge.filter || badge.icons) === currentFilter.filter);
        }
    }
    sortBadges();


    /* EXCEPTIONS */
    const exceptions = [
        { text: "cycle", badges: ["Standard Completionist", "Advanced Completionist", "Expert Completionist", "Standard Leaper", "Advanced Leaper", "Expert Leaper"] }
    ];
    function getCycleText(badge, average) {
        let text = "game";
        for (const exception of exceptions) {
            if (exception.badges.includes(badge.badge.name)) text = exception.text;
        }
        return average ? text : (badge[totalMode ? "gamesLeftTotal" : "gamesLeftNext"] === 1 ? text : `${text}s`);
    }
</script>

<div class="flex flex-col rounded-sm p-4">
    {#if data.player.statistics}
        <div class="flex flex-col gap-y-2 gap-x-4 justify-between mb-4">
            <div class="flex flex-col">
                <p class="text-3xl font-bold">Badges</p>
                <p class="text-md font-normal text-neutral-700 dark:text-neutral-300">How long will it take to <span class="font-semibold">reach the {totalMode ? "final tier" : "next tier"}</span> of each tiered badge based on your current averages?</p>
            </div>
        
            <div class="flex flex-col lg:flex-row gap-x-2">
                <button class="my-auto flex flex-row gap-x-1 text-md border border-neutral-300 dark:border-neutral-800 p-2 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100" on:click={toggleMode}>
                    {#if totalMode}
                        <span class="w-6 h-6 self-center"><DoubleRightChevron /></span>
                        <span class="self-center">Final Tier</span>
                    {:else}
                        <span class="w-6 h-6 self-center"><RightChevron /></span>
                        <span class="self-center">Next Tier</span>
                    {/if}
                </button>
                <!-- SELECT MENU -->
                <div class="flex-1 sm:w-56 sm:flex-none self-center">
                    <div class="relative">
                        <button type="button" on:click={toggleSortMenu} class="relative w-full cursor-default text-md border border-neutral-300 dark:border-neutral-800 py-2 px-3 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100">
                            <span class="flex badges-center text-md">
                                Sort by: {sortMode}
                            </span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex badges-center pr-2 self-center">
                                <svg class="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </button>
                
                        {#if showSortMenu}
                            <ul class="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm no-scrollbar">
                                {#each sortModes as mode}
                                    <button on:click={() => selectMode(mode)} class="w-full relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-slate-200 dark:hover:bg-neutral-700 duration-75">
                                        <div class="flex badges-center">
                                            <span class="ml-3 block truncate font-normal text-md">{mode}</span>
                                        </div>

                                        {#if sortMode === mode}
                                            <span class="absolute inset-y-0 right-0 flex badges-center pr-4 text-red-500 self-center">
                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        {/if}
                                    </button>
                                {/each}
                            </ul>
                        {/if}
                    </div>   
                </div>
                <!-- SELECT MENU -->
                <div class="flex-1 sm:w-72 sm:flex-none self-center">
                    <div class="relative">
                        <button type="button" on:click={toggleFilterMenu} class="relative w-full cursor-default text-md border border-neutral-300 dark:border-neutral-800 py-2 px-3 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100">
                            <div class="flex flex-row gap-x-1 badges-center text-md">
                                <span>Filter by:</span>
                                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${currentFilter.icon}/icon.png`} alt={`${currentFilter.name} Icon`} />
                                <span>{currentFilter.name}</span>
                            </div>
                            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex badges-center pr-2 self-center">
                                <svg class="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </button>
                
                        {#if showFilterMenu}
                            <ul class="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm no-scrollbar">
                                {#each filters as filter}
                                    <button on:click={() => selectFilter(filter)} class="w-full relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-slate-200 dark:hover:bg-neutral-700 duration-75">
                                        <div class="flex flex-row gap-x-1 badges-center">
                                            <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${filter.icon}/icon.png`} alt={`${filter.name} Icon`} />
                                            <span class="ml-3 block truncate font-normal text-md">{filter.name}</span>
                                        </div>

                                        {#if currentFilter.name === filter.name}
                                            <span class="absolute inset-y-0 right-0 flex badges-center pr-4 text-red-500 self-center">
                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        {/if}
                                    </button>
                                {/each}
                            </ul>
                        {/if}
                    </div>   
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-y-4">
            {#if sortedBadges.filter(badge => badge.total.progress < 100).length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {#each sortedBadges.filter(badge => badge.total.progress < 100) as badge}
                        <div class={`relative flex flex-col gap-y-4 text-md border-2 ${badge.total.gamesLeft > 0 ? "border-neutral-300 dark:border-neutral-800" : "border-green-500 bg-green-500/50"} rounded-md p-2`}>
                            <img class="absolute -top-2 -right-2 w-8 h-8 z-10 bg-neutral-300 dark:bg-neutral-700 p-1 rounded-lg" src={`https://cdn.islandstats.xyz/games/${badge.icon || badge.icons}/icon.png`} alt="" />
                            
                            <div class="flex flex-row gap-x-2">
                                <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${badge.icons}/${badge.badge.icon}.png`} alt={badge.badge.name} />
                                <div class="flex flex-col badges-start mt-2 sm:mt-0 self-center">
                                    <p class="font-semibold">{badge.badge.name}</p>
                                    <p class="text-neutral-600 dark:text-neutral-400">{badge.badge.description}</p>
                                </div>
                            </div>
                            <div class="flex flex-col mt-auto">
                                <div class="flex flex-row gap-x-2 mx-2">
                                    <p class="font-bold">{calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).tier.name}</p>
                                    <div class="h-4 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                                        <div class={`flex flex-col h-full left-0 right-0 ${badge[totalMode ? "total" : "next"].progress > 98 ? "rounded-full" : "rounded-l-full"} text-center`} style={`width: calc(100% * ${badge[totalMode ? "total" : "next"].progress > 100 ? 1 : (badge[totalMode ? "total" : "next"].progress / 100)}); ${getColour(data.player.level)};`}></div>
                                    </div>
                                    <p class="font-bold">{totalMode ? badge.badge.tiers[badge.badge.tiers.length - 1].name : calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).next.name}</p>
                                </div>
                                <div class="my-2 mx-4">
                                    <p>Progress: <span class="font-semibold">{badge.stats[badge.badge.stat].toLocaleString()}</span> / {shortenNumber(totalMode ? badge.badge.tiers[badge.badge.tiers.length - 1].amount : calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).next.amount)} <span class="text-neutral-400 dark:text-neutral-600">({calculatePercentage(badge.stats[badge.badge.stat], totalMode ? badge.badge.tiers[badge.badge.tiers.length - 1].amount : calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).next.amount)}%)</span></p>
                                    <p>Average <span class="font-semibold">{badge.average.toLocaleString()}</span> per {getCycleText(badge, true)}, <span class="font-semibold">~{totalMode ? (badge.total.gamesLeft === Infinity ? badge.badge.tiers.slice(-1)[0].amount : badge.total.gamesLeft).toLocaleString() : ((badge.next.gamesLeft === Infinity ? calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).next.amount : badge.next.gamesLeft)).toLocaleString()}</span> more {getCycleText(badge)}</p>
                                    {#if badge.total.progress < 100}
                                        <div class="flex flex-row gap-x-1 *:self-center">
                                            <span>Earns</span>
                                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Skill Trophies" class="w-5 h-5 self-center" />
                                            <span class="font-semibold">{totalMode ? (badge.badge.tiers.reduce((a, b) => a += b.trophies, 0) - calculateTrophies(badge.stats, [badge.badge])) : (calculateBadgeTier(badge.stats[badge.badge.stat], badge.badge.tiers).next.trophies) }</span>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-lg">Nothing to show!</p>
            {/if}
        </div>
    {:else}
        <p class="text-xl">Statistics are disabled!</p>
    {/if}
</div>