


//Function to get access token from API
async function getAccessToken(code) {
    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code,
        }),

    })
    console.log(code)
    console.log('***getAccessToken()***')
    const data = await res.text();
    const params = new URLSearchParams(data);
    return params.get("access_token");
}