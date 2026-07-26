/**
 * Commitlint configuration using conventional commits. Docs:
 * https://commitlint.js.org/reference/configuration.html
 */
import conventional from "@commitlint/config-conventional";

// Extract conventional commit types for customization
const [_, , conventionalTypes] = conventional.rules["type-enum"];

const Configuration = {
  defaultIgnores: true,
  extends: ["@commitlint/config-conventional"],

  formatter: "@commitlint/format",

  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",

  // Custom ignore patterns
  ignores: [
    (commit) =>
      commit.startsWith("chore(deps)") || commit.includes("dependabot"),
    (commit) => commit.startsWith("wip:"),
    (commit) => commit.includes("[skip ci]"),
  ],

  prompt: {
    messages: {
      max: "(%d max chars)",
      min: "(%d min chars)",
      skip: "(press enter to skip)",
    },
    questions: {
      body: {
        description: "Provide a longer description (optional):",
      },
      breakingBody: {
        description: "Describe the breaking changes:",
      },
      footer: {
        description: 'List any issues closed (e.g., "Closes #123"):',
      },
      isBreaking: {
        description: "Are there any breaking changes?",
      },
      scope: {
        description: "What is the scope of this change?",
      },
      subject: {
        description: "Write a short, imperative tense description:",
      },
      type: {
        description: "Select commit type:",
        enum: {
          feat: {
            description: "A new feature",
            emoji: "✨",
            title: "Features",
          },
          fix: {
            description: "A bug fix",
            emoji: "🐛",
            title: "Bug Fixes",
          },
        },
      },
    },
  },

  rules: {
    // Body rules
    "body-leading-blank": [1, "always"],
    "body-max-length": [0, "always", Infinity],
    "body-max-line-length": [2, "always", 100],

    // Footer rules
    "footer-leading-blank": [1, "always"],
    "footer-max-length": [2, "always", Infinity],
    "footer-max-line-length": [2, "always", 100],

    // Scope rules
    "scope-case": [2, "always", "lower-case"],

    // Subject rules
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],

    // Type rules
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", [...conventionalTypes, "wip", "deps"]],
  },
};

export default Configuration;
