import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    stats: collection({
      label: 'Stats',
      slugField: 'name',
      path: 'src/content/stats/*',
      format: { contentField: 'emptyContent' },
      schema: {
        emptyContent: fields.emptyContent({ extension: 'mdoc' }),
        name: fields.slug({ name: { label: 'name' } }),
        value: fields.number({ label: 'value' }),
        sigle: fields.text({ label: 'sigle' }),
      },
    }),
  },
});