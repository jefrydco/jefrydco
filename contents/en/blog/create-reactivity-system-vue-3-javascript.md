---
title: Create a Simplified Version of Vue 3 Reactivity System
description: Reveals the secret of the reactivity system of Vue 3 by recreating a simplified version.
summary: Vue 3 is already released at the end of last year. In this article, we will look into deeper the reactivity system used in Vue 3 and create a simplified version of it using the same technology.
img: /cover/2021/04/people-walking-on-pedestrian-by-andrew-teoh.jpg
imgCreator: theandrewteoh
postedDate: 2021-04-24T01:00:00.000Z
updatedDate: 2021-04-24T01:00:00.000Z
slug: create-reactivity-system-vue-3-javascript
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vue-3-javascript' } }" label="Create a Simplified Version of Vue 3 Reactivity System"></app-amp-notice>

Vue 3 is already released at the end of last year. It brings tremendous improvements and awesome features. In this article, we will look into deeper the reactivity system used in Vue 3 and create a simplified version of it using the same technology.

Before this article, I also wrote about <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } }">Create a Simplified Version of Vue.js Reactivity System - Part 1</app-locale-path-link> and <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } }">Create a Simplified Version of Vue.js Reactivity System - Part 2</app-locale-path-link>. So please make sure you already read them as well to get better understanding about the basic.

Code snippets on this article are written in TypeScript but they are perfectly valid JavaScript. So if you want to copy, paste and run them on the browser console, it should be fine. The reason they are written in TypeScript is because at some of the code snippet, we can hover on the type declaration as well.

## Table of Contents

## Underlying Technology

Firstly, let's talk about the underlying technology. The reactivity system in Vue 3 relies on several modern JavaScript API, they are [Proxy](#proxy), [Reflect](#reflect), [WeakMap](#weakmap), [Map](#map) and [Set](#set).

### Proxy

If you have an IT background, you might often hear the term Proxy. In general, **proxy acts as an interceptor of 2 things when they are communicating**. It can **alter or just pass the original behaviour**.

Let's there are 2 friends, their home are just within walking distance. Even though they can communicate orally or just shout out to each other, but it will be inconvenient for their neighbour. That's why they have some kind of walkie talkie to facilitate their communication.

The walkie talkie has some features alongside its main feature which is to communicate. It can increase and decrease the volume of speech. It can even pass the voice as if we talk directly.

From that scenario, we can say that walkie talkie is a proxy. Walkie talkie can alter the original behaviour which is to increase, decrease the volume and clear the original voice.

---

So, we already know the idea of proxy. Now let's talk about Proxy in term of JavaScript. It might easier to digest if we learn by example, take a look at the following code:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

