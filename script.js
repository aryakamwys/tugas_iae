const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' //sudah disembunyikan 
    }
};

function fetchData() {
    Promise.all([
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options).then(res => res.json()),
        fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options).then(res => res.json()),
        fetch('https://api.themoviedb.org/3/configuration/languages', options).then(res => res.json())
    ])
    .then(([movieData, tvData, languagesData]) => {
        const movieList = document.getElementById('movie-list');
        const tvList = document.getElementById('tv-list');
        const languagesList = document.getElementById('languages-list');

        movieList.innerHTML = "";
        tvList.innerHTML = "";
        languagesList.innerHTML = "";

        movieData.genres.forEach(genre => {
            const li = document.createElement('li');
            li.textContent = genre.name;
            movieList.appendChild(li);
        });

        tvData.genres.forEach(genre => {
            const li = document.createElement('li');
            li.textContent = genre.name;
            tvList.appendChild(li);
        });

        languagesData.forEach(language => {
            const li = document.createElement('li');
            li.textContent = `${language.english_name} (${language.iso_639_1})`;
            languagesList.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching data:', err));
}

function showSection(sectionId) {
    document.getElementById("home").classList.add("hidden");
    document.getElementById(sectionId).classList.remove("hidden");
    fetchData(); 
}

function goBack() {
    document.querySelectorAll(".section").forEach(el => el.classList.add("hidden"));
    document.getElementById("home").classList.remove("hidden");
}
