<script>
    import LeftChevron from "$lib/svgs/LeftChevron.svelte";
    import RightChevron from "$lib/svgs/RightChevron.svelte";
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";

    export let player;

    let tab = "party";
    function switchTab(newTab) { tab = newTab; }

    let currentIndex = 0;

    let fullList = [];
    let intList = [];
    let counter = 0;
    let friendsOnline = 0;
    // loop through all friends
    for (let friend of player.social?.friends || []) {
        // if they are online, add one to online counter
        if (friend.status?.online) friendsOnline++;

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

<div class="flex flex-col text-neutral-900 dark:text-neutral-100 border-2 border-neutral-300 dark:border-neutral-800 rounded-md shadow-md">
    {#if player.social}
        <div class="flex flex-row gap-x-2 text-md border-b border-neutral-300 dark:border-neutral-800 p-2">
            <button on:click={() => switchTab("party")} class={`hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100 px-3 py-1 rounded-sm ${tab === "party" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>Party</button>
            <button on:click={() => switchTab("friends")} class={`hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100 px-3 py-1 rounded-sm ${tab === "friends" ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}>Friends</button>
        </div>
        
        {#if tab === "friends"}
            {#if player.social.friends.length > 1}
            <div class="flex-1 flex flex-col gap-y-1 mx-2 my-2">
                {#each fullList[currentIndex] || [] as friend}
                    <a href={`/player/${friend.username}/games`} class="flex flex-row justify-between gap-x-1 px-2 py-1 hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 rounded-md">
                        <div class="flex flex-row gap-x-1">
                            <div class="relative">
                                <img class="w-7 h-7 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://mc-heads.net/avatar/${friend.uuid}/128`} alt={`${friend.username}'s Rank'`} />
                                {#if friend.status}
                                    <span class={`absolute z-10 -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-neutral-100 dark:border-neutral-900 ${friend.status.online ? "bg-green-500" : "bg-red-500"}`}></span>
                                {/if}
                            </div>
                            <img class="w-7 h-7 rounded-sm bg-neutral-400 dark:bg-neutral-600" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(friend.ranks)}`} alt={`${friend.username}'s Rank'`} />
                            <p class="text-lg self-center">{friend.username}</p>
                        </div>
                        <div class="flex flex-row">
                            {#if friend.status}
                                {#if friend.status.online}
                                    <div class="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                        {#if friend.status.server?.category === "GAME"}
                                            <p class="flex flex-row gap-x-1">
                                                Playing
                                                <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(friend.status.server?.associatedGame)}/icon.png`} alt={`${friend.status.server?.associatedGame} Icon`} />
                                                <span class="font-semibold">{getStatusGame(friend.status.server?.associatedGame || friend.status.server.subType)}</span>
                                            </p>
                                        {:else if friend.status.server?.category === "LOBBY"}
                                            <p class="flex flex-row gap-x-1">
                                                {#if friend.status.server.subType === "fishing"}
                                                    <span>On a</span>
                                                    <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`/icons/fishing.png`} alt="Fishing Rod Icon" />
                                                    <span class="font-semibold">Fishing Island</span>
                                                {:else}
                                                    <span>In the</span>
                                                    <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(friend.status.server?.associatedGame) || "lobby"}/icon.png`} alt="Main Lobby Icon" />
                                                    <span class="font-semibold">{getStatusGame(friend.status.server?.associatedGame || friend.status.server.subType) || "Main"} Lobby</span>
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

            <div class="flex flex-row gap-2 p-2 border-t border-neutral-300 dark:border-neutral-800 text-md font-semibold">
                <div class="flex flex-row gap-x-2">
                    <button class="border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 rounded-sm px-2 py-1" on:click={() => selectPage(currentIndex - 1)}>
                        <span class="flex w-6 h-6 self-center"><LeftChevron /></span>
                    </button>
                    <div class="flex-1 border border-neutral-300 dark:border-neutral-700 rounded-sm px-2 py-1">{currentIndex + 1} / {fullList.length}</div>
                    <button class="border border-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700 duration-100 rounded-sm px-2 py-1" on:click={() => selectPage(currentIndex + 1)}>
                        <span class="flex w-6 h-6 self-center"><RightChevron /></span>
                    </button>
                </div>
            </div>
            {:else}
                <div class="flex flex-row gap-x-2">
                    <p class="text-xl py-2">Nothing to show here yet!</p>
                    <img class="w-6 h-6 self-center" src="https://cdn.islandstats.xyz/emojis/pensive.png" alt="Sad emoji"/>
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
                <div class="flex justify-center items-center my-auto">
                    <p class="text-neutral-600 dark:text-neutral-400 text-md 2xl:text-lg py-2 tracking-wide">Not currently partied!</p>
                </div>
            {/if}
        {/if}
    {:else}
        <div class="flex flex-row gap-x-3 justify-center items-center my-auto bg-neutral-300/50 dark:bg-neutral-800/50">
            <img class="w-7 h-7 self-center" src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow warning icon" />
            <p class="text-neutral-600 dark:text-neutral-400 text-md 2xl:text-lg my-4 tracking-wide">Social information is disabled!</p>
        </div>
    {/if}
</div>