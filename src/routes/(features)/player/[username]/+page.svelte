<script>
    import Star from "$lib/svgs/Star.svelte";
    import PlayerCard from "$lib/components/player/PlayerCard.svelte";
    import Factions from "$lib/components/player/Factions.svelte";
    import Games from "$lib/components/player/Games.svelte";
    import Party from "$lib/components/player/Party.svelte";
    import Friends from "$lib/components/player/Friends.svelte";
    import Footer from "$lib/components/Footer.svelte";
    
    export let data;
    export let form;

    let infoTab = "games";
    function switchInfoTab(newTab) { infoTab = newTab; }
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
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="basis-80 flex flex-col gap-y-4 mb-8">
                
                <!-- player info card -->
                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 sm:self-start w-full">
                    <PlayerCard data={data} />
                </div>

                <!-- notice card -->
                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 self-center sm:self-start w-full text-sm 2xl:text-lg">
                    <p><span class="font-semibold">Not seeing your stats?</span> Make sure to set your API preferences in your in-game settings!</p>
                    <p class="mt-4"><span class="font-semibold">Found a bug?</span> Report it on the <a href="https://discord.gg/JXdQ54DPtd" class="text-blue-500 underline">Discord server</a>!</p>
                </div>
            </div>

            <!-- main container -->
            <div class="flex flex-col col-span-4 grow">
                <!-- tabs -->
                <div class="flex flex-row text-xl mb-4 gap-x-4 self-center sm:self-start">
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "factions" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("factions")}>Factions</button>
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

                {#if infoTab === "factions"}
                    <Factions data={data} />

                {:else if infoTab === "games"}
                    <Games data={data} />

                {:else if infoTab === "party"}
                    <Party data={data} />

                {:else if infoTab === "friends"}
                    <Friends data={data} />
                {/if}                
            </div>
        </div>
    {/if}
</main>

<Footer data={data} />