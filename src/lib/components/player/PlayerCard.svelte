<script>
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";
    import { calculateProgress, getNextLevel, getCurrentLevel, getIcon, getColour, calculateNextEvolution } from "$lib/levels.js";
    import { DateTime } from "luxon";
    import tooltip from "$lib/tooltip.js";

    export let data;

    let lastJoin = "Unknown";
    let firstJoin = "Unknown";
    if (data.player?.status) {
        const lastJoinDate = DateTime.fromISO(data.player.status.lastJoin.toLocaleString());
        const firstJoinDate = DateTime.fromISO(data.player.status.firstJoin.toLocaleString());

        lastJoin = `${lastJoinDate.day < 10 ? `0${lastJoinDate.day}`: lastJoinDate.day}/${lastJoinDate.month < 10 ? `0${lastJoinDate.month}`: lastJoinDate.month}/${lastJoinDate.year} @ ${lastJoinDate.hour < 10 ? `0${lastJoinDate.hour}`: lastJoinDate.hour}:${lastJoinDate.minute < 10 ? `0${lastJoinDate.minute}` : lastJoinDate.minute}`;
        firstJoin = `${firstJoinDate.day < 10 ? `0${firstJoinDate.day}`: firstJoinDate.day}/${firstJoinDate.month < 10 ? `0${firstJoinDate.month}`: firstJoinDate.month}/${firstJoinDate.year} @ ${firstJoinDate.hour < 10 ? `0${firstJoinDate.hour}`: firstJoinDate.hour}:${firstJoinDate.minute < 10 ? `0${firstJoinDate.minute}` : firstJoinDate.minute}`;
    }

    function calculateLastOnline() {
        if (data.player?.status) {
            const lastJoinDate = DateTime.fromISO(data.player.status.lastJoin.toLocaleString());
            // calculate how many seconds/minutes/hours/days ago the player was last online
            const diff = DateTime.now().diff(lastJoinDate, ["days", "hours", "minutes", "seconds"]);
            if (diff.days > 0) return `${diff.days} day${diff.days === 1 ? "" : "s"} ago`;
            if (diff.hours > 0) return `${diff.hours} hour${diff.hours === 1 ? "" : "s"} ago`;
            if (diff.minutes > 0) return `${diff.minutes} minute${diff.minutes === 1 ? "" : "s"} ago`;
            if (diff.seconds > 0) return `${diff.seconds} second${diff.seconds === 1 ? "" : "s"} ago`;
        }
    }
</script>

