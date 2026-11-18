# Check-list de mise en ligne — COMPTOIR 247

Hébergement officiel : **Netlify** (projet `comptoir247`, relié au dépôt GitHub). À chaque push sur `main`,
Netlify lance `node _src/build.mjs --dist` (voir `netlify.toml`) et publie le dossier `dist/`, qui ne contient
que les fichiers publics. GitHub Pages ne sert plus que de démo, toujours non indexée.

> **Où on en est (18/11/2026, fin de journée)** — reprendre à l'étape 3 :
> - Site en ligne sur https://comptoir247.netlify.app (toujours en « noindex »), formulaire actif dans Netlify Forms.
> - Zone DNS OVH faite et propagée : `@ A 75.2.60.5`, `www CNAME comptoir247.netlify.app.` (MX, SPF et DKIM intacts).
> - Netlify était en train de créer le certificat HTTPS : tant qu'il n'est pas prêt, il refuse de changer le domaine principal.
> - **Prochaine action** : quand Netlify → Domain management → HTTPS affiche le certificat actif, passer `www.comptoir247.fr` en domaine principal (Options → Set as primary domain), puis étape 4.
> - En attente : confirmation des notifications e-mail par le client (lien Netlify reçu sur contact@comptoir247.fr) ; e-mails de test arrivés en indésirables chez nous → marquer « pas un spam ».

## 1. Contenus

- [x] Mentions légales complètes (données du registre : SAS au capital de 1 000 €, RCS Chambéry 937 961 217, TVA FR90937961217)
- [ ] Directeur de la publication confirmé par le client (actuellement : François Husson, Président)
- [ ] Adresses précises et photos des Comptoirs renseignées (`_src/pages/notre-expertise.html`, section `#emplacements`)
- [ ] Blocs « Achat ou leasing » et « Solution clé en main, c'est-à-dire ? » validés (`_src/pages/je-m-equipe.html`)
- [ ] Lien Google My Business du Fonta'Distrib ajouté (section `#cas-client`)
- [ ] Textes relus et validés par le client
- [x] Crédits des mentions légales à jour (photos Pexels non affichées retirées, revue du 18/11/2026)

## 2. Netlify : premier déploiement et formulaire

- [x] Pousser le dépôt : Netlify déploie tout seul (Deploys → dernier déploiement « Published »)
- [x] Ouvrir `https://comptoir247.netlify.app` (adresse visible dans Project overview) : les pages s'affichent
- [x] **Forms → Enable form detection**, puis relancer un déploiement (Deploys → Trigger deploy → Deploy project) : le formulaire « contact » apparaît dans Forms
- [ ] Envoyer une demande test depuis la page Contact : elle apparaît dans **Forms → contact** (premier test probablement classé en spam par Netlify : regarder le filtre Spam, écrire un message réaliste)
- [x] **Forms → Submission notifications → Add notification → Email notification** (gratuit ; ne pas confondre avec les notifications de *déploiement*, payantes) : notre adresse ajoutée et confirmée
- [ ] contact@comptoir247.fr ajoutée : **le client doit cliquer « Confirm notifications »** dans l'e-mail Netlify (message envoyé au client le 18/11). Solution de secours sans le client : adresse relais OVH (`formulaire@` redirigée vers contact@ et vers nous), à mettre dans Netlify à la place
- [ ] Une nouvelle demande test arrive bien par e-mail, dans la boîte de réception (au premier e-mail : « pas un courrier indésirable », chez nous et chez le client)

## 3. Nom de domaine (comptoir247.fr, chez OVH)

