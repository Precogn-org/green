# Pas-à-pas console — Structory Green (gestes uniques, un par un)

Document de travail. Rien n'est lancé. Exécutant à confirmer (V00 tranche avec larose75).
Calqué sur `PUBLICATION_ADDON_SHEETS.md` §4 et sur les leçons de SMC (ETAPES_CONSOLE.md, refus du
Branding le 19/10). Une étape = un geste. Ne passer à la suivante qu'après la capture attendue.

Valeurs à utiliser (vérifiées dans le dépôt ou par curl, le 2026-10-20) :
- Nom : `Structory Green`
- Domaine : `structory.ai`
- Accueil : `https://structory.ai/green/addon/` (À CRÉER par A13, pas encore en ligne)
- Confidentialité : `https://structory.ai/green/confidentialite` (À CRÉER)
- Conditions : `https://structory.ai/green/conditions` (À CRÉER)
- Contact : `larose75@structory.ai`
- Logo : fichier `logo-green-128.png` (128×128). Source sur le VPS : `~/claude-rc/sessions/green/logos/logo-green-128.png`. À télécharger sur le PC avant l'upload (la console demande un fichier, pas une URL).
- Portée unique : `https://www.googleapis.com/auth/script.container.ui` (sensible).
- Script ID et version : donnés par V01 (version 2, déploiement de test @2). À recopier tels quels.
- ID du projet Google Cloud Green : **à créer à l'étape 1**, à noter.

## Étape 1 — Créer le projet Google Cloud dédié
Lien : https://console.cloud.google.com/projectcreate
Taper le nom `Structory Green` puis cliquer **Créer**.
Attendu : le sélecteur de projet affiche `Structory Green`. Capture du sélecteur.

## Étape 2 — Lier le projet Apps Script à ce projet Cloud
Lien : le projet Apps Script Green (ouvrir par son ID donné par V01), menu **Paramètres du projet**.
Cliquer **Modifier le projet Google Cloud** et coller le numéro du projet créé à l'étape 1.
Attendu : le numéro de projet est affiché sous « Projet Google Cloud standard ». Capture.

## Étape 3 — Choisir le type d'audience
Lien : `https://console.cloud.google.com/auth/audience?project=<PROJECT_ID_GREEN>`
Vérifier que le type est **Externe**, sinon le changer.
Attendu : « Externe » affiché. Capture.

## Étape 4 — Remplir le Branding
Lien : `https://console.cloud.google.com/auth/branding?project=<PROJECT_ID_GREEN>`
Coller les valeurs de la liste ci-dessus (nom, accueil, confidentialité, conditions, domaine, contact) et téléverser le logo.
Cliquer **Enregistrer**.
Attendu : bandeau « Enregistré ». Capture.

## Étape 5 — Vérifier le Branding
Sur la même page, cliquer **Vérifier le branding**.
Attendu : soit « Branding validé », soit une liste de problèmes à corriger. Capture de la liste.
Si problème : ne rien modifier d'autre tant que la liste n'est pas lue.

## Étape 6 — Attendre le Branding validé (point d'arrêt)
Ne rien modifier sur la page Branding tant que Google n'a pas validé. Un changement peut relancer la vérification.
Attendu : « Branding validé ». Si ce n'est pas le cas après plusieurs jours, signaler à V00 (ne pas improviser).

## Étape 7 — Ajouter la portée
Lien : `https://console.cloud.google.com/auth/scopes?project=<PROJECT_ID_GREEN>`
Cliquer **Ajouter ou supprimer des portées**, coller `https://www.googleapis.com/auth/script.container.ui` dans « Ajouter manuellement », puis **Ajouter au tableau**.
Attendu : une seule ligne dans le tableau, marquée sensible. Capture.

## Étape 8 — Coller la justification de la portée
Sur la même page, ouvrir la justification de `script.container.ui` et coller le texte EN (puis FR) de `COLLER_CONSOLE.md`, écran 2.
Attendu : le champ affiche le texte collé, sans troncature. Capture.

## Étape 9 — Enregistrer les droits
Cliquer **Mettre à jour** puis **Enregistrer**.
Attendu : bandeau « Enregistré ». Capture.

## Étape 10 — Activer le SDK Marketplace
Lien : `https://console.cloud.google.com/apis/library?project=<PROJECT_ID_GREEN>`
Chercher `Google Workspace Marketplace SDK` puis cliquer **Activer**.
Attendu : la page de l'API affiche « Gérer ». Capture.

## Étape 11 — Configurer l'application Marketplace
Lien : `https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk?project=<PROJECT_ID_GREEN>`
Régler : visibilité **Publique**, installation **individuelle**, intégration **Module complémentaire Sheets**, ID de déploiement fourni par V01, portée `script.container.ui`, liens accueil / confidentialité / conditions. Cliquer **Enregistrer le brouillon**.
Attendu : bandeau « Brouillon enregistré ». Capture.

## Étape 12 — Test réel dans un classeur neuf (avant toute vidéo)
Ouvrir un classeur Google Sheets vierge avec un compte de test (pas celui du propriétaire du projet), puis installer le déploiement de test @2.
Suivre `TEST_REEL.md`, étapes 1 à 8, et consigner « attendu / observé ».
Attendu : les 8 lignes remplies. Captures des étapes 2, 4 et 7.

## Étape 13 — Vidéo
Suivre `VIDEO_SCENARIO.md` (une minute, plein écran, masquage des onglets et des adresses). Téléverser en « Non répertoriée » sur YouTube.
Attendu : lien YouTube non répertorié qui s'ouvre hors compte. Garder le lien.

## Étape 14 — Préparer la vérification Google
Dans Auth > Audience (`https://console.cloud.google.com/auth/audience?project=<PROJECT_ID_GREEN>`), cliquer **Prepare for verification** (ou équivalent affiché).
Coller : lien vidéo (étape 13), instructions de test (TEST_REEL.md), justification de la portée.
Attendu : la demande est enregistrée et Google affiche un délai. Capture.
Ne pas cliquer sur **Passer en production** avant accord de V00.

## Étape 15 — Marketplace : fiche du Store
Sur la page Marketplace SDK, onglet **Fiche du Store**.
Coller les textes FR puis EN de `FICHE.md`, catégorie **Productivité**, icône 128×128, captures de `assets/` (à produire), liens légaux.
Attendu : aucun champ en rouge. Capture.

## Étape 16 — Publier (POINT IRRÉVERSIBLE, par larose75 seul)
Seulement après : Branding validé (étape 6), vérification Google accordée, test réel rejoué (étape 12), accord explicite de V00 et de larose75.
Attendu : rien tant que ces conditions ne sont pas remplies.

## Points d'arrêt à signaler à V00 (ne pas improviser)
- Branding refusé : lire le motif exact dans le courriel de Google avant de corriger.
- Projet Cloud introuvable ou lien Apps Script non modifiable : arrêter et signaler.
- Délai de validation : pas de garantie, de quelques jours à plusieurs semaines.
