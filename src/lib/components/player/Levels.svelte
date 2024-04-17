<script>
    import { calculateProgress, getNextLevel } from "$lib/levels.js";
    import tooltip from "$lib/tooltip.js";

    export let data;
</script>

<div>
    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
        <!-- LEVELS -->
        <p class="text-3xl font-bold">Trophies</p>

        <p class="mt-4 mb-2 flex flex-row gap-x-1">
            <span class="text-xl font-semibold self-center">Crown Level</span>
            <span class="text-md font-normal self-center">({(data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained).toLocaleString()}/{getNextLevel(data.player.crownLevel.level, data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained).toLocaleString()})</span>
        </p>
        <div class="flex flex-row gap-x-3 mb-4 text-lg">
            <!--<img src={``} alt={``} class="w-8 h-8 self-center" />-->
            <span class="self-center">{data.player.crownLevel.level}</span>

            <!-- progress bar -->
            <div class="h-6 w-3/5 self-center rounded-md bg-slate-200 transition-all duration-500">
                <div
                    class="flex flex-col h-full left-0 right-0 rounded-md text-center transition-all duration-500 group"
                    style={`width: calc(100% * ${calculateProgress(data.player.crownLevel.level)}); background-color: red`}
                >
                </div>
            </div>

            <span class="self-center">{data.player.crownLevel.level + 1}</span>
        </div>



        <!-- TROPHIES -->
        <div class="flex flex-row sm:gap-1 my-1">
            <!--<img src="https://cdn.islandstats.xyz/icons/trophy.png" class="w-6 h-6 self-center" alt="Total Trophies" />-->
            <span class="text-lg ml-1 sm:ml-0">Total Trophies: 
                <span class="font-semibold">
                    {(data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained).toLocaleString()}
                </span>
                <span class="text-sm">
                    /{(data.player.crownLevel.style_trophies.obtainable + data.player.crownLevel.skill_trophies.obtainable).toLocaleString()}
                </span>
            </span>
        </div>
        <div class="flex flex-row sm:gap-1 my-1">
            <!--<img src="https://cdn.islandstats.xyz/icons/trophy.png" class="w-6 h-6 self-center" alt="Skill Trophies" />-->
            <span class="text-lg ml-1 sm:ml-0">Skill Trophies: 
                <span class="font-semibold" use:tooltip title={`${data.player.crownLevel.skill_trophies.bonus} Bonus Trophies`}>
                    {data.player.crownLevel.skill_trophies.obtained.toLocaleString()}
                </span>
                <span class="text-sm">
                    /{data.player.crownLevel.skill_trophies.obtainable.toLocaleString()}
                </span>
            </span>
        </div>
        <div class="flex flex-row sm:gap-1 my-1">
            <!--<img src="https://cdn.islandstats.xyz/icons/trophy.png" class="w-6 h-6 self-center" alt="Style Trophies" />-->
            <span class="text-lg ml-1 sm:ml-0">Style Trophies: 
                <span class="font-semibold" use:tooltip title={`${data.player.crownLevel.style_trophies.bonus} Bonus Trophies`}>
                    {data.player.crownLevel.style_trophies.obtained.toLocaleString()}
                </span>
                <span class="text-sm">
                    /{data.player.crownLevel.style_trophies.obtainable.toLocaleString()}
                </span>
            </span>
        </div>
        <div class="flex flex-row sm:gap-1 my-1">
            <!--<img src="https://cdn.islandstats.xyz/icons/trophy.png" class="w-6 h-6 self-center" alt="Style Trophies" />-->
            <span class="text-lg ml-1 sm:ml-0">Bonus Trophies: 
                <span class="font-semibold">{(data.player.crownLevel.style_trophies.bonus + data.player.crownLevel.skill_trophies.bonus).toLocaleString()}</span>
            </span>
        </div>



        <!-- FACTIONS-->
        <p class="text-3xl font-bold mt-6">Factions</p>
        <p class="text-lg">Faction levels coming soon!</p>
    </div>
</div>