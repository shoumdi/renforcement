class Sold {
    constructor(mois, chiffre_affaires, nb_clients, ville) {
        this.mois = mois;
        this.chiffre_affaires = chiffre_affaires;
        this.nb_clients = nb_clients;
        this.ville = ville;
    }
}

const soldList = [
    new Sold("Janvier", 120000, 300, "Casablanca"),
    new Sold("Février", 95000, 250, "Rabat"),
    new Sold("Mars", 143000, 320, "Marrakech"),
    new Sold("Avril", 110000, 280, "Fès"),
    new Sold("Mai", 175000, 400, "Tanger"),
    new Sold("Juin", 160000, 370, "Agadir"),
    new Sold("Juillet", 200000, 450, "Casablanca"),
    new Sold("Août", 185000, 420, "Marrakech"),
    new Sold("Septembre", 130000, 310, "Rabat"),
    new Sold("Octobre", 145000, 330, "Fès"),
    new Sold("Novembre", 155000, 350, "Tanger"),
    new Sold("Décembre", 210000, 480, "Casablanca")
];

//Calcule le chiffre d'affaires total de l'année
const cATotal = soldList.reduce((sum, c) => sum += c.chiffre_affaires, 0)
//Calcule le chiffre d'affaires moyen par mois


//Trouve le mois avec le meilleur chiffre d'affaires
const bestSold = soldList.reduce((p, c) => {
    if (p.chiffre_affaires < c.chiffre_affaires) p = c;
    return p;
}, soldList[0]).mois

//Trouve le mois avec le moins de clients
const worstMonth = soldList.reduce((p, c) => {
    if (p.nb_clients > c.nb_clients) p = c;
    return p;
}, soldList[0]).mois

//Crée un nouveau tableau avec uniquement les mois où le CA dépasse 50 000€
const bestSoldes = soldList.filter(s => s.chiffre_affaires > 50000)

//Crée un résumé par ville : pour chaque ville, le CA total et le nombre total de clients
const resume = soldList.reduce((p, c) => {
    if (!p[c.ville]) {
        p[c.ville] = {
            catotal:  0,
            nbTotal:  0,
        }
    }
    p[c.ville] = {
        catotal: p[c.ville].catotal += c.chiffre_affaires,
        nbTotal: p[c.ville].nbTotal += c.nb_clients,
    }
    return p;
}, {})

//Trie les mois par chiffre d'affaires décroissant
const sortDesc=soldList.sort((s1,s2)=>s1.chiffre_affaires-s2.chiffre_affaires)
//Calcule la croissance entre chaque mois (CA mois N - CA mois N-1) et affiche-la
for (let i = 1; i < soldList.length; i++) {
    console.log(`la croissance entre ${soldList[i].mois} et ${soldList[i-1].mois} est ${soldList[i].mois-soldList[i-1].mois}`);
}