We have an object called `person` which has 2 properties, `name` and `age` which has their own value.

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
person.name
// 'jefrydco'
person.age
// 23
```

Then we print each of the property to the console. Both of them print the original value.

#### Proxy Get Handler

What if when we print the `name` property, we also want to print another text, let say "Hello &lt;value&gt;, nice to meet you!". And when we print the `age` property, we print the year when the person was born. How can we do that? Easy peasy, we can use Proxy! So let's write another code.

```typescript{}[]
const proxiedPerson = new Proxy(person, {
  get(target, key) {
    const value = target[key]
    if (key === 'name') {
      console.log(`Hello ${value}, nice to meet you!`)
    } else if (key === 'age') {
      const year = new Date().getFullYear() - value
      console.log(`The person was born in ${year}`)
    }
    return value
  }
})
```

We have declared the `proxiedPerson` object using the `Proxy` constructor. It receives 2 parameters:

- `target`: original object we want to intercept
- `handler`: an object defines how will the interception operation.

From that code, we only define the `get` handler. It will be invoked whenever the property is accessed. The `get` handler receives 3 parameters:

- `target`: original object we want to intercept
- `key`: property name being accessed
- `receiver`: current proxied object (optional)

Inside that `get` handler, we can get the value of the property being accessed by using the array notation `target[key]`. The `get` handler is executed for any property, to alter specific property behaviour, we have to make a condition there.

Now, whenever we access the property from `proxiedPerson`, the behaviour will be altered as I mentioned before:

```typescript{}[] twoslash
declare const proxiedPerson: {
    name: string;
    age: number;
}
/// ---cut---
proxiedPerson.name
// 'Hello jefrydco, nice to meet you!'
// 'jefrydco'
proxiedPerson.age
// 1998
// 23
```

That behaviour only occurs when we access the `proxiedPerson`, not the `person` object itself. So the original object stays the same.

#### Proxy Set Handler

The `get` handler can alter behaviour when the property is accessed, what if we want to alter behaviour when the property is set. Let say whenever each property is set to another value, it will print text "&lt;property-name&gt; has been modified". So, let's take a look at the code:

```typescript{4}[]
const proxiedPerson = new Proxy(person, {
  set(target, key, value, receiver) {
    console.log(`${key} has been modified`)
    target[key] = value
    return value
  }
})
```

To alter behaviour when we set the property value, we can use the `set` handler. It receives 4 parameters:

- `target`: original object we want to intercept
- `key`: property name being set
- `value`: the new value being set
- `receiver`: current proxied object (optional)

Please pay attention to the highlighted line. To use the `set` handler, never forget to set the original property to a new value. If not, the old value won't change to a new value.

Now, whenever we change each property value, it will print a text as well:

```typescript{}[] twoslash
declare const proxiedPerson: {
    name: string;
    age: number;
}
/// ---cut---
proxiedPerson.name = 'jefry'
// name has been modified
// 'jefry'
proxiedPerson.age = 22
// age has been modified
// 22
```

We have an endless possibility for a `set` handler. One of them is we can use it as a type validator. Let say `name` property can only be set to `string` and `age` property to `number`.

```typescript{3-7}[]
const proxiedPerson = new Proxy(person, {
  set(target, key, value, receiver) {
    if (key === 'name' && typeof value !== 'string') {
      throw new Error('name must be a string')
    } else if (key === 'age' && typeof value !== 'number') {
      throw new Error('age must be a number')
    }
    target[key] = value
    return value
  }
})
```

Now whenever we set the property to a different value than the validator we provided, it will throw an error.

```typescript{}[] twoslash
declare const proxiedPerson: Record<string, string | number>
/// ---cut---
proxiedPerson.name = 23
// Uncaught Error: name must be a string
proxiedPerson.age = 'jefrydco'
// Uncaught Error: age must be a number
```

There is still more proxy handler, please read more on [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Reflect

When I first knew this JavaScript API, I was like, "what the heck is this? I never heard of it". After spending some time reading the [Mozilla Developer Network about Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) docs, **Reflect means the ability to take a look and modify the behaviour of object**.

From that definition, we can say that it's a perfectly good combo with [Proxy API](#proxy). We need API to intercept the behaviour and to make things easier, we can use Reflect API to do the heavy-lifting task.

Reflect is not a constructor so it can't be instantiated using the `new` keyword. It only provides several useful static functions to do 'reflecting' thing.

Let's deep dive into the ability of Reflect and get back to our previous example object:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

How do we access the value of `name` and `age` property? Some of us might think about dot notation and array notation:

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
person.name
// 'jefrydco'
person['name']
// 'jefrydco'
```

#### `Reflect.get()`

Both of them work pretty well. We can also do that using `Reflect.get()`:

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
Reflect.get(person, 'name')
// 'jefrydco'
```

The `Reflect.get()` function receives 3 parameters:

- `target`: original object we want to reflect
- `key`: property name we want to access
- `receiver`: an object act as a context in the getter of the original object (optional)

It returns the value of being accessed.

##### `Reflect.set()`

Besides that, we can also change property value using `Reflect.set()`:

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
Reflect.set(person, 'name', 'jefry')
// true
```

The `Reflect.set()` function receives 4 parameters:

- `target`: original object we want to reflect
- `key`: property name we want to change
- `value`: the new value being set
- `receiver`: an object act as a context in the setter of the original object (optional)

It returns `true` if the setting process is successful and `false` otherwise.

If we take a look at glance the parameters of `Reflect.get()` and `Reflect.set()` is same to `get` and `set` function in `Proxy` handler property. Because they really are. **Most of the properties in the `Proxy` handler are the same API/function as in `Reflect`.** That's why we can say that `Proxy` and `Reflect` is the perfect combo.

There is still more static function in `Reflect`, please read more on [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods).

### Map

The `Map` hold key-value pair of data. And if you have been working with JavaScript for a while, you might be noticed that a plain JavaScript object is also a key-value pair. Then why introduce a new `Map` instead of using a plain JavaScript object?

`Map` has several advantages over plain JavaScript object. Let's take a look at the differences:

#### Inherited Properties

##### Plain JavaScript Object

Whenever we create a plain JavaScript object, it also inherited default properties from the `Object` constructor.

```typescript{}[] twoslash
declare const person: {
  name: string,
  age: number
}
/// ---cut---
Reflect.get(person, 'toString')
// ƒ toString() { [native code] }
```

We can use `Reflect.get()` function to get the value. Those properties can lead to undesired behaviour in some cases. Those inherited default properties can accidentally be overwritten by ourselves. `toString` is one of those that perform stringify conversion for our object.

