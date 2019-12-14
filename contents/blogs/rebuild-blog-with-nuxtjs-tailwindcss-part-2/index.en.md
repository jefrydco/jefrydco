---
title: Rebuild My Blog with Nuxt.js and Tailwind CSS - Part 2
description: Rebuilding my blog with Nuxt.js and Tailwind CSS makes the development process faster.
summary: I have got the answer about which JavaScript framework as the main tool, CSS framework I use and have a thought about the style. Then I'll answer the next 5 questions.
img: /cover/2019/04/rebuild-blog-with-nuxtjs-tailwindcss-image-by-markus-spiske.jpg
imgCreator: markusspiske
postedDate: 2019-04-25T15:49:14.624Z
updatedDate: 2019-04-25T15:49:14.624Z
slug: rebuild-blog-with-nuxtjs-tailwindcss-part-2
id: rebuild-blog-with-nuxtjs-tailwindcss-part-2
---

> Read the first part here, [Rebuild My Blog with Nuxt.js and Tailwind CSS - Part 1](/en/blog/rebuild-blog-with-nuxtjs-tailwindcss-part-1)

I have got the answer about which JavaScript framework as the main tool, CSS framework I use and have a thought about the style. Then I'll answer the next 5 questions.

[toc]

## Where should I host my blog?
I have a dilemma when I choose where should I host my blog. Because my blog is designed to be server-side rendering.

I should run it on the node.js environment. The problem is which one is the best. Not the best as a feature only but also the best fit in my wallet as well.

There are several choices I spot, I can host it on Google Cloud Platform in App Engine or Compute Engine, on Amazon Web Service in EC2 or Elastic Bean, and the last one is on Heroku.

### Google App Engine or Compute Engine
I have tried to deploy a simple app on GCP both on App Engine and Compute Engine. They are all great in running the application. 

Compute Engine has more control because of it basically a virtual private server so I can access it using SSH. The problem with Compute Engine is that I should deal with configuring docker environment, nginx and so on.

I like experimenting with that stuff, but for the sake of simplicity and security of my blog, I don't want to do that.

App Engine has less control. It is platforms as a service, it means I can focus on coding and Google takes care of the server. It is easier than Compute Engine to get up and running. The only thing I should do is build my blog then deploy.

