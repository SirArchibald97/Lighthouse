<script>
    import { getRankIcon } from "$lib/utils.js";
    import Star from "$lib/svgs/Star.svelte";

    export let data;

    let fullList = [];
    let friendIndex = 0;
    let intList = [];
    let counter = 0;
    let friendsOnline = 0;
    // loop through all friends
    for (let friend of data.player.social?.friends || []) {
        // if they are online, add one to online counter
        if (friend.status?.online) friendsOnline++;

        // if counter reaches is less than 10, add friend to sublist
        if (counter < 10) {
            intList.push(friend);
            counter++;
        }
        // when counter hits 10, add sublist to full list and reset both
        if (counter === 10) {
            fullList.push(intList);
            intList = [];
            counter = 0;
        }
    }
    // push any remaining friends to full list
    if (intList.length > 0) fullList.push(intList);
</script>

<div>
    <!-- party -->
    <div class="flex flex-col gap-y-8 bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
        <div>
            <p class="text-3xl font-bold mb-2">Party</p>
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

        <div>
            <p class="text-3xl font-bold mb-2">Friends {#if data.player.social}<span>({friendsOnline}/{data.player.social.friends.length} online)</span>{/if}</p>
            {#if data.player.social}
                {#if data.player.social.friends.length > 0}
                    <div class="flex flex-col gap-y-2">
                        {#each fullList[friendIndex] || [] as friend}
                            <div class="flex flex-row gap-y-1">
                                <img class="w-8 h-8 mr-2 rounded-md bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(friend.ranks)}`} alt={`${friend.username}'s Rank'`} />
                                <a class="hover:underline" href={`/player/${friend.username}`} data-sveltekit-reload>
                                    <p class="text-lg">{friend.username}</p>
                                </a>
                                {#if data.player.social.friends.find(f => f.username === friend.username)?.status?.online}<span class={`ml-2 self-center w-4 h-4 rounded-full bg-green-500`}></span>{/if}
                            </div>
                        {/each}
                    </div>
                    <div class="flex flex-row gap-2 mt-4">
                        {#each fullList || [] as list, count}
                            {#if count === friendIndex}
                                <button class="bg-slate-400 text-white rounded-lg px-2 py-1" disabled>{count + 1}</button>
                            {:else}
                                <button class="bg-slate-300 rounded-lg px-2 py-1" on:click={() => friendIndex = count}>{count + 1}</button>
                            {/if}
                        {/each}
                    </div>
                {:else}
                    <div class="flex flex-row gap-x-2">
                        <p class="text-xl">Nothing to show here yet!</p>
                        <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/emojis/pensive.png" alt="Sad emoji"/>
                    </div>
                {/if}
            {:else}
                <p class="text-xl">Social information is disabled!</p>
            {/if}
        </div>
    </div>
</div>