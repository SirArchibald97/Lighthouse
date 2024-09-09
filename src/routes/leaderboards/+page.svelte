<script>
    import Ad from "$lib/components/Ad.svelte";

    const leaderboards = [
        { name: "Trophies", page: "trophies", icon: "https://cdn.islandstats.xyz/icons/trophies/yellow.png" },
        { name: "Battle Box", page: "battlebox", icon: "https://cdn.islandstats.xyz/games/battle_box/icon.png" },
        { name: "Sky Battle", page: "skybattle", icon: "https://cdn.islandstats.xyz/games/sky_battle/icon.png" },
        { name: "TGTTOS", page: "tgttos", icon: "https://cdn.islandstats.xyz/games/tgttos/icon.png" },
        { name: "Hole in the Wall", page: "hitw", icon: "https://cdn.islandstats.xyz/games/hitw/icon.png" },
        { name: "Dynaball", page: "dynaball", icon: "https://cdn.islandstats.xyz/games/dynaball/icon.png" },
        { name: "Parkour Warrior Dojo", page: "dojo", icon: "https://cdn.islandstats.xyz/games/parkour_warrior/solo/icon.png" },
        { name: "Parkour Warrior Survivor", page: "survivor", icon: "https://cdn.islandstats.xyz/games/parkour_warrior/icon.png" },
        { name: "Rocket Spleef Rush", page: "rsr", icon: "https://cdn.islandstats.xyz/games/rocket_spleef/icon.png" },
        { name: "Miscellaneous", page: "misc", icon: "https://cdn.islandstats.xyz/icons//currency/royal_reputation.png" }
    ];
</script>

<svelte:head>
    <title>Leaderboards • Lighthouse</title>
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />
    <meta name="description" content="Leaderboards for MCC Island • Lighthouse by SirArchibald" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col gap-y-4 text-neutral-900 dark:text-neutral-100">
    <p class="text-center text-4xl font-semibold mx-4 sm:mx-44">Leaderboards</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each leaderboards as leaderboard}
            <a href={`/leaderboards/${leaderboard.page}`} class="flex flex-col gap-y-3 py-2 rounded-sm border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100">
                <img src={leaderboard.icon} class="w-16 h-16 self-center" alt="Leaderboard Icon" />
                <p class="text-2xl text-neutral-900 dark:text-neutral-100 font-semibold self-center ml-2">{leaderboard.name}</p>
            </a>
        {/each}
    </div>
    <Ad>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5229589229491714" crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-5229589229491714"
            data-ad-slot="6242704329"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </Ad>
</div>