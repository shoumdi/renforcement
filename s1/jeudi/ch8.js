///Le panier contient un tableau d'articles. 
// Chaque article référence un produit (id, nom, prix, stock_disponible) et une quantité

class Produit {
    constructor(id, nom, prix, stock_disponible) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.stock_disponible = stock_disponible;
    }
}

const stock = [
    new Produit(1, "Laptop Dell Inspiron 15", 799.99, 8),
    new Produit(2, "Apple iPhone 13", 699.00, 15),
    new Produit(3, "Samsung 55\" 4K Smart TV", 549.99, 6),
    new Produit(4, "Sony WH-1000XM5 Headphones", 349.99, 20),
    new Produit(5, "Logitech Wireless Mouse", 29.99, 75),
    new Produit(6, "Mechanical Keyboard RGB", 89.99, 30),
    new Produit(7, "HP LaserJet Printer", 199.99, 12),
    new Produit(8, "External Hard Drive 1TB", 59.99, 40),
    new Produit(9, "USB-C Charger 65W", 25.99, 60),
    new Produit(10, "Gaming Chair Ergonomic", 159.99, 10),
    new Produit(11, "Amazon Echo Dot (5th Gen)", 49.99, 50),
    new Produit(12, "Webcam Full HD 1080p", 39.99, 28)
];
class PanierItem {
    constructor(id, name, qte, unitPrice) {
        this.id = id;
        this.name = name
        this.qte = qte
        this.unitPrice = unitPrice
    }
}
const panier = []
///Fonction pour ajouter un produit : si déjà dans le panier,
//  augmente la quantité (sans dépasser le stock disponible).
//  Si pas dans le panier, ajoute-le

function addProduct(productId, qte) {
    if (qte <= 0) {
        console.log("out of bounds exception");
        return;
    }
    const item = stock.find(item => item.id === productId)
    if (!item) {
        console.log("item non disponible");
        return;
    }
    if (item.stock_disponible < qte) {
        console.log("quantite insufisante");
        return;
    }
    const panierItem = panier.find(i => i.id === productId)
    item.stock_disponible -= qte;
    if (panierItem) {
        panierItem.qte += qte;
        return;
    }
    panier.push(new PanierItem(productId, item.nom, qte, item.prix))
    console.log("product added successfully");

}

addProduct(2, 3);
// console.log(panier);

addProduct(3, 4);
// console.log(panier);

///Fonction pour modifier la quantité : vérifie que la nouvelle quantité ne dépasse pas le stock
function editQuantity(id, qte) {
    if (qte <= 0) {
        console.log("out of bounds exception");
        return;
    }
    const panierItem = panier.find(item => item.id === id)
    if (!panierItem) {
        console.log("item non disponible");
        return;
    }
    const stockItem = stock.find(item => item.id === id)
    if (stockItem) {
        console.log("item non disponible");
        return;
    }
    if (stockItem.qte < qte) {
        console.log("quantity insufisante");
        return;
    }
    panierItem.qte = qte
    stockItem.stock_disponible -= qte
    console.log("quantity edited successfully");

}
//Fonction pour supprimer un article du panier
function deleteFromPanier(id) {
    const index = panier.findIndex(i => id === id)
    if (index === -1) {
        console.log("item not found");
        return;
    }
    panier.splice(index, 1);
    console.log("deleted successfully");

}

//Fonctions de calcul : sous-total par article (prix × quantité), total du panier, 
// nombre total d'articles

function checkout() {
    return panier.reduce((p, c) => {
        if(!p[c.id]) p[c.id]={}
        p[c.id].sousTotal = c.qte * c.unitPrice
        p[c.id].name = c.name
        p.total += p[c.id].sousTotal
        return p;
    }, { total: 0 })
}
///Système de codes promo : "BIENVENUE" = -15% sur le premier achat,
//  "NOEL2025" = -10€ si le total > 50€, "LIVGRATUITE" = -7€ (frais de livraison offerts).
//  Un seul code applicable à la fois
function discount(d) {
    const checkoutItem = checkout();
    const percent = (d === "BIENVENUE") ? 0.15 : (d === "NOEL2025") ? 0.1 : (d === "LIVGRATUITE") ? 0.07 : 0
    checkoutItem.discount = `${d}       ${Math.floor(percent * 100)}%`
    checkoutItem.total_to_pay = checkoutItem.total - checkoutItem.total * percent
    return checkoutItem;
}

///Récapitulatif complet : chaque ligne, sous-total, remise (si code promo),
// frais de livraison (7€ gratuits si total > 100€), TVA (20%), total TTC
console.log(discount("LIVGRATUITE"));
// console.log(panier);
