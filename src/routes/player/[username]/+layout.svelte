<script>
    import Search from "../../../svgs/Search.svelte";
    import Home from "../../../svgs/Home.svelte";
</script>

<main class="mb-auto">
    <header class="flex flex-row bg-red-500">
        <a href="/" class="self-center ml-4 flex flex-row gap-x-2 px-3 py-1 rounded-md bg-slate-100 text-slate-800 hover:bg-slate-300 duration-100">
            <Home />
            <p class="self-center font-semibold">Home</p>
        </a>

        <!-- search -->
        <div class="max-w-sm mx-auto py-3">
            <form method="POST">
                <div class="flex flex-row bg-slate-100 rounded-full px-3 py-2">
                    <span class="px-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </header>

    <slot />
</main>