import { expect, test } from './fixtures/clinic.fixture';
import { signInToClinic } from './helpers/auth';

const doctorName = process.env.DOCTOR_NAME ?? 'Dr. Arjun Kapoor';

test('Validate clinic navigation and doctor search', async ({ landingPage, loginPage, clinicPage, doctorsPage, page }) => {
  await signInToClinic(landingPage, loginPage);
  await clinicPage.open();
  await clinicPage.openDoctors();
  await doctorsPage.expectNavigation();

  const initialCount = await doctorsPage.count();
  await expect(doctorsPage.doctorRows).toHaveCount(initialCount);
  await doctorsPage.search(doctorName);
  await expect(doctorsPage.doctorRows.filter({ hasText: doctorName })).toHaveCount(1);
  await doctorsPage.search('Doctor That Does Not Exist');
  await expect(doctorsPage.doctorRows).toHaveCount(0);
  await expect(page.getByText('0 doctors', { exact: true })).toBeVisible();
});