function charger(filtre = "") {
    const tbody = document.getElementById('liste-body');
    tbody.innerHTML = "";
    getEtudiants().filter(e => e.nom.toLowerCase().includes(filtre.toLowerCase()) || e.matricule.toLowerCase().includes(filtre.toLowerCase())).forEach(e => {
        tbody.innerHTML += `<tr><td><strong>${e.matricule}</strong></td><td>${e.nom}</td><td>${e.prenom}</td><td>${e.faculte}</td><td><span class="badge">${e.promotion}</span></td></tr>`;
    });
}

document.getElementById('form-etudiant').addEventListener('submit', (e) => {
    e.preventDefault();
    const matricule = document.getElementById('matricule').value.trim().toUpperCase();
    const list = getEtudiants();
    if(list.some(x => x.matricule === matricule)) return alert("Matricule déjà utilisé !");
    
    list.push({
        matricule,
        nom: document.getElementById('nom').value.trim(),
        prenom: document.getElementById('prenom').value.trim(),
        faculte: document.getElementById('faculte').value,
        promotion: document.getElementById('promotion').value.trim()
            });
    localStorage.setItem(STORAGE_ETUDIANTS, JSON.stringify(list));
    document.getElementById('form-etudiant').reset();
    charger();
});

document.getElementById('search').addEventListener('input', (e) => charger(e.target.value));
window.onload = () => charger();
