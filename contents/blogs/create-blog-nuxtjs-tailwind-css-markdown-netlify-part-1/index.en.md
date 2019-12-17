---
title: Why Do You Have to Create Blog using Nuxt.js, Tailwind CSS, Markdown and Netlify?
description: Creating blog using Nuxt.js and Tailwind CSS can sharpen our creativity
summary: This section discuss the background why we have to write blog content using Markdown, use Nuxt.js as a blog platform, design blog page using Tailwind CSS, and host our blog using Netlify.
img: /cover/2019/12/create-blog-nuxtjs-tailwind-css-markdown-netlify-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2019-12-17T02:48:54.928Z
updatedDate: 2019-12-17T02:48:54.928Z
slug: create-blog-nuxtjs-tailwind-css-markdown-netlify-part-1
id: create-blog-nuxtjs-tailwind-css-markdown-netlify-part-1
---

This section discuss the background why we have to get our hands dirty writing blog content using Markdown even though there are others blog platform which has WYSIWYG (What you see is what you get) feature. Using Nuxt.js as a blogging platform even though other blog platform has many template and plugin options which can help us do many things easier.

Bothering ourself designing blog page using Tailwind CSS even though there are others CSS framework which has many components ready to use. Hosting our blog to Netlify even though other blog platforms like Blogspot and Wordpress already had service without thinking about hosting.

[toc]

## About Blogging 👨‍💻

Blog is one of the most widely used method to increase personal branding in the Internet. I do remembered when I knew blog for the first time. Blogspot and Wordpress were well known back then. Both of them always be the first choice when someone want make a blog.

Although well known, both of them have their own pros and cons. Even I realized myself there is a stereotype among them. Some of them like using Wordpress will get SEO score higher than using Blogspot, Blogspot is harder to custom 😫.

It seems Blogspot's popularity gradually fades away, both in community and also as a platform. It's very rare for me to find a Google search result listing Blogspot. Meanwhile, for Wordpress, it seems they are still have many users and even in my place often held a Wordpress community meetup.

Another blog platform that currently on the rise is Medium. I'm the one who really likes that platform. Besides its simplicity, the content is really great. When this article is written, Medium is widely used by technology companies to publish their case study and technical thing from their company.

Three of them really suit to be used by the one who only focuses on writing. They won't be bothered by technical stuff. Wordpress and Blogspot have many themes/templates options that easy to overhaul. Even Wordpress also has a plugin to enrich many features. Medium has great content so that we can get easier exposure.

## Blogging using Markdown

Today many software developers making use of Markdown as a tool for writing blogs. For some of you who don't know about Markdown, Markdown is a markup language that has simple syntax and written in text format.

