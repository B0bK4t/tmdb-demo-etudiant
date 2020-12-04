document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();
    if (document.location.pathname.search("fiche-film.html") > 0) {
        let params = new URL(document.location).searchParams;
        connexion.requeteInfoFilm(params.get("id"));
    } else {
        connexion.requeteDernierFilm();
    }
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
            article.querySelector(".description").innerHTML = data[x1].overview || "Aucune description disponible." //5 lignes précédentes en une
            let image = article.querySelector("img");
            image.src = this.imgPath + "w300" + data[x1].poster_path;
            image.alt = data[x1].title;
            article.querySelector("a").href = "fiche-film.html?id=" + data[x1].id;
            section.appendChild(article);
        }
    }

    requeteInfoFilm(movieID) {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourInfoFilm.bind(this));
        requete.open("GET", this.baseUrl + "movie/" + movieID + "?api_key=" + this.apiKey + "&language=" + this.lang);
        requete.send();
    }

    retourInfoFilm(event) {
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        this.afficherInfoFilm(data);
    }

    afficherInfoFilm(data) {
        document.querySelector("h1").innerHTML = data.title
        let image = document.querySelector(".affiche");
        image.src = this.imgPath + "w300" + data.poster_path;
        image.alt = data.title;
        document.querySelector(".description").innerHTML = data.overview || "Aucune description disponible.";
        console.log(data.vote_average * 10 + "%");

    }

    /*  let section = document.querySelector(".liste-films");
  /* for (var x1 = 0; x1 < this.totalFilm; x1++) {
         let article = document.querySelector(".template .film").cloneNode(true);
         article.querySelector("h2").innerHTML = data[x1].title;
         article.querySelector(".description").innerHTML = data[x1].overview || "Aucune description disponible." //5 lignes précédentes en une
         let image = article.querySelector("img");
         image.src = this.imgPath + "w300" + data[x1].poster_path;
         image.alt = data[x1].title;
         article.querySelector("a").href = "fiche-film.html?id=" + data[x1].id;
         section.appendChild(article);
     }*/
}