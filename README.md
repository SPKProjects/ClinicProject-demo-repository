# Clinic UI Automation

End-to-end UI automation for the PromptQA MediBook Clinic application. The project uses Playwright Test with TypeScript, a Page Object Model (POM), and custom Playwright fixtures to keep test scenarios readable and reusable.

The tests exercise the hosted application at `https://promptqa-shop.web.app` by default. The base URL and test data can be overridden through environment variables for another environment.

## Technology Stack

- **Language:** TypeScript
- **Test framework:** Playwright Test
- **Browser coverage:** Chromium / Desktop Chrome
- **Design pattern:** Page Object Model
- **Test dependency injection:** Custom Playwright fixtures
- **Reporting:** Playwright HTML report and Allure Report
- **CI/CD:** GitHub Actions
- **Runtime:** Node.js and Java 8+ for the local Allure CLI

## Project Structure

```text
.
├── .github/workflows/
│   ├── playwright.yml          # Test, typecheck, reports, and artifacts
│   ├── proof-html.yml          # HTML validation workflow
│   └── auto-assign.yml         # Repository automation
├── docs/
│   └── PAGE_OBJECT_MODEL.md    # POM guidance
├── pages/                      # Page Object Model classes
├── test-data/
│   └── users.json              # Reusable test user records
├── tests/
│   ├── fixtures/               # Custom Playwright fixtures
│   ├── helpers/                # Shared test actions
│   ├── appointments.spec.ts    # Cancel and remove appointment
│   ├── booking.spec.ts         # Booking and validation scenarios
│   └── clinic-navigation.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Test Coverage

The current suite contains four Chromium tests covering:

- Clinic navigation and doctor search, including no-result search behavior.
- Successful appointment booking with doctor, date, time, patient, and clinic assertions.
- Required-field and phone-number validation on the booking form.
- Appointment cancellation followed by appointment removal.

## Page Object Model

Page objects in `pages/` own locators and user interactions so test files focus on business behavior:

| Page object | Responsibility |
| --- | --- |
| `LandingPage` | Open the application and enter the Clinic app |
| `LoginPage` | Sign in to the application |
| `ClinicPage` | Navigate to doctors and appointments |
| `DoctorsPage` | Search for and open a doctor |
| `DoctorProfilePage` | Validate doctor details and start booking |
| `BookingPage` | Select a slot, enter patient details, and confirm booking |
| `AppointmentsPage` | Find, cancel, and remove appointments |

The custom fixture in `tests/fixtures/clinic.fixture.ts` creates these page objects from the Playwright `page` and exposes them directly to each test:

```ts
test('search for a doctor', async ({ landingPage, loginPage, clinicPage, doctorsPage }) => {
	// The fixture provides ready-to-use page objects.
});
```

Shared authentication is provided by `tests/helpers/auth.ts`.

## Prerequisites

- Node.js compatible with the current Playwright and TypeScript dependencies.
- Java 8 or newer for `allure-commandline` when generating reports locally.

Install dependencies and browser binaries:

```bash
npm ci
npx playwright install --with-deps
```

## Configuration and Test Data

Copy `.env.example` to `.env` and adjust the values for the target environment:

```dotenv
BASE_URL=https://promptqa-shop.web.app
USER_NAME=demoUser
DOCTOR_NAME=Dr. Arjun Kapoor
PATIENT_NAME=Rajan Bhosle
```

`USER_NAME` selects a user from `test-data/users.json`. The file currently contains the `demoUser` login record. `.env` is ignored by Git; do not commit production credentials or sensitive data.

## Local Commands

```bash
npm test                  # Run the Playwright suite
npm run test:headed       # Run with a visible browser
npm run test:ui           # Open Playwright UI mode
npm run typecheck         # Typecheck without emitting JavaScript
npm run report            # Open the Playwright HTML report
npm run report:allure    # Generate the static Allure report
npm run report:allure:open # Open the generated Allure report
```

Playwright stores its HTML output in `playwright-report/`. Allure raw results are written to `allure-results/`, and the generated static report is written to `allure-report/`. These directories are ignored by Git.

## GitHub Actions CI/CD

`.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`:

1. Checks out the repository and installs Node.js.
2. Sets up Temurin Java 17 for Allure.
3. Installs npm dependencies and Playwright browsers.
4. Runs TypeScript typechecking.
5. Runs the Playwright tests with CI retries and one worker.
6. Generates the Allure report even when tests fail, unless the workflow is cancelled.
7. Uploads `playwright-report` and `allure-report` as separate artifacts with 30-day retention.

`.github/workflows/proof-html.yml` separately validates the repository HTML content on pushes and manual dispatch.

## Reports

The Playwright HTML report is useful for traces, screenshots, videos, and failure details. Allure provides a dashboard-style view of test history, status, duration, and failure information.

From a GitHub Actions run, download the `allure-report` artifact and open its `index.html` locally. The `playwright-report` artifact can be opened with:

```bash
npm run report
```
