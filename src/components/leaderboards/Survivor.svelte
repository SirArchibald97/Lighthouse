<script>
    import { getRankIcon } from "$lib/utils.js";
    import DoubleDownArrow from "$lib/svgs/DoubleDownArrow.svelte";

    export let players;

    let sort = "wins";
    function toggleSort(stat) { sort = stat }

    let username = "";
    let limit = 10;
    function increaseLimit() { limit += 10; }

    function sortPlayers(stat) {
        return players.sort((a, b) => {
            if (!a.player.statistics.pkw.survivor[stat]) {
                if (stat === "losses")
                    return (b.player.statistics.pkw.survivor.games_played - b.player.statistics.pkw.survivor.wins) - (a.player.statistics.pkw.survivor.games_played - a.player.statistics.pkw.survivor.wins);
                else if (stat === "wlr")
                    return (b.player.statistics.pkw.survivor.wins / (b.player.statistics.pkw.survivor.games_played - b.player.statistics.pkw.survivor.wins)) - (a.player.statistics.pkw.survivor.wins / (a.player.statistics.pkw.survivor.games_played - a.player.statistics.pkw.survivor.wins));
                
            } else {
                return b.player.statistics.pkw.survivor[stat] - a.player.statistics.pkw.survivor[stat];
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
        <div class="flex flex-row justify-between">
            <div class="flex flex-row mb-4 justify-center">
                <img src={`https://cdn.islandstats.xyz/games/pkw/icon.png`} class="w-8 h-8 self-center" alt={`Battle Box Icon`} />
                <p class="text-2xl font-semibold self-center ml-2">Parkour Warrior Survivor</p>
            </div>
            <div>
                <input bind:value={username} type="text" name="username" placeholder="Username" class="border-slate-300 border-2 rounded-md px-1" />
            </div>
        </div>
        
        <div class="flex flex-col gap-y-2 justify-center">
            <table class="table-auto border-separate border-spacing-y-3 border-spacing-x-10 text-xl">
                <thead>
                    <tr class="font-semibold">
                        <td>#</td>
                        <td>Player</td>
                        <td><button class={`${sort === "wins" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("wins")}>Wins</button></td>
                        <td><button class={`${sort === "losses" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("losses")}>Losses</button></td>
                        <td><button class={`${sort === "wlr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("wlr")}>WLR</button></td>
                        <td><button class={`${sort === "kills" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kills")}>Players Outlived</button></td>
                        <td><button class={`${sort === "obstacles" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("obstacles")}>Obstacles Completed</button></td>
                    </tr>
                </thead>
                <tbody>
                    {#each (username.length === 0 ? sortPlayers(sort).slice(0, limit) : sortPlayers(sort).filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).slice(0, limit)) as player}
                        <tr>
                            <td>{sortPlayers(sort).indexOf(sortPlayers(sort).find(p => p.player.username === player.player.username)) + 1}</td> 
                            <td class="flex flex-row">
                                <img class="w-6 h-6 rounded-sm self-center bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={getRankIcon(player.player.ranks)} />
                                <span class="self-center ml-2">{player.player.username}</span>
                            </td>
                            <td>{player.player.statistics?.pkw.survivor.wins.toLocaleString()}</td>
                            <td>{(player.player.statistics?.pkw.survivor.games_played - player.player.statistics?.pkw.survivor.wins).toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.pkw.survivor.wins / (player.player.statistics?.pkw.survivor.games_played - player.player.statistics?.pkw.survivor.wins)) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.pkw.survivor.kills.toLocaleString()}</td>
                            <td>{player.player.statistics?.pkw.survivor.obstacles.toLocaleString()}</td>
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