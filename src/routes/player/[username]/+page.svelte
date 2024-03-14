<script>
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";
    import { DateTime } from "luxon";
    import Star from "../../../svgs/Star.svelte";
    
    export let data;

    let infoTab = "stats";
    function switchInfoTab(newTab) { infoTab = newTab; }

    const firstJoin = DateTime.fromISO(data.player.firstJoin);
    const lastJoin = DateTime.fromISO(data.player.lastJoin);

    const averageSearches = Math.floor((data.searches.current + data.searches.one_month_ago + data.searches.two_months_ago) / 3)

    let fullList = [];
    let friendIndex = 0;
    let intList = [];
    let counter = 0;
    let friendsOnline = 0;
    for (let friend of data.player.friends || []) {
        if (friend.status.online) friendsOnline++;

        if (counter < 10) {
            intList.push(friend);
            counter++;
        }
        if (counter === 10) {
            fullList.push(intList);
            intList = [];
            counter = 0;
        }
    }
    if (intList.length > 0) fullList.push(intList);
</script>

<head>
    <title>{data.player.username ? `${data.player.username}'s Stats` : "Unknown Player"}</title>
    <link rel="icon" href={`https://crafatar.com/avatars/${data.uuid}.ico`} />
</head>
<main class="py-4 mx-4 sm:mx-24 h-full sm:h-dvh">
    {#if data.success === false}
        <div class="border-2 border-red-300 bg-red-100 rounded-lg py-2">
            <p class="text-center text-2xl font-semibold">I couldn't find that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col sm:flex-row gap-4">

            <!-- player card -->
            <div class="border-2 border-slate-400 bg-slate-50 rounded-lg p-4 grow-0">
                <!-- username & rank -->
                <div class="flex flex-row">
                    <img src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(data.player.ranks)}`} class="w-10 h-10 rounded-md bg-slate-400" alt="" />
                    <p class="text-3xl font-bold p-1 pl-2">{data.name}</p>
                    <span class={`ml-2 self-center w-4 h-4 rounded-full ${data.player.status.online ? "bg-green-500" : "bg-red-500"}`}></span>
                </div>

                {#if data.player.status.online}
                <!-- status -->
                <div class="flex flex-col mt-2 text-lg">
                    {#if data.player.status.server.category === "GAME"}
                        <p class="flex flex-row gap-x-2">
                            Playing 
                            <span class="flex flex-row gap-x-1 font-semibold">
                                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(data.player.status.server.associatedGame)}/icon.png`} alt={``} />
                                {getStatusGame(data.player.status.server.associatedGame)}
                            </span>
                        </p>
                    {:else if data.player.status.server.category === "LOBBY"}
                        <p class="flex flex-row gap-x-2">
                            In the 
                            <span class="flex flex-row gap-x-1 font-semibold">
                                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(data.player.status.server.associatedGame) || "lobby"}/icon.png`} alt={``} />
                                {getStatusGame(data.player.status.server.associatedGame) || "Main"} Lobby
                            </span>
                        </p>
                    {/if}
                </div>
                {/if}

                <!-- dates -->
                <div class="flex flex-col mt-4 text-lg">
                    <p>Last joined: <span class="font-semibold">{lastJoin.day < 10 ? `0${lastJoin.day}`: lastJoin.day}/{lastJoin.month < 10 ? `0${lastJoin.month}`: lastJoin.month}/{lastJoin.year} @ {lastJoin.hour < 10 ? `0${lastJoin.hour}`: lastJoin.hour}:{lastJoin.minute < 10 ? `0${lastJoin.minute}`: lastJoin.minute}</span></p>
                    <p>First joined: <span class="font-semibold">{firstJoin.day < 10 ? `0${firstJoin.day}`: firstJoin.day}/{firstJoin.month < 10 ? `0${firstJoin.month}`: firstJoin.month}/{firstJoin.year} @ {firstJoin.hour < 10 ? `0${firstJoin.hour}`: firstJoin.hour}:{firstJoin.minute < 10 ? `0${firstJoin.minute}`: firstJoin.minute}</span></p>
                </div>

                <!-- wallet -->
                <div class="flex flex-col mt-4">
                    <p class="text-xl font-semibold">Wallet</p>
                    <div class="flex flex-row gap-2 my-1">
                        <img src="https://cdn.islandstats.xyz/icons/coin.png" class="w-8 h-8" alt="Coins" />
                        <p class="text-xl">{data.player.currency.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                    <div class="flex flex-row gap-2 my-1">
                        <img src="https://cdn.islandstats.xyz/icons/gem.png" class="w-8 h-8" alt="Coins" />
                        <p class="text-xl">{data.player.currency.gems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                    <div class="flex flex-row gap-2 my-1">
                        <img src="https://cdn.islandstats.xyz/icons/silver.png" class="w-8 h-8" alt="Coins" />
                        <p class="text-xl">{data.player.currency.silver.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                    <div class="flex flex-row gap-2 my-1">
                        <img src="https://cdn.islandstats.xyz/icons/material_dust.png" class="w-8 h-8" alt="Coins" />
                    <p class="text-xl">{data.player.currency.materialDust.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                </div>

                <!-- searches -->
                <p class="mt-4 text-slate-500">Views: <span>{averageSearches} / month</span></p>
            </div>


            <!-- info card -->
            <div class="flex flex-col col-span-4 grow">
                <!-- info tabs -->
                <div class="flex flex-row text-xl mb-4 gap-x-4">
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "stats" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("stats")}>Stats</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "party" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("party")}>Party</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "friends" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("friends")}>Friends</button>
                </div>

                {#if infoTab === "stats"}
                    <!-- stats -->
                    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
                        <p class="text-xl">Coming Soon!</p>
                    </div>

                {:else if infoTab === "party"}
                    <!-- party -->
                    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
                        {#if data.player.party.active}
                            <p class="text-3xl font-bold mb-2">Party ({data.player.party.members.length} members)</p>
                            {#each data.player.party.members as member}
                                <div class="flex flex-row">
                                    <img class="w-8 h-8" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(member.ranks)}`} alt={`${member.username}'s Rank'`} />
                                    <a class="flex flex-row gap-1" href={`/player/${member.username}`} data-sveltekit-reload>
                                        <p class="text-lg ml-2 hover:underline">{member.username}</p>
                                        {#if member.username === data.player.party.leader.username}
                                            <Star />
                                        {/if}
                                    </a>
                                </div>
                            {/each}
                        {:else}
                            <p class="text-xl font-semibol">Not currently partied!</p>
                        {/if}
                    </div>

                {:else if infoTab === "friends"}
                    <!-- friends -->
                    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
                        <p class="text-3xl font-bold mb-4">Friends ({friendsOnline}/{data.player.friends.length} online)</p>
                        {#if data.player.friends.length > 0}
                            <div class="flex flex-col gap-y-2">
                                {#each fullList[friendIndex] as friend}
                                    <div class="flex flex-row gap-y-1">
                                        <img class="w-8 h-8 mr-2 rounded-md bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(friend.ranks)}`} alt={`${friend.username}'s Rank'`} />
                                        <a class="hover:underline" href={`/player/${friend.username}`} data-sveltekit-reload>
                                            <p class="text-lg">{friend.username}</p>
                                        </a>
                                        {#if data.player.friends.find(f => f.username === friend.username).status.online}<span class={`ml-2 self-center w-4 h-4 rounded-full bg-green-500`}></span>{/if}
                                    </div>
                                {/each}
                            </div>
                            <div class="flex flex-row gap-2 mt-4">
                                {#each fullList as list, count}
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
                    </div>
                {/if}                
            </div>
        </div>
    {/if}
</main>