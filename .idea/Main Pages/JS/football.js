let teamInfo = {
    fetchInfo: function (nameofteam) {
        fetch("https://v3.football.api-sports.io/teams?name=" + nameofteam , {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayInfo(data))
            .catch(error => console.log('error', error));

    },
    displayInfo: function (data) {
        const teamresp = data['response']
        const {name, logo, id, country} = teamresp[0]['team'];
        console.log(name, logo, id, country)
        document.querySelector(".team_name").innerText = name
        document.querySelector(".team_icon").src = logo;
    },
    search: function () {
        this.fetchInfo(document.querySelector(".search-bar").value);
    },
};


document.querySelector(".search button").addEventListener("click", function () {
    teamInfo.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key === "Enter") {
        teamInfo.search();
    }
});

let detailedteamInfo = {
    fetchdetailedteamInfo: function () {
        fetch(`https://v3.football.api-sports.io/standings?league=39&team=${id}&season=2023`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displaydetailedInfo(data))
            .catch(error => console.log('error', error));
    },
    displaydetailedInfo: function (data) {
        const stanresp = data['response'];
        const league = stanresp[0]['league']
        const standings = league['standings']
        const {rank, points} = standings[0][0]
        console.log(rank, points);
    },
};

