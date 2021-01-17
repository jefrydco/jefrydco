---
title: Create a Simplified Version of Vue.js Reactivity System - Part 1
description: Reveals the secrets of the reactivity system of Vue.js by recreating a simplified version of it first part
summary: Have you ever wondered how Vue.js create some variables become reactive? Writing in an input form and see the result instantly. What is the secret of that reactivity system? Let's deep dive into it together.
img: /cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2020-01-20T01:00:00.000Z
updatedDate: 2020-01-20T01:00:00.000Z
slug: create-reactivity-system-vuejs-javascript-part-1
id: create-reactivity-system-vuejs-javascript-part-1
extraComponents: ['AppDemo1En', 'AppDemo2En', 'AppDemo3En', 'AppDemo4En', 'AppDemo5En', 'AppDemo6En', 'AppDemo7En', 'AppDemo8En', 'AppDemo9En', 'AppDemo10En']
---

<!-- > Read the second part here, <a :href="$i18n.localePath({ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } })">Create a Simplified Version of Vue.js Reactivity System - Bagian 2</a> -->

Have you ever wondered how Vue.js create some variables become reactive? Writing in an input form and see the result instantly.

What is the secret of that reactivity system? Let's deep dive into it together.

## Table of Contents

## Reactivity

Before we begin discussing about the reactivity system itself, let's think about the reactivity and how it worked for a moment.

A system can be called as reactivity if it reacts to a change. The simplest form we use everyday is Microsoft Excel or Google Spreadsheet.

Let say we have employee age data in some company. Then we want to calculate the average. We can directly insert the formula into anywhere and the average result is calculated automatically.

<app-video src="/videos/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/spreadsheet-average-reactivity-by-jefrydco.webm"></app-video>

If the data change, the average result will be recalculated automatically.

## Vue.js Reactivity System

According to the Vue.js official documentation about [Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html). On the section of [How Changes are Tracked](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked), there is a diagram like the following:

<app-img src="/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/vuejs-reactivity-system-explained.jpg" :caption="{ en: { aviaB: 'Vue.js Reactivity System Diagram' }, id: { aviaB: 'Diagram Sistem Reaktivitas Vue.js' } }" source="Vue.js: Reactivity in Depth" source-link="https://vuejs.org/v2/guide/reactivity.html" alt="Vue.js Reactivity System Diagram by Evan You"></app-img>

To get a better understanding of it, let's take a look at the simplest form of Vue.js application.

```html {2-3,10}
<div id="app">
  <h2>{ text }</h1>
  <input v-model="text" />
</div>

<script>
new Vue({
  el: '#app',
  data: {
    text: 'Hello World!'
  }
})
</script>
```

> Vue.js interpolation syntax on the second line should be written like this `{{ text }}`. But I can't do it, I don't know why the syntax is translated like a real interpolation.

Behind the curtain, Vue.js will change all of the data we declared in the `data` section into a getter and setter.

The getter and setter are in the form of function. When a variable is accessed, the getter will be executed. And if the value is changed, the setter will notify the watcher to run its task related to the variable.

1. In the body of getter, it is declared **a mechanism to save a task as a dependency**.
2. Meanwhile, in the body of setter, it is declared **a mechanism to notify all of the dependency that the value of the variable is changed**. So the task that already saved as a dependency will be executed.

When the snippet above is rendered on the browser, a `text` variable accessed. It accessed twice, the first one inside of `h1` tag and the second one inside the `v-model` attribute on `input` tag.

When Vue.js render the `h1` tag, Vue.js will save **the task of rendering `h1` tag as a dependency**.

It applies as well when Vue.js render the `input` tag, Vue.js will save **the task of rendering `input` tag as a dependency**.

When the user changes the value of `text`, Vue.js will check what kind of tasks it should run when the value of `text` changes.

The first task is rerendering the `h1` tag and the second one is rerendering the `input` tag.

That's why when the user changes the value of `text` via `input` tag, the `text` variable inside of `h1` tag will change automatically as well.

