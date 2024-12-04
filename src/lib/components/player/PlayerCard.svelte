<script>
    import { getRankIcon, getStatusGame, getStatusIcon } from "$lib/utils.js";
    import { getIcon, getColour, calculateNextEvolution } from "$lib/levels.js";
    import { DateTime } from "luxon";
    import tooltip from "$lib/tooltip.js";

    export let player;

    let lastJoin = "Unknown";
    let firstJoin = "Unknown";
    if (player?.status) {
        const lastJoinDate = DateTime.fromISO(player.status.lastJoin.toLocaleString());
        const firstJoinDate = DateTime.fromISO(player.status.firstJoin.toLocaleString());

        lastJoin = `${lastJoinDate.day < 10 ? `0${lastJoinDate.day}`: lastJoinDate.day}/${lastJoinDate.month < 10 ? `0${lastJoinDate.month}`: lastJoinDate.month}/${lastJoinDate.year} @ ${lastJoinDate.hour < 10 ? `0${lastJoinDate.hour}`: lastJoinDate.hour}:${lastJoinDate.minute < 10 ? `0${lastJoinDate.minute}` : lastJoinDate.minute}`;
        firstJoin = `${firstJoinDate.day < 10 ? `0${firstJoinDate.day}`: firstJoinDate.day}/${firstJoinDate.month < 10 ? `0${firstJoinDate.month}`: firstJoinDate.month}/${firstJoinDate.year} @ ${firstJoinDate.hour < 10 ? `0${firstJoinDate.hour}`: firstJoinDate.hour}:${firstJoinDate.minute < 10 ? `0${firstJoinDate.minute}` : firstJoinDate.minute}`;
    }

    function calculateTimeAgo(time) {
        if (player?.status) {
            const lastJoinDate = DateTime.fromISO(time);
            // calculate how many seconds/minutes/hours/days ago the player was last online
            const diff = DateTime.now().diff(lastJoinDate, ["months", "weeks", "days", "hours", "minutes", "seconds"]);
            if (diff.months > 0) return `${diff.months} month${diff.months === 1 ? "" : "s"} ago`;
            if (diff.weeks > 0) return `${diff.days} week${diff.days === 1 ? "" : "s"} ago`;
            if (diff.days > 0) return `${diff.days} day${diff.days === 1 ? "" : "s"} ago`;
            if (diff.hours > 0) return `${diff.hours} hour${diff.hours === 1 ? "" : "s"} ago`;
            if (diff.minutes > 0) return `${diff.minutes} minute${diff.minutes === 1 ? "" : "s"} ago`;
            if (diff.seconds > 0) return `${diff.seconds} second${diff.seconds === 1 ? "" : "s"} ago`;
        }
    }
</script>

