<script>
    import Search from "../svgs/Search.svelte";
    import Star from "../svgs/Star.svelte";

    const featured = [
        { uuid: "19f9fd28-558c-4959-98c2-fb1a18bed0a1", username: "SirArchibald97", rank: "moderator" },
        { uuid: "3e7a89ee-c4e2-4392-a317-444b861b0794", username: "Noxite", rank: "noxcrew" },
        { uuid: "1f085b2d-9548-4159-a8c7-f3ccdf0c2054", username: "Kezz101", rank: "noxcrew" },
        { uuid: "fd359352-6178-4859-ab81-6cdd02056672", username: "xViiRuS", rank: "champ" },
        { uuid: "db6f2b90-762c-4ec9-82b1-9a2392cf409a", username: "Centranos", rank: "moderator" },
    ];
</script>

<head>
    <title>MCC Island Stats by SirArchibald</title>
</head>
<main>
    <div class="flex flex-col items-center px-4 sm:px-24 py-32 bg-red-500">
        <p class="text-slate-100 text-6xl font-bold text-center">MCC Island Stats</p>
        <p class="text-slate-100 text-xl mt-2">by SirArchibald</p>

        <!-- search -->
        <div class="px-12 py-5">
            <form method="POST">
                <div class="flex flex-row bg-slate-100 rounded-lg px-3 py-3">
                    <span class="pr-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </div>

    <!-- main -->
    <div class="mx-4 sm:mx-96 my-12">
        <p class="text-slate-700 text-3xl text-center mb-8 font-semibold">Featured Profiles</p>
        <div class="grid grid-cols-3 gap-6">

            <div class="flex flex-col justify-center items-center bg-white border-2 border-slate-200 rounded-lg p-4 hover:bg-slate-100 duration-100">
                <div class="flex flex-row gap-x-1">
                    <span class="self-center w-6 h-6"><Star /></span>
                    <p class="text-2xl font-semibold">Favourites</p>
                </div>
                <p class="text-xl">Coming Soon</p>
            </div>
            {#each featured as profile}
                <a href={`/player/${profile.username}`} class="bg-white border-2 border-slate-200 rounded-lg p-4 hover:bg-slate-100 duration-100">
                    <div class="flex flex-col justify-center items-center">
                        <img class="rounded-md" src={`https://crafatar.com/avatars/${profile.uuid}?overlay`} alt={`${profile.username}'s Profile'`} />
                        <div class="flex flex-row justify-center gap-x-2 mt-3">
                            <img class="h-8 w-8 rounded-md" src={`https://cdn.islandstats.xyz/ranks/${profile.rank}.png`} alt={`${profile.username}'s Rank'`} />
                            <p class="text-slate-700 text-center text-lg font-semibold self-center">{profile.username}</p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</main>