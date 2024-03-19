<script>
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";
    import { badges, calculateBadgeCompletion, calculateBadgeTier } from "$lib/data.js";
    import { DateTime } from "luxon";
    import Star from "../../../svgs/Star.svelte";
    
    export let data;

    let infoTab = "stats";
    function switchInfoTab(newTab) { infoTab = newTab; }
    
    let lastJoin = "Unknown";
    let firstJoin = "Unknown";
    if (data.player.status) {
        const lastJoinDate = DateTime.fromISO(data.player.status.lastJoin);
        const firstJoinDate = DateTime.fromISO(data.player.status.firstJoin);

        lastJoin = `${lastJoinDate.day < 10 ? `0${lastJoinDate.day}`: lastJoinDate.day}/${lastJoinDate.month < 10 ? `0${lastJoinDate.month}`: lastJoinDate.month}/${lastJoinDate.year} @ ${lastJoinDate.hour < 10 ? `0${lastJoinDate.hour}`: lastJoinDate.hour}:${lastJoinDate.minute < 10 ? `0${lastJoinDate.minute}` : lastJoinDate.minute}`;
        firstJoin = `${firstJoinDate.day < 10 ? `0${firstJoinDate.day}`: firstJoinDate.day}/${firstJoinDate.month < 10 ? `0${firstJoinDate.month}`: firstJoinDate.month}/${firstJoinDate.year} @ ${firstJoinDate.hour < 10 ? `0${firstJoinDate.hour}`: firstJoinDate.hour}:${firstJoinDate.minute < 10 ? `0${firstJoinDate.minute}` : firstJoinDate.minute}`;
    }

    let expandedCategory = null;
    function switchCategory(category) { expandedCategory = category; }

    let fullList = [];
    let friendIndex = 0;
    let intList = [];
    let counter = 0;
    let friendsOnline = 0;
    for (let friend of data.player.social?.friends || []) {
        if (friend.status?.online) friendsOnline++;

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
    <link rel="icon" href={`https://crafatar.com/avatars/${data.uuid}.png`} type="image/png" />
</head>
<main class="py-4 mx-4 2xl:mx-24">
    {#if data.success === false}
        <div class="border-2 border-red-300 bg-red-100 rounded-lg py-2">
            <p class="text-center text-2xl font-semibold">I couldn't find that player!</p>
        </div>
    {:else}
        <!-- page container -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="basis-1/5 flex flex-col gap-y-4 mb-8">
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
                        <div class="flex flex-col mt-4 text-sm 2xl:text-lg">
                            <p>Last joined: <span class="font-semibold">{lastJoin}</span></p>
                            <p>First joined: <span class="font-semibold">{firstJoin}</span></p>
                        </div>
                    {/if}
    
    
                    <!-- WALLET -->
                    <div class="flex flex-col mt-4">
                        <p class="text-md 2xl:text-xl font-semibold">Wallet</p>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/coin.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md 2xl:text-lg">{data.player.collections?.currency.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/gem.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md 2xl:text-lg">{data.player.collections?.currency.gems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/silver.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md 2xl:text-lg">{data.player.collections?.currency.silver.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/material_dust.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md 2xl:text-lg">{data.player.collections?.currency.materialDust.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
                            <img src="https://cdn.islandstats.xyz/icons/royal_reputation.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
                            <p class="text-md 2xl:text-lg">{data.player.collections?.currency.royalReputation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
                        </div>
                    </div>
    
                    <!-- searches -->
                    <p class="mt-4 text-slate-500 text-sm 2xl:text-lg">Views: <span>{data.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
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
                                                <p>Rounds Won: <span class="font-semibold">{data.player.statistics.battle_box_quads_team_rounds_won.value}</span></p>
                                                <p>Rounds Lost: <span class="font-semibold">{(data.player.statistics.battle_box_quads_games_played.value * 3) - data.player.statistics.battle_box_quads_team_rounds_won.value}</span></p>
                                                <p>WLR: <span class="font-semibold">{Math.floor((data.player.statistics.battle_box_quads_team_rounds_won.value / ((data.player.statistics.battle_box_quads_games_played.value * 3) - data.player.statistics.battle_box_quads_team_rounds_won.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.battle_box_quads_players_killed.value}</span></p>
                                                <p>Deaths: <span class="font-semibold">{data.player.statistics.battle_box_quads_times_eliminated.value}</span></p>
                                                <p>KDR: <span class="font-semibold">{Math.floor((data.player.statistics.battle_box_quads_players_killed.value / data.player.statistics.battle_box_quads_times_eliminated.value) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Melee Kills: <span class="font-semibold">{data.player.statistics.battle_box_quads_melee_kills.value}</span></p>
                                                <p>Ranged Kills: <span class="font-semibold">{data.player.statistics.battle_box_quads_ranged_kills.value}</span></p>
                                                <p>Explosive Kills: <span class="font-semibold">{data.player.statistics.battle_box_quads_explosive_kills.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.battle_box_quads_games_played.value}</span></p>
                                                <p>Team 1st Places: <span class="font-semibold">{data.player.statistics.battle_box_quads_team_first_place.value}</span></p>
                                                <p>Team 2nd Places: <span class="font-semibold">{data.player.statistics.battle_box_quads_team_second_place.value}</span></p>
                                                <p>Team 3rd Places: <span class="font-semibold">{data.player.statistics.battle_box_quads_team_third_place.value}</span></p>
                                                <p>Team 4th Places: <span class="font-semibold">{data.player.statistics.battle_box_quads_team_fourth_place.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Individual 1st Places: <span class="font-semibold">{data.player.statistics.battle_box_quads_first_place_individual.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box_quads_first_place_individual.value / data.player.statistics.battle_box_quads_games_played.value) * 100)}%)</span></p>
                                                <p>Individual Top 3: <span class="font-semibold">{data.player.statistics.battle_box_quads_top_three_individual.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box_quads_top_three_individual.value / data.player.statistics.battle_box_quads_games_played.value) * 100)}%)</span></p>
                                                <p>Individual Top 5: <span class="font-semibold">{data.player.statistics.battle_box_quads_top_five_individual.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.battle_box_quads_top_five_individual.value / data.player.statistics.battle_box_quads_games_played.value) * 100)}%)</span></p>
                                                <p>Concrete Broken: <span class="font-semibold">{data.player.statistics.battle_box_quads_enemy_wool_broken.value}</span> </p>
                                                <p>Concrete Placed: <span class="font-semibold">{data.player.statistics.battle_box_quads_wool_placed.value}</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, badges.battle_box)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.battle_box as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/battle_box/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics[badge.stat].value > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics[badge.stat].value}</span> time{data.player.statistics[badge.stat].value === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Tiered Badges</p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.battle_box_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/battle_box/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).tier.name}</p>
                                                        <p><span class="font-semibold">{data.player.statistics[badge.stat].value}</span>/{calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).next.amount}</p>
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
                                        <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.sky_battle_quads_survival_first_place.value}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{data.player.statistics.sky_battle_quads_games_played.value - data.player.statistics.sky_battle_quads_survival_first_place.value}</span></p>
                                                <p>WLR: <span class="font-semibold">{Math.floor((data.player.statistics.sky_battle_quads_survival_first_place.value / (data.player.statistics.sky_battle_quads_games_played.value - data.player.statistics.sky_battle_quads_survival_first_place.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.sky_battle_quads_players_killed.value}</span></p>
                                                <p>Deaths: <span class="font-semibold">{data.player.statistics.sky_battle_quads_games_played.value - data.player.statistics.sky_battle_quads_survival_first_place.value}</span></p>
                                                <p>KDR: <span class="font-semibold">{Math.floor((data.player.statistics.sky_battle_quads_players_killed.value / (data.player.statistics.sky_battle_quads_games_played.value - data.player.statistics.sky_battle_quads_survival_first_place.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Melee Kills: <span class="font-semibold">{data.player.statistics.sky_battle_quads_melee_kills.value}</span></p>
                                                <p>Ranged Kills: <span class="font-semibold">{data.player.statistics.sky_battle_quads_ranged_kills.value}</span></p>
                                                <p>Explosive Kills: <span class="font-semibold">{data.player.statistics.sky_battle_quads_explosive_kills.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.sky_battle_quads_games_played.value}</span></p>
                                                <p>Individual 1st Places: <span class="font-semibold">{data.player.statistics.sky_battle_quads_survival_first_place.value}</span></p>
                                                <p>Individual Top 3: <span class="font-semibold">{data.player.statistics.sky_battle_quads_survival_top_three.value}</span></p>
                                                <p>Individual Top 5: <span class="font-semibold">{data.player.statistics.sky_battle_quads_survival_top_five.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Chests Looted: <span class="font-semibold">{data.player.statistics.sky_battle_quads_chests_looted.value}</span></p>
                                                <p>Golden Chests Looted: <span class="font-semibold">{data.player.statistics.sky_battle_quads_golden_chests_looted.value}</span></p>
                                                <p>Survived 1 minute: <span class="font-semibold">{data.player.statistics.sky_battle_quads_survived_minute.value}</span> time{data.player.statistics.sky_battle_quads_survived_minute.value !== 1 ? "s" : ""}</p>
                                                <p>Survived 2 minutes: <span class="font-semibold">{data.player.statistics.sky_battle_quads_survived_two_minute.value}</span> time{data.player.statistics.sky_battle_quads_survived_two_minute.value !== 1 ? "s" : ""}</p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, badges.sky_battle)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.sky_battle as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics[badge.stat].value > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics[badge.stat].value}</span> time{data.player.statistics[badge.stat].value === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Tiered Badges</p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.sky_battle_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).tier.name}</p>
                                                        <p><span class="font-semibold">{data.player.statistics[badge.stat].value}</span>/{calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).next.amount}</p>
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
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.tgttos_first_place.value}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{data.player.statistics.tgttos_games_played.value - data.player.statistics.tgttos_first_place.value}</span></p>
                                                <p>WLR: <span class="font-semibold">{Math.floor((data.player.statistics.tgttos_first_place.value / (data.player.statistics.tgttos_games_played.value - data.player.statistics.tgttos_first_place.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.tgttos_players_punched_into_void.value}</span></p>
                                                <p>Deaths: <span class="font-semibold">{data.player.statistics.tgttos_times_died.value}</span></p>
                                                <p>KDR: <span class="font-semibold">{Math.floor((data.player.statistics.tgttos_players_punched_into_void.value / data.player.statistics.tgttos_times_died.value) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Blocks Placed: <span class="font-semibold">{data.player.statistics.tgttos_blocks_placed.value}</span></p>
                                                <p>Blocks Broken: <span class="font-semibold">{data.player.statistics.tgttos_blocks_broken.value}</span></p>
                                                <p>Chickens Punched: <span class="font-semibold">{data.player.statistics.tgttos_chickens_punched.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.tgttos_games_played.value}</span></p>
                                                <p>Game 1st Places: <span class="font-semibold">{data.player.statistics.tgttos_first_place.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_first_place.value / data.player.statistics.tgttos_games_played.value) * 100)}%)</span></p>
                                                <p>Game Top 3: <span class="font-semibold">{data.player.statistics.tgttos_top_three.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_top_three.value / data.player.statistics.tgttos_games_played.value) * 100)}%)</span></p>
                                                <p>Game Top 5: <span class="font-semibold">{data.player.statistics.tgttos_top_five.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_top_five.value / data.player.statistics.tgttos_games_played.value) * 100)}%)</span></p>
                                            </div>
                                            <div>
                                                <p>Round 1st Places: <span class="font-semibold">{data.player.statistics.tgttos_round_first_place.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_round_first_place.value / (data.player.statistics.tgttos_games_played.value * 3)) * 100)}%)</span></p>
                                                <p>Round Top 3: <span class="font-semibold">{data.player.statistics.tgttos_round_top_three.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_round_top_three.value / (data.player.statistics.tgttos_games_played.value * 3)) * 100)}%)</span></p>
                                                <p>Round Top 5: <span class="font-semibold">{data.player.statistics.tgttos_round_top_five.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_round_top_five.value / (data.player.statistics.tgttos_games_played.value * 3)) * 100)}%)</span></p>
                                                <p>Round Top 8: <span class="font-semibold">{data.player.statistics.tgttos_round_top_eight.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.tgttos_round_top_eight.value / (data.player.statistics.tgttos_games_played.value * 3)) * 100)}%)</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, badges.tgttos)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.tgttos as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics[badge.stat].value > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics[badge.stat].value}</span> time{data.player.statistics[badge.stat].value === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Tiered Badges</p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.tgttos_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).tier.name}</p>
                                                        <p><span class="font-semibold">{data.player.statistics[badge.stat].value}</span>/{calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).next.amount}</p>
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
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_first_place.value}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_games_played.value - data.player.statistics.hole_in_the_wall_first_place.value}</span></p>
                                                <p>WLR: <span class="font-semibold">{Math.floor((data.player.statistics.hole_in_the_wall_first_place.value / (data.player.statistics.hole_in_the_wall_games_played.value - data.player.statistics.hole_in_the_wall_first_place.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Players Outlived: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_players_outlived.value}</span></p>
                                                <p>Walls Dodged: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_walls_dodged.value}</span></p>
                                                <p>Survived 1 minute: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_survived_minute.value}</span> time{data.player.statistics.hole_in_the_wall_survived_minute.value === 1 ? "" : "s"}</p>
                                                <p>Survived 2 minutes: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_survived_two_minute.value}</span> time{data.player.statistics.hole_in_the_wall_survived_two_minute.value === 1 ? "" : "s"}</p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_games_played.value}</span></p>
                                                <p>1st Places: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_first_place.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.hole_in_the_wall_first_place.value / data.player.statistics.hole_in_the_wall_games_played.value) * 100)}%)</span></p>
                                                <p>Top 3: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_top_three.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.hole_in_the_wall_top_three.value / data.player.statistics.hole_in_the_wall_games_played.value) * 100)}%)</span></p>
                                                <p>Top 5: <span class="font-semibold">{data.player.statistics.hole_in_the_wall_top_five.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.hole_in_the_wall_top_five.value / data.player.statistics.hole_in_the_wall_games_played.value) * 100)}%)</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, badges.hitw)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.hitw as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/hitw/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics[badge.stat].value > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics[badge.stat].value}</span> time{data.player.statistics[badge.stat].value === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Tiered Badges</p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.hitw_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/hitw/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).tier.name}</p>
                                                        <p><span class="font-semibold">{data.player.statistics[badge.stat].value}</span>/{calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).next.amount}</p>
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
                                                <p>Games Won: <span class="font-semibold">{data.player.statistics.dynaball_wins.value}</span></p>
                                                <p>Games Lost: <span class="font-semibold">{data.player.statistics.dynaball_games_played.value - data.player.statistics.dynaball_wins.value}</span></p>
                                                <p>WLR: <span class="font-semibold">{Math.floor((data.player.statistics.dynaball_wins.value / (data.player.statistics.dynaball_games_played.value - data.player.statistics.dynaball_wins.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Kills: <span class="font-semibold">{data.player.statistics.dynaball_players_eliminated.value}</span></p>
                                                <p>Players Stuck: <span class="font-semibold">{data.player.statistics.dynaball_players_stuck.value}</span></p>
                                                <p>Spawners Broken: <span class="font-semibold">{data.player.statistics.dynaball_spawners_destroyed.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Games Played: <span class="font-semibold">{data.player.statistics.dynaball_games_played.value}</span></p>
                                                <p>Blocks Destroyed: <span class="font-semibold">{data.player.statistics.dynaball_blocks_destroyed.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                                                <p>Blocks Placed: <span class="font-semibold">{data.player.statistics.dynaball_blocks_placed.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                                            </div>
                                            <div>
                                                <p>Survived 1 Minute: <span class="font-semibold">{data.player.statistics.dynaball_survive_1m.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball_survive_1m.value / data.player.statistics.dynaball_games_played.value) * 100)}%)</span></p>
                                                <p>Survived 2 Minutes: <span class="font-semibold">{data.player.statistics.dynaball_survive_2m.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball_survive_2m.value / data.player.statistics.dynaball_games_played.value) * 100)}%)</span></p>
                                                <p>Survived 3 Minutes: <span class="font-semibold">{data.player.statistics.dynaball_survive_3m.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball_survive_3m.value / data.player.statistics.dynaball_games_played.value) * 100)}%)</span></p>
                                                <p>Survived 4 Minutes: <span class="font-semibold">{data.player.statistics.dynaball_survive_4m.value}</span> <span class="text-slate-500">({Math.round((data.player.statistics.dynaball_survive_4m.value / data.player.statistics.dynaball_games_played.value) * 100)}%)</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Badges <span class="text-slate-400">({calculateBadgeCompletion(data.player, badges.dynaball)}%)</span></p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.dynaball as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/dynaball/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class={`font-semibold ${data.player.statistics[badge.stat].value > 0 ? "text-green-500" : "text-red-500"}`}>{badge.name}</p>
                                                        <p>Completed <span class="font-semibold">{data.player.statistics[badge.stat].value}</span> time{data.player.statistics[badge.stat].value === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Tiered Badges</p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-5">
                                            {#each badges.dynaball_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/dynaball/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).tier.name}</p>
                                                        <p><span class="font-semibold">{data.player.statistics[badge.stat].value}</span>/{calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).next.amount}</p>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                <!--  PKW -->
                                <div class="flex flex-col items-start bg-slate-100 rounded-md border-2 border-slate-200 p-3">
                                    <button on:click={() => switchCategory(expandedCategory === "pkw" ? null : "pkw")} class="flex flex-row w-full">
                                        <img class="w-8 h-8 mr-2" src="https://cdn.islandstats.xyz/games/pkw/icon.png" alt="PKW Stats" />
                                        <p class="text-xl font-semibold">Parkour Warrior</p>
                                    </button>
                                    {#if expandedCategory === "pkw"}
                                        <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 items-start gap-y-4 mt-2 text-md gap-x-24">
                                            <div>
                                                <p>Total Medals: <span class="font-semibold">{data.player.statistics.pw_solo_total_medals_banked.value}</span></p>
                                                <p>Total Standard Completions: <span class="font-semibold">{data.player.statistics.pw_solo_total_standard_cmpls.value}</span></p>
                                                <p>Total Advanced Completions: <span class="font-semibold">{data.player.statistics.pw_solo_total_advanced_cmpls.value}</span></p>
                                                <p>Total Expert Completions: <span class="font-semibold">{data.player.statistics.pw_solo_total_expert_cmpls.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Unique Standard Completions: <span class="font-semibold">{data.player.statistics.pw_solo_unique_standard_cmpl.value}</span></p>
                                                <p>Unique Advanced Completions: <span class="font-semibold">{data.player.statistics.pw_solo_unique_advanced_cmpl.value}</span></p>
                                                <p>Unique Expert Completions: <span class="font-semibold">{data.player.statistics.pw_solo_unique_expert_cmpl.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Unique Daily Standard Completions: <span class="font-semibold">{data.player.statistics.pw_solo_unique_daily_standard_cmpl.value}</span></p>
                                                <p>Unique Daily Advanced Completions: <span class="font-semibold">{data.player.statistics.pw_solo_unique_daily_advanced_cmpl.value}</span></p>
                                                <p>Unique Daily Expert Completions: <span class="font-semibold">{data.player.statistics.pw_solo_unique_daily_expert_cmpl.value}</span></p>
                                            </div>
                                            <div>
                                                <p>Survivor Wins: <span class="font-semibold">{data.player.statistics.pw_survival_final_duel_wins.value}</span></p>
                                                <p>Survivor Losses: <span class="font-semibold">{data.player.statistics.pw_survival_games_played.value - data.player.statistics.pw_survival_final_duel_wins.value}</span></p>
                                                <p>Survivor WLR: <span class="font-semibold">{Math.floor((data.player.statistics.pw_survival_final_duel_wins.value / (data.player.statistics.pw_survival_games_played.value - data.player.statistics.pw_survival_final_duel_wins.value)) * 100) / 100}</span></p>
                                            </div>
                                            <div>
                                                <p>Survivor Games Played: <span class="font-semibold">{data.player.statistics.pw_survival_games_played.value}</span></p>
                                                <p>Survivor Players Eliminated: <span class="font-semibold">{data.player.statistics.pw_survival_players_eliminated.value}</span></p>
                                                <p>Survivor Obstacles Completed: <span class="font-semibold">{data.player.statistics.pw_survival_obstacles_completed.value}</span></p>
                                            </div>
                                        </div>

                                        <p class="font-semibold mt-4 mb-2 text-xl">Tiered Badges</p>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5">
                                            {#each badges.pkw_tiered as badge}
                                                <div class="flex flex-col sm:flex-row gap-x-2">
                                                    <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/pkw/${badge.icon}.png`} alt={badge.name} />
                                                    <div class="flex flex-col items-start mt-2 sm:mt-0">
                                                        <p class="font-semibold">{badge.name} {calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).tier.name}</p>
                                                        <p><span class="font-semibold">{data.player.statistics[badge.stat].value}</span>/{calculateBadgeTier(data.player.statistics[badge.stat].value, badge.tiers).next.amount}</p>
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
                                                <Star />
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

<footer class={`w-full bg-red-500 p-4 ${(expandedCategory === null || infoTab === "friends") ? "absolute bottom-0" : "relative"}`}>
    <div>
        <p class="text-center text-slate-100">© 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> • Not affiliated with Minecraft or Noxcrew!</p>
    </div>
</footer>