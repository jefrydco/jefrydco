---
title: Create a Simplified Version of Vue 3 Reactivity System
description: 
summary: 
img: /cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2021-04-24T01:00:00.000Z
updatedDate: 2021-04-24T01:00:00.000Z
slug: create-reactivity-system-vue-3-javascript
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vue-3-javascript' } }" label="Create a Simplified Version of Vue 3 Reactivity System"></app-amp-notice>

## Table of Contents

## Underlying Technology

Now let's talk about the underlying technology. Reactivity system in Vue 3 relies on several modern JavaScript API, they are Proxy, Reflect, WeakMap, Map and Set.

### Proxy

If you have IT background, you might often heard term Proxy. In general, **proxy acts as interceptor of 2 things when both of them communicate**. It can **alter or just pass the original behaviour**.

Imagine there are 2 friends, their home is just in walking distance. Even though they can communicate orally or just shout out each other, but it will be inconvinient for their neighboor. That's why they have some kind of walkie talkie to fasilitate their communication.

The walkie talkie has some features alongside its main feature which is to communicate. It can increase and decrease the volume of speech. It can even pass the voice as if we talk directly.

From that scenario we can say that walkie talkie is a proxy. Walkie talkie can alter the original behaviour which are increase, decrease the volume and clear the original voice.

---

So, we already know the idea of proxy. Now let's talk about Proxy in term of JavaScript. It might easier to digest if we learn by example, take a look the following code:

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
      console.log(year)
    }
    return value
  }
})
```

We have declared the `proxiedPerson` object using `Proxy` constructor. It receives 2 parameters:

- `target`: original object we want to intercept
- `handler`: an object defines how will the interception operation.

From that code we only define `get` handler. It will be invoked when every property is accessed. The `get` handler receives 3 parameters:

- `target`: original object we want to intercept
- `key`: property name being accessed
- `receiver`: current proxied object (optional)

Inside that `get` handler, we can get the value of property being accessed by using array notation `target[key]`. The `get` handler is executed for any property, so to alter specific property behaviour, we have to make a condition there.

Now, whenever we access property from `proxiedPerson`, the behaviour will be altered as I mentioned before:

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

That behaviour only occur when we access the `proxiedPerson` not `person` object itself. So the original object stay the same.

#### Proxy Set Handler

The `get` handler can alter behaviour when property being accessed, what if we want to alter behaviour when property being set. Let say whenever each of property is set to another value, it will print text "&lt;property-name&gt; has been modified". So, let's take a look at the code

```typescript{4}[]
const proxiedPerson = new Proxy(person, {
  set(target, key, value, receiver) {
    console.log(`${key} has been modified`)
    target[key] = value
    return value
  }
})
```

To alter behaviour when we set property value, we can use `set` handler. It receives 4 parameters:

- `target`: original object we want to intercept
- `key`: property name being set
- `value`: new value being set
- `receiver`: current proxied object (optional)

Please pay attention to the highlighted line. To use `set` handler, never forget to set the original property to new value. If not, the old value won't never change to new value.

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

We have endless possibility for `set` handler. One of them is we can use it as type validator. Let say `name` property can only be set to `string` and `age` property to `number`.

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

Now whenever we set property to different value than the validator we provided, it will throw an error.

```typescript{}[] twoslash
declare const proxiedPerson: Record<string, string | number>
/// ---cut---
proxiedPerson.name = 23
// Uncaught Error: name must be a string
proxiedPerson.age = 'jefrydco'
// Uncaught Error: age must be a number
```

There are still more proxy handler, please read more on [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Reflect

When I first knew this JavaScript API, I was like, "what the heck is this? I never heard of that". After spending sometimes reading the Mozilla Developer Network docs, **Reflect means the ability to take a look or modify the behaviour of object**.

From that definition we can say that it's perfectly good combo with [Proxy API](#proxy). We need API to intercept the behaviour and to make things easier, we can use Reflect API to do the heavy-lifting task.

Reflect is not a constructor so it can't be instantiate using `new` keyword. It only provides several useful static functions to do 'reflecting' thing.

Let's deep dive about the ability of Reflect and get back to our previous example object:

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

The `Reflect.get()` function recieves 3 parameters:

- `target`: original object we want to reflect
- `key`: property name we want to access
- `receiver`: an object act as context in getter of original object (optional)

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
- `value`: new value being set
- `receiver`: an object act as context in setter of original object (optional)

It returns `true` if the setting process is successfull and `false` otherwise.

If we take a look at glance the parameters of `Reflect.get()` and `Reflect.set()` is same to `get` and `set` function in `Proxy` handler property. Becase they really are. **Most of properties in `Proxy` handler are the same API/function as in `Reflect`.** That's why we can say that `Proxy` and `Reflect` is the perfect combo.

There are still more static function in `Reflect`, please read more on [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods).

### Map

The `Map` hold key value pair of data. And if you have been working with JavaScript for a while, you might noticed that plain JavaScript object is also a key value pair. Then why introduce new `Map` instead of using plain JavaScript object?

`Map` has several advantages over plain JavaScript object. Let's take a look at the differences:

#### Inherited Properties

##### Plain JavaScript Object

Whenever we create a plain JavaScript object, it also inherited default properties from `Object` constructor.

```typescript{}[] twoslash
declare const person: {
  name: string,
  age: number
}
/// ---cut---
Reflect.get(person, 'toString')
// ƒ toString() { [native code] }
```

We can use `Reflect.get()` function to get the value. Those properties can lead to undesire behaviour on some cases. Those inherited default properties can accidentally be overwritten by ourself. `toString` is one of those that perform stringify conversion for our object.

```typescript{}[]
const person = {
  toString: '',
  age: 23
}
person.toString()
// Uncaught TypeError: person.toString is not a function
```

If somehow we declare same property using `toString` name, we overwrite that default one. Then if we call that function, it will throw an error.

We also be able to remove that inherited default propertise using the following way:

```typescript{1}[] twoslash
const persons = Object.create(null)

