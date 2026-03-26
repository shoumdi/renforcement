class reservation {
    constructor(
        id,
        nom_client,
        nombre_personnes,
        date,
        heure,
        statut,
        telephone
    ) {
        this.id = id;
        this.nom_client = nom_client;
        this.nombre_personnes = nombre_personnes;
        this.date = date;
        this.heure = heure;
        this.statut = statut;
        this.telephone = telephone;
    }
}

const ReservationStatus = {
    CONFIRMED: 'confirmée',
    WAITING: 'en attente',
    CANCLED: 'annulée'
}
const reservations = [];
//Fonction pour ajouter une réservation : vérifie que le nombre total de personnes 
// pour ce créneau (date + heure) ne dépasse pas 30. Si c'est plein, mets la réservation 
// en "en attente"

function addReservation(
    nom_client,
    nombre_personnes,
    telephone,
    date,
    hour) {
    const isFull = findByDateAndHour(date, hour).reduce((p, c) => p += c.nombre_personnes, 0) + nombre_personnes === 30
    reservations.push(
        new reservation(
            lastInsertedId() + 1,
            nom_client,
            nombre_personnes,
            date,
            hour,
            isFull ? ReservationStatus.WAITING : ReservationStatus.CONFIRMED,
            telephone
        ))
}

function findByDateAndHour(date, hour) {
    return reservations.filter(r => r.date === date && r.heure === hour)
}
function lastInsertedId() {
    return reservations.at(-1)?.id ?? 0
}

///Fonction pour annuler une réservation : change le statut en "annulée" et vérifie s'il y a 
// des réservations en attente pour ce créneau qui peuvent maintenant être confirmées
function cancelReservation(id) {
    const reserv = reservations.find(r => r.id === id)
    if (reserv === undefined) return
    reserv.statut = ReservationStatus.CANCLED
    refreshReservations(reserv.date, reserv.heure);
}

function refreshReservations(date, hour) {
    findByDateAndHour(date, hour)
        .filter(r => r.statut === ReservationStatus.WAITING)
        .forEach(r => {
            r.statut = ReservationStatus.CONFIRMED
        })
}

///Fonction pour lister les réservations d'une date donnée, triées par heure
function stringHourToLong(input) {
    const [hour, minute] = input.split(":").map(i => parseInt(i));
    const date = new Date();
    date.setHours(hour, minute)
    return date.getTime()
}
function showAll(date, hour) {
    const resume = ''
    findByDateAndHour(date, hour)
        .sort((r1, r2) => stringHourToLong(r1.heure) - stringHourToLong(r2.heure))
        .forEach(r => {
            resume += `name: ${r.nom_client} phone: ${r.telephone} status: ${r.statut}`
        })
    if (resume.length) console.log(resume);
}

///Fonction pour calculer le taux d'occupation d'une journée (nombre de places réservées / 30 par créneau)
function occupationRate(date, hour) {
    return findByDateAndHour(date, hour).reduce((p, c) => p += c.nombre_personnes, 0) / 30
}

//Ajoute 8 réservations en testant les cas limites (créneau plein, annulation libérant une place)
addReservation("Ali Benali", 2, "0612345678", "2026-04-01", "19:00");
addReservation("Sara El Amrani", 4, "0623456789", "2026-04-02", "20:30");
addReservation("Youssef Haddad", 3, "0634567890", "2026-04-03", "18:45");
addReservation("Nadia Karim", 5, "0645678901", "2026-04-04", "21:00");
addReservation("Omar Tazi", 1, "0656789012", "2026-04-05", "17:30");
addReservation("Leila Bennis", 6, "0667890123", "2026-04-06", "19:15");
addReservation("Hicham Fassi", 2, "0678901234", "2026-04-07", "20:00");
addReservation("Imane Chraibi", 3, "0689012345", "2026-04-08", "18:30");
