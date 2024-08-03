<script>
    import Sun from "$lib/svgs/Sun.svelte";
    import Moon from "$lib/svgs/Moon.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import theme from '$lib/stores/theme.js';
    import { PUBLIC_DISCORD_LOGIN_URL } from "$env/static/public";

    export let data;
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
                {#if data.user}
                    {#if data.user.minecraft}
                        <a class="self-center" href={`/player/${data.user.minecraft.username}`}>
                            <img src={`https://mc-heads.net/avatar/${data.user.minecraft.uuid}/128`} alt="" class="w-10 h-10 self-center rounded-md" />
                        </a>
                    {:else}
                        <a class="self-center text-md border border-neutral-300 dark:border-neutral-800 p-2 px-4 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100" href="/link">
                            Not linked!
                        </a>
                    {/if}

                {:else}
                    <a class="text-md border border-neutral-300 dark:border-neutral-800 p-2 px-4 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100" href={PUBLIC_DISCORD_LOGIN_URL}>
                        Login
                    </a>
                {/if}

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

    <div class="flex-1 mx-4 2xl:mx-44">
        <slot />
    </div>

    <Footer />
</main>