```typescript{}[]
const person = {
  toString: '',
  age: 23
}
person.toString()
// Uncaught TypeError: person.toString is not a function
```

If somehow we declare the same property using the `toString` name, we overwrite that default one. Then if we call that function, it will throw an error.

We also can remove that inherited default properties using the following way:

```typescript{1}[] twoslash
const persons = Object.create(null)

Reflect.set(persons, 'name', 'jefrydco')
Reflect.set(persons, 'age', 23)

Reflect.get(persons, 'toString')
// undefined
```

By using the `Object.create()` function and pass `null` as a parameter, we can remove those inherited properties. When we access it, it returns `undefined`.

##### Map

The object stored in the map only contains what is explicitly put into it. It also provides a convenient method to access and store property using `get` and `set`.

```typescript{}[] twoslash
const person = new Map()

person.set('name', 'jefrydco')
person.set('age', 23)

person.get('name')
// 'jefrydco'
person.get('age')
// 23
```

#### Key Types

##### Plain JavaScript Object

The keys for plain JavaScript Object are limited to a `string` or a `Symbol`.

```typescript{}[] twoslash
const symbolForAge = Symbol.for('age')
const person = {
  name: 'jefrydco', // `string` key
  [symbolForAge]: 23 // `Symbol` key
}
Reflect.get(person, 'name')
// 'jefrydco'
Reflect.get(person, symbolForAge)
// 23
```

The [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) is a new JavaScript primitive data type. In short, it's common to **use `Symbol` for preventing collision since its value is always unique**.

```typescript{}[] twoslash
Symbol() === Symbol()
// false
Symbol.for('age') === Symbol.for('age')
// false
```

##### Map

We can use any data type in JavaScript as a key. Like `Function`, `Object`, `Array`, another `Map`, etc. Or we can just simply use the primitive ones like, `string`, `number`, `float`, etc.

```typescript{}[]
function main() {}
const object = {}
const array = []
const map = new Map()

const person = new Map()

person.set(main, 'Entrypoint for all function invocation')
person.set(object, 0)
person.set(array, {})
person.set(map, new Map())

person.get(main)
// 'Entrypoint for all function invocation'
person.get(object)
// 0
person.get(array)
// {}
person.get(map)
// Map(0) {}
```

We can fill the value with anything as well. In that example, we use `Function`, `Object`, `Array` and `Map` for the key. And for the value, we use `string`, `number` empty `Object` and a `Map`.

#### Size

Size means the number of items in an object or map.

##### Plain JavaScript Object

In a plain JavaScript object, we have to determine manually how much data it contains. Fortunately, modern JavaScript already provided a very good function for it.

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}

const keys = Object.keys(person)
keys
// ['name', 'age']
keys.length
// 2
```

We can use the `Object.keys()` function, it will return an `array` containing all the key in the object except the inherited one. Since it is an `array`, we can easily access the `length` property to determine how many items the object contain.

##### Map

The `Map` provides built-in functionality to determine how much data it contains. The property is `size`.

```typescript{}[] twoslash
const person = new Map()

person.set('name', 'jefrydco')
person.set('age', 23)

person.size
// 2
```

---

There are still quite more differences, if you want to take a look more, please heads over to [Mozilla Developer Network: Map - Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps).

### WeakMap

The `WeakMap` is a similar data type to `Map`. Its function is to store key-value pair of data. But it has some differences:

#### Key Can't be A Primitive Data Type

The key can't be a primitive data type (`string`, `number`, `float`, `boolean`, etc.), it has to be a complex one (`Function`, `Object`, `Array`, another `WeakMap` etc.).

```typescript{}[] twoslash
const object = {}

const person = new WeakMap()
person.set(object, 'An empty object')

person.get(object)
// 'An empty object'
```

If we try to use primitive data type as a key, it will throw an error:

```typescript{}[]
const person = new WeakMap()
person.set('', 'An empty string key')
// Uncaught TypeError: Invalid value used as weak map key
```

You might wonder, why the key has to be a complex data type? Hold on to your smartphone or laptop or anything you use to read this article, we will get into it soon.

##### Items are Not Iterable

The items are not iterable which means we can't loop through them. **To iterate over the values of an iterable object**. Several iterable objects in JavaScript are `Map`, `Set`, `Array`, and `string`.

```typescript{}[]
const person = new WeakMap()
person.set(object, 'An empty object')

