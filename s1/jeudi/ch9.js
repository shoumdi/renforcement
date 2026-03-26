    const ChangeRate = {
        USD: 1.08,
        GBP: 0.86,
        MAD: 10.85,
        JPY: 162.5,
        CAD: 1.47
    }
    class ConversionHistory {
        constructor(id, montant, converted, from, to, date) {
            this.id = id;
            this.montant = montant;
            this.converted = converted;
            this.from = from;
            this.to = to;
            this.date = date;
        }
    }
    //Fonction convertir(montant, deviseSource, deviseCible) : convertit d'abord en 
    // euros puis dans la devise cible
    function convert(montant, from, to) {
        if (!ChangeRate[from] || !ChangeRate[to]) {
            return console.log("currency not found");
        }
        return montant * ChangeRate[to] / ChangeRate[from]
    }
    ///Fonction convertirPanier(panier, deviseSource, deviseCible) : prend un 
    // tableau de prix dans une devise et retourne les prix convertis
    function convertirPanier(panier, from, to) {
        for (const item of panier)
            item.prix = convert(item.prix, from, to);
    }

    //Fonction meilleurTaux(montant, deviseSource) : affiche la valeur du montant 
    // dans TOUTES les devises disponibles

    function meilleurTaux(montant, from) {
        return Object.fromEntries(Object.keys(ChangeRate)
            .map(currency => [currency, convert(montant, from, currency)]))
    }
    // console.log(meilleurTaux(100, 'USD'))
    ///Historique des conversions : chaque conversion est stockée avec la date,
    //les montants et les devises. Affiche l'historique
    const history = [];
    function conversionWithHistory(montant, from, to, date) {
        const cnv = convert(montant, from, to)
        if (!cnv) return console.log("conversion failed");
        const id = lastInsertedId(history);
        history.push(
            new ConversionHistory(id + 1, montant, cnv, from, to, date)
        )
    }


    function lastInsertedId(list) {
        return list.at(-1)?.id ?? 0
    }

    conversionWithHistory(100, "MAD", "USD", "26/03/2026")
    conversionWithHistory(250, "USD", "MAD", "25/03/2026")
    conversionWithHistory(75, "GBP", "USD", "24/03/2026")
    conversionWithHistory(500, "MAD", "GBP", "23/03/2026")
    conversionWithHistory(1200, "JPY", "USD", "22/03/2026")
    conversionWithHistory(60, "GBP", "CAD", "21/03/2026")
    conversionWithHistory(300, "CAD", "USD", "20/03/2026")
    conversionWithHistory(45, "USD", "JPY", "19/03/2026")
    conversionWithHistory(800, "MAD", "CAD", "18/03/2026")
    conversionWithHistory(150, "CAD", "GBP", "17/03/2026")

    ///Statistiques : devise la plus demandée, montant total converti, 
    // conversion la plus fréquente

    function statistiques() {
        const map = new Map();
        for (const cnv of history)
            map.set(cnv.to, (map.get(cnv.to) || 0) + 1)
        const top = Array.from(map.entries()).sort((m1, m2) => m2[1] - m1[1])[0]
        const totalConverted = ["totalConverted", history.filter(i => i.to === top[0]).reduce((p, c) => p += c.converted, 0)]
        return Object.fromEntries([top, totalConverted])

    }
    console.log(statistiques())

