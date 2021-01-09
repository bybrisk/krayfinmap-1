const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Bybrisk',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'E:\\Office\\krayfinmap-1\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Bybrisk',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'E:\\Office\\krayfinmap-1',
          templates:
            'E:\\Office\\krayfinmap-1\\node_modules\\docz-core\\dist\\templates',
          docz: 'E:\\Office\\krayfinmap-1\\.docz',
          cache: 'E:\\Office\\krayfinmap-1\\.docz\\.cache',
          app: 'E:\\Office\\krayfinmap-1\\.docz\\app',
          appPackageJson: 'E:\\Office\\krayfinmap-1\\package.json',
          appTsConfig: 'E:\\Office\\krayfinmap-1\\tsconfig.json',
          gatsbyConfig: 'E:\\Office\\krayfinmap-1\\gatsby-config.js',
          gatsbyBrowser: 'E:\\Office\\krayfinmap-1\\gatsby-browser.js',
          gatsbyNode: 'E:\\Office\\krayfinmap-1\\gatsby-node.js',
          gatsbySSR: 'E:\\Office\\krayfinmap-1\\gatsby-ssr.js',
          importsJs: 'E:\\Office\\krayfinmap-1\\.docz\\app\\imports.js',
          rootJs: 'E:\\Office\\krayfinmap-1\\.docz\\app\\root.jsx',
          indexJs: 'E:\\Office\\krayfinmap-1\\.docz\\app\\index.jsx',
          indexHtml: 'E:\\Office\\krayfinmap-1\\.docz\\app\\index.html',
          db: 'E:\\Office\\krayfinmap-1\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
