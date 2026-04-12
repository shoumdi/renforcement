<?php

class Cinema {
    private $salles = [];

    public function ajouterSalle($nom, $nbPlaces) {
        $this->salles[$nom] = [
            "places" => $nbPlaces,
            "reservations" => []
        ];
    }

    public function reserver($nomSalle, $nomClient, $nbPlaces) {
        if (!isset($this->salles[$nomSalle])) {
            echo "Salle {$nomSalle} introuvable\n";
            return;
        }

        $total = $this->salles[$nomSalle]["places"];
        $reservees = array_sum($this->salles[$nomSalle]["reservations"]);
        $disponibles = $total - $reservees;

        if ($nbPlaces > $disponibles) {
            echo "Pas assez de places dans {$nomSalle}\n";
            return;
        }

        if (isset($this->salles[$nomSalle]["reservations"][$nomClient])) {
            $this->salles[$nomSalle]["reservations"][$nomClient] += $nbPlaces;
        } else {
            $this->salles[$nomSalle]["reservations"][$nomClient] = $nbPlaces;
        }

        echo "Reservation reussie pour {$nomClient} ({$nbPlaces} places) dans {$nomSalle}\n";
    }

    public function annulerReservation($nomSalle, $nomClient) {
        if (!isset($this->salles[$nomSalle])) {
            echo "Salle {$nomSalle} introuvable\n";
            return;
        }

        if (!isset($this->salles[$nomSalle]["reservations"][$nomClient])) {
            echo "Reservation introuvable pour {$nomClient} dans {$nomSalle}\n";
            return;
        }

        unset($this->salles[$nomSalle]["reservations"][$nomClient]);
        echo "Reservation annulee pour {$nomClient} dans {$nomSalle}\n";
    }

    public function afficherOccupation() {
        echo "=== Occupation des salles ===\n";
        foreach ($this->salles as $nom => $salle) {
            $total = $salle["places"];
            $reservees = array_sum($salle["reservations"]);
            $pourcentage = $total > 0 ? ($reservees / $total) * 100 : 0;

            echo "{$nom} : {$reservees}/{$total} (" . round($pourcentage, 2) . "%)\n";
        }
        echo "\n";
    }

    public function getRevenusEstimes($prixBillet) {
        $totalPlaces = 0;

        foreach ($this->salles as $salle) {
            $totalPlaces += array_sum($salle["reservations"]);
        }

        return $totalPlaces * $prixBillet;
    }
}

$cinema = new Cinema();

$cinema->ajouterSalle("Salle 1", 50);
$cinema->ajouterSalle("Salle 2", 30);
$cinema->ajouterSalle("Salle 3", 20);

$cinema->reserver("Salle 1", "Alice", 5);
$cinema->reserver("Salle 1", "Bob", 10);
$cinema->reserver("Salle 1", "Charlie", 20);
$cinema->reserver("Salle 2", "David", 10);
$cinema->reserver("Salle 2", "Eve", 15);
$cinema->reserver("Salle 3", "Frank", 5);
$cinema->reserver("Salle 3", "Grace", 10);
$cinema->reserver("Salle 3", "Heidi", 10);
$cinema->reserver("Salle 2", "Ivan", 10);
$cinema->reserver("Salle 1", "Judy", 20);

$cinema->annulerReservation("Salle 3", "Heidi");

$cinema->afficherOccupation();

echo "Revenus estimes : " . $cinema->getRevenusEstimes(10) . "€\n";

?>