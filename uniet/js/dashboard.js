document.addEventListener('DOMContentLoaded', () => {
    const etudiants = getEtudiants();
    const paiements = getPaiements();

    document.getElementById('kpi-total-etudiants').textContent = etudiants.length;
    const total = paiements.reduce((sum, p) => sum + Number(p.montantVerse), 0);
    document.getElementById('kpi-total-percu').textContent = total + " USD";

    const totalAttendu = etudiants.length * (FRAIS_FIXES.Inscription + FRAIS_FIXES.Minerval + FRAIS_FIXES.Enrolement);
    document.getElementById('kpi-taux-recouvrement').textContent = totalAttendu > 0 ? ((total / totalAttendu) * 100).toFixed(1) + " %" : "0 %";

    const recentBody = document.getElementById('dashboard-recent-body');
    [...paiements].reverse().slice(0, 5).forEach(p => {
        recentBody.innerHTML += `<tr><td><strong>${p.idPaiement}</strong></td><td>${p.matriculeEtudiant}</td><td>${p.typeFrais}</td><td style="color:green;font-weight:bold;">+ ${p.montantVerse} USD</td><td>${p.date}</td></tr>`;
    });

    document.getElementById('btn-export').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify({ etudiants, paiements }, null, 4)], { type: "application/json" });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "sauvegarde_etoile.json";
        a.click();
    });
});
