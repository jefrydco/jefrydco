---
title: Good HTML5 Structure - Part 2
description: A good HTML5 structure can make HTML documents easier to understand both by humans and by search engines.
summary: Hello my friends, this time I continued yesterday's discussion of a good HTML5 structure. After reviewing the structure of HTML5 yesterday from the HTML type declaration section to the closing tag </head>, now the discussion starts from the opening tag <body> to the closing HTML </html> tag.
img: /cover/2017/08/struktur-html5-image-by-sai-kiran-anagani.jpg
imgCreator: _imkiran
postedDate: 2017-08-30T11:00:00.000Z
updatedDate: 2017-08-30T11:00:00.000Z
slug: struktur-html5-part-2
id: struktur-html5-part-2
---

> Read the first part here, [Good HTML5 Structure - Part 1](/en/blog/struktur-html5-part-1)

Hello my friends, this time I continue the discussion yesterday about a good HTML5 structure. After reviewing the HTML5 structure from the declaration of the HTML type to the `</head>` closing tag, now the discussion starts from the opening tag `<body>` to the closing HTML tag `</html>`.

Previously I wanted to remind once again that the purpose of HTML5 was to make WWW more meaningful and easy to understand, both by humans and search engines. Because of that, there are several new tags that define something specific according to its function.

