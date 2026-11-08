# Test réel et plan captures/vidéo — Structory Green pour Sheets

Gabarit de SMC (suivre_mes_comptes, PR #29, commit 9584abb), adapté à Green.
Brouillon : rien n'est présenté à larose75 avant le test réel.

Particularités de Green, qui simplifient le test :
- l'add-on n'écrit **rien** dans le classeur et n'appelle **aucune** API ;
- il n'y a pas de connexion dans le volet (la page structory.ai/green-embed/ est publique) ;
- pas de démo à créer tant que l'organisation `greendemo` n'existe pas (aucune carte de démo) ;
- donc pas de « mise à jour sans bouton » à mesurer : le volet affiche une page statique.

## Texte « En clair » pour la PR (sans jargon)

> Structory Green s'ouvre dans Google Sheets (menu Extensions > Structory Green). Un volet à
> droite présente le module et son calculateur de CO2 évité. Le classeur n'est pas modifié et
> aucune donnée n'est lue. Rien n'est publié tant que larose75 n'a pas cliqué.

## Procédure de test réel (classeur vierge, compte de test)

Exécutée par une session avec compte Google de test, ou par larose75. Classeur vierge, aucune
donnée client.

| # | Étape | Attendu | Observé |
|---|---|---|---|
| 1 | Installer l'add-on en test privé (projet Apps Script lié au dépôt, déploiement de test) | Installation sans erreur | (à remplir) |
| 2 | Ouvrir le classeur | Menu « Structory Green » dans Extensions | (à remplir) |
| 3 | Consentement | Un seul droit demandé : afficher le volet (script.container.ui) | (à remplir) |
| 4 | Ouvrir le volet | Page green-embed affichée, aucune page de connexion | (à remplir) |
| 5 | Message depuis une autre origine | Ignoré : l'état du volet ne change pas | (à remplir) |
| 6 | Réseau coupé | État d'erreur ou volet vide, Sheets reste utilisable | (à remplir) |
| 7 | Logo | Icône du menu et du volet = logo Green (URL en 200) | (à remplir) |
| 8 | Désinstaller le test | Aucun onglet créé ni modifié dans le classeur | (à remplir) |

Résultats à consigner : date, compte de test, navigateur, résultat de chaque étape, capture.

## Captures et vidéo (pour la fiche de publication)

Format : 1280×800, PNG, zoom 100 %. Quatre écrans, pas plus :
1. menu Extensions avec « Structory Green » ;
2. volet ouvert, page d'accueil du module ;
3. volet en réseau coupé (état d'erreur) ;
4. logo dans le menu.

Vidéo non répertoriée de moins d'une minute : ouverture du menu, ouverture du volet, fermeture.
Justification du seul droit demandé : `script.container.ui` (afficher le volet).

## Publication

Les gestes Google (console, captures, vidéo, soumission à la vérification) sont préparés par
V01 / Gimly, pas par larose75. Il n'y a rien à faire pour larose75 sauf le clic « Publier » final,
après l'accord de Google.

Prérequis avant toute publication :
- la PR #9 est prête (URL du logo en 200, test réel fait et consigné) ;
- la PR est fusionnée par larose75 ;
- le manifeste publié est celui de `main`.
