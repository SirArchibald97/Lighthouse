<script>
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";
    import { calculateTotalTrophies } from "$lib/data.js";
    import tooltip from "$lib/tooltip.js";
    import { DateTime } from "luxon";

    export let data;

    let lastJoin = "Unknown";
    let firstJoin = "Unknown";
    if (data.player?.status) {
        const lastJoinDate = DateTime.fromISO(data.player.status.lastJoin.toLocaleString());
        const firstJoinDate = DateTime.fromISO(data.player.status.firstJoin.toLocaleString());

        lastJoin = `${lastJoinDate.day < 10 ? `0${lastJoinDate.day}`: lastJoinDate.day}/${lastJoinDate.month < 10 ? `0${lastJoinDate.month}`: lastJoinDate.month}/${lastJoinDate.year} @ ${lastJoinDate.hour < 10 ? `0${lastJoinDate.hour}`: lastJoinDate.hour}:${lastJoinDate.minute < 10 ? `0${lastJoinDate.minute}` : lastJoinDate.minute}`;
        firstJoin = `${firstJoinDate.day < 10 ? `0${firstJoinDate.day}`: firstJoinDate.day}/${firstJoinDate.month < 10 ? `0${firstJoinDate.month}`: firstJoinDate.month}/${firstJoinDate.year} @ ${firstJoinDate.hour < 10 ? `0${firstJoinDate.hour}`: firstJoinDate.hour}:${firstJoinDate.minute < 10 ? `0${firstJoinDate.minute}` : firstJoinDate.minute}`;
    }
</script>

<div>
    <!-- PLAYER -->
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
        <div class="flex flex-col mt-2 text-md 2xl:text-md">
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

        <!-- DATES -->
        <div class="flex flex-col mt-4 text-md 2xl:text-md">
            <p>Last joined: <span class="font-semibold">{lastJoin}</span></p>
            <p>First joined: <span class="font-semibold">{firstJoin}</span></p>
        </div>
    {/if}

    <div class="flex flex-col mt-4 text-md 2xl:text-md">
        <p>Total Faction XP: <span class="font-semibold">{data.player.statistics?.faction_total_xp.toLocaleString() || "Unknown"}</span></p>
        <p>Game XP: <span class="font-semibold">{data.player.statistics?.faction_game_xp.toLocaleString() || "Unknown"}</span></p>
        <p>Quest XP: <span class="font-semibold">{data.player.statistics?.faction_quest_xp.toLocaleString() || "Unknown"}</span></p>
    </div>

    <!-- WALLET -->
    <div class="flex flex-col mt-4">
        <p class="text-md 2xl:text-xl font-semibold">Wallet</p>
        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
            <img src="https://cdn.islandstats.xyz/icons/coin.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
            <p class="text-md ml-1 sm:ml-0 2xl:text-md">{data.player.collections?.currency.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
        </div>
        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
            <img src="https://cdn.islandstats.xyz/icons/gem.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
            <p class="text-md ml-1 sm:ml-0 2xl:text-md">{data.player.collections?.currency.gems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
        </div>
        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
            <img src="https://cdn.islandstats.xyz/icons/silver.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
            <p class="text-md ml-1 sm:ml-0 2xl:text-md">{data.player.collections?.currency.silver.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
        </div>
        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
            <img src="https://cdn.islandstats.xyz/icons/material_dust.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
            <p class="text-md ml-1 sm:ml-0 2xl:text-md">{data.player.collections?.currency.materialDust.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
        </div>
        <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
            <img src="https://cdn.islandstats.xyz/icons/royal_reputation.png" class="w-6 h-6 2xl:w-8 2xl:h-8" alt="Coins" />
            <p class="text-md ml-1 sm:ml-0 2xl:text-md">{data.player.collections?.currency.royalReputation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || "Unknown"}</p>
        </div>
    </div>

    <!-- TROPHIES -->
    <p class="text-md 2xl:text-xl font-semibold mt-4">Trophies</p>
    <div class="flex flex-row sm:gap-1 2xl:gap-2 my-1">
        <img src="https://cdn.islandstats.xyz/icons/trophy.png" class="w-6 h-6 2xl:w-8 2xl:h-8 self-center" alt="Total Trophies" />
        <span use:tooltip title="Only includes trophies earned from game badges" class="text-md ml-1 sm:ml-0">{data.player.statistics ? calculateTotalTrophies(data.player.statistics).toLocaleString() : "Unknown"}*</span>
    </div>

    <!-- VIEWS -->
    <p class="mt-4 text-slate-500 text-sm 2xl:text-md">Views: <span>{data.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
</div>
