document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();
    connexion.requeteDernierFilm();
});

class MovieDB {
    constructor() {
        this.apiKey = "c22d26aa714c5e45d8d87a44214e6ff0";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;
    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        requete.open("GET", this.baseUrl + "movie/now_playing?api_key=" + this.apiKey + "&language=" + this.lang + "&page=1");
        requete.send();
    }

    retourDernierFilm(event) {
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data) {
        let section = document.querySelector(".liste-films");
        for (var x1 = 0; x1 < this.totalFilm; x1++) {
            let article = document.querySelector(".template .film").cloneNode(true);
            article.querySelector("h2").innerHTML = data[x1].title;
            /*if (data[x1].overview != "") {
                article.querySelector(".description").innerHTML = data[x1].overview;
            } else {
                article.querySelector(".description").innerHTML = "Aucune description disponible.";
            }*/
            article.querySelector(".description").innerHTML = data[x1].overview || "Aucune description disponible." //5 lignes précédentes en une
            let image = article.querySelector("img");
            image.src = this.imgPath + "w300" + data[x1].poster_path;
            section.appendChild(article);
        }
    }
}