/* Topic: Web Fundamentals — core HTML/CSS/JS concepts. */
SRS.registerTopic({
  id: "web-fundamentals",
  name: "Web Fundamentals",
  description: "Core HTML, CSS and JavaScript concepts every web developer should know cold.",
  cards: [
    {
      id: "card-001",
      front: "What are the four layers of the CSS box model, from inside out?",
      back: "Content → padding → border → margin. With box-sizing: border-box, the declared width/height includes content, padding and border (but never margin)."
    },
    {
      id: "card-002",
      front: "Rank these selectors by CSS specificity, highest first: .card, #main, div, style=\"...\"",
      back: "Inline style → #main (ID) → .card (class) → div (element). Specificity is compared as (inline, IDs, classes/attributes/pseudo-classes, elements); !important overrides all of them."
    },
    {
      id: "card-003",
      front: "What is the JavaScript event loop?",
      back: "The mechanism that lets single-threaded JS handle async work: the call stack runs synchronous code; completed async callbacks wait in task queues; when the stack is empty, the loop pushes the next task. Microtasks (promises) run before the next macrotask (setTimeout, I/O)."
    },
    {
      id: "card-004",
      front: "What is a closure in JavaScript?",
      back: "A function that retains access to the variables of its enclosing scope even after that scope has finished executing. Used for private state, factories and callbacks that remember context."
    },
    {
      id: "card-005",
      front: "What are the three states of a JavaScript Promise?",
      back: "Pending → fulfilled (resolved with a value) or rejected (with a reason). Once settled (fulfilled or rejected) the state can never change again."
    },
    {
      id: "card-006",
      front: "Why use semantic HTML elements (header, nav, main, article) instead of divs?",
      back: "They convey meaning to browsers, screen readers and search engines: better accessibility (landmark navigation), better SEO, and more readable markup — with no visual cost, since styling is unchanged."
    },
    {
      id: "card-007",
      front: "In flexbox, what do justify-content and align-items control?",
      back: "justify-content positions items along the main axis (row direction by default); align-items positions them along the cross axis. Change flex-direction and the two axes swap."
    },
    {
      id: "card-008",
      front: "When should you reach for CSS Grid instead of flexbox?",
      back: "Grid for two-dimensional layout — rows AND columns controlled together (page layouts, card grids with strict alignment). Flexbox for one-dimensional flow along a single axis (toolbars, nav rows, centering)."
    },
    {
      id: "card-009",
      front: "What do the HTTP methods GET, POST, PUT, PATCH and DELETE conventionally do?",
      back: "GET reads a resource (safe, cacheable). POST creates or triggers processing. PUT replaces a resource entirely. PATCH updates part of it. DELETE removes it. GET, PUT and DELETE are idempotent; POST is not."
    },
    {
      id: "card-010",
      front: "What makes an API 'RESTful'?",
      back: "Resources identified by URLs, manipulated through standard HTTP methods, with stateless requests (each request carries all context) and representations (usually JSON). Server state changes are driven by the verbs, not by RPC-style endpoint names."
    },
    {
      id: "card-011",
      front: "What is the difference between let, const and var?",
      back: "let and const are block-scoped and not attached to window; const also forbids reassignment (though object contents stay mutable). var is function-scoped, hoisted with undefined, and allows redeclaration — avoid it in modern code."
    },
    {
      id: "card-012",
      front: "What is event delegation and why use it?",
      back: "Attaching one listener to a common ancestor and using event bubbling plus event.target to handle events from many children. Fewer listeners, and it automatically covers elements added later."
    },
    {
      id: "card-013",
      front: "What is the difference between == and === in JavaScript?",
      back: "=== compares value and type with no coercion. == coerces operands to a common type first (so '1' == 1 is true), which causes surprising results — default to ===."
    },
    {
      id: "card-014",
      front: "What does 'mobile-first' CSS mean in practice?",
      back: "Write base styles for the smallest screens, then layer on min-width media queries for larger screens. The default experience is the constrained one, so nothing essential depends on a big viewport."
    },
    {
      id: "card-015",
      front: "What is the difference between localStorage and sessionStorage?",
      back: "Both store string key/value pairs per origin (~5MB, synchronous). localStorage persists until explicitly cleared; sessionStorage lives only as long as the tab. Neither is sent to the server (unlike cookies)."
    }
  ]
});
