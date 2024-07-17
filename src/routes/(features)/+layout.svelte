<script>
    import Sun from "$lib/svgs/Sun.svelte";
    import Moon from "$lib/svgs/Moon.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import theme from '$lib/stores/theme.js';

    $: dark = $theme === 'dark';
</script>

<main class={`flex flex-col min-h-screen ${dark ? "dark" : ""} bg-neutral-50 dark:bg-neutral-900 duration-100`}>
    <div class="flex flex-row justify-center w-full py-4 bg-red-500 dark:bg-red-500/40 border-b border-red-600 dark:border-red-500/40">
        <div class="flex flex-row justify-between w-4/5 sm:w-3/5">
            <a href="/" class="flex flex-row gap-x-2">
                <img src="https://mc-heads.net/avatar/19f9fd28-558c-4959-98c2-fb1a18bed0a1/128" alt="Logo" class="w-9 h-9 self-center rounded-sm" />
                <p class="self-center text-lg text-neutral-100">Lighthouse</p>
            </a>
    
            <div class="flex flex-row gap-x-2">
                <form method="POST" action="?/lookup" class="hidden sm:flex">
                    <input class="focus:outline dark:focus:outline-neutral-100 text-md dark:text-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-md px-3 py-2" name="username" type="text" placeholder="Search" />
                </form>
                <button on:click={() => dark ? theme.set('light') : theme.set('dark')} class="flex text-md border border-neutral-300 dark:border-neutral-800 p-2 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100">
                    {#if dark}
                        <span class="w-6 h-6 self-center"><Moon /></span>
                    {:else}
                        <span class="w-6 h-6 self-center"><Sun /></span>
                    {/if}
                </button>
            </div>
        </div>
    </div>

    <div class="flex-1 mx-4 sm:mx-44 my-4">
        <slot />
    </div>

    <Footer />
</main>