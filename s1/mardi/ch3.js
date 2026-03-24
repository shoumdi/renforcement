class review {
    constructor(pseudo, note, comment, date) {
        this.pseudo = pseudo;
        this.note = note;
        this.comment = comment;
        this.date = date;
    }
}

const reviewList = [
    new review("user1", 5, "Excellent service!", "2025-01-10"),
    new review("user2", 4, "Very good experience", "2025-01-15"),
    new review("user3", 3, "Average, could be better", "2025-01-20"),
    new review("user4", 5, "Loved it!", "2025-02-01"),
    new review("user5", 2, "Not satisfied", "2025-02-05"),
    new review("user6", 4, "Pretty good overall", "2025-02-10"),
    new review("user7", 1, "Terrible experience", "2025-02-14"),
    new review("user8", 5, "Amazing quality!", "2025-02-20"),
    new review("user9", 3, "Okay service", "2025-03-01"),
    new review("user10", 4, "Good value for money", "2025-03-05"),
    new review("user11", 5, "Highly recommend!", "2025-03-10"),
    new review("user12", 2, "Could improve", "2025-03-12"),
    new review("user13", 4, "Satisfied overall", "2025-03-15"),
    new review("user14", 3, "Neutral experience", "2025-03-18"),
    new review("user15", 5, "Perfect!", "2025-03-20")
];

//Calcule la note moyenne arrondie à 1 décimale
const avg = parseInt(reviewList.reduce((p,c)=>p+=c.note,0)/reviewList.length,10)
console.log(avg);

///Compte combien d'avis par note (combien de 1 étoile, combien de 2 étoiles, etc.)
const reviewsPerNote = reviewList.reduce((p,c)=>{
    if(!p[c.note]) p[c.note] = { number: 0}
    p[c.note]++
    return p;
},{})
console.log(reviewsPerNote);
///Filtre les avis positifs (≥ 4) et les avis négatifs (≤ 2)
const neg = reviewList.filter(r=>r.note<=2)
const pos = reviewList.filter(r=>r.note>=4)
///Trie les avis du plus récent au plus ancien
function stringtoLong(input){
    const parts = input.split(".")
    return parseInt(parts[0])*100 + parseInt(parts[1])*10 + parseInt(parts[2])
}
const sortByDate = reviewList.sort((s1,s2)=>stringtoLong(s1.date)-stringtoLong(s2.date))
console.log(sortByDate);
//Trouve l'avis le plus long (en nombre de caractères dans le commentaire)
const longestRev = reviewList.reduce((p,c)=>{
    if(p.comment.length<c.comment.length) p = c;
    return p;
},reviewList[0])
//Crée un résumé : "4.2/5 basé sur 15 avis — 8 positifs, 3 négatifs, 4 neutres"
const resume = `${avg}/5 based on 15 review - ${pos.length} positifs ${neg.length} negatifs, ${15-(pos.length+neg.length)} neutres`

console.log(resume);
