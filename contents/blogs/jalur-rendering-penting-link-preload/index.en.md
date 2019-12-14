---
title: Critical Rendering Path and Preload Link
description: The critical rendering path is important and the preload link makes users see website content much faster.
summary: Hello my friends, this time I will discuss the important rendering path. Maybe my friends are wondering, what is the term, how come it sounds foreign. Patient friends, the question will be answered in the next explanation. In addition to discussing important rendering paths, I also discussed preload links, which are actually related to each other.
img: /cover/2017/09/jalur-rendering-penting-link-preload-image-by-mike-wilson.jpg
imgCreator: mkwlsn
postedDate: 2017-08-30T11:00:00.000Z
updatedDate: 2017-08-30T11:00:00.000Z
slug: jalur-rendering-penting-link-preload
id: jalur-rendering-penting-link-preload
---

Hello my friends, this time I will discuss about the important rendering path. Maybe my friends are wondering, what is the term, how come it sounds foreign. Patient friends, the question will be answered in the next explanation. In addition to discussing the important rendering path, I also discussed preload links, which are actually related to each other.

## Critical Rendering Path
To understand what the critical rendering path is, I quote Ilya Grigorik on the Google Developers page: Web Fundamentals,

> A critical resource is a resource that could block initial rendering of the page. The fewer of these resources, the less work for the browser, the CPU, and other resources.

To define an important rendering path, we must first understand what important resources or critical resources are. An important resource is a resource that can block the beginning of the initial page. These resources can be CSS, JavaScript or external fonts. Usually these important resources are located in the `<head> </head>` tag.

Then what is called an important rendering path is a series of events that must be performed by the browser to display the initial appearance of a website. Examples of these events are getting html, getting assets (CSS, JavaScript, Images, Fonts), parsing data, displaying websites.

Imagine if a website has HTML5 code like the following,

