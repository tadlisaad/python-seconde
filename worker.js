/* Exécute Python (Pyodide) à part de la page, pour pouvoir arrêter une boucle infinie. */
const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
importScripts(PYODIDE + "pyodide.js");
importScripts("moteur.js");

let executer = null;
const pret = loadPyodide({ indexURL: PYODIDE }).then(py => {
  py.runPython(self.MOTEUR_PY);
  executer = py.globals.get("executer");
  postMessage({ type: "pret" });
}).catch(err => {
  postMessage({ type: "echec", message: String(err) });
});

onmessage = async (e) => {
  await pret;
  const { id, code, entree, ajout, echo } = e.data;
  try {
    const r = executer(code, ajout || "", entree || "", !!echo);
    const res = r.toJs({ dict_converter: Object.fromEntries });
    r.destroy();
    postMessage({ type: "resultat", id, sortie: res.sortie, erreur: res.erreur || null });
  } catch (err) {
    postMessage({ type: "resultat", id, sortie: "", erreur: { type: "Interne", message: String(err), ligne: null } });
  }
};