for (let property of person) {
  console.log(property)
}
// Uncaught TypeError: person is not iterable
```

For this reason, you might also wonder, why `WeakMap` can't be iterate? Well, still hold on to whatever thing you use to read this article, we will get into it soon.

---

So, why `WeakMap`'s key can't be a primitive data type and the items are not iterable?

Let's take a look at the definition of `WeakMap` from [Mozilla Developer Network: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

> The `WeakMap` object is a collection of key/value pairs in which **the keys are weakly referenced**.

What does it mean that the keys are weakly referenced? To answer that question, let's get over to the example:

```typescript{6}[]
let object = {}
const person = new WeakMap()
person.set(object, 'An empty object')

person
// WeakMap {{...} => 'An empty object'}

object = undefined
// Need to trigger the garbage collection process,
// take a look at the video below how to do that.
person
// WeakMap {}
```

We have an object as a key for a string. When we get that string using the `person.get()` function, it returns the corresponding string. But when we reassign the object to `undefined`, at some point Garbage Collector will remove that object.

<app-garbage-collector-twitter-embed></app-garbage-collector-twitter-embed>

Garbage Collector in JavaScript has a task to remove the object that not use anywhere to free up memory. The process is run automatically, usually when the CPU is idled.

<app-video src="/videos/content/2021/04/create-reactivity-sistem-vue-3-javascript/weakmap-garbage-collection.webm"></app-video>

When we set the object to `undefined`, JavaScript's Garbage Collector will remove that unreferenced object. Fortunately, Chrome has a nice feature to trigger that Garbage Collection process. We have to open the Devtools, then move into the Performance Tab. There will be a button with a trash icon on it, if we hover into it, it shows a label "Collect Garbage".

After we clicked that button, print the `person` object, it will show an empty `WeakMap`. That's why **`WeakMap` is called weakly referenced because when the object is removed, the value is also removed**. Another side effect of weakly referenced is **we can't iterate over the keys nor values**, because we really don't exactly know when will the keys freed up from memory.

### Set

`Set` is **similar to `Array`, but the stored item must be unique**. Let's take a look at how to interact with `Set`:

```typescript{}[] twoslash
const set = new Set()

set.add('First item')
set.add(2)

set
// Set(2) {"First item", 2}
```

We can add anything to `Set`, but we have to pay attention if we deal with an object item. The concept of `Set` is to store a unique item, and sometimes two similar objects with the same property can be inserted into the set.

```typescript{}[] twoslash
const set = new Set()

set.add({ name: 'jefrydco' })
set.add({ name: 'jefrydco' })

set
// Set(2) {{…}, {…}}
```

Even though `{ name: 'jefrydco' }` object looks similar, **they are point to a different address in memory**. That's why `Set` still can insert that data. So how to make sure that our object inserted into the set is unique? We have to assign it to a variable.

```typescript{}[] twoslash
const set = new Set()
const person = { name: 'jefrydco' }

set.add(person)
set.add(person)

set
// Set(1) {{…}}
```

We call the `add()` function twice with the same argument and it only inserts the object once. Because the first `person` variable and the second one are referenced to the same object.

## Terms

Awesome!!! Now we know some JavaScript API that power the Vue 3 reactivity system. Before jump into the reactivity system, we have to know several terms we will commonly use in explaining the reactivity system. So let's get to know it.

### State

**State is a regular object that represents something**. Let's get back to our previous example:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

We can say that the `person` object is a state because it represents a person in real life. It can represent anything not only something in real life. For instance, if we ever play a game, I believe the game itself holds many states. How much progress, money or XP do we have or which level are we in. We can store all those things in a state.

### Reactive State

**Reactive state is just another state that does something if their property's value changed**. Let's get back to our previous example and make it a reactive state using `Proxy`:

```typescript{3}[]
const reactivePerson = new Proxy(person, {
  set(target, key, value) {
    console.log(`Do something here when "${key}" property change`)
    target[key] = value
    return value
  }
})
reactivePerson.name = 'jefry'
// 'Do something here when "name" property change'
// 'jefry'
```

We can say that `reactivePerson` is a reactive state because when we change, let say name property, it will print something to the console. We can do anything as we want actually, not only print something. We can call another function, change another state, render something to the screen, and so many more. The possibility is endless.

### Dependencies

Remember what kind of things we can do inside the `set` handler function above, anything right? **Dependencies is a function that has to be called when the property's value changed**. Let's take a look at the previous example:

```typescript{10-14}[]
function printInfoForName() {
  console.log(`Do something here when "name" property change`)
}
function printInfoForAge() {
  console.log(`Do awesome thing when "age" property change`)
}

