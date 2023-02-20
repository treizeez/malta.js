![Malta](https://github.com/treizeez/malta.js/blob/main/rep/images/header.png "Malta")

# Malta.js

- [What is Malta.js?](#💁-what-is-malta.js?)
- [Installation](#installation)
- [Getting started](#👨‍💻-getting-started)

## 💁 What is Malta.js?

A tiny (<!-- size -->2.1 KB<!-- /size --> gzipped) client-side JavaScript framework for building Single Page Applications that helps developers to create reusable components with ease. Its reactive architecture allows you to update your UI in real-time as your data changes.

One of the standout features of Malta.js is its support for CSS-in-JS, which allows you to write styles for your components directly in your JavaScript code. This approach can simplify your development process, make your code more maintainable, and lead to faster rendering times.

Unlike some other frameworks, Malta.js does not rely on JSX or similar technologies. Instead, it allows you to create components using JavaScript objects.

## Installation

### npm

```bash
npm install malta-js --save
```

## 👨‍💻 Getting started

#### Tutorial: Building UI with Malta

In this example, we define a simple object called App which contains the tag and textNode properties. The tag property specifies the HTML tag that we want to render, and the textNode property specifies the text content that we want to display.

To render this application using MaltaJS, we can use the Malta.RenderDOM function. This function takes two arguments: the first argument is the application object that we want to render, and the second argument (optional) is the root HTML element where we want to render the application.

In this example, we are not providing the second argument, so the application will be rendered on the document body by default. If you want to render the application in a specific element, you can pass that element as the second argument to the RenderDOM function.

```js
import { Malta } from "malta-js";

const App = {
  tag: "h1",
  textNode: "Hello world",
};

Malta.RenderDOM(App);
```


In addition to rendering a single object, the Malta.RenderDOM function can also take an array of objects as an argument.

When an array is passed to the RenderDOM function, it will render each object in the array as a separate element. This is useful when you want to render a list or a collection of elements.

```js
import { Malta } from "malta-js";

const list = [
  { tag: "li", attrs: { id: "i1" }, textNode: "Item 1" },
  { tag: "li", attrs: { id: "i1" }, textNode: "Item 2" },
  { tag: "li", attrs: { id: "i1" }, textNode: "Item 3" },
];

Malta.RenderDOM(list, document.getElementById("root"));
```


In this example, we are using the State function provided by Malta to manage a counter value. The State function takes an initial value (in this case, 0) and returns an array containing two elements: the current value of the state and a function to update the state.

We then define a button component that increments the counter value when it is clicked. The onclick attribute of the button is set to an arrow function that calls the setCounter function with the previous value of the counter (using the functional form of setState).

Next, we define a Label function component that displays the current value of the counter. This component uses the counter function (which is the first element of the array returned by State) to access and display the current counter value.

Note that the Label function is defined as a regular (non-arrow) function. This is because we want to use the this keyword inside the function to refer to the counter function, which is a property of the function object. If we used an arrow function, the this keyword would refer to the global object instead of the function object.

Finally, we pass an array containing the button and Label components to the RenderDOM function. When the button is clicked, the counter value is updated and the Label component is re-rendered with the new value. The updated UI is then displayed in the browser.
```js
import { Malta } from "malta-js";

const [counter, setCounter] = Malta.State(0);

const button = {
  tag: "button",
  textNode: "click",
  onclick: () => setCounter((prev) => prev + 1),
};

function Label() {
  counter(this);

  return {
    tag: "h1",
    textNode: `You clicked ${counter()} times`,
  };
}

Malta.RenderDOM([button, Label]);
```
