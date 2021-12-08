---
title: Create a Simplified Version of Vue.js Reactivity System - Part 2
description: Reveals the secrets of the reactivity system of Vue.js by recreating a simplified version of it second part
summary: In the previous part, we have created our own reactivity system. But it still lacks a feature, it can only do one task at a time. Now come to the second part to solve that problem.
img: /blog/cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2020-02-01T01:00:00.000Z
updatedDate: 2020-02-01T01:00:00.000Z
slug: create-reactivity-system-vuejs-javascript-part-2
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } }" label="Create a Simplified Version of Vue.js Reactivity System - Part 2"></app-amp-notice>

> Read the first part here, <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } }">Create a Simplified Version of Vue.js Reactivity System - Part 1</app-locale-path-link>

In the previous part, we have created our own reactivity system. But it still lacks a feature, it can only do one task at a time.

Reactivity system that Vue.js has can do anything in once time. For instance, in the autocompleted search box.

While Vue.js render the search result, it also fetches the data in the background. When the data has arrived, it will redisplay again.

## Table of Contents

## Reactive Creator for Many Tasks

But for now, we won't create an app as complex as it, we will reuse the code from the latest demo in part 1. But we will add another application on it.

We will add a stopwatch. Why stopwatch? Because it constantly re-render the second.

Therefore, we can simulate that our reactivity system can do many tasks at a time.

The first task is to calculate and render the result for the first application and the second task is constantly rerendering the second from the stopwatch.

### HTML Structure

First we need to add HTML structure for the stopwatch.

```html {4,6,8-12,14}
<!-- Previous code -->
<h2 class="result"></h1>

<hr />

<pre class="state-2"></pre>

<div class="button">
  <button class="start">Start</button>
  <button class="stop">Stop</button>
  <button class="reset">Reset</button>
</div>

<h2 class="second"></h2>

<script>
  // Previous JavaScript code
</script>
```

In the code snippet above, we add a divider between the calculator and the stopwatch using `hr` tag.

Besides that, we also add the `pre` tag which will be used to display the real state of the variable.

Then we also add 3 buttons that have name correspond to their function. They are start, stop and reset.

Then we add the `h2` tag which will be used to display the stopwatch.

<app-demo-11-en></app-demo-11-en>

In the demo above, the previous calculator app is still working fine.

### Second State

Then we jump into the JavaScript part. The thing we need to do is declaring the variable we will use to store the second state.

```javascript
function main() {
  // ... Previous code
  const secondState = {
    second: 0
  }
}
```

In the code snippet above we declare an object called `secondState` that has `second` property. As the name suggests this property will store the state of our stopwatch.

After that, we need to get all of the HTML in order to be accessible via JavaScript.

```javascript
function main() {
  // ... Previous code
  const state2Display = document.querySelector('.state-2')
  const startButtonDisplay = document.querySelector('.start')
  const stopButtonDisplay = document.querySelector('.stop')
  const resetButtonDisplay = document.querySelector('.reset')
  const secondDisplay = document.querySelector('.second')
}
```

In the example above, we get all of the HTML and store each of them in a different variable.

### Basic Function

Then the thing we need to do next is creating a function to display the real state of the `secondState` variable and display the value of `second` property.

```javascript
function main() {
  // ... Previous code
  function updateStopwatch() {
    state2Display.innerText = JSON.stringify(secondState, null, 2)
    secondDisplay.innerText = secondState.second.toString()
  }
}
```

In the example above we declare a function called `updateStopwatch`. It is the same way as in the function that we use to render in our previous calculator application.

Then we create several functions that will be executed when the user click 3 of the buttons.

```javascript
function main() {
  // ... Previous code
  let idInterval = 0

  function start() {
    idInterval = setInterval(() => {
      secondState.second = secondState.second + 1
    }, 1000)
  }
}
```

In the code above we declare a variable called `idInterval` with the value of `0`. It will be used to store the id from `setInterval`.

Beside that, we also declare a function called `start`. In the body of the function, we call the `setInterval` function. It will be used to execute a function at a certain time many times.

