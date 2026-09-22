import { expect, Page } from '@playwright/test';

export class ClinicPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/clinic');
    await expect(this.page).toHaveURL(/\/clinic$/);
  }

  async openDoctors(): Promise<void> {
    await this.page.getByTestId('clinic-nav-doctors').click();
    await expect(this.page).toHaveURL(/\/clinic\/doctors$/);
  }

  async openAppointments(): Promise<void> {
    await this.page.getByTestId('clinic-nav-appointments').click();
    await expect(this.page).toHaveURL(/\/clinic\/appointments$/);
  }
}