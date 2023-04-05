let id = 50
//declaring the variable "id" outside of every function to make it a global function, 50 is just a placeholder value
let teamInfo = {
//declaring the main function that everything falls under
    fetchInfo: function (nameofteam) {
        //declaring the first function to fetch the basic info of the team, it takes in nameofteam which is what the user puts into the search bar
        fetch("https://v3.football.api-sports.io/teams?name=" + nameofteam , {
            //calling the api, the last part of the link is replaced with the variable nameofteam
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayInfo(data))
            //calling the next function to display all the data called
            .catch(error => alert(error))
            //showing the error in the web browser itself
    },
    displayInfo: function (data) {
        //declaring the next function to display all the data called, it takes in the parameter data which is the api's response from the last function
        let teamresp = data['response']
        //declaring the actual data part of the response as a variable so I can easily call it
        //the response has alot of technincal things in it like errors and page numbers so its good to distinguish the actual data
        let {name, logo, country} = teamresp[0]['team'];
        //getting the data from the nested arrays, as "name" "logo" and "country" are all located at the coordinates I called
        id = teamresp[0]['team']['id']
        //id is located in the same place as the other arrays, however I have to call it differently
        // I cannot use let {} as it does not change the actual variable "id", so I call it like this to be able to use it in the global function
        let {address, image} = teamresp[0]['venue'];
        //getting the data from a different nested array
        console.log(name, logo, id, country)
        document.querySelector(".team_name").innerText = name
        //selecting the team_name element and setting it to the name variable from the API response
        document.querySelector(".team_icon").src = logo
        //selecting the team_icon element and setting it to the logo variable from the API response
        document.body.style.backgroundImage = "url("+image+")"
        //selecting the background property from the CSS and replacing the URL with the stadium's image URL from the API response
        document.querySelector(".stats").classList.remove("loading");
        //selecting the HTML element name stats loading and removing the loading part
        //this makes the text change fron what is in the "stats loading" element to just the "stats" element
        detailedteamInfo.fetchdetailedteamInfo();
        //calling the next function to call a different endpoint of the API
        teamStats.fetchTeamStats()
        //calling another function to call a different endpoint of the API

    },
    search: function () {
        this.fetchInfo(document.querySelector(".search-bar").value);
    },
};


document.querySelector(".search button").addEventListener("click", function () {
    //adds a function to call the search function if the search button is clicked
    teamInfo.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    //adds a function to call the search function if the enter button is clicked
    if(event.key === "Enter") {
        teamInfo.search();
    }
});

let detailedteamInfo = {
    //declaring the function to call the another endpoint of the API
    fetchdetailedteamInfo: function () {
        fetch(`https://v3.football.api-sports.io/standings?league=39&team=${id}&season=2022`, {
            //changing the link and adding the id variable to dynamically change the link
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displaydetailedInfo(data))
            //calling the next function
            .catch(error => console.log('error', error));
    },
    displaydetailedInfo: function (data) {
        //declaring the next function to display all the data called, it takes in the parameter data which is the api's response from the last function
        let stanresp = data['response'];
        //declaring the actual data part of the response as a variable so I can easily call it
        //the response has alot of technincal things in it like errors and page numbers so its good to distinguish the actual data
        let league = stanresp[0]['league']
        //the response is split in two halves so to call data from the API it is easier to split it in two
        //declaring one half of the response to variable to call it easier
        let standings = league['standings']
        //this response is also split in two halves so I have to do the same thing as last time
        let {rank, points, group, form, goalsDiff} = standings[0][0]
        //getting the data from the nested arrays, as everything is located at the coordinates I called
        document.getElementById("games_text").innerHTML = form;
        //selecting the text for the stats in the HTML and setting it to the variable "form"
        document.getElementById("pos_text").innerHTML = points;
        //selecting the text for the stats in the HTML and setting it to the variable "points"
        document.getElementById("goaldiff_text").innerHTML = goalsDiff;
        //selecting the text for the stats in the HTML and setting it to the variable "goalsDiff"
        document.getElementById("rank_text").innerHTML = rank;
        //selecting the text for the stats in the HTML and setting it to the variable "rank"
        console.log(standings, rank, points, group, form, goalsDiff);
    },
};
let teamStats = {
    //declaring the function to call the another endpoint of the API
    fetchTeamStats: function () {
        fetch(`https://v3.football.api-sports.io/teams/statistics?league=39&team=${id}&season=2022`, {
            //changing the link and adding the id variable to dynamically change the link
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayteamStats(data))
            //calling the next function
            .catch(error => console.log('error', error));
    },
    displayteamStats: function (data) {
        //declaring the next function to display all the data called, it takes in the parameter data which is the api's response from the last function
        let teamresp = data['response']
        //declaring the actual data part of the response as a variable so I can easily call it
        //the response has alot of technincal things in it like errors and page numbers so its good to distinguish the actual data
        let {home, away, total} = teamresp['fixtures']['played']
        //getting the data from the nested arrays, as everything is located at the coordinates I called
        document.getElementById("home_text").innerHTML = home;
        //selecting the text for the game stats in the HTML and setting it to the variable "home"
        document.getElementById("away_text").innerHTML = away;
        //selecting the text for the game stats in the HTML and setting it to the variable "away"
        document.getElementById("played_text").innerHTML = total;
        //selecting the text for the stats in the HTML and setting it to the variable "total"
    },
};

teamInfo.fetchInfo("Chelsea")
//calling the main function with the nameofteam set to "Chelsea"