<div class="flex flex-col gap-y-2 text-neutral-900 dark:text-neutral-100">
    <!-- head, rank and username -->
    <div class="flex flex-row gap-x-2 border-2 border-neutral-300 dark:border-neutral-800 rounded-lg shadow-lg p-3">
        <img class="w-14 h-14 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://mc-heads.net/avatar/${player.uuid}/128`} alt={`${player.username}'s Rank'`} />

        {#if player.status}
            <div class="flex flex-col gap-x-2">
                <div class="flex flex-row gap-x-2">
                    <img class="w-7 h-7 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.ranks)}`} alt="" />
                    <p class="text-2xl font-semibold self-center">{player.username}</p>

                    {#if player.status?.online}
                        <span class="ml-1 self-center mt-1 w-3 h-3 rounded-full bg-green-500"></span>
                    {:else}
                        <span class="ml-1 self-center mt-1 w-3 h-3 rounded-full bg-red-500"></span>
                    {/if}
                </div>

                <div class="flex flex-row gap-x-1 text-md">
                    {#if player.status.online}
                            <div class="flex flex-col text-sm 2xl:text-md">
                                {#if player.status.server?.category === "GAME"}
                                    <p class="flex flex-row gap-x-1">
                                        Playing
                                        <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(player.status.server?.associatedGame)}/icon.png`} alt={``} />
                                        <span class="font-semibold">{getStatusGame(player.status.server?.associatedGame)}</span>
                                    </p>
                                {:else if player.status.server?.category === "LOBBY"}
                                    <p class="flex flex-row gap-x-1">
                                        In the 
                                        <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(player.status.server?.associatedGame) || "lobby"}/icon.png`} alt={``} />
                                        <span class="font-semibold">{getStatusGame(player.status.server?.associatedGame) || "Main"} Lobby</span>
                                    </p>
                                {/if}
                            </div>
                        {:else}
                            <p class="text-neutral-900 dark:text-neutral-100">Last online: {calculateTimeAgo(player.status.lastJoin.toLocaleString())}</p>
                        {/if}
                </div>
            </div>
        {:else}
            <p class="text-2xl font-semibold self-center">{player.username}</p>
        {/if}
    </div>

    <!-- crown level -->
    <div class="flex flex-col gap-y-1 justify-center border-2 border-neutral-300 dark:border-neutral-800 rounded-lg shadow-lg py-4">
        <div class="flex flex-row gap-x-3 text-lg w-full px-4 place-self-center">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${player.trophies.evolution}.png`} alt={`Crown Level ${player.level} Icon`} class="w-7 h-7 self-center" />
            <span class="self-center font-bold text-xl">{player.level}</span>

            <!-- progress bar -->
            <div class="h-4 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div class="flex flex-col h-full left-0 right-0 rounded-l-full text-center group" style={`width: calc(100% * ${Math.round(player.trophies.nextLevel.obtained / player.trophies.nextLevel.obtainable) * 100}); ${getColour(player.level)}`}></div>
            </div>

            <span class="self-center font-bold text-xl">{player.level + 1}</span>
        </div>
        <p class="place-self-center text-md text-neutral-500 dark:text-neutral-400">
            Progress:
            {Math.round(player.trophies.nextLevel.obtained / player.trophies.nextLevel.obtainable) * 100}%
            ({player.trophies.nextLevel.obtained.toLocaleString()}/{player.trophies.nextLevel.obtainable.toLocaleString()})
        </p>
        <div class="place-self-center flex flex-row gap-x-2 text-md text-neutral-500 dark:text-neutral-400">
            <div class="flex flex-row flex-wrap gap-x-2">
                Next evolution is 
                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(player.trophies.nextEvolutionLevel)}.png`} alt="Next Crown Evolution Icon" />
                in
            </div>
            <div class="flex flex-row gap-x-1">
                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/trophies/yellow.png`} alt="Trophy Icon" />
                {calculateNextEvolution(player).toLocaleString()}
            </div>
        </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-x-2">
        <!-- trophies -->
        <div class="w-1/2 flex flex-col border-2 border-neutral-300 dark:border-neutral-800 rounded-lg shadow-lg p-3">
            <p class="text-neutral-900 dark:text-neutral-100 font-semibold text-xl pb-1">Trophies</p>
            <div class="flex flex-col gap-y-2 text-md font-semibold">
                <div class="flex flex-row">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" class="w-7 h-7 self-center mr-1" alt="Total Trophies" use:tooltip title="Total Trophies" />
                    <span class="self-center">{player.trophies.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{player.trophies.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" class="w-7 h-7 self-center mr-1" alt="Skill Trophies" use:tooltip title="Skill Trophies" />
                    <span class="self-center">{player.trophies.skill.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{player.trophies.skill.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/purple.png" class="w-7 h-7 self-center mr-1" alt="Style Trophies" use:tooltip title="Style Trophies" />
                    <span class="self-center">{player.trophies.style.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{player.trophies.style.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" class="w-7 h-7 self-center mr-1" alt="Angler Trophies" use:tooltip title="Angler Trophies" />
                    <span class="self-center">{player.trophies.angler.total.toLocaleString()}</span>
                    <span class="self-center px-1 text-neutral-400 dark:text-neutral-600">/</span>
                    <span class="self-center text-neutral-400 dark:text-neutral-600">{player.trophies.angler.max.toLocaleString()}</span>
                </div>
                <div class="flex flex-row">
                    <img src="https://cdn.islandstats.xyz/icons/trophies/silver.png" class="w-7 h-7 self-center mr-1" alt="Bonus Trophies" use:tooltip title="Bonus Trophies" />
                    <span class="self-center">{player.trophies.bonus.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <!-- wallet -->
        <div class="w-1/2 flex flex-col border-2 border-neutral-300 dark:border-neutral-800 rounded-lg shadow-lg p-3">
            <p class="text-neutral-900 dark:text-neutral-100 font-semibold text-xl">Wallet</p>
            {#each [
                { stat: "coins", icon: "coin", name: "Coins" },
                { stat: "gems", icon: "gem", name: "Gems" },
                { stat: "silver", icon: "silver", name: "Silver" },
                { stat: "materialDust", icon: "material_dust", name: "Material Dust" },
                { stat: "royalReputation", icon: "royal_reputation", name: "Royal Reputation" }
            ] as currency}
                <div class="flex flex-row sm:gap-1 my-1 font-semibold tracking-wider">
                    <img src={`https://cdn.islandstats.xyz/icons/currency/${currency.icon}.png`} class="w-6 h-6 self-center" alt={currency.name} use:tooltip title={currency.name} />
                    <p class="text-md ml-1">{player.collections?.currency[currency.stat].toLocaleString() || "Hidden"}</p>
                </div>
            {/each}
        </div>
    </div>

    <!-- other stats -->
    {#if player.status}
        <div class="border-2 border-neutral-300 dark:border-neutral-800 rounded-lg shadow-lg p-3">
            <p>First joined: <span use:tooltip title={firstJoin} class="font-semibold tracking-wide">{calculateTimeAgo(player.status.firstJoin.toLocaleString())}</span></p>
        </div>
    {/if}
</div>
