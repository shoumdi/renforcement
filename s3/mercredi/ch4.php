<?php

abstract class Transport {
    protected $nom;
    protected $vitesse_max;
    protected $capacite_passagers;
    protected $consommation;

    public function __construct($nom, $vitesse_max, $capacite_passagers, $consommation) {
        $this->nom = $nom;
        $this->vitesse_max = $vitesse_max;
        $this->capacite_passagers = $capacite_passagers;
        $this->consommation = $consommation;
    }

    public function tempsTrajet($distanceKm) {
        return $distanceKm / $this->vitesse_max;
    }

    abstract public function calculerCoutTrajet($distanceKm, $nbPassagers);

    public function getNom() {
        return $this->nom;
    }
}

class Voiture extends Transport {

    public function __construct() {
        parent::__construct("Voiture", 130, 5, 7);
    }

    public function calculerCoutTrajet($distanceKm, $nbPassagers) {
        $prixCarburant = 1.8;
        $litres = ($distanceKm / 100) * $this->consommation;
        $coutTotal = $litres * $prixCarburant;
        return $coutTotal / $nbPassagers;
    }
}

class Train extends Transport {

    public function __construct() {
        parent::__construct("Train", 300, 500, 30);
    }

    public function calculerCoutTrajet($distanceKm, $nbPassagers) {
        $prixElec = 0.15;
        $kwh = ($distanceKm / 100) * $this->consommation;
        $coutTotal = $kwh * $prixElec;
        return $coutTotal / $nbPassagers;
    }
}

class Avion extends Transport {

    public function __construct() {
        parent::__construct("Avion", 900, 180, 250);
    }

    public function calculerCoutTrajet($distanceKm, $nbPassagers) {
        $prixKero = 2.5;
        $litres = ($distanceKm / 100) * $this->consommation;
        $coutTotal = $litres * $prixKero;
        return $coutTotal / $nbPassagers;
    }
}

$distance = 775;
$passagers = 4;

$transports = [
    new Voiture(),
    new Train(),
    new Avion()
];

$plusRapide = null;
$moinsCher = null;
$tempsMin = PHP_INT_MAX;
$coutMin = PHP_INT_MAX;

foreach ($transports as $t) {
    $temps = $t->tempsTrajet($distance);
    $cout = $t->calculerCoutTrajet($distance, $passagers);

    echo $t->getNom() . " :\n";
    echo "- Temps : " . round($temps, 2) . " h\n";
    echo "- Cout / personne : " . round($cout, 2) . " €\n\n";

    if ($temps < $tempsMin) {
        $tempsMin = $temps;
        $plusRapide = $t->getNom();
    }

    if ($cout < $coutMin) {
        $coutMin = $cout;
        $moinsCher = $t->getNom();
    }
}

echo "Plus rapide : {$plusRapide}\n";
echo "Moins cher : {$moinsCher}\n";

?>