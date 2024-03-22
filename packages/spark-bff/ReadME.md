## Generate content fragment email content

- command

```sh
 node scripts/generateAuthorableContentMeta <full path of the mock json>
```

- example

```sh
 node scripts/generateAuthorableContentMeta /Users/t827463/code/online-web-frontend/packages/spark-bff/src/datasources/utility/content/mocks/contentJourneys/content-journey-usage-history.json
```

- Copy paste the content and send it to the content authors to create a new fragment
- Copy the generated default content and use it for the UI content default in authorable.constant.ts
