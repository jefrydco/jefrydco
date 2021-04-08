---
title: How Tailwind CSS Helps Reduce Our Workload?
description: Tailwind CSS really helps reduce our workload
summary: Almost of our problem regarding how to speed up a new feature development can be solved by using Tailwind CSS.
img: /cover/2019/12/how-tailwind-css-help-reduce-workload-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2019-12-25T05:05:00.000Z
updatedDate: 2019-12-25T05:05:00.000Z
slug: how-tailwind-css-help-reduce-workload
---

Imagine we are a principal engineer in a well-known technological company in Indonesia, let say company A. All of the engineers in this company 100% from Indonesia.

Another case with its competitor, company B. Almost of the engineers is coming from abroad. Every week, company B can release a new feature that can't be thought exists before.

One day in company A office when townhall took place, "If they can release a new feature each week, we can be defeated by our competitor", company A CEO thought. Then he told to all of his employees that for this year the company focuses defeating company B.

After townhall finished, all divisions try so hard translating CEO eagerness into achievable action items for this year.

As a principal engineer, after hearing company target for this year. He could capture that one of his KPI (Key Performance Indicator) is speeding up feature development.

Then he thought what kind of bottleneck he faces when developing a new feature, suddenly he found several of these:

## Table of Contents

## Use Case Example

A principal engineer who has a daily basis, thinking and creating a tool to speed up feature development realizes these things.

Several days before, he is instructed to add a new notification feature. He thought the notification he would make should be able to be reused by other engineers. Besides that, it should have various kinds of status, like success and error.

First he created the notification like these,

<app-notification></app-notification>

using this code,

```html
<div class="notification">
  <div class="notification__logo-wrapper">
    <img class="notification__logo" src="/img/logo.svg" alt="Logo Pesan Baru">
  </div>
  <div class="notification__content">
    <h4 class="notification__title">Pesan Baru dari Bos</h4>
    <p class="notification__message">Selamat, gaji kamu bulan ini naik!</p>
  </div>
</div>

<style>
  .notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .notification--success,
  .notification--error {
    color: #fff;
  }
  .notification--success {
    background-color: #48BB78;
  }
  .notification--error {
    background-color: #F56565;
  }
  .notification__logo-wrapper {
    flex-shrink: 0;
  }
  .notification__logo {
    height: 3rem;
    width: 3rem;
  }
  .notification__content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .notification__title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .notification__message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

## Long-time Thinking 🤔 

But each time he created an API or feature which can be used by other engineers later, he has to think of the intuitive name. He can spend hours to do it. He thinks that thinking a name is hard, other engineers won't be strong enough, just him who can.

Class naming for the notification feature above is as well. He got confused about which name is better, `notification` which is longer or `notif` which is shorter.

For the content, is it needed to add `notification__content` class or not. For the title, the right class naming is `notification__title` or `notification__heading`. And for the content, `notification__message` or `notification__text`.

For the success and error state, is it needed to add a new class name `notification--success` and `notification--error` or only `--success` and `--error`. But he thinks that if he uses the second option, it is better to make it global modifier so that if it added to any class its state can be changed.

A lot of consideration he has to carefully think. Better case if it uses Tailwind CSS. Tailwind CSS already has many intuitive and easy to use class naming.

Even if we use Visual Studio Code, there is an extension called [Tailwind CSS InteliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) to add autocomplete feature for all class naming available in Tailwind CSS.

Do you know that thinking of name is one of [3 hardest things in computer science](https://twitter.com/codinghorror/status/506010907021828096)? Hah, thinking of a name, what kind of name? Yup, a name, any name which we use in computer science.

<app-img src="/content/2019/12/jeff-atwood-two-hard-things-computer-science-by-jefrydco.jpg" alt="Jeff Atwood Two Hard Things in Computer Science"></app-img>

Anyway, it's likely that [Jeff Atwood](https://twitter.com/codinghorror) wrote the wrong number, it should be "three hard thins" but he wrote "two hard things". 😅 

## Fatty CSS

He really satisfied with his craft, but he thought for a while. If there is a new feature, he has to add a new CSS declaration, sooner or later the size will be bigger.

That case never happens if using Tailwind CSS. All of the predefined classes can be reused.

[Andy Hunt](https://en.wikipedia.org/wiki/Andy_Hunt_(author)) and [Dave Thomas](https://en.wikipedia.org/wiki/Dave_Thomas_(author)) once said in their book, [The Pragmatic Programmer](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer),

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

or we are more familiar with the term **DRY Principle** (Don't Repeat Yourself).

It means that is because all of the predefined classes to make styling is coming from Tailwind CSS, we won't necessary to add new CSS declaration. We only need to reuse it as we want.

## Changes are Scary 😨 

Moreover, if there are CSS declarations which used in many places and turn out they are not in accordance with current circumstances. Want it or not, we have to override it or more extreme re-accordance it with current circumstances.

It will be easy if it's written by ourselves but if others did? Even if it's ourselves who did it, it's often that we can't remember it.

[Joshua Clayton](https://www.quora.com/profile/Joshua-Clayton-4) once answered a similiar question in Quora, [Do some programmers look at the code they wrote and think, "How did I write that"?](https://www.quora.com/Do-some-programmers-look-at-the-code-they-wrote-and-think-How-did-I-write-that#wJBq1yPm1).

> Always write code so the next guy can read it, because often that next guy is yourself.

Moreover, if the feature is big enough, any small changes can break many things. It's so scary, isn't it?

---

After the principal engineer refactor its code using Tailwind CSS, the code above becomes like this,

```html
<div class="max-w-lg mx-auto flex p-6 bg-white rounded-lg shadow-lg mb-10">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="Logo Pesan Baru">
  </div>
  <div class="ml-6 pt-1">
    <h4 class="text-xl text-gray-900 leading-tight mt-0 mb-1">Pesan Baru dari Bos</h4>
    <p class="text-base text-gray-600 leading-normal m-0">Selamat, gaji kamu bulan ini naik!</p>
  </div>
