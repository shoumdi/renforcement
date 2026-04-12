DELIMITER //

CREATE FUNCTION CalculerTTC(montant_ht DECIMAL(10,2), categorie VARCHAR(50))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE taux DECIMAL(5,2);

    SET taux = CASE 
        WHEN categorie = 'standard' THEN 0.20
        WHEN categorie IN ('alimentaire', 'livre') THEN 0.055
        WHEN categorie = 'service' THEN 0.10
        ELSE 0.20
    END;

    RETURN montant_ht * (1 + taux);
END //

CREATE FUNCTION CalculerAge(date_naissance DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, date_naissance, CURDATE());
END //

CREATE FUNCTION StatutFidelite(total DECIMAL(10,2))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    RETURN CASE
        WHEN total < 500 THEN 'Bronze'
        WHEN total < 2000 THEN 'Silver'
        WHEN total < 5000 THEN 'Gold'
        ELSE 'Platinum'
    END;
END //

DELIMITER ;


--tests
SELECT CalculerTTC(100, 'standard') AS ttc_standard;
SELECT CalculerTTC(100, 'alimentaire') AS ttc_alimentaire;
SELECT CalculerTTC(100, 'service') AS ttc_service;

SELECT CalculerAge('1990-04-10') AS age;

SELECT StatutFidelite(300) AS statut1;
SELECT StatutFidelite(1500) AS statut2;
SELECT StatutFidelite(3000) AS statut3;
SELECT StatutFidelite(6000) AS statut4;