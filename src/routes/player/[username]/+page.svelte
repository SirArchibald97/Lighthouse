<script>
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";
    import { badges, calculateBadgeCompletion, calculateBadgeTier } from "$lib/data.js";
    import { DateTime } from "luxon";
    import Star from "$lib/svgs/Star.svelte";
    import Check from "$lib/svgs/Check.svelte";
    
    export let data;
    export let form;

    let infoTab = "stats";
    function switchInfoTab(newTab) { infoTab = newTab; }
    
    let lastJoin = "Unknown";
    let firstJoin = "Unknown";
    if (data.player?.status) {
        const lastJoinDate = DateTime.fromISO(data.player.status.lastJoin.toLocaleString());
        const firstJoinDate = DateTime.fromISO(data.player.status.firstJoin.toLocaleString());

        lastJoin = `${lastJoinDate.day < 10 ? `0${lastJoinDate.day}`: lastJoinDate.day}/${lastJoinDate.month < 10 ? `0${lastJoinDate.month}`: lastJoinDate.month}/${lastJoinDate.year} @ ${lastJoinDate.hour < 10 ? `0${lastJoinDate.hour}`: lastJoinDate.hour}:${lastJoinDate.minute < 10 ? `0${lastJoinDate.minute}` : lastJoinDate.minute}`;
        firstJoin = `${firstJoinDate.day < 10 ? `0${firstJoinDate.day}`: firstJoinDate.day}/${firstJoinDate.month < 10 ? `0${firstJoinDate.month}`: firstJoinDate.month}/${firstJoinDate.year} @ ${firstJoinDate.hour < 10 ? `0${firstJoinDate.hour}`: firstJoinDate.hour}:${firstJoinDate.minute < 10 ? `0${firstJoinDate.minute}` : firstJoinDate.minute}`;
    }

    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }

    let sbCategory = "quads";
    function switchSBCategory(category) { sbCategory = category; }

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

<svelte:head>
    <title>{data.player.username ? `${data.player.username}'s Stats` : "Unknown Player"}</title>
    <meta name="description" content={`View ${data.player.username}'s stats on MCC Island Stats by SirArchibald, including game stats, currency, socials and more!`} />
