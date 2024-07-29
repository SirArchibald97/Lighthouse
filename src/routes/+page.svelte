<script>
    import Search from "$lib/svgs/Search.svelte";
    import Favourites from "$lib/components/Favourites.svelte";
    import Features from "$lib/components/Features.svelte";
    import Sun from "$lib/svgs/Sun.svelte";
    import Moon from "$lib/svgs/Moon.svelte";
    import theme from '$lib/stores/theme.js';
    import { PUBLIC_DISCORD_LOGIN_URL } from "$env/static/public";

    $: dark = $theme === 'dark';

    export let data;
    export let form;
</script>

<svelte:head>
    <title>Lighthouse by SirArchibald</title>
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />
    <meta name="description" content="MCC Island Stats by SirArchibald! Lookup any player to view their game stats, currency, socials and more!" />

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5229589229491714" crossorigin="anonymous"></script>
</svelte:head>
<main class={`${dark ? "dark" : ""} bg-neutral-50 dark:bg-neutral-900 duration-100`}>
    <div class="flex flex-row bg-red-500 dark:bg-red-500/40 place-content-end">
        {#if data.user}
            <a href={data.user.minecraft ? `/player/${data.user.minecraft.username}` : "/api/link"} class="flex flex-row gap-x-2 rounded-md bg-neutral-50 dark:bg-neutral-950 my-2 pl-3">
                <p class="self-center text-neutral-900 dark:text-neutral-100">{data.user.minecraft ? data.user.minecraft.username : "Not Linked"}</p>
                <img src={data.user.minecraft ? `https://mc-heads.net/avatar/${data.user.minecraft.uuid}/128` : "/no-pfp.webp"} alt="" class="w-11 h-11 self-center rounded-md" />
            </a>
        {:else}
            <a class="my-2 text-md border border-neutral-300 dark:border-neutral-800 p-2 px-4 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100" href={PUBLIC_DISCORD_LOGIN_URL}>
                Login
            </a>
        {/if}

        <button class="flex m-2 text-md border border-neutral-300 dark:border-neutral-800 p-2 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100" on:click={() => dark ? theme.set('light') : theme.set('dark')}>
            {#if dark}<span class="w-6 h-6 self-center"><Moon /></span>{:else}<span class="w-6 h-6 self-center"><Sun /></span>{/if}
        </button> 
    </div>
    
    <div class="flex flex-col items-center px-4 sm:px-24 py-12 sm:py-32 bg-red-500 dark:bg-red-500/40">
        <p class="text-slate-100 text-5xl sm:text-7xl font-bold text-center">Lighthouse</p>
        <p class="text-slate-100 text-xl mt-2">by SirArchibald</p>

        <!-- search -->
        <div class="py-5">
            <form method="POST" action="?/lookup">
                <div class="flex flex-row bg-slate-100 rounded-md px-3 py-3">
                    <span class="pr-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </div>

    <Favourites {data} {form} />

    <Features />

    <footer class={`w-full bg-red-500 dark:bg-red-500/40 p-4`}>
        <div>
            <p class="text-center text-slate-100">© 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> • Not affiliated with Minecraft or Noxcrew!</p>
        </div>
    </footer>
</main>