<script>
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8">
    <p class="text-center text-4xl font-semibold my-6 mx-4 sm:mx-44">Leaderboards</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 mx-4 gap-4 md:mx-32">
        <form method="post" action="?/bbleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/battle_box/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Battle Box</p>
            </button>
        </form>

        <form method="post" action="?/sbleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/sky_battle/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Sky Battle</p>
            </button>
        </form>

        <form method="post" action="?/tgttosleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/tgttos/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">TGTTOS</p>
            </button>
        </form>

        <form method="post" action="?/hitwleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/hitw/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Hole in the Wall</p>
            </button>
        </form>

        <form method="post" action="?/dynaballleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/dynaball/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Dynaball</p>
            </button>
        </form>

        <form method="post" action="?/dojoleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/pkw/solo/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Parkour Warrior Dojo</p>
            </button>
        </form>

        <form method="post" action="?/survivorleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/games/pkw/icon.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Parkour Warrior Survivor</p>
            </button>
        </form>

        <form method="post" action="?/miscleaderboards" class="flex flex-col gap-y-3 bg-white rounded-md border-2 border-slate-300 hover:bg-slate-100 hover:scale-105 duration-100">
            <button type="submit" class="flex flex-col gap-y-3 p-4">
                <img src="https://cdn.islandstats.xyz/icons/royal_reputation.png" class="w-16 h-16 self-center" alt="Battle Box Icon" />
                <p class="text-2xl font-semibold self-center ml-2">Miscellaneous</p>
            </button>
        </form>
    </div>
</div>

<Footer absolute={true} />