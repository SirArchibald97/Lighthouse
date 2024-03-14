<script>
    import { page } from "$app/stores";
</script>

<head>
    <title>Oops, something went wrong!</title>
</head>
<main class="flex flex-col justify-center bg-red-500 text-slate-50 text-center h-dvh">
    <div class="flex flex-col self-center">
        <p class="text-5xl font-bold">Sorry about this!</p>
        <p class="text-2xl font-semibold mt-4">Something went wrong whilst doing that, try refreshing the page!</p>
        <a href="/" class="text-lg mt-12 bg-slate-200 hover:bg-slate-300 duration-100 text-slate-700 py-1 px-3 rounded-md">Return home</a>
    </div>
</main>