

-- indexes

CREATE INDEX idx_commandes_date ON commandes(date_commande);
CREATE INDEX idx_commandes_client ON commandes(client_id);
CREATE INDEX idx_lignes_commande ON commandes_lignes(commande_id);
CREATE INDEX idx_lignes_produit ON commandes_lignes(produit_id);
CREATE INDEX idx_clients_id ON clients(id);


--vues
CREATE VIEW vue_tableau_bord AS
SELECT
    (SELECT COUNT(*) FROM clients) AS total_clients,

    (SELECT COUNT(*)
     FROM commandes
     WHERE MONTH(date_commande) = MONTH(CURDATE())
       AND YEAR(date_commande) = YEAR(CURDATE())
    ) AS commandes_mois,

    (SELECT COALESCE(SUM(total),0)
     FROM commandes
     WHERE MONTH(date_commande) = MONTH(CURDATE())
       AND YEAR(date_commande) = YEAR(CURDATE())
    ) AS chiffre_affaires_mois,

    (SELECT COALESCE(AVG(total),0)
     FROM commandes
     WHERE MONTH(date_commande) = MONTH(CURDATE())
       AND YEAR(date_commande) = YEAR(CURDATE())
    ) AS panier_moyen,

    (
        SELECT GROUP_CONCAT(nom SEPARATOR ', ')
        FROM (
            SELECT p.nom
            FROM produits p
            JOIN commandes_lignes cl ON p.id = cl.produit_id
            JOIN commandes c ON c.id = cl.commande_id
            WHERE MONTH(c.date_commande) = MONTH(CURDATE())
              AND YEAR(c.date_commande) = YEAR(CURDATE())
            GROUP BY p.id
            ORDER BY SUM(cl.quantite) DESC
            LIMIT 5
        ) top5
    ) AS top_5_produits;


-- creating vue for clients vip

CREATE VIEW vue_clients_vip AS
SELECT
    c.id,
    c.nom,
    SUM(cmd.total) AS total_achats,
    COUNT(cmd.id) AS nb_commandes,
    MAX(cmd.date_commande) AS derniere_commande,
    CASE
        WHEN SUM(cmd.total) < 500 THEN 'Bronze'
        WHEN SUM(cmd.total) < 2000 THEN 'Silver'
        WHEN SUM(cmd.total) < 5000 THEN 'Gold'
        ELSE 'Platinum'
    END AS statut
FROM clients c
JOIN commandes cmd ON c.id = cmd.client_id
GROUP BY c.id, c.nom
HAVING statut IN ('Gold', 'Platinum');


-- test performance

EXPLAIN SELECT * FROM vue_tableau_bord;

EXPLAIN SELECT * FROM vue_clients_vip;