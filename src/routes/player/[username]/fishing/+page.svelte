<script>
    import { getIcon, getColour, trophiesToNextFishingEvolution } from "$lib/levels.js";
    import tooltip from "$lib/tooltip.js";
    import { slide } from "svelte/transition";

    export let data;

    const collections = [
        { climate: "Temperate", style: "border-green-400 dark:border-green-800 bg-green-300/50 dark:bg-green-700/50", islands: [
            { name: "Verdant Woods", type: "fish", icon: "verdant_woods", level: 0 },
            { name: "Sunken Swamp", type: "fish", grotto: true, icon: "grotto_temperate", level: 0 },
            { name: "Temperate Crab Pots", type: "crab", icon: "crab_pot", level: 0 },
            { name: "Floral Forest", type: "fish", icon: "floral_forest", level: 10 },
            { name: "Dark Grove", type: "fish", icon: "dark_grove", level: 20 },
        ]},
        { climate: "Tropical", style: "border-lime-400 dark:border-lime-800 bg-lime-300/50 dark:bg-lime-700/50", islands: [
            { name: "Tropical Overgrowth", type: "fish", icon: "tropical_overgrowth", level: 30 },
            { name: "Mirrored Oasis", type: "fish", grotto: true, icon: "grotto_tropical", level: 30 },
            { name: "Tropical Crab Pots", type: "crab", icon: "crab_pot", level: 30 },
            { name: "Coral Shores", type: "fish", icon: "coral_shores", level: 40 },
            { name: "Twisted Swamp", type: "fish", icon: "twisted_swamp", level: 45 },
        ]},
        { climate: "Barren", style: "border-amber-600 dark:border-amber-800 bg-amber-500/50 dark:bg-amber-700/50", islands: [
            { name: "Ancient Sands", type: "fish", icon: "ancient_sands", level: 50 },
            { name: "Volcanic Springs", type: "fish", grotto: true, icon: "grotto_barren", level: 50 },
            { name: "Barren Crab Pots", type: "crab", icon: "crab_pot", level: 50 },
            { name: "Blazing Canyon", type: "fish", icon: "blazing_canyon", level: 55 },
            { name: "Ashen Wastes", type: "fish", icon: "ashen_wastes", level: 60 },
        ]}
    ];

    const colours = {
        "COMMON": "text-neutral-500 dark:text-common",
        "UNCOMMON": "text-uncommon",
        "RARE": "text-rare",
        "EPIC": "text-epic",
        "LEGENDARY": "text-legendary",
        "MYTHIC": "text-mythic",
    };

    const weights = [
        { name: "Average", value: "AVERAGE" },
        { name: "Large", value: "LARGE" },
        { name: "Massive", value: "MASSIVE" },
        { name: "Gargantuan", value: "GARGANTUAN" },
        { name: "Colossal", value: "COLOSSAL" }
    ];
    
    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }

    function earnedTrophiesForIsland(island) {
        let runningTotal = 0;
        for (const fish of data.player.collections.fish.filter(f => f.fish.collection === island)) {
            for (const weight of fish.weights) {
                runningTotal += fish.fish[`${weight.weight.toLowerCase()}Trophies`];
            }
        }
        return runningTotal.toLocaleString();
    }

    function totalTrophiesForIsland(island) {
        let runningTotal = 0;
        for (const fish of data.player.collections.fish.filter(f => f.fish.collection === island)) {
            runningTotal += fish.fish.averageTrophies + fish.fish.largeTrophies + (fish.fish.massiveTrophies || 0) + (fish.fish.gargantuanTrophies || 0) + (fish.fish.colossalTrophies || 0);
        }
        return runningTotal.toLocaleString();
    }

    function caughtWeightsForIsland(island) {
        let runningTotal = 0;
        for (const fish of data.player.collections.fish.filter(f => f.fish.collection === island)) {
            runningTotal += fish.weights.length;
        }
        return runningTotal;
    }
</script>

