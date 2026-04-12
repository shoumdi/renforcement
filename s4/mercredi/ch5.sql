CREATE TABLE comptes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solde DECIMAL(10,2) NOT NULL DEFAULT 0,
    decouvert_autorise DECIMAL(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE historique_virements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_operation DATETIME,
    montant DECIMAL(10,2),
    compte_source INT,
    compte_destination INT,
    statut VARCHAR(20)
);

DELIMITER //

CREATE PROCEDURE Virement (
    IN p_source INT,
    IN p_destination INT,
    IN p_montant DECIMAL(10,2)
)
BEGIN
    DECLARE v_solde DECIMAL(10,2);
    DECLARE v_decouvert DECIMAL(10,2);
    DECLARE v_count INT;
    DECLARE v_operation_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        UPDATE historique_virements
        SET statut = 'echouee'
        WHERE id = v_operation_id;
    END;

    START TRANSACTION;

    INSERT INTO historique_virements (date_operation, montant, compte_source, compte_destination, statut)
    VALUES (NOW(), p_montant, p_source, p_destination, 'en_cours');

    SET v_operation_id = LAST_INSERT_ID();

    SELECT COUNT(*) INTO v_count FROM comptes WHERE id = p_source;
    IF v_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Compte source inexistant';
    END IF;

    SELECT COUNT(*) INTO v_count FROM comptes WHERE id = p_destination;
    IF v_count = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Compte destination inexistant';
    END IF;

    SELECT solde, decouvert_autorise INTO v_solde, v_decouvert
    FROM comptes
    WHERE id = p_source
    FOR UPDATE;

    IF (v_solde - p_montant) < -v_decouvert THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Solde insuffisant';
    END IF;

    UPDATE comptes
    SET solde = solde - p_montant
    WHERE id = p_source;

    UPDATE comptes
    SET solde = solde + p_montant
    WHERE id = p_destination;

    UPDATE historique_virements
    SET statut = 'reussie'
    WHERE id = v_operation_id;

    COMMIT;
END //



-- tests

INSERT INTO comptes (solde, decouvert_autorise) VALUES (100, 50);
INSERT INTO comptes (solde, decouvert_autorise) VALUES (50, 0);

CALL Virement(1, 2, 80);

SELECT * FROM comptes;
SELECT * FROM historique_virements;


-- cas échec
CALL Virement(1, 2, 500);

SELECT * FROM comptes;
SELECT * FROM historique_virements;