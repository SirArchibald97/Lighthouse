<script>
    import "../app.css";
    import { inject } from '@vercel/analytics';
    inject();

    import Sun from "$lib/svgs/Sun.svelte";
    import Moon from "$lib/svgs/Moon.svelte";
    import NumberedList from "$lib/svgs/NumberedList.svelte";
    import Gift from "$lib/svgs/Gift.svelte";
    import CompareArrows from "$lib/svgs/CompareArrows.svelte";
    import Menu from "$lib/svgs/Menu.svelte";
    import Cross from "$lib/svgs/Cross.svelte";
	import Footer from "$lib/components/Footer.svelte";
    import { slide } from "svelte/transition";

    import theme from '$lib/stores/theme.js';
    $: dark = $theme === 'dark';

    import { page } from '$app/stores';

    let showMenu = false;
    function toggleMenu() { showMenu = !showMenu; }
</script>

<main class="font-inter tracking-wide">
    <div class={`${dark ? "dark" : ""} flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 duration-100`}>
        <!-- NAVBAR -->
        <div class="bg-red-500 dark:bg-red-500/40 px-2 py-2">
            <div class="flex flex-row justify-between items-center p-2 text-sm text-neutral-100">
                <a on:click={() => { if (showMenu) toggleMenu() }} href="/" class="flex flex-row gap-x-2 font-semibold duration-100 px-2 rounded-md self-center">Lighthouse</a>
    
                <div class="hidden lg:flex flex-col md:flex-row gap-x-4 gap-y-2 text-neutral-100">
                    <a href="/leaderboards" class="flex flex-row gap-x-2 font-semibold duration-100 px-2 rounded-md hover:bg-neutral-200/30 dark:hover:bg-neutral-800/50">
                        <span class="h-6 w-6 self-center"><NumberedList /></span><span class="self-center">Leaderboards</span>
                    </a>
                    <a href="/simulator" class="flex flex-row gap-x-2 font-semibold duration-100 px-2 rounded-md hover:bg-neutral-200/30 dark:hover:bg-neutral-800/50">
                        <span class="h-6 w-6 self-center"><Gift /></span><span class="self-center">Openable Simulator</span>
                    </a>
                    <p class="flex flex-row gap-x-2 font-semibold duration-100 px-2 py-1 rounded-md">
                        <span class="h-6 w-6 self-center"><CompareArrows /></span><span class="self-center">Compare</span><span class="px-3 bg-neutral-400 dark:bg-neutral-700 rounded-full self-center">Coming soon</span>
                    </p>
                </div>
        
                <div class="flex flex-row gap-x-2">
                    <button on:click={toggleMenu} class="flex lg:hidden self-center text-md border border-neutral-300 dark:border-neutral-800 p-2 rounded-md text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100">
                        {#if showMenu}<span class="w-4 md:w-6 h-4 sm:h-6 self-center"><Cross /></span>{:else}<span class="w-4 md:w-6 h-4 sm:h-6 self-center"><Menu /></span>{/if}
                    </button>
                    <div class="flex flex-row gap-x-2">
                        {#if $page.url.pathname !== "/"}
                            <form method="POST" action="?/lookup" class="hidden lg:flex font-semibold text-md py-2 flex-row gap-x-2 border border-neutral-300 dark:border-neutral-800 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 duration-100 rounded-md shadow-lg">
                                <input class="text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 focus:outline-none mx-3 duration-100 text-center" name="username" placeholder="Find a player" />
                            </form>
                        {/if}
                        <button on:click={() => dark ? theme.set('light') : theme.set('dark')} class="flex self-center text-md border border-neutral-300 dark:border-neutral-800 p-2 rounded-md text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100">
                            {#if dark}<span class="w-4 md:w-6 h-4 sm:h-6 self-center"><Moon /></span>{:else}<span class="w-4 md:w-6 h-4 sm:h-6 self-center"><Sun /></span>{/if}
                        </button>
                    </div>
                </div>
            </div>
            {#if showMenu}
                <div transition:slide={{ duration: 200 }} class="lg:hidden flex flex-col gap-y-2 px-2 text-neutral-100 *:border *:border-neutral-300 *:py-1">
                    <a on:click={toggleMenu} href="/leaderboards" class="flex flex-row gap-x-2 font-semibold duration-100 px-2 rounded-md hover:bg-neutral-200/30 dark:hover:bg-neutral-800/50">
                        <span class="h-6 w-6 self-center"><NumberedList /></span><span class="self-center">Leaderboards</span>
                    </a>
                    <a on:click={toggleMenu} href="/simulator" class="flex flex-row gap-x-2 font-semibold duration-100 px-2 rounded-md hover:bg-neutral-200/30 dark:hover:bg-neutral-800/50">
                        <span class="h-6 w-6 self-center"><Gift /></span><span class="self-center">Openable Simulator</span>
                    </a>
                    <p class="flex flex-row gap-x-2 font-semibold duration-100 px-2 py-1 rounded-md">
                        <span class="h-6 w-6 self-center"><CompareArrows /></span><span class="self-center">Compare</span><span class="text-xs md:text-sm px-3 bg-neutral-400 dark:bg-neutral-700 rounded-full self-center">Coming soon</span>
                    </p>
                </div>
            {/if}

            {#if $page.url.pathname === "/"}
                <div class="flex flex-col items-center px-4 py-12 sm:py-32">
                    <p class="text-slate-100 text-5xl sm:text-7xl font-bold text-center">Lighthouse</p>
                    <p class="text-slate-100 text-xl mt-2">by SirArchibald</p>
            
                    <form method="POST" action="?/lookup" class="my-5 py-2 flex flex-row gap-x-2 bg-neutral-100 rounded-md shadow-lg">
                        <input class=" bg-slate-100 focus:outline-none mx-3 focus:mx-6 duration-100 text-center" name="username" placeholder="Find a player" />
                    </form>
                </div>
            {/if}
        </div>
    
        <!-- CONTENT -->
        <div class="flex-1 m-4">
            <slot />
        </div>
    
        <Footer />
    </div>
</main>