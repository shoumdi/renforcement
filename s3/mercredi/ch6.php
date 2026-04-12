<?php

abstract class Article {
    protected $reference;
    protected $designation;
    protected $prix_ht;

    public function __construct($reference, $designation, $prix_ht) {
        $this->reference = $reference;
        $this->designation = $designation;
        $this->prix_ht = $prix_ht;
    }

    public function getPrixHT() {
        return $this->prix_ht;
    }

    public function getDesignation() {
        return $this->designation;
    }

    public function getReference() {
        return $this->reference;
    }

    abstract public function getTauxTVA();

    public function calculerPrixTTC() {
        return $this->prix_ht * (1 + $this->getTauxTVA());
    }
}

class Produit extends Article {
    public function getTauxTVA() {
        return 0.20;
    }
}

class Service extends Article {
    public function getTauxTVA() {
        return 0.10;
    }
}

class ProduitAlimentaire extends Article {
    public function getTauxTVA() {
        return 0.055;
    }
}

class Facture {
    private $numero;
    private $date;
    private $client;
    private $lignes = [];

    public function __construct($numero, $client) {
        $this->numero = $numero;
        $this->client = $client;
        $this->date = new DateTime();
    }

    public function ajouterLigne($article, $quantite) {
        $this->lignes[] = [
            "article" => $article,
            "quantite" => $quantite
        ];
    }

    public function calculerTotalHT() {
        $total = 0;
        foreach ($this->lignes as $ligne) {
            $total += $ligne["article"]->getPrixHT() * $ligne["quantite"];
        }
        return $total;
    }

    public function calculerTotalTVA() {
        $tvaParTaux = [];

        foreach ($this->lignes as $ligne) {
            $article = $ligne["article"];
            $qte = $ligne["quantite"];
            $taux = $article->getTauxTVA();

            $montantHT = $article->getPrixHT() * $qte;
            $montantTVA = $montantHT * $taux;

            if (!isset($tvaParTaux[$taux])) {
                $tvaParTaux[$taux] = 0;
            }

            $tvaParTaux[$taux] += $montantTVA;
        }

        return $tvaParTaux;
    }

    public function calculerTotalTTC() {
        $total = 0;
        foreach ($this->lignes as $ligne) {
            $total += $ligne["article"]->calculerPrixTTC() * $ligne["quantite"];
        }
        return $total;
    }

    public function afficherFacture() {
        echo " FACTURE \n";
        echo "Numero: {$this->numero}\n";
        echo "Client: {$this->client}\n";
        echo "Date: " . $this->date->format("Y-m-d") . "\n\n";

        echo "Lignes:\n";
        foreach ($this->lignes as $ligne) {
            $article = $ligne["article"];
            $qte = $ligne["quantite"];
            $prixHT = $article->getPrixHT();
            $totalHT = $prixHT * $qte;

            echo "{$article->getReference()} - {$article->getDesignation()} | ";
            echo "Qte: {$qte} | PU HT: {$prixHT}€ | Total HT: {$totalHT}€\n";
        }

        echo "\n Total TVA\n";
        $tvas = $this->calculerTotalTVA();
        foreach ($tvas as $taux => $montant) {
            echo "TVA " . ($taux * 100) . "% : " . round($montant, 2) . "€\n";
        }

        echo "\nTotal HT : " . round($this->calculerTotalHT(), 2) . "€\n";
        echo "Total TTC : " . round($this->calculerTotalTTC(), 2) . "€\n";
        echo "**************\n";
    }
}

$a1 = new Produit("P001", "Ordinateur", 1000);
$a2 = new Service("S001", "Installation", 200);
$a3 = new ProduitAlimentaire("A001", "Pain", 2);

$facture = new Facture("F2026-001", "Client XYZ");

$facture->ajouterLigne($a1, 1);
$facture->ajouterLigne($a2, 2);
$facture->ajouterLigne($a3, 10);

$facture->afficherFacture();

?>