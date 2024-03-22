This monorepo includes all the frontend application from the new [Digital SPA Stack Design](https://sparknz.atlassian.net/wiki/spaces/DC/pages/1114210357/Digital+SPA+Stack+Design).

Core principles used for packages in the monorepo are available [here](https://sparknz.atlassian.net/wiki/spaces/DC/pages/1018561250/NewGen).

To start with the monorepo first run the `yarn` command in order to install all required dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn validate`

Runs static code analysis using Prettier and ESLint.

### `yarn build`

Builds all packages for production in the right order.

### `yarn test:unit`

Runs unit testing for all packages with unit tests.

### `yarn changeset`

Creates a changeset file with a semantic version.

### `yarn bump`

Increments package versions and concats all changesets into each package's CHANGELOG.md.

## Learn More

You can find more about this project [here](https://sparknz.atlassian.net/wiki/spaces/DC/pages/932478985/Online+Shop+Redesign+-+Phase+1).
