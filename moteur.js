/* Code Python qui exécute le programme d'un élève dans un espace isolé
 * et renvoie ce qu'il affiche ainsi que l'erreur éventuelle. */
self.MOTEUR_PY = String.raw`
import sys, traceback

class _SortieTropLongue(Exception):
    pass

class _Ecrivain:
    def __init__(self, limite=100000):
        self.morceaux = []
        self.taille = 0
        self.limite = limite
    def write(self, s):
        s = str(s)
        self.taille += len(s)
        if self.taille > self.limite:
            raise _SortieTropLongue()
        self.morceaux.append(s)
        return len(s)
    def flush(self):
        pass
    def valeur(self):
        return "".join(self.morceaux)

def _ligne_eleve(tb):
    ligne = None
    for cadre in traceback.extract_tb(tb):
        if cadre.filename == "<eleve>":
            ligne = cadre.lineno
    return ligne

def executer(code, ajout, entree, echo):
    sortie = _Ecrivain()
    lignes = [l.rstrip("\r") for l in entree.split("\n")] if entree != "" else []
    def _input(invite=""):
        if echo and invite:
            sortie.write(str(invite))
        if not lignes:
            raise EOFError("plus d'entrée")
        valeur = lignes.pop(0)
        if echo:
            sortie.write(valeur + "\n")
        return valeur
    espace = {"__name__": "__main__", "input": _input}
    source = code if not ajout else code + "\n" + ajout + "\n"
    ancien = sys.stdout
    sys.stdout = sortie
    erreur = None
    try:
        exec(compile(source, "<eleve>", "exec"), espace)
    except _SortieTropLongue:
        erreur = {"type": "SortieTropLongue", "message": "", "ligne": None}
    except SyntaxError as e:
        erreur = {"type": type(e).__name__, "message": str(e.msg), "ligne": e.lineno}
    except BaseException as e:
        erreur = {"type": type(e).__name__, "message": str(e), "ligne": _ligne_eleve(e.__traceback__)}
    finally:
        sys.stdout = ancien
    return {"sortie": sortie.valeur(), "erreur": erreur}
`;