```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="URL CSS eksternal 1">
  <link rel="stylesheet" href="URL CSS eksternal 2">
  <link rel="stylesheet" href="URL CSS eksternal 3">
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

In the `<head></head>` tag there are lots of external resources, not to mention external JavaScript that is located before the closing tag `</ body>`. There are many external resources that must be loaded first so that the user cannot see the initial display directly.

## Initial View
The initial appearance referred to here is the view that the user sees without having to scroll the screen first. This initial display is better known as the term above fold or [above the fold](https://www.optimizely.com/optimization-glossary/above-the-fold/) . Whereas the display below is called under the fold or below the fold. To better understand the term above the fold, friends can see the picture below,

<app-img src="/content/2017/09/above-the-fold-blog-amp-image-by-jefrydco.jpg" alt="Above the fold" />

When opening a website, users should be able to see the initial display directly. The initial display is in accordance with viewport. For example, when a user opens the website using a desktop with a resolution of 1920x1200, the initial display that the user must see directly is 1920x1200.

Whereas if the user opens a website using a 768x1024 resolution cellphone, the initial display that the user must see directly is 768x1024. Actually, it's not as good as 1920x1200 or 768x1024 too, because it's just the same as the browser toolbar.  But, for simplicity, just assume the size matches the screen resolution.

If friends check the pages that have not been optimally optimized using [Google PageSpeed ​​Insight](https://developers.google.com/speed/pagespeed/insights/?hl=en), then the friends will get the results as shown following,

<app-img src="/content/2017/09/unoptimized-google-pagespeed-insight-result-image-by-jefrydco.jpg" alt="Unoptimized Google Page Speed Insight result" />

<app-img src="/content/2017/09/render-blocking-content-image-by-jefrydco.jpg" alt="Render blocking content" />

One warning that can be optimized is to eliminate the loading of JavaScript and CSS which can hinder the rendering of content. In accordance with the problems that I described above, this post will also eliminate these warnings and make Google PageSpeed's scores on friends' websites better.

## Solution
We must make the initial appearance visible to the user directly first, even though the bottom is still not fully loaded. The solution is to use the CSS separation method. CSS used to display the initial display is separated and placed inside the `<style></style>` tag internally. Then the rest of the files are placed and loaded using the preload link.

### CSS Separation
There are several things that must be prepared before the CSS separation is done.

### Combining All External CSS
Make sure friends have combined all external CSS into one. What needs to be considered when combining it into one is the laying sequence. Framework CSS is placed at the top then followed by other CSS that depend on the framework CSS.

For example, for friends' websites using bootstrap and custom CSS made by their own friends, the order when combined is bootstrap first then custom CSS. Why is the sequence of combining CSS so important? Because when CSS is read by the browser if there are the same rules, then what is used by the browser is the last rule.

```css
#selector {
  background-color: blue; // Properti ini akan ditimpa
}
/* CSS lainnya */
#selector {
  background-color: #2196f3; // Properti ini yang digunakan peramban
}
```

### Minify
If the CSS that your friends are using is in an unminify state like the previous example, please minify first. The goal is to make CSS size smaller. Friends can use the following tool to minify,

- [CSS Optimizer](https://css.github.io/csso/csso.html)
- [Code Beauty: CSS Beautify and Minify](https://codebeautify.org/css-beautify-minify)

### Separation
To separate CSS between those used to display the initial view and those that don't, friends can use the following tool, [Critical Path CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/) for the free version and the following tool, [Critical CSS ](https://criticalcss.com/) for the paid version.

Please paste all the CSS that has been merged and minified to the form on the left. Paste is also a page link that the CSS wants to separate. Then please click the Create Critical Path CSS button. After the process is complete, a new form will appear on the right containing CSS that is used to display the initial display. Copy CSS and put it in the tag `<style></style>` internally.

**Before Separation**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="URL CSS eksternal 1">
  <link rel="stylesheet" href="URL CSS eksternal 2">
  <link rel="stylesheet" href="URL CSS eksternal 3">
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

**After Separation**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <style>
    /* Letakkan CSS hasil generate di sini */
  </style>
  <link rel="stylesheet" href="URL CSS eksternal yang telah digabung dan diminify">
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

## Link Preload
After friends managed to separate CSS between the ones used to display the initial display and those that did not and put it in the tag `<style></style>` internally. It won't have much impact if it's not combined with the preload link.

The preload link is used to prioritize loading a resource before the browser finishes parsing the entire HTML5 document. The way it works is when the browser finds the link tag with the attribute `rel ="preload"`, the browser directly loads the resource but is not executed first. After completing processing the document as a whole, it will only process the loaded resource using the `rel =" preload "attribute.

To use this feature, please change the attribute `rel="stylesheet"` in the link tag to `rel="preload" `.

*Before Changed Attributes*
```html
  <link rel="stylesheet" href="URL CSS eksternal yang telah digabung dan diminify">
```

*After Changed Attributes*
```html
  <link rel="preload" href="URL CSS eksternal yang telah digabung dan diminify">
```

But unfortunately the `rel =" preload "attribute feature is not fully supported. Even if supported, only a few browsers and even then the most recent version.

<app-img src="/content/2017/09/can-i-use-rel-preload-image-by-jefrydco.jpg" alt="Can I use rel preload" />

To fix this, we need to use a JavaScript plugin named [loadCSS](https://github.com/filamentgroup/loadCSS) created by [Fillament Group](https://filamentgroup.com/). This plugin serves to load external CSS asynchronously. The purpose of asynchronous here is that external CSS will be loaded not simultaneously with the loading of other external resources.

In this case, the external CSS will be prioritized so that it will be loaded first. In other words, this loadCSS plugin functions like the `rel=" preload"` attribute for browsers that have not supported the feature. To install this plugin, please add new `<script></script>` tags under the preload link tag.

```html
  <link rel="preload" href="URL CSS eksternal yang telah digabung dan diminify">
  <script></script>
