/*
 * Python en classe — contenu du parcours
 *
 * 8 notions × 4 exercices. Vous pouvez modifier les textes ou ajouter des exercices :
 * chaque exercice a un identifiant unique (ne le changez plus une fois les élèves lancés,
 * sinon leurs résultats ne seront plus rattachés).
 *
 * Champs d'un exercice :
 *   id       identifiant unique (ex. "m3e2")
 *   titre    titre court
 *   enonce   consigne (HTML simple autorisé)
 *   depart   code affiché au départ dans l'éditeur
 *   tests    liste de { entree: "lignes tapées au clavier", attendu: "affichage attendu" }
 *            et, pour les fonctions, { ajout: "code ajouté après celui de l'élève", attendu }
 *   exige    motifs qui doivent apparaître dans le code (ex. une boucle for)
 *   interdit motifs qui ne doivent pas apparaître (ex. la réponse écrite en dur)
 *   indices  aides révélées une par une
 */
window.PARCOURS = [
  {
    id: "m1",
    titre: "Afficher",
    notion: "print et suite d'instructions",
    cours: `
<p>Un programme est une <strong>suite d'instructions</strong> exécutées dans l'ordre, de haut en bas.</p>
<p><code>print(...)</code> affiche ce qu'on lui donne. Un texte s'écrit entre guillemets ; un calcul s'écrit sans guillemets et Python affiche son résultat.</p>
<pre>print("Bonjour")
print(3 + 4)
print("Total :", 3 + 4)</pre>
<p>affiche :</p>
<pre class="sortie">Bonjour
7
Total : 7</pre>
<p>Avec plusieurs éléments séparés par des virgules, <code>print</code> les met à la suite avec un espace entre eux.</p>`,
    exercices: [
      {
        id: "m1e1", titre: "Premier message",
        enonce: "Affiche exactement le message <code>Bonjour !</code>",
        depart: "# Écris ton programme ici\n",
        tests: [{ entree: "", attendu: "Bonjour !" }],
        indices: ["Un texte s'écrit entre guillemets : \"...\"", "La solution tient en une ligne : print(\"...\")"]
      },
      {
        id: "m1e2", titre: "Deux lignes",
        enonce: "Affiche ces deux lignes, dans cet ordre :<pre class=\"sortie\">Je m'appelle Python\nJ'ai 35 ans</pre>",
        depart: "",
        tests: [{ entree: "", attendu: "Je m'appelle Python\nJ'ai 35 ans" }],
        indices: ["Chaque print affiche une ligne.", "Il te faut deux instructions print, l'une sous l'autre."]
      },
      {
        id: "m1e3", titre: "Heures dans une année",
        enonce: "Une année compte 365 jours de 24 heures. Fais <strong>calculer</strong> par Python le nombre d'heures dans une année et affiche le résultat.<br>Tu n'as pas le droit d'écrire le résultat toi-même.",
        depart: "",
        tests: [{ entree: "", attendu: "8760" }],
        interdit: [{ motif: "8760", message: "Le résultat doit être calculé par Python, pas écrit à la main." }],
        indices: ["La multiplication s'écrit avec *", "print(365 * 24)"]
      },
      {
        id: "m1e4", titre: "Une phrase avec un calcul",
        enonce: "Affiche la phrase <code>Il y a 168 heures dans une semaine</code> en faisant calculer le nombre 168 par Python (7 jours × 24 heures).",
        depart: "",
        tests: [{ entree: "", attendu: "Il y a 168 heures dans une semaine" }],
        interdit: [{ motif: "168", message: "Le nombre 168 doit être calculé, pas écrit à la main." }],
        indices: ["print peut recevoir plusieurs éléments séparés par des virgules.", "print(\"Il y a\", 7 * 24, \"heures dans une semaine\")"]
      }
    ]
  },
  {
    id: "m2",
    titre: "Répéter",
    notion: "boucle for",
    cours: `
<p>Pour répéter des instructions un nombre connu de fois, on utilise une <strong>boucle for</strong>.</p>
<pre>for i in range(3):
    print("Salut")</pre>
<p>Les instructions répétées sont <strong>décalées vers la droite</strong> (4 espaces) : c'est l'indentation. Elle est obligatoire.</p>
<p><code>range(3)</code> donne à <code>i</code> les valeurs 0, 1, 2. <code>range(1, 6)</code> donne 1, 2, 3, 4, 5 : le dernier nombre est exclu.</p>
<pre>for i in range(1, 4):
    print(i, "au carré :", i * i)</pre>
<pre class="sortie">1 au carré : 1
2 au carré : 4
3 au carré : 9</pre>`,
    exercices: [
      {
        id: "m2e1", titre: "Cinq fois",
        enonce: "Avec une boucle <code>for</code>, affiche cinq fois le mot <code>Python</code>, une fois par ligne.",
        depart: "",
        tests: [{ entree: "", attendu: "Python\nPython\nPython\nPython\nPython" }],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for." }],
        indices: ["for i in range(5):", "N'oublie pas les 4 espaces avant print, sur la ligne sous le for."]
      },
      {
        id: "m2e2", titre: "Compter jusqu'à 10",
        enonce: "Affiche les nombres de 1 à 10, un par ligne, avec une boucle.",
        depart: "",
        tests: [{ entree: "", attendu: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" }],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for." }],
        indices: ["range(1, 11) donne les nombres de 1 à 10.", "Dans la boucle, affiche i."]
      },
      {
        id: "m2e3", titre: "Table de 7",
        enonce: "Affiche la table de multiplication de 7, de <code>7 x 1 = 7</code> jusqu'à <code>7 x 10 = 70</code>.",
        depart: "",
        tests: [{ entree: "", attendu: [1,2,3,4,5,6,7,8,9,10].map(i => `7 x ${i} = ${7*i}`).join("\n") }],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for." }],
        indices: ["print(\"7 x\", i, \"=\", 7 * i)", "La boucle doit aller de 1 à 10 : range(1, 11)."]
      },
      {
        id: "m2e4", titre: "Escalier",
        enonce: "Affiche cet escalier de 5 marches :<pre class=\"sortie\">#\n##\n###\n####\n#####</pre><p>Astuce : en Python, <code>\"#\" * 3</code> vaut <code>\"###\"</code>.</p>",
        depart: "",
        tests: [{ entree: "", attendu: "#\n##\n###\n####\n#####" }],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for." }],
        indices: ["À la marche numéro i, il y a i caractères #.", "for i in range(1, 6):\n    print(\"#\" * i)"]
      }
    ]
  },
  {
    id: "m3",
    titre: "Variables",
    notion: "variables et calculs",
    cours: `
<p>Une <strong>variable</strong> est un nom qui garde une valeur en mémoire. On la crée avec <code>=</code> (on dit « affecter »).</p>
<pre>prix = 12
prix = prix + 3     # prix vaut maintenant 15
print(prix)</pre>
<p>Opérations utiles :</p>
<table class="ops"><tr><td><code>+ - *</code></td><td>addition, soustraction, multiplication</td></tr>
<tr><td><code>/</code></td><td>division (résultat à virgule : 7 / 2 vaut 3.5)</td></tr>
<tr><td><code>//</code></td><td>quotient entier (7 // 2 vaut 3)</td></tr>
<tr><td><code>%</code></td><td>reste de la division (7 % 2 vaut 1)</td></tr></table>
<p>Dans une boucle, une variable peut <strong>accumuler</strong> : <code>total = total + i</code>.</p>`,
    exercices: [
      {
        id: "m3e1", titre: "Le total",
        enonce: "Le programme contient déjà deux variables. Crée une variable <code>total</code> qui contient le prix à payer, puis affiche-la.",
        depart: "prix = 12\nquantite = 3\n",
        tests: [{ entree: "", attendu: "36" }],
        exige: [{ motif: "total\\s*=", message: "Crée une variable nommée total." }],
        interdit: [{ motif: "\\b36\\b", message: "Le total doit être calculé à partir des variables." }],
        indices: ["total = prix * quantite", "Puis print(total)"]
      },
      {
        id: "m3e2", titre: "Convertir des secondes",
        enonce: "Une vidéo dure <code>4000</code> secondes. Affiche sa durée sous la forme <code>1 h 6 min 40 s</code>, en utilisant <code>//</code> et <code>%</code>.",
        depart: "duree = 4000\n",
        tests: [{ entree: "", attendu: "1 h 6 min 40 s" }],
        exige: [{ motif: "//", message: "Utilise le quotient entier //." }, { motif: "%", message: "Utilise le reste %." }],
        indices: ["Une heure = 3600 s : heures = duree // 3600", "Le reste après les heures : reste = duree % 3600, puis minutes = reste // 60 et secondes = reste % 60."]
      },
      {
        id: "m3e3", titre: "Abonnés",
        enonce: "Un compte a 1200 abonnés et en gagne 150 chaque mois. Avec une boucle, calcule le nombre d'abonnés au bout de 12 mois et affiche-le.",
        depart: "abonnes = 1200\n",
        tests: [{ entree: "", attendu: "3000" }],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for qui tourne 12 fois." }],
        interdit: [{ motif: "3000", message: "Le résultat doit être calculé par la boucle." }],
        indices: ["Dans la boucle : abonnes = abonnes + 150", "Le print se place après la boucle, sans décalage."]
      },
      {
        id: "m3e4", titre: "Somme de 1 à 100",
        enonce: "Calcule la somme 1 + 2 + 3 + … + 100 avec une boucle et affiche le résultat.",
        depart: "somme = 0\n",
        tests: [{ entree: "", attendu: "5050" }],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for." }],
        interdit: [{ motif: "5050", message: "Le résultat doit être calculé par la boucle." }],
        indices: ["for i in range(1, 101):", "Dans la boucle : somme = somme + i. Affiche somme après la boucle."]
      }
    ]
  },
  {
    id: "m4",
    titre: "Demander",
    notion: "input et types",
    cours: `
<p><code>input()</code> attend que l'utilisateur tape quelque chose et le renvoie <strong>sous forme de texte</strong>.</p>
<pre>prenom = input()
print("Bonjour", prenom)</pre>
<p>Pour calculer, il faut <strong>convertir</strong> le texte en nombre : <code>int(...)</code> pour un entier, <code>float(...)</code> pour un nombre à virgule.</p>
<pre>n = int(input())
print(n * 2)</pre>
<p>Ici, pour tester ton programme, écris ce que l'utilisateur tape dans la case « Entrée clavier » (une valeur par ligne). Lors de la vérification, l'ordinateur essaie plusieurs valeurs.</p>
<p><code>round(x, 1)</code> arrondit x à 1 chiffre après la virgule.</p>`,
    exercices: [
      {
        id: "m4e1", titre: "Saluer",
        enonce: "Lis un prénom au clavier et affiche <code>Bonjour</code> suivi du prénom. Avec <code>Lina</code>, le programme affiche <code>Bonjour Lina</code>.",
        depart: "",
        tests: [{ entree: "Lina", attendu: "Bonjour Lina" }, { entree: "Yanis", attendu: "Bonjour Yanis" }, { entree: "Sofia", attendu: "Bonjour Sofia" }],
        exige: [{ motif: "input\\s*\\(", message: "Le prénom doit être lu avec input()." }],
        indices: ["prenom = input()", "print(\"Bonjour\", prenom)"]
      },
      {
        id: "m4e2", titre: "Le double",
        enonce: "Lis un nombre entier et affiche son double.",
        depart: "",
        tests: [{ entree: "4", attendu: "8" }, { entree: "21", attendu: "42" }, { entree: "-3", attendu: "-6" }],
        exige: [{ motif: "input\\s*\\(", message: "Le nombre doit être lu avec input()." }],
        indices: ["input() renvoie du texte : convertis-le avec int(...).", "n = int(input())"]
      },
      {
        id: "m4e3", titre: "Âge en 2030",
        enonce: "Lis une année de naissance et affiche l'âge qu'aura la personne en 2030.",
        depart: "",
        tests: [{ entree: "2010", attendu: "20" }, { entree: "2009", attendu: "21" }, { entree: "1985", attendu: "45" }],
        exige: [{ motif: "input\\s*\\(", message: "L'année doit être lue avec input()." }],
        indices: ["annee = int(input())", "L'âge vaut 2030 - annee."]
      },
      {
        id: "m4e4", titre: "Moyenne de trois notes",
        enonce: "Lis trois notes (une par ligne) et affiche leur moyenne arrondie à 1 décimale avec <code>round(..., 1)</code>.<br>Avec 10, 12 et 14, le programme affiche <code>12.0</code>.",
        depart: "",
        tests: [{ entree: "10\n12\n14", attendu: "12.0" }, { entree: "9\n10\n10", attendu: "9.7" }, { entree: "20\n0\n5", attendu: "8.3" }, { entree: "12.5\n14\n15.5", attendu: "14.0" }],
        exige: [{ motif: "input\\s*\\(", message: "Les notes doivent être lues avec input()." }],
        indices: ["Une note peut être à virgule : utilise float(input()).", "moyenne = (a + b + c) / 3 puis print(round(moyenne, 1))"]
      }
    ]
  },
  {
    id: "m5",
    titre: "Décider",
    notion: "conditions if / else",
    cours: `
<p>Une <strong>condition</strong> permet de choisir quelles instructions exécuter.</p>
<pre>age = int(input())
if age >= 18:
    print("majeur")
else:
    print("mineur")</pre>
<p>Ne pas oublier les <strong>deux-points</strong> et l'<strong>indentation</strong>.</p>
<table class="ops"><tr><td><code>==</code></td><td>égal à (deux signes = pour comparer)</td></tr>
<tr><td><code>!=</code></td><td>différent de</td></tr>
<tr><td><code>&lt; &gt; &lt;= &gt;=</code></td><td>inférieur, supérieur, inférieur ou égal, supérieur ou égal</td></tr></table>
<p>Un seul <code>=</code> affecte une variable ; deux <code>==</code> comparent.</p>`,
    exercices: [
      {
        id: "m5e1", titre: "Majeur ou mineur",
        enonce: "Lis un âge. Affiche <code>majeur</code> si la personne a 18 ans ou plus, sinon <code>mineur</code>.",
        depart: "",
        tests: [{ entree: "18", attendu: "majeur" }, { entree: "17", attendu: "mineur" }, { entree: "40", attendu: "majeur" }, { entree: "5", attendu: "mineur" }],
        exige: [{ motif: "\\bif\\b", message: "Utilise une condition if." }],
        indices: ["if age >= 18:", "Attention à 18 : il faut >= et pas >."]
      },
      {
        id: "m5e2", titre: "Pair ou impair",
        enonce: "Lis un nombre entier. Affiche <code>pair</code> ou <code>impair</code>.",
        depart: "",
        tests: [{ entree: "4", attendu: "pair" }, { entree: "7", attendu: "impair" }, { entree: "0", attendu: "pair" }, { entree: "131", attendu: "impair" }],
        exige: [{ motif: "\\bif\\b", message: "Utilise une condition if." }],
        indices: ["Un nombre est pair si le reste de sa division par 2 vaut 0.", "if n % 2 == 0:"]
      },
      {
        id: "m5e3", titre: "Mot de passe",
        enonce: "Lis un mot de passe. S'il vaut <code>snt2026</code>, affiche <code>Accès autorisé</code>, sinon <code>Accès refusé</code>.",
        depart: "",
        tests: [{ entree: "snt2026", attendu: "Accès autorisé" }, { entree: "SNT2026", attendu: "Accès refusé" }, { entree: "azerty", attendu: "Accès refusé" }],
        exige: [{ motif: "\\bif\\b", message: "Utilise une condition if." }],
        indices: ["Ici on compare du texte : pas besoin de int().", "if mdp == \"snt2026\":"]
      },
      {
        id: "m5e4", titre: "Le plus grand",
        enonce: "Lis deux nombres entiers (un par ligne) et affiche le plus grand des deux, sans utiliser <code>max</code>.",
        depart: "",
        tests: [{ entree: "3\n8", attendu: "8" }, { entree: "10\n2", attendu: "10" }, { entree: "5\n5", attendu: "5" }, { entree: "-4\n-9", attendu: "-4" }],
        exige: [{ motif: "\\bif\\b", message: "Utilise une condition if." }],
        interdit: [{ motif: "max\\s*\\(", message: "Fais-le sans max(), avec une condition." }],
        indices: ["a = int(input()) puis b = int(input())", "if a > b: affiche a, sinon affiche b."]
      }
    ]
  },
  {
    id: "m6",
    titre: "Plusieurs cas",
    notion: "elif, and, or",
    cours: `
<p>Quand il y a plus de deux cas, on enchaîne avec <code>elif</code> (« sinon si »). Python teste les conditions dans l'ordre et s'arrête à la première vraie.</p>
<pre>if note >= 16:
    print("Très bien")
elif note >= 14:
    print("Bien")
else:
    print("Autre")</pre>
<p>On peut combiner des conditions :</p>
<table class="ops"><tr><td><code>and</code></td><td>les deux conditions doivent être vraies</td></tr>
<tr><td><code>or</code></td><td>au moins une des deux est vraie</td></tr>
<tr><td><code>not</code></td><td>inverse une condition</td></tr></table>
<pre>if age >= 12 and age < 18:
    print("adolescent")</pre>`,
    exercices: [
      {
        id: "m6e1", titre: "Mention",
        enonce: "Lis une note sur 20 (entier) et affiche la mention :<br><code>Très bien</code> à partir de 16, <code>Bien</code> à partir de 14, <code>Assez bien</code> à partir de 12, <code>Passable</code> à partir de 10, sinon <code>Insuffisant</code>.",
        depart: "",
        tests: [{ entree: "18", attendu: "Très bien" }, { entree: "16", attendu: "Très bien" }, { entree: "15", attendu: "Bien" }, { entree: "12", attendu: "Assez bien" }, { entree: "10", attendu: "Passable" }, { entree: "7", attendu: "Insuffisant" }],
        exige: [{ motif: "\\belif\\b", message: "Utilise elif pour enchaîner les cas." }],
        indices: ["Commence par le cas le plus haut : if note >= 16:", "Puis elif note >= 14:, elif note >= 12:, elif note >= 10:, else:"]
      },
      {
        id: "m6e2", titre: "Tarif cinéma",
        enonce: "Lis un âge et affiche le prix de la place : <code>5</code> pour les moins de 12 ans, <code>7</code> pour les 12-17 ans et les 65 ans et plus, <code>10</code> pour les autres.",
        depart: "",
        tests: [{ entree: "8", attendu: "5" }, { entree: "12", attendu: "7" }, { entree: "17", attendu: "7" }, { entree: "18", attendu: "10" }, { entree: "64", attendu: "10" }, { entree: "65", attendu: "7" }],
        exige: [{ motif: "\\b(or|and)\\b", message: "Combine des conditions avec or ou and." }],
        indices: ["Traite d'abord les moins de 12 ans.", "elif age < 18 or age >= 65:"]
      },
      {
        id: "m6e3", titre: "Année bissextile",
        enonce: "Une année est bissextile si elle est divisible par 4 mais pas par 100, <strong>ou</strong> si elle est divisible par 400. Lis une année et affiche <code>bissextile</code> ou <code>non bissextile</code>.",
        depart: "",
        tests: [{ entree: "2024", attendu: "bissextile" }, { entree: "2026", attendu: "non bissextile" }, { entree: "1900", attendu: "non bissextile" }, { entree: "2000", attendu: "bissextile" }],
        exige: [{ motif: "\\b(or|and)\\b", message: "Combine des conditions avec and / or." }],
        indices: ["« divisible par 4 » s'écrit a % 4 == 0", "if (a % 4 == 0 and a % 100 != 0) or a % 400 == 0:"]
      },
      {
        id: "m6e4", titre: "Triangle",
        enonce: "Lis les trois côtés d'un triangle (un par ligne). Affiche <code>équilatéral</code> si les trois sont égaux, <code>isocèle</code> si exactement deux sont égaux, sinon <code>quelconque</code>.",
        depart: "",
        tests: [{ entree: "3\n3\n3", attendu: "équilatéral" }, { entree: "3\n3\n5", attendu: "isocèle" }, { entree: "5\n3\n3", attendu: "isocèle" }, { entree: "4\n7\n4", attendu: "isocèle" }, { entree: "3\n4\n5", attendu: "quelconque" }],
        exige: [{ motif: "\\belif\\b", message: "Utilise elif." }],
        indices: ["Teste d'abord le cas équilatéral : a == b and b == c", "Isocèle : a == b or b == c or a == c"]
      }
    ]
  },
  {
    id: "m7",
    titre: "Tant que",
    notion: "boucle while",
    cours: `
<p>La boucle <code>while</code> répète des instructions <strong>tant qu'une condition est vraie</strong>. On l'utilise quand on ne sait pas à l'avance combien de tours il faudra.</p>
<pre>n = 1
while n < 100:
    n = n * 2
print(n)</pre>
<pre class="sortie">128</pre>
<p>Attention : si la condition reste toujours vraie, la boucle ne s'arrête jamais. Vérifie que quelque chose change à chaque tour.</p>`,
    exercices: [
      {
        id: "m7e1", titre: "Compte à rebours",
        enonce: "Lis un nombre n. Avec une boucle <code>while</code>, affiche n, n-1, … jusqu'à 1, puis <code>Décollage !</code>",
        depart: "",
        tests: [{ entree: "3", attendu: "3\n2\n1\nDécollage !" }, { entree: "5", attendu: "5\n4\n3\n2\n1\nDécollage !" }, { entree: "1", attendu: "1\nDécollage !" }],
        exige: [{ motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        indices: ["while n >= 1:", "Dans la boucle : affiche n puis n = n - 1. Le message final se place après la boucle."]
      },
      {
        id: "m7e2", titre: "Vidéo virale",
        enonce: "Une vidéo a 100 vues et ce nombre double chaque jour. Lis un objectif N et affiche le nombre de jours nécessaires pour que les vues <strong>dépassent strictement</strong> N.",
        depart: "vues = 100\njours = 0\n",
        tests: [{ entree: "1000", attendu: "4" }, { entree: "50", attendu: "0" }, { entree: "100", attendu: "1" }, { entree: "1000000", attendu: "14" }],
        exige: [{ motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        indices: ["Tant que vues <= N, on passe au jour suivant.", "Dans la boucle : vues = vues * 2 et jours = jours + 1"]
      },
      {
        id: "m7e3", titre: "Devine le nombre",
        enonce: "Le nombre secret est 42. Lis des propositions jusqu'à ce que l'utilisateur trouve. Pour chaque proposition fausse, affiche <code>Trop petit</code> ou <code>Trop grand</code>. Quand il trouve, affiche <code>Gagné ! Nombre d'essais : </code> suivi du nombre d'essais.",
        depart: "secret = 42\n",
        tests: [{ entree: "10\n50\n42", attendu: "Trop petit\nTrop grand\nGagné ! Nombre d'essais : 3" }, { entree: "42", attendu: "Gagné ! Nombre d'essais : 1" }, { entree: "99\n1\n41\n43\n42", attendu: "Trop grand\nTrop petit\nTrop petit\nTrop grand\nGagné ! Nombre d'essais : 5" }],
        exige: [{ motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        indices: ["Lis une première proposition avant la boucle, et compte les essais dans une variable.", "while proposition != secret: affiche l'indice, puis lis une nouvelle proposition et ajoute 1 au compteur."]
      },
      {
        id: "m7e4", titre: "Somme jusqu'à zéro",
        enonce: "Lis des nombres entiers jusqu'à ce que l'utilisateur tape <code>0</code>, puis affiche la somme des nombres tapés.",
        depart: "",
        tests: [{ entree: "5\n3\n0", attendu: "8" }, { entree: "0", attendu: "0" }, { entree: "10\n-4\n7\n0", attendu: "13" }],
        exige: [{ motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        indices: ["somme = 0 puis n = int(input()) avant la boucle.", "while n != 0: ajoute n à la somme, puis lis le nombre suivant."]
      }
    ]
  },
  {
    id: "m8",
    titre: "Fonctions",
    notion: "def et return",
    cours: `
<p>Une <strong>fonction</strong> est un petit programme auquel on donne un nom. Elle reçoit des valeurs (les <strong>paramètres</strong>) et renvoie un résultat avec <code>return</code>.</p>
<pre>def triple(x):
    return 3 * x

print(triple(5))
print(triple(10) + 1)</pre>
<pre class="sortie">15
31</pre>
<p><code>return</code> renvoie le résultat sans l'afficher ; c'est le programme qui appelle la fonction qui décide quoi en faire.</p>
<p>Dans ces exercices, écris seulement la fonction : la vérification l'appelle avec plusieurs valeurs.</p>`,
    exercices: [
      {
        id: "m8e1", titre: "Carré",
        enonce: "Écris une fonction <code>carre(n)</code> qui renvoie n × n.",
        depart: "def carre(n):\n    ",
        tests: [{ ajout: "print(carre(3))", attendu: "9" }, { ajout: "print(carre(-4))", attendu: "16" }, { ajout: "print(carre(0))", attendu: "0" }],
        exige: [{ motif: "def\\s+carre\\s*\\(", message: "La fonction doit s'appeler carre." }, { motif: "\\breturn\\b", message: "La fonction doit renvoyer le résultat avec return." }],
        indices: ["Une seule ligne dans la fonction suffit.", "return n * n"]
      },
      {
        id: "m8e2", titre: "Prix TTC",
        enonce: "Écris une fonction <code>ttc(prix_ht)</code> qui renvoie le prix avec 20 % de TVA (prix × 1,2), arrondi à 2 décimales.",
        depart: "def ttc(prix_ht):\n    ",
        tests: [{ ajout: "print(ttc(10))", attendu: "12.0" }, { ajout: "print(ttc(19.99))", attendu: "23.99" }, { ajout: "print(ttc(0))", attendu: "0.0" }],
        exige: [{ motif: "def\\s+ttc\\s*\\(", message: "La fonction doit s'appeler ttc." }, { motif: "\\breturn\\b", message: "Utilise return." }],
        indices: ["En Python, la virgule décimale s'écrit avec un point : 1.2", "return round(prix_ht * 1.2, 2)"]
      },
      {
        id: "m8e3", titre: "Est pair ?",
        enonce: "Écris une fonction <code>est_pair(n)</code> qui renvoie <code>True</code> si n est pair et <code>False</code> sinon.",
        depart: "def est_pair(n):\n    ",
        tests: [{ ajout: "print(est_pair(4))", attendu: "True" }, { ajout: "print(est_pair(7))", attendu: "False" }, { ajout: "print(est_pair(0))", attendu: "True" }],
        exige: [{ motif: "def\\s+est_pair\\s*\\(", message: "La fonction doit s'appeler est_pair." }, { motif: "\\breturn\\b", message: "Utilise return." }],
        indices: ["Tu peux utiliser if / else avec return True et return False.", "Version courte : return n % 2 == 0"]
      },
      {
        id: "m8e4", titre: "Le plus grand des trois",
        enonce: "Écris une fonction <code>plus_grand(a, b, c)</code> qui renvoie le plus grand des trois nombres, sans utiliser <code>max</code>.",
        depart: "def plus_grand(a, b, c):\n    ",
        tests: [{ ajout: "print(plus_grand(1, 5, 3))", attendu: "5" }, { ajout: "print(plus_grand(9, 2, 4))", attendu: "9" }, { ajout: "print(plus_grand(1, 2, 7))", attendu: "7" }, { ajout: "print(plus_grand(4, 4, 1))", attendu: "4" }],
        exige: [{ motif: "def\\s+plus_grand\\s*\\(", message: "La fonction doit s'appeler plus_grand." }, { motif: "\\breturn\\b", message: "Utilise return." }],
        interdit: [{ motif: "max\\s*\\(", message: "Fais-le sans max()." }],
        indices: ["Garde le plus grand dans une variable : grand = a", "Puis : if b > grand: grand = b, pareil pour c, et return grand."]
      }
    ]
  }
];
