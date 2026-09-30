const STORAGE_ETUDIANTS = 'etoile_etudiants';
const STORAGE_PAIEMENTS = 'etoile_paiements';
const FRAIS_FIXES = { Inscription: 50, Minerval: 300, Enrolement: 20 };

function getEtudiants() { return JSON.parse(localStorage.getItem(STORAGE_ETUDIANTS)) || []; }
function getPaiements() { return JSON.parse(localStorage.getItem(STORAGE_PAIEMENTS)) || []; }

// Données par défaut si le stockage local est vide
if (!localStorage.getItem(STORAGE_ETUDIANTS)) {
    localStorage.setItem(STORAGE_ETUDIANTS, JSON.stringify([
        { matricule: "UE-2026-001", nom: "Kasongo", prenom: "Félix", faculte: "Sciences Informatiques", promotion: "L1 LMD" },
        { matricule: "UE-2026-002", nom: "Mbuyi", prenom: "Clarisse", faculte: "Droit", promotion: "L2 LMD" }
    ]));
    localStorage.setItem(STORAGE_PAIEMENTS, JSON.stringify([
        { idPaiement: "REC-1111", matriculeEtudiant: "UE-2026-001", typeFrais: "Inscription", montantVerse: 50, date: "2026-09-28" }
    ]));
}
