<?php

interface ModeLivraison {
    public function calculerCout(float $poidsTotal, float $prixTotal): float;
    public function estimerDelai(): string;
}

class LivraisonStandard implements ModeLivraison {
    public function calculerCout(float $poidsTotal, float $prixTotal): float {
        if ($prixTotal > 50) {
            return 0;
        }
        return 5;
    }

    public function estimerDelai(): string {
        return "5-7 jours";
    }
}

class LivraisonExpress implements ModeLivraison {
    public function calculerCout(float $poidsTotal, float $prixTotal): float {
        return 10 + (2 * $poidsTotal);
    }

    public function estimerDelai(): string {
        return "1-2 jours";
    }
}

class PointRelais implements ModeLivraison {
    public function calculerCout(float $poidsTotal, float $prixTotal): float {
        $cout = 3;
        if ($poidsTotal > 5) {
            $cout += 1;
        }
        return $cout;
    }

    public function estimerDelai(): string {
        return "3-5 jours";
    }
}

class LivraisonInternationale implements ModeLivraison {
    private bool $horsEurope;

    public function __construct(bool $horsEurope) {
        $this->horsEurope = $horsEurope;
    }

    public function calculerCout(float $poidsTotal, float $prixTotal): float {
        $cout = 15 + (3 * $poidsTotal);
        if ($this->horsEurope) {
            $cout += 20;
        }
        return $cout;
    }

    public function estimerDelai(): string {
        return "10-15 jours";
    }
}

class Article {
    public float $poids;
    public float $prix;

    public function __construct(float $poids, float $prix) {
        $this->poids = $poids;
        $this->prix = $prix;
    }
}

class Commande {
    private array $articles = [];
    private ModeLivraison $modeLivraison;

    public function ajouterArticle(Article $article): void {
        $this->articles[] = $article;
    }

    public function setModeLivraison(ModeLivraison $mode): void {
        $this->modeLivraison = $mode;
    }

    public function getPoidsTotal(): float {
        return array_sum(array_map(fn($a) => $a->poids, $this->articles));
    }

    public function getPrixTotalArticles(): float {
        return array_sum(array_map(fn($a) => $a->prix, $this->articles));
    }

    public function calculerTotal(): float {
        $poids = $this->getPoidsTotal();
        $prix = $this->getPrixTotalArticles();

        $fraisLivraison = $this->modeLivraison->calculerCout($poids, $prix);

        return $prix + $fraisLivraison;
    }

    public function afficherResume(): void {
        echo "Prix articles : " . $this->getPrixTotalArticles() . "€\n";
        echo "Poids total : " . $this->getPoidsTotal() . " kg\n";
        echo "Frais livraison : " . $this->modeLivraison->calculerCout(
            $this->getPoidsTotal(),
            $this->getPrixTotalArticles()
        ) . "€\n";
        echo "Délai : " . $this->modeLivraison->estimerDelai() . "\n";
        echo "TOTAL : " . $this->calculerTotal() . "€\n";
    }
}


/**
 * tests
 */

$commande1 = new Commande();
$commande1->ajouterArticle(new Article(2, 30));
$commande1->ajouterArticle(new Article(1, 25)); // total > 50 => gratuit
$commande1->setModeLivraison(new LivraisonStandard());
$commande1->afficherResume();

$commande2 = new Commande();
$commande2->ajouterArticle(new Article(3, 40));
$commande2->setModeLivraison(new LivraisonExpress());
$commande2->afficherResume();

$commande3 = new Commande();
$commande3->ajouterArticle(new Article(4, 60));
$commande3->setModeLivraison(new LivraisonInternationale(true));
$commande3->afficherResume();