</div>
```

From the example above perhaps, you wonder. If it only adding classes in an element, how's it different by adding inline style like this,

```html
<div style="max-width: 32rem; margin-left: auto; margin-right: auto; display: flex; padding: 1.6rem; background-color: #fff; border-radius: .5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); margin-bottom: 2.5rem">
  <div style="flex-shrink: 0">
    <img style="width: 3rem; height: 3rem" src="/img/logo.svg" alt="Logo Pesan Baru">
  </div>
  <div style="margin-left: 1.6rem; padding-top: .25rem">
    <h4 style="font-size: 1.25rem; color: #1a202c; line-height: 1.25; margin-top: 0; margin-bottom: .25rem">Pesan Baru dari Bos</h4>
    <p style="font-size: 1rem; color: #718096; line-height: 1.5; margin: 0">Selamat, gaji kamu bulan ini naik!</p>
  </div>
</div>
```

Although both of them produce an identical results, there are several benefits using class utility than the inline style.

### Design System

The first pros using class utility than inline style is all classes in Tailwind CSS are carefully thought and made in such a way that when it composed it will produces high quality and consistent style.

In other words, we don't need to think about the design system. Moreover, each class naming is really intuitive and easy to remember.

In another case, if we use inline style, shouldn't we remember all of the possible values that can be used in a design system? Let say `margin` property has several possible values, .25rem, .5rem, .75rem, 1rem, ..., 12rem, 14rem, 16rem. It's quite hard to remember all of the possible values.

In my opinion, it's easier to remember characters than numbers. Our brain will get information faster if it has a strong correlation with each other. The same things happen with characters, we can compose it into words, words can be composed into sentences.

Class naming in Tailwind CSS applies as well, even there are several shorten class naming like `p` and `m`. Our brain will automatically associate them with `padding` and `margin`.

Abbreviation used by Tailwind CSS is commonly used, like `t`, `r`, `b`, and `l` which mean `top`, `right`, `bottom` and `left`. `sm`, `md`, `lg`, and `xl` mean `small`, `medium`, `large` and `extra large`.

Quite intuitive and easy to understand, aren't they?

What if our company already has our design system? All of Tailwind CSS design systems can be changed as we want. The only thing we need to do is changing the theme configuration. We can take a look at Tailwind CSS's [default theme configuration](https://tailwindcss.com/docs/theme) as well.

### Responsive Design

Cool, make sense! Using class utility is a really good idea. Then how to apply responsive design? It can't be, can't it?

Sure it can! Tailwind CSS is equipped with [responsive design utilities](https://tailwindcss.com/docs/responsive-design). So, we can conditionally apply specific class for certain viewport size, in accordance with responsive design rule.

The only thing we need to do is adding a prefix in the corresponding class. Let say in desktop, a paragraph has left alignment. While on mobile, it has justified alignment.

The suitable class declaration for that case is `text-left sm:text-justify`. `sm` prefix means that `text-justify` only applies on a small viewport or if it has less than 640px width size. We can learn more at [responsive design](https://tailwindcss.com/docs/responsive-design) page.

### Pseudo-classes

Now maybe you wonder, how to apply styling for pseudo-class like `:hover` and `:active`?

Unfortunately, Tailwind CSS is enhanced with [pseudo-class variant](https://tailwindcss.com/docs/pseudo-class-variants) as well. For the example, we can point our cursor to 3 kind of notification <a href="#notification">above</a>. They are purely made using class utilities from Tailwind CSS.

If we pay attention carefully, when the cursor hover to the notification, their box-shadow will change. It perhaps can't be seen clearly if the dark mode is activated, so we can turn it off to see it in a action.

To add styling for pseudo-class is quite easy. It's like adding conditional for responsive design, which is adding a prefix to the corresponding class. For notification cases above, the only class needed is `shadow-lg hover:shadow-2xl`. `hover:` prefix means that `shadow-2xl` will activate when the cursor hovers the notification.

## Maintenance is Hard 😫 

What if we want to use class utilities for common things like a button, should we need to remember all of the class?

Tailwind CSS never force us to remember any single class. All of the class can be remembered easily if we often use it. Then to make it easier for common thing, we can create a new class and applying class utilities to it.

Let say we want to create a button like this,

<app-button></app-button>

we can create a new class and use `@apply` to apply predefined class utilities from Tailwind CSS. The results will be as follow,

```html
<button class="btn btn--orange">
  Button
</button>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn--orange {
    @apply bg-yellow-400 text-white;
  }
  .btn--orange:hover {
    @apply bg-orange-600;
  }
</style>
```

By using that way, the only thing we need to remember is the basis class which is `btn` and the modifier class, `btn--orange`.

## Recap

Almost all of the problems faced by the principal engineer regarding how he can speed up new feature development can be solved using Tailwind CSS. It only the tip of the iceberg problem. There are still more things to improve.

We are an Indonesian engineer shouldn't be loose by other engineers who come from abroad. Competition is a commonplace thing but we also have to learn and collaborate more with them to get better results.

If you are one of the principal engineers I describe above, perhaps the first thing you need to do to adopting Tailwind CSS is convincing your boss. 🤭 

And if you are the one who takes the decision, perhaps you can give Tailwind CSS a try and tell me what you think!

Thanks for reading and hope you enjoy! 🙌 
