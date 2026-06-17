# Interactive Task Manager

A fully interactive Task Manager Application built using only **HTML, CSS, and Vanilla JavaScript**.

This project demonstrates real DOM usage through task creation, editing, completion, deletion, filtering, localStorage persistence, theme switching, event delegation, event propagation, attributes vs properties, and a browser rendering pipeline section.

## Live Features

- Add new tasks
- Edit existing tasks
- Mark tasks as completed
- Undo completed tasks back to pending
- Delete tasks
- Clear all tasks
- Search tasks by title, category, or status
- Filter tasks by category
- Pending, completed, and total counters
- localStorage integration
- Dark/light theme toggle
- Event delegation for task actions
- Attributes vs properties demo
- Event bubbling demo
- Event capturing demo
- Browser rendering pipeline visual section

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- DOM APIs
- localStorage

No frameworks or libraries are used.

## DOM Manipulation Used

This project dynamically creates task cards using:

- `document.createElement()`
- `document.createTextNode()`
- `append()`
- `prepend()`
- `before()`
- `after()`
- `replaceWith()`
- `remove()`

Each task card is created from JavaScript and inserted into the correct column based on its status.

## Custom Data Attributes

Each task card contains custom attributes:

```html
data-id data-status data-category
```

These attributes are used to identify and manage each task from the UI.

Example:

```html
<div
  class="task-card"
  data-id="123"
  data-status="pending"
  data-category="JavaScript"
></div>
```

The project also uses:

- `dataset`
- `setAttribute()`
- `getAttribute()`
- `hasAttribute()`
- `removeAttribute()`

## Attributes vs Properties

The project includes a demo for:

```js
input.value;
```

and:

```js
input.getAttribute("value");
```

### Difference

`input.value` gives the current live value of the input. If the user types something new, this property updates immediately.

`input.getAttribute("value")` gives the original HTML attribute value, unless that attribute is manually changed using `setAttribute()`.

This demonstrates the difference between DOM properties and HTML attributes.

## Event Handling

The project uses `addEventListener()` for:

- Form submit
- Theme toggle
- Search input
- Filter dropdown
- Clear filters
- Clear tasks
- Event propagation demo
- Browser rendering pipeline cards

## Event Delegation

Task card buttons are handled using event delegation.

Instead of adding separate event listeners to every edit, complete, undo, and delete button, the project attaches one listener to the parent board:

```js
tasksGrid.addEventListener("click", handler);
```

Then it checks which button was clicked using:

```js
event.target;
closest();
classList.contains();
dataset;
```

This is better because dynamically created task cards can still be handled without adding new listeners manually.

## Event Bubbling

Event bubbling means the event starts from the clicked child element and moves upward to its parents.

Example order:

```txt
Child
Parent
Grandparent
```

In the project, clicking the child button during the bubbling demo logs the order on screen and in the console.

## Event Capturing

Event capturing means the event starts from the outer parent and moves downward toward the child.

Example order:

```txt
Grandparent
Parent
Child
```

This project demonstrates capturing by passing `true` as the third argument in `addEventListener()`:

```js
addEventListener("click", handler, true);
```

## Browser Rendering Pipeline

The project includes a visual section explaining how the browser converts HTML and CSS into pixels.

### HTML Flow

```txt
HTML
↓
Parsing
↓
Tokenization
↓
DOM Tree
```

### CSS Flow

```txt
CSS
↓
CSSOM Tree
```

### Final Render Flow

```txt
DOM Tree + CSSOM Tree
↓
Render Tree
```

## Key Concepts Explained

### Parsing

Parsing is the process where the browser reads raw HTML text and understands its structure.

### Tokenization

Tokenization breaks HTML into meaningful tokens such as start tags, end tags, text nodes, and attributes.

### DOM Tree

The DOM Tree is the browser's object-based representation of the HTML document.

### CSSOM Tree

The CSSOM Tree is the browser's object-based representation of CSS rules.

### Render Tree

The Render Tree combines the DOM Tree and CSSOM Tree to decide what visible elements should appear on the screen and how they should look.

## localStorage

Tasks are saved in localStorage so that they remain visible even after page refresh.

The task array is saved using:

```js
localStorage.setItem("tasks", JSON.stringify(tasksArr));
```

and loaded using:

```js
JSON.parse(localStorage.getItem("tasks")) || [];
```

## Project Structure

For the single-file version:

```txt
index.html
README.md
```

The `index.html` file contains:

- HTML structure
- Internal CSS
- Internal JavaScript

## How to Run

Open `index.html` directly in the browser.

No build step is required.

## Deployment Options

This project can be deployed using:

- GitHub Pages
- Netlify
- Vercel

## Evaluation Coverage

| Criteria                   | Covered |
| -------------------------- | ------- |
| DOM Manipulation           | Yes     |
| Event Handling             | Yes     |
| Event Delegation           | Yes     |
| Attributes vs Properties   | Yes     |
| Browser Rendering Pipeline | Yes     |
| Event Bubbling             | Yes     |
| Event Capturing            | Yes     |
| localStorage               | Yes     |
| UI/UX                      | Yes     |

