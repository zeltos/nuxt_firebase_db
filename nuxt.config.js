export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-firebase',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],
  firebase: {
    config : {
      apiKey: 'AIzaSyBCt6eNO1Dwm2_r66208uKWOTA8X0PbQ5c',
      authDomain: "new-apps-512e4.firebaseapp.com",
      projectId: "new-apps-512e4",
      databaseURL: "https://new-apps-512e4-default-rtdb.asia-southeast1.firebasedatabase.app",
      storageBucket: "new-apps-512e4.appspot.com",
      messagingSenderId: "51159191921",
      appId: "1:51159191921:web:a07becf5dcd1dadf29a6d0",
      measurementId: "G-0X221NTG3Y"
    },
    services: {
      database:true,
      firestore:true
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
      ]
    }
  }
}
