---
title: Good HTML5 Structure - Part 1
description: A good HTML5 structure can make HTML documents easier to understand both by humans and by search engines.
summary: Hello my friends, this time I started discussing one by one the website optimization series, starting from a good HTML5 structure. Why do we need to pay attention to the HTML5 structure? What's with the HTML5 structure that we usually use? What is the impact of using that good HTML5 structure for our website?
img: /cover/2017/08/struktur-html5-image-by-sai-kiran-anagani.jpg
imgCreator: _imkiran
postedDate: 2017-08-27T11:00:00.000Z
updatedDate: 2017-08-27T11:00:00.000Z
slug: struktur-html5-part-1
id: struktur-html5-part-1
---

> Read the second part here, <nuxt-link to="/en/blog/struktur-html5-part-2">Good HTML5 Structure - Part 2</nuxt-link>

Hello my friends, this time I started discussing one by one website optimization series, starting with a good HTML5 structure. Why do we need to pay attention to the HTML5 structure? What's with the HTML5 structure that we usually use? What is the impact of using a good HTML5 structure for our website?

## What?

Actually the answers to these three questions are interconnected. Previously, let us first define what HTML5 is.

> HTML5 is a marker language used for structuring and presenting content on the World Wide Web.

Now, explain the definition, HTML5 is used for structuring and presenting content. Besides that, one of the goals of HTML5 was made so that WWW was more meaningful and easy to understand, both by humans and search engines. Therefore added several new tags that are more meaningful according to their respective functions.

## Why?

Answering the question why do we need to pay attention to the HTML5 structure? Yes so that it is more meaningful in accordance with the purpose of HTML5. What's with the HTML5 structure that we usually use? Even though we have defined HTML5 on the website that we created, we often neglect not to use tags according to their functions. What is the impact of using a good HTML5 structure for our website? Website we will be easier to understand the structure both by humans and by search engines so that search engine optimization (SEO) also becomes better.

## How is it?

Oh yes the HTML5 structure that I discussed here is a good HTML5 structure according to my understanding of reading some literature about HTML5, huh. If there is something wrong, please be very friends and give suggestions and suggestions. Continue to the discussion, then what is a good HTML5 structure? Let's peel each part of the structure.

```html
<!DOCTYPE html>
```

The tag above is used to define that an HTML document is HTML5.


```html
<html lang="id" prefix="og: http://ogp.me/ns#">
```

The tag above is a tag that will wrap all other HTML tags. Inside the tag there is the attribute `lang="id"` which means that the HTML5 document that we make is in Indonesian. Also there is the `prefix="og: http://ogp.me/ns#"` attribute, this attribute is a namespace declaration from Facebook for open graph usage.

```html
<head>
    <meta charset="utf-8"
```

