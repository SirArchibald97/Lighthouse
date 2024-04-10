<script>
    import { getRankIcon } from "$lib/utils.js";
    import DoubleDownArrow from "$lib/svgs/DoubleDownArrow.svelte";

    export let players;

    let sort = "faction_total_xp";
    function toggleSort(stat) { sort = stat }

    let username = "";
    let limit = 10;
    function increaseLimit() { limit += 10; }

    function sortPlayers(stat) {
        return players.sort((a, b) => {
            if (!a.player.statistics[stat]) {
                if (stat === "royal_rep") {
                    return b.player.collections?.currency.royalReputation - a.player.collections?.currency.royalReputation; 
                }
            } else {
                return b.player.statistics[stat] - a.player.statistics[stat];
            }
        });
    }

    function sortRoyalRep() {
        return players.filter(p => p.player.collections).sort((a, b) => b.player.collections.currency.royalReputation - a.player.collections.currency.royalReputation);
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
                <img src={`https://cdn.islandstats.xyz/icons/royal_reputation.png`} class="w-8 h-8 self-center" alt={`Battle Box Icon`} />
                <p class="text-2xl font-semibold self-center ml-2">Miscellaneous</p>
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
                        <td><button class={`${sort === "faction_total_xp" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("faction_total_xp")}>Total XP</button></td>
                        <td><button class={`${sort === "faction_game_xp" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("faction_game_xp")}>Game XP</button></td>
                        <td><button class={`${sort === "faction_quest_xp" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("faction_quest_xp")}>Quest XP</button></td>
                        <td><button class={`${sort === "royal_rep" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("royal_rep")}>Royal Reputation</button></td>
                        <td><button class={`${sort === "community_contribution" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("community_contribution")}>PKW Contributions</button></td>
                    </tr>
                </thead>
                <tbody>
                    {#each (sort === "royal_rep" ? 
                        (username.length === 0 ? sortRoyalRep().slice(0, limit) : sortRoyalRep().filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).slice(0, limit)) :
                        (username.length === 0 ? sortPlayers(sort).slice(0, limit) : sortPlayers(sort).filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).slice(0, limit))
                    ) as player}
                        <tr>
                            <td>{sort === "royal_rep" ? sortRoyalRep().indexOf(sortRoyalRep().find(p => p.player.username === player.player.username)) + 1 : sortPlayers(sort).indexOf(sortPlayers(sort).find(p => p.player.username === player.player.username)) + 1}</td> 
                            <td class="flex flex-row">
                                <img class="w-6 h-6 rounded-sm self-center bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={getRankIcon(player.player.ranks)} />
                                <span class="self-center ml-2">{player.player.username}</span>
                            </td>
                            <td>{player.player.statistics?.faction_total_xp.toLocaleString()}</td>
                            <td>{player.player.statistics?.faction_game_xp.toLocaleString()}</td>
                            <td>{player.player.statistics?.faction_quest_xp.toLocaleString()}</td>
                            <td>{player.player.collections?.currency.royalReputation.toLocaleString() || "Unknown" }</td>
                            <td>{player.player.statistics?.community_contribution.toLocaleString()}</td>
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