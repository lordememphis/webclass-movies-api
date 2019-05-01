// const TMDB_API_KEY = "49ac2c3a54162a5c9f0fb8714f93f10b";
// let url = "http://www.omdbapi.com/?s=" + searchKey + "&apikey=" + OMDB_API_KEY;

const OMDB_API_KEY = "d58765a7";

const renderHTML = html => {
	document
		.querySelector(".movies-container")
		.insertAdjacentHTML("beforeend", html);
};

const fetchSearch = keyword => {
	const url =
		"http://www.omdbapi.com/?s=" + keyword + "&apikey=" + OMDB_API_KEY;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data) {
				data.Search.forEach(movie => {
					const html =
						'<div class="movie-card"><img src="' +
						movie.Poster +
						'" alt="' +
						movie.Title +
						'"/><span class="title">' +
						movie.Title +
						'</span><span class="year">' +
						movie.Year +
						"</span></div>";
					renderHTML(html);
				});
			} else {
				const html = "<h1>No movies found for " + keyword + "</h>";
				renderHTML(html);
			}
		});
};

(() => {
	const searchButton = document.querySelector(".search-btn");
	let keyword;

	const search = () => {
		keyword = document.querySelector("#search-input").value;
		if (keyword !== "") {
			keyword = keyword.split(" ").join("+");
			document.querySelector(".movies-container").innerHTML = null;
			fetchSearch(keyword);
		}
	};

	searchButton.addEventListener("click", search);
	document.addEventListener("keypress", e => {
		if (e.keyCode == 13) {
			search();
		}
	});
})();
