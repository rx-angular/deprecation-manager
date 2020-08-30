import { prompt } from 'enquirer';
import { CrawlConfig } from '../models';

export async function ensureDeprecationUrlConfig(
  config: CrawlConfig
): Promise<CrawlConfig> {
  const userConfig: CrawlConfig = await prompt([
    {
      type: 'input',
      name: 'deprecationLink',
      message: "What's the deprecation link to the docs?",
      // @TODO consider other default
      initial: config.deprecationLink || 'https://rxjs.dev/deprecations',
      skip: !!config.deprecationLink,
    },
  ]);

  return {
    ...config,
    ...userConfig,
  };
}