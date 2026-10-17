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

1. Installer l'add-on en test privé (projet Apps Script lié au dépôt, déploiement de test).
2. Ouvrir le classeur : le menu « Structory Green » apparaît dans Extensions.
3. Ouvrir le volet : aucune page de connexion n'apparaît ; la page green-embed s'affiche.
4. Vérifier le contrôle de provenance : un message posté depuis une autre origine est ignoré
   (la barre d'état du volet ne change pas).
5. Réseau coupé : le volet affiche un état d'erreur ou reste vide, sans bloquer Sheets.
6. Compte non membre : sans objet (aucune donnée de l'organisation).
7. Logo : l'icône du menu et du volet affiche le logo Green (URL en 200 requise).
8. Désinstaller le test privé et vérifier qu'aucun onglet n'a été créé dans le classeur.

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
