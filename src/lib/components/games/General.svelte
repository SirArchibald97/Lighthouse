<script>
    import { calculatePercentage } from "$lib/utils.js";
    import { badges, calculateTrophies, calculateMaxTrophies } from "$lib/badges.js";
    import { Confetti } from "svelte-confetti";
    import tooltip from "$lib/tooltip.js";
    import Pie from "$lib/svgs/Pie.svelte";
    import TrendingUpArrow from "$lib/svgs/TrendingUpArrow.svelte";
	import Highcharts from "highcharts";
	import { onMount } from "svelte";

    export let player;
    const gamesWon = player.statistics.battle_box.team_first_place + 
        player.statistics.sky_battle.quads.team_first_place + 
        player.statistics.tgttos.first_place + 
        player.statistics.hitw.first_place + 
        player.statistics.dynaball.wins + 
        player.statistics.pkw.survivor.wins +
        player.statistics.rocket_spleef.first_place;

    let overall = true;
    function toggleOverall() { overall = !overall; }

    const games = [
        { name: "Battle Box", colour: "#65a30d", icon: "battle_box", trophies: calculateTrophies(player.statistics.battle_box, badges.battle_box.concat(badges.battle_box_tiered)), maxTrophies: calculateMaxTrophies(badges.battle_box.concat(badges.battle_box_tiered)) },
        { name: "Sky Battle", colour: "#ef4444", icon: "sky_battle", trophies: calculateTrophies(player.statistics.sky_battle.quads, badges.sky_battle.concat(badges.sky_battle_tiered)), maxTrophies: calculateMaxTrophies(badges.sky_battle.concat(badges.sky_battle_tiered)) },
        { name: "TGTTOS", colour: "#fef08a", icon: "tgttos", trophies: calculateTrophies(player.statistics.tgttos, badges.tgttos.concat(badges.tgttos_tiered)), maxTrophies: calculateMaxTrophies(badges.tgttos.concat(badges.tgttos_tiered)) },
        { name: "HITW", colour: "#22c55e", icon: "hitw", trophies: calculateTrophies(player.statistics.hitw, badges.hitw.concat(badges.hitw_tiered)), maxTrophies: calculateMaxTrophies(badges.hitw.concat(badges.hitw_tiered)) },
        { name: "Dynaball", colour: "#292524", icon: "dynaball", trophies: calculateTrophies(player.statistics.dynaball, badges.dynaball.concat(badges.dynaball_tiered)), maxTrophies: calculateMaxTrophies(badges.dynaball.concat(badges.dynaball_tiered)) },
        { name: "PKW Dojo", colour: "#facc15", icon: "parkour_warrior/solo", trophies: calculateTrophies(player.statistics.pkw.dojo, badges.dojo_tiered), maxTrophies: calculateMaxTrophies(badges.dojo_tiered) },
        { name: "PKW Survivor", colour: "#a3e635", icon: "parkour_warrior", trophies: calculateTrophies(player.statistics.pkw.survivor, badges.survivor_tiered), maxTrophies: calculateMaxTrophies(badges.survivor_tiered) },
        { name: "Rocket Spleef Rush", colour: "#94a3b8", icon: "rocket_spleef", trophies: calculateTrophies(player.statistics.rocket_spleef, badges.rocket_spleef.concat(badges.rocket_spleef_tiered)), maxTrophies: calculateMaxTrophies(badges.rocket_spleef.concat(badges.rocket_spleef_tiered)) },
    ];
    const totalTrophies = games.reduce((a, b) => a + b.trophies, 0);

    /*
    onMount(() => {
        Highcharts.chart("trophyPie", {
            chart: { 
                plotBackgroundColor: "#171717",
                plotShadow: false,
                type: "pie",
                margin: [0, 0, 0, 0]
            },
            title: "Trophies",
            tooltip: { pointFormat: "<b>{point.y}</b>" },
            accessibility: {
                point: { valueSuffix: '%' }
            },
            plotOptions: {
                pie: {
                    animation: false,
                    borderWidth: 0,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<span style="font-size: 1.2em"><b>{point.name}</b>' +
                            '</span><br>' +
                            '<span style="opacity: 0.6">{point.percentage:.1f}' +
                            '%</span>',
                        connectorColor: 'rgba(128,128,128,0.5)'
                    }
                }
            },
            series: [{
                name: "Trophies",
                data: [
                    { name: "Skill Trophies", y: player.trophies.skill.total, color: "#ef4444" },
                    { name: "Style Trophies", y: player.trophies.style.total, color: "#8b5cf6" },
                    { name: "Angler Trophies", y: player.trophies.angler.total, color: "#06b6d4" }
                ]
            }],
            credits: {
                enabled: false,
            }
        });

        Highcharts.chart("gameTrophyPie", {
            chart: { 
                plotBackgroundColor: "#171717",
                plotShadow: false,
                type: "pie",
                margin: [0, 0, 0, 0]
            },
            title: "Trophies",
            tooltip: { pointFormat: "<b>{point.y}</b>" },
            accessibility: {
                point: { valueSuffix: '%' }
            },
            plotOptions: {
                pie: {
                    animation: false,
                    borderWidth: 0,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<span style="font-size: 1.2em"><b>{point.name}</b>' +
                            '</span><br>' +
                            '<span style="opacity: 0.6">{point.percentage:.1f}' +
                            '%</span>',
                        connectorColor: 'rgba(128,128,128,0.5)'
                    }
                }
            },
            series: [{
                name: "Trophies",
                data: games.map(game => { return { name: game.name, y: game.trophies, color: game.colour } })
            }],
            credits: {
                enabled: false,
            }
        });
    });
    */
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
            <p>Games Won: <span class="font-semibold">{gamesWon.toLocaleString()}</span></p>
            <p>Overall WLR: <span class="font-semibold">{(Math.floor((gamesWon / (player.statistics.games_played - gamesWon)) * 100) / 100 || 0).toLocaleString()}</span> <span class="text-slate-500">({calculatePercentage(gamesWon, player.statistics.games_played)}%)</span></p>
        </div>
        <div>
            <p>Community Contributions: <span class="font-semibold">{player.statistics.community_contribution.toLocaleString()}</span></p>
        </div>
    </div>
    
    <div class="flex flex-col gap-y-2">
        <div class="flex flex-col gap-y-3">
            <div class="flex flex-row justify-between gap-y-1">
                <div class="flex flex-col">
                    <p class="text-xl font-bold leading-none text-neutral-900 dark:text-neutral-100">Skill Trophy Breakdown</p>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">{overall ? "Which games do your trophies come from?" : "How many trophies do you have in each game?"}</p>
                </div>

                <button on:click={toggleOverall} class="flex flex-row gap-x-1 text-md border border-neutral-300 dark:border-neutral-800 px-2 py-1 rounded-md dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-800 duration-100">
                    {#if overall}
                        <span class="w-6 h-6 self-center"><Pie /></span>
                        <span class="self-center">Overall</span>
                    {:else}
                        <span class="w-6 h-6 self-center"><TrendingUpArrow /></span>
                        <span class="self-center">Progress</span>
                    {/if}
                </button>
            </div>
            <!--
            <div class="flex flex-row gap-x-4">
                <div class="h-64" id="trophyPie"></div>
                <div class="h-64" id="gameTrophyPie"></div>
            </div>
            -->
        </div>

        {#if games.reduce((a, b) => a + b.trophies, 0) === games.reduce((a, b) => a + b.maxTrophies, 0)}
            <div class="flex flex-row justify-between">
                <Confetti />
                <Confetti />
            </div>
        {/if}

        
        <div class="flex flex-col gap-y-2">
            {#each games.sort((a, b) => {
                if (overall) {
                    return (b.trophies / totalTrophies) - (a.trophies / totalTrophies);
                } else {
                    return (b.trophies / b.maxTrophies) - (a.trophies / a.maxTrophies);
                }
            }) as game}
                <div class="flex flex-row gap-x-2">
                    <img src={`https://cdn.islandstats.xyz/games/${game.icon}/icon.png`} class="w-8 h-8 self-center" alt="Game Icon" />
                    <div class="group h-6 w-full self-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                        {#if overall}
                            {#if calculatePercentage(game.trophies, totalTrophies) > 5}
                                <div class={`flex flex-col h-full left-0 right-0 rounded-l-full text-center text-neutral-900 ${game.trophies === game.maxTrophies ? "bg-green-500 dark:bg-green-500" : "bg-neutral-400 dark:bg-neutral-100 rounded-l-full"}`} style={`width: calc(100% * ${game.trophies / totalTrophies});`}>
                                    <span>{calculatePercentage(game.trophies, totalTrophies)}%</span>
                                </div>
                            {:else}
                                <div use:tooltip title={`${calculatePercentage(game.trophies, totalTrophies)}%`} class={`flex flex-col h-full left-0 right-0 rounded-l-full text-center text-neutral-900 ${game.trophies === game.maxTrophies ? "bg-green-500 dark:bg-green-500" : "bg-neutral-400 dark:bg-neutral-100"}`} style={`width: calc(100% * ${game.trophies / totalTrophies});`}></div>
                            {/if}
                        {:else}
                            {#if calculatePercentage(game.trophies, game.maxTrophies) > 5}
                                <div class={`flex flex-col h-full left-0 right-0 text-center text-neutral-900 ${game.trophies === game.maxTrophies ? "bg-green-500 dark:bg-green-500 rounded-full" : "bg-neutral-400 dark:bg-neutral-100 rounded-l-full"}`} style={`width: calc(100% * ${game.trophies / game.maxTrophies});`}>
                                    <span>{calculatePercentage(game.trophies, game.maxTrophies)}%</span>
                                </div>
                            {:else}
                                <div use:tooltip title={`${calculatePercentage(game.trophies, game.maxTrophies)}%`} class={`flex flex-col h-full left-0 right-0 rounded-l-full text-center text-neutral-900 ${game.trophies === game.maxTrophies ? "bg-green-500 dark:bg-green-500" : "bg-neutral-400 dark:bg-neutral-100"}`} style={`width: calc(100% * ${game.trophies / game.maxTrophies});`}></div>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        
    </div>
</div>