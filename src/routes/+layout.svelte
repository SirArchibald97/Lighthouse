<script>
    import "../app.css";
    import Search from "../svgs/Search.svelte";
</script>

<main class="bg-slate-200">
    <header class="bg-red-500">
        <!-- search -->
        <div class="max-w-sm mx-auto py-3">
            <form method="POST">
                <div class="flex flex-row bg-slate-100 rounded-full px-3 py-1">
                    <span class="px-2"><Search /></span>
                    <input class="bg-slate-100 focus:outline-none" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </header>

    <slot />

    <footer class="bg-red-500 p-4 mx-auto">
        <div>
            <p class="text-center text-slate-100">© 2024 SirArchibald • Not affiliated with Minecraft or Noxcrew!</p>
        </div>
    </footer>
</main>