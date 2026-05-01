const articles = [
  {
    name: "react-introduction-frontend",
    title: "Introduction to Front-End Development with ReactJS",
    content: [
      "ReactJS is a popular JavaScript library used for building modern front-end user interfaces.",
      "It allows developers to create reusable UI components and manage dynamic content efficiently.",
      "React uses a virtual DOM to improve performance and update only the necessary parts of the page.",
      "Front-end developers use React to build responsive, fast, and interactive web applications.",
      "React is commonly used together with HTML, CSS, and JavaScript to create complete UI systems.",
    ],
    imageUrl: "/assets/imgs/card (1).jpg",
  },
  {
    name: "react-components-structure",
    title: "Building UI Components in ReactJS",
    content: [
      "Components are the building blocks of a React front-end application.",
      "Each component represents a small part of the user interface like a button, navbar, or card.",
      "Reusable components help developers organize code and reduce duplication.",
      "Example:\nfunction Navbar() {\n  return <nav>My Website</nav>;\n}",
      "Using components makes front-end development faster and more maintainable.",
    ],
    imageUrl: "/assets/imgs/card (2).jpg",
  },
  {
    name: "react-jsx-layouts",
    title: "Designing Layouts with JSX in React",
    content: [
      "JSX allows developers to write HTML-like code inside JavaScript.",
      "It helps in designing front-end layouts in a clean and readable way.",
      "JSX supports embedding JavaScript expressions using curly braces {}.",
      "Example:\nconst title = 'Frontend App';\n<h1>{title}</h1>",
      "JSX makes UI development more structured and easier to understand.",
    ],
    imageUrl: "/assets/imgs/card (3).jpg",
  },
  {
    name: "react-routing-navigation",
    title: "Frontend Navigation and Routing in ReactJS",
    content: [
      "React Router is used to create navigation between different pages in a React application.",
      "It allows users to switch pages without reloading the entire website.",
      "Developers use BrowserRouter, Routes, and Route to define navigation paths.",
      "Example:\n<Route path='/home' element={<Home />} />",
      "Routing improves user experience by making the application smooth and interactive.",
    ],
    imageUrl: "/assets/imgs/card (4).jpg",
  },
  {
    name: "react-state-ui-updates",
    title: "Managing UI Updates with React State",
    content: [
      "State is used to store dynamic data in a front-end React application.",
      "It allows the UI to update automatically when data changes.",
      "The useState hook is commonly used in functional components.",
      "Example:\nconst [count, setCount] = useState(0);",
      "State management helps create interactive elements like counters, forms, and toggles.",
    ],
    imageUrl: "/assets/imgs/card (4).jpg",
  },
  {
    name: "react-introduction-frontend",
    title: "Introduction to Front-End Development with ReactJS",
    content: [
      "ReactJS is a popular JavaScript library used for building modern front-end user interfaces.",
      "It allows developers to create reusable UI components and manage dynamic content efficiently.",
      "React uses a virtual DOM to improve performance and update only the necessary parts of the page.",
      "Front-end developers use React to build responsive, fast, and interactive web applications.",
      "React is commonly used together with HTML, CSS, and JavaScript to create complete UI systems.",
    ],
    imageUrl: "/assets/imgs/card (1).jpg",
  },
  {
    name: "react-components-structure",
    title: "Building UI Components in ReactJS",
    content: [
      "Components are the building blocks of a React front-end application.",
      "Each component represents a small part of the user interface like a button, navbar, or card.",
      "Reusable components help developers organize code and reduce duplication.",
      "Example:\nfunction Navbar() {\n  return <nav>My Website</nav>;\n}",
      "Using components makes front-end development faster and more maintainable.",
    ],
    imageUrl: "/assets/imgs/card (2).jpg",
  },
  {
    name: "react-jsx-layouts",
    title: "Designing Layouts with JSX in React",
    content: [
      "JSX allows developers to write HTML-like code inside JavaScript.",
      "It helps in designing front-end layouts in a clean and readable way.",
      "JSX supports embedding JavaScript expressions using curly braces {}.",
      "Example:\nconst title = 'Frontend App';\n<h1>{title}</h1>",
      "JSX makes UI development more structured and easier to understand.",
    ],
    imageUrl: "/assets/imgs/card (3).jpg",
  },
  {
    name: "react-routing-navigation",
    title: "Frontend Navigation and Routing in ReactJS",
    content: [
      "React Router is used to create navigation between different pages in a React application.",
      "It allows users to switch pages without reloading the entire website.",
      "Developers use BrowserRouter, Routes, and Route to define navigation paths.",
      "Example:\n<Route path='/home' element={<Home />} />",
      "Routing improves user experience by making the application smooth and interactive.",
    ],
    imageUrl: "/assets/imgs/card (4).jpg",
  },
  {
    name: "react-state-ui-updates",
    title: "Managing UI Updates with React State",
    content: [
      "State is used to store dynamic data in a front-end React application.",
      "It allows the UI to update automatically when data changes.",
      "The useState hook is commonly used in functional components.",
      "Example:\nconst [count, setCount] = useState(0);",
      "State management helps create interactive elements like counters, forms, and toggles.",
    ],
    imageUrl: "/assets/imgs/card (4).jpg",
  },
];

export default articles;
