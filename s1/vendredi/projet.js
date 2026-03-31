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
const Status = {
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
    return annonces.filter(a => a.name.contains(key) || a.description.contains(key) || a.categorie.contains(key) || a.etat.contains(key) || a.vendeur_Id === users.find(u => u.pseudo.contains(key)))
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

/**
 * 4. Système d'achat (4 pts)Un acheteur peut acheter une annonce : 
 * vérifier que l'annonce est disponible, vérifier que l'acheteur a un solde suffisant,
 *  déduire le montant du solde de l'acheteur, ajouter le montant au solde 
 * du vendeur (moins 5% de commission), passer l'annonce en "vendu". 
 * Historique des transactions (date, acheteur, vendeur, annonce, montant, commission).
 */
const balances = [
    {
        userId: 1,
        amount: 1500
    },
    {
        userId: 2,
        amount: 320
    },
    {
        userId: 3,
        amount: 7800
    },
    {
        userId: 4,
        amount: 450
    },
    {
        userId: 5,
        amount: 2100
    }
];
class Transaction {
    constructor(id, date, acheteurId, annonceId, montant) {
        this.id = id;
        this.date = date;
        this.acheteurId = acheteurId;
        this.annonceId = annonceId;
        this.montant = montant;
    }
}
const transactions = []
function buy(annonceId, buyerId, date, montant) {
    if (users.some(u => u.id === buyerId)) return console.log("no user for this id");


    const annonce = annonces.find(a => a.id === annonceId && a.status !== Status.disponible);
    if (!annonce) return console.log("no annonce for this id");
    if (users.findIndex(u => u.id === buyerId) === -1) return console.log("User not found");
    const hasSold = balances.find(b => b.userId === buyerId).amount >= annonce.prix
    if (!hasSold) return console.log("sold insuf");

    transactions.push(new Transaction(
        lastInsertedId(transactions) + 1,
        date,
        buyerId,
        annonceId,
        montant
    ))
}


/**
 * 5. Système d'avis (3 pts) Après un achat, l'acheteur peut noter le vendeur (1 à 5) 
 * avec un commentaire. Un acheteur ne peut noter un vendeur qu'une seule fois par transaction. 
 * La note moyenne du vendeur est recalculée automatiquement. 
 * Afficher le profil d'un vendeur : pseudo, note moyenne, nombre de ventes, avis reçus.
 */
class Review {
    constructor(id, transactionId, comment, rate, acheteurId) {
        this.id = id;
        this.comment = comment;
        this.transactionId = transactionId;
        this.acheteurId = acheteurId;
        this.rate = Math.max(0, Math.min(rate, 5));
    }
}
class Rating {
    constructor(rate, userId) {
        this.userId = userId;
        this.rate = rate;
    }
}
const userRating = []
const reviews = []
function makeReview(transactionId, rate, comment) {
    const transaction = transactions.find(t => t.id === transactionId);

    if (!transaction) {
        console.log("Transaction not found");
        return;
    }
    const alreadyReviewed = reviews.find(r => r.transactionId === transactionId);
    if (alreadyReviewed) {
        console.log("already reviewrd");
        return;
    }
    const sellerId =  annonces.find(a => a.id === transaction.annonceId).vendeur_id;
    const rev = new Review(
        lastInsertedId(reviews) + 1,
        transactionId,
        comment,
        rate,
        transaction.acheteurId,
        sellerId,
    )
    reviews.push(rev);
    recalculate(sellerId)
}
function recalculate(sellerId) {

    const sellerReviews = reviews.filter(r => r.sellerId === sellerId);

    const avg =
        sellerReviews.reduce((sum, r) => sum + r.rating, 0) /
        sellerReviews.length;

    const seller = users.find(u => u.id === sellerId);
    seller.rating = parseFloat(avg.toFixed(2));

}
function showSeller(sellerId) {
    const seller = users.find(u => u.id === sellerId);

    const sellerReviews = reviews.filter(r => r.sellerId === sellerId);

    const salesCount = transactions.filter(t => t.sellerId === sellerId).length;

    console.log("Note moyenne:", seller.rating || 0);
    console.log("Nombre de ventes:", salesCount);
    console.log("Avis:");
    console.log(`Pseudo: ${seller.pseudo}\n
        Note moyenne: ${seller.rate || 0}\n
        Nombre de ventes: ${salesCount}\n
        Avis: ${sellerReviews.map(r => `- ${r.rating}/5 : ${r.comment}`).join("\n")}
        `);
}

/**
 * 6. Statistiques de la marketplace (3 pts) Nombre total d'annonces (par statut), 
 * chiffre d'affaires total (somme des ventes), commission totale collectée, 
 * top 3 vendeurs par note, catégorie la plus populaire (en nombre d'annonces), 
 * prix moyen par catégorie.
 */
///utils
function lastInsertedId(list) {
    return list.at(-1)?.id ?? 0;
}

function dateToLong(date) {
    return new Date(date).getSeconds()
}