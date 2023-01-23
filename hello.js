let Data = {
    fetchData: function () {
        fetch("https://v3.football.api-sports.io/teams?id=33", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayData(data))
            .catch(error => console.log('error', error));

    },
    displayData: function (data) {
        const test = data['response']
        const {name, logo, country} = test[0]['team'];
        console.log(name, logo, country)
        document.querySelector(".team_name").innerText = name
        //document.querySelector(".team_icon").src = logo;
    }
};



