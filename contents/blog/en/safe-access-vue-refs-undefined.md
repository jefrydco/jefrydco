---
title: How to Safely Access Vue Refs without Getting Undefined?
description: We have to use $refs at the right time and the right place. Even if we already did, sometimes the value is still undefined.
summary: $refs is one of the tricky features to use in Vue.js. To use it, we have to do it at the right time and the right place. Even if we already did, sometimes the value is still undefined.
img: /blog/cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2021-01-25T00:00:00.000Z
updatedDate: 2021-01-25T00:00:00.000Z
slug: safe-access-vue-refs-undefined
---

> Note: This article assumes that you already understand the basic of Vue Component. If not, please do read the [Vue component documentation](https://vuejs.org/v2/guide/components.html) first.

The `ref` attribute is our last shot to manipulate DOM if any other way can't be used. Some of explanations of `ref` attribute are also listed under [Handling Edge Cases](https://vuejs.org/v2/guide/components-edge-cases.html) section on Vue documentation. And it also stated that we have to avoid manipulating DOM elements directly as best as we can.

So, please check thoroughly if you want to use `ref` feature in Vue. It doesn't mean we can't use that feature. It is just as a reminder that we have to make sure it will be worked as our expected.

## Preface

We have a Vue component as follow:

```vue{}[AppNav.vue]
<template>
  <nav>
    <input ref="input">
    <p>{{ value }}</p>
  </nav>
</template>
```

It has an input which `ref` attribute is set and a paragraph containing data binding.

Let say we want to make the input focused programmatically. We can do that by calling `$refs.input.focus()`.

The problem is, sometimes we **can't get the access to the corresponding input refs** we want. Because `ref` itself is **created as a result of the render function**. More about this explanation, you can learn more on [Ref API - Vue.js](https://vuejs.org/v2/api/#ref).

Before jump into the next section, let's refresh our understanding about the `ref` and `$refs` a little bit. 

`ref` is an HTML attribute or component props. Its value will be the name of the reference. On the other hands, `$refs` is an instance property. We can access the reference name we already declared using `ref` from this property.

Using the example above, we give `input` as `ref` attribute value. So we can access it using this way, `$refs.input`.

## Table of Contents

## Careful Way

We have to know where and when we access that property. Here some examples of accessing `$refs` from different places:

### Created

```vue{9-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  created() {
    console.log(this.$refs.input)
    // undefined
    console.log(this.$refs)
    // {input: HTMLInputElement}
  }
}
</script>
```

Accessing `$refs.input` directly on `created` is undefined. As I described earlier above, the `ref` is created as a result of the render function. And `created` **is called before render function**.

But, a weird thing happens if we only print `$refs`. The console output will show the input property. Why does that happen? [Dion DiFelice](https://stackoverflow.com/users/2337996/dion-difelice) gave a concise explanation on StackOverflow thread, [Vue.js refs are undefined, even though this.$refs show they're there](https://stackoverflow.com/a/58203295):

> ... is that `self.refs` is **passed by reference**. So, by the time you viewed the console, the rest of the data finished loading in a matter of milliseconds. And `self.$refs.mapRef` is **not passed by reference**, so it remains `undefined`, as it was during runtime.

That explanation also applies if we access `$refs` on another Vue.js lifecycle except `mounted` and `beforeDestroy`.

### Computed

```vue{4-6}[AppNav.vue]
<script>
export default {
  computed: {
    value() {
      return this.$refs.input.value
    }
  }
}
</script>
```

Accessing `$refs.input.value` directly in computed property will yield the following error on the console:

```javascript
// TypeError: Cannot read property 'value' of undefined
```

It is because the `input` property itself is undefined, so we can't get access to the `value` property.

Besides that, this error also raises:

```javascript
// [Vue warn]: Error in render: "TypeError: Cannot read property 'value' of undefined"
```

That is because of the previous error happens during component rendering. So the computed `value` will be undefined as well.

### Watch

```vue{9-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  watch: {
    // Do nothing
    '$refs.input.value': function (currentValue) {
      this.value = currentValue
    }
  }
}
</script>
```

Watching change on input value won't do anything, because `$refs` are not reactive. On the subsection of Handling Edge Cases, [Accessing Child Component Instances & Child Elements](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements), it states that:

> `$refs` are only populated after component has been rendered, and **they are not reactive**.

```vue{9-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  watch: {
    // Do nothing
    '$refs.input': function (currentInput) {
      this.value = currentInput.value
    }
  }
}
</script>
```

That will be the same if we only watch the input because the `$refs` property itself is not reactive.

### Methods

```vue{9-11}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    makeFocus() {
      this.$refs.input.focus()
    }
  }
}
</script>
```

Accessing `$refs` in `methods` is a little bit tricky. Because it also **depends on when and where we call that method**. So make sure to not call the method where `$refs` is undefined.

### Mounted

```vue{9-10,11-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    console.log(this.$refs.input)
    // <input></input>
    console.log(this.$refs)
    // {input: HTMLInputElement}
  }
}
</script>
```

Probably the safest place to access `$refs` is on `mounted`. Accessing `$refs.input` and `$refs` will yield value.

But if we want to add `ref` attribute to a component, we have to confirm that our component **isn't loaded as a asynchronous component**. Even though we access `$refs` on `mounted`, it will return undefined.

```vue{2,8,11-14}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    console.log(this.$refs.nav)
    // undefined
    console.log(this.$refs)
    // {}
  }
}
</script>
```

### $nextTick

```vue{2,8,11-16}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.nav)
      // undefined
      console.log(this.$refs)
      // {}
    })
  }
}
</script>
```

We usually use `$nextTick` to overcome getting undefined value problem. But for this case, even though we use multiple levels of `$nextTick`. It still won't solve the problem. Learn more about `$nextTick` on [Async Update Queue - Vue.js](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue).

### setTimeout

```vue{2,8,11-16}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.nav)
      // undefined
      console.log(this.$refs)
      // {}
    }, 1000)
  }
}
</script>
```

Using `setTimeout` will delay the execution of the callback function for a certain amount of time. **It can work as expected if we know how much delay we can have**. And the delay itself depends on the user connectivity as well. The slower internet, the longer the delay will be.

---

Let say we can't rely on all the previous method we have. So what can we do if we need to access `$refs` safely?

## Safe Way

Before we continue, let me tell the story of how I found the solution.

A couple days ago, I discovered that the interactive demo on "Create a Simplified Version of Vue.js Reactivity System", both on <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } }">Part 1</app-locale-path-link> and <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } }">Part 2</app-locale-path-link> weren't worked on a production build. I was suspicious, it was caused by `<script></script>` tag that can't be executed inside `<template></template>` on production.

