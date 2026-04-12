<?php

class Logger {
    private static array $logs = [];

    private function __construct() {}

    public static function log(string $niveau, string $message): void {
        self::$logs[] = [
            'niveau' => strtoupper($niveau),
            'message' => $message,
            'date' => date('Y-m-d H:i:s')
        ];
    }

    public static function getLogs(): array {
        return self::$logs;
    }

    public static function filtrerParNiveau(string $niveau): array {
        return array_filter(self::$logs, fn($log) => $log['niveau'] === strtoupper($niveau));
    }

    public static function compterErreurs(): int {
        return count(self::filtrerParNiveau('ERROR'));
    }

    public static function vider(): void {
        self::$logs = [];
    }

    public static function exporter(): string {
        return implode("\n", array_map(function ($log) {
            return "[{$log['date']}] {$log['niveau']} : {$log['message']}";
        }, self::$logs));
    }
}


class CompteurInstances {
    private static int $count = 0;

    public function __construct() {
        self::$count++;
    }

    public static function getCount(): int {
        return self::$count;
    }
}


/**
 * tests
 */

Logger::log('info', 'Application démarrée');
Logger::log('error', 'Erreur critique');
Logger::log('warning', 'Attention');
Logger::log('debug', 'Debug info');

echo Logger::exporter() . "\n\n";

echo "Erreurs : " . Logger::compterErreurs() . "\n\n";

print_r(Logger::filtrerParNiveau('ERROR'));

Logger::vider();

echo "Logs après vidage : ";
print_r(Logger::getLogs());


$a = new CompteurInstances();
$b = new CompteurInstances();
$c = new CompteurInstances();

echo "\nInstances créées : " . CompteurInstances::getCount();