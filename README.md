# Explanation of NuxtHub deployment issue within a monorepo project

Repo: https://github.com/serhii-chernenko/nuxthub-issue/

## Content

- [Architecture](https://github.com/serhii-chernenko/nuxthub-issue/tree/main?tab=readme-ov-file#architecture)
- [Prepare local environment](https://github.com/serhii-chernenko/nuxthub-issue/tree/main?tab=readme-ov-file#prepare-local-environment)
- [Prepare deployment environment](https://github.com/serhii-chernenko/nuxthub-issue/tree/main?tab=readme-ov-file#prepare-deployment-environment)
- [Issues](https://github.com/serhii-chernenko/nuxthub-issue/tree/main?tab=readme-ov-file#issues)
- [Expected help](https://github.com/serhii-chernenko/nuxthub-issue/tree/main?tab=readme-ov-file#expected-help)

## Architecture

I expect a monorepo for complex project where I expect different Nuxt 3 apps that extends shared Nuxt 3 layers within one repository to speed up development and make easier a codebase management.
A structure is already prepared within the current repository but there are some expectations:
```
# Different apps with different NuxtHub projects and different domains
src/apps/admin # e.g. admin.nuxt.dev
src/apps/storefront # e.g. storefront.nuxt.dev

# Shared layers that could be used within end-apps
src/layers/ui
src/layers/ecommerce
src/layers/auth
src/layers/blog
```

## Prepare local environment

### Project workspaces

In the root [`package.json`](https://github.com/serhii-chernenko/nuxthub-issue/blob/main/package.json) file I have workspaces setup:
```json
{
  "workspaces": [
    "src/layers/*",
    "src/apps/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace @demo/app",
    "build": "npm run dev --workspace @demo/app"
  }
}
```

In the UI layer's [`package.json`](https://github.com/serhii-chernenko/nuxthub-issue/blob/main/src/layers/ui/package.json#L2) the package named `@demo/ui`:
```json
{
  "name": "@demo/ui"
}
```

In the App [`package.json`](https://github.com/serhii-chernenko/nuxthub-issue/blob/main/src/apps/app/package.json#L12) the package fakely installed with a file reference:
```json
{
  "dependencies": {
    "@demo/ui": "file:../../layers/ui"
  }
}
```

The layer package is extended in `layers` of [`nuxt.config.ts`](https://github.com/serhii-chernenko/nuxthub-issue/blob/main/src/apps/app/nuxt.config.ts#L7) of the `app` application:
```js
export default defineNuxtConfig({
  extends: [
    ['@demo/ui', { install: true }]
  ]
})
```

### Remove `node_modules` from any nested directories

Before starting development I have to remove any nested `node_modules` and `package-json.lock` files:
```bash
rm -rf src/layers/ui/node_modules src/layers/ui/package-lock.json
rm -rf src/apps/app/node_modules src/apps/app/package-lock.json
```

### Local development

When I want to start the application I go to the root directory where I have the [`package.json`](https://github.com/serhii-chernenko/nuxthub-issue/blob/main/package.json) with the `dev` script:
```json
{
  "scripts": {
    "dev": "npm run dev --workspace @demo/app",
  }
}
```

and run the command
```bash
npm install
npm run dev
```

When the app is started, everything works perfectly:
![image](https://github.com/user-attachments/assets/037e7059-94de-4b56-b851-e7148a86fddc)

## Prepare deployment environment

When everything is prepared for development, I want to build my application via NuxtHub service.

### NuxtHub

Currently I have one [NuxtHub project](https://admin.hub.nuxt.com/serhii-chernenko/nuxthub-issue/settings) especially for the demo issue explanation:
![image](https://github.com/user-attachments/assets/03e608c4-9242-4a50-92d3-56d101dbcfb1)

It's a reference to the domain: https://nuxthub-issue.nuxt.dev/.

### GitHub Actions and secrets

Regarding the [documentation](https://hub.nuxt.com/docs/getting-started/deploy#github-action), I have to have 2 ENV variables such as `NUXT_HUB_PROJECT_KEY` and `NUXT_HUB_PROJECT_DEPLOY_TOKEN`.

`NUXT_HUB_PROJECT_KEY` is provided there: https://admin.hub.nuxt.com/serhii-chernenko/nuxthub-issue/settings/environment
![image](https://github.com/user-attachments/assets/4d3112ff-956d-49aa-bbbd-ebd4bfda8b7f)


And `NUXT_HUB_PROJECT_DEPLOY_TOKEN` is available there:
![image](https://github.com/user-attachments/assets/38c5e5f8-5d2b-4da2-8abd-d463805dc30e)
![image](https://github.com/user-attachments/assets/c63cd50a-97e8-41c8-8a7a-92f8efb50b9e)

Then I added both secrets to github actions config: https://github.com/serhii-chernenko/nuxthub-issue/settings/secrets/actions
![image](https://github.com/user-attachments/assets/ecee2baa-5cfe-4355-a810-743790fa6e23)


## Issues

However, I got a couple of issues here.

### Initial deployment

Initial deployment was successfully finished somehow but as a result, I see just a "clear" Nuxt 3 application and it's not the same as I have locally:
https://nuxthub-issue.nuxt.dev/
![image](https://github.com/user-attachments/assets/3f0c2951-12cc-44bb-a341-3769aa8e6637)

### GitHub actions build failed

When I set up everything correctly, I have deployment errors:
https://github.com/serhii-chernenko/nuxthub-issue/actions/runs/12338464409/job/34433433401
```
The following package was not found and will be installed: nuxthub@0.7.4
Please login to deploy your project or set the `NUXT_HUB_USER_TOKEN` environment variable.
```

### Local deployment

So, if GitHub actions are not working, I tried to repeat it locally.
![image](https://github.com/user-attachments/assets/c9b39161-1325-4204-b901-6a89f7253dc4)

I prepared the `.env` file in the root directory and in the app directory just to be sure that it has to work in any cases:
![image](https://github.com/user-attachments/assets/f355b8f2-68a1-43e5-80e0-d4ecbff32482)

When I run the command from the root project directory
```bash
nuxthub deploy
```

I got the error:
```
@nuxthub/core is not installed, make sure to install it with npx nuxt module add hub
```

So, I tried to run it from the app dir:
![image](https://github.com/user-attachments/assets/8b6e9642-5e81-4ca4-85be-968833dc7411)

I got the error:
```
nuxt is not installed, please make sure that you are inside a Nuxt project.
```

It's expected because I expect workspaces here not to run anything inside nested apps, I want to make it working from the root project directory.

I also tried to change the application directory, but it didn't help:
![image](https://github.com/user-attachments/assets/6cca230e-c631-4b11-acb8-fcc93be71144)


## Expected help

I want a clear explanation and detailed instructions how to make my current setup working. Please, don't suggest me to move layers to different repositories to extend them as external modules. I want exactly the setup what I described.

But decision of chosing NuxtHub make me mad at this point, because I spent 1 day and I totally failed.






