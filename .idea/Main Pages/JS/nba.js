let name = "Orlando Magic"
var modalBtn = document.querySelector('.modal-btn')
var modalBg = document.querySelector('.modal-bg')
var modalClose = document.querySelector('.modal-close')

modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active');
});
modalClose.addEventListener('click', function (){
    modalBg.classList.remove('bg-active')
});
let id = 50
let Data = {
    fetchData: function (nameofteam) {
        fetch("https://v1.basketball.api-sports.io/teams?name=" + nameofteam , {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.basketball.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayData(data))
            .catch(error => console.log('error', error));
        detailedteamInfo.fetchdetailedteamInfo();

    },
    displayData: function (data) {
        let teamresp = data['response']
        let {name, logo} = teamresp[0];
        id = teamresp[0]['id']
        name = teamresp[0]['name']
        console.log(name, logo, id)
        document.getElementById("teamname").innerHTML = name;
        document.querySelector(".team_name").innerText = name;
        document.querySelector(".team_icon").src = logo;

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
        fetch(`https://v1.basketball.api-sports.io/standings?league=12&team=${id}&season=2019-2020`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.basketball.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displaydetailedInfo(data))
            .catch(error => console.log('error', error));
    },
    displaydetailedInfo: function (data) {
        let stanresp = data['response'];
        let {position, form, stage} = stanresp[0][0]
        console.log(stanresp, position, form, stage);
        document.getElementById("games_text").innerHTML = form;
        document.getElementById("pos_text").innerHTML = position;
    },
};
