<script>
    import LeftChevron from "$lib/svgs/LeftChevron.svelte";
    import RightChevron from "$lib/svgs/RightChevron.svelte";
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";

    export let player;

    let tab = "friends";
    function switchTab(newTab) { tab = newTab; }

    let currentIndex = 0;

    let fullList = [];
    let intList = [];
    let counter = 0;
    // loop through all friends
    for (let friend of player.social?.friends || []) {
        // if counter reaches is less than 10, add friend to sublist
        if (counter < 8) {
            intList.push(friend);
            counter++;
        }
        // when counter hits 10, add sublist to full list and reset both
        if (counter === 8) {
            fullList.push(intList);
            intList = [];
            counter = 0;
        }
    }
    // push any remaining friends to full list
    if (intList.length > 0) fullList.push(intList);

    function selectPage(index) {
        if (index < 0) index = fullList.length - 1;
        if (index >= fullList.length) index = 0;
        currentIndex = index;
    }
</script>

<div class="flex flex-col text-neutral-900 dark:text-neutral-100">
    {#if player.social}
        <div class="flex flex-row w-full gap-x-2 text-md *:border-t-2 *:border-x-2 *:border-neutral-300 *:dark:border-neutral-800 *:rounded-t-md">
            <button on:click={() => switchTab("friends")} class={`w-1/2 flex flex-row justify-center gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100 px-3 py-1 rounded-sm ${tab === "friends" ? "bg-neutral-300 dark:bg-neutral-700" : ""}`}>
                <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/social/friend.png" alt="Party Icon" />
                <span class="self-center">Friends</span>
            </button>
            <button on:click={() => switchTab("party")} class={`w-1/2 flex flex-row gap-x-1 justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100 px-3 py-1 rounded-sm ${tab === "party" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>
                <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/social/party.png" alt="Party Icon" />
                <span class="self-center">Party</span>
            </button>
        </div>
        <div class="flex flex-col border-2 border-neutral-300 dark:border-neutral-800 rounded-b-md shadow-md p-3">
                {#if tab === "friends"}
                    {#if player.social.friends.length > 1}
                    <div class="flex-1 flex flex-col gap-y-2">
                        {#each fullList[currentIndex] || [] as friend}
                            <a href={`/player/${friend.username}/games`} class="flex flex-row justify-between gap-1 group rounded-md">
                                <div class="flex flex-row gap-x-2">
                                    <div class="relative">
                                        <img class="w-7 h-7 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://mc-heads.net/avatar/${friend.uuid}/128`} alt={`${friend.username}'s Rank'`} />
                                        {#if friend.status}
                                            <span class={`absolute z-10 -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-neutral-100 dark:border-neutral-900 ${friend.status.online ? "bg-green-500" : "bg-red-500"}`}></span>
                                        {/if}
                                    </div>
                                    <img class="w-7 h-7 rounded-sm bg-neutral-400 dark:bg-neutral-600" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(friend.ranks)}`} alt={`${friend.username}'s Rank'`} />
                                    <p class="text-lg self-center group-hover:underline">{friend.username}</p>
                                </div>
                                <div class="flex flex-row">
                                    {#if friend.status}
                                        {#if friend.status.online}
                                            <div class="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                                {#if friend.status.server?.category === "GAME"}
                                                    <p class="flex flex-row gap-x-1">
                                                        <span class="hidden md:flex">Playing</span>
                                                        <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(friend.status.server?.associatedGame)}/icon.png`} alt={`${friend.status.server?.associatedGame} Icon`} />
                                                        <span class="hidden md:flex font-semibold">{getStatusGame(friend.status.server?.associatedGame || friend.status.server.subType)}</span>
                                                    </p>
                                                {:else if friend.status.server?.category === "LOBBY"}
                                                    <p class="flex flex-row gap-x-1">
                                                        {#if friend.status.server.subType === "fishing"}
                                                            <span class="hidden md:flex">On a</span>
                                                            <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/fishing/icon.png`} alt="Fishing Rod Icon" />
                                                            <span class="hidden md:flex font-semibold">Fishing Island</span>
                                                        {:else}
                                                            <span class="hidden md:flex">In the</span>
                                                            <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(friend.status.server?.associatedGame) || "lobby"}/icon.png`} alt="Main Lobby Icon" />
                                                            <span class="hidden md:flex font-semibold">{getStatusGame(friend.status.server?.associatedGame || friend.status.server.subType) || "Main"} Lobby</span>
                                                        {/if}
                                                    </p>
                                                {/if}
                                            </div>
                                        {/if}
                                    {/if}
                                </div>
                            </a>
                        {/each}
                    </div>
        
                    <div class="flex flex-row justify-center gap-2 text-md font-semibold">
                        <div class="flex flex-row gap-x-2">
                            <button class="border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 rounded-sm px-2 py-1" on:click={() => selectPage(currentIndex - 1)}>
                                <span class="flex w-6 h-6 self-center"><LeftChevron /></span>
                            </button>
                            <div class="flex-1 border border-neutral-300 dark:border-neutral-800 rounded-sm px-2 py-1">{currentIndex + 1} / {fullList.length}</div>
                            <button class="border border-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-700 duration-100 rounded-sm px-2 py-1" on:click={() => selectPage(currentIndex + 1)}>
                                <span class="flex w-6 h-6 self-center"><RightChevron /></span>
                            </button>
                        </div>
                    </div>
                    {:else}
                        <div class="flex flex-row justify-center gap-x-2">
                            <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow warning icon" />
                            <p class="self-center text-neutral-600 dark:text-neutral-400 text-lg py-2">You have no friends :(</p>
                        </div>
                    {/if}
                {:else}
                    {#if player.social.party.active}
                        <div class="flex flex-col gap-y-3 mx-4 my-4">
                            {#each player.social.party.members || [] as member}
                                <a href={`/player/${member.username}`} class="flex flex-row gap-x-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 rounded-md">
                                    <img class="w-8 h-8 rounded-sm bg-slate-400" src={`https://mc-heads.net/avatar/${member.uuid}/128`} alt={`${member.username}'s Rank'`} />
                                    <img class="w-8 h-8 rounded-sm bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(member.ranks)}`} alt={`${member.username}'s Rank'`} />
                                    <a class="flex flex-row gap-1" href={`/player/${member.username}`} data-sveltekit-reload>
                                        <p class={`text-xl hover:underline ${member.username === player.social.party.leader?.username ? "font-semibold" : ""}`}>{member.username}</p>
                                    </a>
                                </a>
                            {/each}
                        </div>
                    {:else}
                        <div class="flex flex-row justify-center gap-x-2">
                            <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow warning icon" />
                            <p class="self-center text-neutral-600 dark:text-neutral-400 text-lg py-2">Not partied</p>
                        </div>
                    {/if}
                {/if}
            </div>
        {:else}
            <div class="flex flex-row gap-x-3 justify-center items-center bg-neutral-300/50 dark:bg-neutral-800/50 border-2 border-neutral-300 dark:border-neutral-800 rounded-md">
                <img class="w-7 h-7 self-center" src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow warning icon" />
                <p class="text-neutral-600 dark:text-neutral-400 text-lg my-4 tracking-wide">Social information is disabled!</p>
            </div>
        {/if}
</div>