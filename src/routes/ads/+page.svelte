<script>
    import Ad from "$lib/components/Ad.svelte";
</script>

<svelte:head>

</svelte:head>
<div class="flex-1">
    <p class="text-center text-neutral-900 dark:text-neutral-100 text-2xl mb-4">If you found this page, you get a cookie :3</p>
    <div class="grid grid-cols-3 gap-4">
        {#each Array.from({ length: 12 }) as _}
            <div class="col-span-1">
                <Ad>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5229589229491714" crossorigin="anonymous"></script>
                    <!-- Ads Page -->
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-5229589229491714"
                        data-ad-slot="6069274509"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </Ad>
            </div>
        {/each}
    </div>
</div>