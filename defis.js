/*
 * Python en classe — défis de fin de chapitre
 *
 * 6 défis qui mélangent les notions des 8 chapitres (boucles, conditions, while, fonctions).
 * Ils se débloquent quand un élève a réussi les 32 exercices du parcours, et ne comptent pas
 * dans sa progression « x / 32 ». Même format que exercices.js ; les identifiants m9e1 à m9e6
 * ne doivent plus changer une fois les élèves lancés.
 */
window.DEFIS = [
  {
    id: "m9",
    titre: "Défis",
    notion: "pour aller plus loin",
    defi: true,
    cours: "",
    exercices: [
      {
        id: "m9e1", titre: "Le sapin",
        enonce: `<p>Lis un nombre <code>n</code> et affiche un sapin de <code>n</code> lignes. La ligne numéro <code>i</code> contient <code>2 × i − 1</code> étoiles, centrées grâce à des espaces placés devant.</p>
<p>Exemple avec <code>n = 4</code> :</p>
<pre class="sortie">   *
  ***
 *****
*******</pre>`,
        depart: "n = int(input())\n",
        tests: [
          { entree: "1", attendu: "*" },
          { entree: "3", attendu: "  *\n ***\n*****" },
          { entree: "4", attendu: "   *\n  ***\n *****\n*******" },
          { entree: "6", attendu: "     *\n    ***\n   *****\n  *******\n *********\n***********" }
        ],
        exige: [{ motif: "\\bfor\\b", message: "Utilise une boucle for." }],
        indices: ["Dans la boucle, i va de 1 à n : for i in range(1, n + 1):", "Il y a n - i espaces puis 2 * i - 1 étoiles. On répète un texte avec * : \" \" * 3 donne trois espaces."]
      },
      {
        id: "m9e2", titre: "Rendre la monnaie",
        enonce: `<p>Un client doit payer une somme entière en dirhams. Lis cette somme et affiche le <strong>plus petit nombre</strong> de billets et de pièces pour la payer, avec les valeurs <strong>200, 100, 50, 20, 10, 5, 2 et 1</strong> DH, de la plus grande à la plus petite. N'affiche que les valeurs utilisées.</p>
<p>Exemple pour <code>99</code> :</p>
<pre class="sortie">1 x 50 DH
2 x 20 DH
1 x 5 DH
2 x 2 DH</pre>`,
        depart: "somme = int(input())\n",
        tests: [
          { entree: "99", attendu: "1 x 50 DH\n2 x 20 DH\n1 x 5 DH\n2 x 2 DH" },
          { entree: "285", attendu: "1 x 200 DH\n1 x 50 DH\n1 x 20 DH\n1 x 10 DH\n1 x 5 DH" },
          { entree: "1000", attendu: "5 x 200 DH" },
          { entree: "3", attendu: "1 x 2 DH\n1 x 1 DH" },
          { entree: "0", attendu: "" }
        ],
        indices: ["Pour chaque valeur, le nombre de billets est somme // valeur, et ce qui reste est somme % valeur.", "Pour la valeur 200 : nb = somme // 200, puis somme = somme % 200. N'affiche que si nb > 0. Recommence pour 100, 50, etc."]
      },
      {
        id: "m9e3", titre: "Somme des chiffres",
        enonce: "Lis un nombre entier positif et affiche la <strong>somme de ses chiffres</strong>. Par exemple, pour <code>1234</code> le programme affiche <code>10</code> (1 + 2 + 3 + 4). Tu n'as pas le droit de transformer le nombre en texte.",
        depart: "n = int(input())\n",
        tests: [
          { entree: "1234", attendu: "10" },
          { entree: "7", attendu: "7" },
          { entree: "999", attendu: "27" },
          { entree: "100", attendu: "1" },
          { entree: "0", attendu: "0" }
        ],
        exige: [{ motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        interdit: [{ motif: "\\bstr\\s*\\(", message: "Fais-le sans str() : avec des calculs seulement." }],
        indices: ["Le dernier chiffre d'un nombre est n % 10.", "Tant que n > 0 : ajoute n % 10 à la somme, puis enlève le dernier chiffre avec n = n // 10."]
      },
      {
        id: "m9e4", titre: "Nombre premier",
        enonce: "Un nombre est <strong>premier</strong> s'il n'est divisible que par 1 et par lui-même. Lis un entier <code>n</code> (au moins 2) et affiche <code>premier</code> ou <code>pas premier</code>. Par exemple, 17 est premier, 91 ne l'est pas (7 × 13).",
        depart: "n = int(input())\n",
        tests: [
          { entree: "2", attendu: "premier" },
          { entree: "15", attendu: "pas premier" },
          { entree: "17", attendu: "premier" },
          { entree: "25", attendu: "pas premier" },
          { entree: "91", attendu: "pas premier" },
          { entree: "97", attendu: "premier" }
        ],
        exige: [{ motif: "\\b(for|while)\\b", message: "Utilise une boucle." }],
        indices: ["Teste tous les diviseurs d : n est divisible par d si n % d == 0.", "Commence avec premier = True. Si tu trouves un diviseur entre 2 et n - 1, mets premier = False. Affiche à la fin."]
      },
      {
        id: "m9e5", titre: "La suite de Syracuse",
        enonce: `<p>On part d'un entier <code>n</code>. Tant que <code>n</code> n'est pas égal à 1 :</p>
<ul><li>si <code>n</code> est pair, on le divise par 2 ;</li><li>sinon, on le remplace par <code>3 × n + 1</code>.</li></ul>
<p>Lis <code>n</code> et affiche le <strong>nombre d'étapes</strong> nécessaires pour arriver à 1. Exemple : 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1, soit <code>8</code> étapes. On ne sait toujours pas démontrer que cela finit toujours par arriver à 1 !</p>`,
        depart: "n = int(input())\n",
        tests: [
          { entree: "6", attendu: "8" },
          { entree: "1", attendu: "0" },
          { entree: "7", attendu: "16" },
          { entree: "27", attendu: "111" }
        ],
        exige: [{ motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        indices: ["Garde un compteur d'étapes : étapes = 0, et ajoute 1 à chaque tour de boucle.", "while n != 1 : if n % 2 == 0: n = n // 2, sinon n = 3 * n + 1. N'oublie pas d'ajouter 1 aux étapes."]
      },
      {
        id: "m9e6", titre: "PGCD d'Euclide",
        enonce: `<p>Le <strong>PGCD</strong> de deux nombres est le plus grand nombre qui divise les deux. Ex. : PGCD(48, 18) = 6.</p>
<p>Euclide a trouvé une méthode : tant que <code>b</code> n'est pas nul, on remplace <code>a</code> par <code>b</code> et <code>b</code> par le reste de la division de <code>a</code> par <code>b</code>. À la fin, le PGCD est <code>a</code>.</p>
<p>Écris une fonction <code>pgcd(a, b)</code> qui renvoie le PGCD de a et b.</p>`,
        depart: "def pgcd(a, b):\n    ",
        tests: [
          { ajout: "print(pgcd(48, 18))", attendu: "6" },
          { ajout: "print(pgcd(17, 5))", attendu: "1" },
          { ajout: "print(pgcd(100, 75))", attendu: "25" },
          { ajout: "print(pgcd(7, 7))", attendu: "7" },
          { ajout: "print(pgcd(12, 0))", attendu: "12" }
        ],
        exige: [{ motif: "def\\s+pgcd\\s*\\(", message: "La fonction doit s'appeler pgcd." }, { motif: "\\breturn\\b", message: "Utilise return." }, { motif: "\\bwhile\\b", message: "Utilise une boucle while." }],
        interdit: [{ motif: "\\bimport\\b", message: "Pas d'import : écris la méthode d'Euclide toi-même." }],
        indices: ["Il te faut une variable de plus pour ne pas perdre a : reste = a % b", "while b != 0: reste = a % b, puis a = b, puis b = reste. Après la boucle : return a."]
      }
    ]
  }
];
