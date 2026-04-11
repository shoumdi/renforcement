CREATE TABLE
    medecins (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(100) NOT NULL,
        specialite VARCHAR(100)
    );

CREATE TABLE
    patients (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(100) NOT NULL,
        date_naissance DATE
    );

CREATE TABLE
    consultations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        medecin_id INT,
        patient_id INT,
        date_consultation DATE,
        diagnostic TEXT,
        cout DECIMAL(10, 2),
        FOREIGN KEY (medecin_id) REFERENCES medecins (id),
        FOREIGN KEY (patient_id) REFERENCES patients (id)
    );

CREATE TABLE
    prescriptions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        consultation_id INT,
        medicament VARCHAR(150),
        posologie TEXT,
        FOREIGN KEY (consultation_id) REFERENCES consultations (id)
    );

-- La liste des consultations avec le nom du médecin, le nom du patient et le diagnostic (3 tables)
SELECT
    c.id,
    m.nom AS medecin,
    p.nom AS patient,
    c.date_consultation,
    c.diagnostic
FROM
    consultations c
    JOIN medecins m ON c.medecin_id = m.id
    JOIN patients p ON c.patient_id = p.id;

-- Le nombre de consultations par médecin ce mois-ci
SELECT
    m.nom AS medecin,
    COUNT(c.id) AS nb_consultations
FROM
    medecins m
    LEFT JOIN consultations c ON c.medecin_id = m.id
    AND MONTH (c.date_consultation) = MONTH (CURRENT_DATE)
    AND YEAR (c.date_consultation) = YEAR (CURRENT_DATE)
GROUP BY
    m.nom
ORDER BY
    nb_consultations DESC;

-- Le coût total des consultations par patient
SELECT
    p.name,
    SUM(c.cout) as cout_total
FROM
    consultations c
    INNER JOIN patients p ON p.id = c.patient_id
GROUP BY
    c.patient_id
    -- Les patients qui n'ont jamais consulté
SELECT
    p.name
FROM
    patients p
    LEFT JOIN consultations c ON c.patient_id = p.id
WHERE
    c.patient_id is null
    --Le médecin avec le plus de patients différents
SELECT
    m.name,
    COUNT(c.patient_id) as patients_count
FROM
    consultations c
    INNER JOIN medecins m ON m.id = c.medecin_id
GROUP BY
    c.patient_id,
    m.name
    -- Les prescriptions d'un patient donné avec le nom du médecin prescripteur (4 tables)
SELECT
    pa.nom as patient_name,
    pr.medicament as prescription_medicament
FROM
    prescriptions pr
    INNER JOIN consultations c ON c.id = pr.consultation_id
    INNER JOIN medecins m ON m.id = c.medecin_id
    INNER JOIN patients pa ON c.patient_id = pa.id
GROUP BY
    pa.nom,
    m.nom
ORDER BY
    c.date_consultation DESC
    -- La spécialité la plus consultée
SELECT
    m.specialite,
    COUNT(c.id) as consultations_num
FROM
    consultations c
    INNER JOIN medecins m ON m.id = c.medecin_id
GROUP BY
    m.specialite
ORDER BY
    consultations_num DESC
LIMIT
    1