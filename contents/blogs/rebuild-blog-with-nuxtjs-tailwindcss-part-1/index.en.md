---
title: Rebuild My Blog with Nuxt.js and Tailwind CSS - Part 1
description: Rebuilding my blog with Nuxt.js and Tailwind CSS makes the development process faster.
summary: I've been blogging since I was junior high school, but until now there is no single blog I made survive. The main reason is I get bored. The writing experience also is not so good. I just write a couple of articles and start to confuse what kind of article I should write next.
img: /cover/2019/04/rebuild-blog-with-nuxtjs-tailwindcss-image-by-markus-spiske.jpg
imgCreator: markusspiske
postedDate: 2019-04-17T07:15:21.689Z
updatedDate: 2019-04-24T11:12:51.265Z
slug: rebuild-blog-with-nuxtjs-tailwindcss-part-1
id: rebuild-blog-with-nuxtjs-tailwindcss-part-1
---

> Read the second part here, <nuxt-link to="/en/blog/rebuild-blog-with-nuxtjs-tailwindcss-part-2">Rebuild My Blog with Nuxt.js and Tailwind CSS - Part 2</nuxt-link>

I've been blogging since I was junior high school, but until now there is no single blog I made survive. The main reason is I get bored. The writing experience also is not so good. I just write a couple of articles and start to confuse what kind of article I should write next.

Although each time I start blogging, I always spend my time a lot in building the blog itself not in creating the content.

I always start building blog with questions like; what JS and CSS framework/library I will use, how I style my site to get the best reading experience, where should I host my site, how I config my site to get up and running well, how I optimize my site to be as fast as possible.

How I make my site passed [Google Web Speed](https://web.dev/measure) test, how I get my site as SEO as possible. It's a lot of question in my mind to just start blogging.

I see my friends in college start writing an article in [Medium](https://medium.com). I want to do that as well. And that cycle above is starting over again now on.

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

## Close Though
In this part, I have answered 3 out of 8 questions about the cycle of rebuilding my blog.

I use Nuxt.js as the main tool, the main reason is its server-side rendering feature. It really helped to make my blog more lightweight and SEO friendly.

For the interface, I use Tailwind CSS. Tailwind CSS do help me to make any kind of component for Vue.js faster.

Regarding the style of this blog, it heavily influenced by Medium. With only focusing on the content and give the user options to choose a dark or light theme, I want to make my reader stay longer here.

I think it's enough for part 1. In the next part, I'll discuss these questions; where should I host my site, how I config my site to get up and running well, how I optimize my site to be as fast as possible, how I make my site passed Google Web Speed test, how I get my site as SEO as possible, and which code highlighter I will use, prism.js or highlight.js.