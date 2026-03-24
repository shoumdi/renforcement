class Music {
    constructor(title, artiste, duration, genre) {
        this.title = title;
        this.artiste = artiste;
        this.duration = duration;
        this.genre = genre;
    }
}
const musics = [
    new Music("Blinding Lights", "The Weeknd", 200, "Pop"),
    new Music("Shape of You", "Ed Sheeran", 233, "Pop"),
    new Music("Billie Jean", "Michael Jackson", 294, "Pop"),
    new Music("Smells Like Teen Spirit", "Nirvana", 301, "Rock"),
    new Music("Bohemian Rhapsody", "Queen", 355, "Rock"),
    new Music("Lose Yourself", "Eminem", 326, "Hip-Hop"),
    new Music("Rolling in the Deep", "Adele", 228, "Soul"),
    new Music("One Dance", "Drake", 174, "Afrobeats"),
    new Music("HUMBLE.", "Kendrick Lamar", 177, "Hip-Hop"),
    new Music("Despacito", "Luis Fonsi", 227, "Latin Pop")
];

function showTitles(musics) {
    for (const m of musics)
        console.log(m.title);
}

//Crée un nouveau tableau contenant uniquement les chansons de genre "Rock"
const rock = musics.filter(m => m.genre === "Rock")
//Crée un nouveau tableau où chaque durée est convertie en format "3:45" (minutes:secondes)
const formatted = musics.map(m => new Music(m.title, m.artiste, formatDuration(m.duration), m.genre))

function formatDuration(second) {
    const m = parseInt(second / 60, 10)
    const s = Math.floor((second / 60 - m) * 100)
    return `${m}:${s}`
}

//Calcule la durée totale de la playlist en minutes et secondes
const durationTotal = formatDuration(musics.reduce((d, c) => d += c.duration, 0))
//Trouve la chanson la plus longue
const longestMusic = musics.reduce((accu, c) => {
    if (c.duration > accu.duration)
        accu = c;
    return accu;
}, musics[0])
//Vérifie si toutes les chansons durent moins de 6 minutes
const allMoreThanSix = musics.every(m => m.duration > 6 * 60)
//Vérifie si au moins une chanson est du genre "Jazz"
const hasMoreThanSix = musics.some(m => m.genre==="Jazz")
//Trie les chansons par durée, de la plus courte à la plus longue
const sorted= musics.sort((m1,m2)=>m1.duration-m2.duration);