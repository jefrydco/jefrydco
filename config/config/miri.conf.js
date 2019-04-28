export default {
  image: {
    sizes: "(max-width: 4800px) 40vw, 1920px",
    srcset: [
      { query: { style: "content-1" }, w: 480 },
      { query: { style: "content-2" }, w: 759 },
      { query: { style: "content-3" }, w: 980 },
      { query: { style: "content-4" }, w: 1162 },
      { query: { style: "content-5" }, w: 1343 },
      { query: { style: "content-6" }, w: 1509 },
      { query: { style: "content-7" }, w: 1649 },
      { query: { style: "content-8" }, w: 1786 },
      { query: { style: "content-9" }, w: 1880 },
      { query: { style: "content-10" }, w: 1920 }
    ]
  },
  source: [
    {
      media: "(max-width: 767px)",
      sizes: "(max-width: 1280px) 100vw, 1280px",
      srcset: [
        { query: { style: "content-1x1-1" }, w: 200 },
        { query: { style: "content-1x1-2" }, w: 440 },
        { query: { style: "content-1x1-3" }, w: 608 },
        { query: { style: "content-1x1-4" }, w: 748 },
        { query: { style: "content-1x1-5" }, w: 877 },
        { query: { style: "content-1x1-6" }, w: 994 },
        { query: { style: "content-1x1-7" }, w: 1092 },
        { query: { style: "content-1x1-8" }, w: 1195 },
        { query: { style: "content-1x1-9" }, w: 1245 },
        { query: { style: "content-1x1-10" }, w: 1280 }
      ]
    },
    {
      media: "(min-width: 768px) and (max-width: 991px)",
      sizes: "(max-width: 1983px) 70vw, 1388px",
      srcset: [
        { query: { style: "content-4x3-1" }, w: 538 },
        { query: { style: "content-4x3-2" }, w: 675 },
        { query: { style: "content-4x3-3" }, w: 786 },
        { query: { style: "content-4x3-4" }, w: 908 },
        { query: { style: "content-4x3-5" }, w: 1016 },
        { query: { style: "content-4x3-6" }, w: 1120 },
        { query: { style: "content-4x3-7" }, w: 1217 },
        { query: { style: "content-4x3-8" }, w: 1311 },
        { query: { style: "content-4x3-9" }, w: 1365 },
        { query: { style: "content-4x3-10" }, w: 1388 }
      ]
    },
    {
      media: "(min-width: 992px) and (max-width: 1199px)",
      sizes: "(max-width: 2400px) 60vw, 1440px",
      srcset: [
        { query: { style: "content-16x9-1" }, w: 596 },
        { query: { style: "content-16x9-2" }, w: 723 },
        { query: { style: "content-16x9-3" }, w: 853 },
        { query: { style: "content-16x9-4" }, w: 952 },
        { query: { style: "content-16x9-5" }, w: 1069 },
        { query: { style: "content-16x9-6" }, w: 1175 },
        { query: { style: "content-16x9-7" }, w: 1275 },
        { query: { style: "content-16x9-8" }, w: 1366 },
        { query: { style: "content-16x9-9" }, w: 1418 },
        { query: { style: "content-16x9-10" }, w: 1440 }
      ]
    }
  ]
};
