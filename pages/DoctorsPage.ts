import { expect, Locator, Page } from '@playwright/test';

export class DoctorsPage {
  readonly doctorRows: Locator;

  constructor(private readonly page: Page) {
    this.doctorRows = page.locator('main article');
  }

  async expectNavigation(): Promise<void> {
    await expect(this.page.getByTestId('clinic-nav-home')).toBeVisible();
    await expect(this.page.getByTestId('clinic-nav-doctors')).toBeVisible();
    await expect(this.page.getByTestId('clinic-nav-appointments')).toBeVisible();
  }

  async count(): Promise<number> {
    const countLabel = this.page.getByText(/^\d+ doctors?$/);
    await expect(countLabel).toBeVisible();
    return Number.parseInt((await countLabel.textContent()) ?? '', 10);
  }

  async search(searchText: string): Promise<void> {
    await this.page.getByPlaceholder('Search by name, clinic, or specialty').fill(searchText);
  }

  async openDoctor(doctorName: string): Promise<void> {
    const doctor = this.doctorRows.filter({ hasText: doctorName });
    await expect(doctor).toHaveCount(1);
    await doctor.locator('.clinic-btn-ghost').click();
    await expect(this.page).toHaveURL(/\/clinic\/doctors\//);
  }
}