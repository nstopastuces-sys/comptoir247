# Suivi du projet — site COMPTOIR 247

_Dernière mise à jour : 6 novembre 2026_

## État actuel

| Élément | État |
| --- | --- |
| Démo client | En ligne : https://nstopastuces-sys.github.io/comptoir247/ |
| Indexation | **Désactivée** (`CONFIG.demo = true`) : `noindex` sur toutes les pages |
| Dépôt | https://github.com/nstopastuces-sys/comptoir247 (branche `main`, déploiement GitHub Pages automatique) |
| Nom de domaine | À définir |
| Mise en ligne officielle | Pas encore. Voir [MISE-EN-LIGNE.md](MISE-EN-LIGNE.md) |

## Ce qui est fait

- **Charte** reprise des visuels Instagram : blanc, noir, rouge `#E30613`, Montserrat très grasse, sous-titres en capitales espacées, traits rouges, montagnes au trait, logo horloge et écusson de Savoie redessiné en SVG.
- **Pages** : Accueil, Nos distributeurs (métier « Exploiter »), Équiper les pros (métier « Équiper », 8 secteurs avec ancres), Qui sommes-nous ?, Contact, Mentions légales et crédits, page 404.
- **Animations « porte de distributeur »** :
  - distributeur à casiers interactif en haut de l'accueil, avec horloge et écran ;
  - boutons dont la façade s'ouvre comme une porte ;
  - transition entre les pages : un mur de casiers qui se ferme puis s'ouvre ;
  - photos et vidéos qui s'ouvrent comme des vitrines au défilement.
- **SEO et GEO** : titres et descriptions par page, JSON-LD (Organization, Service, FAQPage, HowTo, BreadcrumbList), encadrés « En bref », FAQ, `sitemap.xml`, `robots.txt`, `llms.txt`.
- **Médias** : photos réelles des Comptoirs et du Fonta'Distrib, carte des emplacements, 2 vidéos et des photos Pexels libres de droits (crédits dans les mentions légales).
- **Vérifications** : captures ordinateur et mobile (390 px), pages en ligne en HTTP 200, 404 personnalisée fonctionnelle.

## En attente du client

| Information | Où la mettre |
| --- | --- |
| **Activer le formulaire** : faire une demande test sur la page Contact, puis cliquer « Activate Form » dans l'e-mail FormSubmit reçu sur contact@comptoir247.fr | Rien à modifier dans le code |
| Adresses précises et photos de chaque Comptoir (Hugo) | Section `#emplacements` de `_src/pages/notre-expertise.html` |
| Lien Google My Business du Fonta'Distrib (Hugo) | Section `#cas-client` de `_src/pages/je-m-equipe.html` (commentaire en place) |
| Validation des blocs « Vente, location, leasing » et « Ce qui est inclus » (textes rédigés sans les conditions réelles) | Sections `#formules` et `#inclus` de `_src/pages/je-m-equipe.html` |
| Rôle exact de COMPTOIR 247 dans le projet du Fontanil (l'article ne le mentionne pas) | Section `#cas-client` |
| Plaquette ou grille tarifaire (facultatif) | Section `#formules` |
| Raison sociale, forme juridique, capital, adresse, SIRET, responsable de publication | `_src/pages/mentions-legales.html` (champs surlignés) |
| Moyens de paiement acceptés sur les bornes | Étapes « Comment ça marche ? » (accueil et page distributeurs) |
| Relecture des textes, notamment l'accompagnement pro et l'après-mise en service | Pages sources dans `_src/pages/` |
| Nom de domaine souhaité | Voir [MISE-EN-LIGNE.md](MISE-EN-LIGNE.md) |

## Points d'attention

- **Instagram** n'est pas accessible sans compte. La charte a été reprise des captures fournies dans le chat VSCode.
- **Vidéos** : la vidéo « frigo » de l'accueil a été remplacée par une photo d'un vrai Comptoir (demande client). Une vidéo tournée sur un vrai Comptoir pourrait la remplacer plus tard.
- **Formulaire de contact** : envoi direct via FormSubmit (gratuit, sans compte) vers contact@comptoir247.fr. Si l'envoi échoue, le visiteur peut ouvrir sa messagerie avec le message pré-rempli.
- **Robots IA sur la démo** : le `robots.txt` n'est pris en compte qu'à la racine d'un domaine, donc pas sur `github.io/comptoir247`. La démo est protégée uniquement par la balise `noindex`.

## Historique

Voir [CHANGELOG.md](../CHANGELOG.md).