const reactivePerson = new Proxy(person, {
  set(target, key, value) {
    if (key === 'name') {
      printInfoForName()
    } else if (key === 'age') {
      printInfoForAge()
    }
    target[key] = value
    return value
  }
})
reactivePerson.name = 'jefry'
// 'Do something here when "name" property change'
// 'jefry'
reactivePerson.age = 22
// 'Do awesome thing when "age" property change'
// 22
```

We declare 2 functions, `printInfoForName` and `printInfoForAge`. We can say that `printInfoForName` is dependency for `name` property. And `printInfoForAge` is dependency for `age`.

### Tracker

**Tracker is a function to store the dependencies**. It's not fun to write all the dependency functions manually. Usually, **dependency functions are written as an anonymous function**. An anonymous function is a function without a name.

```typescript{}[] twoslash
function namedFunction () {
  // Named Function Content
}
const anonymousFunction = () => {
  // Anonymous Function Content
}
```

Why we have to use a tracker instead of calling the dependency function directly? Because the invocation process can be delayed later. We **track the dependency when the property is accessed or referenced**. Then we execute all those dependency functions when the value changes.

We can use `Object`, `Array`, `WeakMap`, `Map`, `Set` to store all those dependency functions. But there should be one which fit our needs. Hold on to any devices you use to read this article, we will get into it later.

### Trigger

**Trigger is a function to execute all the stored dependencies**. To get a better understanding of how Tracker and Trigger works, let jump into the code:

```typescript{11,15}[]
function tracker(target, key) {
  // Store all dependencies
}

function trigger(target, key) {
  // Execute all dependencies
}

const reactivePerson = new Proxy(person, {
  get(target, key) {
    tracker(target, key)
    return target[key]
  },
  set(target, key, value) {
    trigger(target, key)
    target[key] = value
    return value
  }
})
```

`tracker` is placed inside the `get` handler, as we mentioned in the previous explanation that we **track the dependency when the property is accessed or referenced**. And the `get` handler itself is also executed when the property is accessed or referenced.

`trigger` is placed inside the `set` handler, so **whenever the property value change, we will trigger or execute the dependency functions** we already stored previously.

### Effect

There is 2 kind of thing we should understand when we talk about function, they are pure function and impure function.

#### Pure Function

A pure function is a **function that accepts input and returns output without modifying data outside its scoped**.

```typescript{}[]
function sum(number1, number2) {
  return number1 + number2
}

sum(4, 5)
// 9
```

The `sum` function is the example of a pure function because it accepts 2 arguments and returns a value. It also doesn't access nor modifies data outside its scope. We can draw a conclusion, a pure function has 2 characteristics:

- Same input always return the same output
- Doesn't modify data outside its scope

#### Impure Function

An impure function is a **function that modifies data outside its scoped**.

```typescript{}[]
const person = {
  name: 'jefrydco',
  age: 23
}

function changeName(name) {
  person.name = name
}

changeName('jefry')
```

The `changeName` function is an example of an impure function because it changes the `name` property which is outside of its scope.

---

We already understand about pure and impure function, now what is effect then? **Effect is a function that does side effect, side effect is modifying data outside its scoped**. So technically, **effect is impure function**.

### Watch

**Watch is a function that "touch" the property and execute the effect**. Touch means intentionally accessed to store the dependencies.

```typescript{2}[]
function watch(target, key, effect) {
  const value = target[key]
  effect(value)
}
```

On that example above, we "touch" the property by reference it to a variable called `value`.

## Reactivity System

All right!!! Now we have a quite understanding of both technological and term perspective. Let's dive into the reactivity system itself. So what's a reactivity system? To answer that question, take a look at the animation below:

<app-video src="/videos/content/2021/04/create-reactivity-sistem-vue-3-javascript/reactivity-spreadsheet.webm"></app-video>

First, we enter 1 and 2, the result is calculated automatically. If we change to 2 and 2, the result is also calculated automatically. That's called a reactivity system. We can say that **the reactivity system is a system that reacts to change automatically**.

We won't explain too much detail about the reactivity system in Vue. But if you're curious, please read over here, [Create a Simplified Version of Vue.js Reactivity System - Part 1](/en/blog/create-reactivity-system-vuejs-javascript-part-1/#vuejs-reactivity-system) or even in [Vue.js 3: Reactivity in Depth](https://v3.vuejs.org/guide/reactivity.html). So let's just get started to write our simplified reactivity system.

### Create Reactive Function

Let's start from the basic, take a look at the following code:

```typescript{}[]
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```

We create a function called `reactive`. The function returns a `Proxy` instance that has `get` and `set` handler. Inside the getter, we put undeclared function yet called `track` and inside the setter, we put undeclared function yet called `trigger`. It's easy peasy right? Same as what we already talked about in the [prerequisites section](#proxy).

Our current reactive function above only works for linear `Object` structure. It won't work if it nested `Object` nor for `Array`.

```typescript{}[]
// Working
const person = {
  name: 'jefrydco',
  age: 23
}

