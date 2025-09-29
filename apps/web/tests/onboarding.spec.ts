import { test, expect } from '@playwright/test';

test.describe('Buddy AI Onboarding Flow', () => {
  test('should complete onboarding flow', async ({ page }) => {
    await page.goto('/');

    // Check if we're on the onboarding page
    await expect(page.getByText('Hallo! Ik ben je AI Job Buddy')).toBeVisible();
    await expect(page.getByText('Vraag 1 van 5')).toBeVisible();

    // Answer first question
    await page.getByRole('button', { name: 'Software Developer' }).click();
    await expect(page.getByText('Vraag 2 van 5')).toBeVisible();

    // Answer second question
    await page.getByRole('button', { name: '€50.000 - €60.000' }).click();
    await expect(page.getByText('Vraag 3 van 5')).toBeVisible();

    // Answer third question
    await page.getByRole('button', { name: '15-30 minuten' }).click();
    await expect(page.getByText('Vraag 4 van 5')).toBeVisible();

    // Answer fourth question
    await page.getByRole('button', { name: 'Carrièremogelijkheden' }).click();
    await expect(page.getByText('Vraag 5 van 5')).toBeVisible();

    // Answer fifth question
    await page.getByRole('button', { name: '3-5 jaar' }).click();

    // Check completion screen
    await expect(page.getByText('Perfect! We hebben je profiel opgebouwd')).toBeVisible();
    await expect(page.getByText('327 relevante vacatures')).toBeVisible();
    await expect(page.getByText('Maak account aan')).toBeVisible();
  });

  test('should navigate to jobs page from completion screen', async ({ page }) => {
    await page.goto('/');

    // Complete onboarding quickly
    await page.getByRole('button', { name: 'Software Developer' }).click();
    await page.getByRole('button', { name: '€50.000 - €60.000' }).click();
    await page.getByRole('button', { name: '15-30 minuten' }).click();
    await page.getByRole('button', { name: 'Carrièremogelijkheden' }).click();
    await page.getByRole('button', { name: '3-5 jaar' }).click();

    // Click to view jobs
    await page.getByRole('button', { name: 'Bekijk vacatures (beperkt)' }).click();

    // Should be on jobs page
    await expect(page.getByText('Je persoonlijke job matches')).toBeVisible();
    await expect(page.getByText('Op basis van je profiel hebben we')).toBeVisible();
  });

  test('should navigate to signup from completion screen', async ({ page }) => {
    await page.goto('/');

    // Complete onboarding quickly
    await page.getByRole('button', { name: 'Software Developer' }).click();
    await page.getByRole('button', { name: '€50.000 - €60.000' }).click();
    await page.getByRole('button', { name: '15-30 minuten' }).click();
    await page.getByRole('button', { name: 'Carrièremogelijkheden' }).click();
    await page.getByRole('button', { name: '3-5 jaar' }).click();

    // Click to create account
    await page.getByRole('button', { name: 'Maak account aan' }).click();

    // Should be on signup page
    await expect(page.getByText('Maak je account aan')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'E-mailadres' })).toBeVisible();
  });
});
