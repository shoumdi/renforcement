//Tu gères le classement d'un tournoi de football. 
// Chaque équipe est un objet : nom, points, 
// buts_pour, buts_contre, matchs_joues.

class Team {
    constructor(name, points, buts_pour, but_contre, matchs_joues) {
        this.name = name;
        this.points = points;
        this.buts_pour = buts_pour;
        this.but_contre = but_contre;
        this.matchs_joues = matchs_joues;
    }
}

let teams = [
    new Team("Wydad Casablanca", 45, 38, 20, 20),
    new Team("Raja Casablanca", 42, 35, 18, 20),
    new Team("FAR Rabat", 40, 33, 22, 20),
    new Team("Moghreb Tetouan", 30, 25, 27, 20),
    new Team("Hassania Agadir", 28, 22, 26, 20),
    new Team("Ittihad Tanger", 26, 20, 28, 20),
    new Team("Olympic Safi", 24, 18, 30, 20),
    new Team("Difaa El Jadida", 22, 17, 29, 20)
];

//Calcule la différence de buts pour chaque équipe (buts_pour - buts_contre)
function teamButs() {
    return teams.map(t => {
        t.diff = t.buts_pour - t.but_contre
        return t;
    })
}
teams = teamButs()

///Trie le classement : d'abord par points décroissant, puis par différence de buts en cas d'égalité
function sortTeams() {
    teams = teams.sort((t1, t2) => {
        if (t1.points === t2.points) return t2.diff - t1.diff;
        return t2.points - t1.points
    })
}

console.log(teams);
///Affiche le classement formaté avec le rang : "1. PSG — 45 pts (diff: +28)"
const formatted = teams.map((s, i) => `${(i + 1)}. ${s.name} - ${s.points} pts (diff: ${s.diff})`).join('\n')
console.log(formatted);

///Simule un match entre 2 équipes (score aléatoire) : mets à jour les points (3 pour victoire, 1 pour nul, 0 pour défaite), les buts pour/contre et les matchs joués
//Après 5 matchs simulés, réaffiche le classement mis à jour

function match(team1Id, team2Id, but1, but2) {
    
    teams[team1Id].points += (but1 > but2) ? 3 : (but1 === but2) ? 1 : 0
    teams[team1Id].buts_pour += but1;
    teams[team1Id].but_contre += but2;
    teams[team1Id].matchs_joues++
    teams[team2Id].points += (but1 < but2) ? 3 : (but1 === but2) ? 1 : 0
    teams[team2Id].buts_pour += but2;
    teams[team2Id].but_contre += but1;
    teams[team2Id].matchs_joues++
}

function randomMatch() {
    const id1 = randomNumber(7)
    let id2 = randomNumber(7)
    while (id1 === id2) {
        id2 = randomNumber(7)
    }
    match(id1, id2, randomNumber(20), randomNumber(20))
}

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

for (let i = 0; i < 5; i++) {
    randomMatch()
}
teams = teamButs()
console.log("-------------------------------")
console.log("---------new data-------------")
const formatted2 = teams.map((s, i) => `${(i + 1)}. ${s.name} - ${s.points} pts (diff: ${s.diff})`).join('\n')
console.log(formatted2);
console.log("-------------------------------")

console.log(teams)