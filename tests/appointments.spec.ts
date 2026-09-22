import { expect, test } from './fixtures/clinic.fixture';
import { signInToClinic } from './helpers/auth';

const doctorId = 'd-arjun-kapoor';

test('Cancel and remove an appointment', async ({ landingPage, loginPage, bookingPage, clinicPage, appointmentsPage, page }) => {
  const patientName = `Cancel Test ${Date.now()}`;

  await signInToClinic(landingPage, loginPage);
  await bookingPage.open(doctorId);
  await bookingPage.chooseFirstAvailableSlot();
  await bookingPage.fillPatient(patientName);
  await bookingPage.confirm();
  await expect(page.getByRole('heading', { name: 'Appointment confirmed' })).toBeVisible();

  await clinicPage.openAppointments();
  await appointmentsPage.expectOpen();

  const appointmentCard = appointmentsPage.appointmentFor(patientName);
  await expect(appointmentCard).toHaveCount(1);
  await expect(appointmentCard).toContainText(/Confirmed/i);
  await expect(appointmentCard.getByRole('button', { name: 'Cancel', exact: true })).toBeVisible();
  await expect(appointmentCard.getByRole('button', { name: 'Remove', exact: true })).not.toBeVisible();

  await appointmentCard.getByRole('button', { name: 'Cancel', exact: true }).click();
  await appointmentCard.getByRole('button', { name: 'Yes, cancel', exact: true }).click();
  await expect(appointmentCard).toContainText(/Cancelled/i);
  await expect(appointmentCard.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
  await expect(appointmentCard.getByRole('button', { name: 'Cancel', exact: true })).not.toBeVisible();

  await appointmentCard.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(appointmentsPage.appointmentFor(patientName)).toHaveCount(0);
});