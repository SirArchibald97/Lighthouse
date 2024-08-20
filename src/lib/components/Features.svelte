<script>
    import LineGraph from "$lib/svgs/LineGraph.svelte";
    import Globe from "$lib/svgs/Globe.svelte";
    import CompareArrows from "$lib/svgs/CompareArrows.svelte";
    import Trophy from "$lib/svgs/Trophy.svelte";
    import { getRankIcon } from "$lib/utils.js";
    import { getIcon } from "$lib/levels.js";
    import tooltip from "$lib/tooltip.js";

    const leaderboard = {
        name: "Crown Level",
        stat: "trophies.total",
        display: "level",
        icon: "https://cdn.islandstats.xyz/icons/crowns/1.png",
        title: "Total Trophies",
        players: [
            { uuid: "19f9fd28-558c-4959-98c2-fb1a18bed0a1", username: "SirArchibald97", ranks: ["MODERATOR"], level: 35, trophies: { total: 23219 } },
            { uuid: "db6f2b90-762c-4ec9-82b1-9a2392cf409a", username: "Centranos", ranks: ["GRAND_CHAMP_ROYALE"], level: 9, trophies: { total: 3850 } },
            { uuid: "3e7a89ee-c4e2-4392-a317-444b861b0794", username: "Noxite", ranks: ["NOXCREW"], level: 4, trophies: { total: 1865 } },
        ]
    };

    const badges = [
        { name: "TGTTOS Champion", icon: "tgttos/tgttos_champion", tier: 6, average: 0.2, gamesLeft: 76 },
        { name: "Chicken Puncher", icon: "tgttos/chicken_puncher", tier: 4, average: 1.1, gamesLeft: 980 },
        { name: "Sky Battle Player", icon: "sky_battle/sky_battle_player", tier: 2, average: 0.8, gamesLeft: 2636 }
    ]
</script>

