# Check-list de mise en ligne — COMPTOIR 247

À suivre dans l'ordre le jour où le site passe de la démo au site officiel.

## 1. Contenus (avant tout)

- [ ] E-mail de contact réel dans `CONFIG.email` (`_src/build.mjs`)
- [ ] Mentions légales complètes, sans champ surligné (`_src/pages/mentions-legales.html`)
- [ ] Emplacements des distributeurs renseignés (`_src/pages/distributeurs-produits-frais.html`)
- [ ] Textes relus et validés par le client
- [ ] Photos réelles ajoutées si disponibles (sinon, photos Pexels déjà créditées)

## 2. Nom de domaine

- [ ] Acheter le domaine (ex. `comptoir247.fr`)
- [ ] GitHub → dépôt → **Settings → Pages → Custom domain** : saisir `www.comptoir247.fr` (cela crée un fichier `CNAME` dans le dépôt : faire un `git pull` ensuite)
- [ ] Chez le registraire, DNS :
  - `www` → enregistrement **CNAME** vers `nstopastuces-sys.github.io`
  - domaine nu → enregistrements **A** vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- [ ] Attendre la propagation, puis cocher **Enforce HTTPS** dans Settings → Pages

## 3. Configuration du site

Dans `_src/build.mjs` :

- [ ] `siteUrl: "https://www.comptoir247.fr"` (sans `/` final)
- [ ] `demo: false` : active l'indexation, le `robots.txt` complet et le sitemap

Dans `llms.txt` (fichier écrit à la main) :

- [ ] Remplacer les URL `https://nstopastuces-sys.github.io/comptoir247/...` par le domaine définitif

Puis :

```bash
node _src/build.mjs
git add -A
git commit -m "Mise en ligne sur le domaine définitif"
git push
```

## 4. Vérifications après déploiement

- [ ] Les 5 pages s'affichent sur le domaine, en HTTPS
- [ ] Le code source ne contient plus `noindex` (sauf sur la page 404) : `<meta name="robots" content="index, follow…">`
- [ ] `https://www.comptoir247.fr/robots.txt` annonce le sitemap et autorise les robots IA
- [ ] `https://www.comptoir247.fr/sitemap.xml` liste les URL du domaine définitif
- [ ] Une adresse inexistante affiche la page « Ce casier est vide »
- [ ] Le formulaire de contact ouvre bien un e-mail vers la bonne adresse
- [ ] Le partage du lien (WhatsApp, Facebook, LinkedIn) affiche l'image et le titre
- [ ] Test des données structurées : https://search.google.com/test/rich-results
- [ ] Test mobile et performance : https://pagespeed.web.dev/

## 5. Référencement

- [ ] **Google Search Console** : ajouter le domaine, valider (enregistrement DNS TXT), soumettre `sitemap.xml`
- [ ] **Bing Webmaster Tools** : importer depuis Search Console (Bing alimente aussi ChatGPT et Copilot)
- [ ] **Fiche Google Business Profile** (Google Maps), avec le lien du site, et une fiche par distributeur si possible
- [ ] **Instagram** : mettre le lien du site dans la bio de @comptoir247
- [ ] Ancienne URL de démo : elle continuera de rediriger vers le domaine une fois celui-ci configuré dans GitHub Pages

## 6. Après le lancement

- [ ] Ajouter chaque nouvel emplacement de distributeur sur le site, puis rebuild et push
- [ ] Mettre à jour la FAQ selon les questions reçues
- [ ] Suivre les requêtes dans Search Console après 4 à 6 semaines
