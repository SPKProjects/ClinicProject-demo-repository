import { expect, Page } from '@playwright/test';

export class DoctorProfilePage {
  constructor(private readonly page: Page) {}

  async expectDoctor(doctorName: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: doctorName })).toBeVisible();
  }

  async getDetails(): Promise<{ specialty: string; clinicName: string }> {
    const profile = this.page.locator('main article').first();
    const lines = (await profile.innerText()).split('\n').map((line) => line.trim()).filter(Boolean);
    const clinicName = await this.page
      .getByText('Clinic', { exact: true })
      .locator('xpath=following-sibling::dd[1]')
      .textContent();

    return { specialty: lines[1], clinicName: clinicName?.trim() ?? '' };
  }

  async bookAppointment(doctorName: string): Promise<void> {
    await this.page.getByRole('link', { name: new RegExp(`Book appointment with ${doctorName}`) }).click();
  }
}