# Suivi du projet — site COMPTOIR 247

_Dernière mise à jour : 22 octobre 2026_

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
- **Médias** : 4 vidéos et des photos Pexels libres de droits (crédits dans les mentions légales), plus les 4 visuels Instagram fournis.
- **Vérifications** : captures ordinateur et mobile (390 px), pages en ligne en HTTP 200, 404 personnalisée fonctionnelle.

## En attente du client

| Information | Où la mettre |
| --- | --- |
| E-mail de contact réel (actuellement `contact@comptoir247.fr`, provisoire) | `CONFIG.email` dans `_src/build.mjs` |
| Raison sociale, forme juridique, capital, adresse, SIRET, responsable de publication | `_src/pages/mentions-legales.html` (champs surlignés) |
| Liste des emplacements des distributeurs (nom, adresse, accès) | Section « Où trouver nos Comptoirs ? » de `_src/pages/distributeurs-produits-frais.html` |
| Moyens de paiement acceptés sur les bornes | Étapes « Comment ça marche ? » (accueil et page distributeurs) |
| Relecture des textes, notamment l'accompagnement pro et l'après-mise en service | Pages sources dans `_src/pages/` |
| Nom de domaine souhaité | Voir [MISE-EN-LIGNE.md](MISE-EN-LIGNE.md) |
| Photos réelles des distributeurs (pour remplacer les photos d'illustration) | `assets/img/photos/` |

## Points d'attention

- **Instagram** n'est pas accessible sans compte. La charte a été reprise des captures fournies dans le chat VSCode.
- **Vidéos de distributeurs** : Pexels n'en propose aucune avec des produits frais (seulement des distributeurs de boissons au Japon). Des plans « frigo vitré » et « produits » les remplacent. À terme, une vidéo des vrais Comptoirs serait bien plus forte.
- **Formulaire de contact** : il ouvre la messagerie du visiteur, rien n'est stocké. Pour un envoi direct, il faudra un service tiers (Formspree, Web3Forms, etc.).
- **Robots IA sur la démo** : le `robots.txt` n'est pris en compte qu'à la racine d'un domaine, donc pas sur `github.io/comptoir247`. La démo est protégée uniquement par la balise `noindex`.

## Historique

Voir [CHANGELOG.md](../CHANGELOG.md).
