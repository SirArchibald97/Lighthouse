<script>
    import Search from "../svgs/Search.svelte";
    import Star from "../svgs/Star.svelte";

    export let data;
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

            <a href={`/player/SirArchibald97`} class="bg-white border-2 border-slate-200 rounded-lg p-4 hover:bg-slate-100 duration-100">
                <div class="flex flex-col justify-center items-center gap-y-3">
                    <img class="rounded-md" src={`https://crafatar.com/avatars/19f9fd28-558c-4959-98c2-fb1a18bed0a1?overlay`} alt={`SirArchibald97's Profile'`} />
                    <p class="text-slate-700 text-center text-lg font-semibold self-center">SirArchibald97</p>
                </div>
            </a>
            {#each data.topRequests as profile}
                <a href={`/player/${profile.username}`} class="bg-white border-2 border-slate-200 rounded-lg p-4 hover:bg-slate-100 duration-100">
                    <div class="flex flex-col justify-center items-center gap-y-3">
                        <img class="rounded-md" src={`https://crafatar.com/avatars/${profile.uuid}?overlay`} alt={`${profile.username}'s Profile'`} />
                        <p class="text-slate-700 text-center text-lg font-semibold self-center">{profile.username}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</main>