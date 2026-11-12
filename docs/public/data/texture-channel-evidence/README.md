# Texture-channel evidence

Archived evidence from the retired Wuthering Waves and Arknights: Endfield texture-channel guides. The guides, teaching images, prompts and guide-specific checks have been removed. Fields such as `guide_anchor` and `additional_guide_anchors` retain historical identifiers; they no longer point to published articles.

This inventory describes pinned community reproduction implementations, not every native game build. `verified_scoped` and `verified_unused` describe the cited implementation at the recorded revision, not runtime or native-game validation.

## Source scope validation

From the repository root:

```sh
bun run test:channel-scope
# Compare the selected GitHub trees and blob IDs (requires gh):
bun run test:channel-scope --remote
bun run docs:build
```

Deployment retains the source-scope check and site build. Guide-specific content and rendered-page checks have been retired with the articles.

`binding-inventory.json` records 36 Wuwa and 57 Endfield bindings. `source-scope.json` records the selected immutable source files, including files with no texture declarations and explicitly excluded trees. These are selected implementation inventories, not complete native-game asset inventories.

`wuwa-auxiliary.json`, `endfield-property.json` and `endfield-extra.json` retain compact node topology. `endfield-image-ledger.json` records 58 observed image nodes with 53 distinct labels. `importer-crosswalk.json` retains 21 reviewed classifier/JSON aliases. These records do not include original texture pixels or establish universal shader contracts.
