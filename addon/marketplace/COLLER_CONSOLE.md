# Textes à coller dans la console — Structory Green (gabarit SMC, COLLER_CONSOLE.md)

Textes exacts pour chaque écran de la console Google. Rien n'est publié.
Exécuté par V01 / Gimly, pas par larose75 (sauf le clic « Publier » final, après accord de Google).
Ce fichier donne uniquement les textes à coller ; aucun geste n'est attribué à larose75.

Statut des champs : **OK** = vérifié dans le code ou sur une URL ; **À CRÉER** = page ou identifiant
qui n'existe pas encore.

## Écran 1 — Auth > Image de marque (branding)
- Nom de l'application : `Structory Green` — OK
- Logo : fichier `logo-green-128.png` (128×128, fond transparent). Source : `~/claude-rc/sessions/green/logos/logo-green-128.png`, déjà en ligne sur `https://structory.ai/logo-green-128.png` (200) — OK
- Page d'accueil : `https://structory.ai/green/addon/` — À CRÉER (site-af / A13)
- Politique de confidentialité : `https://structory.ai/green/confidentialite` — À CRÉER (A13)
- Conditions d'utilisation : `https://structory.ai/green/conditions` — À CRÉER (A13)
- Domaine autorisé : `structory.ai` — OK (vérifié pour SMC le 13/10)
- E-mail de contact : `larose75@structory.ai` — OK (même adresse que SMC)

## Écran 2 — Auth > Accès aux données (portées)
Une seule portée à coller :
```
https://www.googleapis.com/auth/script.container.ui
```
Portée **sensible** (triangle rouge sur la console, confirmé par V00 le 20/10). Il faut donc la justifier.

Justification de `script.container.ui` (EN, à coller telle quelle) :
display the add-on's side panel next to the spreadsheet (Extensions > Structory Green menu); no other dialog.

Justification de `script.container.ui` (FR, pour la page de confidentialité) :
afficher le volet de l'add-on à droite du classeur (menu Extensions > Structory Green) ; aucune autre boîte de dialogue.

Aucune autre portée : pas de `spreadsheets`, pas de `script.external_request`, pas de `userinfo.email`. Le manifeste ne contient que `script.container.ui` (`addon/appsscript.json`).

## Écran 3 — API et services > Bibliothèque
Activer `Google Workspace Marketplace SDK` — À CRÉER (même opération que SMC, projet Cloud Green à créer).

## Écran 4 — Marketplace SDK > Configuration de l'application
- Visibilité : Publique ; installation individuelle ; intégration Module complémentaire Sheets
- ID de déploiement : **À CRÉER** (projet Apps Script du module Green, déploiement versionné)
- Portées OAuth : `script.container.ui` seule
- Liens : accueil `https://structory.ai/green/addon/`, confidentialité `https://structory.ai/green/confidentialite`, conditions `https://structory.ai/green/conditions`

## Écran 5 — Marketplace SDK > Fiche du Store
Texte prêt dans `addon/marketplace/FICHE.md` (FR et EN, catégorie Productivité).
- Nom FR et EN : `Structory Green`
- Description courte FR (128 car.) et EN (116 car.) : voir FICHE.md
- Captures : 4 écrans prévus (voir FICHE.md) — **À CRÉER**
- Vidéo : `VIDEO_SCENARIO.md`, une minute — **À CRÉER**

## Écran 6 — Auth > Audience
Passage en production : après validation des écrans 1 à 5 et de la PR #9 prête. Géré par V01.

## Prérequis avant de coller
1. Pages légales en ligne et en 200 (site-af / A13).
2. Projet Apps Script Green déployé en version figée (ID à donner par V01).
3. Test réel rejoué dans un classeur neuf (protocole : `TEST_REEL.md`).
4. Captures et vidéo produites (`VIDEO_SCENARIO.md`).
