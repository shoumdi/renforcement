<?php

abstract class Vehicule {
    protected $immatriculation;
    protected $marque;
    protected $modele;
    protected $kilometrage;
    protected $prixJournalier;
    protected $disponible;

    public function __construct($immatriculation, $marque, $modele, $kilometrage, $prixJournalier) {
        $this->immatriculation = $immatriculation;
        $this->marque = $marque;
        $this->modele = $modele;
        $this->kilometrage = $kilometrage;
        $this->prixJournalier = $prixJournalier;
        $this->disponible = true;
    }

    public function estDisponible() {
        return $this->disponible;
    }

    public function setDisponible($val) {
        $this->disponible = $val;
    }

    public function getImmatriculation() {
        return $this->immatriculation;
    }

    public function getPrixJournalier() {
        return $this->prixJournalier;
    }

    abstract public function calculerPrixLocation($nbJours);
}

class VoitureCitadine extends Vehicule {
    public function calculerPrixLocation($nbJours) {
        $prix = $this->prixJournalier * $nbJours;

        if ($nbJours >= 7) {
            $prix *= 0.9;
        }

        return $prix;
    }
}

class SUV extends Vehicule {
    public function calculerPrixLocation($nbJours) {
        $prixBase = $this->prixJournalier * $nbJours;
        return $prixBase + (15 * $nbJours);
    }
}

class Utilitaire extends Vehicule {
    private $tonnage;

    public function __construct($immat, $marque, $modele, $km, $prix, $tonnage) {
        parent::__construct($immat, $marque, $modele, $km, $prix);
        $this->tonnage = $tonnage;
    }

    public function calculerPrixLocation($nbJours) {
        $prixBase = $this->prixJournalier * $nbJours;
        return $prixBase + (5 * $nbJours * $this->tonnage);
    }
}

class Location {
    private $vehicule;
    private $client;
    private $date_debut;
    private $date_fin;
    private $montant;
    private $statut;

    public function __construct($vehicule, $client, $date_debut, $date_fin) {
        $this->vehicule = $vehicule;
        $this->client = $client;
        $this->date_debut = new DateTime($date_debut);
        $this->date_fin = new DateTime($date_fin);
        $this->statut = "en cours";
        $this->montant = 0;
    }

    public function calculerMontant() {
        $jours = $this->date_debut->diff($this->date_fin)->days;
        $this->montant = $this->vehicule->calculerPrixLocation($jours);
        return $this->montant;
    }

    public function getVehicule() {
        return $this->vehicule;
    }

    public function terminer() {
        $this->statut = "terminee";
        $this->vehicule->setDisponible(true);
    }

    public function getStatut() {
        return $this->statut;
    }

    public function getMontant() {
        return $this->montant;
    }
}

class Agence {
    private $vehicules = [];
    private $locations = [];

    public function ajouterVehicule($v) {
        $this->vehicules[] = $v;
    }

    public function louer($immat, $client, $date_debut, $date_fin) {
        foreach ($this->vehicules as $v) {
            if ($v->getImmatriculation() === $immat && $v->estDisponible()) {

                $location = new Location($v, $client, $date_debut, $date_fin);
                $location->calculerMontant();

                $v->setDisponible(false);

                $this->locations[] = $location;

                return $location;
            }
        }

        return null;
    }

    public function retourner($location) {
        $location->terminer();
    }

    public function statistiques() {
        $caParType = [];
        $nbLocations = [];
        $total = count($this->locations);

        $vehiculePlusLoue = null;
        $max = 0;

        foreach ($this->locations as $loc) {
            $v = $loc->getVehicule();
            $type = get_class($v);

            if (!isset($caParType[$type])) {
                $caParType[$type] = 0;
                $nbLocations[$type] = 0;
            }

            $caParType[$type] += $loc->getMontant();
            $nbLocations[$type]++;

            if ($nbLocations[$type] > $max) {
                $max = $nbLocations[$type];
                $vehiculePlusLoue = $type;
            }
        }

        echo " STATISTIQUES \n";
        echo "Taux occupation: " . round(($total / count($this->vehicules)) * 100, 2) . "%\n";

        echo "\nCA par type:\n";
        foreach ($caParType as $type => $ca) {
            echo "$type : $ca €\n";
        }

        echo "\nType le plus loue : $vehiculePlusLoue\n";
    }
}
