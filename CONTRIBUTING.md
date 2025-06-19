# Contributing to Game of Life

Thank you for thinking about contributing!

## Getting started

1. **Fork** the repository and clone your fork locally.
2. Serve the files using a simple web server. Python is already enough:
   ```bash
   python3 -m http.server
   ```
   Then open [http://localhost:8000](http://localhost:8000) to run the game.
3. Optionally install Node.js so you can run ESLint. You can install ESLint globally or run it with `npx`.

## Coding standards

This project uses [ESLint](https://eslint.org/) for JavaScript code style. The rules are defined in `.eslintrc.json`:

- Always use semicolons (`"semi": "always"`).
- Strings use double quotes (`"quotes": "double"`).
- Commas should be placed at the end of a line (`"comma-style": "last"`).
- The codebase targets ECMAScript 6 modules.

An `.editorconfig` file is provided and enforces four space indentation and Unix line endings. Please configure your editor to respect this file.

Run ESLint before committing:
```bash
npx eslint js
```

## Testing your changes

There are no automated tests at the moment. Before sending a pull request:
1. Start the development server as shown above.
2. Open the application in the browser and verify that everything works as expected.
3. Ensure `npx eslint js` reports no errors.

## Pull request process

1. Create a topic branch from the main branch (`master` by default).
2. Commit your work in logical units with clear messages.
3. Push the branch to your fork and open a pull request.
4. Describe what you changed and why. Link to any related issues.
5. A maintainer will review your changes. Please be prepared to update your PR based on feedback.

By contributing you agree that your work will be released under the same [MIT License](LICENSE).
