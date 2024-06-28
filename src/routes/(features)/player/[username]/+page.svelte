<script>
    import Star from "$lib/svgs/Star.svelte";
    import PlayerCard from "$lib/components/player/PlayerCard.svelte";
    import Levels from "$lib/components/player/Levels.svelte";
    import Social from "$lib/components/player/Social.svelte";
    import Footer from "$lib/components/Footer.svelte";
	import Games from "$lib/components/player/Games.svelte";
	import Hunting from "$lib/components/player/Hunting.svelte";
    import { getRankName } from "$lib/utils.js";
    
    export let data;
    export let form;

    let infoTab = "levels";
    function switchInfoTab(newTab) { infoTab = newTab; }
</script>

<svelte:head>
    <title>{data.player.username ? `${data.player.username} • Lighthouse` : "Unknown Player"}</title>
    <link rel="icon" href={`https://mc-heads.net/avatar/${data.uuid}/128`} />    
    <meta name="description" content={`View ${data.player.username}'s stats on Lighthouse by SirArchibald, including game stats, currency, socials and more!`} />
    <meta name="og:title" content={`${data.player.username} • Lighthouse`} />
	<meta
		name="og:description"
		content={[
			`Rank: ${getRankName(data.player.ranks)}`,
			"", // Empty line
			`Crown Level: ${data.player.level.toLocaleString()}`,
			`Total Trophies: ${data.player.trophies.total.toLocaleString()}`,
			`Skill Trophies: ${data.player.trophies.skill.total.toLocaleString()}`,
			`Style Trophies: ${data.player.trophies.style.total.toLocaleString()}`
		].join("\n")}
	/>
    <meta name="theme-color" content="#ef4444" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<main class="flex-1 py-4 mx-4 2xl:mx-8">
    {#if data.success === false}
        <div class="border-2 border-red-300 bg-slate-50 rounded-lg py-2">
            <p class="text-center text-3xl text-slate-800 font-semibold py-2">I couldn't find any data for that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="basis-96 flex flex-col gap-y-4 mb-8">
                
                <!-- player info card -->
                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 sm:self-start w-full">
                    <PlayerCard data={data} />
                </div>

                <!-- notice card -->
                <div class="flex flex-col gap-y-4 bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 self-center sm:self-start w-full text-sm 2xl:text-md">
                    <p><span class="font-semibold">Not seeing your stats?</span> Make sure to set your API preferences on Island from your in-game settings!</p>
                    <p><span class="font-semibold">Found a bug or have a suggestion?</span> Let me know on the <a href="https://discord.gg/JXdQ54DPtd" class="text-blue-500 underline">Discord server</a>!</p>
                </div>
            </div>

            <!-- main container -->
            <div class="flex flex-col col-span-4 grow">
                <!-- tabs -->
                <div class="grid grid-cols-2 gap-y-2 md:flex md:flex-row text-xl mb-4 gap-x-4 self-center sm:self-start">
                    <button class={`flex flex-row gap-x-2 bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "levels" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("levels")}>
                        <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" alt="Levels Tab" class="w-6 h-6 self-center" /><span class="self-center">Levels</span>
                    </button>
                    <button class={`flex flex-row gap-x-2 bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "games" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("games")}>
                        <img src="https://cdn.islandstats.xyz/games/battle_box/icon.png" alt="Games Tab" class="w-6 h-6 self-center" /><span class="self-center">Games</span>
                    </button>
                    <button class={`flex flex-row gap-x-2 bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "social" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("social")}>
                        <img src="https://cdn.discordapp.com/emojis/1040623207792775289.webp?quality=lossless" alt="Social Tab" class="w-6 h-6 self-center" /><span class="self-center">Social</span>
                    </button>
                    <!--
                    <button class={`flex flex-row gap-x-2 bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "crafting" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("crafting")}>
                        <img src="https://cdn.islandstats.xyz/icons/wardrobe/crafting.png" alt="Crafting Tab" class="w-6 h-6 self-center" /><span class="self-center">Crafting</span>
                    </button>
                    <button class={`flex flex-row gap-x-2 bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "fishing" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("fishing")}>
                        <img src="/cod.webp" alt="Fishing Tab" class="w-6 h-6 self-center" /><span class="self-center">Fishing</span>
                    </button>
                    -->
                    <button class={`flex flex-row gap-x-2 bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "hunting" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("hunting")}>
                        <img src="https://cdn.islandstats.xyz/icons/trophies/silver.png" alt="Trophy Hunting Tab" class="w-6 h-6 self-center" /><span class="self-center">Trophy Hunting</span>
                    </button>
                    

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
                    <Levels {data} />

                {:else if infoTab === "games"}
                    <Games {data} />

                {:else if infoTab === "social"}
                    <Social {data} />

                {:else if infoTab === "hunting"}
                    <Hunting {data} />

                {/if}                
            </div>
        </div>
    {/if}
</main>

<Footer />