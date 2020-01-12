---
title: Object-Oriented Programming Concepts in JavaScript - The Hard Way
description: The concept of object-oriented programming in JavaScript, explained in detail
summary: The concept of object-oriented programming in JavaScript starts from the discussion of object, this, class and prototype.
img: /cover/2020/01/javascript-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2020-01-10T01:00:00.000Z
updatedDate: 2020-01-10T01:00:00.000Z
slug: oop-object-oriented-programming-javascript-explanation
id: oop-object-oriented-programming-javascript-explanation
contributors: ['edwardanthony']
---

Before we start discussing the hard way of object-oriented programming concepts in JavaScript, I wanna highlight that this concept is **the most difficult version**.

So if You want to read easier reference, I suggest you look for others. 😅 

But if You curious and force yourself to read the discussion below, my hat is off to you, why?

Because in my opinion, if we understand the most difficult version, we can easily understand the easier version as well. Its piece of cake, isn't it?

Let's get started, the first thing we have to know before understanding the difficult concept of object-oriented programming in JavaScript is the object, this, class and prototype. They are all will be discussed in point 1 - 4.

[toc]

While in point 5 - 8, we will discuss the object-oriented programming in JavaScript itself. If You feel confident about the basic, You can jump up on to the core discussion directly.

## Object

Object is one kind of data type in JavaScript which consists of several keys and values. The values can be any others data type in JavaScript, like number, string, boolean, array, function or event another object.

```javascript {2}
var object = {
  number: 7,
  string: 'this is string',
  boolean: true,
  array: [1, 2, 3],
  func: function() {
    return 'ini fungsi'
  },
  otherObject: {
    number: 3,
    string: 'this is other string',
    boolean: false,
    array: [9, 8, 7]
  }
}
```

On the highlighted line, `number` is a key and `7` is a value.

To check whether an object has a certain property or not we can use `hasOwnProperty` method. This method takes one string parameter which is the key we wanna check.

```javascript
object.hasOwnProperty('number')
// true

object.hasOwnProperty('notRight')
// false
```

On the snippet above, `hasOwnProperty` method return a boolean.

### Global Object

By default, JavaScript run in the browser will have a global object. It is `window`. If we write `window` on the browser console as follows:

```javascript
window
```

that code will displayed,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/window-javascript-by-jefrydco.png" alt="window JavaScript"/>

The global object contains following things:

1. All JavaScript public API, like `parseInt` and `parseFloat`
2. All JavaScript's data type object, like `Array` and `JSON`
3. The variable we declared using `var` keyword
4. The function we declared

There are 3 ways to declare a variable in JavaScript, using `var`, `let` or `const` keyword. If we declare a variable using `var` keyword, it will be attached to the global object automatically.

```javascript {3,6}
var name = 'jefrydco'

window.name
// 'jefrydco'

name
// 'jefrydco'
```

let say we declare a variable called `name` using `var` keyword. We can access that variable using `window.name` or only `name`. That won't applicable if we declare it using `let` and `const` keyword. Moreover about `let` and `const` will discuss in another chance.

Declaring a function will be attached to the global object as well,

```javascript {5,8}
function func() {
  return 'this is function'
}

window.func()
// 'this is function'

func()
// 'this is function'
```

so we can call it using this way `window.func()` or `func()` directly. Like the variable, it won't applicable if we declare the function using `let` and `const` keyword.

So we can think that global object `window` is a **predefined variable that contains all of the things we need to use JavaScript**.

## _this_

In my opinion, this is one of the hardest concepts to understand in JavaScript besides of object-oriented programming.

By definition, `this` is **a context where the code is executed**. `this` keyword will often used in object-oriented programming. There are several contexts of `this` we need to understand.

### _this_ in Global Context

The first one is `this` in global context. By default, `this` in global context will refer to <a href="global-object">global object</a> itself which is `window`. If we type the following code on the browser console:

```javascript
this
```

it will result,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/this-javascript-by-jefrydco.png" alt="this JavaScript"/>

We can also check whether `this` in the global object is really referring to the global object `window` or not using this way:

```javascript
this === window
// true
```

it will return `true`.

### _this_ in Object Context

The second one is `this` in the object context. `this` in this context **will refer the object before the dot "."**.

Take a look on the following code:

