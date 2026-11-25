# Suivi du projet — site COMPTOIR 247

_Dernière mise à jour : 25 novembre 2026_

## État actuel

| Élément | État |
| --- | --- |
| Site officiel | En ligne : https://www.comptoir247.fr (Netlify, HTTPS) |
| Indexation | **Activée** depuis le 25/11/2026 (`launched: true`) sur la production uniquement ; prévisualisations Netlify en `noindex` |
| Dépôt | https://github.com/nstopastuces-sys/comptoir247 (branche `main`, build et déploiement automatiques par Netlify, sans GitHub Actions) |
| Nom de domaine | `www.comptoir247.fr` (principal) ; `comptoir247.fr` et `comptoir247.netlify.app` redirigent en 301 |
| Démo GitHub Pages | Désactivée |
| Reste à faire | Search Console, Bing Webmaster Tools, Google Business : voir [MISE-EN-LIGNE.md](MISE-EN-LIGNE.md), étape 6 |

## Ce qui est fait

- **Charte** reprise des visuels Instagram : blanc, noir, rouge `#E30613`, Montserrat très grasse, sous-titres en capitales espacées, traits rouges, montagnes au trait.
- **Logo officiel** (PNG fourni par le client) : 104 px dans l'en-tête sur ordinateur, 88 px sur mobile, aussi dans le pied de page, le rideau de transition et l'icône mobile. Favicon redessiné d'après le logo.
- **Pages** : Accueil, Je m'équipe (`/je-m-equipe/` : solution pro, formules, inclus/exclu, cas client Fonta'Distrib, 8 secteurs avec ancres), Notre expertise (`/notre-expertise/` : nos propres Comptoirs, carte des 2 emplacements), Qui sommes-nous ?, Contact, Mentions légales et crédits, page 404. Les anciennes adresses redirigent.
- **Retours client du 6 novembre 2026** : tous appliqués (détail dans le [CHANGELOG](../CHANGELOG.md)), sauf les éléments en attente ci-dessous.
- **Animations « porte de distributeur »** :
  - distributeur à casiers interactif en haut de l'accueil, avec horloge et écran ;
  - boutons dont la façade s'ouvre comme une porte (sur l'accueil, un texte rouge différent apparaît derrière, et les portes s'entrouvrent seules une fois à l'arrivée) ;
  - transition entre les pages : un mur de casiers qui se ferme puis s'ouvre ;
  - photos et vidéos qui s'ouvrent comme des vitrines au défilement.
- **SEO et GEO** : titres et descriptions par page, JSON-LD (Organization, Service, FAQPage, HowTo, BreadcrumbList), encadrés « En bref », FAQ, `sitemap.xml`, `robots.txt`, `llms.txt`.
- **Médias** : photos réelles des Comptoirs et du Fonta'Distrib, carte des emplacements, 1 vidéo et des photos Pexels libres de droits (crédits dans les mentions légales).
- **Vérifications** : captures ordinateur et mobile (vraie largeur 390 et 360 px), pages en ligne en HTTP 200, 404 personnalisée fonctionnelle, liens internes contrôlés.

## En attente du client

| Information | Où la mettre |
| --- | --- |
| Adresses précises et photos de chaque Comptoir (Hugo) | Section `#emplacements` de `_src/pages/notre-expertise.html` |
| Lien Google My Business du Fonta'Distrib (Hugo) | Section `#cas-client` de `_src/pages/je-m-equipe.html` (commentaire en place) |
| Validation des blocs « Achat ou leasing » et « Solution clé en main, c'est-à-dire ? » (textes rédigés sans les conditions réelles) | Sections `#formules` et `#inclus` de `_src/pages/je-m-equipe.html` |
| Rôle exact de COMPTOIR 247 dans le projet du Fontanil (l'article ne le mentionne pas) | Section `#cas-client` |
| Plaquette ou grille tarifaire (facultatif) | Section `#formules` |
| Confirmation du directeur de la publication (actuellement François Husson, Président) | `_src/pages/mentions-legales.html` |
| Moyens de paiement acceptés sur les bornes (le site dit « paiement par carte ») | Étapes « Comment ça marche ? » (accueil, Notre expertise) et bloc `#inclus` de Je m'équipe |
| Relecture des textes, notamment l'accompagnement pro et l'après-mise en service | Pages sources dans `_src/pages/` |

## Points d'attention

- **Instagram** n'est pas accessible sans compte. La charte a été reprise des captures fournies dans le chat VSCode.
- **Vidéos** : la vidéo « frigo » de l'accueil a été remplacée par une photo d'un vrai Comptoir (demande client). Une vidéo tournée sur un vrai Comptoir pourrait la remplacer plus tard.
- **Formulaire de contact** : Netlify Forms. Les demandes sont visibles dans Netlify → Forms et transférées par e-mail (notification à régler dans Netlify). Sur la démo GitHub, le bouton ouvre la messagerie du visiteur avec le message pré-rempli.
- **GitHub Actions** : quota épuisé, ne pas en utiliser. Netlify construit le site lui-même à chaque push sur `main` ; tester le build en local avant de pousser (commandes dans [MISE-EN-LIGNE.md](MISE-EN-LIGNE.md), étape 4).
- **Cache navigateur** : le CSS et le JS sont versionnés, donc un simple rechargement suffit ; en cas de doute, Ctrl+F5.
- **Indexation** : seul le contexte Netlify `production` est indexable. Prévisualisations et déploiements de branche gardent `noindex` (balise + en-tête `X-Robots-Tag`) et un `robots.txt` qui bloque les robots IA.
- **Robots d'entraînement IA** (GPTBot, ClaudeBot, Google-Extended…) : autorisés (`aiTraining: true`). Les bloquer n'a aucun effet sur Google, Bing ni sur les réponses citées de ChatGPT, Claude ou Perplexity.

## Historique

Voir [CHANGELOG.md](../CHANGELOG.md).
