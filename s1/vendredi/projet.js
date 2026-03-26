/**
 * 1. Gestion des utilisateurs (2 pts)
 * La marketplace a des vendeurs et des acheteurs.
 * Chaque utilisateur a : un id, un pseudo, un email, un rôle (vendeur/acheteur), 
 * une note moyenne, un solde (porte-monnaie virtuel). 
 * Crée au moins 5 utilisateurs.
 */

class User {
    constructor(id, pseudo, email, role) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
        this.role = role;
    }
}

const Role = {
    Seller: 0,
    Buyer: 1
}

const users = [
    new User(1, "yassine_dev", "yassine@example.com", Role.Seller),
    new User(2, "salma_shop", "salma@example.com", Role.Buyer),
    new User(3, "karim_store", "karim@example.com", Role.Seller),
    new User(4, "amina_buyer", "amina@example.com", Role.Buyer),
    new User(5, "mehdi_trade", "mehdi@example.com", Role.Seller)
];


/**
 * 
 * 2. Gestion des annonces (4 pts)
 * Un vendeur peut publier une annonce : id, vendeur_id, titre, description, prix, 
 * categorie (Électronique, Vêtement, Meuble, Sport, Autre), etat (neuf, très bon, bon, acceptable),
 *  statut (disponible, vendu, réservé), date_publication. Fonctions : publier 
 * une annonce (vérifier que l'utilisateur est vendeur), modifier le prix, retirer une annonce.
 */
class Annonce {
    constructor(id, vendeur_id, titre, description, prix, categorie, etat, date) {
        this.id = id;
        this.vendeur_id = vendeur_id;
        this.titre = titre;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
        this.etat = etat;
        this.date = date;
    }
}
const status = {
    Available: "disponible",
    Vendu: "vendu",
    Reserved: "réservé"
}
const etat = {
    Neuf: "neuf",
    Excelent: "très bon",
    Bon: "bon",
    Acceptable: "acceptable"
}
const Category = {
    Electronic: "Électronique",
    Vetment: "Vêtement",
    Meuble: "Meuble",
    Sport: "Sport",
    Autre: "Autre"
}
const annonces = [];
function publishAnnonce(vendeur_id, titre, description, prix, categorie, etat, date) {
    if (vendeur_id !== Role.Seller) return console.log("only seller can publish");
    annonces.push(new Annonce(
        lastInsertedId() + 1,
        vendeur_id,
        titre,
        description,
        prix,
        categorie,
        etat,
        date
    ))
    console.log("annonce added succesfully");

}

function editPrice(annonceId, vendeurId, price) {
    if (vendeurId !== Role.Seller) return console.log("only seller can edit");
    const annonce = annonces.find(a => a.id === annonceId)
    if (!annonce) return console.log("annonce not found");
    if (annonce.vendeur_id !== vendeurId) return console.log("only publisher can edit");
    annonce.prix = price;
    console.log("price edited succesfully");

}
function deleteAnnonce(annonceId, vendeurId) {
    if (vendeurId !== Role.Seller) return console.log("only seller can delete");
    const index = annonces.findIndex(a => a.id === annonceId)
    if (index === -1) return console.log("annonce not found");
    if (annonces[index].vendeur_id !== vendeurId) return console.log("only publisher can delete");
    annonces.splice(index, 1)
    console.log("annonce deleted succesfully");

}

/** 
 * 
 * 3. Recherche et filtrage (4 pts)Fonctions de recherche : 
 * par mot-clé dans le titre et la description, par catégorie, 
 * par tranche de prix (min/max), par état, par vendeur. 
 * Les filtres doivent être combinables (ex: catégorie "Électronique" ET prix < 100€ ET état "très bon").
 * Tri par : prix, date de publication, note du vendeur.
*/

function search(key) {
    return annonces.filter(a => a.name.contains(key) || a.description.contains(key) || a.categorie.contains(key) || a.etat.contains(key) || a.vendeur_Id === users.find(u => id === key))
}

function filter(category = '', priceInf = 0, priceSup = Number.MAX_VALUE, etat = '') {
    return annonces.filter(a => a.categorie.contains(category) && a.prix <= priceSup && a.prix >= priceInf && a.etat.contains(etat))
}
function sortByPrice() {
    return annonces.sort((a1, a2) => a1.prix - a2.prix)
}
function sortByDate() {
    return annonces.sort((a1, a2) => dateToLong(a1.date) - dateToLong(a2.date))
}

///utils
function lastInsertedId(list) {
    return list.at(-1)?.id ?? 0;
}

function dateToLong(date) {
    return new Date(date).getSeconds()
}