```javascript {5}
var student = {
  name: "Budi",
  age: 12,
  greet: function() {
    console.log(this.name)
  }
}

student.greet()
// Budi
```

Actually, we can do the same way without using `this` by referring it directly to the container variable like as follows:

```javascript {6}
var student = {
  name: "Budi",
  age: 12,
  greet: function() {
    // change "this" with "student"
    console.log(student.name)
  }
}

student.greet()
```

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/this-object-null-raise-error-javascript-by-jefrydco.png" alt="this Object Null Raise Error JavaScript"/>

Because of that, if we use `this`, the bug will be prevented.

Not like any other programming language that the value of `this` determined in compile-time, in JavaScript, it determines in the runtime and depends on the object before the dot symbol ".".

```javascript {12,13}
var teacher = {
  name: "Deni"
}
var student = {
  name: "Budi"
}

function greet() {
  console.log(this.name)
}

teacher.func = greet
student.func = greet

teacher.func()
// Deni
student.func()
// Budi
```

In the snippet above, we declare two kinds of objects called `teacher` and `student` which has their own `name` property.

We also declare a function called `greet`. Inside the body of the function, we wanna know the value of `name` property, even though we never declare it. Then it attached to each object we declared previously with the name `func`.

After that we executed the `func` function by calling `teacher.func()` and `student.func()`. They give us a different `name` property match with each of two objects has.

But take care on certain cases, the value of `this` can be gone, like as follows:

```javascript {5,8}
var time = 13

var student = {
  goodMorning: function() {
    console.log(this.name)
  },
  goodAfternoon: function() {
    console.log(this.name)
  }
}

(time >= 12 ? student.goodAfternoon : student.goodMorning)()
```

It will returns,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/this-missing-iife-javascript-by-jefrydco.png" alt="this Missing Immediately Invoked Function Expression JavaScript"/>

To get better understanding why this happen, we have to know how a function is executed.

