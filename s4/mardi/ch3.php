<?php

final class Config {
    private string $dbUser;
    private string $dbPassword;
    private string $secretKey;
    private string $mode;

    public function __construct(string $dbUser, string $dbPassword, string $secretKey, string $mode) {
        $this->dbUser = $dbUser;
        $this->dbPassword = $dbPassword;
        $this->secretKey = $secretKey;
        $this->mode = $mode;
    }

    public function getDbUser(): string {
        return $this->dbUser;
    }

    public function getDbPassword(): string {
        return $this->dbPassword;
    }

    public function getSecretKey(): string {
        return $this->secretKey;
    }

    public function getMode(): string {
        return $this->mode;
    }

    final public function chiffrer(string $texte, int $decalage = 3): string {
        $resultat = '';
        for ($i = 0; $i < strlen($texte); $i++) {
            $char = $texte[$i];
            if (ctype_alpha($char)) {
                $base = ctype_lower($char) ? ord('a') : ord('A');
                $resultat .= chr(($base + (ord($char) - $base + $decalage) % 26));
            } else {
                $resultat .= $char;
            }
        }
        return $resultat;
    }

    final public function masquerMotDePasse(string $password): string {
        if (strlen($password) <= 4) {
            return str_repeat('*', strlen($password));
        }

        $debut = substr($password, 0, 2);
        $fin = substr($password, -2);
        return $debut . str_repeat('*', strlen($password) - 4) . $fin;
    }
}


/**
 * 
 */

$config = new Config("admin", "password", "SECRET123", "prod");

echo $config->chiffrer("Bonjour") . "\n";
echo $config->masquerMotDePasse("password") . "\n";


class CustomConfig extends Config {
}