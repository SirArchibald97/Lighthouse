<script>
    import Search from "$lib/svgs/Search.svelte";
    import Home from "$lib/svgs/Home.svelte";
</script>

<main>
    <div class="flex flex-row justify-between bg-red-500">
        <form method="POST" action="?/home" class="self-center flex-none">
            <button type="submit" class="self-center flex flex-row items-center ml-2 gap-x-2 px-3 py-1 rounded-md bg-red-900 text-neutral-100 duration-100 hover:scale-105 shadow-xl">
                <Home />
                Home
            </button>
        </form>

        <!-- search -->
        <div class="max-w-sm mx-auto py-3 flex-grow flex justify-between">
            <form method="POST" action="?/lookup">
                <div class="flex flex-row bg-slate-100 rounded-full px-3 py-2">
                    <span class="px-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </div>

    <slot />
</main>