The meta tag above defines that HTML5 document that we create uses [UTF-8](https://en.wikipedia.org/wiki/UTF-8) character encoding.

```html
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
```

The [X-UA-Compatible](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do) meta tag is used to define documents HTML to display in what version of Internet Explorer. For the X-UA-Compatible meta tag above, the `content="IE=edge"` attribute instructs that the HTML document we create is displayed in the latest version of Internet Explorer.

```html
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
```

The [meta viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport?hl=en) tag is used to control how HTML documents are displayed on mobile devices. For the meta viewport tag above, there are several values for the `content` attribute:

- `width=device-width`, used to display the width of an HTML document following the width of the device's screen.
- `initial-scale=1`, used to set the initial zoom level (zooming), value 1 means that 1 pixel of CSS is equal to 1 pixel viewport.
- `minimum-scale=1`, used to set the minimum zoom level (zooming), value 1 means that the user will not be able to do enlargement (zooming).
- `maximum-scale=1`, used to set the maximum zoom level (zooming), value 1 means that the user will not be able to do enlargement (zooming).

The `minimum-scale=1` and `maximum-scale=1` attribute values can be optional if friends allow users to enlarge (zooming) on site when opened on a mobile browser.

```html
    <link rel="dns-prefetch" href="The DNS you want to prefetch">
```

The [dns-prefetch](https://varvy.com/rel/dns-prefetch.html) link tag is used to contact a domain before it is explicitly used. An example of its use is if we store images, CSS and JavaScript in different domains. Say website we are in the domain of https://jefrydco.id and asset files in the domain https://static.jefrydco.id, so we instruct the browser to contact https://static.jefrydco.id before being used to take the images, CSS and JavaScript. The dns-prefetch link is very useful for reducing [DNS search time](https://varvy.com/performance/dns-lookup-time.html).

```html
     <title>Page Title - Site Name</title>
```

The tag above is used to define the title of an HTML document. Noteworthy is the content inside the tag uses the Page Title structure - Site Name. Such structures are used on large websites such as Wikipedia, Youtube, Stackoverflow and other large websites to optimize search optimization engine (SEO).

If we want to find specific information on a website using Google, we usually use keywords with a pattern like that right? For example, "Bukalapak study table", "the latest compass news corruption", "I want to be loyal Youtube". Although website itself (bukalapak, kompas and youtube) has provided form search, we still use Google to search for information contained on the site.

In general, a person's path when searching for specific information on a website is to search for keywords with a pattern like the one above, then use form search provided by website.

```html
    <style></style>
```

The tag above is used to define style. But in this context, not just style that can be included in the tag, only style is used for important [rendering lines](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/) that can be included. Further information regarding the important rendering line will be discussed in the next post.

```html
    <link rel="stylesheet" href="External CSS URL">
```

The stylesheet link tag is used to define external CSS. Actually the stylesheet link tag is not good enough to optimize CSS delivery. Further will be discussed at the next post.

```html
    <meta name="keywords" content="Current page keyword">
    <meta name="description" content="Current page description">
```

The keyword meta tag is used to define keywords that are related to the content in an HTML5 document. While the meta description is used to give a brief description of the content in an HTML5 document. Oh yeah, keywords meta can be optional because Google from 2009 didn't use it anymore.

But friends can list it because it's likely that other search engines still use the keyword password as a determining factor. While the meta description is still used by Google as a description cut on the search results page. Further discussion of the two tags; [Google does not use the keywords meta tag in web ranking](https://youtu.be/jK7IPbnmvVU) and [How much time should I spend on meta tags, and which ones matter?](https://youtu.be/RBTBEfd7z_Y)

```html
    <meta property="og:type" content="website">
    <meta property="og:sitename" content="Site name">
    <meta property="og:url" content="Pagae URL">
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page Description">
    <meta property="og:image" content="Pictures that represent pages">
    <meta property="og:image:secureurl" content="Pictures that represent pages">
    <meta property="og:image:type" content="Image extension">
    <meta property="og:image:width" content="Image width">
    <meta property="og:image:height" content="High image size">
    <meta property="og:image:alt" content="Image title">
```

Meta open graph tags are used to enrich our website page information when accessed by [Facebook crawler robots](https://developers.facebook.com/docs/sharing/webmasters/crawler). More about the meta open graph will be discussed in another post.

```html
    <meta property="fb:admins" content="Our Facebook ID as admin">
    <meta property="fb:app_id" content="Application ID that is connected to our website">
    <meta property="fb:pages" content="ID Facebook Page">
```

The meta facebook tag is used to define which facebook account is connected with our website, both as admin, fanpage and application.

```html
    <meta name="twitter:card" content="summarylargeimage">
    <meta name="twitter:url" content="Page URL">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page Description">
    <meta name="twitter:image" content="Pictures that represent pages">
    <meta name="twitter:creator" content="Our Twitter ID as admin">
```

Meta twitter tags are used to enrich the information on our website pages when accessed by [Twitter crawler robots](https://dev.twitter.com/cards/getting-started#crawling). More about the meta twitter will be discussed in another post.

```html
    <meta name="theme-color" content="Color Code">
```

The meta [theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) tag is used to beautify the appearance of the Chrome browser mobile so that the toolbar will color according to the value of the `content` attribute when accessing our websiteweb page. Examples like the following picture,

<app-img src="/content/2017/08/theme-color-image-by-jefrydco.jpg" alt="Theme color" />

```html
    <link rel="icon" sizes="192x192" href="Website icon URL">
</head>
```

The tag link icon is used to display high-resolution images as icons on Chrome mobile. The `sizes` attribute has several value options, 192x192, 96x96, 32x32, and 16x16. Friends can list all of these sizes by adding several tag link icons that have different `sizes` attributes. It should be sorted from the tag link icon which has the largest `sizes' attribute value to the smallest first.

So if all the codes above are combined it will be as follows,

```html
<!DOCTYPE html>
<html lang="id" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
    <link rel="dns-prefetch" href="The DNS you want to prefetch">
    <title>Page Title - Site Name</title>
    <style></style>
    <link rel="stylesheet" href="External CSS URL">
    <meta name="keywords" content="Current page keyword">
    <meta name="description" content="Current page description">
    <meta property="og:type" content="website">
    <meta property="og:sitename" content="Site name">
    <meta property="og:url" content="Page URL">
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page Desccription">
    <meta property="og:image" content="Pictures that represent pages">
    <meta property="og:image:secureurl" content="Pictures that represent pages">
    <meta property="og:image:type" content="Image extension">
    <meta property="og:image:width" content="Image width">
    <meta property="og:image:height" content="Image Width">
    <meta property="og:image:alt" content="Image Title">
    <meta property="fb:admins" content="Our Facebook ID as admin">
    <meta property="fb:app_id" content="Application ID that is connected to our website">
    <meta property="fb:pages" content="ID Facebook Page">
    <meta name="twitter:card" content="summarylargeimage">
    <meta name="twitter:url" content="Page URL">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page Description">
    <meta name="twitter:image" content="Pictures that represent pages">
    <meta name="twitter:creator" content="Our Twitter ID as admin">
    <meta name="theme-color" content="Color Code">
    <link rel="icon" sizes="192x192" href="Website URL icon">
</head>
```

Okay, enough discussion of the structure of HTML5 is good, this time only to arrive at the closing tag `</head>`. In the next post, I will discuss this good HTML5 structure further. Hopefully useful and keep the spirit to continue learning.

## References
1. [Facebook for Developers: The Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler)
2. [Google Developers: Configure the Viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport)
3. [Google Developers: Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
4. [Stackoverflow: What does <meta http-equiv=“X-UA-Compatible” content=“IE=edge”> do?](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do)
5. [The Open Graph Protocol](http://ogp.me/)
6. [Twitter Developers: URL Crawling & Caching](https://dev.twitter.com/cards/getting-started#crawling)
7. [Varvy: What is DNS Lookup Time?](https://varvy.com/performance/dns-lookup-time.html)
8. [Varvy: What is rel=dns-prefetch?](https://varvy.com/rel/dns-prefetch.html)
9. [Wikipedia: HTML5](https://en.wikipedia.org/wiki/HTML5)
10. [Wikipedia: UTF-8](https://en.wikipedia.org/wiki/UTF-8)
11. [W3Schools: HTML5 Introduction](https://www.w3schools.com/html/html5intro.asp)