The HTML5 structure this time is well used for websites in the form of blogs. As for other websites, please create your own friends while paying attention to the rules made by [W3 Consortium](https://www.w3.org/consortium/).

```html
<body>
  <section>
```

The body tag is used to define the content of an HTML5 document, the content can be text, links, images, videos, music, and other things. As a default, all that is inside the body tag can we see the results directly through the browser.

Then the section tag is used to mark certain parts of the HTML5 document, the parts here can be chapters, headers, footers or other parts in one document.

```html
    <header>
      <nav>
        <!-- Page Navigation -->
      </nav>
      <h1>
        <!-- Page Title -->
      </h1>
    </header>
```

The header tag is used to define the initial part of the content, it can also be a navigation link, page title, andwebsite logo. we can use header tags many times in one HTML5 document. But there are exceptions to laying out this tag, we are not allowed to use header tags in the footer tag and inside other header tags.

While the nav tags in this context can be used to define navigation links to other pages, for example to a blog page, about and so on.

```html
    <main>
```

The main tag is used to define the main part of an HTML5 document. There are exceptions to laying out this tag, we are not allowed to use main tags in tag articles, aside, footers, headers and navs.

```html
      <article>
        <h2>
          <!-- Article Title -->
        </h2>
      </article>
      <article>
        <h2>
          <!-- Other Article Titles -->
        </h2>
      </article>
```

The article tag is used to define content in the form of articles. While we can use h2 tags as article titles.

```html
      <nav>
        <!-- Page Navigation -->
      </nav>
    </main>
```

The nav tag above can be used to define navigation. Navigation in this context can be a link to the next article or before.

```html
    <aside>
      <!-- Sidebar -->
    </aside>
```

Tag aside is used to define content other than the main content. The content can be sidebar which contains navigation menus and other information that we need to list.

```html
    <footer>
      <!-- Author information, copyright, published date, etc. -->
    </footer>
```

Footer tags are used to define the end of an HTML5 document. This tag can contain information about the author, copyright, or published and other information that is still related to the content.

```html
  <script src="External JS"></script>
```

The src script tag is used to call external JavaScript. Noteworthy is that it should not include a lot of external JavaScript because it can increase page load time. If you really need a lot of JavaScript plugins, the script should be made one.

The way to make one is not allowed to be careless, you should not immediately make one by copying the contents of the script, because sometimes there are some scripts that when put together actually make an error. A safer way to make some JavaScript plugins to minimize the occurrence of errors will be discussed in another post.

```html
  <script>
      // Internal JS
  </script>
```

The script tag is used to define the script, generally in the form of JavaScript. Noteworthy is that a large JavaScript plugin should be placed externally. While the script tag can be filled with configuration scripts from third party services, such as [Google Analytics](https://analytics.google.com/) and [Disqus](https://disqus.com/).

```html
  <script type="application/ld+json">
      // JSON
  </script>
</body>
```

Well for script tags that have a slightly different function. If the script tag is generally used to place scripts that manipulate HTML, this one script tag is used to enrich the information of our website pages when accessed by [Google crawler robot](https://support.google.com/webmasters/answer/182072?hl=en). The information included in this tag is [JavaScript Object Notation for Linking Data](https://json-ld.org/) by paying attention to the rules of [schema.org](https://schema.org/) The example of ld + json code is as follows,

```json
{
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "Jefry Dewangga",
    "jobTitle": "Student",
    "url": "https://jefrydco.id"
}
```

From this information, Google can display search results that are more interesting. Examples like the following picture,

<app-img src="/content/2017/08/sitelink-image-by-jefrydco.jpg" alt="Sitelink" />

The picture above is the result of my old blog search. Google displays a number of links that allow users to search for our website faster faster below the main search results. The appearance of such search results is usually called [sitelinks](https://support.google.com/webmasters/answer/47334?hl=en).

In the picture above, friends can compare the way Google displays URL information. The URL of one of these blog posts is displayed in accordance with the navigation information I specified in the script type application/ld+json. The code example that I put in the tag is as follows,

<app-img src="/content/2017/08/breadcrumb-indexed-image-by-jefrydco.jpg" alt="Breadcrumb indexed" />

```json
{
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@id": "https://jefrydco.id/blog",
                "name": "Blog"
            }
        },
        {
            "@type": "ListItem",
            "position": 2,
            "item": {
                "@id": "https://jefrydco.id/blog/category/tutorial",
                "name": "Tutorial"
            }
        },
        {
            "@type": "ListItem",
            "position": 3,
            "item": {
                "@id": "https://jefrydco.id/blog/struktur-html5-part-2",
                "name": "Struktur HTML5 yang Baik Part 2"
            }
        }
    ]
}
```

In addition, if friends are considered as influential people in the world, Google will display complete personal information about friends from curriculum vitae from Wikipedia to social media links when other people use friends' names as keywords. Examples like the following picture,

<app-img src="/content/2017/08/elon-musk-search-result-image-by-jefrydco.jpg" alt="Elon musk search result" />

More information about what information we can include in this tag will be discussed in another post.

So if all the codes above are combined it will be as follows,

```html
<body>
  <section>
    <header>
      <nav>
        <!-- Page Navigation -->
      </nav>
      <h1>
        <!-- Page Title -->
      </h1>
    </header>
    <main>
      <article>
        <h2>
          <!-- Article Title -->
        </h2>
      </article>
      <article>
        <h2>
          <!-- Other Article Titles -->
        </h2>
      </article>
      <nav>
        <!-- Page Navigation -->
      </nav>
    </main>
    <aside>
      <!-- Sidebar -->
    </aside>
    <footer>
      <!-- Author, copyright, published date, etc. -->
    </footer>
  </section>
  <script src="External JS"></script>
  <script>
      // Internal JS
  </script>
  <script type="application/ld+json">
      // JSON
  </script>
</body>
```

What needs to be considered is that the above structure must not absolutely be followed by friends, friends can adjust it to their needs while paying attention to the rules made by [W3 Consortium](https://www.w3.org/consortium/). These rules can be learned by yourself through the website that I cantumin in the reference section.

Although it looks trivial, using HTML5 tags in accordance with their functions and adding ld + json information is one of our efforts to make WWW more meaningful and easy to understand, both by humans and search engines. Okay just enough discussion about the good HTML5 structure this time. Hopefully useful and keep the spirit to continue learning.

## References
1. [JSON for Linking Data](https://json-ld.org/)
2. [Mozilla Developers Network: HTML Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
3. [Schema.org](https://schema.org/)
4. [Search Console Help: Sitelinks](https://support.google.com/webmasters/answer/47334)
5. [W3Schools: HTML Element Reference](https://www.w3schools.com/tags/default.asp)
