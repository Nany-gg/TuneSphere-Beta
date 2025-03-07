// 🎵 Lista de canciones (Cambia los IDs por los tuyos)
let songs = [
    { 
        src: "https://drive.google.com/uc?export=download&id=1UpsNT2KRQxeXowagGpQDdqmAsGZR5lkS",
        title: "Expresso", 
        album: "Short n’ Sweet", 
        artist: "Sabrina Carpenter", 
        cover: "https://drive.google.com/uc?export=download&id=1MY9nl0mTgDIA0CBs0MGoso9hkO1MRkAk"
    },
    { 
        src: "https://drive.google.com/uc?export=download&id=1Uv64BvnDZ9jqxB8WOWdmg2vHChAqhHFE", 
        title: "Juno", 
        album: "Short n’ Sweet", 
        artist: "Sabrina Carpenter", 
        cover: "https://drive.google.com/uc?export=download&id=1M7BJ1jj-3g2H63xY6Z_CObBUIWDvBH_H"
    },
    { 
        src: "https://drive.google.com/uc?export=download&id=1VfvRJJq5Sid7qeobzx62wzuZ2eaEC-Qf", 
        title: "Bed Chem", 
        album: "Short n’ Sweet", 
        artist: "Sabrina Carpenter", 
        cover: "https://drive.google.com/uc?export=download&id=1MJF7kEeaf8Ej_b4zr9U1dtUWziWRGmRX"
    }
];

// 🎧 Elementos del reproductor
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songAlbum = document.getElementById("song-album");
const songCover = document.getElementById("song-cover");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songList = document.getElementById("song-list");

// 🎵 Cargar canciones en la lista
function loadSongs() {
    songList.innerHTML = "";
    songs.forEach((song, index) => {
        let songItem = document.createElement("div");
        songItem.classList.add("song-item");
        songItem.innerHTML = `
            <img src="${song.cover}" class="song-cover">
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>${song.album}</p>
                <p class="artist">${song.artist}</p>
            </div>
        `;
        songItem.addEventListener("click", () => loadSong(index));
        songList.appendChild(songItem);
    });
}

// 🎼 Cargar canción en el reproductor
let currentSongIndex = 0;
function loadSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    songArtist.textContent = songs[index].artist;
    songAlbum.textContent = songs[index].album;
    songCover.src = songs[index].cover;
    playSong();
}

// ▶ Reproducir canción
function playSong() {
    audio.play();
    playBtn.innerHTML = "⏸"; // Cambia icono a pausa
}

// ⏸ Pausar canción
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = "▶"; // Cambia icono a play
}

// ⏯ Alternar play/pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// ⏮ Canción anterior
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// ⏭ Canción siguiente
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// 🎚 Actualizar barra de progreso
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`;
});

// 📌 Permitir adelantar canción al hacer clic en la barra de progreso
progressContainer.addEventListener("click", (event) => {
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// 📌 Cargar la lista de canciones al inicio
loadSongs();
loadSong(0);
