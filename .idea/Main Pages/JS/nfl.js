let Data = {
    fetchData: function (nameofteam) {
        fetch("https://v1.american-football.api-sports.io/teams?name=" + nameofteam , {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.american-football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayData(data))
            .catch(error => console.log('error', error));

    },
    displayData: function (data) {
        const test = data['response']
        const {name, logo, id, country} = test[0];
        console.log(name, logo, id, country)
        document.querySelector(".team_name").innerText = name
        //document.querySelector(".team_icon").src = logo;
    },
    search: function () {
        this.fetchData(document.querySelector(".search-bar").value);
    },
};


document.querySelector(".search button").addEventListener("click", function () {
    Data.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key === "Enter") {
        Data.search();
    }
});

let detailedteamInfo = {
    fetchdetailedteamInfo: function () {
        fetch(`https://v1.american-football.api-sports.io/standings?league=1&team=${id}&season=2022`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.american-football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displaydetailedInfo(data))
            .catch(error => console.log('error', error));
    },
    displaydetailedInfo: function (data) {
        let stanresp = data['response'];
        let league = stanresp[0]['league']
        let standings = league['standings']
        let {rank, points, group, form,} = standings[0][0]
        console.log(rank, points, group, form);
    },
};
