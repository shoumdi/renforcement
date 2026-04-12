CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100),
    actif BOOLEAN DEFAULT TRUE,
    credit DECIMAL(10,2) DEFAULT 0,
    code_parrain VARCHAR(50) UNIQUE
);

DELIMITER //

CREATE PROCEDURE Parrainer (
    IN p_parrain_id INT,
    IN p_nom VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_code_parrain VARCHAR(50)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_parrain_actif BOOLEAN;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    SELECT COUNT(*), actif INTO v_count, v_parrain_actif
    FROM clients
    WHERE id = p_parrain_id;

    IF v_count = 0 OR v_parrain_actif = FALSE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Parrain invalide';
    END IF;

    SELECT COUNT(*) INTO v_count
    FROM clients
    WHERE code_parrain = p_code_parrain;

    IF v_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Code parrain invalide';
    END IF;

    INSERT INTO clients (nom, email, actif, credit, code_parrain)
    VALUES (p_nom, p_email, TRUE, 0, UUID());

    SET @filleul_id = LAST_INSERT_ID();

    UPDATE clients
    SET credit = credit + 10
    WHERE id = p_parrain_id;

    UPDATE clients
    SET credit = credit + 5
    WHERE id = @filleul_id;

    COMMIT;
END //

DELIMITER ;


-- tests

INSERT INTO clients (nom, email, actif, credit, code_parrain)
VALUES ('Alice', 'alice@mail.com', TRUE, 0, 'CODE123');

CALL Parrainer(1, 'Bob', 'bob@mail.com', 'CODE123');

SELECT * FROM clients;


-- cas (échec)
CALL Parrainer(999, 'Charlie', 'charlie@mail.com', 'CODE123');

SELECT * FROM clients;