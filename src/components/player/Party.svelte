<script>
    import { getRankIcon } from "$lib/utils.js";
    import Star from "$lib/svgs/Star.svelte";

    export let data;
</script>

<div>
    <!-- party -->
    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
        {#if data.player.social}
            {#if data.player.social.party.active}
                <p class="text-3xl font-bold mb-2">Party ({data.player.social.party.members?.length} members)</p>
                {#each data.player.social.party.members || [] as member}
                    <div class="flex flex-row mb-2">
                        <img class="w-8 h-8 rounded-md bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(member.ranks)}`} alt={`${member.username}'s Rank'`} />
                        <a class="flex flex-row gap-1" href={`/player/${member.username}`} data-sveltekit-reload>
                            <p class="text-lg ml-2 hover:underline">{member.username}</p>
                            {#if member.username === data.player.social.party.leader?.username}
                                <span class="w-6 h-6 pt-1 pl-1"><Star /></span>
                            {/if}
                        </a>
                    </div>
                {/each}
            {:else}
                <p class="text-xl">Not currently partied!</p>
            {/if}
        {:else}
            <p class="text-xl">Social information is disabled!</p>
        {/if}
    </div>
</div>