<script>
    import Footer from "../../components/Footer.svelte";
    import BattleBox from "../../components/leaderboards/BattleBox.svelte";
    import SkyBattle from "../../components/leaderboards/SkyBattle.svelte";
    import Tgttos from "../../components/leaderboards/Tgttos.svelte";
    import Hitw from "../../components/leaderboards/Hitw.svelte";
    import Dynaball from "../../components/leaderboards/Dynaball.svelte";
    import Dojo from "../../components/leaderboards/Dojo.svelte";
    import Survivor from "../../components/leaderboards/Survivor.svelte";

    export let data;
    let players = data.players.filter(p => p.player.statistics);

    let game = null;
    function setGame(newGame) { game = newGame; }
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8">
    <div class="flex flex-row justify-between my-6 mx-4 sm:mx-44">
        {#if game}<button on:click={() => setGame(null)} class="flex-none px-3 border-2 border-slate-300 py-1 bg-white rounded-md hover:bg-slate-100 hover:scale-105 duration-100">Go Back</button>{/if}
        <p class="flex-grow text-center text-4xl font-bold">Leaderboards</p>
    </div>
    
    {#if !game}
        <div class="grid grid-cols-1 md:grid-cols-3 mx-4 gap-4 md:mx-32">
            <button on:click={() => setGame("bb")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/battle_box/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Battle Box</p>
            </button>

            <button on:click={() => setGame("sb")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/sky_battle/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Sky Battle</p>
            </button>

            <button on:click={() => setGame("tgttos")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/tgttos/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">TGTTOS</p>
            </button>

            <button on:click={() => setGame("hitw")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/hitw/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Hole in the Wall</p>
            </button>

            <button on:click={() => setGame("db")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/dynaball/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Dynaball</p>
            </button>

            <button on:click={() => setGame("dojo")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/pkw/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Parkour Warrior Dojo</p>
            </button>

            <button on:click={() => setGame("survivor")} class="flex flex-col gap-y-3 bg-white p-4 rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
                <img src="https://cdn.islandstats.xyz/games/pkw/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Parkour Warrior Survivor</p>
            </button>
        </div>
    {:else}
        {#if game === "bb"}
            <BattleBox players={players} />

        {:else if game === "sb"}
            <SkyBattle players={players} />

        {:else if game === "tgttos"}
            <Tgttos players={players} />

        {:else if game === "hitw"}
            <Hitw players={players} />

        {:else if game === "db"}
            <Dynaball players={players} />

        {:else if game === "dojo"}
            <Dojo players={players} />

        {:else if game === "survivor"}
            <Survivor players={players} />

        {/if}
    {/if}
</div>

<Footer data={game ? null : undefined} />