Perhaps You wonder why Markdown is used by many software developers as a tool for writing blogs? Is it better to write in [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) (What you see is what you get) editor like [Blogspot](https://www.blogger.com), [Wordpress](https://wordpress.com) and [Medium](https://medium.com/) has? 🤔The short answer is because Markdown is simple.

The analogy is why many people still use simple sticky notes app or notepad rather than a sophisticated tool like Google Docs or Microsoft Word. Its because it is simple, right? Sometimes simple is work better than the sophisticated one.

<app-img src="/content/2019/12/what-you-see-is-what-you-get-text-editor-by-jefrydco.jpg" alt="What You See is What You Get Text Editor" />

The long answer is we can write Markdown using anything, whether simple text editor likes Vim, Vim, and Emacs or sophisticated code editors like Visual Studio Code, Android Studio and XCode.

```markdown
# This is Title
This paragraph has _italic_ and **bold** formatted text.
```

Even we can share it easily using any media without worry about losing its text formatting. Another reason is we can look cool. 😎 Writing blog using Markdown will make You looks like this image,

<app-video src="/content/2019/12/writing-markdown-code-by-giphy.webm" />

Markdown has `.md` extension. We can't open Markdown files directly using the browser. Even though if we force to open it, we will get a mumbo jumbo unformatted text. Perhaps we can call it WYWINGWYG (What you write is not what you get). 😁

We need a tool to convert Markdown to HTML. Its called Bundler. Some of well known bundler like [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), and [Rollup](https://rollupjs.org). By default, it only handles JS file. But we can add a plugin to handle another format like Markdown as well.

## Blogging using Nuxt.js

Nuxt.js is a framework built on top of Vue.js. To get more understanding of why we have to use Nuxt.js, perhaps we need to know about SPA, SSR, and Prerender first.

### SPA (Single Page Application)

Basically all web built using [Vue.js](https://vuejs.org), [React.js](https://reactjs.org), [Svelte](https://svelte.dev) or [Angular](https://angular.io) will be a SPA (Single Page Application). It means we only load one file. Any interaction that happens will only load the needed data. The pros of using SPA compared to MPA (Multiple Page Application) is we don't need to wait for the page to reload in order to interact and navigate with the app.
 
Let say we open [https://jefrydco.id/blog](https://jefrydco.id/blog). Then we click one of the posts. On top of the page will be a progress bar that indicate the page is getting the necessary data. After the data is loaded, the page will change automatically to the post we mean.

SPA will boost user experience. Loading the necessary data is faster than reloading the full page. Even, there is a mechanism to load the needed data before the user clicks the link. So that when the user really clicks that link, they will get an instant response.

### SSR (Server Side Rendering)

Even though SPA is really helpful to increase user experience, it still has cons. The cons arise because of its SPA behaviour.

To get more grasp, You can try to open [Telegram Web](https://web.telegram.org). It is a SPA. If You're unauthenticated, the page will display the login page. Pay attention to that.

<app-img src="/content/2019/12/telegram-web-by-jefrydco.jpg" alt="Telegram Web"/>

Now look on the source code by right clicking on any place on that page. Then choose _**lihat kode sumber**_ if your browser language is Indonesian or **view source code** if its English.

Take a look carefully the source code, the content of the login page can't be seen. It must be located inside the `body` tag right? But it turns out not. Even inside the `body` tag, there is no single line of text available, there are only several `div` tag and single `script` tag.

```html
<body>
  <div class=page_wrap ng-view></div>
  <div id=notify_sound></div>
  <script src=js/app.js></script>
</body>
```

So where is the content of the login page located? Well, that is the cons of SPA. All of the content displayed using JavaScript. Perhaps now you wonder,

What's wrong with content which is displayed using JavaScript, it's better because it's more interactive and faster, right? 🤔

Exactly. The page is more interactive and faster from the user perspective. But from search engine perspective is not like that. Even though Googlebot has the ability to interpret JavaScript. Unfortunately, it takes more time to index our web.

<app-img src="/content/2019/12/googlebot-crawl-render-index-by-google.jpg" alt="Googlebot Crawl Render Index" />

In a simple term, Googlebot does crawling is because it wanna know the content on our web page. What [Googlebot](https://support.google.com/webmasters/answer/182072) does when do crawling is accessing our web URL, then add it to the crawling queue. The crawling process will download the code of our web page. If the page is SPA, Googlebot has to add it to another queue called the rendering process. This rendering process will translate the JavaScript to display our web page content. Indexing will be conducted after all the process is finished.

Although in the end our page will be indexed as well, it takes a long time. That's why SSR comes in. Our web page is already rendered on the server-side. So that Googlebot can skip the rendering process to the indexing process.

And although the content is already rendered on the server-side, we still get benefit from SPA. Because SSR only happens when we access our web for the first time, then when we navigating to another page it will use the SPA.

If I can say, SPA is kinda like Iron Man and SSR is like Iron Man with the infinity gauntlet. It might look excessive, but the reality is it. SPA already has many pros, by adding SSR the pros will be doubled. `─=≡Σ(([ ⊐•̀⌂•́]⊐`

### Prerender

Same as SSR with the only difference is the content is only rendered on the build time.

## Designing User Interface using Tailwind CSS

You often might hear about Bootstrap when dealing with UI Framework. Until now, Bootstrap still become excellent when we want to make web quickly. Bootstrap does have many components ready to use. As Fin said in Jumanji, "My strength is my weakness". So it would be I imagine the Bootstrap.

We can get many benefits by using Bootstrap, but that's the cons lies. In my opinion, it's too hard to custom a Bootstrap component style without breaking another component style. Even though there are many "hack" ways we can do.

Instead of doing many customizations, why don't we use a thing that customizable in the first place? That's where Tailwind CSS comes in. Tailwind CSS doesn't have any component preset, instead, it only consists of CSS class which can be used to compose our UI as we want.

<app-video src="/content/2019/12/tailwindcss-by-adam-wathan.webm" />

From the animation above we can conclude that the only limitation to using Tailwind CSS is our creativity. 😎

## Hosting Blog to Netlify

After all well prepared, the last thing to make our blog can be accessed by other people is making it online. There are many hosting service providers we can use. Start from the paid one until the free. And Netlify is one kind of free hosting service with some condition.

So what is the benefit of using Netlify? 🤔 

To answer that question, I might need to ask a question. My friends here do know about the repository, right? If not, imagine a repository is a place for storing our code on the internet and has all of the changes we already made.

Storing our code on the internet in order to other people can contribute to our blog project, seeing code changes history and if perhaps someday we accidentally delete our blog code, we still have the backup in the repository. 😅

Well, to save our code in the repository, we need to do a thing called `push`. Every time we `push`, Netlify will build and host our new version of our blog automatically. Its amazing thing, right?

## Recap

So do we need to use Nuxt.js, Tailwind CSS and Netlify to make a blog?

To answer that question, You have to ask yourself? What is your point to make a blog? Do you wanna only focus on writing, not dealing with technical stuff, produce great quality writing and get happiness from it? If it so, perhaps a combination of Nuxt.js, Tailwind CSS and Netlify becomes not so suitable for You. Blogspot, Wordpress and Medium might be the right option.

In my opinion, a combination of Nuxt.js, Tailwind CSS and Netlify is suitable for those of You who have a high soul of exploration. Because to make it happen using three of them need a not easy effort. There will be many obstacles you face to drop you down to laziness cliff. But it is how life worked, isn't it? 😇

At the end of the day, all of the tools I mentioned above is just a tool to help us reach our purpose. So any tool You use, if it can make you closer to your purpose, go with them maximally.

Anyway, thanks for reading, hope you enjoy! 🙌 

## References
1. [Markdown](https://www.markdownguide.org/)
2. [Nuxt.js](https://nuxtjs.org)
3. [Tailwind CSS](https://tailwindcss.com)
4. [Netlify](https://netlify.com)
