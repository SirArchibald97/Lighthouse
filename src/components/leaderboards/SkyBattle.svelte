<script>
    import { getRankIcon } from "$lib/utils.js";
    import DoubleDownArrow from "$lib/svgs/DoubleDownArrow.svelte";

    export let players;

    let sort = "solo_first_place";
    function toggleSort(stat) { sort = stat }

    let limit = 10;
    function increaseLimit() {
        limit += 10;
    }

    function sortPlayers(stat) {
        return players.sort((a, b) => {
            if (!a.player.statistics.sky_battle.quads[stat]) {
                if (stat === "wlr")
                    return (b.player.statistics.sky_battle.quads.solo_first_place / (b.player.statistics.sky_battle.quads.games_played - b.player.statistics.sky_battle.quads.solo_first_place)) - (a.player.statistics.sky_battle.quads.solo_first_place / (a.player.statistics.sky_battle.quads.games_played - a.player.statistics.sky_battle.quads.solo_first_place));
                else if (stat === "kdr")
                    return (b.player.statistics.sky_battle.quads.kills / b.player.statistics.sky_battle.quads.deaths) - (a.player.statistics.sky_battle.quads.kills / a.player.statistics.sky_battle.quads.deaths);
                else if (stat === "losses") 
                    return (b.player.statistics.sky_battle.quads.games_played - b.player.statistics.sky_battle.quads.solo_first_place) - (a.player.statistics.sky_battle.quads.games_played - a.player.statistics.sky_battle.quads.solo_first_place);

            } else {
                return b.player.statistics.sky_battle.quads[stat] - a.player.statistics.sky_battle.quads[stat];
            }
        });
    }
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8">    
    <div class="bg-slate-100 rounded-sm border-l-4 border-red-500 mx-4 sm:mx-24 px-4 py-4">
        <div class="flex flex-row mb-4 justify-center">
            <img src={`https://cdn.islandstats.xyz/games/sky_battle/icon.png`} class="w-8 h-8 self-center" alt={`Sky Battle Icon`} />
            <p class="text-2xl font-semibold self-center ml-2">Sky Battle</p>
        </div>
        
        <div class="flex flex-col gap-y-2 justify-center">
            <table class="table-auto border-separate border-spacing-y-3 border-spacing-x-10 text-xl">
                <thead>
                    <tr class="font-semibold">
                        <td>#</td>
                        <td>Player</td>
                        <td><button class={`${sort === "solo_first_place" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("solo_first_place")}>Wins</button></td>
                        <td><button class={`${sort === "losses" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("losses")}>Losses</button></td>
                        <td><button class={`${sort === "wlr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("wlr")}>WLR</button></td>
                        <td><button class={`${sort === "kills" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kills")}>Kills</button></td>
                        <td><button class={`${sort === "deaths" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("deaths")}>Deaths</button></td>
                        <td><button class={`${sort === "kdr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kdr")}>KDR</button></td>
                        <td><button class={`${sort === "team_first_place" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("team_first_place")}>Team Wins</button></td>
                    </tr>
                </thead>
                <tbody>
                    {#each sortPlayers(sort).slice(0, limit) as player, count}
                        <tr>
                            <td>{count + 1}</td> 
                            <td class="flex flex-row">
                                <img class="w-6 h-6 rounded-sm self-center" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={getRankIcon(player.player.ranks)} />
                                <span class="self-center ml-2">{player.player.username}</span>
                            </td>
                            <td>{player.player.statistics?.sky_battle.quads.solo_first_place.toLocaleString()}</td>
                            <td>{(player.player.statistics?.sky_battle.quads.games_played - player.player.statistics?.sky_battle.quads.solo_first_place).toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.sky_battle.quads.solo_first_place / (player.player.statistics?.sky_battle.quads.games_played - player.player.statistics?.sky_battle.quads.solo_first_place)) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.sky_battle.quads.kills.toLocaleString()}</td>
                            <td>{player.player.statistics?.sky_battle.quads.deaths.toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.sky_battle.quads.kills / player.player.statistics?.sky_battle.quads.deaths) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.sky_battle.quads.team_first_place.toLocaleString()}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <button class="flex flex-row gap-x-1 place-self-center px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 duration-100" on:click={increaseLimit}>
                <span class="w-6 h-6 self-center"><DoubleDownArrow /></span>
                <span class="self-center">See more</span>
            </button>
        </div>
    </div>
</div>