Reflect.set(persons, 'name', 'jefrydco')
Reflect.set(persons, 'age', 23)

Reflect.get(persons, 'toString')
// undefined
```

By using `Object.create()` function and pass `null` as a parameter, we can remove those inherited properties. When we access it, it returns `undefined`.

##### Map

Object stored in map only contains what is explicitly put into it. It also provides convenient method to access and store property using `get` and `set`.

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

The [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) is new JavaScript primitive data type. In short it's common to **use `Symbol` for preventing collision since its value is always unique**.

```typescript{}[] twoslash
Symbol() === Symbol()
// false
Symbol.for('age') === Symbol.for('age')
// false
```

##### Map

We can use any data type in JavaScript as a key. Like `Function`, `Object`, `Array`, another `Map`, etc. Or we can just simply use the primitive one like, `string`, `number`, `float`, etc.

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

We can fill the value with anything as well. On that example, we use `Function`, `Object`, `Array` and `Map` for the key. And for the value we use `string`, `number` empty `Object` and a `Map`.

#### Size

Size means the number of items in an object or map.

##### Plain JavaScript Object

In plain JavaScript object, we have to determine manually how much data it contains. Fortunately, modern JavaScript already provided a very good function for it.

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

We can use `Object.keys()` function, it will return an `array` containing all the key in the object except the inherited one. Since it is an `array`, we can easily access the `length` property to determine how much items the object contain.

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

There are still a quite more of the differences, if you want to take a look more, please heads over to [Mozilla Developer Network: Map - Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps).

### WeakMap

The `WeakMap` is the similar data type with `Map`. It's function is to store key value pair of data. But it has some differences:

#### Key Can't be A Primitive Data Type

The key can't be a primitive data type (`string`, `number`, `float`, `boolean`, etc.), it has to be a complex one (`Function`, `Object`, `Array`, another `WeakMap` etc.).

```typescript{}[] twoslash
const object = {}

const person = new WeakMap()
person.set(object, 'An empty object')

