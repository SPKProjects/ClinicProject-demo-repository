import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private async skipTour(): Promise<void> {
    const skipTourButton = this.page.getByRole('button', { name: 'Skip tour' });

    if (await skipTourButton.isVisible().catch(() => false)) {
      await skipTourButton.click();
    }
  }

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign in' }).click();
    await expect(this.page).toHaveURL(/\/login$/);
    await this.skipTour();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByText('Logged in successfully')).toBeVisible();
  }
}