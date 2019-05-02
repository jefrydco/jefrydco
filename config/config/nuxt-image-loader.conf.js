export default {
  imagesBaseDir: "static/img",
  imageStyles: {
    placeholder: { actions: ["gravity|Center", "resize|1|1"] },

    cover: { macros: ["scaleAndCrop|1920|614"] },

    "cover-1": { macros: ["scaleAndCrop|480|154"] },
    "cover-2": { macros: ["scaleAndCrop|766|245"] },
    "cover-3": { macros: ["scaleAndCrop|991|317"] },
    "cover-4": { macros: ["scaleAndCrop|1196|382"] },
    "cover-5": { macros: ["scaleAndCrop|1360|435"] },
    "cover-6": { macros: ["scaleAndCrop|1509|483"] },
    "cover-7": { macros: ["scaleAndCrop|1658|530"] },
    "cover-8": { macros: ["scaleAndCrop|1808|578"] },
    "cover-9": { macros: ["scaleAndCrop|1888|604"] },
    "cover-10": { macros: ["scaleAndCrop|1920|614"] },

    "cover-16x9-1": { macros: ["scaleAndCrop|596|335"] },
    "cover-16x9-2": { macros: ["scaleAndCrop|710|400"] },
    "cover-16x9-3": { macros: ["scaleAndCrop|807|454"] },
    "cover-16x9-4": { macros: ["scaleAndCrop|907|510"] },
    "cover-16x9-5": { macros: ["scaleAndCrop|1007|567"] },
    "cover-16x9-6": { macros: ["scaleAndCrop|1089|613"] },
    "cover-16x9-7": { macros: ["scaleAndCrop|1091|614"] },

    "cover-4x3-1": { macros: ["scaleAndCrop|538|404"] },
    "cover-4x3-2": { macros: ["scaleAndCrop|632|474"] },
    "cover-4x3-3": { macros: ["scaleAndCrop|724|543"] },
    "cover-4x3-4": { macros: ["scaleAndCrop|812|609"] },
    "cover-4x3-5": { macros: ["scaleAndCrop|818|614"] },

    "cover-1x1-1": { macros: ["scaleAndCrop|200|200"] },
    "cover-1x1-2": { macros: ["scaleAndCrop|333|333"] },
    "cover-1x1-3": { macros: ["scaleAndCrop|439|439"] },
    "cover-1x1-4": { macros: ["scaleAndCrop|532|532"] },
    "cover-1x1-5": { macros: ["scaleAndCrop|593|593"] },
    "cover-1x1-6": { macros: ["scaleAndCrop|614|614"] },

    content: { actions: ["gravity|Center", "resize|1920|1280^"] },

    "content-1": { actions: ["gravity|Center", "resize|480|320^"] },
    "content-2": { actions: ["gravity|Center", "resize|759|506^"] },
    "content-3": { actions: ["gravity|Center", "resize|980|653^"] },
    "content-4": { actions: ["gravity|Center", "resize|1162|775^"] },
    "content-5": { actions: ["gravity|Center", "resize|1343|895^"] },
    "content-6": { actions: ["gravity|Center", "resize|1509|1006^"] },
    "content-7": { actions: ["gravity|Center", "resize|1649|1099^"] },
    "content-8": { actions: ["gravity|Center", "resize|1786|1191^"] },
    "content-9": { actions: ["gravity|Center", "resize|1880|1253^"] },
    "content-10": { actions: ["gravity|Center", "resize|1920|1280^"] },

    "content-16x9-1": { actions: ["gravity|Center", "resize|596|335^"] },
    "content-16x9-2": { actions: ["gravity|Center", "resize|723|406^"] },
    "content-16x9-3": { actions: ["gravity|Center", "resize|853|479^"] },
    "content-16x9-4": { actions: ["gravity|Center", "resize|952|535^"] },
    "content-16x9-5": { actions: ["gravity|Center", "resize|1069|601^"] },
    "content-16x9-6": { actions: ["gravity|Center", "resize|1175|660^"] },
    "content-16x9-7": { actions: ["gravity|Center", "resize|1275|716^"] },
    "content-16x9-8": { actions: ["gravity|Center", "resize|1366|767^"] },
    "content-16x9-9": { actions: ["gravity|Center", "resize|1418|797^"] },
    "content-16x9-10": { actions: ["gravity|Center", "resize|1440|809^"] },

    "content-4x3-1": { actions: ["gravity|Center", "resize|538|404^"] },
    "content-4x3-2": { actions: ["gravity|Center", "resize|675|506^"] },
    "content-4x3-3": { actions: ["gravity|Center", "resize|786|590^"] },
    "content-4x3-4": { actions: ["gravity|Center", "resize|908|681^"] },
    "content-4x3-5": { actions: ["gravity|Center", "resize|1016|762^"] },
    "content-4x3-6": { actions: ["gravity|Center", "resize|1120|840^"] },
    "content-4x3-7": { actions: ["gravity|Center", "resize|1217|913^"] },
    "content-4x3-8": { actions: ["gravity|Center", "resize|1311|983^"] },
    "content-4x3-9": { actions: ["gravity|Center", "resize|1365|1024^"] },
    "content-4x3-10": { actions: ["gravity|Center", "resize|1388|1041^"] },

    "content-1x1-1": { actions: ["gravity|Center", "resize|200|200^"] },
    "content-1x1-2": { actions: ["gravity|Center", "resize|440|440^"] },
    "content-1x1-3": { actions: ["gravity|Center", "resize|608|608^"] },
    "content-1x1-4": { actions: ["gravity|Center", "resize|748|748^"] },
    "content-1x1-5": { actions: ["gravity|Center", "resize|877|877^"] },
    "content-1x1-6": { actions: ["gravity|Center", "resize|994|994^"] },
    "content-1x1-7": { actions: ["gravity|Center", "resize|1092|1092^"] },
    "content-1x1-8": { actions: ["gravity|Center", "resize|1195|1195^"] },
    "content-1x1-9": { actions: ["gravity|Center", "resize|1245|1245^"] },
    "content-1x1-10": { actions: ["gravity|Center", "resize|1280|1280^"] }
  },
  responsiveStyles: {
    cover: {
      sizes: "(max-width: 4800px) 40vw, 1920px",
      srcset: `
        cover-1 480w,
        cover-2 766w,
        cover-3 991w,
        cover-4 1196w,
        cover-5 1360w,
        cover-6 1509w,
        cover-7 1658w,
        cover-8 1808w,
        cover-9 1888w,
        cover-10 1920w
      `
    },
    "cover-sm": {
      sizes: "(max-width: 614px) 100vw, 614px",
      srcset: `
        cover-1x1-1 200w,
        cover-1x1-2 333w,
        cover-1x1-3 439w,
        cover-1x1-4 532w,
        cover-1x1-5 593w,
        cover-1x1-6 614w
      `
    },
    "cover-md": {
      sizes: "(max-width: 1169px) 70vw, 818px",
      srcset: `
        cover-4x3-1 538w,
        cover-4x3-2 632w,
        cover-4x3-3 724w,
        cover-4x3-4 812w,
        cover-4x3-5 818w
      `
    },
    "cover-lg": {
      sizes: "(max-width: 1818px) 60vw, 1091px",
      srcset: `
        cover-16x9-1 596w,
        cover-16x9-2 710w,
        cover-16x9-3 807w,
        cover-16x9-4 907w,
        cover-16x9-5 1007w,
        cover-16x9-6 1089w,
        cover-16x9-7 1091w
      `
    },

    content: {
      sizes: "(max-width: 4800px) 40vw, 1920px",
      srcset: `
        content-1 480w,
        content-2 759w,
        content-3 980w,
        content-4 1162w,
        content-5 1343w,
        content-6 1509w,
        content-7 1649w,
        content-8 1786w,
        content-9 1880w,
        content-10 1920w
      `
    },
    "content-sm": {
      sizes: "(max-width: 1280px) 100vw, 1280px",
      srcset: `
        content-1x1-1 200w,
        content-1x1-2 440w,
        content-1x1-3 608w,
        content-1x1-4 748w,
        content-1x1-5 877w,
        content-1x1-6 994w,
        content-1x1-7 1092w,
        content-1x1-8 1195w,
        content-1x1-9 1245w,
        content-1x1-10 1280w
      `
    },
    "content-md": {
      sizes: "(max-width: 1983px) 70vw, 1388px",
      srcset: `
        content-4x3-1 538w,
        content-4x3-2 675w,
        content-4x3-3 786w,
        content-4x3-4 908w,
        content-4x3-5 1016w,
        content-4x3-6 1120w,
        content-4x3-7 1217w,
        content-4x3-8 1311w,
        content-4x3-9 1365w,
        content-4x3-10 1388w
      `
    },
    "content-lg": {
      sizes: "(max-width: 2400px) 60vw, 1440px",
      srcset: `
        content-16x9-1 596w,
        content-16x9-2 723w,
        content-16x9-3 853w,
        content-16x9-4 952w,
        content-16x9-5 1069w,
        content-16x9-6 1175w,
        content-16x9-7 1275w,
        content-16x9-8 1366w,
        content-16x9-9 1418w,
        content-16x9-10 1440w
      `
    }
  }
};
