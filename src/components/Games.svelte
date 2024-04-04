<script>
    import BattleBox from "./games/BattleBox.svelte";
    import SkyBattle from "./games/SkyBattle.svelte";
    import Tgttos from "./games/Tgttos.svelte";
    import Hitw from "./games/Hitw.svelte";
    import Dynaball from "./games/Dynaball.svelte";
    import Dojo from "./games/Dojo.svelte";
    import Survivor from "./games/Survivor.svelte";

    export let data;

    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }

    let sbCategory = "quads";
    function switchSBCategory(category) { sbCategory = category; }
</script>

<div>
    <!-- stats -->
    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
        {#if data.player.statistics}
            <p class="text-3xl font-bold mb-2">Games</p>
            <div class="flex flex-col gap-y-3">

                <!--  BATTLE BOX -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "bb" ? null : "bb")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/battle_box/icon.png" alt="Battle Box Stats" />
                        <p class="text-xl font-semibold">Battle Box</p>
                    </button>
                    {#if expandedCategory === "bb"}
                        <BattleBox stats={data.player.statistics.battle_box} />
                    {/if}
                </div>

                <!--  SKY BATTLE -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "sb" ? null : "sb")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/sky_battle/icon.png" alt="Battle Box Stats" />
                        <p class="text-xl font-semibold">Sky Battle</p>
                    </button>
                    {#if expandedCategory === "sb"}
                        <div class="flex flex-row mt-4 mb-2">
                            <button on:click={() => switchSBCategory("quads")} class={`bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-l-sm ${sbCategory === "quads" ? "border-b-4 border-red-400" : ""}`}>Quads</button>
                            <button on:click={() => switchSBCategory("summer")} class={`bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-r-sm ${sbCategory === "summer" ? "border-b-4 border-red-400" : ""}`}>Water Fight</button>
                        </div>

                        <SkyBattle stats={data.player.statistics.sky_battle[sbCategory]} />
                    {/if}
                </div>

                <!-- TGTTOS -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "tgttos" ? null : "tgttos")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/tgttos/icon.png" alt="Battle Box Stats" />
                        <p class="text-xl font-semibold">To Get To The Other Side</p>
                    </button>
                    {#if expandedCategory === "tgttos"}
                        <Tgttos stats={data.player.statistics.tgttos} />
                    {/if}
                </div>

                <!--  HITW -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "hitw" ? null : "hitw")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/hitw/icon.png" alt="HITW Stats" />
                        <p class="text-xl font-semibold">Hole in the Wall</p>
                    </button>
                    {#if expandedCategory === "hitw"}
                        <Hitw stats={data.player.statistics.hitw} />
                    {/if}
                </div>

                <!-- DYNABALL -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "db" ? null : "db")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/dynaball/icon.png" alt="HITW Stats" />
                        <p class="text-xl font-semibold">Dynaball</p>
                    </button>
                    {#if expandedCategory === "db"}
                        <Dynaball stats={data.player.statistics.dynaball} />
                    {/if}
                </div>

                <!-- DOJO -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "dojo" ? null : "dojo")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/pkw/icon.png" alt="PKW Stats" />
                        <p class="text-xl font-semibold">Parkour Warrior Dojo</p>
                    </button>
                    {#if expandedCategory === "dojo"}
                        <Dojo stats={data.player.statistics.pkw.dojo} />
                    {/if}
                </div>

                <!-- SURVIVOR -->
                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                    <button on:click={() => switchCategory(expandedCategory === "survivor" ? null : "survivor")} class="flex flex-row w-full">
                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/pkw/icon.png" alt="PKW Stats" />
                        <p class="text-xl font-semibold">Parkour Warrior Survivor</p>
                    </button>
                    {#if expandedCategory === "survivor"}
                        <Survivor stats={data.player.statistics.pkw.survivor} />
                    {/if}
                </div>
            </div>
        {:else}
            <p class="text-xl font-semibol">Statistics are disabled!</p>
        {/if}
    </div>
</div>