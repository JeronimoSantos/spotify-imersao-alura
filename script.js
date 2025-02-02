const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('section');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
        <section class="card-img">
            <img id="artist-img" class="artist-img" src="${artist.urlImg}"/>
                <section class="play">
                    <span class="fa-solid fa-play"></span>
                </section>
        </section>
        
        <section class="card-text">
            <span id="artist-name" class="artist-name">${artist.name}</span>
            <span class="artist-categorie">Artista</span>
        </section>
        `;
        gridContainer.appendChild(artistCard);
    });

    resultsArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultsArtist.classList.add('hidden');
        return
    }

    requestApi(searchTerm);
});