<div class="flex flex-col px-4 sm:px-24 2xl:px-32 py-8 pb-4 sm:pb-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 *:p-3  *:rounded-md *:shadow-xl *:text-neutral-900 *:dark:text-neutral-100">
        <!-- STAT TRACKING -->
        <div class="flex flex-row justify-center bg-neutral-300/50 dark:bg-neutral-800/50">
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-row gap-x-2 justify-center">
                    <span class="w-12 h-12 self-center"><LineGraph /></span>
                    <p class="text-2xl font-semibold self-center">Track your stats</p>
                </div>
                <div class="flex flex-col text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 rounded-md shadow-md">
                    <div class="flex flex-row gap-x-2 border-b border-neutral-300 dark:border-neutral-800 p-4">
                        <img class="w-10 md:w-12 h-10 md:h-12 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://mc-heads.net/avatar/19f9fd28-558c-4959-98c2-fb1a18bed0a1/128`} alt={`SirArchibald97's Rank'`} />
                        <img class="w-10 md:w-12 h-10 md:h-12 rounded-sm bg-neutral-400 dark:bg-neutral-600 self-center" src={`https://cdn.islandstats.xyz/ranks/moderator.png`} alt="" />
                
                        <div class="flex flex-col gap-x-2">
                            <div class="flex flex-row gap-x-1">
                                <p class="text-lg md:text-2xl font-semibold self-center">SirArchibald97</p>
                                <span class="ml-1 self-center mt-1 w-3 h-3 rounded-full bg-green-500"></span>
                            </div>
                
                            <div class="flex flex-row gap-x-1 text-xs md:text-sm 2xl:text-md">
                                <div class="flex flex-col">
                                    <p class="flex flex-row gap-x-1">
                                        Playing 
                                        <span class="flex flex-row gap-x-1 font-semibold">
                                            <img class="w-4 h-4 2xl:w-6 2xl:h-6 self-center" src={`https://cdn.islandstats.xyz/games/dynaball/icon.png`} alt={``} />
                                            Dynaball
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="flex flex-col justify-center border-b border-neutral-300 dark:border-neutral-800 px-2 py-4 h-full">
                        <div class="flex flex-row gap-x-3 mb-4 text-lg w-4/5 place-self-center">
                            <img src={`https://cdn.islandstats.xyz/icons/crowns/4.png`} alt={`Crown Level 35 Icon`} class="w-7 h-7 self-center" />
                            <span class="self-center font-bold text-xl">35</span>
                
                            <div class="h-4 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                                <div class="flex flex-col h-full left-0 right-0 rounded-full text-center group" style={`width: calc(100% * 0.22); background-color: #a855f7`}></div>
                            </div>
                
                            <span class="self-center font-bold text-xl">36</span>
                        </div>
                        <p class="place-self-center text-md text-neutral-500 dark:text-neutral-400">Progress: 22% (219/1,000)</p>
                        <div class="place-self-center flex flex-row gap-x-2 text-md text-neutral-500 dark:text-neutral-400">
                            <div class="flex flex-row flex-wrap gap-x-2">
                                Next evolution is 
                                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/crowns/5.png`} alt="Next Crown Evolution Icon" />
                                in
                            </div>
                            <div class="flex flex-row gap-x-1">
                                <img class="w-6 h-6 self-center" src={`https://cdn.islandstats.xyz/icons/trophies/yellow.png`} alt="Trophy Icon" />4,781
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- LEADERBOARDS -->
        <div class="flex flex-row justify-center bg-neutral-300/50 dark:bg-neutral-800/50">
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-row gap-x-4 justify-center">
                    <span class="w-12 h-12 self-center"><Globe /></span>
                    <p class="text-2xl font-semibold self-center">See where you stand</p>
                </div>
                <div class="border border-neutral-300 dark:border-neutral-800 rounded-md shadow-md py-3 px-6">
                    <div class="flex flex-row justify-between m-3">
                        <div class="flex flex-row gap-x-2">
                            {#if leaderboard.icon && !leaderboard.title}<img src={leaderboard.icon} alt="Leadboard Icon" class="w-8 sm:w-10 h-8 sm:h-10 self-center" />{:else if leaderboard.icon && leaderboard.title}<img src={leaderboard.icon} alt="Leadboard Icon" class="w-10 h-10 self-center" use:tooltip title={leaderboard.title} />{/if}
                            <p class={`text-xl sm:text-2xl text-neutral-909 dark:text-neutral-100 font-semibold self-center ${leaderboard.icon ? "" : "ml-2"}`}>{leaderboard.name}</p>
                        </div>
                    </div>
                    <table class="flex-1 table-auto border-separate border-spacing-y-1 border-spacing-x-2 px-2 text-md sm:text-lg">
                        <tbody class="">
                            {#each leaderboard.players as player}
                                <tr>
                                    <td class="text-neutral-909 dark:text-neutral-100">{(leaderboard.players.indexOf(leaderboard.players.find(p => p.username === player.username)) + 1).toLocaleString()}</td>
                                    <td>
                                        <div class="flex flex-row gap-x-2">
                                            <img class="w-6 sm:w-8 h-6 sm:h-8 self-center bg-slate-400 rounded-sm" src={`https://mc-heads.net/avatar/${player.uuid}/128`} alt={`${player.username}'s Rank`} />
                                            <img class="hidden sm:flex w-8 h-8 self-center bg-slate-400 rounded-sm" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.ranks)}`} alt={`${player.username}'s Rank`} />
                                            <p class="text-neutral-909 dark:text-neutral-100 self-center">{player.username}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-row gap-x-2">
                                            {#if leaderboard.display === "level"}<img src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(player.level)}.png`} class="w-5 sm:w-7 h-5 sm:h-7 self-center" alt="Crown Level Icon" />{/if}
                                            <span class="self-center text-neutral-900 dark:text-neutral-100">{player.level?.toLocaleString() || "-"}</span>
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- TROPHY HUNTING -->
        <div class="flex flex-row justify-center bg-neutral-300/50 dark:bg-neutral-800/50">
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-row gap-x-4 justify-center">
                    <span class="w-12 h-12 self-center"><Trophy /></span>
                    <p class="text-2xl font-semibold self-center">Optimise your performance</p>
                </div>
                <div class="flex flex-col gap-y-3 border border-neutral-300 dark:border-neutral-800 rounded-md shadow-md p-4">
                    {#each badges as item}
                        <div class="flex flex-col sm:flex-row gap-x-2">
                            <img class="w-12 h-12" src={`https://cdn.islandstats.xyz/badges/${item.icon}.png`} alt={item.name} />
                            <div class="flex flex-col items-start mt-2 sm:mt-0">
                                <p class="font-semibold text-yellow-500">{item.name} {item.tier}/7</p>
                                <p>Average of <span class="font-semibold">{item.average.toLocaleString()}</span> completions per game, badge complete in <span class="font-semibold">~{item.gamesLeft.toLocaleString()}</span> game!</p>
                            </div>
                        </div>                        
                    {/each}
                </div>
            </div>
        </div>

        <!-- COMPARE -->
        <div class="flex flex-row justify-center bg-neutral-300/10 dark:bg-neutral-800/10">
            <div class="flex flex-col gap-y-4 ">
                <div class="flex flex-row gap-x-4">
                    <span class="w-12 h-12 self-center"><CompareArrows /></span>
                    <p class="text-2xl font-semibold self-center">Compare with others</p>
                    <p class="bg-neutral-300 dark:bg-neutral-700 rounded-full self-center px-3 py-1">Coming soon</p>
                </div>
            </div>
        </div>
    </div>
</div>