The `setInterval` function accepts 2 parameters, the first one is the function that will be executed many times. And the second parameter is how long the function will be executed in the form of milliseconds.

Because we create a stopwatch, it makes sense that the function on the first parameter is executed on 1 second each time. Because of that, we need to pass the `1000` on the second parameter.

Inside of the function on the first parameter, we add the existing second with the value of `1`.

```javascript
function main() {
  // ... Previous code
  function stop() {
    clearInterval(idInterval)
  }
}
```

The next thing we need to do is declaring a `stop` function. As the name suggests, it is useful to stop the stopwatch.

To stop the stopwatch, we can call the `clearInterval` function. It accepts a parameter which is the id of the `setInterval` that we already stored previously.

```javascript
function main() {
  // ... Previous code
  function reset() {
    stop()
    secondState.second = 0
  }
}
```

Then we also declare a function called `reset`. Inside the body of it we call the `stop` function then set the value of the `second` property to `0`.

### Event Listener

After all set, the next thing we need to do is add an event listener to each of the buttons.

```javascript
function main() {
  // ... Previous code
  startButtonDisplay.addEventListener('click', () => {
    mulai()
  })
  stopButtonDisplay.addEventListener('click', () => {
    stop()
  })
  resetButtonDisplay.addEventListener('click', () => {
    reset()
  })
}
```

In the code snippet above, we add `click` event listener to each of the buttons. Inside the body of the function on the second parameter, we don't need to pass the `event` parameter because we don't need it.

The only thing we need to do inside the function on the second parameter is to call each of the function we declare previously in accordance with the button function.

The start button calls the `start` function, the stop button calls the `stop` function and the reset button call the `reset` function.

```javascript
function main() {
  // ... Previous code
  updateStopwatch()
}
```

We also need to call the `updateStopwatch` function in order to the state of `secondState` is rendered on the browser view.

<app-demo-12-en></app-demo-12-en>

### Reactive Creator

Before we continue the discussion, let's remember how the reactivity system is working behind the curtain.

