<script>
    import Sun from "$lib/svgs/Sun.svelte";
    import Moon from "$lib/svgs/Moon.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import theme from '$lib/stores/theme.js';
    import { PUBLIC_DISCORD_LOGIN_URL } from "$env/static/public";

    $: dark = $theme === 'dark';
    let username = "";

    export let data;
    export let form;
</script>

<div class={`flex flex-col min-h-screen ${dark ? "dark" : ""} bg-neutral-50 dark:bg-neutral-900 duration-100`}>
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
        <div class="flex flex-col items-center gap-y-4 py-4 border border-neutral-300 dark:border-neutral-800 rounded-md">
            {#if data.loggedIn}
                <p class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Enter your Minecraft username</p>
                {#if data.linked}
                    <p class="text-neutral-900 dark:text-neutral-100">This account is already linked to <span class="font-semibold">{data.account.username}</span>, enter a new username below to update it!</p>
                {/if}
                <div class="flex flex-row gap-x-2">
                    <form method="POST" action="?/link" class="flex flex-row gap-x-2">
                        {#if form}
                            <p>{form.error}</p>
                        {/if}
                        <input class="px-3 py-2 rounded-md text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800" name="username" type="text" placeholder="Username" minlength="3" maxlength="16" bind:value={username} />
                        <button type="submit" class="bg-red-500 hover:bg-red-700 dark:bg-red-500/80 dark:hover:bg-red-500/60 px-4 py-2 rounded-md">Link</button>
                    </form>
                </div>
            {:else}
                <p class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">You must be logged in to access this page!</p>
                <a class="bg-red-500 dark:bg-red-500/40 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-md" href={PUBLIC_DISCORD_LOGIN_URL}>Login</a>
            {/if}
        </div>
    </div>

    <Footer />
</div>