# find-deprecations

## Preconditions

1. Setup the target project.

Do this by checking out the target project e.g. RxJS

```bash
git clone git@github.com:ReactiveX/rxjs.git rxjs`
```

2. Navigate to the root of the repository.

```bash
cd rxjs
```

## Usage


### Setup

1. In the root of the repository run the following command.

```bash
npx deprecation-crawler
```

2. Answer the CLI questions
   The command will ask you a couple of questions regarding the included file locations and defaults to run the crawling and grouping process.

2.1 Configuring the crawling process

Let's walk through the crawling process first:

_√ What git tag do you want to crawl?_
By default `master` is set. This will crawl deprecations from `master` on.

_√ What's the output directory?_
By default `./depercations` is set. This will put the resulting data into the named folder.

_√ What's the location of the ts config file?_
By default `./tsconfig.json` is set. These locations should represent the projects ts config settings used to determine the folders to crawl.

_√ What's the deprecation keyword to look for?_
By default `@deprecated` is set. Looks for comments with this keyword to add to the deprecations list.

_√ What's the deprecation link to the docs (the deprecation uuid will be appended to this)?_
By default `https://rxjs.dev/deprecations` is set. Used to add a link in the sourcecode to this location.
If a deprecation comment already has this link, it will be skipped.

### Crawling

After that, the process should start crawling and every crawled file should get logged to the console.
`Looking for deprecations in path/to/file`

### Grouping

2.2 Grouping the results

After the crawling is done, a new message should show up in the console saying
`Adding grouping to deprecations...`

You will get asked 2 questions for every crawled deprecation:

_√ Add group to deprecation path/to/file#LINE_NUMBER_
The text of the deprecation message gets listed and you have to enter a string for the group name.
By default `ungrouped` is suggested. These strings serve as a reverence to the group.

_√ Add regexp to group_
This question asks for a regular expression used to check every new deprecation against it is to see if it matches the group's conditions/regexes.
Every group can have multiple regular expressions to test a deprecation for. 

The deprecation message as well as the passed reges string will get normalized
- trim white spaces
- transform multiple white space to one
- all lowercase

Examples for message `The full deprecation message for {@link test} thingy!`:
- Full message `The full deprecation message for {@link test} thingy!`
- Partial message/Includes `full deprecation`
- Partial message `/^(?=.*deprecation message)(?=.*thingy!).../`

@NOTICE ATM a deprecation can only belong to one group.

If you just hit enter no regular expression gets saved.

3. After the grouping process is done you should see the following message `Adding uuid to deprecations...`

This means that every deprecation gets its own uuid generated by created from its function signature.
Doing this enables us to detect already crawled deprecations, malicious deprecations as well as a uuid across machines and codebases/repositories.

4. After the deprecations have been processed, the source code of the repository will be updated. A link to the deprecation info will be added at the end of the deprecation message.

5. Now the generation of the crawled data starts.

There are 2 formats generated by default:

- markdown
- raw JSON

6. Check if the generated configs ended up in `./deprecation-crawler.config.json`.
   And the crawled deprecations are present in the configured folder (by default in the `./deprecations` folder).

## Usage during development

1. Build the deprecation finder:

For npm:

```bash
npm run build-and-pack
```

For yarn:

```bash
yarn build-and-pack
```

2. Copy path to the packed file:

   Open the `dist` folder and search for the `index.js` file.
   copy the absolute path to `index.js`.

3. Navigate to the root of your target project

```bash
cd path/to/the/root/folder
```

4. Execute the packed file by using the absolute path copied in step 2.

```bash
npx path/to/find-deprecations/dist/index.js
```
or while developing in the actual branch run:

```bash
npm run build-and-pack-and-run-clean -- current branch
```

5. go on with the step 2 form section [Usage](#Usage)