If we call `student.goodAfternoon()`, behind the scenes JavaScript use the dot symbol to return internal data type called [Reference Type](https://tc39.es/ecma262/#sec-reference-specification-type).

It consists of:

- base (this is the object before dot symbol)
- name (this is the name of the function after the dot symbol)
- strict (it is boolean whether current execution time using strict mode or not, "use strict")

And the result of `student.goodAfternoon` isn't a function, but a `ReferenceType` which consists of value like as follows:

```javascript
(student, 'goodAfternoon', false)
```

When the bracket `()` is called on `ReferenceType`, the value of `this` is called and arranged accordingly with the value of `base` in `ReferenceType`. For that case it is the `student`.

Assignment operator `=` can also remove the `ReferenceType`. Because of that the value of `this` is gone in the example above.

Take a look on the easier snippet below:

```javascript {9}
var student = {
  name: "Budi",
  greet: function() {
    console.log(this.name)
  }
}

// Assignment operator to make ReferenceType gone
var greet = student.greet

greet()
```

Fungsi `greet` memiliki `ReferenceType` sebagai berikut:

```javascript
(student, 'greet', false)
```

In the body of `greet` function, we wanna know the value of `name` property. Then we attach it into new variable which has the same name as the function. After that we call the variable as a function.

It will returns,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/this-missing-reassignment-javascript-by-jefrydco.png" alt="this Missing Re-assignment JavaScript"/>

Even though in the body of `greet` in `student` object we use console log to find out the value of `name` property when it attached to another variable, that function never knows the value of `name`. It is because the `ReferenceType` becomes:

```javascript
(window, 'greet', false)
```

Global object `window` never has `name` property, so that when the `greet` function is executed it won't print anything.

### _this_ in Function Context

The last one is `this` in function context. As in the <a href="global-object">global object</a> that a function we declared will be attached automatically in global object `window` if we aren't declared it using `let` and `const` keyword.

And in <a href="#this-in-object-context">_this_ in object context</a> also discussed if there is a function inside an object, `this` inside the function is referring to the object itself.

Because of that, if we use `this` inside a function, it will **refer to the object itself** and the object is **global object** which is `window`.

```javascript {2}
function func() {
  return this
}

func()
```

will return,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/this-function-javascript-by-jefrydco.png" alt="this Function JavaScript"/>

We can also check whether `this` inside a function really refer to global object `window` or not using this way:

```javascript
func() === window
// true
```

---

We can use strict equality operator, `===` to check whether a variable referring to a similar value or not. We already use this way in the previous section.

By the way, this blog uses ligature font in the block code section, so if I write some operator which consists of 2 characters or more will be displayed differently.

For instance, strict equality operator `===`, greater than or equal operator `>=` and smaller than or equal operator `<=`. The font is [Fira Code](https://fonts.google.com/specimen/Fira+Code).

## Class

Class is **blueprint of the object**. You can take a look at the image below. The left section is the technical specification of aircraft and the right one is the aircraft implementation on real life.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/avia-b-534-by-mlwatts-and-airliners-net.jpg" :caption="{ en: { aviaB: 'Avia B-534 Airline' }, id: { aviaB: 'Pesawat terbang Avia B-534' } }" source="Wikipedia: Avia B-534" source-link="https://en.wikipedia.org/wiki/Avia_B-534" alt="Avia B 534 by MLWatts and Airliners.net"/>

We can imagine the class is like the technical specification. It will tell each of the aircraft components as a detail. From that technical specification, we have a clear rule on how will the aircraft is shaped later.

So are the class. The class describes the object in detail and contextual.

Let say we want to make an aircraft application to record departure schedule. From that case, we need a class to save aircraft data, but we don't need to describe all the detail of the aircraft itself. We might only need the aircraft code, name, and the year.

Another case if we want to make an application to design the aircraft. We need to describe it as detail as possible. Even we need to describe the smallest component available.

That's what I mean by context, we need to describe the object as needed.

If some of you already learn object-oriented programming in another programming language, you might be familiar with the following code:

```javascript
class Cat {
  full = false

  eat() {
    console.log('Cat eats...')
    this.full = true
  }
}
```

That syntax is available in EcmaScript version 6 or better known as ES6. ES6 is the next version of JavaScript. Unfortunately, in this discussion we won't learn object-oriented programming using that way.

We learn the EcmaScript version 5 way, which is the regular JavaScript we already know today.

We will make a class in JavaScript using function. Take a look on the following code:

```javascript
function Cat() {}
```

There are several things we need to know in order to make a class using a function in JavaScript,

**The first one**, a class is made using `function` keyword followed by the class name. From the example above, the class name is `Cat`.

**The second one**, there is an unwritten rule in naming class in JavaScript. It suggests us to use camel case to write the class name.

Camel case is writing rule which each of the words started with capital. For instance, `Cat`, `PersianCat` and `FlyingAircraft`.

Like we already discuss above that class is the blueprint of the object. From that class we can create the real object as follows:

```javascript
var cat = new Cat()
```

The real object is made using `new` keyword followed by corresponding class, then opening and closing bracket, like when we called a function.

### Class Property

To describe class property, we can use `this.` (this followed by dot symbol) keyword followed by property name.

```javascript
function Cat() {
  this.full = false
}
```

The example above, cat has _full_ property.

```javascript
var cat = new Cat()

cat.full
// false
```

We can know the value of the property by calling it using dot notation. From the example above, we use `cat.full` to know the value.

### Class Method

We can be able to create a method inside the class. A method is a function which can be used to change the property value. We can declare a method using the same way as declaring a variable. The only difference is the value is a function. The example is as follows:

```javascript
function Cat() {
  this.full = false

  this.eat = function() {
    console.log('Cat eats...')
    this.full = true
  }
}
```

From the example above, cat class has eat method. Inside that method, the value of `full` is changed from `false` to `true`.

```javascript
var cat = new Cat()

cat.full
// false

cat.eat()
// Cat eats...

cat.full
// true
```

We can also call the method using the same way as calling variable which is using dot notation. The only difference is it must be followed by opening and closing bracket as follows, `cat.eat()`.

Defining method using that way as a con. Each time we create a real object from the class, the JavaScript will create a new instance of the method as well in memory.

Imagine if we create several object from `Cat` class above. Let say, cat A, cat B and cat C. Eventhough they are the same instance of cat, has same `full` property and `eat` method, they are surely has different personality.

Cat A perhaps is a greedy cat, almost an hour it eats. Cat B perhaps not too much eating, but it sleeps a lot. Cat C rarely eats but it is the fattiest one.

So it makes sense that the only thing we need to differentiate is the `full` property they have. Each of them has their own full time.

We don't need to differentiate how they are eating or for the context of that case, the `eat` method. They can use the same method.

We can check whether that method is different one and another using the following code:

```javascript
var catA = new Cat()
var catB = new Cat()
var catC = new Cat()

catA.eat === catB.eat
// false

catA.eat === catC.eat
// false

catB.eat === catC.eat
// false
```

They are all **different method** because when they are compared, the comparison will return `false`.

Because of that JavaScript give a special way to make a method using the prototype. It guarantees that no matter how much real object we create, it will use the same method.

It will be discussed in <a href="#prototype">prototype</a> section.

### Pros of Class

Let say we have a class as follows:

```javascript
function Cat() {
  this.full = false
}
```

To make it a real object, we have to call it using `new` keyword as follows:

```javascript
var cat = new Cat()
cat
// Cat {full: false}
```

If we pay attention to the result on the console, it returns an object that has `full` property and its value is `false`. We can also create a real object without using `new` keyword and declaring a class. The example as follows:

```javascript
var cat = {
  full: false
}
cat
// {full: false}
```

At a glance, we get the same result. But if we take a look more closely, the browser console will add information about the class in front of the object if we create it using class, as follows `Cat {full: false}`. While if we create the object directly, it won't display the class information, `{full: false}`.

**Class will make us easier to create a real object without redeclaring it repeatedly**. Let say we have to make an object that has much property, suppose the object is human.

Human has a name, date of birth, place of birth, sex, address and many more. We also have to create many human objects.

If we declare it directly using a real object as follows:

```javascript
var human1 = {
  // Many human property
}

var human2 = {
  // Many human property
}

var human3 = {
  // Many human property
}
```

It would make us bored and there are many repetitions, isn't it? Although we can use copy and paste, it really isn't efficient.

We can save much time by declaring `Human` class and if we want to create a real object, we only do it by using `new` keyword.

Even because of class in JavaScript is a function, we can add parameters to it as follows:

```javascript
function Human(name, dateOfBirth, placeOfBirth, sex, address) {
  this.name = name
  this.dateOfBirth = dateOfBirth
  this.placeOfBirth = placeOfBirth
  this.sex = sex
  this.address = address
}
```

Using that way, we can create a different kind of human using the same class.

```javascript
var human1 = new Human('Barata', '01 Januari 1995', 'Yogyakarta', 'Laki-laki', 'Lampung')
var human2 = new Human('Apasari', '31 Desember 1994', 'Bandung', 'Perempuan', 'Bali')
var human3 = new Human('Prabu', '15 Juli 1996', 'Bali', 'Laki-laki', 'Aceh')

human1
// Human {name: "Barata", dateOfBirth: "01 Januari 1995", placeOfBirth: "Yogyakarta", sex: "Laki-laki", address: "Lampung"}
human2
// Human {name: "Apasari", dateOfBirth: "31 Desember 1994", placeOfBirth: "Bandung", sex: "Perempuan", address: "Bali"}
human3
// Human {name: "Prabu", dateOfBirth: "15 Juli 1996", placeOfBirth: "Bali", sex: "Laki-laki", address: "Aceh"}
```

However if we already declared the `human` object directly without using class, we can change it so that it inherits the `Human` class using `Object.setPrototypeOf` method.

The method will set the object so that it has `__proto__` property referring to `prototype` property of `Human` class.

It has 2 parameters, the first one is the object we wanna change and the second one is the `prototype` property. The example is as follows:

```javascript
var human4 = {
  name: "Atun",
  dateOfBirth: "17 Agustus 1993",
  placeOfBirth: "Jakarta",
  sex: "Perempuan",
  address: "Surabaya"
}
human4
// {name: "Atun", dateOfBirth: "17 Agustus 1993", placeOfBirth: "Jakarta", sex: "Perempuan", address: "Surabaya"}

Object.setPrototypeOf(human4, Human.prototype)
human4
// Human {name: "Atun", dateOfBirth: "17 Agustus 1993", placeOfBirth: "Jakarta", sex: "Perempuan", address: "Surabaya"}
```

Besides of using `Object.setPrototypeOf` method, we can also point the `__proto__` property directly to refer to the `prototype` property of `Human` class. The example is as follows:

```javascript
var human5 = {
  name: "Danum",
  dateOfBirth: "29 Februari 1997",
  placeOfBirth: "Dayak",
  sex: "Perempuan",
  address: "Sumba"
}
human5
// {name: "Danum", dateOfBirth: "29 Februari 1997", placeOfBirth: "Dayak", sex: "Perempuan", address: "Sumba"}

human5.__proto__ = Human.prototype
human5
// Human {name: "Danum", dateOfBirth: "29 Februari 1997", placeOfBirth: "Dayak", sex: "Perempuan", address: "Sumba"}
```

Both of them lead to the same result.

On the next sections, we will more often experiment using `__proto__` and `prototype` and link between them.

## Prototype

When we declare a function, JavaScript will add a property called `prototype` to the function object.

```javascript
function Cat() {}

Cat.prototype
// {constructor: f}
```

The `prototype` property is an object consists of `constructor` function that points to another function.

**The `constructor` is the function executed when we call `Cat` function**.

We can check whether `constructor` is `Cat` function we already declared or not using this way:

```javascript
Cat.prototype.constructor === Cat
// true
```

Besides of it, the `prototype` also has another hidden object called `__proto__`. We can't check it using `hasOwnProperty` method as well.

It points to another object. It is the `prototype` property of `Object` class.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/prototype-javascript-by-jefrydco.png" alt="prototype JavaScript"/>

We can also check whether the value of `__proto__` is really the `prototype` property of `Object` class or not using this way:

```javascript
Cat.prototype.__proto__ === Object.prototype
// true
```

Base on that, we can draw a conclusion that **each of function it will inherit Object class automatically**. The inheritance between the object we made and `Object` class linked through `__proto__` object in the `prototype` property.

Or we if we draw it to simple diagram, it will be as follows, `Cat -> Object`. `Cat` class inherit `Object` class.

We can make use of `prototype` property to solve the creation of <a href="#class-method">class method</a> in the previous section. So the method won't recreate each time we declare the object.

```javascript
function Cat() {}

Cat.prototype.eat = function() {
  console.log('Cat eat...')
}

var kucing = new Cat()
kucing.eat()
// Cat eat...
```

We can also check whether `eat` method won't recreate each time we make several objects using this way:

```javascript
var catA = new Kucing()
var catB = new Kucing()
var catC = new Kucing()

catA.eat = catB.eat
// true

catA.eat = catC.eat
// true

catB.eat = catC.eat
// true
```

They are all **the same method** because if we compare it like the snippet above it returns `true`.

In the previous snippet, we declare `eat` method on the `prototype` property. It can be called directly through `cat` object even though if we console the `cat` is an empty object.

```javascript
cat
// Cat {}
```

But if we take a look more closely, the `cat` object has a hidden object called `__proto__`. It contains 3 other objects, the first one is `eat` method, the second one is `constructor` and the last one is `__proto__` points to `Object` class prototype.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/proto-javascript-by-jefrydco.png" alt="__proto__ JavaScript"/>

Although `eat` method is located inside `__proto__`, we can access it directly.

It is because when we access the `eat` method, JavaScript will check whether `cat` has `eat` method or not.

If not, JavaScript will continue the search to `__proto__` property, turns out that the `__proto__` has `eat` method, so that the JavaScript stop to search more and execute the method.

Another case if we want to execute the undeclared method, let say it is called `drink`. JavaScript will do a search in `cat` object, it doesn't have the method. Then JavaScript continue it's search to `__proto__`, it also doesn't have.

The search is to continue to another `__proto__` that inside of the previous `__proto__`. And it also doesn't have.

The last `__proto__` property checked by JavaScript refers to `Object` class. If it doesn't have the method we wanna call, JavaScript will raise an error that the method is undefined.

We can draw the link between them in a simple diagram as follows, `cat -> __proto__ (Cat) -> __proto__ (Object)`.

The first `__proto__` refers to `Cat` object and the second one is refers to `Object` class.

Anyway, the `__proto__` that the `cat` object has is refers to `Cat` class prototype. We can check it as follows:

```javascript
cat.__proto__ === Cat.prototype
// true
```

The link between `__proto__` to other `__proto__` and the `prototype` to other `prototype` is called **prototype chaining**. We can make use of it to do inheritance in JavaScript.

## Inheritance

In the previous section it is discussed how inheritance process in JavaScript. It use `__proto__` and `prototype`. It will discuss more in this section.

Inheritance in JavaScript will divide into 2 section, inheritance for object and inheritance for class.

### Object Inheritance

Let say we have `cat` and `bird` object as follows:

```javascript {2-4, 8-10}
var cat = {
  full: false,
  eat: function() {
    console.log('Cat eat...')
    this.full = true
  },
  meow: function() {
    console.log('Cat meow...')
  }
}

var bird = {
  full: false,
  eat: function() {
    console.log('Bird eat...')
    this.full = true
  },
  fly: function() {
    console.log('Bird fly...')
  }
}
```

The `cat` object has `full` property, `eat` and `meow` method, whle the `bird` object has `full` property, `eat` and `fly` method.

Both of them has the same `full` property and `eat` method, we can apply inheritance to shorten the declaration.

We can combine the eating ability of them to another object, let say the object is `animal`.

```javascript {8,15}
var animal = {
  full: false,
  eat: function() {
    console.log('Animal eat...')
    this.full = true
  }
}

var cat = {
  __proto__: animal,
  meow: function() {
    console.log('Cat meow...')
  }
}

var bird = {
  __proto__: animal,
  fly: function() {
    console.log('Bird fly...')
  }
}
```

In that snippet, we declare first the animal object that has `full` property and `eat` method. Then we declare `cat` and `bird` object that has their `__proto__` property refers to `animal` object.

Using that way, the `cat` and `bird` object will have the ability of eating as well, we can check it by calling the `eat` method in `cat` and `bird` object as follows:

```javascript
cat.eat()
// Animal eat...

bird.eat()
// Animal eat...
```

When we check the `full` property to `cat` and `bird` object, they don't have it. It is located inside `__proto__` object.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/property-inheritance-javascript-by-jefrydco.png" alt="Property Inheritance JavaScript"/>

But when we call the `eat` method. Both of them will have `full` property automatically. Like we have discussed in <a href="#this-in-object-context">this in object context</a>, this will refer to the object itself.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/this-in-property-inheritance-javascript-by-jefrydco.png" alt="this in Property Inheritance JavaScript"/>

As we discussed in prototype chaining, both of them has a similar ability to eat. They get it from `__proto__` property referring to `animal` object. JavaScript will search sequencely whether `cat` and `bird` object has `eat` method or not.

It turns out that they don't have. JavaScript continue the search to their `__proto__` property. It refers to another object called `animal` and JavaScript found it right away there. Then JavaScript will call it.

Based on that case, we can draw a conclusion that **inheritance in an object can be done using `__proto__` property that referring to another object**.

### Class Inheritance

Based on the same case, let's change the snippet in the previous section into class. We will make 3 kind of class, they are `Animal`, `Cat` and `Bird`. The result will be as follows:

```javascript
function Animal() {
  this.full = false
}
Animal.prototype.eat = function() {
  console.log('Animal eat...')
  this.full = true
}

function Cat() {}
Cat.prototype.meow = function() {
  console.log('Cat meow...')
}

function Bird() {}
Bird.prototype.fly = function() {
  console.log('Bird fly...')
}
```

But it seems declaring method using prototype looks not so nice, perhaps it is because of the prototype declared after the function is declared. It will make the method looks outside the scope of function. Because of that, let's change that into more organized.

But before we do it, it's better to get to know about immediately invoked function expression or better known as IIFE.

If we declare a function, in order to make the code inside of it run, it's common for us to call the function.

```javascript {5}
function func() {
  console.log('This is function...')
}

func()
// This is function...
```

While the immediately invoked function expression/IIFE is a function that when it declared it automatically called so that the code in the body of the function is executed as well.

To declare IIFE, it starts with 2 of the opening and closing brackets, `()()`. Then inside of the first opening and closing bracket, we declare a function that we wanna executed automatically without declaring its name, `(function() {})()`.

```javascript
(function() {
  console.log('Inside of immediately invoked function expression...')
})()
// Inside of immediately invoked function expression...
```

When the snippet above is executed, the function inside of the first opening and closing bracket will be executed automatically.

The common use case for IIFE is to prevent polluting <a href="#global-object">global object</a>.

---

After getting to know about IIFE, let's get started to change the declaration of the class above to make it well organized.

```javascript {2-8,13-16,21-24}
var Animal = (function() {
  function Animal() {
    this.full = false
  }
  Animal.prototype.eat = function() {
    console.log('Animal eat...')
    this.full = true
  }
  return Animal
})()

var Cat = (function() {
  function Cat() {}
  Cat.prototype.meow = function() {
    console.log('Cat meow...')
  }
  return Cat
})()

var Bird = (function() {
  function Bird() {}
  Bird.prototype.fly = function() {
    console.log('Bird fly...')
  }
  return Bird
})()
```

It seems the code above looks more compicated than the previous one, isn't it? 🤦‍♂️ 

At a glance, sure it looks more complicated. But if we stare it closely, we can understand that the class declaration is moved inside IIFE. And the IIFE returns the class.

You can take a look on the highlighted code for the class declaration.

Anyway, to make it easier to discuss inheritance, let's call the class that inherits as child class and the class that inherited as parent class.

A child class in JavaScript called inherits when:

1. Has **`prototype` property refers to the parent class**.
2. The `prototype` property has a **`constructor` property refers to itself**.
3. When we create the real object from child class, it should be **inherit all property and method from the parent class**.

From the 3 rules above, we can make a helper function to turn a class inherits another class. More or less, the function will be like as follows:

```javascript {2,5,7}
function __extends(ChildClass, ParentClass) {
  Object.setPrototypeOf(ChildClass, ParentClass)

  function CombinedClass() {
    this.constructor = ChildClass
  }
  CombinedClass.prototype = ParentClass.prototype

  ChildClass.prototype = new CombinedClass()
}
```

We call the helper function `__extends` because in accordance with the object-oriented programming in the others programming language, to declare an inheritance between class, they use `extends` keyword.

While the `__` (2 underscores) prefix is one of the unwritten rules in JavaScript that indicate a property, object or method is only used internally.

We can take a look at the body of the helper function above, `Object.setPrototypeOf` will set the `prototype` property of the child class to refer to the parent class. It follows the first rule.

In order to follow the second rule, we need a new helper class that set the `constructor` property to refer to the child class. After that, we also have to set `prototype` property of the child class to refer to the parent class.

To check the third rule, let's change the `Cat` and `Bird` class to inherit the `Animal` class.

```javascript {2,3,5,11}

var Cat = (function(_super) {
  __extends(Cat, _super)
  function Cat() {
    return _super.apply(this, arguments)
  }
  Cat.prototype.meow = function() {
    console.log('Cat meow...')
  }
  return Cat
})(Animal)
```

Suppose we already declared the helper function and the `Animal` class. In the snippet above, we add a parameter called `_super` which refer to `Animal` in IIFE.

The `__extends` function called using `Cat` as the first parameter and `_super` as the second parameter.

Inside the `Cat` class declaration, we return a value of `apply` function call located in `_super`. It accepts 2 parameters, the first one is `this` context and the second one is `arguments` keyword.

The `arguments` keyword is a variable containing all the parameter pass into a function, in that case, the function is `Cat` class.

After that, let's make the real object from `Cat` class we already declared.

```javascript
var cat = new Cat()

cat
// Cat {full: false}
```

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/en/prototype-inheritance-javascript-by-jefrydco.png" alt="Prototype Inheritance JavaScript"/>

In accordance with the third rule, `cat` object is a `Cat` that has `full` property. The `full` property is coming from its parent class, which is `Animal`.

The `cat` object is inherit `eat` method from its parent. So we can call it directly through the `cat` object.

```javascript
cat.eat()
// Animal eat...

cat
// Cat {full: true}
```

After calling `eat` method, the value of `full` property is change into `true`.

The `__proto__` in `cat` object is referring to `Animal` class in accordance with the first rule. The `constructor` property inside of `__proto__` property is referring to itself in accordance with the second rule.

## Polymorphism

**Polymorphism is the object ability to take many form**. Let's get back to the `Cat`, `Bird` and `Animal` class above. We can recognize the `Cat` as a `Cat` and as an `Animal`.

To check it we can use `instanceof` keyword. This keyword checks whether an object has the same form of we wanna check or not.

```javascript
var cat = new Cat()

cat instanceof Cat
// true

cat instanceof Animal
// true
```

In the example above, because we made the `cat` object from `Cat` class so that the checking returns `true`. It also happens when we check it with `Animal` class, because of `Cat` class inherit from `Animal` class, it will return `true` as well.

Even it also returns `true` if we check it with `Object` class. Because all <a href="#prototype">prototype chain</a> ends in `Object` class.

```javascript
cat instanceof Object
// true
```

From that case, we can draw a conclusion that **all of thing in JavaScript is an `Object` except `number`, `string` and other primitive data type**.

## Encapsulation

To get a better understanding about encapsulation, imagine we consume a capsule medicine like the following image:

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/capsule-by-secretdisc-from-wikipedia.jpg" :caption="{ en: { medicineCapsule: 'Medicine capsule' }, id: { medicineCapsule: 'Kapsul obat' } }" source="Wikipedia: Capsule (pharmacy)" source-link="https://en.wikipedia.org/wiki/Capsule_(pharmacy)" alt="Capsule"/>

It makes us consuming medicine easier. By using a capsule, we can only need to consume one item instead of many medicines. That's how encapsulation it is.

From that illustration, we can conclude that encapsulation is **a mechanism to hide data so that we can interact with it as a single unit**.

Unfortunately, because all the property and method in JavaScript is can be accessed from anywhere when this article is written JavaScript doesn't have any way to do full encapsulation.

Even though there is some hack to do it. [Eric Elliot](https://twitter.com/_ericelliott) writes a great article about [Encapsulation in JavaScript](https://medium.com/javascript-scene/encapsulation-in-javascript-26be60e325b4).

Besides that, the next version of JavaScript is also has a [syntax to apply encapsulation](https://github.com/tc39/proposal-class-fields#private-fields). When this article is written, it still in [step 3](https://tc39.es/process-document/) to be standardized.

## Abstraction

To get better understanding what is an abstraction, let's use the previous analogy, <a href="#encapsulation">capsule analogy</a>. The capsule consists of several kinds of medicine that help us to defeat a specific disease.

But we never know how each of them kills the bacteria, virus and disease in our body. The only thing we know is the capsule do defeat the disease.

Another analogy we can use is aircraft. When the pilot wants to fly an aircraft, the only thing he might do is press one or two-button to turn it on and pull the wheel to fly it away.

But he never knows, how each of the machines works involved in turn the aircraft on and make it fly.

Based on 2 analogies above, we can draw a conclusion that **abstraction is a general problem identification process ignoring the detail**. In another programming language, abstraction achieve using the interface and abstract keyword.

Again, unfortunately, when this article is written, JavaScript still don't have any way to apply abstraction. Even though there are several hacks to do it.

If you wanna apply abstraction, You can use TypeScript. TypeScript has [abstract class](http://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes) feature.

We can think TypeScript is a JavaScript that enhanced with many features. Even though TypeScript will convert into JavaScript, TypeScript really helps us in the development phase.

## Recap

Woah, it's a long discussion. 😅 We already discussed all the things in applying object-oriented programming in JavaScript.

It starts from the discussion about what is the object, this concept is quite hard to understand, the class that is a blueprint of an object and the prototype is the basis of object-oriented programming in JavaScript.

Besides that, we also have discussed the application of 4 concepts of object-oriented programming in JavaScript. It covers inheritance, polymorphism, encapsulation and abstraction.

Although when this article is written encapsulation and abstraction are can't be fully applied using JavaScript. But there is always a way to overcome it.

Anyway, if you find this discussion is a little bit overwhelming and confusing, you can always find another shorten reading material like the one written by [Lydia Hallie](https://twitter.com/lydiahallie), [JavaScript Visualized: Prototypal Inheritance](https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co).

Thanks for reading and hope you enjoy! 🙌 

## Reference

1. [CSS Tricks: Understanding JavaScript Constructors](https://css-tricks.com/understanding-javascript-constructors/)
2. [ECMAScript® 2020 Language Specification: The Reference Specification Type](https://tc39.es/ecma262/#sec-reference-specification-type)
3. [Geeks for Geeks: Prototype in JavaScript](https://www.geeksforgeeks.org/prototype-in-javascript/)
4. [Mozilla Developer Network: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
5. [Mozilla Developer Network: Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
6. [Mozilla Developer Network: Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
7. [Viktor Kukurba Medium: Object-oriented programming in JavaScript #1. Abstraction](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-1-abstraction-c47307c469d1)
8. [Wikipedia: Object-oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
9. [Wikipedia: Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression)
