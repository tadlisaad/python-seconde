/*
 * Réglages du site.
 * url : l'adresse de déploiement du script Google (elle finit par /exec).
 */
window.CONFIG = {
  url: "https://script.google.com/macros/s/AKfycbxBufk123V0q1Lhe5RpUPosJJcVtyusU5L1SWszaoDpADvTsa62lZJq5CEgyDph5KIZ/exec",
  titre: "Python en seconde",
  etablissement: "EFI Casablanca",
  // Connexion avec le compte Microsoft 365 de l'école (laisser vide pour la désactiver).
  msTenant: "839ec465-01b4-438a-8ce8-50fb61bdda77",   // ID de l'annuaire (locataire)
  msClient: "943aa929-cef3-4d0f-8967-a0dc01db77f9",   // ID de l'application (client)
  msSeulement: false   // true : masque identifiant + code (à activer aussi côté script : ACCEPTER_CODE_ELEVE = false)
};