```javascript{3,5,6,8,19-20}
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

The code snippet above is the code we use to make our own reactivity system worked.

We change each of the property of the state object so that they have getter and setter using `defineProperty` method which is located on the `Object` class.

Inside the body of `reactiveGetter` we only return the value of the property, then inside the body of `reactiveSetter` we call the `calculateResult` and `updateDisplay` function.

The execution of both of the function will make our application looks reactive. But direct invocation inside the `reactiveSetter` function makes our reactivity system can only do a task at a time.

We can think of **the result calculation and update display is a task**. Because both of them is executed when there is a change in the state.

But now we want to add another application, therefore we need to have another state. We also have declared a function to rerender for it.

Because of that, we can say that there are 2 tasks that our reactivity system needs to do. The first one is to calculate and render the calculator application and the second task is rerendering the stopwatch.

Therefore we need a mechanism to make the code snippet above can be reused as many time.

One thing we might do is make the code snippet above to a function.

But that is not enough, because inside of the `reactiveSetter` we invoke the function directly to calculate and rerender the application calculator

Let's think about it for a moment what we can do to solve the problem. We want to make our code previously reuseable but we can't invoke a function to calculate and rerender inside the `reactiveSetter` function.

.

.

.

How is it? Have found the solution? Let's discuss it together. We have known that we can code to be reusable if it in the form of function.

But the second problem still not solved. Where can we put the function to update the view and recalculate the result?

Because of our inspiration for making the reactivity system is Vue.js, let's take a look again the Vue.js reactivity diagram on the following:

<app-img src="/blog/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/vuejs-reactivity-system-explained.jpg" :caption="{ en: { aviaB: 'Vue.js Reactivity System Diagram' }, id: { aviaB: 'Diagram Sistem Reaktivitas Vue.js' } }" source="Vue.js: Reactivity in Depth" source-link="https://vuejs.org/v2/guide/reactivity.html" alt="Vue.js Reactivity System Diagram by Evan You"></app-img>

Let's think what we have now and what we don't so that our reactivity system is similar to Vue.js has.

We have state or data in the diagram above. WE also have getter and setter.

Therefore we still don't have a watcher. Yes, we need a watcher. **Watcher is useful for storing the task and run it when there is a change happens**.

The term store on the diagram above is collect as dependency and run the task is trigger re-render.

We still use getter and setter function to make it happen. 

In the previous section is already discussed. When a variable is accessed, the getter function will be invoked. It will store the current task as a dependency.

Then when a variable is changing its value, the setter function is invoked and notify the watcher to run the task that already stored before.

1. Inside the getter function, we declare **a mechanism to save the task as a dependency**.
2. Then inside the setter function, we declare **a mechanism to notify all of the dependencies that the value of the variable has changed**. So that the task that already stored before can be run.

Let's change the getter and setter function to match our discussion above and create a watcher to store the task.

Let's create the watcher first.

```javascript{5,8}
function main() {
  // ... Previous code
  class Watcher {
    constructor() {
      this.taskList = []
    }
  }
  Watcher.task = null
}
```

In the code snippet example above we create a class named `Watcher`. Inside of it, we declare a constructor that set the `taskList` variable and its value to an empty array. It will be used to **store all of the task list**.

Besides that, we also set `Watcher` class in order to have `task` property. It will be used to **store current task that needed to store in the task list**.

We put the `task` property on the `Watcher` class itself because once at a time there is only one a task. And we don't have to initialize the class in order to change its value.

We also need a method to store our task in the task list and to run the task.

```javascript{8-12}
function main() {
  // ... Previous code
  class Watcher {
    constructor() {
      this.taskList = []
    }

    saveTask() {
      if(Watcher.task) {
        this.taskList.push(Watcher.task)
      }
    }
  }
  Watcher.task = null
}
```

In the code example above, we declare a method called `saveTask`. Inside of it we check whether `task` property has value or not. If yes, we will save it to the `taskList`.

Then we also need a method to run all of the previously saved tasks.

```javascript{14-18}
function main() {
  // ... Previous code
  class Watcher {
    constructor() {
      this.taskList = []
    }

    saveTask() {
      if(Watcher.task) {
        this.taskList.push(Watcher.task)
      }
    }

    runTask() {
      this.taskList.forEach(task => {
        task()
      })
    }
  }
  Watcher.task = null
}
```

In the example above, we declare a method called `runTask`. Inside of it we do a looping using `forEach` that will run all of the tasks inside the `taskList`.

Then, let's refactor our previously code that makes an object reactive to make use of the newly created class.

```javascript{3,8,14,22}
function main() {
  // ... Previous code
  function observe(object) {
    const keyList = Object.keys(object)

    keyList.forEach(key => {
      let value = object[key]
      const watcher = new Watcher()

      Object.defineProperty(object, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
          watcher.saveTask()
          return value
        },
        set: function reactiveSetter(newValue) {
          if(newValue === value) {
            return
          }
          value = newValue
          watcher.runTask()
        }
      })
    })
  }
  // ... Next code
}
```

We have refactored our code that makes an object reactive by turning it into a function called `observe`. It will accept a parameter in the form of an object.

The first one is we change it into a function that has an object parameter. Then inside the looping, we initialize an object from `Watcher` class and store it into a variable called `watcher`.

Then inside the `reactiveGetter`, before we return the value, we call `saveTask` method.

The last change is we also call `runTask` inside of `reactiveSetter`.

The code above has the same functionality as the previous code which makes an object reactive.

The only difference is in the previous code when there is a change, we execute the task directly in accordance with the property. And when the property is accessed, we only return its value without doing anything.

But now, when the property is accessed, besides returning a value we also store the task in accordance with the property. And when there is a change, we executed the lastly stored function.

After refactoring it, we can call the `observe` function with a `state` and `secondState` parameter.

```javascript
function main() {
  // ... Previous code
  observe(state)
  observe(secondState)
}
```

Therefore all of the property that both of the object have will be reactive.

Perhaps you wonder, from where does the code inside the `observe` knows the connection between the property and the task that should be run when there is a change.

To answer it, we need another function as a halper.

```javascript{4-6}
function main() {
  // ... Previous code
  function runner(task) {
    Watcher.task = task
    task()
    Watcher.task = null
  }
}
```

In the example above, we create another function as a helper. It is called `runner` which accepts a parameter called `task`.

There are 3 things that the function is doing, the first one is saving its parameter to `task` property in `Watcher` class.

Then it called its parameter as a function. And the last thing is set the `task` property in `Watcher` class to `null`.

The `runner` function accepts a parameter called `task`. It will be in the form of **function that will be executed when there is a change in the reactive property**.

The reactive property will **always** be accessed inside the function dependency.

Let's take a look on the `updateDisplay` function below:

```javascript
function main() {
  // ... Previous code
  function updateDisplay() {
    stateDisplay.innerText = JSON.stringify(state, null, 2)
    resultDisplay.innerText = state.hasil.toString()

    input1Display.value = state.input1.toString()
    input2Display.value = state.input2.toString()

    operatorDisplay.value = state.operator
  }
  // ... Next code
}
```

In the body of it, we access the `result`, `input1`, `input2` and `operator` property. Therefore, the `updateDisplay` will be stored as a dependency in the task list.

That's why after we call the `observe` function with `state` and `secondState`, we also need to call the `runner` function with the parameter of `updateDisplay`.

```javascript
function main() {
  // ... Previous code
  runner(updateDisplay)
}
```

And because inside the body of `runner` function, we already called the parameter as a function, all of others execution of the `updateDisplay` function should be removed.

<app-demo-13-en></app-demo-13-en>

In the demo above, we display the real form of `state` object. But when there is a change, the calculation isn't done automatically.

That's because we only call the `runner` function with `updateDisplay` parameter. It should be called with `calculateResult` parameter as well.

```javascript
function main() {
  // ... Previous code
  runner(calculateResult)
}
```

Therefore, besides the real form of `state` is displayed, the recalculation process will be done as well.

<app-demo-14-en></app-demo-14-en>

We have refactored our code that only does a task at a time into code that can do many tasks.

But we still don't check whether our code is really can do it or not.

Because we already have the `secondState` reactive by passing it as a parameter in `observe` function. The last thing we need to do is call the `runner` function with `updateStopwatch` as a parameter.

```javascript
function main() {
  // ... Previous code
  runner(updateStopwatch)
}
```

And again, we need to remove all of other execution of the `updateStopwatch` function.

<app-demo-15-en></app-demo-15-en>

## Recap

In this second part, we have created our own reactivity system that can do many tasks at a time. You can try out using the demo above.

Press the start button and let the second counting while interacting with the calculator.

The real state of the calculator isn't interfered by the real state of the stopwatch and it works otherwise as well.

What we have done to make our own reactivity system to do many tasks at a time is refactoring our previous code into a reusable piece of a function called `observe`.

That's why we need another helper function called `runner`. It will be a gate between the task that should be done when there is a change.

Besides that, we also created a class called `Watcher` which has methods to store and run the task.

Anyway, if You still confuse with the explanation, You can always click the link below of the demo. It will direct you to Github pages that display the source of it.

Eventhough we have our own reactivity system like the Vue.js has. But our system can't be said be the same 100%.

Because we still don't handle array reactivity. In part 1 and part 2 we only **focus on creating our own reactivity system worked on an object**.

Unfortunately, to make our own reactivity system worked in an array. We can't use getter and setter.

We need to think out of how to make it worked. Perhaps You can help and give me a suggestion how to solve it. Then we will discuss it in the next part.

Thanks for reading and hope you enjoy!

## References

- [Medium JS Dojo: Understanding Vue Reactivity Step by Step](https://medium.com/js-dojo/understand-vue-reactivity-implementation-step-by-step-599c3d51cd6c)
- [Vue.js: Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html)

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
