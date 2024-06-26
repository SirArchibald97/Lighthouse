import { redirect } from '@sveltejs/kit';

export async function load({ url, cookies }) {
    const access_token = url.searchParams.get("code");
    const xbox_auth = await fetch("https://user.auth.xboxlive.com/user/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", Accept: "application/json"
        },
        body: JSON.stringify({
            Properties: {
                AuthMethod: "RPS",
                SiteName: "user.auth.xboxlive.com",
                RpsTicket: `d=${access_token}` // your access token from the previous step here
            },
            RelyingParty: "http://auth.xboxlive.com",
            TokenType: "JWT"
        }),
    });
    const json = await xbox_auth.json();
    console.log(json);

    throw redirect(301, "/");
} 