## Our Own Reactivity System

As a case point, we will create a simple calculator. Let say it has 2 input texts, an operator and a result.

### HTML Structure

```html
<pre class="state"></pre>

<input type="number" class="input1" min="0" />
<select class="operator">
  <option value="+">+</option>
  <option value="-">−</option>
  <option value="*">×</option>
  <option value="/">÷</option>
</select>
<input type="number" class="input2" min="0" />

<h2 class="result"></h1>

<script></script>
```

<app-demo-1-en />

First, we declare a `pre` tag which has a class attribute called `state`. It will be used to render the real value of the variable we use.

We also have 2 `input` tag, each of them has a class attribute called `input1` and `input2`. They also have `type` attribute which has `number` value and `min` attribute which has `0` value.

It is intended to make the user can enter any number with the minimum value of `0`.

Between the `input` tag, we declare a `select` tag which has a class attribute called `operator`. Inside of it, we have `option` tag. Each of them represents the mathematical operator.

Besides that, we also declare an `h1` tag which has a class attribute called `result`. This `h1` is useful for displaying the result of the mathematical operation we conduct.

We also declare a `script` tag, inside of it we will all of the JavaScript we need to make our own reactivity system.

### Calculator State

The next thing we need is a variable which can be used to store the value of input, operator and the result.

```javascript
const state = {
  result: 0,
  operator: '+',
  input1: 0,
  input2: 0
}
```

We declare a variable called `state`. It is in the form of object which has several properties. They are `result`, `input1`, `input2` which have a value of `0` and `operator` which have `+` value.

The `operator` property has several possibilities of value. Because of that, it is better if we declare a constant object which stores all of the possibilities.

```javascript
const OPERATOR = {
  PLUS: '+',
  SUBSTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/'
}
```

After that, we can change the value of `operator` property to use the value of constant object we already declared before.

```javascript
const state = {
  result: 0,
  operator: OPERATOR.PLUS,
  input1: 0,
  input2: 0
}
```

The next thing we need to do is declaring a function to run all of our JavaScript. We can call it `main` function.

```js{3}
function main() {
  const stateDisplay = document.querySelector('.state')
  stateDisplay.innerText = JSON.stringify(state, null, 2)
}
```

In the body of `main` function, we get the `pre` tag using `document.querySelector` and store it to a variable called `stateDisplay`. The function accepts a parameter in the form of CSS selector name.

In the previous example, we declared a `pre` tag which has a class attribute called `state`. So that we can get it directly using `.state` selector.

After that we can set the text inside of `pre` tag using `innerText` property.

The text is in accordance with the form of `state` object we already declared previously.

To make it happen, we can use `JSON.stringify` function.

It accepts 3 parameters, the first one is the object we wanna convert into `string`. The second parameter is replacer function, we can pass `null` because in this case, we don't need it.

The last one is the space count. By default, the space count for HTML, CSS and JavaScript-based project is 2 spaces.

To call the `main` function, we need to use it as the second parameter for the following function:

```javascript
document.addEventListener('DOMContentLoaded', main)
```

