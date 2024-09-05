<script>
    import { page } from "$app/stores";
    import PlayerCard from "$lib/components/player/PlayerCard.svelte";
    import SocialCard from "$lib/components/player/SocialCard.svelte";
    import { getRankName } from "$lib/utils.js";
	import Ad from "$lib/components/Ad.svelte";
    
    export let data;

    let infoTab = "games";
    function switchInfoTab(newTab) { infoTab = newTab; }
</script>

<svelte:head>
    <title>{data.player?.username ? `${data.player?.username} • Lighthouse` : "Unknown Player"}</title>
    <link rel="icon" href={`https://mc-heads.net/avatar/${data.player?.uuid}/128`} />    
    <meta name="description" content={`View ${data.player?.username}'s stats on Lighthouse by SirArchibald, including game stats, currency, socials and more!`} />
    <meta name="og:title" content={`${data.player?.username} • Lighthouse`} />
	<meta
		name="og:description"
		content={[
			`Rank: ${getRankName(data.player?.ranks)}`,
			"", // Empty line
			`Crown Level: ${data.player?.level?.toLocaleString()}`,
			`Total Trophies: ${data.player?.trophies?.total?.toLocaleString()}`,
			`Skill Trophies: ${data.player?.trophies?.skill.total?.toLocaleString()}`,
			`Style Trophies: ${data.player?.trophies?.style.total?.toLocaleString()}`
		].join("\n")}
	/>
    <meta name="theme-color" content="#ef4444" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div>
    {#if !data.success}
        <div class="border border-neutral-300 dark:border-neutral-800 rounded-lg py-2 mx-auto">
            <p class="text-center text-xl text-neutral-900 dark:text-neutral-100 py-2">I couldn't find any data for that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="lg:basis-1/4 flex flex-col gap-y-4">
                <PlayerCard player={data.player} />
                <SocialCard player={data.player} />

                <div class="flex flex-col gap-y-2 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-neutral-100 p-2 shadow-md tracking-normal">
                    <p><span class="font-semibold">Not seeing your stats?</span> Make sure to set your API preferences on Island from your in-game settings!</p>
                    <p><span class="font-semibold">Found a bug or have a suggestion?</span> Let me know on the <a href="https://discord.gg/JXdQ54DPtd" class="text-blue-500 underline">Discord server</a>!</p>
                </div>

                {#if data.user && data.user?.minecraft?.username === data.player.username}
                    {#if data.user.minecraft}
                        {#if data.user.minecraft.username === data.player.username}
                            <a href="/api/logout" class="flex flex-col items-center gap-y-2 rounded-md text-md font-semibold text-neutral-900 dark:text-neutral-100 bg-red-500 hover:bg-red-700 dark:bg-red-500/40 dark:hover:bg-red-500/60 p-2 shadow-md">
                                Logout
                            </a>
                        {/if}
                    {/if}
                {/if}

                <Ad>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5229589229491714" crossorigin="anonymous"></script>
                    <!-- Player Side Banner -->
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-5229589229491714"
                        data-ad-slot="4157179618"
                        data-ad-format="auto"
                        data-full-width-responsive="true">
                    </ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </Ad>
            </div>

            <div class="lg:basis-3/4 flex flex-col gap-y-4 text-neutral-900 dark:text-neutral-100">
                <div class="flex flex-row justify-center sm:justify-normal gap-x-2 text-md *:rounded-md *:py-2">
                    <a href={`/player/${data.player.username}/games`} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${$page.url.pathname.endsWith("/games") ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/games/battle_box/icon.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Games</span>
                    </a>
                    <a href={`/player/${data.player.username}/hunting`} class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${$page.url.pathname.endsWith("/hunting") ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Trophy Hunting</span>
                    </a>
                    <div class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${$page.url.pathname.endsWith("/fishing") ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="/icons/cod.webp" alt="Games Icon" /><span class="self-center hidden sm:flex">Fishing</span>
                    </div>
                    <div class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${$page.url.pathname.endsWith("/questing") ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="/icons/questing.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Questing</span>
                    </div>
                    <div class={`flex flex-row gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 px-3 py-1 rounded-sm ${$page.url.pathname.endsWith("/crafting") ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                        <img class="w-6 h-6 self-center" src="/icons/crafting.png" alt="Games Icon" /><span class="self-center hidden sm:flex">Crafting</span>
                    </div>
                </div>
                
                <div class="border border-neutral-300 dark:border-neutral-800 rounded-md shadow-lg">
                    <slot {data} />
                </div>
            </div>
        </div>
    {/if}
</div>