- [x] Netlify → **Domain management → Add a domain** : `comptoir247.fr`. Netlify ajoute aussi `www.comptoir247.fr` et indique les enregistrements DNS à créer : **suivre ses valeurs**, elles priment sur celles ci-dessous.
- [x] OVH → Noms de domaine → comptoir247.fr → **Zone DNS** (OVH ne gère pas ALIAS/ANAME : utiliser l'enregistrement A de repli) :
  - **ne pas toucher aux enregistrements MX** (`mx0` à `mx3.mail.ovh.net`) : ils font fonctionner la messagerie
  - supprimer l'enregistrement **A** du domaine nu qui pointe vers `213.186.33.5` (page OVH par défaut), et tout A/CNAME existant sur `www`
  - domaine nu : enregistrement **A** vers l'adresse indiquée par Netlify (habituellement `75.2.60.5`)
  - `www` : enregistrement **CNAME** vers `comptoir247.netlify.app.` (supprimer d'abord **toutes** les autres lignes `www`, y compris le TXT `3|welcome`, sinon OVH refuse : « CNAME and other data »)
- [x] Propagation DNS vérifiée (serveurs OVH, Cloudflare et Google)
- [ ] Netlify affiche les deux domaines vérifiés (plus de « Pending DNS verification ») et le certificat HTTPS actif
- [ ] Netlify → Domain management : `www.comptoir247.fr` en **domaine principal** (l'autre redirige vers lui) — impossible tant que le certificat est en cours de création

## 4. Ouvrir le site aux moteurs de recherche

- [ ] Dans `_src/build.mjs` : `launched: true`. L'adresse du site vient automatiquement de Netlify (domaine principal).
- [ ] `node _src/build.mjs`, commit, push
- [ ] GitHub → dépôt → Settings → Pages : **désactiver GitHub Pages** (la démo n'est plus utile et ferait doublon)

## 4 bis. Mesure d'audience (Google Analytics 4, balise gtag.js directe)

Le site charge la balise Google Analytics **uniquement après « Accepter »** dans le bandeau cookies, et seulement sur
le site de production Netlify (ni démo GitHub, ni prévisualisations). Rien à coller dans les pages à la main.

- [ ] Google Analytics : propriété et flux Web créés (URL `https://www.comptoir247.fr`) ; copier l'**ID de mesure** `G-XXXXXXXXXX` (Admin → Flux de données → le flux)
- [ ] Mettre cet ID dans `gaId` (`_src/build.mjs`), puis commit et push. Sans ID : ni mesure ni bandeau
- [ ] Sur le site : « Accepter » dans le bandeau, puis Google Analytics → Rapports → **Temps réel** : la visite apparaît
- [ ] Tout autre service tiers (pixel Facebook, carte, vidéo…) doit être déclaré dans la constante `CSP` de `_src/build.mjs`, sinon le navigateur le bloque

## 5. Vérifications après déploiement

> Sécurité : le site envoie une politique de contenu (CSP) qui n'autorise que ses propres fichiers. Tout ajout
> d'un service tiers (mesure d'audience, carte Google Maps, vidéo YouTube, police Google…) doit être déclaré
> dans la constante `CSP` de `_src/build.mjs`, sinon le navigateur le bloque.

- [ ] Les pages s'affichent sur `https://www.comptoir247.fr`, en HTTPS
- [ ] Le code source ne contient plus `noindex` (sauf la page 404) : `<meta name="robots" content="index, follow…">`
- [ ] `https://www.comptoir247.fr/robots.txt` annonce le sitemap et autorise les robots IA
- [ ] `https://www.comptoir247.fr/sitemap.xml` et `/llms.txt` utilisent le domaine définitif
- [ ] Une adresse inexistante affiche la page « Ce casier est vide »
- [ ] `/equiper-professionnels/` redirige vers `/je-m-equipe/`
- [ ] Le formulaire de contact arrive bien sur contact@comptoir247.fr
- [ ] Le partage du lien (WhatsApp, Facebook, LinkedIn) affiche l'image et le titre
- [ ] Test des données structurées : https://search.google.com/test/rich-results
- [ ] Test mobile et performance : https://pagespeed.web.dev/
- [ ] En-têtes de sécurité : https://securityheaders.com

## 6. Référencement

- [ ] **Google Search Console** : ajouter le domaine, valider (enregistrement DNS TXT chez OVH), soumettre `sitemap.xml`
- [ ] **Bing Webmaster Tools** : importer depuis Search Console (Bing alimente aussi ChatGPT et Copilot)
- [ ] **Fiche Google Business Profile** (Google Maps), avec le lien du site, et une fiche par distributeur si possible
- [ ] **Instagram** : mettre le lien du site dans la bio de @comptoir247

## 7. Après le lancement

- [ ] Ajouter chaque nouvel emplacement de distributeur sur le site, puis rebuild et push
- [ ] Mettre à jour la FAQ selon les questions reçues
- [ ] Suivre les requêtes dans Search Console après 4 à 6 semaines
