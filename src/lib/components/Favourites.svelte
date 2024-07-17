<script>
    import { getRankIcon } from "$lib/utils.js";

    export let data;
</script>

<div class="flex flex-col px-4 sm:px-24 2xl:px-96 py-4 sm:py-8">
    <!-- featured profiles -->
    <p class="text-neutral-900 dark:text-neutral-100 text-2xl sm:text-3xl text-center font-semibold pb-4">Featured Profiles</p>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <a href="/player/SirArchibald97" class="flex flex-row justify-center gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 p-4 rounded-md">
            <div class="flex flex-col justify-center items-center gap-y-3">
                <img class="rounded-md w-24 h-24 sm:w-44 sm:h-44" src={`https://mc-heads.net/avatar/19f9fd28-558c-4959-98c2-fb1a18bed0a1/128`} alt={`SirArchibald97's Profile'`} />
                <div class="flex flex-row gap-x-2">
                    <img class="h-8 w-8 rounded-md hidden sm:block" src={`https://cdn.islandstats.xyz/ranks/moderator.png`} alt={`SirArchibald97's rank`} />
                    <p class="text-neutral-900 dark:text-neutral-100 text-center text-lg font-semibold self-center">SirArchibald97</p>
                </div>
            </div>
        </a>
    
        <!-- most searched usernames -->
        {#each data.profiles as profile}
            <a href={`/player/${profile.username}`} class="flex flex-row justify-center gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 duration-100 p-4 rounded-md">
                <div class="flex flex-col justify-center items-center gap-y-3">
                    <img class="rounded-md w-24 h-24 sm:w-44 sm:h-44" src={`https://mc-heads.net/avatar/${profile.uuid}/128`} alt={`${profile.username}'s Profile'`} />
                    <div class="flex flex-row gap-x-2">
                        <img class="h-8 w-8 rounded-md bg-slate-400 hidden sm:block" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(profile.player.ranks)}`} alt={`${profile.username}'s rank`} />
                        <p class="text-neutral-900 dark:text-neutral-100 text-center text-lg font-semibold self-center">{profile.username}</p>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>