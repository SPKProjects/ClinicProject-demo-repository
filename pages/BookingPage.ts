import { expect, Page } from '@playwright/test';

export class BookingPage {
  constructor(private readonly page: Page) {}

  async open(doctorId: string): Promise<void> {
    await this.page.goto(`/clinic/book/${doctorId}`);
    await this.expectOpen();
  }

  async expectOpen(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Book an appointment' })).toBeVisible();
  }

  async getDateLabels(): Promise<{ radioLabel: string; confirmationLabel: string }> {
    return this.page.evaluate(() => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 2);
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return {
        radioLabel: `${weekdays[targetDate.getDay()]} ${targetDate.getDate()} ${months[targetDate.getMonth()]}`,
        confirmationLabel: `${weekdays[targetDate.getDay()]}, ${months[targetDate.getMonth()]} ${targetDate.getDate()}`,
      };
    });
  }

  async chooseFirstAvailableSlot(): Promise<void> {
    await this.page.getByRole('radio', { name: /\w{3} \d{1,2} \w{3}/ }).first().check();
    await this.page.getByRole('radio', { name: '15:00', exact: true }).check();
  }

  async fillPatient(patientName: string, phone = '9876543210'): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Patient name' }).fill(patientName);
    await this.page.getByRole('textbox', { name: 'Phone number' }).fill(phone);
  }

  async confirm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm booking' }).click();
  }

  async expectValidationMessage(): Promise<void> {
    await expect(this.page.getByText('Select a date and time to continue')).toBeVisible();
  }
}