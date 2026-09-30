function init() {
    const select = document.getElementById('select-etudiant');
    select.innerHTML = '<option value="">-- Choisir --</option>';
    getEtudiants().forEach(e => {
        select.innerHTML += `<option value="${e.matricule}">${e.matricule} - ${e.nom}</option>`;
    });

    const tbody = document.getElementById('paiements-body');
    tbody.innerHTML = "";
    getPaiements().reverse().forEach(p => {
        tbody.innerHTML += `<tr><td>${p.idPaiement}</td><td>${p.matriculeEtudiant}</td><td>${p.typeFrais}</td><td>${p.montantVerse} USD</td><td><button class="btn btn-sec" onclick="imprimer('${p.idPaiement}')">🖨️ Imprimer</button></td></tr>`;
    });
}

document.getElementById('form-paiement').addEventListener('submit', (e) => {
    e.preventDefault();
    const list = getPaiements();
    const id = "REC-" + Date.now().toString().slice(-4);
    list.push({
        idPaiement: id,
        matriculeEtudiant: document.getElementById('select-etudiant').value,
        typeFrais: document.getElementById('type-frais').value,
        montantVerse: document.getElementById('montant').value,
        date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem(STORAGE_PAIEMENTS, JSON.stringify(list));
    document.getElementById('form-paiement').reset();
    init();
});

window.imprimer = function(id) {
    const p = getPaiements().find(x => x.idPaiement === id);
    if(!p) {
        alert("⚠️ Erreur : Reçu introuvable.");
        return;
    }
    
    // Remplissage sécurisé des données du reçu
    if(document.getElementById('r-id')) document.getElementById('r-id').textContent = p.idPaiement;
    if(document.getElementById('r-mat')) document.getElementById('r-mat').textContent = p.matriculeEtudiant;
    if(document.getElementById('r-type')) document.getElementById('r-type').textContent = p.typeFrais;
    if(document.getElementById('r-type-libelle')) document.getElementById('r-type-libelle').textContent = "Perception : " + p.typeFrais;
    if(document.getElementById('r-montant')) document.getElementById('r-montant').textContent = p.montantVerse;
    if(document.getElementById('r-montant-total')) document.getElementById('r-montant-total').textContent = p.montantVerse;
    if(document.getElementById('r-date')) document.getElementById('r-date').textContent = p.date;
    
    // Déclenchement de l'impression
    setTimeout(() => {
        window.print();
    }, 200);
}



window.onload = () => init();