I seek another method to inject and run JavaScript after the browser finish loads the chunk.

I decided to use `$refs`. But the problem was the component is loaded asynchronously. So I have to use, either `$nextTick` or `setTimeout` to delay the injection script. Unfortunately, none of them works as I expected.

Then I recalled, I've used an NPM Package called [wait-for-expect](https://github.com/TheBrainFamily/wait-for-expect). The package is useful for waiting Jest expectation if we run asynchronous code until the result is expected.

The idea behind the package is, it **runs the callback function containing the expectation code continuously** for a certain period. It will **stop when the callback function is resolved** or not throws any error.

Perhaps I use that mechanism to get `$refs` value without getting undefined.

```vue{2,8,11-19}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.$refs.nav) {
        console.log(this.$refs.nav)
        // VueComponent{}
        console.log(this.$refs)
        // {nav: VueComponent}
        clearInterval(interval)
      }
    }, 50)
  }
}
```

Starting from the safest place to get `$refs` value, we create a variable called `interval` and assigned it to `setInterval` calls. It will run the callback function every 50ms.

We can adjust that 50ms time according to our needs, but here I just follow what `wait-for-expect` did.

Inside the callback function, we do checking if `$refs.nav` exists, we do something with it, print it to the console output for instance. Then, we call `clearInterval` function and pass `interval` variable to clear up the memory and stop the callback function invocation.

By doing that, we don't have to know how long the delay until `$refs.nav` is available. As long as the interval is running, it will execute the callback and do if checking for that.

If you want to know the implementation in the interactive demo, please take a look at [AppDemo10En.vue](https://github.com/jefrydco/jefrydco/blob/e37cf5c48417e57d7489f30ba407eddc713962ec/components/global/contents/blogs/create-reactivity-system-vuejs-javascript-part-1/AppDemo10En.vue#L29-L35).

## Conclusion

`$refs` is one of the tricky features to use in Vue.js. To use it we have to do it at the right time and the right place. Even if we already did, sometimes the value is still undefined.

The safest place to use `$refs` is on `mounted`. Other than that, it is prone to be undefined. So, we have to be careful before using it.

To solve that problem, we can make use of `setInterval`. We put that in the safest place to access `$refs`, which is in `mounted`. Inside the callback function we do checking if `$refs` is already available, then we can do anything with it and the most important thing is stop the timer using `clearInterval`.

> Disclaimer: This method is tested according to my needs. I can't ensure that it also works for other use cases. Please do check thoroughly when implementing. Hit me up on Twitter [@jefrydco](https://twitter.com/jefrydco), if you face any obstacle.

## Reference

- [StackOverflow: Vue.js refs are undefined, even though this.$refs show they're there](https://stackoverflow.com/a/58203295)
- [Vue.js: Handling Edge Cases](https://vuejs.org/v2/guide/components-edge-cases.html)
- [Vue.js: Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html)
- [Vue.js: Ref](https://vuejs.org/v2/api/#ref)
