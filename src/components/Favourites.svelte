<script>
    import Star from "$lib/svgs/Star.svelte";
    import LeftArrow from "$lib/svgs/LeftArrow.svelte";
    import { getRankIcon } from "$lib/utils.js";

    export let data;
    export let form;

    let showFavourites = false;
    function toggleFavourites() { showFavourites = !showFavourites; }

    if (form) toggleFavourites();

    let selectedProfile = null;
    function selectProfile(username) { selectedProfile = username; }
</script>

<div class="flex flex-col gap-y-10 px-4 sm:px-24 2xl:px-96 py-8 bg-slate-100">
    <!-- featured profiles -->
    <p class="text-slate-700 dark:text-slate-200 text-3xl text-center font-semibold">Featured Profiles</p>
    <form method="POST" action="?/lookup" class={`${showFavourites && data?.favourites.length === 0 ? "flex flex-row justify-center" : "grid grid-cols-2 sm:grid-cols-3 gap-6"}`}>
        <input type="text" name="username" bind:value={selectedProfile} class="hidden" />

        <!-- favourites -->
        {#if showFavourites}
            {#if data?.favourites.length > 0}
                <button on:click={toggleFavourites} class="flex flex-col justify-center items-center bg-white rounded-lg p-4 hover:bg-slate-200 hover:scale-105 duration-100 shadow-md">
                    <div class="flex flex-row gap-x-1">
                        <span class="self-center w-6 h-6"><LeftArrow /></span>
                        <p class="text-2xl font-semibold">Go back</p>
                    </div>
                </button>

                {#each data?.favourites as favourite}
                    <button type="submit" on:click={() => selectProfile(favourite.username)} class="bg-white rounded-lg p-4 hover:bg-slate-200 hover:scale-105 duration-100 shadow-md">
                        <div class="flex flex-col justify-center items-center gap-y-3">
                            <img class="rounded-md" src={`https://crafatar.com/avatars/${favourite.uuid}?overlay`} alt={`SirArchibald97's Profile'`} />
                            <div class="flex flex-row gap-x-2">
                                <img class="h-8 w-8 bg-slate-400 rounded-md hidden sm:block" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(favourite.ranks)}`} alt={`SirArchibald97's rank`} />
                                <p class="text-slate-700 text-center text-lg font-semibold self-center">{favourite.username}</p>
                            </div>
                        </div>
                    </button>
                {/each}
            {:else}
                <button on:click={toggleFavourites} class="flex flex-col justify-center items-center bg-white rounded-lg px-24 py-20 hover:bg-slate-200 hover:scale-105 duration-100 shadow-md">
                    <div class="flex flex-row gap-x-1">
                        <span class="self-center w-6 h-6"><Star /></span>
                        <p class="text-2xl font-semibold">No favourites set!</p>
                    </div>
                    <p class="text-xl">Go back</p>
                </button>
            {/if}
        {:else}
            <button on:click={toggleFavourites} class="flex flex-col justify-center items-center bg-white rounded-lg p-4 hover:bg-slate-200 hover:scale-105 duration-100 shadow-md">
                <div class="flex flex-row gap-x-1">
                    <span class="self-center w-6 h-6"><Star /></span>
                    <p class="text-2xl font-semibold">Favourites</p>
                </div>
            </button>

            <!-- SirArchibald97 -->
            <button type="submit" on:click={() => selectProfile("SirArchibald97")} class="bg-white rounded-lg p-4 hover:bg-slate-200 hover:scale-105 duration-100 shadow-md">
                <div class="flex flex-col justify-center items-center gap-y-3">
                    <img class="rounded-md" src={`https://crafatar.com/avatars/19f9fd28-558c-4959-98c2-fb1a18bed0a1?overlay`} alt={`SirArchibald97's Profile'`} />
                    <div class="flex flex-row gap-x-2">
                        <img class="h-8 w-8 rounded-md hidden sm:block" src={`https://cdn.islandstats.xyz/ranks/moderator.png`} alt={`SirArchibald97's rank`} />
                        <p class="text-slate-700 text-center text-lg font-semibold self-center">SirArchibald97</p>
                    </div>
                </div>
            </button>

            <!-- most searched usernames -->
            {#each data.profiles as profile}
                <button type="submit" on:click={() => selectProfile(profile.username)} class="bg-white rounded-lg p-4 hover:bg-slate-200 hover:scale-105 duration-100 shadow-md">
                    <div class="flex flex-col justify-center items-center gap-y-3">
                        <img class="rounded-md" src={`https://crafatar.com/avatars/${profile.uuid}?overlay`} alt={`${profile.username}'s Profile'`} />
                        <div class="flex flex-row gap-x-2">
                            <img class="h-8 w-8 rounded-md bg-slate-400 hidden sm:block" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(profile.player.ranks)}`} alt={`${profile.username}'s rank`} />
                            <p class="text-slate-700 text-center text-lg font-semibold self-center">{profile.username}</p>
                        </div>
                    </div>
                </button>
            {/each}
        {/if}
    </form>
</div>