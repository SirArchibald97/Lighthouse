<script>
    import Footer from "../../../components/Footer.svelte";
    import SurvivorLeaderboards from "../../../components/leaderboards/SurvivorLeaderboards.svelte";

    export let data;
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="flex flex-row justify-between mt-6 mx-4 sm:mx-44">
        <a href="/leaderboards" class="flex-none px-3 border-2 border-slate-300 py-1 bg-white rounded-md hover:bg-slate-100 hover:scale-105 duration-100 self-center">Go Back</a>
        <div class="flex flex-row gap-x-2 self-center flex-grow justify-center">
            <img src="https://cdn.islandstats.xyz/games/pkw/icon.png" alt="Dynaball Logo" class="w-12 h-12 self-center" />
            <p class="text-center text-3xl font-semibold self-center">Parkour Warrior Survivor Leaderboards</p>
        </div>
    </div>

    <SurvivorLeaderboards players={data.players} />
</div>

<Footer absolute={false} />