// Not working
const person = {
  name: {
    firstName: 'jefry',
    lastName: 'dewangga'
  },
  skills: ['web', 'vue']
}
```

Just hold on to whatever device you currently use to read this article, we will make it work for nested `Object` and `Array` later.

### Dependencies Management

We need some kind of structured data to glue everything together. The corresponding parts are:

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/target-key-dependencies.jpg" alt="Target Key Dependencies Diagram"></app-img>

- Target, is the state that we want to convert into a reactive state
- Key, the property of the state
- Dependencies, function that have to be run if the key's value change

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/weakmap-map-set.jpg" alt="WeakMap Map Set Diagram"></app-img>

We can use all the JavaScript API we already learned before. Since the target is in form of `Object`, we can use `WeakMap`. And the value is regular `Map`.

The key of this `Map` is the target's property we want to track then the value is a `Set` that will contain the effect function.

Take a look at the following code below to get a better idea of how they relate to each other.

```typescript{}[]
const person = {
  name: 'jefrydco',
  age: 23
}

const dep = new Set()
dep.add((value) => {
  console.log(`Value change into ${value}`)
})

const depsMap = new Map()
depsMap.set('name', dep)

const targetMap = new WeakMap()
targetMap.set(person, depsMap)
```

We create a new `dep` variable using a `Set` data type, then we add an anonymous function that prints some info about the `value`.

After that, we create a new `depsMap` variable using a `Map` data type, then we set an item using one of the `person` property which is `name` as a key. The value is the `dep` variable we already declared previously.

The last part is, we create a new `targetMap` variable using a `WeakMap` data type, then we set an item using the `person` object as a key. The value is the `depsMap` variable we already declared previously.

### Create Track Function

If you feel overwhelmed with that diagram before and prefer to learn easily through the code. Let's code over it. All of the dependencies management things will be written inside the `track` function.

```typescript{5, 8}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  const dep = new Set()
  dep.add(activeEffect)

  const depsMap = new Map()
  depsMap.set(key, dep)

  targetMap.set(target, depsMap)
}
```

First, we declare a variable called `targetMap` and assign it to the `WeakMap` constructor. We also declare another variable called `activeEffect`, we assign it to `undefined`.

The `targetMap` will be the root data structure of our all dependencies management. The `activeEffect` will be used as a temporary variable to store the current active effect.

That code will run well if the `target` and the `key` are always new. The `dep` and `depsMap` variable will always refer to a new object. It won't work if the `target` and the `key` are using the one that already used. It will always overwrite the existing object. So we won't be able to store as much as we want. Let's refactor it:

```typescript{5-9}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // Next code
}
```

To overcome it, we have to add a condition. We check inside `targetMap` whether already have existing `depsMap` or not. If not then we can initialize it using the new `Map` and add that into `targetMap`.

```typescript{7-11}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // Next Code
}
```

We do the same thing to `depsMap`, we check inside `depsMap` whether already have existing `dep` or not. If not then we can initialize it using the new `Set` and add that into `depsMap`.

```typescript{7-9}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
    dep.add(activeEffect)
  }

  // Next Code
}
```

After that, we have to check whether `dep` has the current `activeEffect` or not. If not then we add that effect. We also need to check whether the current `activeEffect` is `undefined` or not because initially we assign that variable into `undefined`, so there must be a possibility the value will be `undefined`.

```typescript{7}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  targetMap.set(target, depsMap)
}
```

The last thing we should do is insert the `depsMap` to `targetMap` using `target` as a key. The final track function would be:

```typescript{}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
    dep.add(activeEffect)
  }

  targetMap.set(target, depsMap)
}
```

### Create Watch Function

The watch function will "touch" the property and execute the effect right away. So it should be pretty simple, right? Yes, of course.

```typescript{}[]
function watch(target, key, effect) {
  activeEffect = effect
  const value = target[key]
  effect(value)
  activeEffect = undefined
}
```

Watch function will receive 3 parameters, `target`, `key` and `effect`. The `effect` argument is in form of the callback function that will be executed if `key`'s value change.

We can't pass the `target[key]` directly to the `effect` function because it has to be "touch" first before we execute the `effect`.

We also need to set the current `activeEffect` temporary and set it to `undefined` afterwards after the "touch" and `effect` invocation process is completed.

### Nested Reactive

To make nested `Object` reactive, we will use the recursive method. In essence, **recursive is a function that calls itself over and over again until reaching its termination point**. Termination point is when the function stop calls itself. Let's take a look at the simplest form of recursive function:

```typescript{2,4}[]
function printToZero(number) {
  if (number >= 0) {
    console.log(number)
    printToZero(number - 1)
  }
}
printToZero(3)
// 3
// 2
// 1
// 0
```

The first highlighted line is the termination point and the second highlighted line is we call the function itself using the same variable minus one.

So how we apply recursive function to our `reactive` function? Well, the only thing we need to do is check if the value is an object, then we simply return the `reactive` function itself.

```typescript{12-14}[]
function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = target[key]

      track(target, key)

      if (isObject(value)) {
        return reactive(value)
      }

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```

### Create Track Array Function

Let's make it work with `Array`. Tracking change in `Array` is a little bit different from `Object`, so it's better to create a new function to handle it.

But before that, let's take a look at how we usually deal with item changing in `Array`:

```typescript{}[]
const person = []

