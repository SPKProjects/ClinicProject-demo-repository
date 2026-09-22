# Welcome to your organization's demo respository
This code repository (or "repo") is designed to demonstrate the best GitHub has to offer with the least amount of noise.

The repo includes an `index.html` file (so it can render a web page), two GitHub Actions workflows, and a CSS stylesheet dependency.

## Test reports

Playwright writes both its HTML report and Allure results when tests run locally or in CI.

The local Allure CLI requires Java 8 or newer. GitHub Actions provisions Java 17 automatically.

```bash
npm test
npm run report:allure
npm run report:allure:open
```

The GitHub Actions workflow uploads `playwright-report` and the generated `allure-report` as separate build artifacts. Download `allure-report` from the workflow run and open its `index.html` locally.
