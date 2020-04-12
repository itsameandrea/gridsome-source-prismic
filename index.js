const Prismic = require('prismic-javascript')
const { documentParser, capitalize } = require('./utils')

class PrismicSource {
  constructor(api, { prismic_token, prismic_url, collection_prefix = 'Prismic' }) {
    this.token = prismic_token
    this.url = prismic_url
    this.prefix = collection_prefix
    this.prismic = null

    api.loadSource(async ({ addCollection }) => {
      await this.initPrismic()
      await this.loadCollections(addCollection)
    })
  }

  async initPrismic() {
    this.prismic = await Prismic.getApi(this.url, { accessToken: this.token })
  }

  async loadCollections(addCollection) {
    // get all prismic docs
    const { results } = await this.prismic.query('')

    // get all the types
    let documentTypes = results.map(r => r.type)
    documentTypes = [...new Set(documentTypes)]

    // create a gridsome collection for each type
    const collections = {}
    documentTypes.forEach((type) => {
      collections[type] = addCollection({
        typeName: `${this.prefix}${capitalize(type)}`
      })
    })

    // for each prismic doc, parse all the supported fields
    // and add a gridsome node
    results.forEach((document) => {
      const collection = collections[document.type]
      const formattedObject = documentParser(document)

      collection.addNode(formattedObject)
    })
  }
}

module.exports = PrismicSource