Easier to deploy doesn't mean I don't have problems with my blog. My blog has a special condition because I use markdown to write the article, the [@nuxt/feed](https://github.com/nuxt-community/feed-module) module needs to load the markdown file when my blog is running.

Markdown file can't be loaded through [Webpack Loader](https://webpack.js.org/loaders), so I have to make it loaded through node.js `fs.readFile()` method.

I know the feed isn't a priority that much, but I like my blog has a complete feature to my reader, so why not?

### Amazon Web Service EC2 or Elastic Beanstalk
Like what I did in App Engine and Compute Engine. I have tried to deploy a simple app in EC2 and Elastic Beanstalk as well.

What I experience when I tried to do the same thing on AWS is worst than I experience in GCP, especially in Elastic Beanstalk. But the experiencing with EC2 is same as on Compute Engine.

Like App Engine should do, Elastic Beanstalk is intended to make app development easier. Making the developer more focus on the code rather than the deployment side.

Actually, I just can deploy onto Elastic Beanstalk by uploading zip files of the project. Because of Amazon Web Service also has features called Code Build and Code Pipeline, I want to implement that as well.

The idea of them is whenever I pushed changes into the Github repository, Code Build triggered to build the blog and Code Pipeline pipe the result to Elastic Beanstalk.

At first, I can configure Code Build successfully but for Code Pipeline, I don't know why the build result can't be passed through Elastic Beanstalk.

I search through many developer forums and they suggest me to configure in IAM page. But as I guest, it's very overwhelming confusing. There are many rules for many things. I just can't grasp them all. So I give up with Amazon Web Service.

### Heroku
The last option is [Heroku](https://www.heroku.com). Heroku services are similar to App Engine in GCP or Elastic Beanstalk in AWS but more simple.

Heroku also provides [continuous integration/continuous delivery](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007). It means, the developer should only focus on coding.

When they push changes to their repository, Heroku triggered to run the build process then automatically it will be deployed.

Besides that, **Heroku provides free SSL for my custom domains** as well. Today, SSL is a mandatory thing on the web.

All of the convenience that Heroku provides has a tradeoff. The cost of usage is quite pricy among other services I mentioned above.

I really like how that CI/CD worked. I even don't think any more about the pain of deploying something. So pricey price is worth it with the Heroku service.

For now on, I'll use Heroku to host this blog. Perhaps at some point, I'll reconsider Heroku alternative if the price is rising.

## How I config my blog to get up and running well?
I bought this domain from [Dewaweb](https://www.dewaweb.com) and I have hosted this blog on that hosting provider for about 2 years. I satisfied with its service. The problem is, I use shared hosting which can runs PHP only.

The second problem is Heroku can't provide a way to connect the root domain like `jefrydco.id` into their service. Heroku can only accept subdomain, `www.jefrydco.id` for instance. But I don't want my blog to start with www. So I figure out how to remove that.

### Searching for a suitable DNS provider
I came up with the solution of pointing the root domain into another subdomain. Sadly, Dewaweb can't do that. So I decided to search for another DNS provider. And I found [Cloudflare](https://www.cloudflare.com).

**Cloudflare provides a way to remove www from the custom domain in Heroku**. It is called [CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-Understand-and-configure-CNAME-Flattening).

Cloudflare basically is a CDN provider but it has DNS configuration as well. **CDN is a geographically distributed network or proxy server that can serve the blog in low latency**.

To get a better understanding of how CDN worked. For instance, my server is located in Indonesia. Two people open my blog, one is located in Singapore and the other one is in the USA.

If I don't use CDN, both of them will retrieve my blog data from Indonesia. The people in Singapore will get my blog open faster than the one in the USA because of geolocation distance.

By using CDN, **Cloudflare will cache and replicate this blog to its different server in a different location**. If someone accesses my blog, Cloudflare will look upon their closest server to someone's location whether my blog has been cached or not.

If not, Cloudflare will request my blog data from my server and cached it. After that, the request is forwarded into someone's browser. If it has cached, Cloudflare automatically forwards the cache into someone's browser.

By using CDN, it doesn't require to retrieve the data from my server. And it is very helpful to reduce the bandwidth usage of my server.

### Setting up Heroku for automatic deployment from Github
Actually, Heroku has 2 options for deployment, they are CI/CD and Github Integration. The difference between them is that **CI/CD requires several test case to be passed** before Heroku release my commit to production.

In compared to CI/CD, **Github Integration doesn't need any test case**, Heroku only waits my repo if there is a new commit. It triggered the build process. if it successful, it will automatically be released to production.

I prefer to use Github Integration because it's simpler. It doesn't require any test case.

Furthermore, Github Integration in Heroku has been documented here, [GitHub Integration (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration).

## How I optimize my blog to be as fast as possible?
A page optimization for this blog is divided into 2 things. The first thing is done by Cloudflare and the second one is done by myself.

### Page Optimization by Cloudflare
Cloudflare has several services that can be used to optimize my blog. The first one is called auto-minification, the idea is that each HTML, CSS and JavaScript of my blog is minified by Cloudflare server.

The second one is enabling HTTP compression using  [Brotli](https://brotli.org/) algorithm.

The next one is [Rocket Loader](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-). Rocket Loader will prioritise the blog's content (text, images, fonts etc) by deferring the loading of all of the JavaScript until after rendering.

Actually, there are still other Cloudflare's services to speed up my blog. But they are all in the paid plan.

### Page optimization by myself
I use several Nuxt.js modules to speed up this blog.

Loading font sometimes makes page rendering blocked. To overcome that problem, the first Nuxt.js module I use is [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader). Webfontloader is a JavaScript library to load font asynchronously from Google Fonts.

The second one is [nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss), this module removes unnecessary CSS that I don't use on each page.  Purge CSS works very well with Tailwind.

Two of the modules above is created by [Alexander Lichter](https://twitter.com/TheAlexLichter). He is one of the core team of Nuxt.js. He often writes articles about Vue.js and Nuxt.js tips on his blog. You can check out his blog here, [blog.Lichter.io](https://blog.lichter.io/).

The next one is [@reallifedigital/nuxt-image-loader-module](https://github.com/reallifedigital/nuxt-image-loader-module). This module will manipulate images by using [Graphicsmagick](http://www.graphicsmagick.org). It will crop and resize the image according to the request.

Accompanying with this module, I use `<picture>` tag combined with `srcset` attribute in `<img>` tag. This kind of thing is called **responsive image**. This code snippet below is used to display the header image on this page:

```html
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
    alt="How I Rebuild My blog Using Nuxt.js and Tailwind CSS"
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

## How I make my blog passed Google Web Speed test?
The good thing when using Nuxt.js is the blog will be faster because of the universal application mode. It combines server-side rendering and single page application.

Server-side rendering means that the HTML and CSS are generated on the server side. After the page is sent to the browser, it will act as a single page application.

The cons of using a single page application only are that the JavaScript bundle might be oversized. Sometimes the SPA is not suitable for a slow network connection.

Usually, when the JavaScript bundle is loading, the loading bar is shown to the user. If the JavaScript bundle is quite big, it will increase several metrics value like time to interactive.

Time to interactive measure how well a blog for the user to interact with for the first time.

Server-side rendering can overcome that problem by sending HTML and CSS first. The user will see the page content immediately.

Besides getting benefit from Nuxt.js, Cloudflare also helps much to get a better score in Google Web Speed test.

## How I get my blog as SEO as possible?
SEO is a mystery. No one knows what Google thinks of our blog. But for this time, Google always encourages to create good content, make the blog as faster as possible, and enhance user accessibility. And let Google does the rest.

Besides doing that, I also try to use good structure data for my blog. I use [JSON-LD](https://json-ld.org/) to help Google knows my blog better. Structured data is a standardized format for providing information about a page and classifying the page content.

## Close Though
I end up choosing Heroku to host this blog But Heroku only accepts subdomain. I should find DNS provider that can map the root domain using CNAME record Heroku provides. I found Cloudflare to do that functionality.

Cloudflare also helps me to optimize this blog very well. It can compress the HTTP response as gzip or brotli. 

Cloudflare caches this blog in their own server. After the user requests this blog for the first time, it won't touch my server directly anymore. 

Besides that, I also use PWA module for Nuxt.js. It helps this blog to be cached on the client side.

By using that caching mechanism, this blog will get a good score in Google Web Speed test. It also helps to boost SEO. In addition, I also use structured data as well.

Woah, this is the first time for me writing a very long article in English and Bahasa Indonesia simultaneously.

And for the reader that has completed read all of the words above. I'm very grateful to you.

The last thing I wanna say is creating a blog using Nuxt.js and all of the technology I mentioned above is a very exciting experience.

I have a plan to write a more detail article about each section on this post. So stay tuned!

If you have any great things I should implement for this blog. Just drop me a line on my twitter account, [@jefrydco](https://twitter.com/jefrydco).