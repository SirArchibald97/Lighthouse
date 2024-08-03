<script>
    import General from "$lib/components/games/General.svelte";
    import BattleBox from "$lib/components/games/BattleBox.svelte";
    import SkyBattle from "$lib/components/games/SkyBattle.svelte";
    import Tgttos from "$lib/components/games/Tgttos.svelte";
    import Hitw from "$lib/components/games/Hitw.svelte";
    import Dynaball from "$lib/components/games/Dynaball.svelte";
    import Dojo from "$lib/components/games/Dojo.svelte";
    import Survivor from "$lib/components/games/Survivor.svelte";
	import RocketSpleef from "$lib/components/games/RocketSpleef.svelte";
    import { slide } from "svelte/transition";

    export let data;

    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }
</script>

<div class="rounded-sm p-4">
    {#if data.player.statistics}
        <p class="text-3xl font-bold mb-4">Games</p>
        <div class="flex flex-col gap-y-3">

            <!-- GENERAL -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "general" ? null : "general")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/emojis/crown.png" alt="General Icon" />
                    <p class="text-xl font-semibold">General</p>
                </button>
                {#if expandedCategory === "general"}
                    <div transition:slide={{ duration: 400 }}>
                        <General player={data.player} />
                    </div>
                {/if}
            </div>

            <!--  BATTLE BOX -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "bb" ? null : "bb")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/battle_box/icon.png" alt="Battle Box Icon" />
                    <p class="text-xl font-semibold">Battle Box</p>
                </button>
                {#if expandedCategory === "bb"}
                    <div transition:slide={{ duration: 400 }}>
                        <BattleBox stats={data.player.statistics.battle_box} />
                    </div>
                {/if}
            </div>

            <!--  SKY BATTLE -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "sb" ? null : "sb")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/sky_battle/icon.png" alt="Sky Battle Icon" />
                    <p class="text-xl font-semibold">Sky Battle</p>
                </button>
                {#if expandedCategory === "sb"}
                    <div transition:slide={{ duration: 400 }}>
                        <SkyBattle ostats={data.player.statistics.sky_battle} />
                    </div>
                {/if}
            </div>

            <!-- TGTTOS -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "tgttos" ? null : "tgttos")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/tgttos/icon.png" alt="TGTTOS Icon" />
                    <p class="text-xl font-semibold">To Get To The Other Side</p>
                </button>
                {#if expandedCategory === "tgttos"}
                    <div transition:slide={{ duration: 400 }}>
                        <Tgttos stats={data.player.statistics.tgttos} />
                    </div>
                {/if}
            </div>

            <!--  HITW -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "hitw" ? null : "hitw")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/hitw/icon.png" alt="HITW Icon" />
                    <p class="text-xl font-semibold">Hole in the Wall</p>
                </button>
                {#if expandedCategory === "hitw"}
                    <div transition:slide={{ duration: 400 }}>
                        <Hitw stats={data.player.statistics.hitw} />
                    </div>
                {/if}
            </div>

            <!-- DYNABALL -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "db" ? null : "db")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/dynaball/icon.png" alt="HITW Icon" />
                    <p class="text-xl font-semibold">Dynaball</p>
                </button>
                {#if expandedCategory === "db"}
                    <div transition:slide={{ duration: 400 }}>
                        <Dynaball stats={data.player.statistics.dynaball} />
                    </div>
                {/if}
            </div>

            <!-- DOJO -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "dojo" ? null : "dojo")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/parkour_warrior/solo/icon.png" alt="PKW Icon" />
                    <p class="text-xl font-semibold">Parkour Warrior Dojo</p>
                </button>
                {#if expandedCategory === "dojo"}
                    <div transition:slide={{ duration: 400 }}>
                        <Dojo stats={data.player.statistics.pkw.dojo} />
                    </div>
                {/if}
            </div>

            <!-- SURVIVOR -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "survivor" ? null : "survivor")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/parkour_warrior/icon.png" alt="PKW Icon" />
                    <p class="text-xl font-semibold">Parkour Warrior Survivor</p>
                </button>
                {#if expandedCategory === "survivor"}
                    <div transition:slide={{ duration: 400 }}>
                        <Survivor stats={data.player.statistics.pkw.survivor} />
                    </div>
                {/if}
            </div>

            <!-- ROCKET SPLEEF -->
            <div class="flex flex-col items-start rounded-md border border-neutral-300 dark:border-neutral-800 p-3">
                <button on:click={() => switchCategory(expandedCategory === "rsr" ? null : "rsr")} class="flex flex-row w-full">
                    <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/rocket_spleef/icon.png" alt="Rocket Spleef Icon" />
                    <p class="text-xl font-semibold">Rocket Spleef Rush</p>
                </button>
                {#if expandedCategory === "rsr"}
                    <div transition:slide={{ duration: 400 }}>
                        <RocketSpleef stats={data.player.statistics.rocket_spleef} />
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <p class="text-xl">Statistics are disabled!</p>
    {/if}
</div>