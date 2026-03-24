class Ingredient {
    constructor(name, qte, unit, unitPrice, seuilAlert, category) {
        this.name = name
        this.qte = qte
        this.unit = unit
        this.unitPrice = unitPrice
        this.seuilAlert = seuilAlert
        this.category = category

    }
}
const unit = {
    KG: 'kg',
    LITRE: 'litre',
    PCS: 'pcs'
}
const category = {
    LEGUME: 'légume', VIAND: 'viande', EPICE: 'épice', BOISSON: 'boisson'
}

const ingredients = [
    new Ingredient("Tomate", 50, unit.KG, 3, 10, category.LEGUME),
    new Ingredient("Oignon", 40, unit.KG, 2.5, 8, category.LEGUME),
    new Ingredient("Poulet", 30, unit.KG, 8, 5, category.VIAND),
    new Ingredient("Boeuf", 25, unit.KG, 12, 5, category.VIAND),
    new Ingredient("Sel", 20, unit.KG, 1, 5, category.EPICE),
    new Ingredient("Poivre", 10, unit.KG, 4, 2, category.EPICE),
    new Ingredient("Paprika", 3, unit.KG, 5, 5, category.EPICE),
    new Ingredient("Huile d'olive", 15, unit.LITRE, 10, 3, category.BOISSON),
    new Ingredient("Lait", 25, unit.LITRE, 1.5, 5, category.BOISSON),
    new Ingredient("Eau minérale", 100, unit.LITRE, 0.5, 20, category.BOISSON),
    new Ingredient("Oeufs", 200, unit.PCS, 0.2, 50, category.VIAND),
    new Ingredient("Carotte", 5, unit.KG, 2, 7, category.LEGUME)
];

//Affiche les ingrédients dont la quantité est en dessous du seuil d'alerte (alerte stock bas)
const restock = ingredients.filter(i => i.qte <= i.seuilAlert)
console.log(restock);

//Calcule la valeur totale du stock (quantité × prix unitaire pour chaque ingrédient)
const vTotal = ingredients.reduce((p, c) => p += c.qte * c.unitPrice, 0)
//Affiche la valeur du stock par catégorie
const stkPerCategory = ingredients.reduce((p,c)=>{
    if(!p[c.category]) p[c.category]=0;
    p[c.category] += c.qte
    return p; 
},{})
console.log(stkPerCategory);

///Simule une commande : un plat nécessite une liste d'ingrédients avec des quantités. Vérifie si tous les ingrédients sont disponibles en quantité suffisante. Si oui, décrémente le stock. Si non, affiche ce qui manque.
