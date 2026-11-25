// All site content lives here. Edit this file to update the website.
// Images: put files in /assets and set `image: "assets/your-file.jpg"`.
// Leave `image: null` to show a placeholder.

window.SITE = {
  name: "Yaw Adu-Asare Obeng",
  short: "Yaw Obeng",
  role: "Computer Science student, TU Hamburg",
  intro:
    "I build software close to the hardware and close to the user: a flash file system for small embedded devices, AI features for production web apps, and before that the IMU and GPS driver for a self-driving Formula Student car.",
  location: "Hamburg, Germany",
  email: "yaw17beng@outlook.com",
  links: {
    github: "https://github.com/2002-Yaw",
    linkedin: "https://www.linkedin.com/in/REPLACE-ME/",
  },
  photo: null, // e.g. "assets/me.jpg"
  focus: ["Embedded systems", "Autonomous driving", "AI products"],
  languages: "English (native), German (fluent), Spanish (A2)",
  updated: "November 2026",
};

// "Currently working on" on the home page. Add new projects at the top.
// `link` can point to a project or job page ("#/projects/thesis"), a URL, or be left out.
window.NOW = [
  {
    title: "Bachelor thesis",
    note: "Getting a flash file system (UFFS) running on small embedded devices.",
    link: "#/projects/thesis",
  },
];

window.EXPERIENCE = [
  {
    id: "justaddsugar",
    title: "AI Product Engineer",
    org: "Justaddsugar GmbH",
    type: "Working student",
    period: "Jan 2026 – now",
    place: "Hamburg",
    image: null,
    summary:
      "Full-stack work on AI-powered products, from the API that serves a model to the screen a user clicks on.",
    body: [
      "Justaddsugar is a creative agency that builds its own AI tools for content production. As a working student on the product team I work across the stack instead of in one layer.",
    ],
    did: [
      "Build and optimise RESTful APIs in FastAPI that bring AI and machine learning models into production.",
      "Develop user-facing frontends and the backend architecture behind new product features.",
      "Deploy and run cloud-native services on Google Cloud Platform for reliable production hosting.",
    ],
    stack: ["Python", "FastAPI", "JavaScript", "Google Cloud", "REST APIs"],
  },
  {
    id: "egnition",
    title: "Software Engineer, Driverless",
    org: "E-gnition Hamburg",
    type: "Formula Student team",
    period: "Oct 2025 – Sep 2026",
    place: "TU Hamburg",
    current: false,
    image: null,
    summary:
      "IMU and GPS driver and CI pipelines for a self-driving Formula Student race car. Our driverless team won the Driverless Cup at Formula Student Germany 2026.",
    body: [
      "E-gnition is TU Hamburg's Formula Student team, about 70 engineering students. The driverless department, 11 people, builds the autonomous system that drives the car with nobody in the cockpit.",
      "My part was the car's sense of its own motion and position: the driver node for the Xsens IMU, the GPS data that comes from the same unit, and the CI checks that keep the shared codebase clean.",
    ],
    did: [
      "Worked on the ROS 2 driver node for the Xsens IMU (C++), which publishes the car's acceleration and rotation data to the rest of the autonomous stack.",
      "Added GPS to the IMU node: ported the GPS handling from the old ROS 1 code, read the raw GNSS position data from the sensor and published it as a standard ROS NavSatFix message.",
      "Made the GPS output reliable: tracked fix quality (3D fix, dead reckoning), logged when the fix is acquired or lost, fixed timestamps and the IMU/GPS message order, and added satellite info.",
      "Cleaned up the node: topics and settings come from the shared YAML config instead of hard-coded values, and magic numbers became named enums.",
      "Built CI for the team's GitHub repo, including a clang-format check that runs on every pull request with its own format-check script.",
      "Kept my branches working as the team moved to a new code base, updating the vehicle simulator, mission state and shared nodes to build again.",
    ],
    outcome:
      "Our driverless team won the Driverless Cup at Formula Student Germany 2026 in Hockenheim.",
    links: [
      { label: "FSG 2026 results", url: "https://www.formulastudent.de/pr/news/details/article/fsg-2026" },
      // { label: "E-gnition's post on LinkedIn", url: "PASTE-LINKEDIN-POST-URL" },
    ],
    stack: ["C++", "ROS 2", "Xsens IMU", "GNSS", "GitHub Actions", "Docker", "Linux"],
  },
];

