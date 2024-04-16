<script>
    import Search from "$lib/svgs/Search.svelte";
    import Home from "$lib/svgs/Home.svelte";
    import Compare from "$lib/svgs/Compare.svelte";
</script>

<main>
    <header class="flex flex-row bg-red-500">
        <form method="POST" action="?/home" class="self-center">
            <button type="submit" class="flex flex-row items-center ml-2 gap-x-2 px-3 py-1 rounded-md bg-red-900 text-neutral-100 duration-100 hover:scale-105 shadow-xl">
                <Home />
                Home
            </button>
        </form>

        <form method="POST" action="?/compare" class="self-center">
            <button type="submit" class="flex flex-row items-center ml-2 gap-x-2 px-3 py-1 rounded-md bg-red-900 text-neutral-100 duration-100 hover:scale-105 shadow-xl">
                <span class="w-8 h-8"><Compare /></span>
                Compare
            </button>
        </form>

        <!-- search -->
        <div class="max-w-sm mx-auto py-3 align-center">
            <form method="POST" action="?/lookup">
                <div class="flex flex-row bg-slate-100 rounded-full px-3 py-2">
                    <span class="px-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </header>

    <slot />
</main>