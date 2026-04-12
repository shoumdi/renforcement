<?php

abstract class Employe {
    protected $nom;
    protected $prenom;
    protected $date_embauche;
    protected $salaire_base;

    public function __construct($nom, $prenom, $date_embauche, $salaire_base) {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->date_embauche = new DateTime($date_embauche);
        $this->salaire_base = $salaire_base;
    }

    public function anciennete() {
        $now = new DateTime();
        return $this->date_embauche->diff($now)->y;
    }

    abstract public function calculerSalaire();

    public function getNomComplet() {
        return $this->prenom . " " . $this->nom;
    }

    public function getType() {
        return get_class($this);
    }
}

class Developpeur extends Employe {

    public function calculerSalaire() {
        $anciennete = $this->anciennete();
        $salaire = $this->salaire_base + (500 * $anciennete);

        if ($anciennete > 5) {
            $salaire += 0.1 * $this->salaire_base;
        }

        return $salaire;
    }
}

class Commercial extends Employe {
    private $ca_mensuel;
    private $taux_commission;

    public function __construct($nom, $prenom, $date_embauche, $salaire_base, $ca_mensuel, $taux_commission) {
        parent::__construct($nom, $prenom, $date_embauche, $salaire_base);
        $this->ca_mensuel = $ca_mensuel;
        $this->taux_commission = $taux_commission;
    }

    public function calculerSalaire() {
        return $this->salaire_base + ($this->ca_mensuel * $this->taux_commission);
    }
}

class Manager extends Employe {
    private $taille_equipe;

    public function __construct($nom, $prenom, $date_embauche, $salaire_base, $taille_equipe) {
        parent::__construct($nom, $prenom, $date_embauche, $salaire_base);
        $this->taille_equipe = $taille_equipe;
    }

    public function calculerSalaire() {
        $salaire = $this->salaire_base + (200 * $this->taille_equipe);

        if ($this->taille_equipe > 10) {
            $salaire *= 1.15;
        }

        return $salaire;
    }
}

$employes = [
    new Developpeur("Dupont", "Alice", "2015-06-01", 3000),
    new Developpeur("Martin", "Bob", "2021-03-15", 2800),

    new Commercial("Durand", "Charlie", "2018-01-10", 2500, 20000, 0.05),
    new Commercial("Bernard", "Diane", "2022-07-20", 2300, 15000, 0.04),

    new Manager("Petit", "Eva", "2010-09-01", 4000, 12),
    new Manager("Moreau", "Frank", "2019-11-11", 3500, 8),
];

$masseSalariale = 0;
$maxSalaire = 0;
$meilleurEmploye = "";

$salairesParType = [];
$compteParType = [];

foreach ($employes as $e) {
    $salaire = $e->calculerSalaire();
    $type = $e->getType();

    echo $e->getNomComplet() . " ({$type}) : " . round($salaire, 2) . "€\n";

    $masseSalariale += $salaire;

    if ($salaire > $maxSalaire) {
        $maxSalaire = $salaire;
        $meilleurEmploye = $e->getNomComplet();
    }

    if (!isset($salairesParType[$type])) {
        $salairesParType[$type] = 0;
        $compteParType[$type] = 0;
    }

    $salairesParType[$type] += $salaire;
    $compteParType[$type]++;
}

echo "\nMasse salariale totale : " . round($masseSalariale, 2) . "€\n";
echo "Employe le mieux paye : {$meilleurEmploye} ({$maxSalaire}€)\n\n";

echo "Salaire moyen par type :\n";

foreach ($salairesParType as $type => $total) {
    $moyenne = $total / $compteParType[$type];
    echo "{$type} : " . round($moyenne, 2) . "€\n";
}

?>