window.PROJECTS = [
  {
    id: "thesis",
    title: "Flash file system for embedded devices",
    kind: "Bachelor thesis",
    year: "2026",
    place: "TU Hamburg",
    image: null,
    summary:
      "Porting and evaluating a flash file system (UFFS) for resource-constrained embedded devices.",
    body: [
      "Small embedded devices store data on raw flash memory, which wears out and cannot simply be overwritten like a hard drive. A flash file system handles that: wear levelling, bad blocks and power loss.",
      "In my bachelor thesis I work with UFFS, an open-source flash file system, and look at how it behaves on a constrained embedded target.",
    ],
    did: [
      "Set up and build UFFS for an embedded target with CMake.",
      "Experiment with flash configurations in a test playground.",
      "Write up the results in the thesis.",
    ],
    stack: ["C", "CMake", "Embedded", "NAND flash"],
    links: [],
  },
  {
    id: "emnist",
    title: "Handwriting recognition on EMNIST",
    kind: "Machine learning project",
    year: "2025",
    place: "TU Hamburg",
    image: null,
    summary:
      "A neural network in Python that classifies handwritten letters and digits.",
    body: [
      "EMNIST extends the classic MNIST digits with handwritten letters, which makes it a harder classification problem with many similar-looking classes.",
    ],
    did: [
      "Designed and trained a neural network in Python to classify the EMNIST dataset.",
      "Analysed and preprocessed the image data to improve recognition accuracy.",
      "Wrote and ran tests to check the implementation was correct and reliable.",
      "Documented, visualised and presented the results in a scientific format.",
    ],
    stack: ["Python", "Machine learning", "Neural networks", "Testing"],
    links: [],
  },
  {
    id: "riot",
    title: "Motion apps on RIOT-OS",
    kind: "Embedded systems project",
    year: "2025",
    place: "TU Hamburg",
    image: null,
    summary:
      "Embedded apps in C that turn IMU readings into a tilt game and a digital spirit level on an LCD.",
    body: [
      "RIOT-OS is a small operating system for microcontrollers. The task was to build interactive applications on top of it using a real motion sensor and a display.",
    ],
    did: [
      "Developed interactive embedded applications in C on RIOT-OS.",
      "Read IMU sensor data and used it to drive LCD output.",
      "Built a motion-controlled game and a digital spirit level.",
    ],
    stack: ["C", "RIOT-OS", "IMU", "Microcontrollers"],
    links: [],
  },
  {
    id: "stm32",
    title: "Multi-board STM32 system",
    kind: "Space systems project",
    year: "2025",
    place: "TU Hamburg",
    image: null,
    summary: "Firmware for three STM32H7 boards that work together.",
    body: [
      "A course project in the space systems context: three microcontroller boards have to cooperate as one system.",
    ],
    did: [
      "Wrote firmware for STM32H753 boards in C.",
      "Set up the build with CMake and the STM32 toolchain.",
    ],
    stack: ["C", "STM32", "CMake", "Embedded"],
    links: [],
  },
  {
    id: "bookshop",
    title: "Bookshop app, agile modelling",
    kind: "Software engineering project",
    year: "2024",
    place: "TU Hamburg",
    image: null,
    summary:
      "The architecture and workflows of a shop system, modelled formally inside a Scrum team.",
    body: [
      "Before writing code, we modelled how a bookshop system should behave, and checked the design with formal methods.",
    ],
    did: [
      "Designed the software architecture and workflows with UML, extended finite state machines and Petri nets.",
      "Worked in a Scrum team and used Git to develop the agile artefacts together.",
    ],
    stack: ["UML", "EFSM", "Petri nets", "Scrum", "Git"],
    links: [],
  },
];

// Skills: each one lists where it was used (project or experience ids).
window.SKILLS = [
  {
    group: "Languages",
    items: [
      { name: "C", used: ["thesis", "riot", "stm32"] },
      { name: "C++", used: ["egnition"] },
      { name: "Python", used: ["justaddsugar", "egnition", "emnist"] },
      { name: "JavaScript", used: ["justaddsugar"] },
      { name: "SQL", used: [] },
      { name: "Julia", used: [] },
      { name: "Haskell", used: [] },
    ],
  },
  {
    group: "Systems & tools",
    items: [
      { name: "Linux", used: ["egnition"] },
      { name: "Git", used: ["bookshop", "egnition"] },
      { name: "Docker", used: ["egnition"] },
      { name: "ROS", used: ["egnition"] },
      { name: "CI/CD", used: ["egnition"] },
      { name: "CMake", used: ["thesis", "stm32"] },
      { name: "RIOT-OS", used: ["riot"] },
    ],
  },
  {
    group: "Web & cloud",
    items: [
      { name: "FastAPI", used: ["justaddsugar"] },
      { name: "REST APIs", used: ["justaddsugar"] },
      { name: "Google Cloud", used: ["justaddsugar"] },
      { name: "HTML / CSS", used: [] },
    ],
  },
  {
    group: "Methods",
    items: [
      { name: "Machine learning", used: ["emnist"] },
      { name: "Testing & QA", used: ["emnist", "egnition"] },
      { name: "UML & modelling", used: ["bookshop"] },
      { name: "Scrum", used: ["bookshop"] },
    ],
  },
];

window.COURSES = [
  "Algorithms and Data Structures",
  "Databases",
  "Machine Learning",
  "Computer Networks and Internet Security",
  "Object-Oriented Programming",
];