It aims to call the `main` function when the [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is already loaded.

<app-demo-2-en />

After all, we also need to render the value of `result` property inside of `h1` tag.

```js{4}
function main() {
  // ... Previous code
  const resultDisplay = document.querySelector('.result')
  resultDisplay.innerText = state.result.toString()
}
```

It has the same way as displaying state to `pre` tag. The only difference is the `innerText` property is coming from `result` property inside the `state` object.

Because of the type of the property value is `number`, we have to call `toString` function to change it into `string`.

<app-demo-3-en />

Besides that, we also need to render the value of `input1` and `input2` property to both of the `input` tags.

```js{6-7}
function main() {
  // ... Previous code
  const input1Display = document.querySelector('.input1')
  const input2Display = document.querySelector('.input2')

  input1Display.value = state.input1.toString()
  input2Display.value = state.input2.toString()
}
```

We still use the same way as before to render the value of the state, the difference is the tag property we set.

Before we set the `innerText` property, and then we use the `value` property.

<app-demo-4-en />

After we apply the code above, both of the text input will render `0` because we also set the initial value of `input1` and `input2` property in `state` object to `0`.

Then we need to render the value of `operator` property into `select` tag.

```js{4}
function main() {
  // ... Previous code
  const operatorDisplay = document.querySelector('.operator')
  operatorDisplay.value = state.operator
}
```

After we add the code above the result won't make any difference because by default the `select` tag will render the first option.

<app-demo-5-en />

Before we continue to the next step, let's make a little refactor to our code.

If You take a look at the previous code, I highlight to one or two of the code.

They are useful to render all the value of the `state` property to the browser.

We can extract them to their own function, we can call it `updateDisplay`.

```js{13}
function main() {
  // ... Previous code
  function updateDisplay() {
    stateDisplay.innerText = JSON.stringify(keadaan, null, 2)
    resultDisplay.innerText = state.result.toString()

    input1Display.value = state.input1.toString()
    input2Display.value = state.input2.toString()

    operatorDisplay.value = state.operator
  }

  updateDisplay()
}
```

Like the example above, we make a function called `updateDisplay`. To run the code we need to call it.

### Event Listener

The next thing we need to do is thinking how to make the value of the state updated automatically when the user changes the value of the input and the operator.

To make it worked, we can add an event listener to both of the `input` tag and the `select` tag.

```js{4-5,8-9}
function main() {
  // ... Previous code
  input1Display.addEventListener('input', (event) => {
    const targetInput1 = event.target
    state.input1 = parseInt(targetInput1.value)
  })
  input2Display.addEventListener('input', (event) => {
    const targetInput2 = event.target
    state.input2 = parseInt(targetInput2.value)
  })
}
```

We need to call `addEventListener` method to add an event listener.

It accepts 2 parameters, the first one is the event we want to listen to. In the `input` tag, the event is called `input`. And in the `select` tag, the event is called `change`.

The second parameter is a function which will be called when the event occurred. This function accepts 1 parameter called `event`.

The `event` parameter also has a property called `target`. It points to the same value of the variable we declare to store `input` and the `select` tag.

To get the value of the `input`, we can use `value` property.

The type is `string`, so we need to change it into `number` using `parseInt` function.

After we get the value, we can set the property of `input1` and `input2` to it.

```js{4-8}
function main() {
  // ... Previous code
  operatorDisplay.addEventListener('change', (event) => {
    const targetOperator = event.target
    const selectedOperator = targetOperator
      .selectedOptions[0]
      .value
    state.operator = selectedOperator
  })
}
```

Meanwhile, to get the value from `select` tag, we do it differently. The event we want to listen to is different as well, it called `change`. 

To get the value, it's a little bit complicated. Because it is located in the `selectedOptions` property which contains an array of object.

Each of the objects in the array has `value` property. So we get the value by accessing the first index of the array and then access the `value` property using dot notation.

After we get the value, we can set the `operator` property using it.

<app-demo-6-en />

Adding the event listener is useful for setting `input1`, `input2` and `operator` property value when there is a change in both of the `input` tag and the `select` tag.

> Each of the demo in this page has its own state, the naming format of the variable is `state<sequence>`, for instance, `state1`, `state2` and so on.

We can check it by opening the browser console on this page and type the name of the variable.

<app-video src="/videos/content/2020/02/create-reactivity-system-vuejs-javascript-part-2/add-event-listener-effect-by-jefrydco-en.webm"></app-video>

On the animation above, firstly, we check the initial value of `state6`. The initial value of `input1` and `input2` property are `0` and the initial value of `operator` property is `+`.

We change the value of the `input` and the `select`. After that, we recheck the value of `state6`. Now the value of the `input1` and `input2` property are `1` and `2`. And the value of the `operator` property is `*`.

### Pseudo-reactivity

Before jump into the next section, let's reflect what have we done before. First, we create the HTML structure by using 2 of `input` tag to enter the value.

A `select` tag which has several `option` tag that we can use to render a mathematical operator. And an `h1` tag to render the result of the calculation.

Besides that, there is a `pre` tag that we can use to render the structure of the `state`.

We also have successfully make a change to the property of the `state` when there is a change in both of the `input` tag and the `select` tag.

But in order to check the change, we need to open the browser console. It is better if we can see it instantly in the browser view.

We also don't make any instant calculation when there is a change in both of the `input` tag and the `select`.

Let's solve the instant calculation problem. To overcome it we need a calculation function based on the operator.

```js{5-6,8-9,11-12,14-15}
function main() {
  // ... Previous code
  function calculateResult() {
    switch (state.operator) {
      case OPERATOR.PLUS:
        state.result = state.input1 + state.input2
        break
      case OPERATOR.SUBSTRACT:
        state.result = state.input1 - state.input2
        break
      case OPERATOR.MULTIPLY:
        state.result = state.input1 * state.input2
        break
      case OPERATOR.DIVIDE:
        state.result = state.input1 / state.input2
        break
      default:
        break;
    }
  }
}
```

We call the function `calculateResult`. It is useful to calculate the value of the `input1` and the `input2` in accordance with the state of the `operator`. The result is saved in the `result` property.

```js{5,9,13}
function main() {
  // ... Previous code
  input1Display.addEventListener('input', (event) => {
    // ... Previous code
    calculateResult()
  })
  input2Display.addEventListener('input', (event) => {
    // ... Previous code
    calculateResult()
  })
  operatorDisplay.addEventListener('change', (event) => {
    // ... Previous code
    calculateResult()
  })
  // ... Next code
}
```

We can call the function inside the event listener callback. So that whenever there is a change in both of the input and the operator, it will calculate the result automatically.

<app-demo-7-en />

We can check it by opening the browser console in this page and type the name of the variable for demo 7, which is `state7`.

<app-video src="/videos/content/2020/02/create-reactivity-system-vuejs-javascript-part-2/reactivity-recalculation-automatically-by-jefrydco-en.webm"></app-video>

In the animation above, first, we check the initial value of the `state7`. The initial value of the `input1` and `input2` are `0` and the initial value of the `operator` property is `+`.

We change both of the `input` and the `select` value. The `result` property will automatically change and recalculate in accordance with the currently active operator.

And again, unfortunately, to see the change and the calculation result, we need to open the browser console.

Let's think for a while what can we do to see the change result instantly.

In the previous section we render all the value of the `state` property by setting the `innerText` and the `value` property each of the tag.

We also have refactored it to a function called `updateDisplay`. And then we call it to render the state to the browser view.

Actually we can do call it again to rerender the state of the browser view after the calculation happen.

```js{6,11,16}
function main() {
  // ... Previous code
  input1Display.addEventListener('input', (event) => {
    // ... Previous code
    calculateResult()
    updateDisplay()
  })
  input2Display.addEventListener('input', (event) => {
    // ... Previous code
    calculateResult()
    updateDisplay()
  })
  operatorDisplay.addEventListener('change', (event) => {
    // ... Previous code
    calculateResult()
    updateDisplay()
  })
  // ... Next code
}
```

The only thing we need to do is the same as `calculateResult` function, calling it inside of the event listener. But one thing we should pay attention is the order of the execution.

We have to run the `calculateResult` first then the `updateDisplay`. So that the redisplayed value is in accordance with the result of the calculation.

<app-demo-8-en />

On the demo above we already successfully create our own reactivity system, when there is a change in the input as well as in the operator. The result will recalculate automatically and the change will rerender to the browser view.

But our own reactivity system isn't fully mirroring the Vue.js has.

Even, we can't call it reactivity system. It is because we add event listener so that the change will be recalculated and redisplayed.

But if the variable is changed without interaction via input, for instance via browser console, there won't any recalculation and rerender.

<app-video src="/videos/content/2020/02/create-reactivity-system-vuejs-javascript-part-2/change-via-console-does-not-affect-reactivity-by-jefrydco-en.webm"></app-video>

Another case in Vue.js reactivity system,  we change the value of the variable using many way. Through even listener or through the browser console directly.

It will recalculate and rerender automatically. Because of that, I give this section title pseudo-reactivity.

### Real Reactivity

Now let's try changing our pseudo-reactivity system to real reactivity system.

Because we have target to mimic the Vue.js reactivity system in a simple way, first we need to take care what kind of the components that Vue.js has that make something reactive.

In my opnion to make Vue.js reactivity systme, we need several components:

1. Reactive creator, it useful for changing the data to **reactive getter and reactive setter**.
2. Watcher, it **watch and notify the runner if there is a change**.
3. Runner, it **run the task if it has notified by the watcher**.

### Reactive Creator

Before we discuss the next section, if you are still confuse with the reactive getter and reactive setter, you can always going back to <a href="#vue-js-reactivity-system">Vue.js Reactivity System</a> section above.

Let's get into it. We can change an object to has reactive getter and reactive setter by using `defineProperty` method in `Object` class.

The method accepts 3 parameter, the first one is the object we want to change, the second parameter is the name of the property and the last one is the configuration.

On the last parameter we can put the reactive getter and the reactive setter.

```javascript
const human = {
  name: 'jefrydco'
}
```

For instance, we have an object called `human` like the example above. It has a `name` property and `jefrydco` value.

We want that whenever we access the `name` property, we print info that the property is accessed. And when we change the value, we also print info that the property is changed.

```js{2,8-9,12-13}

let name = human['name']

Object.defineProperty(human, 'name', {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter() {
    console.log('Property is accessed')
    return name
  },
  set: function reactiveSetter(newValue) {
    name = newValue
    console.log('Property is changed')
  }
})
```

First we define the helper variable called `name` and it has the value as the `name` property. We access the `name` property by using index way, `human['name']`.

We call the `defineProperty` method with `human` object as the first parameter, `name` as the second one and the configuration object for the last parameter.

The configuration object consists of `enumerable` property that has `true` value. It means that we **set the `name` property so that it can be iterate using `for...in`** or so that ***we can get the property name using `Object.keys`**.

The second property is `configurable` with the value of `true`. It means that **the `name` property can be reconfigured using `defineProperty`**.

The third property is `get` with the value of function called `reactiveGetter`. Inside of this function we can print the info that the property is accessed. 

One thing we need to pay attention is the function of `reactiveGetter` have to return a value. When we accessing the `name` property, we expect to get the value of it, isn't it? That's why we should return a value inside the `reactiveGetter` function.

The fourth property is `set` with the value of function called `reactiveSetter`. Inside this function, we print the info that the property has changed.

The `reactiveSetter` function automatically **receives 2 parameter**. The first one is **the new value that will be set to the property** and the second one is **the existing value**.

Another thing we need to avoid is, inside the `reactiveGetter` we can't **return the value of `name` property using dot notation** nor inside the `reactiveSetter` function, **we can't set the `name` property value using dot notation** as well.

Because it will make **infinite looping** happen. That's why we need a helper variable to make it happen.

```javascript
human.name
// Property is accessed
// 'jefrydco'

human.name = 'jefry'
// Property is changed
// 'jefry'
```

After defining the code above, when we access the `name` property or change its value, we will get the info in accordance with what we have done.

Let make use of that way to make a reactive property which has a number value, then we do some math operation to it.

```javascript
const state = {
  input1: 0
}
let input1 = state['input1']

Object.defineProperty(state, 'input1', {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter() {
    console.log('Property is accessed')
    return input1
  },
  set: function reactiveSetter(newValue) {
    input1 = newValue
    console.log('Property is changed')
  }
})
```

In the example above we declare an object called `state` which has `input1` property. We also declare a helper variable using `let` keyword called `input1`. The helper variable has the same value as the `input1` property.

Like the one in the previous example, the helper variable will be used to store the `input1` property value.

And if we access the property directly without using helper variable, the `reactiveGetter` and the `reactiveSetter` will be executed infinitely.

```javascript
state.input1 = state.input1 + 7
// Property is accessed
// Property is changed
// 7
```

On the example above we do some math operation between the existing `input1` property value with the number of 7. On the browser console will be rendered info that the property is accessed then the property is changed orderly.

The property is accessed info appears when the `input1` property is accessed on the right section of assignment operator `=`. Meanwhile, the info of property is changed appear when the value of the `input1` property has been added and stored replacing the existing value.

By using that way, actually we can make a better our own reactivity system. Let's refactor the code from <a href="#AppDemo8En">Demo 8</a> above in order to use `defineProperty` as its reactivity system.

```js{9,13-14}
function main() {
  // ... Previous code
  let input1 = state['input1']

  Object.defineProperty(state, 'input1', {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return input1
    },
    set: function reactiveSetter(newValue) {
      input1 = newValue
      calculateResult()
      updateDisplay()
    }
  })
}
```

Pada contoh kode di atas kita memindahkan pemanggilan fungsi `calculateResult` dan `updateDisplay` dari dalam fungsi pendengar peristiwa ke dalam fungsi `reactiveSetter`.

Hal tersebut bertujuan ketika properti `input1` diubah nilainya, akan dilakukan kalkulasi hasil dan pemutakhiran tampilan secara otomatis.

<app-demo-9-en />

But on the example above we make the reactivity system running only on the `input1` property, but what we need is it runs on all of the property.

To solve that problem, we need to use `keys` method that exist in the `Object` class.

```js{3,5,6,8,15-17}
function main() {
  // ... Previous code
  const keyList = Object.keys(state)

  keyList.forEach(key => {
    let value = state[key]

    Object.defineProperty(state, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        return value
      },
      set: function reactiveSetter(newValue) {
        if (value === newValue) {
          return;
        }
        value = newValue
        calculateResult()
        updateDisplay()
      }
    })
  })
}
```

The `keys` method accepts a parameter in the form of an object. It is useful to get all of the property names which has passed as a parameter. Then the result is saved in `keyList` variable.

Because the `keyList` variable is in the form of an array of string, we can iterate it to get each of the property names of `state` object.

After that we can change each of them to has the `reactiveGetter` and the `reactiveSetter` property.

We also need to check inside of the `reactiveSetter` whether the value that will be stored is the same value or not.

It is the same value, so the execution of the `reactiveSetter` function won't be continued. It avoids infinite loop execution.

<app-demo-10-en />

By using that way, all of the property in the `state` object become reactive.

Now we have solve the problem of our reactivity system that only using event listener.

Besides, the value will be recalculated and redisplayed automatically if there is interaction via input. They will be recalculated and redisplayed as well when we change the value through the browser console.

<app-video src="/videos/content/2020/02/create-reactivity-system-vuejs-javascript-part-2/change-via-console-affect-reactivity-by-jefrydco-en.webm"></app-video>

## Recap

We have made our own reactivity system and applied it to make simple calculator. At first we make it using event listener.

But it can be called as reactivity system because the calculation and render process is only happen when there is an interaction from the user.

Then we refactor the code so that it will be recalculated and redisplayed if we change it via the browser console.

It is the same way as Vue.js does. It is using getter and setter. They are all in the form of function.

Each of the property of the state object, we change it to have getter and setter. Inside the body of the setter, we can set what should they do if there is a change.

But again, the system still has disadvantages. It can only do one task on time. In the next part, we will discuss a solution for it.

Thanks for reading and hope you enjoy!

## References

1. [Medium JS Dojo: Understanding Vue Reactivity Step by Step](https://medium.com/js-dojo/understand-vue-reactivity-implementation-step-by-step-599c3d51cd6c)
2. [Vue.js: Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html)

<script>
if (!window.english) {
  window.english = document.querySelector('.blog__translations__link')
  if(english) {
    english.addEventListener('click', function(event) {
      event.preventDefault()
      location.href = event.target.href
    })
  }
}
</script>
