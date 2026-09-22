import { expect, Locator, Page } from '@playwright/test';

export class AppointmentsPage {
  constructor(private readonly page: Page) {}

  async expectOpen(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'My appointments' })).toBeVisible();
  }

  appointmentFor(patientName: string): Locator {
    return this.page.locator('main article').filter({ hasText: patientName });
  }

  async cancelAndRemove(patientName: string): Promise<void> {
    const appointment = this.appointmentFor(patientName);
    await expect(appointment).toHaveCount(1);
    await appointment.getByRole('button', { name: 'Cancel', exact: true }).click();
    await appointment.getByRole('button', { name: 'Yes, cancel', exact: true }).click();
    await expect(appointment).toContainText(/Cancelled/i);
    await appointment.getByRole('button', { name: 'Remove', exact: true }).click();
    await expect(this.appointmentFor(patientName)).toHaveCount(0);
  }
}