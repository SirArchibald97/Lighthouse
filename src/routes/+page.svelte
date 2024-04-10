<script>
    import Search from "$lib/svgs/Search.svelte";
    import Discord from "../components/Discord.svelte";
    import Favourites from "../components/Favourites.svelte";
    import About from "../components/About.svelte";

    export let data;
    export let form;
</script>

<svelte:head>
    <title>Lighthouse by SirArchibald</title>
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />
    <meta name="description" content="MCC Island Stats by SirArchibald! Lookup any player to view their game stats, currency, socials and more!" />
</svelte:head>
<main>
    <div class="flex flex-col items-center px-4 sm:px-24 py-32 bg-red-500">
        <p class="text-slate-100 text-5xl sm:text-7xl font-bold text-center">Lighthouse</p>
        <p class="text-slate-100 text-xl mt-2">by SirArchibald</p>

        <!-- search -->
        <div class="py-5">
            <form method="POST" action="?/lookup">
                <div class="flex flex-row bg-slate-100 rounded-lg px-3 py-3">
                    <span class="pr-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </div>

    <Favourites {data} {form} />
    <div class="flex flex-col gap-y-10 px-4 sm:px-24 2xl:px-96 py-8 bg-slate-100">
        <p class="text-slate-800 text-3xl text-center font-semibold">Leaderboards</p>
        <div class="flex flex-col text-slate-800 bg-white rounded-md shadow-md mx-4 sm:mx-56 p-4 text-xl">
            <div class="flex flex-col items-center">
                <div class="flex flex-row gap-x-2">
                    <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy Icon" class="w-8 h-8 self-center" />
                    <p>See the top players in each game!</p>
                </div>
                <div class="flex flex-row gap-x-2">
                    <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy Icon" class="w-8 h-8 self-center" />
                    <p>Find out where you rank in the global leaderboards!</p>
                </div>
                <div class="flex flex-row gap-x-2">
                    <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy Icon" class="w-8 h-8 self-center" />
                    <p>Sort by stat, badge and username!</p>
                </div>
            </div>

            <a href="/leaderboards" class="mt-4 place-self-center bg-red-500 px-5 py-2 rounded-md hover:scale-105 text-white duration-100">
                View leaderboards
            </a>
        </div>
    </div>
    <!--
    <Discord />
    <About />
    -->

    <footer class={`w-full bg-red-500 p-4`}>
        <div>
            <p class="text-center text-slate-100">© 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> • Not affiliated with Minecraft or Noxcrew!</p>
        </div>
    </footer>
</main>