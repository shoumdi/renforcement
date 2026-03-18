class Carnet {
    constructor(nom, entreprise, email, telephone, ville, adress) {
        this.nom = nom;
        this.entreprise = entreprise;
        this.email = email;
        this.telephone = telephone;
        this.ville = ville;
        this.adress = telephone;
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
        new Adress("12 Rue Hassan II", "20000", "Casablanca", "Maroc")),

    new Carnet("Sara El Amrani", "DesignPro", "sara@design.ma", "0623456789", "Rabat",
        new Adress("45 Avenue Mohammed V", "10000", "Rabat", "Maroc")),

    new Carnet("Youssef Alaoui", "DevSolutions", "youssef@dev.ma", "0634567890", "Marrakech",
        new Adress("78 Rue Majorelle", "40000", "Marrakech", "Maroc")),

    new Carnet("Nadia Tazi", "MarketHub", "nadia@market.ma", "0645678901", "Fès",
        new Adress("23 Rue Fès El Bali", "30000", "Fès", "Maroc")),

    new Carnet("Omar Idrissi", "LogistiCo", "omar@log.ma", "0656789012", "Tanger",
        new Adress("9 Rue du Port", "90000", "Tanger", "Maroc")),

    new Carnet("Leila Bennani", "HealthPlus", "leila@health.ma", "0667890123", "Agadir",
        new Adress("15 Boulevard Hassan I", "80000", "Agadir", "Maroc")),

    new Carnet("Karim Chafik", "BuildIt", "karim@build.ma", "0678901234", "Oujda",
        new Adress("67 Rue Zerktouni", "60000", "Oujda", "Maroc")),

    new Carnet("Hajar Saidi", "EduSmart", "hajar@edu.ma", "0689012345", "Kenitra",
        new Adress("3 Avenue Université", "14000", "Kenitra", "Maroc")),

    new Carnet("Rachid Lamrani", "AutoDrive", "rachid@auto.ma", "0690123456", "Meknès",
        new Adress("21 Rue Meknès Centre", "50000", "Meknès", "Maroc")),

    new Carnet("Salma Fassi", "FashionLine", "salma@fashion.ma", "0601234567", "Tetouan",
        new Adress("11 Rue Andalouse", "93000", "Tetouan", "Maroc"))
];


carnet.forEach(item=>{
    console.log(`name:${item.nom} ville: ${item.ville}`)
})
