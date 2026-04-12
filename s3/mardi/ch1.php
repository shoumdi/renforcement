<?php

class Distributeur {
    private $produits = [];
    private $caisse = 0;

    public function __construct($produitsInitiaux) {
        $this->produits = $produitsInitiaux;
    }

    public function afficherProduits() {
        echo "Produits disponibles\n";
        foreach ($this->produits as $produit) {
            echo "{$produit['nom']} - {$produit['prix']}€ (Stock: {$produit['stock']})\n";
        }
        echo "\n";
    }

    public function acheter($nomProduit, $montantInsere) {
        foreach ($this->produits as &$produit) {
            if ($produit['nom'] === $nomProduit) {

                if ($produit['stock'] <= 0) {
                    echo "Rupture de stock pour {$nomProduit}\n";
                    return $montantInsere;
                }

                if ($montantInsere < $produit['prix']) {
                    echo "Montant insuffisant pour {$nomProduit}\n";
                    return $montantInsere;
                }

                $produit['stock']--;
                $this->caisse += $produit['prix'];
                $monnaie = $montantInsere - $produit['prix'];

                echo "Achat reussi : {$nomProduit}\n";
                echo "Monnaie rendue : {$monnaie}€\n\n";

                return $monnaie;
            }
        }

        echo "Produit {$nomProduit} introuvable\n";
        return $montantInsere;
    }

    public function remplir($nomProduit, $quantite) {
        foreach ($this->produits as &$produit) {
            if ($produit['nom'] === $nomProduit) {
                $produit['stock'] += $quantite;
                echo "Stock de {$nomProduit} augmente de {$quantite}\n";
                return;
            }
        }
        echo "Produit {$nomProduit} introuvable\n";
    }

    public function getRecette() {
        return $this->caisse;
    }
}

$produits = [
    ["nom" => "Coca", "prix" => 2.0, "stock" => 3],
    ["nom" => "Pepsi", "prix" => 1.8, "stock" => 2],
    ["nom" => "Eau", "prix" => 1.0, "stock" => 5],
    ["nom" => "Jus", "prix" => 2.5, "stock" => 1],
    ["nom" => "The", "prix" => 1.5, "stock" => 0],
];

$distributeur = new Distributeur($produits);

$distributeur->afficherProduits();

$distributeur->acheter("Coca", 2.0);
$distributeur->acheter("Pepsi", 1.0);
$distributeur->acheter("Eau", 2.0);
$distributeur->acheter("Jus", 2.5);
$distributeur->acheter("Jus", 3.0);
$distributeur->acheter("The", 2.0);
$distributeur->acheter("Sprite", 2.0);
$distributeur->acheter("Pepsi", 2.0);

$distributeur->remplir("The", 3);

$distributeur->acheter("The", 2.0);

$distributeur->afficherProduits();

echo "Recette totale : " . $distributeur->getRecette() . "€\n";

?>