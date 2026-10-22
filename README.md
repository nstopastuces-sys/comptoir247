# COMPTOIR 247 — site vitrine

Site statique de **COMPTOIR 247** (« Pour vous servir. ») : distributeurs automatiques de produits frais et locaux en Savoie, et équipement des professionnels.

## Pages

| URL | Rôle SEO |
| --- | --- |
| `/` | Accueil : les deux métiers, distributeur animé |
| `/distributeurs-produits-frais/` | Métier 1 « Exploiter » : particuliers, emplacements, producteurs partenaires |
| `/equiper-professionnels/` | Métier 2 « Équiper » : solution clé en main, 8 secteurs (ancres `#fromagers`, `#bouchers`…) |
| `/qui-sommes-nous/` | Présentation de l'entreprise |
| `/contact/` | Formulaire (ouvre la messagerie avec un e-mail pré-rempli) |
| `/mentions-legales/` | Mentions légales et crédits médias |

SEO / GEO : balises title/description/canonical/Open Graph, JSON-LD (`Organization`, `Service`, `FAQPage`, `HowTo`, `BreadcrumbList`), encadrés « En bref », FAQ, `sitemap.xml`, `robots.txt` (robots IA autorisés) et `llms.txt`.

## Modifier le site

Les pages HTML sont **générées** : on modifie les sources dans `_src/pages/`, puis on relance :

```bash
node _src/build.mjs
```

- `_src/build.mjs` : gabarit commun (en-tête, pied de page, icônes, logo SVG, rideau de casiers), données structurées, sitemap, robots.
- `_src/pages/*.html` : contenu de chaque page ; le bloc `<!--META {…} META-->` en tête contient titre, description, FAQ et schémas.
- `assets/css/style.css`, `assets/js/main.js` : styles et animations (portes de casiers, transitions de page, vidéos).

### À compléter avant la mise en ligne

1. **Domaine** : `CONFIG.siteUrl` dans `_src/build.mjs` (et les URL de `llms.txt`), puis relancer le build.
2. **E-mail de contact** : `CONFIG.email` (actuellement `contact@comptoir247.fr`, à confirmer).
3. **Mentions légales** : champs surlignés dans `_src/pages/mentions-legales.html` (SIRET, adresse, responsable).
4. **Emplacements des distributeurs** : section « Où trouver nos Comptoirs ? » de `_src/pages/distributeurs-produits-frais.html`.

## Aperçu local

N'importe quel serveur statique à la racine, par exemple :

```bash
npx serve .
```

## Publication (GitHub Pages)

Settings → Pages → Branch `main`, dossier `/ (root)`. Le dossier `_src/` est ignoré par Jekyll.

## Crédits

Photos et vidéos d'illustration : [Pexels](https://www.pexels.com/fr-fr/license/) (liste détaillée dans les mentions légales). Visuels de marque : COMPTOIR 247.
