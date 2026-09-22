import { test as base } from '@playwright/test';
import { AppointmentsPage } from '../../pages/AppointmentsPage';
import { BookingPage } from '../../pages/BookingPage';
import { ClinicPage } from '../../pages/ClinicPage';
import { DoctorProfilePage } from '../../pages/DoctorProfilePage';
import { DoctorsPage } from '../../pages/DoctorsPage';
import { LandingPage } from '../../pages/LandingPage';
import { LoginPage } from '../../pages/LoginPage';

type ClinicFixtures = {
  landingPage: LandingPage;
  loginPage: LoginPage;
  clinicPage: ClinicPage;
  doctorsPage: DoctorsPage;
  doctorProfilePage: DoctorProfilePage;
  bookingPage: BookingPage;
  appointmentsPage: AppointmentsPage;
};

export const test = base.extend<ClinicFixtures>({
  landingPage: async ({ page }, use) => use(new LandingPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  clinicPage: async ({ page }, use) => use(new ClinicPage(page)),
  doctorsPage: async ({ page }, use) => use(new DoctorsPage(page)),
  doctorProfilePage: async ({ page }, use) => use(new DoctorProfilePage(page)),
  bookingPage: async ({ page }, use) => use(new BookingPage(page)),
  appointmentsPage: async ({ page }, use) => use(new AppointmentsPage(page)),
});

export { expect } from '@playwright/test';