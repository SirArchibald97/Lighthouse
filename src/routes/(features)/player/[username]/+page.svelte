<script>
    import PlayerCard from "$lib/components/player/PlayerCard.svelte";
    import SocialCard from "$lib/components/player/SocialCard.svelte";
	import Games from "$lib/components/player/Games.svelte";
	import Hunting from "$lib/components/player/Hunting.svelte";
    import { getRankName } from "$lib/utils.js";
    
    export let data;

    let infoTab = "games";
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
			`Crown Level: ${data.player.level?.toLocaleString()}`,
			`Total Trophies: ${data.player.trophies?.total?.toLocaleString()}`,
			`Skill Trophies: ${data.player.trophies?.skill.total?.toLocaleString()}`,
			`Style Trophies: ${data.player.trophies?.style.total?.toLocaleString()}`
		].join("\n")}
	/>
    <meta name="theme-color" content="#ef4444" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div>
    {#if data.success === false}
        <div class="border border-neutral-300 dark:border-neutral-800 rounded-lg py-2 mx-auto">
            <p class="text-center text-xl text-neutral-900 dark:text-neutral-100 py-2">I couldn't find any data for that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="lg:basis-1/4 flex flex-col gap-y-4">
                <PlayerCard {data} />
                <SocialCard {data} />

                <div class="flex flex-col gap-y-2 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-neutral-100 p-2 shadow-md">
                    <p><span class="font-semibold">Not seeing your stats?</span> Make sure to set your API preferences on Island from your in-game settings!</p>
                    <p><span class="font-semibold">Found a bug or have a suggestion?</span> Let me know on the <a href="https://discord.gg/JXdQ54DPtd" class="text-blue-500 underline">Discord server</a>!</p>
                </div>
            </div>

            <div class="lg:basis-3/4 flex flex-col border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-md shadow-md">
                <div class="flex flex-row justify-center sm:justify-normal gap-x-2 text-md border-b border-neutral-300 dark:border-neutral-800 p-2">
                    <button on:click={() => switchInfoTab("games")} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${infoTab === "games" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/games/battle_box/icon.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Games</span>
                    </button>
                    <button on:click={() => switchInfoTab("hunting")} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${infoTab === "hunting" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Trophy Hunting</span>
                    </button>
                    <button on:click={() => switchInfoTab("questing")} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${infoTab === "questing" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="/icons/questing.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Questing</span>
                    </button>
                    <button on:click={() => switchInfoTab("crafting")} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${infoTab === "crafting" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="/icons/crafting.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Crafting</span>
                    </button>
                    <button on:click={() => switchInfoTab("fishing")} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${infoTab === "fishing" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="/icons/cod.webp" alt="Games Icon" /><span class="self-center hidden sm:flex">Fishing</span>
                    </button>
                </div>
                
                {#if infoTab === "games"}
                    <Games {data} />

                {:else if infoTab === "hunting"}
                    <Hunting {data} />

                {:else if infoTab === "questing"}
                    <p class="self-center text-md text-neutral-600 dark:text-neutral-300 p-4">Coming Soon</p>

                {:else if infoTab === "crafting"}
                    <p class="self-center text-md text-neutral-600 dark:text-neutral-300 p-4">Coming Soon</p>

                {:else if infoTab === "fishing"}
                    <p class="self-center text-md text-neutral-600 dark:text-neutral-300 p-4">Coming Soon</p>

                {/if}
            </div>
        </div>
    {/if}
</div>