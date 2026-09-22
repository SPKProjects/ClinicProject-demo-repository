import { expect, Page } from '@playwright/test';

export class LandingPage {
  constructor(private readonly page: Page) {}

  private async skipTour(): Promise<void> {
    const skipTourButton = this.page.getByRole('button', { name: 'Skip tour' });

    if (await skipTourButton.isVisible().catch(() => false)) {
      await skipTourButton.click();
    }
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.skipTour();
  }

  async openClinic(): Promise<void> {
    await this.page.getByRole('link', { name: 'Open the Clinic app' }).click();
    await expect(this.page).toHaveURL(/\/clinic$/);
  }
}