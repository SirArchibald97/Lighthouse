<script>
    import Star from "$lib/svgs/Star.svelte";
    import PlayerCard from "$lib/components/player/PlayerCard.svelte";
    import Levels from "$lib/components/player/Levels.svelte";
    import Party from "$lib/components/player/Party.svelte";
    import Friends from "$lib/components/player/Friends.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BattleBox from "$lib/components/games/BattleBox.svelte";
    import SkyBattle from "$lib/components/games/SkyBattle.svelte";
    import Tgttos from "$lib/components/games/Tgttos.svelte";
    import Hitw from "$lib/components/games/Hitw.svelte";
    import Dynaball from "$lib/components/games/Dynaball.svelte";
    import Dojo from "$lib/components/games/Dojo.svelte";
    import Survivor from "$lib/components/games/Survivor.svelte";
	import RocketSpleef from "$lib/components/games/RocketSpleef.svelte";
    
    export let data;
    export let form;

    let infoTab = "levels";
    function switchInfoTab(newTab) { infoTab = newTab; }

    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }

    let sbCategory = "quads";
    function switchSBCategory(category) { sbCategory = category; toggle(); }
</script>

<svelte:head>
    <title>{data.player.username ? `${data.player.username}'s Stats` : "Unknown Player"}</title>
    <link rel="icon" type="image/png" href={`https://craftar.com/avatars/${data.player.uuid}?overlay`} />
    <meta name="description" content={`View ${data.player.username}'s stats on MCC Island Stats by SirArchibald, including game stats, currency, socials and more!`} />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<main class="py-4 mx-4 2xl:mx-24">
    {#if data.success === false}
        <div class="border-2 border-red-300 bg-slate-50 rounded-lg py-2">
            <p class="text-center text-3xl text-slate-800 font-semibold py-2">I couldn't find any data for that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="basis-80 flex flex-col gap-y-4 mb-8">
                
                <!-- player info card -->
                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 sm:self-start w-full">
                    <PlayerCard data={data} />
                </div>

                <!-- notice card -->
                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 self-center sm:self-start w-full text-sm 2xl:text-md">
                    <p><span class="font-semibold">Not seeing your stats?</span> Make sure to set your API preferences in your in-game settings!</p>
                    <p class="mt-4"><span class="font-semibold">Found a bug?</span> Report it on the <a href="https://discord.gg/JXdQ54DPtd" class="text-blue-500 underline">Discord server</a>!</p>
                </div>
            </div>

            <!-- main container -->
            <div class="flex flex-col col-span-4 grow">
                <!-- tabs -->
                <div class="grid grid-cols-3 gap-y-2 md:flex md:flex-row text-xl mb-4 gap-x-4 self-center sm:self-start">
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "levels" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("levels")}>Levels</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "games" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("games")}>Games</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "party" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("party")}>Party</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "friends" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("friends")}>Friends</button>
                    
                    <form method="POST" action="?/favourite" class="bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm text-md px-1 py-2">
                        <input type="text" name="username" class="hidden" bind:value={data.player.username} />
                        <input type="text" name="uuid" class="hidden" bind:value={data.uuid} />
                        <input type="text" name="ranks" class="hidden" bind:value={data.player.ranks} />

                        <button type="submit" class="flex flex-row place-items-center font-semibold hover:bg-slate-100 hover:scale-105 text-md py-1 px-3 rounded-md">
                            {#if !form?.favourites.find(f => f?.username === data.player.username) && !data.favourite}
                                <span class="w-6 h-6"><Star fill={false} /></span>
                            {:else}
                                <span class="w-6 h-6"><Star fill={true} /></span>
                            {/if}
                        </button>
                    </form>
                </div>

                {#if infoTab === "levels"}
                    <Levels data={data} />

                {:else if infoTab === "games"}
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
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/parkour_warrior/icon.png" alt="PKW Stats" />
                                        <p class="text-xl font-semibold">Parkour Warrior Dojo</p>
                                    </button>
                                    {#if expandedCategory === "dojo"}
                                        <Dojo stats={data.player.statistics.pkw.dojo} />
                                    {/if}
                                </div>

                                <!-- SURVIVOR -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "survivor" ? null : "survivor")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/parkour_warrior/solo/icon.png" alt="PKW Stats" />
                                        <p class="text-xl font-semibold">Parkour Warrior Survivor</p>
                                    </button>
                                    {#if expandedCategory === "survivor"}
                                        <Survivor stats={data.player.statistics.pkw.survivor} />
                                    {/if}
                                </div>

                                <!-- ROCKET SPLEEF -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "rsr" ? null : "rsr")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/rsr/icon.png" alt="PKW Stats" />
                                        <p class="text-xl font-semibold">Rocket Spleef Rush</p>
                                    </button>
                                    {#if expandedCategory === "rsr"}
                                        <RocketSpleef stats={data.player.statistics.rocket_spleef} />
                                    {/if}
                                </div>
                            </div>
                        {:else}
                            <p class="text-xl">Statistics are disabled!</p>
                        {/if}
                    </div>

                {:else if infoTab === "party"}
                    <Party data={data} />

                {:else if infoTab === "friends"}
                    <Friends data={data} />
                {/if}                
            </div>
        </div>
    {/if}
</main>

<Footer absolute={expandedCategory ? false : true} />