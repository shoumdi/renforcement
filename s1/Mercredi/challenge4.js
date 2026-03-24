class Carnet {
    constructor(nom, entreprise, email, telephone, ville, adress,lastContact) {
        this.nom = nom;
        this.entreprise = entreprise;
        this.email = email;
        this.telephone = telephone;
        this.ville = ville;
        this.adress = adress;
        this.lastContact = lastContact

    }
};
class Adress {
    constructor(rue, codePostal, ville, pays) {
        this.rue = rue;
        this.codePostal = codePostal;
        this.ville = ville;
        this.pays = pays;
    }
}


let carnet = [
    new Carnet("Ahmed Benali", "TechMaroc", "ahmed@tech.ma", "0612345678", "Casablanca",
        new Adress("12 Rue Hassan II", "20000", "Casablanca", "Maroc"), "2025-01-10"),

    new Carnet("Sara El Amrani", "DesignPro", "sara@design.ma", "0623456789", "Rabat",
        new Adress("45 Avenue Mohammed V", "10000", "Rabat", "Maroc"), "2025-01-15"),

    new Carnet("Youssef Alaoui", "DevSolutions", "youssef@dev.ma", "0634567890", "Marrakech",
        new Adress("78 Rue Majorelle", "40000", "Marrakech", "Maroc"), "2025-01-20"),

    new Carnet("Nadia Tazi", "MarketHub", "nadia@market.ma", "0645678901", "Fès",
        new Adress("23 Rue Fès El Bali", "30000", "Fès", "Maroc"), "2025-02-01"),

    new Carnet("Omar Idrissi", "LogistiCo", "omar@log.ma", "0656789012", "Tanger",
        new Adress("9 Rue du Port", "90000", "Tanger", "Maroc"), "2025-02-05"),

    new Carnet("Leila Bennani", "HealthPlus", "leila@health.ma", "0667890123", "Agadir",
        new Adress("15 Boulevard Hassan I", "80000", "Agadir", "Maroc"), "2025-02-10"),

    new Carnet("Karim Chafik", "BuildIt", "karim@build.ma", "0678901234", "Oujda",
        new Adress("67 Rue Zerktouni", "60000", "Oujda", "Maroc"), "2025-02-14"),

    new Carnet("Hajar Saidi", "EduSmart", "hajar@edu.ma", "0689012345", "Kenitra",
        new Adress("3 Avenue Université", "14000", "Kenitra", "Maroc"), "2025-02-20"),

    new Carnet("Rachid Lamrani", "AutoDrive", "rachid@auto.ma", "0690123456", "Meknès",
        new Adress("21 Rue Meknès Centre", "50000", "Meknès", "Maroc"), "2025-03-01"),

    new Carnet("Salma Fassi", "FashionLine", "salma@fashion.ma", "0601234567", "Tetouan",
        new Adress("11 Rue Andalouse", "93000", "Tetouan", "Maroc"), "2025-03-05")
];

carnet.forEach(item => {
    console.log(`name:${item.nom} ville: ${item.ville}\n`)
})

///Regroupe les contacts par ville : pour chaque ville, la liste des noms
const groupByVille = carnet.reduce((p, c) => {
    if (!p[c.ville]) p[c.ville] = [];
    p[c.ville].push(c.nom)
    return p;
}, {})

// console.log(groupByVille);
///Cherche tous les contacts d'une entreprise donnée
function findByName(entreprise, carnet) {
    return carnet.filter(c => c.entreprise === entreprise);
}
///Modifie l'adresse d'un contact (il a déménagé)
function editAdrees(contactId, newAdress) {
    carnet[contactId].adress = newAdress;
    carnet.ville = newAdress.ville;
}
editAdrees(0, new Adress("Assalam", 46300, "Youssoufia", "Russia"))
console.log(carnet);

///Affiche les contacts que tu n'as pas contactés depuis plus de 30 jours
const nonContacted = carnet.filter(c=>Date.now()-Date.parse(c.lastContact)>=30)
console.log(nonContacted);
