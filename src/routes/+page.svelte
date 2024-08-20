<script>
    import Favourites from "$lib/components/Favourites.svelte";
    import Features from "$lib/components/Features.svelte";

    export let data;
    export let form;
</script>

<svelte:head>
    <title>Lighthouse by SirArchibald</title>
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />
    <meta name="description" content="MCC Island Stats by SirArchibald! Lookup any player to view their game stats, currency, socials and more!" />

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5229589229491714" crossorigin="anonymous"></script>
</svelte:head>
<div>
    <Favourites {data} {form} />
    
    <Features />
</div>