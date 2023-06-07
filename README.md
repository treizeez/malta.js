![Malta](https://github.com/treizeez/malta.js/blob/main/rep/images/header.png?raw=true "Malta")

# Malta.js

- [What is Malta.js?](#💁-what-is-malta.js?)
- [Installation](#installation)
- [Getting started](#👨‍💻-getting-started)

## 💁 What is Malta.js?

A tiny (<!-- size -->2.1 KB<!-- /size --> gzipped) client-side JavaScript framework for building Single Page Applications that helps developers to create reusable components with ease. Its reactive architecture allows you to update your UI in real-time as your data changes.

One of the standout features of Malta.js is its support for CSS-in-JS, which allows you to write styles for your components directly in your JavaScript code. This approach can simplify your development process, make your code more maintainable, and lead to faster rendering times.

Unlike some other frameworks, Malta.js does not rely on JSX or similar technologies. Instead, it allows you to create components using JavaScript objects.

## Development Status

**Note: This library is currently under active development and should be considered a work in progress.**

I am continuously working on improving and adding new features to the library. While I strive to maintain stability, there might be breaking changes in future versions as I refine the API and functionality.

If you encounter any issues or have suggestions for improvements, please don't hesitate to [open an issue](https://github.com/treizeez/malta.js/issues) on the repository.

## Installation

### umd

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/malta-js@1.0.5/umd/malta.min.js"
></script>
```

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
import { Render } from "malta-js";

const App = {
  tag: "h1",
  textNode: "Hello world",
};

Render(App);
```

In addition to rendering a single object, the Malta.RenderDOM function can also take an array of objects as an argument.

When an array is passed to the RenderDOM function, it will render each object in the array as a separate element. This is useful when you want to render a list or a collection of elements.

```js
import { Render } from "malta-js";

const list = [
  { tag: "li", attrs: { id: "i1" }, textNode: "Item 1" },
  { tag: "li", attrs: { id: "i1" }, textNode: "Item 2" },
  { tag: "li", attrs: { id: "i1" }, textNode: "Item 3" },
];

Render(list, document.getElementById("root"));
```

In this example, we are using the State function provided by Malta to manage a counter value. The State function takes an initial value (in this case, 0) and returns an array containing two elements: the current value of the state and a function to update the state.

We then define a button component that increments the counter value when it is clicked. The onclick attribute of the button is set to an arrow function that calls the setCounter function with the previous value of the counter (using the functional form of setState).

Next, we define a Label function component that displays the current value of the counter. This component uses the counter function (which is the first element of the array returned by State) to access and display the current counter value.

Finally, we pass an array containing the button and Label components to the RenderDOM function. When the button is clicked, the counter value is updated and the Label component is re-rendered with the new value. The updated UI is then displayed in the browser.

```js
import { Render, State } from "malta-js";

const [counter, setCounter] = State(0);

const button = {
  tag: "button",
  textNode: "click",
  onclick: () => setCounter((prev) => prev + 1),
};

function Label() {
  return {
    tag: "h1",
    textNode: `You clicked ${counter()} times`,
  };
}

Render([button, Label]);
```

Malta-js provides a convenient way to define and apply CSS styles directly within a component, eliminating the need to separate styles into different files or modules. It allows you to write all the styles, including media queries and pseudo-classes, within a single component.

Here are the opportunities that Malta-js offers in terms of CSS-in-JS:

Inline Styling: With Malta-js, you can define styles inline within the component itself. This means that the styles are tightly coupled with the component, making it easier to understand and maintain.

Encapsulation: The styles defined in Malta-js are scoped to the specific component, preventing styles from leaking and conflicting with other components. This encapsulation enhances modularity and reduces the chances of CSS naming collisions.

All-in-One: Malta-js allows you to include all CSS properties, media queries, and pseudo-classes within the same style object. You can specify styles for different states of the component, such as hover or active, and apply them directly within the style object.

Dynamic Styles: Since Malta-js styles are defined using JavaScript objects, you have the flexibility to generate styles dynamically based on component props or state. This enables you to create versatile and adaptable components that can change their appearance based on dynamic conditions.

Reusable Components: Malta-js promotes the creation of reusable components by encapsulating both the structure and styling within a single component definition. This makes it easier to share and reuse components across different parts of your application.

Convenience: By providing a simplified syntax for defining styles, Malta-js reduces the boilerplate code required for styling components. It offers a more streamlined and concise approach compared to traditional CSS or CSS pre-processors.

Overall, Malta-js empowers developers to define comprehensive and self-contained styles within their components, including media queries and pseudo-classes, without the need for separate style files. This approach improves code organization, encapsulation, and reusability while providing a convenient and flexible way to handle component styling.

```js
import { Render } from "malta-js";

const Button = (label) => ({
  tag: "button",
  textNode: label,
  style: {
    all: "unset",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "0.875rem",
    backgroundColor: "rgb(25, 118, 210)",
    textTransform: "uppercase",
    padding: "5px 15px",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;",

    letterSpacing: "0.02857em",
    transition: "all 0.2s ease-out",

    "&:active": {
      transform: "scale(0.9)",
    },

    "@media (hover: hover)": {
      "&:hover": {
        opacity: "0.9",
      },
    },
  },
});

const Container = (...content) => ({
  tag: "div",
  content,
  style: {
    display: "flex",
    gap: "2px",
  },
});

const App = Container(Button("Button 1"), Button("Button 2"));

Render(App);
```
