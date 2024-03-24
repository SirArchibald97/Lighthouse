<script>
    import Search from "../../../svgs/Search.svelte";
    import Home from "../../../svgs/Home.svelte";
</script>

<main>
    <header class="flex flex-row bg-red-500">
        <a href="/" class="self-center flex flex-row items-center ml-2 gap-x-2 px-3 py-1 rounded-md bg-red-900 text-neutral-100 duration-100 hover:scale-105 shadow-xl">
            <Home />
            Home
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