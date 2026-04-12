<?php

interface Abonnement {
    public function souscrire(): void;
    public function resilier(): void;
    public function calculerPrix(bool $annuel = false): float;
    public function estActif(): bool;
    public function getType(): string;
}

final class TarifConfig {
    public const BASIC = 9.99;
    public const STANDARD = 13.99;
    public const PREMIUM = 17.99;
}

abstract class AbonnementBase implements Abonnement {
    protected bool $actif = false;
    protected bool $annuel = false;
    protected ?DateTime $debut = null;

    public function souscrire(): void {
        $this->actif = true;
        $this->debut = new DateTime();
    }

    public function resilier(): void {
        $this->actif = false;
    }

    public function estActif(): bool {
        return $this->actif;
    }
}

class AbonnementBasic extends AbonnementBase {
    public function calculerPrix(bool $annuel = false): float {
        return TarifConfig::BASIC;
    }

    public function getType(): string {
        return "basic";
    }
}

class AbonnementStandard extends AbonnementBase {
    public function calculerPrix(bool $annuel = false): float {
        $prix = TarifConfig::STANDARD;
        if ($annuel) $prix *= 0.90;
        return $prix;
    }

    public function getType(): string {
        return "standard";
    }
}

class AbonnementPremium extends AbonnementBase {
    public function calculerPrix(bool $annuel = false): float {
        if ($this->debut && (new DateTime())->diff($this->debut)->days <= 30) {
            return 0;
        }

        $prix = TarifConfig::PREMIUM;
        if ($annuel) $prix *= 0.85;
        return $prix;
    }

    public function getType(): string {
        return "premium";
    }
}

class Utilisateur {
    public int $id;
    public string $nom;
    public Abonnement $abonnement;
    public array $historiquePaiements = [];
    public DateTime $dateInscription;

    private static array $compteurs = [
        'basic' => 0,
        'standard' => 0,
        'premium' => 0
    ];

    public function __construct(int $id, string $nom, Abonnement $abonnement) {
        $this->id = $id;
        $this->nom = $nom;
        $this->abonnement = $abonnement;
        $this->dateInscription = new DateTime();

        self::$compteurs[$abonnement->getType()]++;
    }

    public static function getNombreAbonnes(string $type): int {
        return self::$compteurs[$type] ?? 0;
    }
}