<?php

class Bibliotheque {
    private $livres = [];
    private $emprunts = [];

    public function __construct($livresInitiaux) {
        $this->livres = $livresInitiaux;
    }

    public function emprunter($titre, $emprunteur) {
        foreach ($this->livres as &$livre) {
            if ($livre["titre"] === $titre) {

                if (!$livre["disponible"]) {
                    echo "Livre {$titre} indisponible\n";
                    return;
                }

                $dateEmprunt = new DateTime();
                $dateRetourPrevue = (clone $dateEmprunt)->modify("+14 days");

                $this->emprunts[] = [
                    "livre" => $titre,
                    "emprunteur" => $emprunteur,
                    "date_emprunt" => $dateEmprunt,
                    "date_retour_prevue" => $dateRetourPrevue,
                    "date_retour_effectif" => null,
                    "amende" => 0
                ];

                $livre["disponible"] = false;

                echo "{$emprunteur} a emprunte {$titre}\n";
                return;
            }
        }

        echo "Livre {$titre} introuvable\n";
    }

    public function retourner($titre) {
        foreach ($this->emprunts as &$emprunt) {
            if ($emprunt["livre"] === $titre && $emprunt["date_retour_effectif"] === null) {

                $dateRetour = new DateTime();
                $emprunt["date_retour_effectif"] = $dateRetour;

                $retard = 0;
                if ($dateRetour > $emprunt["date_retour_prevue"]) {
                    $diff = $emprunt["date_retour_prevue"]->diff($dateRetour);
                    $retard = $diff->days;
                }

                $amende = $retard * 0.5;
                $emprunt["amende"] = $amende;

                foreach ($this->livres as &$livre) {
                    if ($livre["titre"] === $titre) {
                        $livre["disponible"] = true;
                        break;
                    }
                }

                echo "Retour de {$titre} | Retard: {$retard} jours | Amende: {$amende}€\n";
                return;
            }
        }

        echo "Aucun emprunt trouve pour {$titre}\n";
    }

    public function getAmendes($emprunteur) {
        $total = 0;

        foreach ($this->emprunts as $emprunt) {
            if ($emprunt["emprunteur"] === $emprunteur) {
                $total += $emprunt["amende"];
            }
        }

        return $total;
    }

    public function getStatistiques() {
        $disponibles = 0;
        $empruntes = 0;
        $totalAmendes = 0;
        $retardsParPersonne = [];

        foreach ($this->livres as $livre) {
            if ($livre["disponible"]) {
                $disponibles++;
            } else {
                $empruntes++;
            }
        }

        foreach ($this->emprunts as $emprunt) {
            $totalAmendes += $emprunt["amende"];

            if ($emprunt["date_retour_effectif"] !== null &&
                $emprunt["date_retour_effectif"] > $emprunt["date_retour_prevue"]) {

                $retard = $emprunt["date_retour_prevue"]->diff($emprunt["date_retour_effectif"])->days;

                if (!isset($retardsParPersonne[$emprunt["emprunteur"]])) {
                    $retardsParPersonne[$emprunt["emprunteur"]] = 0;
                }

                $retardsParPersonne[$emprunt["emprunteur"]] += $retard;
            }
        }

        $maxRetard = 0;
        $pireEmprunteur = "Aucun";

        foreach ($retardsParPersonne as $nom => $retard) {
            if ($retard > $maxRetard) {
                $maxRetard = $retard;
                $pireEmprunteur = $nom;
            }
        }

        echo "Livres disponibles: {$disponibles}\n";
        echo "Livres empruntes: {$empruntes}\n";
        echo "Total amendes: {$totalAmendes}€\n";
        echo "Plus en retard: {$pireEmprunteur} ({$maxRetard} jours)\n";
    }
}

$livres = [
    ["titre" => "1984", "auteur" => "Orwell", "disponible" => true],
    ["titre" => "Dune", "auteur" => "Herbert", "disponible" => true],
    ["titre" => "Sapiens", "auteur" => "Harari", "disponible" => true],
    ["titre" => "Hamlet", "auteur" => "Shakespeare", "disponible" => true],
];

$biblio = new Bibliotheque($livres);

$biblio->emprunter("1984", "Alice");
$biblio->emprunter("Dune", "Bob");
$biblio->emprunter("Sapiens", "Alice");

sleep(2);

$biblio->retourner("1984");
$biblio->retourner("Dune");

echo "Amendes Alice: " . $biblio->getAmendes("Alice") . "€\n";

$biblio->getStatistiques();

?>