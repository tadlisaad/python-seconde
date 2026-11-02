/* Connexion avec le compte Microsoft 365 de l'école (flux « code + PKCE », sans bibliothèque externe).
 *
 * Déroulement :
 *   1. MS.demarrer(page)      : envoie l'élève vers la page de connexion Microsoft.
 *   2. Microsoft le renvoie sur la page d'accueil du site avec un code dans l'adresse.
 *   3. MS.traiterRetour()     : échange ce code contre un jeton d'identité (id_token), sans secret.
 *   4. Le serveur (Code.gs) vérifie le jeton, reconnaît l'élève par son adresse e-mail,
 *      et lui donne un jeton de session qui remplace le code à 4 chiffres.
 *
 * Réglages dans config.js : msTenant (ID de l'annuaire) et msClient (ID de l'application).
 * L'adresse de retour doit être exactement celle déclarée dans l'inscription de l'application.
 */
window.MS = (function () {
  const C = window.CONFIG || {};
  const disponible = !!(C.msTenant && C.msClient);
  const base = () => "https://login.microsoftonline.com/" + encodeURIComponent(C.msTenant) + "/oauth2/v2.0/";
  // Racine du site : https://…/python-seconde/ (avec la barre finale), quelle que soit la page d'où l'on part.
  const retour = () => location.origin + location.pathname.replace(/[^/]*$/, "");
  const CLE = "ms:flux";

  const alea = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; };
  const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const lireFlux = () => { try { return JSON.parse(sessionStorage.getItem(CLE) || "null"); } catch { return null; } };
  const ecrireFlux = v => { try { sessionStorage.setItem(CLE, JSON.stringify(v)); } catch {} };
  const effacerFlux = () => { try { sessionStorage.removeItem(CLE); } catch {} };

  /** Envoie vers Microsoft. page : la page où ramener après la connexion (ex. "algo.html").
   *  role : "prof" pour le tableau de bord enseignant (par défaut : élève). */
  async function demarrer(page, role) {
    if (!disponible) throw new Error("Connexion Microsoft non configurée");
    const verifier = b64url(alea(48));
    const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
    const state = b64url(alea(16)), nonce = b64url(alea(16));
    ecrireFlux({ verifier, state, nonce, page: page || "", role: role || "" });
    const p = new URLSearchParams({
      client_id: C.msClient, response_type: "code", redirect_uri: retour(), response_mode: "query",
      scope: "openid profile email", state, nonce,
      code_challenge: challenge, code_challenge_method: "S256", prompt: "select_account"
    });
    location.assign(base() + "authorize?" + p.toString());
  }

  /** À appeler au chargement de la page d'accueil.
   *  Renvoie null (rien à faire), { erreur } (refus ou problème) ou { idToken, nonce, page } (à envoyer au serveur). */
  async function traiterRetour() {
    const q = new URLSearchParams(location.search);
    if (!q.has("code") && !q.has("error")) return null;
    const flux = lireFlux();
    effacerFlux();
    history.replaceState(null, "", location.pathname);   // l'adresse ne garde ni code ni état
    if (q.has("error")) {
      const annule = q.get("error") === "access_denied";
      return { erreur: annule ? "annule" : "refus", detail: (q.get("error_description") || q.get("error") || "").slice(0, 300), role: flux && flux.role, page: flux && flux.page };
    }
    if (!flux || q.get("state") !== flux.state) return { erreur: "etat", detail: "Connexion interrompue. Recommence.", role: flux && flux.role, page: flux && flux.page };
    try {
      const r = await fetch(base() + "token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: C.msClient, grant_type: "authorization_code", code: q.get("code"),
          redirect_uri: retour(), code_verifier: flux.verifier, scope: "openid profile email"
        }).toString()
      });
      const d = await r.json();
      if (!d.id_token) return { erreur: "jeton", detail: (d.error_description || d.error || "").slice(0, 300), role: flux.role, page: flux.page };
      return { idToken: d.id_token, nonce: flux.nonce, page: flux.page, role: flux.role };
    } catch {
      return { erreur: "reseau", detail: "", role: flux.role, page: flux.page };
    }
  }

  /** Texte à montrer à l'élève pour une erreur renvoyée par traiterRetour ou par le serveur. */
  function messageErreur(code) {
    switch (code) {
      case "annule": return "Connexion annulée.";
      case "compte_non_autorise": return "Ce compte Microsoft n'a pas accès au tableau de bord enseignant.";
      case "compte_inconnu": return "Ton compte Microsoft n'est pas dans la liste de la classe. Préviens ton professeur.";
      case "jeton_invalide": case "jeton_expire": case "jeton_deja_utilise": case "etat": case "jeton":
        return "La connexion Microsoft n'a pas pu être vérifiée. Réessaie.";
      case "ms_non_configure": return "La connexion Microsoft n'est pas encore activée. Utilise ton identifiant et ton code.";
      case "reseau": return "Impossible de joindre Microsoft. Vérifie l'accès à Internet, ou utilise ton identifiant et ton code.";
      default: return "La connexion Microsoft a échoué. Réessaie, ou utilise ton identifiant et ton code.";
    }
  }

  return { disponible, demarrer, traiterRetour, messageErreur };
})();
