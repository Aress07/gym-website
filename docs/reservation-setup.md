# Réserver en 15 minutes — liaison site ↔ Google Sheets

Le formulaire de réservation du site envoie les demandes vers une Web App
Google Apps Script, qui écrit la ligne dans un tableur, génère une référence
et envoie par e-mail le récapitulatif (cours, créneau, référence, montant).

## 1. Créer le tableur

1. Créez une feuille Google Sheets (ex. « Réservations ADRENAL'IN »).
2. Créez deux onglets vides nommés exactement :
   - `Réservations`
   - `Instructeurs`
   (Les en-têtes de colonnes sont ajoutés automatiquement au premier envoi.)

## 2. Copier le script

1. Dans le tableur : menu **Extensions ▸ Apps Script**.
2. Remplacez tout le contenu de `Code.gs` par le contenu de
   `apps-script/Code.gs` de ce dépôt, puis **Enregistrer** (Ctrl+S).

## 3. Renseigner l'e-mail du studio (script properties)

1. Dans Apps Script : menu ⚙ **Paramètres du projet ▸ Paramètres du script**.
2. Ajoutez deux propriétés :
   - `TOKEN` : un mot de passe long et aléatoire (voir étape 4)
   - `STUDIO_EMAIL` : l'adresse qui recevra la copie de chaque réservation

## 4. Choisir un token

1. Générer un jeton long, ex. :
   ```
   node -e "console.log(crypto.randomBytes(24).toString('hex'))"
   ```
   (ou https://randompasswordgen.com — 24 caractères minimum)
2. Mettez-le dans la propriété `TOKEN` (étape 3) — c'est SA valeur qui compte,
   les valeurs `CHANGE_ME` dans `Code.gs` ne servent que de rappel.

## 5. Déployer la Web App

1. Apps Script : bouton **Déployer ▸ Nouveau déploiement**.
2. Type : **Application Web**.
   - Obtenir la description : libre (ex. « Formulaire site ADRENAL'IN »)
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
3. **Déployer**, puis copiez l'URL de l'application Web qui se termine par
   `/exec`.

## 6. Configurer le site

1. Dans le dépôt : créez le fichier `.env.local` (à partir de
   `.env.local.example`) :
   ```
   NEXT_PUBLIC_SHEETS_API_URL=https://script.google.com/macros/s/XXXX/exec
   NEXT_PUBLIC_SHEETS_API_TOKEN=le_token_de_l_etape_4
   ```
2. Redémarrez `npm run dev` (ou redéployez sur Vercel).
3. `gitignore` vérifié : `.env.local` est déjà ignoré.

## 7. Tester

1. Ouvrez `/fr` et soumettez le formulaire (données de test).
2. Vérifiez :
   - la ligne apparaît dans l'onglet `Réservations` ET `Instructeurs` ;
   - la référence `ADN-AAAA-MM-JJ-XXXX` est affichée dans l'e-mail ;
   - l'e-mail client arrive (cours, niveau, créneau, référence, 10 €) ;
   - une copie arrive sur `STUDIO_EMAIL`.

Si un e-mail n'arrive pas : la messagerie Gmail a des quotas
(≈ 100 destinataires/jour) — largement suffisant pour ce volume.

## Notes

- `NEXT_PUBLIC_*` est embarqué dans le navigateur : TOKEN = anti-spam
  (les bots ne peuvent pas lire le formulaire), pas un secret absolu.
- La requête est en `text/plain` pour éviter le pré-vol CORS (les Web Apps
  Apps Script ne répondent pas aux OPTIONS). Ne pas ajouter d'en-tête
  personnalisé au `fetch`, sinon le navigateur bloquera l'envoi.
- Le template d'e-mail est dans `sendInvoices_` : couleurs et montant
  (10 €) s'y trouvent si vous devez le modifier plus tard.