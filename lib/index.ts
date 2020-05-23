import { getConfig } from "./config";

import { crawlDeprecation, addCommentToCode, generateMarkdown } from "./morph";
import { checkout } from "./checkout";

(async () => {
  const config = await getConfig();
  const tagDate = await checkout(config);

  const deprecations = crawlDeprecation(config);
  addCommentToCode(config, deprecations);
  generateMarkdown(config, deprecations, { tagDate });
})();
