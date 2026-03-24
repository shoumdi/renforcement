class Article {
    constructor(name, qte, unitePrice) {
        this.name = name;
        this.qte = qte;
        this.unitePrice = unitePrice
    }
}

const sold = [
    new Article("Oil", 4, 10),
    new Article("Milk", 10, 80),
    new Article("Ton", 7, 140),
    new Article("bimo", 3, 20),
    new Article("Sucre", 6, 280)
]
for(const item of sold){
    const total = item.unitePrice*item.qte
    const tva = total*20/100
    console.log(`${item.name} x${item.qte} = ${total}, Tva = ${tva} , ttc = ${total+tva}\n`);
}
    