person.push('jefry')
person.push('dewangga')
person
// ['jefry', 'dewangga']

person.unshift('jefrydco')
person
// ['jefrydco', 'jefry', 'dewangga']

person.pop()
// 'dewangga'
person
// ['jefrydco', 'jefry']

person.shift()
// 'jefrydco'
person
// ['jefry']

person.push('jefrydco')
person.push('dewangga')
person
// ['jefry', 'jefrydco', 'dewangga']
person.splice(1, 1)
// ['jefry', 'dewangga']
```

- `push`, insert an item to the end of the array
- `unshift`, insert an item to the start of the array
- `pop`, remove the item from the end of the array
- `shift`, remove an item from the start of the array
- `splice`, remove n item at a certain index

There are still a lot more of the `Array` function, but we will focus on those 4 functions. But if you curious about them, please check it out on [Mozilla Developer Network: Array - Instance Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods).

The idea is when those functions are executed, we will invocate the [trigger function](#create-trigger-function). Besides that, we have to make sure that the original functionality of those functions are still persisted. So how will we gonna do it?

```typescript{2,6}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      // Do something with arrayMethod
    }
  })
}
```

The `trackArray` function receives 2 arguments, `target` and `key`. We can get the `Array` value by using array notation. After that, we use that value as a "target" for the new `Proxy`.

If `Object` requires us to have both `get` and `set` handler, in `Array`, we only need the `get` handler. Inside that function, we can get which `Array` function operation currently perform by using array notation as well.

```typescript{9-12}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          // Do something if arrayMethod is one of item in the array
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}
```

We have to make sure that `arrayMethod` is a function. Inside of that checking, we also add another checking. This nested checking is for which `Array` function operation we want to intercept the functionality. For this purpose, we only intercept the most common one `push`, `unshift`, `pop`, and `shift`.

We also need to `bind` the `arrayMethod` that doesn't fit with those array method to the `arrayTarget` context.

```typescript{10-15}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          return function () {
            const result = Array.prototype[arrayKey].apply(
              arrayTarget,
              arguments
            )
          }
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}
```

If both of the condition matches, we return a named function. Inside of that named function, we execute the original `Array` operation function using `arrayTarget` context. We do that by calling `apply` from `Array.prototype[arrayKey]`. Each of the array function operations returns a different thing, so we just assign that into a variable called `result`.

Before continue, let's have short explanation on how `Array.prototype[arrayKey]` works. Please have a look at the following example:

```typescript{3,7}[]
const array = []

array.push('jefrydco')
array
// ['jefrydco']

Array.prototype['push'].apply(array, ['jefry'])
array
// ['jefrydco', 'jefry']
```

Both of them can give the same result, but the latter one is usually used when **we don't have access to the argument we want to pass**.

```typescript{}[]
const array = []

function push() {
  const result = Array.prototype['push'].apply(array, arguments)
  console.log(`Array index: ${result}`)
  return result
}