<div>
    {#if data.player.collections?.fish}
        <div class="flex flex-col p-4">
            <p class="text-3xl font-bold">Fishing</p>

            <div class="flex flex-col items-center my-4 rounded-md border border-neutral-300 dark:border-neutral-800 py-4">
                <div class="flex flex-row gap-x-3 text-lg w-full lg:w-1/2 px-4">
                    <img src={`https://cdn.islandstats.xyz/fishing/level/${getIcon(data.player.crownLevel.fishingLevelData.level)}.png`} alt={`Crown Level ${data.player.crownLevel.fishingLevelData.level} Icon`} class="w-7 h-7 self-center" />
                    <span class="self-center font-bold text-xl">{data.player.crownLevel.fishingLevelData.level}</span>
        
                    <!-- progress bar -->
                    <div class="h-4 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                        <div class="flex flex-col h-full left-0 right-0 rounded-l-full text-center group" style={`width: calc(100% * ${data.player.crownLevel.fishingLevelData.nextLevelProgress.obtained / data.player.crownLevel.fishingLevelData.nextLevelProgress.obtainable}); ${getColour(data.player.crownLevel.fishingLevelData.level)}`}></div>
                    </div>
        
                    <span class="self-center font-bold text-xl">{data.player.crownLevel.fishingLevelData.level + 1}</span>
                </div>
                <p class="text-md text-neutral-500 dark:text-neutral-400">
                    Progress:
                    <span class="text-neutral-700 dark:text-neutral-300 font-semibold">{(data.player.crownLevel.fishingLevelData.nextLevelProgress.obtained / data.player.crownLevel.fishingLevelData.nextLevelProgress.obtainable * 100).toFixed(0)}%</span>
                    ({data.player.crownLevel.fishingLevelData.nextLevelProgress.obtained.toLocaleString()}/{data.player.crownLevel.fishingLevelData.nextLevelProgress.obtainable.toLocaleString()})
                </p>
                
                <div class="flex flex-row gap-x-2 text-md text-neutral-500 dark:text-neutral-400">
                    <div class="flex flex-row gap-x-2">
                        <span>Next evolution is</span>
                        <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/fishing/level/${getIcon(data.player.crownLevel.fishingLevelData.nextEvolutionLevel)}.png`} alt="Next Crown Evolution Icon" />
                        <span class="-ml-1 font-semibold text-neutral-700 dark:text-neutral-300">{data.player.crownLevel.fishingLevelData.nextEvolutionLevel}</span>
                        <span>in</span>
                        <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/trophies/blue.png`} alt="Angler Trophy Icon" />
                        <span class="-ml-1 font-semibold text-neutral-700 dark:text-neutral-300">{trophiesToNextFishingEvolution(data.player).toLocaleString()}</span>
                    </div>
                </div>
            </div>


            <div class="flex flex-col gap-y-3">
                <!-- CLIMATES -->
                {#each collections as collection}
                        <!-- ISLANDS -->
                        {#each collection.islands as island}
                            {#if data.player.crownLevel.fishingLevelData.level >= island.level}
                                <div class="flex flex-col gap-y-4 items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === island.name ? null : island.name)} class="flex flex-row w-full justify-between">
                                        <div class="flex flex-row gap-x-2 self-center">
                                            <img class="w-5 md:w-8 h-5 md:h-8 self-center" src={`/icons/fishing/${island.icon}.png`} alt={`${island.icon} Icon`} />
                                            <p class="text-md md:text-lg xl:text-xl font-semibold self-center">{island.name}</p>
                                        </div>
                                        <p class={`self-center text-xs md:text-sm xl:text-md border-2 ${collection.style} rounded-full px-3 py-1`}>{collection.climate} {island.grotto ? "Grotto" : (island.type === "crab" ? "Crabs" : "Island")}</p>
                                    </button>

                                    {#if expandedCategory === island.name}
                                        <div class="w-full" transition:slide={{ duration: 400 }}>
                                            <div class="mb-4">
                                                <div class="flex flex-row gap-x-1">
                                                    <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Angler Tropy Icon" />
                                                    <p class="self-center font-semibold">{earnedTrophiesForIsland(island.name)} / {totalTrophiesForIsland(island.name)}</p>
                                                </div>
                                                <p>Fish Caught: <span class="font-semibold">{data.player.collections.fish.filter(f => f.fish.collection === island.name && f.weights.length > 0).length}/{data.player.collections.fish.filter(f => f.fish.collection === island.name).length}</span></p>
                                                <p>Weights Caught: <span class="font-semibold">{caughtWeightsForIsland(island.name)}/{data.player.collections.fish.filter(f => f.fish.collection === island.name).length * (island.name.includes("Crab Pots") ? 3 : 4)}</span></p>
                                            </div>

                                            <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
                                                <!-- FISH -->
                                                {#each (island.type === "fish" ? data.player.collections.fish.filter(fish => fish.fish.collection === island.name) : data.player.collections.fish.filter(fish => fish.fish.climate === collection.climate && fish.fish.name.includes(" Crab"))) as fish}
                                                    <div class={`flex flex-row gap-x-2 p-2 bg-neutral-200 dark:bg-neutral-800 rounded-md`}>
                                                        <img class="w-8 md:w-12 h-8 md:h-12 self-center" src={`https://cdn.islandstats.xyz/fishing/fish/${island.type === "fish" ? fish.fish.collection.toLowerCase().replaceAll(" ", "_") : "crab_collection"}/${fish.fish.name.toLowerCase().replaceAll(" ", "_")}.png`} alt={fish.fish.name} />
                                                        <div class="flex flex-col md:w-full">
                                                            <div class="flex flex-row justify-between">
                                                                <div class="flex flex-row gap-x-1 md:gap-x-3">
                                                                    <p class={`self-center text-sm md:text-md font-semibold ${colours[fish.fish.rarity]}`}>{fish.fish.name}</p>
                                                                    <div class="flex flex-row gap-x-1">
                                                                        {#each weights.filter(w => { if (island.type === "fish" && w.value === "COLOSSAL") return false; else if (island.type === "crab" && (w.value === "MASSIVE" || w.value === "GARGANTUAN")) return false; else return true }) as weight}
                                                                            <img class={`w-4 md:w-5 h-4 md:h-5 self-center`} use:tooltip title={fish.weights.find(w => w.weight === weight.value) ? `First Caught: ${fish.weights.find(w => w.weight === weight.value).firstCaught}` : "Not Caught"} src={`/icons/${weight.name.toLowerCase()}_${fish.weights.find(w => w.weight === weight.value) ? "" : "empty_"}star.png`} alt={`${weight.name} Star Icon`} />
                                                                        {/each}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class={`hidden md:flex flex-row gap-x-1 px-1 md:px-2 py-1 rounded-full border ${(island.type === "fish" && fish.weights.length === 4) || (island.type === "crab" && fish.weights.length === 3) ? "border-green-400 dark:border-green-800 bg-green-300/50 dark:bg-green-700/50" : "border-neutral-400 dark:border-neutral-800 bg-neutral-300/50 dark:bg-neutral-700/50"}`}>
                                                                    <img class="w-3 md:w-5 h-3 md:h-5 self-center" src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Angler Trophy Icon" />
                                                                    <p class={`text-xs md:text-md self-center`}>
                                                                        {fish.weights.reduce((a, b) => a += fish.fish[`${weights.find(w => w.value === b.weight).name.toLowerCase()}Trophies`], 0)}/{fish.fish.averageTrophies + fish.fish.largeTrophies + (fish.fish.massiveTrophies || 0) + (fish.fish.gargantuanTrophies || 0) + (fish.fish.colossalTrophies || 0)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-col gap-y-2 text-xs md:text-sm xl:text-md">
                                                                <div class="flex flex-col md:flex-row gap-x-2 text-neutral-600 dark:text-neutral-400">
                                                                    <p>Type: <span class="text-neutral-900 dark:text-neutral-100">{fish.fish.elusive ? "Elusive" : "Normal"}</span></p>
                                                                    <p class="hidden md:flex">•</p>
                                                                    <p>Catch Time: <span class="text-neutral-900 dark:text-neutral-100">{fish.fish.catchTime.toLowerCase()[0].toUpperCase() + fish.fish.catchTime.toLowerCase().slice(1, fish.fish.catchTime.length)}</span></p>
                                                                </div>
                                                            </div>

                                                            <!-- SHOWN ONLY ON MOBILE -->
                                                            <div class={`flex md:hidden w-24 justify-center flex-row gap-x-1 mt-1 md:mt-0 px-1 md:px-2 py-1 rounded-full border ${(island.type === "fish" && fish.weights.length === 4) || (island.type === "crab" && fish.weights.length === 3) ? "border-green-400 dark:border-green-800 bg-green-300/50 dark:bg-green-700/50" : "border-neutral-400 dark:border-neutral-800 bg-neutral-300/50 dark:bg-neutral-700/50"}`}>
                                                                <img class="w-4 md:w-5 h-4 md:h-5 self-center" src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Angler Trophy Icon" />
                                                                <p class={`text-xs md:text-md self-center`}>
                                                                    {fish.weights.reduce((a, b) => a += fish.fish[`${weights.find(w => w.value === b.weight).name.toLowerCase()}Trophies`], 0)}/{fish.fish.averageTrophies + fish.fish.largeTrophies + (fish.fish.massiveTrophies || 0) + (fish.fish.gargantuanTrophies || 0) + (fish.fish.colossalTrophies || 0)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>                                             
                                                {/each}

                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            {:else}
                                <div class="flex flex-col items-start rounded-md bg-neutral-300/50 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-800 p-3">
                                    <button class="flex flex-row justify-between w-full">
                                        <div class="flex flex-row gap-x-2">
                                            <img class="w-5 md:w-8 h-5 md:h-8 self-center" src={`/icons/fishing/${island.icon}.png`} alt={`${island.icon} Icon`} />
                                            <p class="text-md md:text-lg xl:text-xl font-semibold self-center">{island.name}</p>
                                        </div>

                                        <div class="flex flex-row gap-x-1 self-center text-xs md:text-sm xl:text-md">
                                            <span class="self-center">Unlocked at</span>
                                            <img src={`https://cdn.islandstats.xyz/fishing/level/${getIcon(Math.floor(island.level / 10) * 10)}.png`} alt="Fishing Level Icon" class="w-4 md:w-6 h-4 md:h-6 self-center" />
                                            <span class="self-center">{island.level}</span>
                                        </div>
                                    </button>
                                </div>
                            {/if}
                        {/each}
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex flex-col gap-y-3 content-center bg-neutral-300/50 dark:bg-neutral-800/50 p-4">
            <img class="w-12 h-12 self-center" src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow warning icon" />
            <p class="text-xl text-center font-semibold">Collections are disabled!</p>
        </div>
    {/if}
</div>