CREATE TABLE comptes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    type ENUM('courant','epargne'),
    solde DECIMAL(10,2),
    taux_annuel DECIMAL(5,2) DEFAULT 0
);

CREATE TABLE operations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_id INT,
    date_operation DATETIME,
    montant DECIMAL(10,2)
);

CREATE TABLE soldes_moyens (
    compte_id INT,
    mois INT,
    annee INT,
    solde_moyen DECIMAL(10,2)
);

CREATE TABLE releves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    mois INT,
    annee INT,
    nb_operations INT,
    total_debits DECIMAL(10,2),
    total_credits DECIMAL(10,2),
    solde_final DECIMAL(10,2)
);

CREATE PROCEDURE ClotureMensuelle (
    IN p_mois INT,
    IN p_annee INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE comptes
    SET solde = solde + (solde * (taux_annuel / 100) / 12)
    WHERE type = 'epargne';

    UPDATE comptes c
    JOIN soldes_moyens s ON c.id = s.compte_id
    SET c.solde = c.solde - 2
    WHERE c.type = 'courant'
      AND s.mois = p_mois
      AND s.annee = p_annee
      AND s.solde_moyen < 1000;

    INSERT INTO releves (client_id, mois, annee, nb_operations, total_debits, total_credits, solde_final)
    SELECT 
        c.client_id,
        p_mois,
        p_annee,
        COUNT(o.id),
        COALESCE(SUM(CASE WHEN o.montant < 0 THEN o.montant ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN o.montant > 0 THEN o.montant ELSE 0 END), 0),
        c.solde
    FROM comptes c
    LEFT JOIN operations o 
        ON c.id = o.compte_id
        AND MONTH(o.date_operation) = p_mois
        AND YEAR(o.date_operation) = p_annee
    GROUP BY c.client_id;

    COMMIT;
END 


--tests

INSERT INTO comptes (client_id, type, solde, taux_annuel) VALUES (1, 'epargne', 1000, 3);
INSERT INTO comptes (client_id, type, solde, taux_annuel) VALUES (1, 'courant', 800, 0);

INSERT INTO soldes_moyens VALUES (2, 4, 2026, 900);

INSERT INTO operations (compte_id, date_operation, montant) VALUES (1, NOW(), 100);
INSERT INTO operations (compte_id, date_operation, montant) VALUES (1, NOW(), -50);
INSERT INTO operations (compte_id, date_operation, montant) VALUES (2, NOW(), -20);

CALL ClotureMensuelle(4, 2026);

SELECT * FROM comptes;
SELECT * FROM releves;