<div class="flex flex-col text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 rounded-md shadow-md">
    <div class="flex flex-row gap-x-2 border-b border-neutral-300 dark:border-neutral-800 p-4">
        <img class="w-12 h-12 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://mc-heads.net/avatar/${data.player.uuid}/128`} alt={`${data.player.username}'s Rank'`} />
        <img  class="w-12 h-12 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(data.player.ranks)}`} alt="" />

        <div class="flex flex-col gap-x-2">
            <div class="flex flex-row gap-x-1">
                <p class="text-2xl font-semibold self-center">{data.player.username}</p>
                {#if data.player.status?.online}<span class="ml-1 self-center mt-1 w-3 h-3 rounded-full bg-green-500"></span>{/if}
            </div>

            <div class="flex flex-row gap-x-1 text-md">
                {#if data.player.status}
                    {#if data.player.status.online}
                        <div class="flex flex-col text-md 2xl:text-md">
                            {#if data.player.status.server?.category === "GAME"}
                                <p class="flex flex-row gap-x-1">
                                    Playing 
                                    <span class="flex flex-row gap-x-1 font-semibold">
                                        <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(data.player.status.server?.associatedGame)}/icon.png`} alt={``} />
                                        {getStatusGame(data.player.status.server?.associatedGame)}
                                    </span>
                                </p>
                            {:else if data.player.status.server?.category === "LOBBY"}
                                <p class="flex flex-row gap-x-1">
                                    In the 
                                    <span class="flex flex-row gap-x-1 font-semibold">
                                        <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(data.player.status.server?.associatedGame) || "lobby"}/icon.png`} alt={``} />
                                        {getStatusGame(data.player.status.server?.associatedGame) || "Main"} Lobby
                                    </span>
                                </p>
                            {/if}
                        </div>
                    {:else}
                        <p class="text-neutral-900 dark:text-neutral-100">Last online: {calculateLastOnline()}</p>
                    {/if}
                {/if}
            </div>
        </div>
    </div>

    <div class="flex flex-col justify-center border-b border-neutral-300 dark:border-neutral-800 px-2 py-4 h-full">
        <div class="flex flex-row gap-x-3 mb-4 text-lg w-4/5 place-self-center">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(data.player.level)}.png`} alt={`Crown Level ${data.player.level} Icon`} class="w-7 h-7 self-center" />
            <span class="self-center font-bold text-xl">{data.player.level}</span>

            <div class="h-4 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div class="flex flex-col h-full left-0 right-0 rounded-md text-center group" style={`width: calc(100% * ${calculateProgress(data.player.level, data.player.trophies.total)}); ${getColour(data.player.level)}`}></div>
            </div>

            <span class="self-center font-bold text-xl">{data.player.level + 1}</span>
        </div>
        <p class="place-self-center text-md text-neutral-500 dark:text-neutral-400">
            Progress:
            {Math.round(calculateProgress(data.player.level, data.player.trophies.total) * 100)}%
            ({(data.player.trophies.total - getCurrentLevel(data.player.level)).toLocaleString()}/{(getNextLevel(data.player.level) - getCurrentLevel(data.player.level)).toLocaleString()})
        </p>
        <div class="place-self-center flex flex-row gap-x-2 text-md text-neutral-500 dark:text-neutral-400">
            <div class="flex flex-row gap-x-2">
                Next evolution is 
                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/crowns/${calculateNextEvolution(data.player.level, data.player.trophies.total).icon}.png`} alt="Next Crown Evolution Icon" />
                in
            </div>
            <div class="flex flex-row gap-x-1">
                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/trophies/yellow.png`} alt="Trophy Icon" />
                {calculateNextEvolution(data.player.level, data.player.trophies.total).trophies.toLocaleString()}
            </div>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="basis-1/2 flex flex-col border-r border-neutral-300 dark:border-neutral-800 px-4 py-2">
            <p class="text-neutral-900 dark:text-neutral-100 font-semibold text-xl mb-1">Trophies</p>
            <div class="flex flex-col gap-y-2">
                <div class="flex flex-row text-md sm:text-lg">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" class="w-8 h-8 self-center mr-1" alt="Total Trophies" use:tooltip title="Total Trophies" />
                    <span class="self-center font-semibold ">{data.player.trophies.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{data.player.trophies.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row text-md sm:text-lg">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" class="w-8 h-8 self-center mr-1" alt="Total Trophies" use:tooltip title="Skill Trophies" />
                    <span class="self-center font-semibold">{data.player.trophies.skill.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{data.player.trophies.skill.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row text-md sm:text-lg">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/purple.png" class="w-8 h-8 self-center mr-1" alt="Total Trophies" use:tooltip title="Style Trophies" />
                    <span class="self-center font-semibold">{data.player.trophies.style.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{data.player.trophies.style.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row text-md sm:text-lg">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/silver.png" class="w-8 h-8 self-center mr-1" alt="Total Trophies" use:tooltip title="Bonus Trophies" />
                    <span class="self-center font-semibold">{data.player.trophies.bonus.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div class="basis-1/2 flex flex-col px-4 py-2">
            <p class="text-neutral-900 dark:text-neutral-100 font-semibold text-xl mb-1">Wallet</p>
            {#each [
                { stat: "coins", icon: "coin", name: "Coins" },
                { stat: "gems", icon: "gem", name: "Gems" },
                { stat: "silver", icon: "silver", name: "Silver" },
                { stat: "materialDust", icon: "material_dust", name: "Material Dust" },
                { stat: "royalReputation", icon: "royal_reputation", name: "Royal Reputation" }
            ] as currency}
                <div class="flex flex-row sm:gap-1 my-1">
                    <img src={`https://cdn.islandstats.xyz/icons/currency/${currency.icon}.png`} class="w-6 h-6" alt="Coins" use:tooltip title={currency.name} />
                    <p class="text-md ml-1 sm:ml-0 2xl:text-md">{data.player.collections?.currency[currency.stat].toLocaleString() || "Unknown"}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
