class MovieList {
  constructor() {
    this.movieList = [];
    this.sorted = false;
  }

  addMovieHtmlLine(movie) {
    const newLine = $("<li>").data({ name: movie.name }).append(`<button>Remove</button>${movie.htmlString}`);
    $("#list ul").append(newLine);
  }

  rebuildList() {
    $("ul").empty();
    this.movieList.forEach((val) => {
      this.addMovieHtmlLine(val);
    });
  }

  addMovie(name, rating) {
    const newMovie = new Movie(name, rating);
    this.movieList.push(newMovie);
    this.addMovieHtmlLine(newMovie);
    console.log(movieList.movieList);
    this.sorted = !this.sorted;
  }

  removeMovie(movie) {
    const moviePos = this.movieList
      .map((val) => {
        return val.name;
      })
      .indexOf(movie);
    this.movieList.splice(moviePos, 1);
  }

  sortAlphabetically() {
    this.movieList.sort((a, b) => {
      let movieA = a.name.toUpperCase();
      let movieB = b.name.toUpperCase();
      if (this.sorted) {
        return movieA < movieB ? -1 : movieA > movieB ? 1 : 0;
      } else {
        return movieA < movieB ? 1 : movieA > movieB ? -1 : 0;
      }
    });
    this.sorted = !this.sorted;
    this.rebuildList();
  }

  sortByRating() {
    this.movieList.sort((a, b) => {
      const movieA = a.rating;
      const movieB = b.rating;
      if (this.sorted) {
        return movieA < movieB ? -1 : movieA > movieB ? 1 : 0;
      } else {
        return movieA < movieB ? 1 : movieA > movieB ? -1 : 0;
      }
    });
    this.sorted = !this.sorted;
    this.rebuildList();
  }
}

class Movie {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
    this.htmlString = `${this.rating}<span class="stars checked">&#9733;</span> ${this.name}`;
  }
}
// Handle rating clicks
const starsDiv = "div.stars span";
$(starsDiv).on("click", function (e) {
  $(starsDiv).removeClass("checked");
  const checkIndex = $(starsDiv).index(this);
  $(starsDiv)
    .slice(0, checkIndex + 1)
    .addClass("checked");
});

$("#movie-form").on("submit", function (e) {
  e.preventDefault();
  movieList.addMovie($("#title").val(), $(starsDiv + ".checked").length);
});

$("#sortAlpha").on("click", function (e) {
  movieList.sortAlphabetically();
});

$("#sortRating").on("click", function (e) {
  movieList.sortByRating();
});

// Handle movie deletion
$("#list ul").on("click", "button", function (e) {
  const removeName = $(e.target).parent().data("name");
  $(e.target).parent().remove();
  movieList.removeMovie(removeName);
});

const movieList = new MovieList();
