---
title: The Story of Rebuilding My Personal Site Using Nuxt.js and Tailwind CSS
description: I've been blogging since I was junior high school, but until now there is no single blog I made survive.
img: /cover/rebuild-personal-site-using-nuxtjs-tailwindcss.jpg
postedDate: 2019-04-17T07:15:21.689Z
updatedDate: 2019-04-24T11:12:51.265Z
slug: rebuild-personal-site-using-nuxtjs-tailwindcss
---

I've been blogging since I was junior high school, but until now there is no single blog I made survive. The main reason is I get bored. The writing experience also is not so good. I just write a couple of articles and start to confuse what kind of article I should write next.

Although each time I start blogging, I always spend my time a lot in building the blog itself not in creating the content.

I always start building blog with questions like; what JS and CSS framework/library I will use, how I style my site to get the best reading experience, where should I host my site, how I config my site to get up and running well, how I optimize my site to be as fast as possible.

How I make my site passed [Google Web Speed](https://web.dev/measure) test, how I get my site as SEO as possible, which code highlighter I will use, [prism.js](https://prismjs.com) or [highlight.js](https://highlightjs.org/). It's a lot of question in my mind to just start blogging.

I see my friends in college start writing an article in [Medium](https://medium.com). I want to do that as well. And that scheme above is starting over again now on.

By the way, I don't provide a TLDR section because I think each section on this post is not too long to read. But if you think this article is long enough for you. You can jump out on to the section you want to read by using this link below:

[toc]

Back off to the topic. In a few moments later I thought, sometimes I just want to write short sentences to express my feeling, can I do that in Medium? Probably, but I think Medium is not a place to do that.

Medium has had a lot of users. The writing experience there is so good. Medium focuses on content, many great writers write on medium.

But in my opinion, my blog is not just the content I write, but also the blog itself. Does it mirror my personality, can I customize it as I want, can I add more content besides article All of those things cannot I do in medium (when this article is written).

After long consideration, I decided to rebuild my own blog. I commit making my site more personal, writing there more frequent and spread it to the world more often. Here's come for the questions I mentioned above again.

## What JS framework/library I will use?
There are three choices for me regarding JS framework, they are jQuery, React and Vue. 

### jQuery
Since my first blog, I start using jQuery as my main JS library. The only thing I do to start using this library is importing its JavaScript file onto HTML directly. Its popularity and simplicity over vanilla JS have proven.

Besides that, there is a lot of jQuery plugin I can choose. But sadly, jQuery popularity starts decreasing over time, with arising Angular, React and Vue.

### React
The second choice is React. I've started learning React but always has difficulty. Because of the nature of React that let the community build everything on top of React itself, it makes me difficult to choose which plugin is suitable for my project.

If it's not difficult, it does take me a long time to choose between many add-ons available. And I do agree that the community behind React is massive. React is backed by Facebook, with an infinite resource available.

I can't just easily import React library file onto HTML file. If I want to create React app, I should use its builder tool. Besides that, HTML syntax in React slightly different with common HTML. It even has a different name, called [JSX](https://reactjs.org/docs/introducing-jsx.html).

```jsx
const element = <h1>Hello, world!</h1>;
```

It's written directly inside the JS file. JS and JSX also can be combined with each other like; looping inside JSX or stating a JS variable that contains JSX.

### Vue
The last choice is Vue. Friends of mine, [Naufal Rabbani](https://github.com/bosnaufal) introduce me to learn Vue about two years ago when I was in the first year of college. He said that if I want to get productive quickly, I should go with Vue because the learning curve is easy.

I just knew jQuery back then. Like jQuery does, to start using Vue, I only need to import its JS file into HTML.

I try to grasp the concept behind Vue, but I still confuse because of it so different from jQuery. There are many new terms and concept I should understand like; data binding, computed property, components, life-cycle hooks and many more.

What the heck is that all? I give up at first. Although many frontend developers said that the documentation of Vue is easy enough to understand, I don't get it at all.

In my confusion, I found out Udemy. **Udemy is an online course that often sells its content with a very high discount**. I search Vue course there, and I found course entitled [Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex)](https://www.udemy.com/vuejs-2-the-complete-guide) by [Maximilian Schwarzmüller](https://twitter.com/maxedapps). He teaches each Vue concept very detail and sequence making me quickly understand.

Max also teaches about Vue Router and Vuex as well. At some point inserting Vue JavaScript library onto HTML isn't enough. I have to use Vue builder tool to make a more complex application, an analytics dashboard for instance.

Analytics dashboard should be able to load and display a lot of data. Perhaps it also has many pages to navigate. So it must be some sort of mechanism to load the data asynchronously.

Vue Router helps resolve that problem by splitting the javascript code between pages. So the page only loads the javascript code it needed.

Vuex is state management system. Using Vue, I can separate my code into components. Vuex helps me dealing if I have many components and they have to communicate with each other.

Meanwhile, I was accepted intern in a healthy-based startup company named [Reblood](https://reblood.com). The first project I got there is rebuilding their official website. At first, the CEO, Leonika Sari told me to use [Polymer](https://www.polymer-project.org) by Google.

I asked why I should use Polymer? She replied that Polymer is easy to use. Ok, because I never use that framework, I'll try.

After several attempts, I realize Polymer wasn't suitable for me. I proposed to my CEO to use Vue instead. She said that ok just do it, **whatever the tool you use, choose the one that easier to you because it will make you more productive**.

Rebuilding Reblood website using Vue increase my understanding deeper, although the structure of my project and the code are still messy.

Back off to the topic, the difficulty I feel regarding the messy thing lead me to [Nuxt](https://nuxtjs.org/). Like stated on its official website,

> Nuxt.js presets all the configuration needed to make your development of a Vue.js application enjoyable.

Like when I was learning Vue for the first time, I should understand the concept behind Nuxt.js and I also should understand several new terms like; server-side rendering, universal application, modules, plugin and so on. Although the concept is not as much as Vue, it's good to know.

Then I learn from another Max course, [Nuxt.js - Vue.js on Steroids](https://www.udemy.com/nuxtjs-vuejs-on-steroids). Max also explain Nuxt.js concept very well.

So yeah, Nuxt.js does make me faster to develop Vue application. Enhanced with server-side rendering feature help me reduce the application initial load faster and [time to interact](https://calibreapp.com/blog/time-to-interactive/) shorter.

This blog is powered by Nuxt as well, you can check out the source code in my Github repository here, [jefrydco](https://github.com/jefrydco/jefrydco).

## What CSS framework/library I will use?
For CSS framework, I also have several options to choose. They are Bootstrap, Bulma, Vuetify, and Tailwind.

### Bootstrap
I really like [Bootstrap](https://getbootstrap.com) since I started my first blog, it has many components that can be used in my site. I don't have to deal with searching many other libraries for this and that.

Then I start thinking, although Bootstrap is a complete package for frontend development, that will be overkilled if I only need to use it in my site.

Modifying its style to fit my style requires a lot of effort. I have to overwrite many Bootstrap style to do that.

Another thing that I regret if I use Bootstrap is it depends on jQuery, what if I don't want to use jQuery. Actually, this problem has been solved by porting Bootstrap into other JavaScript frameworks.

But the main problem hasn't been solved yet, Bootstrap and its JavaScript frameworks give me anything that I don't need.

### Bulma
[Bulma](https://bulma.io) is similar to Bootstrap without JavaScript functionality, the creator stated that Bulma is **environment agnostic**. It means that Bulma can lie on top of any JavaScript framework/library.

My previous CSS framework for this blog is using Bulma, and for the interactive feature, I only use vanilla JavaScript.

### Vuetify
[Vuetify](https://vuetifyjs.com) is also similar enough with Bootstrap. But it's specific to Vue. It uses [Material Design](https://material.io/design) by Google. 

Vuetify has been my main CSS framework since I was learning Vue. I also use it to build Reblood official website and another simple project as well. It solved the problem that Bootstrap has by code splitting its component.

I'm very satisfied with Vuetify but one thing I don't quietly like is the material design style.

The material design currently used by Vuetify is version 1. It is very Google-ly. I mean my application will be look identical to Google application.

Now Material design has changed, the version 2 coming with the more flexible and customizable design system. The developer can easily integrate it without worrying their application will be similar to Google.

Currently, Vuetify is also developing version 2. And it will use the newest material design system.

### Tailwind
The problem I have when I use CSS framework is that the framework itself is overkill for my needed. The second problem is about styling. I just don't want my site to be identical or similar to another site.

[Tailwind](https://tailwindcss.com) can overcome it. They solve both problems I have. Tailwind doesn't have default theme, there are no built-in UI components, has no opinion about the site I build should look like. So, how can that possible?

Tailwind is more like a prototyping tool than a CSS framework. I can implement a custom design with my own identity. It provides highly composable, low-level CSS classes that make it easy to build complex user interfaces **without encouraging any two sites to look the same**.

Even if there is something that doesn't cover by Tailwind. It functionality can be extended by using the plugin.

I choose Tailwind over several options above. It does provide a way that I can easily develop this site freely.

## How I style my site to get the best reading experience?
I don't dismiss that Medium has the best reading experience among other sites I known. If I open Medium content page, I'll only see a very clean display and centred article. There is no distraction there. The font size is quite big and easy to read. 

And because of that, many sites borrow Medium style to get that level reading experience. So do I. I start designing the content page with that kind of experience.

Starting from the font family, I choose [Merriweather Sans](https://fonts.google.com/specimen/Merriweather/) for general text and [Bitter](https://fonts.google.com/specimen/Bitter/) for the header.

Google Fonts highlighted Merriweather Sans as [Superfamilies](https://fonts.google.com/featured/Superfamilies) and Bitter as [Headline-Worthy Serifs](https://fonts.google.com/featured/Headline-Worthy+Serifs).

Talking about the font size, I use 1.125rem (18px) for general text and for heading varying from 0.75rem (12px) to 1.5rem (24px). Fyi, tailwind use rem with base 16px for its unit.

For line-height, I choose 1.5 for the value. Each paragraph has margin-bottom with 2rem value. The margin-bottom will give the reader space to read each paragraph easily.

Furthermore, you can read the code I made for the content page here, [jefrydco/_slug.vue at master](https://github.com/jefrydco/jefrydco/blob/master/pages/blog/_slug.vue#L240).

For another page of this site, I create as simple as possible. The homepage just contains my profile section. Then in the blog list page, the profile section is added with the blog list itself. And on the blog item page, the profile section is moved below the article.

I also give the reader options to choose whether they want to read in light mode or dark mode. You can switch the button on the top right of every page.

## Where should I host my site?
I have a dilemma when I choose where should I host my site. Because my site is designed to be server-side rendering.

I should run it on the node.js environment. The problem is which one is the best. Not the best as a feature only but also the best fit in my wallet as well.

There are several choices I spot, I can host it on Google Cloud Platform in App Engine or Compute Engine, on Amazon Web Service in EC2 or Elastic Bean, and the last one is on Heroku.

### Google App Engine or Compute Engine
I have tried to deploy a simple app on GCP both on App Engine and Compute Engine. They are all great in running the application. 

Compute Engine has more control because of it basically a virtual private server so I can access it using SSH. The problem with Compute Engine is that I should deal with configuring docker environment, nginx and so on.

I like experimenting with that stuff, but for the sake of simplicity and security of my site, I don't want to do that.

App Engine has less control. It is platforms as a service, it means I can focus on coding and Google takes care of the server. It is easier than Compute Engine to get up and running. The only thing I should do is build my site then deploy.

Easier to deploy doesn't mean I don't have problems with my site. My site has a special condition because I use markdown to write the article, the [@nuxt/feed](https://github.com/nuxt-community/feed-module) module needs to load the markdown file when my site is running.

Markdown file can't be loaded through [Webpack Loader](https://webpack.js.org/loaders), so I have to make it loaded through node.js `fs.readFile()` method.

I know the feed isn't a priority that much, but I like my site has a complete feature to my reader, so why not?

### Amazon Web Service EC2 or Elastic Beanstalk
Like what I did in App Engine and Compute Engine. I have tried to deploy a simple app in EC2 and Elastic Beanstalk as well.

What I experience when I tried to do the same thing on AWS is worst than I experience in GCP, especially in Elastic Beanstalk. But the experiencing with EC2 is same as on Compute Engine.

Like App Engine should do, Elastic Beanstalk is intended to make app development easier. Making the developer more focus on the code rather than the deployment side.

Actually, I just can deploy onto Elastic Beanstalk by uploading zip files of the project. Because of Amazon Web Service also has features called Code Build and Code Pipeline, I want to implement that as well.

The idea of them is whenever I pushed changes into the Github repository, Code Build triggered to build the site and Code Pipeline pipe the result to Elastic Beanstalk.

At first, I can configure Code Build successfully but for Code Pipeline, I don't know why the build result can't be passed through Elastic Beanstalk.

I search through many developer forums and they suggest me to configure in IAM page. But as I guest, it's very overwhelming confusing. There are many rules for many things. I just can't grasp them all. So I give up with Amazon Web Service.

### Heroku
The last option is [Heroku](https://www.heroku.com). Heroku services are similar to App Engine in GCP or Elastic Beanstalk in AWS but more simple.

Heroku also provides [continuous integration/continuous delivery](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007). It means, the developer should only focus on coding.

When they push changes to their repository, Heroku triggered to run the build process then automatically it will be deployed.

Besides that, **Heroku provides free SSL for my custom domains** as well. Today, SSL is a mandatory thing on the web.

All of the convenience that Heroku provides has a tradeoff. The cost of usage is quite pricy among other services I mentioned above.

I really like how that CI/CD worked. I even don't think any more about the pain of deploying something. So pricey price is worth it with the Heroku service.

For now on, I'll use Heroku to host this site. Perhaps at some point, I'll reconsider Heroku alternative if the price is rising.

## How I config my site to get up and running well?
I bought this domain from [Dewaweb](https://www.dewaweb.com) and I have hosted this site on that hosting provider for about 2 years. I satisfied with its service. The problem is, I use shared hosting which can runs PHP only.

The second problem is Heroku can't provide a way to connect the root domain like `jefrydco.id` into their service. Heroku can only accept subdomain, `www.jefrydco.id` for instance. But I don't want my site to start with www. So I figure out how to remove that.

### Searching for a suitable DNS provider
I came up with the solution of pointing the root domain into another subdomain. Sadly, Dewaweb can't do that. So I decided to search for another DNS provider. And I found [Cloudflare](https://www.cloudflare.com).

**Cloudflare provides a way to remove www from the custom domain in Heroku**. It is called [CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-Understand-and-configure-CNAME-Flattening).

Cloudflare basically is a CDN provider but it has DNS configuration as well. **CDN is a geographically distributed network or proxy server that can serve the site in low latency**.

To get a better understanding of how CDN worked. For instance, my server is located in Indonesia. Two people open my site, one is located in Singapore and the other one is in the USA.

If I don't use CDN, both of them will retrieve my site data from Indonesia. The people in Singapore will get my site open faster than the one in the USA because of geolocation distance.

By using CDN, **Cloudflare will cache and replicate this site to its different server in a different location**. If someone accesses my site, Cloudflare will look upon their closest server to someone's location whether my site has been cached or not.

If not, Cloudflare will request my site data from my server and cached it. After that, the request is forwarded into someone's browser. If it has cached, Cloudflare automatically forwards the cache into someone's browser.

By using CDN, it doesn't require to retrieve the data from my server. And it is very helpful to reduce the bandwidth usage of my server.

### Setting up Heroku for automatic deployment from Github
Actually, Heroku has 2 options for deployment, they are CI/CD and Github Integration. The difference between them is that **CI/CD requires several test case to be passed** before Heroku release my commit to production.

In compared to CI/CD, **Github Integration doesn't need any test case**, Heroku only waits my repo if there is a new commit. It triggered the build process. if it successful, it will automatically be released to production.

I prefer to use Github Integration because it's simpler. It doesn't require any test case.

Furthermore, Github Integration in Heroku has been documented here, [GitHub Integration (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration).

## How I optimize my site to be as fast as possible?
A page optimization for this site is divided into 2 things. The first thing is done by Cloudflare and the second one is done by myself.

### Page Optimization by Cloudflare
Cloudflare has several services that can be used to optimize my site. The first one is called auto-minification, the idea is that each HTML, CSS and JavaScript of my site is minified by Cloudflare server.

The second one is enabling HTTP compression using  [Brotli](https://brotli.org/) algorithm.

The next one is [Rocket Loader](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-). Rocket Loader will prioritise the site's content (text, images, fonts etc) by deferring the loading of all of the JavaScript until after rendering.

Actually, there are still other Cloudflare's services to speed up my site. But they are all in the paid plan.

### Page optimization by myself
I use several Nuxt.js modules to speed up this site.

Loading font sometimes makes page rendering blocked. To overcome that problem, the first Nuxt.js module I use is [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader). Webfontloader is a JavaScript library to load font asynchronously from Google Fonts.

The second one is [nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss), this module removes unnecessary CSS that I don't use on each page.  Purge CSS works very well with Tailwind.

Two of the modules above is created by [Alexander Lichter](https://twitter.com/TheAlexLichter). He is one of the core team of Nuxt.js. He often writes articles about Vue.js and Nuxt.js tips on his blog. You can check out his blog here, [blog.Lichter.io](https://blog.lichter.io/).

The next one is [@reallifedigital/nuxt-image-loader-module](https://github.com/reallifedigital/nuxt-image-loader-module). This module will manipulate images by using [Graphicsmagick](http://www.graphicsmagick.org). It will crop and resize the image according to the request.

Accompanying with this module, I use `<picture>` tag combined with `srcset` attribute in `<img>` tag. This kind of thing is called **responsive image**. This code snippet below is used to display the header image on this page:

```HTML
<picture>
  <source
    media="(max-width: 767px)"
    sizes="(max-width: 614px) 100vw, 614px"
    srcset="
      /cover/img.jpg?style=cover-1x1-1 200w,
      /cover/img.jpg?style=cover-1x1-2 333w
    ">
  <img
    src="/cover/img.jpg?style=cover"
    alt="How I Rebuild My Site Using Nuxt.js and Tailwind CSS"
    sizes="(max-width: 4800px) 40vw, 1920px"
    srcset="
      /cover/img.jpg?style=cover-1   480w,
      /cover/img.jpg?style=cover-2   766w
      "
    class="header__img"
    >
</picture>
```

The point from that code snippet is that there is a lot of image URL but they are all in the same endpoint only different in the query string.

**The query string is used to differentiate the different size of the image.** For instance, `/cover/img.jpg?style=cover-1` has 480x154 image size but `/cover/img.jpg?style=cover-2` has 766x245 image size.

The last module I use is [Nuxt PWA](https://pwa.nuxtjs.org/). **PWA will boost page speed load by enabling cache in the browser side**.

## How I make my site passed Google Web Speed test?
The good thing when using Nuxt.js is the site will be faster because of the universal application mode. It combines server-side rendering and single page application.

Server-side rendering means that the HTML and CSS are generated on the server side. After the page is sent to the browser, it will act as a single page application.

The cons of using a single page application only are that the JavaScript bundle might be oversized. Sometimes the SPA is not suitable for a slow network connection.

Usually, when the JavaScript bundle is loading, the loading bar is shown to the user. If the JavaScript bundle is quite big, it will increase several metrics value like time to interactive.

Time to interactive measure how well a site for the user to interact with for the first time.

Server-side rendering can overcome that problem by sending HTML and CSS first. The user will see the page content immediately.

Besides getting benefit from Nuxt.js, Cloudflare also helps much to get a better score in Google Web Speed test.

## How I get my site as SEO as possible?
SEO is a mystery. No one knows what Google thinks of our site. But for this time, Google always encourages to create good content, make the site as faster as possible, and enhance user accessibility. And let Google does the rest.

Besides doing that, I also try to use good structure data for my site. I use [JSON-LD](https://json-ld.org/) to help Google knows my site better. Structured data is a standardized format for providing information about a page and classifying the page content.

## Which code highlighter I will use, prism.js or highlight.js?
I go with highlight.js. The creator of highlight.js stated: 

> One of the defining design principles for highlight.js from the start was simplicity. Not the simplicity of code (in fact, it’s quite complex) but the simplicity of usage and of the actual look of highlighted snippets on HTML pages.

I'm very like simplicity, the design principle of highlight.js is really suitable for me.

Besides that reason, it easier to find highlight.js theme rather than prism.js theme.

## Close Though
Woah, this is the first time for me writing a very long article in English and Bahasa Indonesia simultaneously.

And for the reader that has completed read all of the words above. I'm very grateful to you.

The last thing I wanna say is creating a site using Nuxt.js and all of the technology I mentioned above is a very exciting experience.

I have a plan to write a more detail article about each section on this post. So stay tuned!

If you have any great things I should implement for this site. Just drop me a line on my twitter account, [@jefrydco](https://twitter.com/jefrydco).