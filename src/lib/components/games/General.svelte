<script>
    import { calculatePercentage } from "$lib/utils.js";
    import { badges, calculateTrophies, calculateMaxTrophies } from "$lib/badges.js";
    import { slide } from "svelte/transition";
    import { Confetti } from "svelte-confetti";
    import Pie from "$lib/svgs/Pie.svelte";
    import TrendingUpArrow from "$lib/svgs/TrendingUpArrow.svelte";

    export let player;
    const gamesWon = player.statistics.battle_box.team_first_place + 
        player.statistics.sky_battle.quads.team_first_place + 
        player.statistics.tgttos.first_place + 
        player.statistics.hitw.first_place + 
        player.statistics.dynaball.wins + 
        player.statistics.pkw.survivor.wins +
        player.statistics.rocket_spleef.first_place;

    const games = [
        { icon: "battle_box", trophies: calculateTrophies(player.statistics.battle_box, badges.battle_box.concat(badges.battle_box_tiered)), maxTrophies: calculateMaxTrophies(badges.battle_box.concat(badges.battle_box_tiered)) },
        { icon: "sky_battle", trophies: calculateTrophies(player.statistics.sky_battle.quads, badges.sky_battle.concat(badges.sky_battle_tiered)), maxTrophies: calculateMaxTrophies(badges.sky_battle.concat(badges.sky_battle_tiered)) },
        { icon: "tgttos", trophies: calculateTrophies(player.statistics.tgttos, badges.tgttos.concat(badges.tgttos_tiered)), maxTrophies: calculateMaxTrophies(badges.tgttos.concat(badges.tgttos_tiered)) },
        { icon: "hitw", trophies: calculateTrophies(player.statistics.hitw, badges.hitw.concat(badges.hitw_tiered)), maxTrophies: calculateMaxTrophies(badges.hitw.concat(badges.hitw_tiered)) },
        { icon: "dynaball", trophies: calculateTrophies(player.statistics.dynaball, badges.dynaball.concat(badges.dynaball_tiered)), maxTrophies: calculateMaxTrophies(badges.dynaball.concat(badges.dynaball_tiered)) },
        { icon: "parkour_warrior/solo", trophies: calculateTrophies(player.statistics.pkw.dojo, badges.dojo_tiered), maxTrophies: calculateMaxTrophies(badges.dojo_tiered) },
        { icon: "parkour_warrior", trophies: calculateTrophies(player.statistics.pkw.survivor, badges.survivor_tiered), maxTrophies: calculateMaxTrophies(badges.survivor_tiered) },
        { icon: "rocket_spleef", trophies: calculateTrophies(player.statistics.rocket_spleef, badges.rocket_spleef.concat(badges.rocket_spleef_tiered)), maxTrophies: calculateMaxTrophies(badges.rocket_spleef.concat(badges.rocket_spleef_tiered)) },
    ].sort((a, b) => b.trophies - a.trophies);

    let overall = false;
    function toggleOverall() { overall = !overall; }
</script>

<div class="flex flex-col gap-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 mt-2 text-md">
        <div>
            <p>Total XP: <span class="font-semibold">{player.statistics.faction_total_xp.toLocaleString()}</span></p>
            <p>Game XP: <span class="font-semibold">{player.statistics.faction_game_xp.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(player.statistics.faction_game_xp, player.statistics.faction_total_xp)}%)</span></p>
            <p>Quest XP: <span class="font-semibold">{player.statistics.faction_quest_xp.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(player.statistics.faction_quest_xp, player.statistics.faction_total_xp)}%)</span></p>
        </div>
        <div>
            <p>Games Played: <span class="font-semibold">{player.statistics.games_played.toLocaleString()}</span></p>
            <p>Games Won: <span class="font-semibold">{gamesWon.toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(player.statistics.faction_game_xp, player.statistics.faction_total_xp)}%)</span></p>
            <p>Overall WLR: <span class="font-semibold">{(Math.floor((gamesWon / (player.statistics.games_played - gamesWon)) * 100) / 100 || 0).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(gamesWon, player.statistics.games_played)}%)</span></p>
        </div>
        <div>
            <p>Community Contributions: <span class="font-semibold">{player.statistics.community_contribution.toLocaleString()}</span></p>
        </div>
    </div>
    
    <div class="flex flex-col gap-y-1">
        <div class="flex flex-row justify-between">
            <div class="flex flex-col gap-y-1">
                <p class="text-xl font-bold leading-none text-neutral-900 dark:text-neutral-100">Skill Trophy Breakdown</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">{overall ? "Which games do your trophies come from?" : "How many trophies do you have in each game?"}</p>
            </div>

            <div class="flex flex-row gap-x-2">
                <button class="flex flex-row gap-x-1 text-md border border-neutral-300 dark:border-neutral-800 px-2 py-1 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100" on:click={toggleOverall}>
                    {#if overall}
                        <span class="w-6 h-6 self-center"><Pie /></span>
                        <span class="self-center">Overall</span>
                    {:else}
                        <span class="w-6 h-6 self-center"><TrendingUpArrow /></span>
                        <span class="self-center">Progress</span>
                    {/if}
                </button> 
            </div>
        </div>
        {#if games.reduce((a, b) => a + b.trophies, 0) === games.reduce((a, b) => a + b.maxTrophies, 0)}
            <div class="flex flex-row justify-between">
                <Confetti />
                <Confetti />
            </div>
        {/if}
        <div class="flex flex-col gap-y-2">
            {#each games as game}
                <div class="flex flex-row gap-x-2">
                    <img src={`https://cdn.islandstats.xyz/games/${game.icon}/icon.png`} class="w-8 h-8 self-center" alt="Game Icon" />
                    <div class="group h-6 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                        {#if overall}
                            {#if game.trophies === 0}
                                <span class="ml-2 self-center flex text-nowrap">{calculatePercentage(game.trophies, games.reduce((a, b) => a + b.trophies, 0))}%</span>
                            {:else}
                                <div class={`flex flex-col h-full left-0 right-0 rounded-full text-center text-neutral-900 ${game.trophies === game.maxTrophies ? "bg-green-500 dark:bg-green-500" : "bg-neutral-300 dark:bg-neutral-100"}`} style={`width: calc(100% * ${game.trophies / games.reduce((a, b) => a + b.trophies, 0)});`}>
                                    <span class="self-center flex text-nowrap">{calculatePercentage(game.trophies, games.reduce((a, b) => a + b.trophies, 0))}%</span>
                                </div>
                            {/if}
                        {:else}
                            {#if game.trophies === 0}
                                <span class="ml-2 self-center flex text-nowrap group-hover:hidden">{calculatePercentage(game.trophies, game.maxTrophies)}%</span>
                                <span class="ml-2 self-center hidden text-nowrap group-hover:flex">{game.trophies.toLocaleString()} / {game.maxTrophies.toLocaleString()}</span>
                            {:else}
                                <div class={`flex flex-col h-full left-0 right-0 rounded-full text-center text-neutral-900 ${game.trophies === game.maxTrophies ? "bg-green-500 dark:bg-green-500" : "bg-neutral-300 dark:bg-neutral-100"}`} style={`width: calc(100% * ${game.trophies / game.maxTrophies < 0.05 ? 0.05 : game.trophies / game.maxTrophies});`}>
                                    <span class="self-center flex text-nowrap group-hover:hidden">{calculatePercentage(game.trophies, game.maxTrophies)}%</span>
                                    <span class="self-center hidden text-nowrap group-hover:flex">{game.trophies.toLocaleString()} / {game.maxTrophies.toLocaleString()}</span>
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>