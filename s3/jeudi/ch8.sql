
-- Écris une requête qui utilise une sous-requête dans le WHERE

SELECT *
FROM gares
WHERE id IN (
    SELECT a.gare_id
    FROM arrets a
    JOIN lignes l ON l.id = a.ligne_id
    WHERE l.type = 'TGV'
);


-- Écris une requête qui utilise une sous-requête dans le SELECT (sous-requête scalaire)
SELECT 
    l.nom,
    SUM(b.prix) AS ca_ligne,
    (SELECT AVG(prix) FROM billets) AS ca_moyen_global
FROM lignes l
JOIN billets b ON b.ligne_id = l.id
GROUP BY l.id, l.nom;


-- Écris une requête qui utilise une jointure sur 4 tables
SELECT 
    v.nom AS voyageur,
    l.nom AS ligne,
    g1.nom AS gare_depart,
    g2.nom AS gare_arrivee,
    b.prix,
    b.date_voyage
FROM billets b
JOIN voyageurs v ON v.id = b.voyageur_id
JOIN lignes l ON l.id = b.ligne_id
JOIN gares g1 ON g1.id = b.gare_depart_id
JOIN gares g2 ON g2.id = b.gare_arrivee_id;


-- Écris une requête qui trouve les enregistrements qui N'ONT PAS de correspondance dans une autre table
SELECT g.*
FROM gares g
LEFT JOIN billets b ON b.gare_depart_id = g.id
WHERE b.id IS NULL;


-- Écris une requête qui calcule un classement (le N-ième meilleur de quelque chose)
SELECT *
FROM (
    SELECT 
        v.nom,
        SUM(b.prix) AS total_depense,
        DENSE_RANK() OVER (ORDER BY SUM(b.prix) DESC) AS classement
    FROM voyageurs v
    JOIN billets b ON b.voyageur_id = v.id
    GROUP BY v.id, v.nom
) t
WHERE classement = 2;