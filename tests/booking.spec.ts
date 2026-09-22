import { expect, test } from './fixtures/clinic.fixture';
import { signInToClinic } from './helpers/auth';

const doctorName = process.env.DOCTOR_NAME ?? 'Dr. Arjun Kapoor';
const doctorId = 'd-arjun-kapoor';

test('Navigate to Clinic and sign in', async ({ landingPage, loginPage, clinicPage, doctorsPage, doctorProfilePage, bookingPage, page }) => {
  await signInToClinic(landingPage, loginPage);
  await clinicPage.open();
  await expect(page.locator('body')).toContainText('MediBookclinic');
  await page.getByText('Find a doctor →').click();

  const initialCount = await doctorsPage.count();
  await expect(doctorsPage.doctorRows).toHaveCount(initialCount);
  await doctorsPage.search(doctorName);
  await doctorsPage.openDoctor(doctorName);
  await doctorProfilePage.expectDoctor(doctorName);

  const { specialty, clinicName } = await doctorProfilePage.getDetails();
  expect(specialty).toBeTruthy();
  expect(clinicName).toBeTruthy();
  await doctorProfilePage.bookAppointment(doctorName);

  const targetDate = await bookingPage.getDateLabels();
  const patientName = process.env.PATIENT_NAME ?? 'Rajan Bhosle';
  await page.getByRole('radio', { name: targetDate.radioLabel }).check();
  await page.getByRole('radio', { name: '15:00', exact: true }).check();
  await bookingPage.fillPatient(patientName);
  await page.getByRole('combobox', { name: 'Reason for visit' }).selectOption({ label: 'Follow-up visit' });
  await page.getByRole('textbox', { name: 'Notes for the doctor (optional)' }).fill('This is a test appointment');
  await bookingPage.confirm();
  await expect(page.getByRole('heading', { name: 'Appointment confirmed' })).toBeVisible();
  await expect(page.locator('main')).toContainText(doctorName);
  await expect(page.locator('main')).toContainText(specialty);
  await expect(page.locator('main')).toContainText(targetDate.confirmationLabel);
  await expect(page.locator('main')).toContainText('15:00');
  await expect(page.locator('main')).toContainText(clinicName);
  await expect(page.locator('main')).toContainText(patientName);
});

test('Validate required fields on the booking form', async ({ landingPage, loginPage, bookingPage, page }) => {
  await signInToClinic(landingPage, loginPage);
  await bookingPage.open(doctorId);

  const confirmButton = page.getByRole('button', { name: 'Confirm booking' });
  await confirmButton.click();
  await bookingPage.expectValidationMessage();
  await expect(page.getByRole('radio', { name: '15:00', exact: true })).not.toBeChecked();

  const dateRadio = page.getByRole('radio', { name: /\w{3} \d{1,2} \w{3}/ }).first();
  await dateRadio.check();
  await page.getByRole('radio', { name: '15:00', exact: true }).check();
  await confirmButton.click();

  await expect(page.getByRole('textbox', { name: 'Patient name' })).toHaveAttribute('aria-invalid', 'true');
  await expect(page).toHaveURL(/\/clinic\/book\//);

  await page.getByRole('textbox', { name: 'Patient name' }).fill('Test Patient');
  await page.getByRole('textbox', { name: 'Phone number' }).fill('12345');
  await confirmButton.click();

  await expect(page.getByRole('textbox', { name: 'Phone number' })).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('textbox', { name: 'Phone number' })).toHaveValue('12345');
  await expect(page).toHaveURL(/\/clinic\/book\//);
});