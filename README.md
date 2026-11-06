# COMPTOIR 247 — site vitrine

Site statique de **COMPTOIR 247** (« Pour vous servir. ») : distributeurs automatiques de produits frais et locaux en Savoie, et équipement des professionnels.

- **Démo client (non indexée)** : https://nstopastuces-sys.github.io/comptoir247/
- **Suivi du projet** : [docs/SUIVI.md](docs/SUIVI.md)
- **Check-list de mise en ligne** : [docs/MISE-EN-LIGNE.md](docs/MISE-EN-LIGNE.md)
- **Historique** : [CHANGELOG.md](CHANGELOG.md)

## Pages

| URL | Rôle SEO |
| --- | --- |
| `/` | Accueil : les deux métiers, distributeur animé |
| `/notre-expertise/` | « Notre expertise » : nos propres Comptoirs (preuve par l'exemple), carte des emplacements, accueillir un Comptoir |
| `/je-m-equipe/` | « Je m'équipe » : solution clé en main, formules, inclus/exclu, cas client Fontanil, 8 secteurs (ancres `#fromagers`, `#bouchers`…) |
| `/qui-sommes-nous/` | Présentation de l'entreprise |
| `/contact/` | Formulaire envoyé directement par e-mail (FormSubmit) à contact@comptoir247.fr |
| `/mentions-legales/` | Mentions légales et crédits médias |

SEO / GEO : balises title/description/canonical/Open Graph, JSON-LD (`Organization`, `Service`, `FAQPage`, `HowTo`, `BreadcrumbList`), encadrés « En bref », FAQ, `sitemap.xml`, `robots.txt` (robots IA autorisés) et `llms.txt`.

## Modifier le site

Les pages HTML sont **générées** : on modifie les sources dans `_src/pages/`, puis on relance :

```bash
node _src/build.mjs
```

- `_src/build.mjs` : gabarit commun (en-tête, pied de page, icônes, logo SVG, rideau de casiers), données structurées, sitemap, robots.
- `_src/pages/*.html` : contenu de chaque page (bouton : `{{btn:lien|Libellé|variante|Texte rouge révélé à l'ouverture}}`) ; le bloc `<!--META {…} META-->` en tête contient titre, description, FAQ et schémas.
- `assets/css/style.css`, `assets/js/main.js` : styles et animations (portes de casiers, transitions de page, vidéos).

### À compléter avant la mise en ligne

0. **Indexation** : la démo n'est pas indexée (`CONFIG.demo = true` : balise `noindex` sur toutes les pages, robots IA bloqués). Au lancement, passer `demo` à `false`.
1. **Domaine** : `CONFIG.siteUrl` dans `_src/build.mjs` (et les URL de `llms.txt`), puis relancer le build.
2. **Formulaire de contact** : activer FormSubmit (voir docs/SUIVI.md). E-mail, téléphone et réseaux dans `CONFIG`.
3. **Mentions légales** : champs surlignés dans `_src/pages/mentions-legales.html` (SIRET, adresse, responsable).
4. **Emplacements des distributeurs** : adresses précises et photos dans la section `#emplacements` de `_src/pages/notre-expertise.html`.

## Aperçu local

N'importe quel serveur statique à la racine, par exemple :

```bash
npx serve .
```

## Publication (GitHub Pages)

Déjà activé : branche `main`, dossier `/ (root)`. Chaque push redéploie la démo en environ une minute. `_config.yml` empêche la publication des fichiers internes (`_src/`, `docs/`, README, CHANGELOG). Passage sur un nom de domaine : voir [docs/MISE-EN-LIGNE.md](docs/MISE-EN-LIGNE.md).

## Crédits

Photos et vidéos d'illustration : [Pexels](https://www.pexels.com/fr-fr/license/) (liste détaillée dans les mentions légales). Visuels de marque : COMPTOIR 247.
