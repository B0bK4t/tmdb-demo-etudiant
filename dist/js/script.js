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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbm5leGlvbiA9IG5ldyBNb3ZpZURCKCk7XHJcbiAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKFwiZmljaGUtZmlsbS5odG1sXCIpID4gMCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKS5zZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZURlcm5pZXJGaWxtKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2xhc3MgTW92aWVEQiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiYzIyZDI2YWE3MTRjNWU0NWQ4ZDg3YTQ0MjE0ZTZmZjBcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy50b3RhbEZpbG0gPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVXJsICsgXCJtb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PVwiICsgdGhpcy5hcGlLZXkgKyBcIiZsYW5ndWFnZT1cIiArIHRoaXMubGFuZyArIFwiJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpIHtcclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIik7XHJcbiAgICAgICAgZm9yICh2YXIgeDEgPSAwOyB4MSA8IHRoaXMudG90YWxGaWxtOyB4MSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZSAuZmlsbVwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFbeDFdLnRpdGxlO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YVt4MV0ub3ZlcnZpZXcgfHwgXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZS5cIiAvLzUgbGlnbmVzIHByw6ljw6lkZW50ZXMgZW4gdW5lXHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW3gxXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YVt4MV0udGl0bGU7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuaHJlZiA9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVt4MV0uaWQ7XHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlEKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VySW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVybCArIFwibW92aWUvXCIgKyBtb3ZpZUlEICsgXCI/YXBpX2tleT1cIiArIHRoaXMuYXBpS2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckluZm9GaWxtKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJJbmZvRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckluZm9GaWxtKGRhdGEpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZVxyXG4gICAgICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWZmaWNoZVwiKTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyBcInczMDBcIiArIGRhdGEucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YS50aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXcgfHwgXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZS5cIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnZvdGVfYXZlcmFnZSAqIDEwICsgXCIlXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RlLWZpbG1zXCIpO1xyXG4gIC8qIGZvciAodmFyIHgxID0gMDsgeDEgPCB0aGlzLnRvdGFsRmlsbTsgeDErKykge1xyXG4gICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGUgLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW3gxXS50aXRsZTtcclxuICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbeDFdLm92ZXJ2aWV3IHx8IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGUuXCIgLy81IGxpZ25lcyBwcsOpY8OpZGVudGVzIGVuIHVuZVxyXG4gICAgICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVt4MV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgIGltYWdlLmFsdCA9IGRhdGFbeDFdLnRpdGxlO1xyXG4gICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbeDFdLmlkO1xyXG4gICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG4gICAgIH0qL1xyXG59Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
