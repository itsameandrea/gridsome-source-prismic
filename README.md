
# @ilrock/gridsome-source-prismic

> Prismic source for Gridsome. This package is under development

### Supported field types

* UID
* Title
* Rich text
* Image
* Link
* Link to media (*except link to document*)
* Date
* Timestamp
* Color
* Number
* Key text
* Select
* Boolean

### Install
* `npm i @ilrock/gridsome-source-prismic`
* `yarn add @ilrock/gridsome-source-prismic`

### Usage

```js
// gridsome.config.js
module.exports  = {
  plugins: [
    {
      use: "@ilrock/gridsome-source-prismic",
      options: {
        prismic_url: "YOUR_PRISMIC_API_URL",
        prismic_token: "YOUR_PRISMIC_TOKEN",
        collection_prefix: "Prismic"
      }
    }
  ]
}
```
### Custom routes

Likely, for some of the collections that will get created you will want to have custom routes set up.

Let's assume you have two document types created in Prismic:
* Post
* Project

By default the plugin will create two collections inside your GraphQL schema:
* PrismicPost
* PrismicProject

```js
// gridsome.config.js
module.exports = {
  templates: {
    PrismicPost: '/posts/:slug',
    PrismicProject: '/projects/:slug'
  }
}
```