```

Then copy and paste the code below into the `<script></script>` tag that you just created,

```javascript
/*! Turn any rel=preload link into rel=stylesheet */
function e(){var e=Array.prototype.slice.call(document.querySelectorAll("link[rel=preload]"),0);e.length>0&&e.forEach(function(e){e.rel="stylesheet"})}
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
!function(e){var t=function(t,r,n){function a(e){return o.body?e():void setTimeout(function(){a(e)})}function i(){c.addEventListener&&c.removeEventListener("load",i),c.media=n||"all"}var s,o=e.document,c=o.createElement("link");if(r)s=r;else{var l=(o.body||o.getElementsByTagName("head")[0]).childNodes;s=l[l.length-1]}var d=o.styleSheets;c.rel="stylesheet",c.href=t,c.media="only x",a(function(){s.parentNode.insertBefore(c,r?s:s.nextSibling)});var u=function(e){for(var t=c.href,r=d.length;r--;)if(d[r].href===t)return e();setTimeout(function(){u(e)})};return c.addEventListener&&c.addEventListener("load",i),c.onloadcssdefined=u,u(i),c};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),
/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
!function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(t){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),r=0;r<t.length;r++){var n=t[r];"preload"===n.rel&&"style"===n.getAttribute("as")&&(e.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!t.support()){t.poly();var r=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){t.poly(),e.clearInterval(r)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(r)})}}}(this),window.addEventListener("load",e,!1)
```

So as a whole it becomes as follows,

```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <style>
    /* Letakkan CSS hasil generate di sini */
  </style>
  <link rel="preload" href="URL CSS eksternal yang telah digabung dan diminify">
  <script>
  /*! Turn any rel=preload link into rel=stylesheet */
function e(){var e=Array.prototype.slice.call(document.querySelectorAll("link[rel=preload]"),0);e.length>0&&e.forEach(function(e){e.rel="stylesheet"})}
  /*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
!function(e){var t=function(t,r,n){function a(e){return o.body?e():void setTimeout(function(){a(e)})}function i(){c.addEventListener&&c.removeEventListener("load",i),c.media=n||"all"}var s,o=e.document,c=o.createElement("link");if(r)s=r;else{var l=(o.body||o.getElementsByTagName("head")[0]).childNodes;s=l[l.length-1]}var d=o.styleSheets;c.rel="stylesheet",c.href=t,c.media="only x",a(function(){s.parentNode.insertBefore(c,r?s:s.nextSibling)});var u=function(e){for(var t=c.href,r=d.length;r--;)if(d[r].href===t)return e();setTimeout(function(){u(e)})};return c.addEventListener&&c.addEventListener("load",i),c.onloadcssdefined=u,u(i),c};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),
  /*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
!function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(t){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),r=0;r<t.length;r++){var n=t[r];"preload"===n.rel&&"style"===n.getAttribute("as")&&(e.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!t.support()){t.poly();var r=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){t.poly(),e.clearInterval(r)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(r)})}}}(this),window.addEventListener("load",e,!1)
  </script>
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

Okay, just talk about the important rendering path and the preload link this time. The code above is still not optimized properly because there are still a number of external JavaScripts. In the next post I will discuss about how to combine some of these external JavaScript more safely. Hopefully useful and keep the spirit to continue learning.

## References
1. [Github Fillament Group: loadCSS](https://github.com/filamentgroup/loadCSS)
2. [Google Developers Web Fundamentals: Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
3. [Google Developers Web Fundamentals: Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path)
4. [Google Developers Web: Prioritizing Your Resources with link rel='preload'](https://developers.google.com/web/updates/2016/03/link-rel-preload)
5. [Medium: Understanding the critical rendering path, rendering pages in 1 second](https://medium.com/@luisvieiragmr/understanding-the-critical-rendering-path-rendering-pages-in-1-second-735c6e45b47a)
6. [Mozilla Developers Network: Preloading content with rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloadingcontent)
7. [Optimizely: Above the Fold](https://www.optimizely.com/optimization-glossary/above-the-fold/)
8. [Varvy: Critical rendering path](https://varvy.com/pagespeed/critical-render-path.html)
