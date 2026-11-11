/* Parties ouvertes aux élèves. Le professeur règle cela dans prof.html (onglet « Accès élèves »).
   Le réglage de la classe arrive à la connexion et est gardé dans la session (pyclasse:session.acces).
   Sans réglage, tout est ouvert. C'est une organisation du travail de la classe, pas un contrôle d'accès :
   les pages restent publiques sur Internet. Le serveur, lui, n'enregistre pas les essais d'une notion fermée. */
(function () {
  "use strict";
  var CLE = "pyclasse:session";
  function session() { try { return JSON.parse(localStorage.getItem(CLE) || "null"); } catch (e) { return null; } }
  function lire() { var s = session(); return (s && s.acces && typeof s.acces === "object") ? s.acces : null; }
  function liste(parcours, type) {
    var a = lire();
    return a && a[parcours] && Array.isArray(a[parcours][type]) ? a[parcours][type] : null;   // null = tout est ouvert
  }
  function ouvert(parcours, type, n) { var l = liste(parcours, type); return !l || l.indexOf(n) >= 0; }
  // Identifiants d'exercices : m<N>e<M> (Python), g<N>e<M> (algorigrammes). Inconnu : ouvert.
  function exo(id) {
    var m = /^([mg])(\d+)e\d+$/.exec(String(id));
    return m ? ouvert(m[1] === "m" ? "python" : "algo", "e", Number(m[2])) : true;
  }
  // Enregistre le réglage reçu du serveur ; renvoie true s'il a changé.
  function sync(reponse) {
    var s = session();
    if (!s || !reponse) return false;
    var nouveau = reponse.acces && typeof reponse.acces === "object" ? reponse.acces : null;
    if (JSON.stringify(nouveau) === JSON.stringify(s.acces || null)) return false;
    if (nouveau) s.acces = nouveau; else delete s.acces;
    try { localStorage.setItem(CLE, JSON.stringify(s)); } catch (e) {}
    return true;
  }
  // Redemande le réglage de temps en temps (retour sur l'onglet, puis toutes les 2 minutes) : rappel(réponse, réglageChangé).
  function suivre(demander, rappel) {
    var dernier = Date.now();
    function verifier(force) {
      if (document.hidden || (!force && Date.now() - dernier < 45000)) return;
      dernier = Date.now();
      Promise.resolve().then(demander).then(function (d) { if (d && d.ok) rappel(d, sync(d)); }).catch(function () {});
    }
    document.addEventListener("visibilitychange", function () { verifier(false); });
    window.addEventListener("focus", function () { verifier(false); });
    setInterval(function () { verifier(false); }, 120000);
  }
  // Remise à zéro faite par le professeur : le serveur renvoie la date (reinit.python / reinit.algo). Une seule fois par
  // remise à zéro, ce poste efface ce qu'il garde en mémoire (réussis, codes, file d'envoi) et note qu'il l'a constatée.
  var LOCAL = { python: "pyclasse:", algo: "pyalgo:" };
  function cleVu(p, id) { return "pyreinit:" + p + ":" + id; }
  // Remise à zéro d'une seule partie : clés « python:3 » / « algo:2 » dans reinit ; mémorisées dans pyreinit:parties:<id>.
  var PARTIE = /^(python|algo):(\d+)$/;
  function cleParties(id) { return "pyreinit:parties:" + id; }
  function partiesVues(id) { try { return JSON.parse(localStorage.getItem(cleParties(id))) || {}; } catch (e) { return {}; } }
  function reinitVu(id) {
    var o = partiesVues(id);
    Object.keys(LOCAL).forEach(function (p) { try { o[p] = Number(localStorage.getItem(cleVu(p, id))) || 0; } catch (e) { o[p] = 0; } });
    return o;
  }
  function estDe(p, n, exo) { return new RegExp("^" + (p === "python" ? "m" : "g") + n + "e\\d+$").test(String(exo)); }
  // Retire d'un état (réussis, tentés : Set ou tableau ; codes, temps, indices : objets ; file : tableau) les exercices de ces parties.
  function retirer(etat, p, notions) {
    var hors = function (x) { return !notions.some(function (n) { return estDe(p, n, x); }); };
    ["reussis", "tentes"].forEach(function (k) {
      if (!etat[k]) return;
      if (etat[k] instanceof Set) Array.from(etat[k]).forEach(function (x) { if (!hors(x)) etat[k].delete(x); });
      else etat[k] = etat[k].filter(hors);
    });
    ["codes", "temps", "indices"].forEach(function (k) { var c = etat[k]; if (c) Object.keys(c).forEach(function (x) { if (!hors(x)) delete c[x]; }); });
    if (etat.file) etat.file = etat.file.filter(function (e) { return hors(e && e.exo); });
    return etat;
  }
  function purger(p, id, n) {
    var cle = LOCAL[p] + id, brut = localStorage.getItem(cle);
    if (!brut) return;
    localStorage.setItem(cle, JSON.stringify(retirer(JSON.parse(brut), p, [n])));
  }
  // Renvoie ce qui vient d'être constaté : { python: true } (parcours entier), { parties: { python: [3] } } (parties).
  function reinit(reponse, id) {
    var r = (reponse && reponse.reinit) || {}, fait = {}, parties = {};
    Object.keys(LOCAL).forEach(function (p) {
      var t = Number(r[p]) || 0;
      if (!t || reinitVu(id)[p] >= t) return;
      try { localStorage.removeItem(LOCAL[p] + id); localStorage.setItem(cleVu(p, id), String(t)); } catch (e) { return; }
      fait[p] = true;
    });
    Object.keys(r).forEach(function (k) {
      var m = PARTIE.exec(k), t = Number(r[k]) || 0;
      if (!m || !t) return;
      var vues = partiesVues(id);
      if ((vues[k] || 0) >= t) return;
      try { purger(m[1], id, Number(m[2])); vues[k] = t; localStorage.setItem(cleParties(id), JSON.stringify(vues)); } catch (e) { return; }
      (parties[m[1]] = parties[m[1]] || []).push(Number(m[2]));
    });
    if (Object.keys(parties).length) fait.parties = parties;
    return fait;
  }
  window.ACCES = {
    lire: lire, sync: sync, suivre: suivre, exo: exo, reinit: reinit, reinitVu: reinitVu, retirer: retirer,
    cours: function (parcours, n) { return ouvert(parcours, "c", n); },
    exercices: function (parcours, n) { return ouvert(parcours, "e", n); },
    nbFermes: function (parcours, type, total) { var l = liste(parcours, type); if (!l) return 0; var k = 0; for (var i = 1; i <= total; i++) if (l.indexOf(i) < 0) k++; return k; }
  };
})();
