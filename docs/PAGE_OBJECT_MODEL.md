# Playwright Page Object Model

This project uses three simple ideas:

1. **Page objects** in `pages/` keep locators and UI actions in one place.
2. **The fixture** in `tests/fixtures/clinic.fixture.ts` creates those page objects for every test.
3. **Tests** in `tests/` describe the behavior being checked, instead of repeating selectors.

## Where to start

- `pages/LandingPage.ts` opens the website and the Clinic app.
- `pages/LoginPage.ts` signs in a user.
- `pages/DoctorsPage.ts` searches for a doctor.
- `pages/BookingPage.ts` fills and submits a booking.
- `tests/fixtures/clinic.fixture.ts` exposes the page objects as test fixtures.
- `tests/example.spec.ts` shows complete examples.

## A small test example

```ts
import { expect, test } from './fixtures/clinic.fixture';

test('find a doctor', async ({ landingPage, loginPage, clinicPage, doctorsPage }) => {
  await landingPage.open();
  await landingPage.openClinic();
  await loginPage.open();
  await loginPage.signIn('demo@promptqa.test', 'Demo@1234');
  await clinicPage.openDoctors();

  await doctorsPage.search('Dr. Arjun Kapoor');
  await expect(doctorsPage.doctorRows).toHaveCount(1);
});
```

When a locator changes, update the page object once. The tests can remain focused on the expected behavior.

## Commands

```text
npm test             Run the tests
npm run test:headed  Run with a visible browser
npm run test:ui      Open Playwright UI mode
npm run typecheck    Check TypeScript without emitting files
npm run report       Open the latest HTML report
```

The base URL defaults to `https://promptqa-shop.web.app`. Override it with `BASE_URL` when testing another environment. Select a JSON user with `USER_NAME`, and override other test data with `DOCTOR_NAME` and `PATIENT_NAME`.

## Environment and users

1. Copy `.env.example` to `.env`.
2. Set `BASE_URL` and the test data values for your environment.
3. Set `USER_NAME` to a user key in `test-data/users.json`.

The JSON file keeps reusable login records in one beginner-friendly place. `.env` is ignored by Git, so local environment values are not committed. Do not put real production passwords in either file.