person.get(object)
// 'An empty object'
```

If we try to use primitive data type as a key, it will throw error:

```typescript{}[]
const person = new WeakMap()
person.set('', 'An empty string key')
// Uncaught TypeError: Invalid value used as weak map key
```

You might wonder, why the key has to be a complex data type? Hold on to your smartphone or laptop or anything you use to read this article, we will get into it soon.

##### Items are Not Iterable

The items are not iterable. Which means, we can't loop through them. **To iterate over the values of an iterable object**. Several iterable object in JavaScript are `Map`, `Set`, `Array`, and `string`.

```typescript{}[]
const person = new WeakMap()
person.set(object, 'An empty object')

for (let property of person) {
  console.log(property)
}
// Uncaught TypeError: person is not iterable
```

For this reason you might also wonder, why `WeakMap` can't be iterate? Well, still hold on to whatever thing you use to read this article, we will get into it soon.

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

We have an object as a key for a string. When we get that string using `person.get()` function, it returns the corresponding string. But when we reassign the object to `undefined`, at some point Garbage Collector will remove that object.

<app-garbage-collector-twitter-embed></app-garbage-collector-twitter-embed>

Garbage Collector in JavaScript has a task to remove object that not use anywhere to free up memory. The process is run automatically, usually when the CPU is idled.

<app-video src="/videos/content/2021/04/create-reactivity-sistem-vue-3-javascript/weakmap-garbage-collection.webm"></app-video>

When we set the object to `undefined`, JavaScript's Garbage Collector will remove that unreferenced object. Fortunately, Chrome has nice feature to trigger that Garbage Collection process. We have to open the Devtools, then move into Performance Tab. There will be a button with trash icon on it, if we hover into it, it shows a label "Collect Garbage".

After we clicked that button, print the `person` object, it will show an empty `WeakMap`. That's why **`WeakMap` is called weakly referenced, because when the object is removed, the value is also removed**. Another side effect of weakly referenced is **we can't iterate over the keys nor values**, because we really don't exactly know when will the keys freed up from memory.

### Set

`Set` is **similar to `Array`, but the stored item must be unique**. Let's take a look how to interact with `Set`:

```typescript{}[] twoslash
const set = new Set()

set.add('First item')
set.add(2)

set
// Set(2) {"First item", 2}
```

We can add anything to `Set`, but we have to pay attention if we deal with object item. The concept of `Set` is to store unique item, and sometimes two similar object with same property can be inserted into set.

```typescript{}[] twoslash
const set = new Set()

set.add({ name: 'jefrydco' })
set.add({ name: 'jefrydco' })

set
// Set(2) {{…}, {…}}
```

Even though `{ name: 'jefrydco' }` object looks similar, **they are point to different address in memory**. That's why `Set` still be able to inserted that data. So how to make sure that our object inserted to set is unique? We have to assign it to a variable.

```typescript{}[] twoslash
const set = new Set()
const person = { name: 'jefrydco' }

set.add(person)
set.add(person)

set
// Set(1) {{…}}
```

We call `add()` function twice with same argument and it only insert the object once. Because the first `person` variable and the second one are referenced to the same object.

## Terms

Awesome!!! Now we already know some JavaScript API that power Vue 3 reactivity system. Before jump into the reactivity system, we have to know several terms we will commonly used in explaining reactivity system. So let's get to know it.

### State

**State is a regular object that represent something**. Let's get back to our previous example:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

We can say that `person` object is a state because it represents a person in real life. It can represent anything not only something in real life. For instance, if we ever play a game, I believe the game itself holds many states. How much progress, money or xp do we have or which level are we in. We can store that thing in a state.

### Reactive State

**Reactive state is just another state that do something if their property's value changed**. Let's get back to our previous example and make it a reactive state using `Proxy`:

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

We can say that `reactivePerson` is a reactive state because when we change, let say name property, it will print something to the console. We can do anything as we want actually, not only print something. We can call another function, change another state, render something to the secreen, and so many more. The possibility is endless.

### Dependencies

Remember what kind of things we can do inside the `set` handler function above, anything right? **Dependencies is a function that has to be called when the property's value changed**. Let's take a look at previous example:

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



### Trigger

### Effect

### Watch

## Reactivity System

### Create Reactive Function

### Dependencies Management

### Create Track Function

### Create Track Array Function

### Create Watch Function

### Final Touch

## Reference

- [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods)
- [Mozilla Developer Network: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Mozilla Developer Network: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