</svelte:head>
<main class="py-4 mx-4 2xl:mx-24">
    {#if data.success === false}
        <div class="border-2 border-red-300 bg-red-100 rounded-lg py-2">
            <p class="text-center text-2xl font-semibold">I couldn't find that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="basis-80 flex flex-col gap-y-4 mb-8">
                <!-- player card -->
                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 sm:self-start w-full">
                    <!-- username & rank -->
                    <div class="flex flex-row items-center">
                        <img src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(data.player.ranks)}`} class="w-8 h-8 2xl:w-10 2xl:h-10 rounded-[8px] bg-slate-400" alt="" />
                        <p class="text-xl 2xl:text-3xl font-bold pl-2">{data.name}</p>
                        {#if data.player.status}
                            <span class={`ml-2 w-4 h-4 rounded-full ${data.player.status?.online ? "bg-green-500" : "bg-red-500"}`}></span>
                        {:else}
                            <span class={`ml-2 w-4 h-4 rounded-full bg-slate-50`}></span>
                        {/if}
                    </div>
    
    
                    <!-- STATUS -->
                    {#if data.player.status}
                        <div class="flex flex-col mt-2 text-md 2xl:text-lg">
                            {#if data.player.status.server?.category === "GAME"}
                                <p class="flex flex-row gap-x-2">
                                    Playing 
                                    <span class="flex flex-row gap-x-1 font-semibold">
                                        <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(data.player.status.server?.associatedGame)}/icon.png`} alt={``} />
                                        {getStatusGame(data.player.status.server?.associatedGame)}
                                    </span>
                                </p>
                            {:else if data.player.status.server?.category === "LOBBY"}
                                <p class="flex flex-row gap-x-2">
                                    In the 
                                    <span class="flex flex-row gap-x-1 font-semibold">
                                        <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(data.player.status.server?.associatedGame) || "lobby"}/icon.png`} alt={``} />
                                        {getStatusGame(data.player.status.server?.associatedGame) || "Main"} Lobby
                                    </span>
                                </p>
                            {/if}
                        </div>
    
                        <!-- dates -->
                        <div class="flex flex-col mt-4 text-md 2xl:text-lg">
                            <p>Last joined: <span class="font-semibold">{lastJoin}</span></p>
                            <p>First joined: <span class="font-semibold">{firstJoin}</span></p>
                        </div>
                    {/if}
    
    
                    <!-- WALLET -->
                    <div class="flex flex-col mt-4">
                        <p class="text-md 2xl:text-xl font-semibold">Wallet</p>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/coin.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md ml-1 sm:ml-0 2xl:text-lg">{data.player.collections?.currency.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/gem.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md ml-1 sm:ml-0 2xl:text-lg">{data.player.collections?.currency.gems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/silver.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md ml-1 sm:ml-0 2xl:text-lg">{data.player.collections?.currency.silver.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/material_dust.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md ml-1 sm:ml-0 2xl:text-lg">{data.player.collections?.currency.materialDust.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/royal_reputation.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md ml-1 sm:ml-0 2xl:text-lg">{data.player.collections?.currency.royalReputation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                    </div>
    
                    <!-- searches -->
                    <p class="mt-4 text-slate-500 text-sm 2xl:text-lg">Views: <span>{data.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                </div>

                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 self-center sm:self-start w-full text-sm 2xl:text-lg">
                    <form method="POST" action="?/favourite">
                        <input type="text" name="username" class="hidden" bind:value={data.player.username} />
                        <input type="text" name="uuid" class="hidden" bind:value={data.uuid} />
                        <input type="text" name="ranks" class="hidden" bind:value={data.player.ranks} />

                        <button type="submit" class="flex flex-row place-items-center font-semibold hover:bg-slate-100 hover:scale-105 py-1 px-3 rounded-md">
                            {#if !form?.favourites.find(f => f?.username === data.player.username) && !data.favourite}
                                <span class="w-6 h-6 mr-2 text-black"><Star /></span>
                                <span>Add to favourites</span>
                            {:else}
                                <span class="w-6 h-6 mr-2"><Check /></span>
                                <span>Added to favourites!</span>
                            {/if}
                        </button>
                    </form>
                </div>

                <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 self-center sm:self-start w-full text-sm 2xl:text-lg">
                    <p><span class="font-semibold">Not seeing your stats?</span> Make sure to set your API preferences in your in-game settings!</p>
                </div>
            </div>

            <!-- info card -->
            <div class="flex flex-col col-span-4 grow">
                <!-- info tabs -->
                <div class="flex flex-row text-xl mb-4 gap-x-4 self-center sm:self-start">
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "stats" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("stats")}>Stats</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "party" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("party")}>Party</button>
                    <button class={`bg-slate-50 hover:bg-slate-100 border-b-red-500 rounded-sm px-6 py-2 ${infoTab === "friends" ? "font-bold border-b-4" : ""}`} on:click={() => switchInfoTab("friends")}>Friends</button>
                </div>

                {#if infoTab === "stats"}
                    <!-- stats -->
                    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
                        {#if data.player.statistics}
                            <p class="text-3xl font-bold mb-2">Statistics</p>
                            <div class="flex flex-col gap-y-3">

                                <!--  BATTLE BOX -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "bb" ? null : "bb")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/battle_box/icon.png" alt="Battle Box Stats" />
                                        <p class="text-xl font-semibold">Battle Box</p>
                                    </button>
                                    {#if expandedCategory === "bb"}
                                        <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Rounds Won: <span class="font-semibold">{data.player.statistics.battle_box.rounds_won.toLocaleString()}</span></p>
                                                <p>Rounds Lost: <span class="font-semibold">{((data.player.statistics.battle_box.games_played * 3) - data.player.statistics.battle_box.rounds_won).toLocaleString()}</span></p>
                                                <p>WLR: <span class="font-semibold">{(Math.floor((data.player.statistics.battle_box.rounds_won / ((data.player.statistics.battle_box.games_played * 3) - data.player.statistics.battle_box.rounds_won)) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.battle_box.kills.toLocaleString()}</span></p>
                                                <p>Deaths: <span class="font-semibold">{data.player.statistics.battle_box.deaths.toLocaleString()}</span></p>
                                                <p>KDR: <span class="font-semibold">{(Math.floor((data.player.statistics.battle_box.kills / data.player.statistics.battle_box.deaths) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Melee Kills: <span class="font-semibold">{data.player.statistics.battle_box.melee_kills.toLocaleString()}</span></p>
                                                <p>Ranged Kills: <span class="font-semibold">{data.player.statistics.battle_box.ranged_kills.toLocaleString()}</span></p>
                                                <p>Explosive Kills: <span class="font-semibold">{data.player.statistics.battle_box.explosive_kills.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.battle_box.games_played.toLocaleString()}</span></p>
                                                <p>Team 1st Places: <span class="font-semibold">{data.player.statistics.battle_box.team_first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.team_first_place / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                                <p>Team 2nd Places: <span class="font-semibold">{data.player.statistics.battle_box.team_second_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.team_second_place / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                                <p>Team 3rd Places: <span class="font-semibold">{data.player.statistics.battle_box.team_third_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.team_third_place / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                                <p>Team 4th Places: <span class="font-semibold">{data.player.statistics.battle_box.team_fourth_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.team_fourth_place / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                            </div>
                                            <div>
                                                <p>Individual 1st Places: <span class="font-semibold">{data.player.statistics.battle_box.solo_first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.solo_first_place / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                                <p>Individual Top 3: <span class="font-semibold">{data.player.statistics.battle_box.solo_top_three.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.solo_top_three / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                                <p>Individual Top 5: <span class="font-semibold">{data.player.statistics.battle_box.solo_top_five.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box.solo_top_five / data.player.statistics.battle_box.games_played) * 100)}%)</span></p>
                                                <p>Concrete Broken: <span class="font-semibold">{data.player.statistics.battle_box.blocks_broken.toLocaleString()}</span> </p>
                                                <p>Concrete Placed: <span class="font-semibold">{data.player.statistics.battle_box.blocks_placed.toLocaleString()}</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, "battle_box", badges.battle_box, badges.battle_box_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.battle_box as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/battle_box/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics.battle_box.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics.battle_box.badges[badge.stat].toLocaleString()}</span> time{data.player.statistics.battle_box[badge.stat] === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                                            {#each badges.battle_box_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/battle_box/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.battle_box[badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.battle_box[badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.battle_box[badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.battle_box[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!--  SKY BATTLE -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "sb" ? null : "sb")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/sky_battle/icon.png" alt="Battle Box Stats" />
                                        <p class="text-xl font-semibold">Sky Battle</p>
                                    </button>
                                    {#if expandedCategory === "sb"}
                                        <div class="flex flex-row mt-4 mb-2">
                                            <button on:click={() => switchSBCategory("quads")} class={`bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-l-sm ${sbCategory === "quads" ? "border-b-4 border-red-400" : ""}`}>Quads</button>
                                            <button on:click={() => switchSBCategory("summer")} class={`bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-r-sm ${sbCategory === "summer" ? "border-b-4 border-red-400" : ""}`}>Water Fight</button>
                                        </div>    
                                        <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].solo_first_place.toLocaleString()}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{(data.player.statistics.sky_battle[sbCategory].games_played - data.player.statistics.sky_battle[sbCategory].solo_first_place).toLocaleString()}</span></p>
                                                <p>WLR: <span class="font-semibold">{(Math.floor((data.player.statistics.sky_battle[sbCategory].solo_first_place / (data.player.statistics.sky_battle[sbCategory].games_played - data.player.statistics.sky_battle[sbCategory].solo_first_place)) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].kills.toLocaleString()}</span></p>
                                                <p>Deaths: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].deaths.toLocaleString()}</span></p>
                                                <p>KDR: <span class="font-semibold">{(Math.floor((data.player.statistics.sky_battle[sbCategory].kills / data.player.statistics.sky_battle[sbCategory].deaths) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Melee Kills: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].melee_kills.toLocaleString()}</span></p>
                                                <p>Ranged Kills: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].ranged_kills.toLocaleString()}</span></p>
                                                <p>Explosive Kills: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].explosive_kills.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].games_played.toLocaleString()}</span></p>
                                                <p>Individual 1st Places: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].solo_first_place.toLocaleString()}</span></p>
                                                <p>Individual Top 3: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].solo_top_three.toLocaleString()}</span></p>
                                                <p>Individual Top 5: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].solo_top_five.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Chests Looted: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].chests_looted.toLocaleString()}</span></p>
                                                <p>Golden Chests Looted: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].golden_chests_looted.toLocaleString()}</span></p>
                                                <p>Survived 1 minute: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].survived_minute.toLocaleString()}</span> time{data.player.statistics.sky_battle[sbCategory].survived_minute !== 1 ? "s" : ""}</p>
                                                <p>Survived 2 minutes: <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].survived_two_minute.toLocaleString()}</span> time{data.player.statistics.sky_battle[sbCategory].survived_two_minute !== 1 ? "s" : ""}</p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, `sky_battle.${sbCategory}`, badges.sky_battle, badges.sky_battle_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.sky_battle as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>                                                    
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics.sky_battle[sbCategory].badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics.sky_battle[sbCategory].badges[badge.stat].toLocaleString()}</span> time{data.player.statistics.sky_battle[sbCategory].badges[badge.stat] === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                                            {#each badges.sky_battle_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.sky_battle[sbCategory][badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.sky_battle[sbCategory][badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.sky_battle[sbCategory][badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.sky_battle[sbCategory][badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>       
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!-- TGTTOS -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "tgttos" ? null : "tgttos")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/tgttos/icon.png" alt="Battle Box Stats" />
                                        <p class="text-xl font-semibold">To Get To The Other Side</p>
                                    </button>
                                    {#if expandedCategory === "tgttos"}
                                        <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.tgttos.first_place.toLocaleString()}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{(data.player.statistics.tgttos.games_played - data.player.statistics.tgttos.first_place).toLocaleString()}</span></p>
                                                <p>WLR: <span class="font-semibold">{(Math.floor((data.player.statistics.tgttos.first_place / (data.player.statistics.tgttos.games_played - data.player.statistics.tgttos.first_place)) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.tgttos.kills.toLocaleString()}</span></p>
                                                <p>Deaths: <span class="font-semibold">{data.player.statistics.tgttos.deaths.toLocaleString()}</span></p>
                                                <p>KDR: <span class="font-semibold">{(Math.floor((data.player.statistics.tgttos.kills / data.player.statistics.tgttos.deaths) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Blocks Placed: <span class="font-semibold">{data.player.statistics.tgttos.blocks_placed.toLocaleString()}</span></p>
                                                <p>Blocks Broken: <span class="font-semibold">{data.player.statistics.tgttos.blocks_broken.toLocaleString()}</span></p>
                                                <p>Chickens Punched: <span class="font-semibold">{data.player.statistics.tgttos.chickens_punched.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.tgttos.games_played.toLocaleString()}</span></p>
                                                <p>Game 1st Places: <span class="font-semibold">{data.player.statistics.tgttos.first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.first_place / data.player.statistics.tgttos.games_played) * 100)}%)</span></p>
                                                <p>Game Top 3: <span class="font-semibold">{data.player.statistics.tgttos.top_three.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.top_three / data.player.statistics.tgttos.games_played) * 100)}%)</span></p>
                                                <p>Game Top 5: <span class="font-semibold">{data.player.statistics.tgttos.top_five.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.top_five / data.player.statistics.tgttos.games_played) * 100)}%)</span></p>
                                            </div>
                                            <div>
                                                <p>Round 1st Places: <span class="font-semibold">{data.player.statistics.tgttos.round_first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.round_first_place / (data.player.statistics.tgttos.games_played * 3)) * 100)}%)</span></p>
                                                <p>Round Top 3: <span class="font-semibold">{data.player.statistics.tgttos.round_top_three.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.round_top_three / (data.player.statistics.tgttos.games_played * 3)) * 100)}%)</span></p>
                                                <p>Round Top 5: <span class="font-semibold">{data.player.statistics.tgttos.round_top_five.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.round_top_five / (data.player.statistics.tgttos.games_played * 3)) * 100)}%)</span></p>
                                                <p>Round Top 8: <span class="font-semibold">{data.player.statistics.tgttos.round_top_eight.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos.round_top_eight / (data.player.statistics.tgttos.games_played * 3)) * 100)}%)</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, "tgttos", badges.tgttos, badges.tgttos_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.tgttos as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics.tgttos.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics.tgttos.badges[badge.stat].toLocaleString()}</span> time{data.player.statistics.tgttos.badges[badge.stat] === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                                            {#each badges.tgttos_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.tgttos[badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.tgttos[badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.tgttos[badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.tgttos[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>  
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!--  HITW -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "hitw" ? null : "hitw")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/hitw/icon.png" alt="HITW Stats" />
                                        <p class="text-xl font-semibold">Hole in the Wall</p>
                                    </button>
                                    {#if expandedCategory === "hitw"}
                                        <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.hitw.first_place.toLocaleString()}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{(data.player.statistics.hitw.games_played - data.player.statistics.hitw.first_place).toLocaleString()}</span></p>
                                                <p>WLR: <span class="font-semibold">{(Math.floor((data.player.statistics.hitw.first_place / (data.player.statistics.hitw.games_played - data.player.statistics.hitw.first_place)) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.hitw.games_played.toLocaleString()}</span></p>
                                                <p>1st Places: <span class="font-semibold">{data.player.statistics.hitw.first_place.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.hitw.first_place / data.player.statistics.hitw.games_played) * 100)}%)</span></p>
                                                <p>Top 3: <span class="font-semibold">{data.player.statistics.hitw.top_three.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.hitw.top_three / data.player.statistics.hitw.games_played) * 100)}%)</span></p>
                                                <p>Top 5: <span class="font-semibold">{data.player.statistics.hitw.top_five.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.hitw.top_five / data.player.statistics.hitw.games_played) * 100)}%)</span></p>
                                            </div>
                                            <div>
                                                <p>Players Outlived: <span class="font-semibold">{data.player.statistics.hitw.players_outlived.toLocaleString()}</span></p>
                                                <p>Walls Dodged: <span class="font-semibold">{data.player.statistics.hitw.walls_dodged.toLocaleString()}</span></p>
                                                <p>Survived 1 minute: <span class="font-semibold">{data.player.statistics.hitw.survived_minute.toLocaleString()}</span> time{data.player.statistics.hitw.survived_minute === 1 ? "" : "s"}</p>
                                                <p>Survived 2 minutes: <span class="font-semibold">{data.player.statistics.hitw.survived_two_minute.toLocaleString()}</span> time{data.player.statistics.hitw.survived_two_minute === 1 ? "" : "s"}</p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, "hitw", badges.hitw, badges.hitw_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.hitw as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/hitw/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics.hitw.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics.hitw.badges[badge.stat].toLocaleString()}</span> time{data.player.statistics.hitw.badges[badge.stat] === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                                            {#each badges.hitw_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/hitw/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.hitw[badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.hitw[badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.hitw[badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.hitw[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>  
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!-- DYNABALL -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "db" ? null : "db")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/dynaball/icon.png" alt="HITW Stats" />
                                        <p class="text-xl font-semibold">Dynaball</p>
                                    </button>
                                    {#if expandedCategory === "db"}
                                        <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.dynaball.wins.toLocaleString()}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{data.player.statistics.dynaball.games_played - data.player.statistics.dynaball.wins.toLocaleString()}</span></p>
                                                <p>WLR: <span class="font-semibold">{(Math.floor((data.player.statistics.dynaball.wins / (data.player.statistics.dynaball.games_played - data.player.statistics.dynaball.wins)) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.dynaball.kills.toLocaleString()}</span></p>
                                                <p>Players Stuck: <span class="font-semibold">{data.player.statistics.dynaball.players_stuck.toLocaleString()}</span></p>
                                                <p>Spawners Broken: <span class="font-semibold">{data.player.statistics.dynaball.spawners_destroyed.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.dynaball.games_played.toLocaleString()}</span></p>
                                                <p>Blocks Destroyed: <span class="font-semibold">{data.player.statistics.dynaball.blocks_destroyed.toLocaleString()}</span></p>
                                                <p>Blocks Placed: <span class="font-semibold">{data.player.statistics.dynaball.blocks_placed.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Survived 1 Minute: <span class="font-semibold">{data.player.statistics.dynaball.survive_1m.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball.survive_1m / data.player.statistics.dynaball.games_played) * 100)}%)</span></p>
                                                <p>Survived 2 Minutes: <span class="font-semibold">{data.player.statistics.dynaball.survive_2m.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball.survive_2m / data.player.statistics.dynaball.games_played) * 100)}%)</span></p>
                                                <p>Survived 3 Minutes: <span class="font-semibold">{data.player.statistics.dynaball.survive_3m.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball.survive_3m / data.player.statistics.dynaball.games_played) * 100)}%)</span></p>
                                                <p>Survived 4 Minutes: <span class="font-semibold">{data.player.statistics.dynaball.survive_4m.toLocaleString()}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball.survive_4m / data.player.statistics.dynaball.games_played) * 100)}%)</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, "dynaball", badges.dynaball, badges.dynaball_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.dynaball as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/dynaball/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics.dynaball.badges[badge.stat] > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics.dynaball.badges[badge.stat].toLocaleString()}</span> time{data.player.statistics.dynaball.badges[badge.stat] === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                                            {#each badges.dynaball_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/dynaball/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.dynaball[badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.dynaball[badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.dynaball[badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.dynaball[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>  
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!-- DOJO -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "dojo" ? null : "dojo")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/pkw/icon.png" alt="PKW Stats" />
                                        <p class="text-xl font-semibold">Parkour Warrior Dojo</p>
                                    </button>
                                    {#if expandedCategory === "dojo"}
                                        <div class="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Unique Medals: <span class="font-semibold">{data.player.statistics.pkw.dojo.unique_medals.toLocaleString()}</span></p>
                                                <p>Total Medals: <span class="font-semibold">{data.player.statistics.pkw.dojo.total_medals.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Unique Standard Completions: <span class="font-semibold">{data.player.statistics.pkw.dojo.unique_standard.toLocaleString()}</span></p>
                                                <p>Unique Advanced Completions: <span class="font-semibold">{data.player.statistics.pkw.dojo.unique_advanced.toLocaleString()}</span></p>
                                                <p>Unique Expert Completions: <span class="font-semibold">{data.player.statistics.pkw.dojo.unique_expert.toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Total Standard Completions: <span class="font-semibold">{data.player.statistics.pkw.dojo.total_standard.toLocaleString()}</span></p>
                                                <p>Total Advanced Completions: <span class="font-semibold">{data.player.statistics.pkw.dojo.total_standard.toLocaleString()}</span></p>
                                                <p>Total Expert Completions: <span class="font-semibold">{data.player.statistics.pkw.dojo.total_standard.toLocaleString()}</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, "pkw.dojo", [], badges.dojo_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                                            {#each badges.dojo_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/pkw/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.pkw.dojo[badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.pkw.dojo[badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.pkw.dojo[badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.pkw.dojo[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>  
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!-- SURVIVOR -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "survivor" ? null : "survivor")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/pkw/icon.png" alt="PKW Stats" />
                                        <p class="text-xl font-semibold">Parkour Warrior Survivor</p>
                                    </button>
                                    {#if expandedCategory === "survivor"}
                                        <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Survivor Wins: <span class="font-semibold">{data.player.statistics.pkw.survivor.wins.toLocaleString()}</span></p>
                                                <p>Survivor Losses: <span class="font-semibold">{(data.player.statistics.pkw.survivor.games_played - data.player.statistics.pkw.survivor.wins).toLocaleString()}</span></p>
                                                <p>Survivor WLR: <span class="font-semibold">{(Math.floor((data.player.statistics.pkw.survivor.wins / (data.player.statistics.pkw.survivor.games_played - data.player.statistics.pkw.survivor.wins)) * 100) / 100 || 0).toLocaleString()}</span></p>
                                            </div>
                                            <div>
                                                <p>Survivor Games Played: <span class="font-semibold">{data.player.statistics.pkw.survivor.games_played.toLocaleString()}</span></p>
                                                <p>Survivor Players Eliminated: <span class="font-semibold">{data.player.statistics.pkw.survivor.kills.toLocaleString()}</span></p>
                                                <p>Survivor Obstacles Completed: <span class="font-semibold">{data.player.statistics.pkw.survivor.obstacles.toLocaleString()}</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, "pkw.survivor", [], badges.survivor_tiered)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                                            {#each badges.survivor_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <div class="group duration-100">
                                                        <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/pkw/${badge.icon}.png`} alt={badge.name} />
                                                        <p class="absolute invisible xl:group-hover:visible opacity-0 group-hover:opacity-100 z-10 bg-slate-500 text-slate-200 rounded-md py-1 px-2 text-wrap duration-100">{badge.description}</p>
                                                    </div>
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics.pkw.survivor[badge.stat], badge.tiers).tier.name}</p>
                                                        <p>
                                                            {#each badge.tiers as tier}
                                                                {#if data.player.statistics.pkw.survivor[badge.stat] >= tier.amount}
                                                                    <span class="text-green-500">{tier.amount.toLocaleString()}</span>
                                                                {:else}
                                                                    {#if calculateBadgeTier(data.player.statistics.pkw.survivor[badge.stat], badge.tiers).next.name === tier.name}
                                                                        <span class="text-red-500">{data.player.statistics.pkw.survivor[badge.stat].toLocaleString()}</span><span class="text-slate-400">/{tier.amount.toLocaleString()}</span>
                                                                    {:else}
                                                                        <span class="text-red-500">{tier.amount.toLocaleString()}</span>
                                                                    {/if}
                                                                {/if}
                                                            
                                                                {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-slate-400">• </span>{/if}
                                                            {/each}
                                                        </p>  
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {:else}
                            <p class="text-xl font-semibol">Statistics are disabled!</p>
                        {/if}
                    </div>

                {:else if infoTab === "party"}
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
                                <p class="text-xl font-semibol">Not currently partied!</p>
                            {/if}
                        {:else}
                            <p class="text-xl font-semibol">Social information is disabled!</p>
                        {/if}
                    </div>


                {:else if infoTab === "friends"}
                    <!-- friends -->
                    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
                        {#if data.player.social}
                            <p class="text-3xl font-bold mb-4">Friends ({friendsOnline}/{data.player.social.friends.length} online)</p>
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
                            <p class="text-xl font-semibol">Social information is disabled!</p>
                        {/if}
                    </div>
                {/if}                
            </div>
        </div>
    {/if}
</main>

<footer class={`w-full bg-red-500 p-4 ${(expandedCategory === null || infoTab !== "stats") ? "sm:absolute sm:bottom-0" : "sm:relative"}`}>
    <div>
        <p class="text-center text-slate-100">© 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> • Not affiliated with Minecraft or Noxcrew!</p>
    </div>
</footer>