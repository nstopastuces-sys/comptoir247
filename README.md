# COMPTOIR 247 — site vitrine

Site statique de **COMPTOIR 247** (« Pour vous servir. ») : distributeurs automatiques de produits frais et locaux en Savoie, et équipement des professionnels.

- **Site officiel (indexé)** : https://www.comptoir247.fr (Netlify)
- **Suivi du projet** : [docs/SUIVI.md](docs/SUIVI.md)
- **Check-list de mise en ligne** : [docs/MISE-EN-LIGNE.md](docs/MISE-EN-LIGNE.md)
- **Historique** : [CHANGELOG.md](CHANGELOG.md)

## Pages

| URL | Rôle SEO |
| --- | --- |
| `/` | Accueil : distributeur animé, boutons « Je m'équipe » / « Notre expertise », équipement des pros, FAQ |
| `/notre-expertise/` | « Notre expertise » : nos propres Comptoirs (preuve par l'exemple), carte des emplacements, accueillir un Comptoir |
| `/je-m-equipe/` | « Je m'équipe » : solution clé en main, formules, inclus/exclu, cas client Fontanil, 8 secteurs (ancres `#fromagers`, `#bouchers`…) |
| `/qui-sommes-nous/` | Présentation de l'entreprise, bloc « Deux métiers » |
| `/contact/` | Formulaire reçu par Netlify Forms, transféré par e-mail à contact@comptoir247.fr |
| `/mentions-legales/` | Mentions légales et crédits médias |

Anciennes adresses `/equiper-professionnels/` et `/distributeurs-produits-frais/` : pages de redirection générées par le build (ancres conservées).

SEO / GEO : balises title/description/canonical/Open Graph, JSON-LD (`Organization`, `Service`, `FAQPage`, `HowTo`, `BreadcrumbList`), encadrés « En bref », FAQ, `sitemap.xml`, `robots.txt` (moteurs de recherche, moteurs de réponse IA et robots d'entraînement distingués, tous autorisés) et `llms.txt`.

## Modifier le site

Les pages HTML sont **générées** : on modifie les sources dans `_src/pages/`, puis on relance :

```bash
node _src/build.mjs
```

- `_src/build.mjs` : `CONFIG` (e-mail, téléphone, réseaux, formulaire, mode démo), gabarit commun (en-tête, pied de page, icônes, rideau de casiers), données structurées, sitemap, robots, redirections. Les liens CSS/JS portent une empreinte (`?v=…`) recalculée à chaque build.
- `_src/pages/*.html` : contenu de chaque page (bouton : `{{btn:lien|Libellé|variante|Texte rouge révélé à l'ouverture}}`) ; le bloc `<!--META {…} META-->` en tête contient titre, description, FAQ et schémas.
- `assets/css/style.css`, `assets/js/main.js` : styles et animations (portes de casiers, transitions de page, vidéos), envoi du formulaire de contact.
- `assets/img/` : logo officiel (`logo-comptoir247.png` 600 px, `logo-comptoir247-240.png`), carte des emplacements, photos (`photos/` : versions 800/1200 px ; `distributeur-pro-*` est une version recadrée et retouchée de la photo du Fonta'Distrib).

### À compléter avant la mise en ligne

0. **Indexation** : `CONFIG.launched = true` depuis le 25/11/2026. Seul le site de production Netlify est indexable ; les prévisualisations Netlify, les déploiements de branche et la copie générée à la racine du dépôt restent en `noindex` (balise, en-tête `X-Robots-Tag`, robots IA bloqués). `CONFIG.aiTraining` autorise ou bloque les robots d'entraînement IA sans effet sur le référencement.
1. **Domaine** : rien à modifier dans le code, l'adresse vient du domaine principal configuré dans Netlify (y compris dans `llms.txt`, réécrit dans `dist/`).
2. **Formulaire de contact** : Netlify Forms (activer la détection des formulaires et la notification par e-mail dans Netlify, voir docs/MISE-EN-LIGNE.md). E-mail, téléphone et réseaux dans `CONFIG`.
3. **Mentions légales** : complètes (directeur de la publication à faire confirmer par le client).
4. **Emplacements des distributeurs** : adresses précises et photos dans la section `#emplacements` de `_src/pages/notre-expertise.html`.

## Aperçu local

N'importe quel serveur statique à la racine, par exemple :

```bash
npx serve .
```

## Publication

**Netlify (site officiel)** : `netlify.toml` lance `node _src/build.mjs --dist` à chaque push sur `main` et publie `dist/`, qui ne contient que les fichiers publics, avec les en-têtes de sécurité (`_headers`) et les redirections 301 (`_redirects`, dont `comptoir247.netlify.app` → `www.comptoir247.fr`). Le build tourne chez Netlify : **pas de GitHub Actions** (aucun workflow dans le dépôt). Déploiement manuel si besoin : Netlify → Deploys → Trigger deploy. Test local et étapes complètes : [docs/MISE-EN-LIGNE.md](docs/MISE-EN-LIGNE.md).

**GitHub Pages** : désactivé depuis le lancement. `node _src/build.mjs` (sans `--dist`) régénère encore une copie de démo à la racine du dépôt, toujours en `noindex` ; `_config.yml` en exclurait les fichiers internes si Pages était réactivé.

## Crédits

Photos des distributeurs, carte et logo : fournis par COMPTOIR 247. Photos et vidéo d'illustration : [Pexels](https://www.pexels.com/fr-fr/license/) (liste détaillée dans les mentions légales).
