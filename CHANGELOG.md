# Historique des versions

## 2026-11-06 — Retours client (V2, complément)

- **Adresses des pages renommées** : `/je-m-equipe/` et `/notre-expertise/` ; les anciennes adresses redirigent (ancres conservées)
- Bouton « Voir la solution pro » de l'accueil renommé « Je m'équipe »
- CSS, JS et favicon versionnés : le navigateur ne peut plus afficher une ancienne feuille de style avec les nouvelles pages

## 2026-11-06 — Retours client (V2)

- **Logo officiel** (PNG fourni) dans l'en-tête, le pied de page, le rideau de transition, l'icône mobile ; favicon redessiné d'après le logo
- **Menu** : « Je m'équipe » puis « Notre expertise » (anciennement « Équiper les pros » et « Nos distributeurs »)
- **Accueil** : boutons inversés et renommés, avec texte rouge révélé à l'ouverture de la porte (« Comment ça marche », « Exploitant avant d'être fournisseur ») ; bloc « Deux métiers » déplacé dans Qui sommes-nous ; bloc Instagram retiré ; « Nous équipons les professionnels »
- **Je m'équipe** : vidéo en en-tête, Click & collect et surface de vente, blocs « Vente, location ou leasing » et « Ce qui est inclus », cas client Fonta'Distrib (MFR-CFA du Fontanil), « Parlez-nous de votre activité », question fraîcheur et alertes de sécurité
- **Notre expertise** : « La preuve par l'exemple », photo réelle du distributeur, carte des 2 Comptoirs (Saint-Pierre-d'Albigny, Romagnieu), FAQ enrichie (alertes de sécurité), blocs produits et producteurs retirés
- **Qui sommes-nous** : phrase d'accroche « Fort de notre expérience d'exploitants… », bloc « Deux métiers » (Nous équipons à gauche), bloc Instagram retiré
- **Contact** : téléphone 06 62 83 36 53, LinkedIn, Facebook ; formulaire envoyé directement par e-mail (FormSubmit)
- **Pied de page** : « Notre expertise », liens LinkedIn et Facebook

## 2026-10-22 — Démo client non indexée

- Démo publiée sur GitHub Pages : https://nstopastuces-sys.github.io/comptoir247/
- Réglage `CONFIG.demo` : `noindex` sur toutes les pages, robots IA bloqués dans le `robots.txt` (effectif seulement sur un domaine propre)
- Documents de suivi : `docs/SUIVI.md`, `docs/MISE-EN-LIGNE.md`, ce fichier
- `_config.yml` : les fichiers internes (README, docs, sources) ne sont pas publiés sur le site

## 2026-10-22 — Première version du site

- 5 pages + mentions légales + 404, générées depuis `_src/` (Node, sans dépendance)
- Charte reprise des visuels Instagram, logo SVG
- Animations « porte de distributeur » : distributeur interactif, boutons, transitions de page, vitrines
- SEO et GEO : JSON-LD, FAQ, encadrés « En bref », sitemap, `robots.txt`, `llms.txt`
- Vidéos et photos Pexels libres de droits, visuels Instagram fournis