push('jefrydco')
// Array index: 1
// 1
```

**Another use case is when we enhance the original function**, on the example above we want to print the `Array` index whenever we call the `push` function. So we can use the second option to call the original array operation function, and reference the named function `push` argument by using JavaScript special key `arguments`.

```typescript{16}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          return function () {
            const result = Array.prototype[arrayKey].apply(
              arrayTarget,
              arguments
            )

            trigger(target, key, value)

            return result
          }
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}
```

Let's get back to the topic. After we get the array function operation result. We need to call the `trigger` function indicating that there is a change in the array. After that, we return the `result`.

```typescript{12-14}[]
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = target[key]

      track(target, key)

      if (isObject(value)) {
        return reactive(value)
      }

      if (Array.isArray(value)) {
        return trackArray(target, key)
      }

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```

Then the only last thing we need to do is call that function inside our `reactive` function. But we also need to check whether the target value is `Array` or not by using the `Array.isArray()` function.

### Create Trigger Function

The trigger function will be invoked when the property value is changed, so we need to put that inside the `set` handler. We also need to place it inside `trackArray` because we have to enhance the original functionality. Let's take a look at how trigger function will shape:

```typescript{}[]
function trigger(target, key, value) {
  const effects = targetMap.get(target).get(key)

  if (effects) {
    effects.forEach((effect) => {
      effect(value)
    })
  }
}
```

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/weakmap-map-set.jpg" alt="WeakMap Map Set Diagram"></app-img>

Remember that diagram right? Inside the `trigger` function, we need to get the `effect` that stored inside the `Set` data type. And we can do that by calling the `get` function for each `WeakMap` and `Map`.

We need to check whether it exists or not, if yes, we need to iterate that. Fortunately `Set` has provided us with a built-in function to do iteration. Inside that iteration block, we just simply call the `effect` function.

### Complete Reactivity Code

Let's glue all the things together, here's our complete code for the simplified implementation of the Vue 3 reactivity system. We can run the following code through the browser console directly. We can also try it directly in [Simplified Vue 3 Reactivity System Demo](https://replit.com/@jefrydco/Simplified-Vue-3-Reactivity-System-Demo).

```typescript{}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = target[key]

      track(target, key)

      if (isObject(value)) {
        return reactive(value)
      }
      if (Array.isArray(value)) {
        return trackArray(target, key)
      }

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)

      return Reflect.set(target, key, value, receiver)
    }
  })
}

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
    dep.add(activeEffect)
  }

  targetMap.set(target, depsMap)
}

function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          return function () {
            const result = Array.prototype[arrayKey].apply(
              arrayTarget,
              arguments
            )

            trigger(target, key, value)

            return result
          }
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}

function trigger(target, key, value) {
  const effects = targetMap.get(target).get(key)
  
  if(effects) {
    effects.forEach((effect) => {
      effect(value)
    })
  }
}

function watch(target, key, effect) {
  activeEffect = effect
  const value = target[key]
  effect(value)
  activeEffect = undefined
}
```

### Simple Usage

We already have a bunch of code above, so how will we use it? It's simple. The only function we need to pay attention to is `reactive` and `watch`. Let's get back to our long live `person` object.

We can use the same example as in [Proxy Get Handler](#proxy-get-handler), we want to print "Hello &lt;value&gt;, nice to meet you!" if we change the `name` property value.

```typescript{}[] twoslash
declare const person: Record<string, unknown>
declare function reactive(target: Record<string, unknown>): Record<string, unknown>
declare function watch(target: Record<string, unknown>, key: string, effect: (value: string) => void): void
/// ---cut---
const state = reactive(person)
watch(state, 'name', (name) => {
  console.log(`Hello ${name}, nice to meet you!`)
})
// 'Hello jefrydco, nice to meet you!'

state.name = 'jefry'
// 'Hello jefry, nice to meet you!'
// 'jefry'
```

And when we change the `age` property value, print the year when the person was born.

```typescript{}[] twoslash
declare const person: Record<string, unknown>
declare function reactive(target: Record<string, unknown>): Record<string, unknown>
declare function watch(target: Record<string, unknown>, key: string, effect: (value: number) => void): void
/// ---cut---
const state = reactive(person)
watch(state, 'age', (age) => {
  const year = new Date().getFullYear() - age
  console.log(`The person was born in ${year}`)
})
// 'The person was born in 1998'

state.name = 22
// 'The person was born in 1999'
// 22
```

### Complex Usage

From code on [Complete Reactivity Code](#complete-reactivity-code), we can create a more complex application. For instance, we create a "Hello World" app for a common JavaScript framework, which is Todo App.

<app-reactivity-vue-3-complex-demo></app-reactivity-vue-3-complex-demo>

We also can create even more complex application, take a look at the following app, [Anime Search One](https://anime-search-one.vercel.app/). The [reactivity.js](https://github.com/jefrydco/anime-search-one/blob/e84c743af9751c4746ca01b36ed943fd41a53b71/scripts/reactivity.js) source code is based on [Complete Reactivity Code](#complete-reactivity-code) above with some improvements.

### Further More

Last but not least, if you want to deep dive into even more about the reactivity system implementation in Vue 3. The source code is located on Vue 3 repository on the following directory path [/packages/reactivity/src](https://github.com/vuejs/vue-next/tree/master/packages/reactivity#readme).

---

Thank you, hope you enjoy reading it and learn something new! If you have any question, don't hesitate to drop me a tweet in [@jefrydco](https://twitter.com/jefrydco).

## Reference

- [Mozilla Developer Network: Array - Instance Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
- [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods)
- [Mozilla Developer Network: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Mozilla Developer Network: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Mozilla Developer Network: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Vue.js 3: Reactivity in Depth](https://v3.vuejs.org/guide/reactivity.html)
