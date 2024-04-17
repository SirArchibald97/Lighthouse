<script>
    export let absolute;
</script>

<footer class={`w-full bg-red-500 p-4 ${absolute ? "lg:absolute lg:bottom-0" : "relative"}`}>
    <p class="text-center text-slate-100">
        © 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> 
        • Not affiliated with Minecraft or Noxcrew!
    </p>
</footer>