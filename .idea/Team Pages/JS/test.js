players_data(39, 2021)
    .then((players) => {
        console.log(players);
    });

async function call_api(endpoint, params = {}) {
    let parameters = '';
    if (Object.keys(params).length > 0) {
        parameters = '?' + new URLSearchParams(params);
    }

    const response = await fetch(`https://v3.football.api-sports.io/${endpoint}${parameters}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'aefedc74219709b46c5b8bcded1a0d04'
        }
    });

    const data = await response.json();
    return data;
}

async function players_data (league, season, page = 3, players_data = []) {
    const players = await call_api('players', { league, season, page });
    players_data.push(...players.response);

    if (players.paging.current < players.paging.total) {
        const nextPage = players.paging.current + 1;
        if (nextPage % 2 === 1){
            await new Promise(resolve => setTimeout(resolve, 1000));
    }
        players_data = await players_data(league, season, nextPage, players_data);
    }
    return players_data;
}

// Get all the teams from this competition
//call_api('teams', { league: 39, season: 2021 })
    //.then((teams) => {
        //console.log(teams);
    //});

