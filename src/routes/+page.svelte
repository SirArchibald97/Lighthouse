<script>
    import Search from "$lib/svgs/Search.svelte";
    import Discord from "$lib/components/Discord.svelte";
    import Favourites from "$lib/components/Favourites.svelte";
    import Globe from "$lib/svgs/Globe.svelte";
    import CompareArrows from "$lib/svgs/CompareArrows.svelte";
    import Trophy from "$lib/svgs/Trophy.svelte";

    export let data;
    export let form;
</script>

<svelte:head>
    <title>Lighthouse by SirArchibald</title>
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />
    <meta name="description" content="MCC Island Stats by SirArchibald! Lookup any player to view their game stats, currency, socials and more!" />
</svelte:head>
<main>
    <div class="flex flex-row bg-red-500 place-content-end">
        <form method="POST" action="?/login" class="m-4">
            <button class="bg-white text-slate-800 text-lg px-5 py-2 shadow-md rounded-md hover:scale-105 hover:bg-slate-100 duration-100">
                Login
            </button>
        </form>
    </div>
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

    <Discord />

    <p class="text-3xl font-semibold text-center my-8">Features</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-4 sm:mx-24 2xl:mx-96 my-8">
        <div class="flex flex-col bg-white p-4 shadow-md rounded-md">
            <div class="flex flex-row gap-x-2 place-self-center">
                <span class="self-center w-8 h-8"><Globe /></span>
                <p class="text-2xl self-center font-semibold">Leaderboards</p>
            </div>
            <p class="text-center text-lg mt-2">
                View leaderboards for over 80 different stats and badges, filter by username and sort in ascending or descending order!
            </p>
            <a href="/leaderboards" class="mt-6 px-3 py-1 bg-red-500 text-white text-center shadow-md rounded-md hover:scale-105 duration-100">
                View leaderboards
            </a>
        </div>
        <div class="flex flex-col bg-white p-4 shadow-md rounded-md">
            <div class="flex flex-row gap-x-2 place-self-center">
                <span class="self-center w-8 h-8"><CompareArrows /></span>
                <p class="text-2xl self-center font-semibold">Compare</p>
            </div>
            <p class="text-center text-lg mt-2">
                Compare the profiles of two players side by side and see the differences in their stats and badges!
            </p>
            <a href="/compare" class="mt-6 px-3 py-1 bg-red-500 text-white text-center shadow-md rounded-md hover:scale-105 duration-100">
                Compare
            </a>
        </div>
        <div class="flex flex-col bg-white p-4 shadow-md rounded-md">
            <div class="flex flex-row gap-x-2 place-self-center">
                <span class="self-center w-8 h-8"><Trophy /></span>
                <p class="text-2xl self-center font-semibold">Leagues</p>
            </div>
            <p class="text-center text-lg mt-2">
                Join or create a league and get a personalised leaderboard for you and friends and compete for the top spot!
            </p>
            <a href="/leagues" class="mt-6 px-3 py-1 bg-red-500 text-white text-center shadow-md rounded-md hover:scale-105 duration-100">
                Join a league
            </a>
        </div>
        <!---
        <div class="flex flex-col bg-white p-4 shadow-md rounded-md">
            <div class="flex flex-row gap-x-2 place-self-center">
                <img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy Icon" class="w-8 h-8 self-center" />
                <p class="text-2xl self-center font-semibold">Tournaments</p>
            </div>
            <p class="text-center text-lg mt-2">
                Host tournaments with your friends, create teams and brackets and see who comes out on top!
            </p>
        </div>
        -->
    </div>

    <footer class={`w-full bg-red-500 p-4`}>
        <div>
            <p class="text-center text-slate-100">© 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> • Not affiliated with Minecraft or Noxcrew!</p>
        </div>
    </footer>
</main>