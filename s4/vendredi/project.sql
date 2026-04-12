
CREATE TABLE utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100)
);

CREATE TABLE abonnements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type VARCHAR(20),
    statut VARCHAR(20),
    date_debut DATETIME,
    date_fin DATETIME,
    mode_paiement VARCHAR(20)
);

CREATE TABLE paiements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    montant DECIMAL(10,2),
    date_paiement DATETIME
);

CREATE TABLE factures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    montant DECIMAL(10,2),
    mois INT,
    annee INT,
    statut VARCHAR(20)
);


DELIMITER //

CREATE PROCEDURE Souscrire (
    IN p_user_id INT,
    IN p_type VARCHAR(20),
    IN p_mode VARCHAR(20)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO abonnements(user_id, type, statut, date_debut, mode_paiement)
    VALUES (p_user_id, p_type, 'actif', NOW(), p_mode);

    INSERT INTO paiements(user_id, montant, date_paiement)
    VALUES (
        p_user_id,
        CASE p_type
            WHEN 'basic' THEN 9.99
            WHEN 'standard' THEN 13.99
            WHEN 'premium' THEN 17.99
        END,
        NOW()
    );

    COMMIT;
END //


CREATE PROCEDURE FacturationMensuelle()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO factures(user_id, montant, mois, annee, statut)
    SELECT
        user_id,
        CASE type
            WHEN 'basic' THEN 9.99
            WHEN 'standard' THEN 13.99
            WHEN 'premium' THEN 17.99
        END,
        MONTH(NOW()),
        YEAR(NOW()),
        'impaye'
    FROM abonnements
    WHERE statut = 'actif';

    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION CalculerRevenuMensuel()
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE mrr DECIMAL(10,2);

    SELECT SUM(
        CASE type
            WHEN 'basic' THEN 9.99
            WHEN 'standard' THEN 13.99
            WHEN 'premium' THEN 17.99
        END
    )
    INTO mrr
    FROM abonnements
    WHERE statut = 'actif';

    RETURN IFNULL(mrr, 0);
END //

DELIMITER ;


CREATE VIEW vue_kpis AS
SELECT
    a.type,

    COUNT(CASE WHEN a.statut = 'actif' THEN 1 END) AS abonnes_actifs,

    (SELECT CalculerRevenuMensuel()) AS mrr,

    (
        SELECT COUNT(*) * 1.0 /
        NULLIF((SELECT COUNT(*) FROM abonnements), 0)
        FROM abonnements
        WHERE statut = 'resilie'
          AND MONTH(date_fin) = MONTH(NOW())
    ) AS taux_resiliation_mois,

    (SELECT AVG(montant) FROM factures) AS revenu_moyen_utilisateur

FROM abonnements a
GROUP BY a.type;

-- indexes

CREATE INDEX idx_abonnements_user ON abonnements(user_id);
CREATE INDEX idx_abonnements_type ON abonnements(type);
CREATE INDEX idx_abonnements_statut ON abonnements(statut);
CREATE INDEX idx_factures_user ON factures(user_id);
CREATE INDEX idx_factures_date ON factures(mois, annee);