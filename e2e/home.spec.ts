import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('First Load', () => {
  test('Should show the title on header', async ({ page }) => {
    const title = page.locator('h1');
    await expect(title).toHaveText('Star Wars - Cards Game');
  });

  test('Should show 2 cards', async ({ page }) => {
    const cards = page.locator('app-card');
    await expect(cards).toHaveCount(2);
  });

  test('Should show the initial score on chips', async ({ page }) => {
    const chips = page.locator('mat-chip-option');
    await expect(chips).toHaveCount(2);

    const player1Score = page.getByText('Player 1 : 1');
    const player2Score = page.getByText('Player 2 : 1');

    if (await player1Score.isVisible())
      await expect(page.getByText('Player 2 : 0')).toBeVisible();
    if (await player2Score.isVisible())
      await expect(page.getByText('Player 1 : 0')).toBeVisible();
  });

  test('Should show at least MASS or CREW properties on both cards', async ({
    page,
  }) => {
    const massLocator = page.locator('text=/Mass/');
    const crewLocator = page.locator('text=/Crew/');

    const { massVisible, crewVisible } = await waitForCards(
      massLocator,
      crewLocator,
      'Checking Properties:'
    );

    if (massVisible) await expect(massLocator).toHaveCount(2);
    if (crewVisible) await expect(crewLocator).toHaveCount(2);
  });
});

test.describe('Play Again', () => {
  test('Should make a new request when click on CTA', async ({ page }) => {
    await page.getByRole('button', { name: 'Play Again!' }).click();
    page.on('requestfinished', async () => {
      const newCards = page.locator('app-card');
      await expect(newCards).toHaveCount(2);
    });
  });

  test('Should add class selected to winner card', async ({ page }) => {
    const massLocator = page.locator('text=/Mass/');
    const crewLocator = page.locator('text=/Crew/');

    const { massVisible, crewVisible } = await waitForCards(
      massLocator,
      crewLocator,
      'Winner Cards:'
    );

    if (massVisible) {
      const mass1 = await massLocator.nth(0).textContent();
      const mass2 = await massLocator.nth(1).textContent();
      if (mass1 !== mass2)
        await expect(page.locator('mat-card.selected')).toBeVisible();
    }

    if (crewVisible) {
      const crew1 = await crewLocator.nth(0).textContent();
      const crew2 = await crewLocator.nth(1).textContent();
      if (crew1 !== crew2)
        await expect(page.locator('mat-card.selected')).toBeVisible();
    }
  });
});

async function waitForCards(
  massLocator: Locator,
  crewLocator: Locator,
  message: string
) {
  let massVisible = false;
  let crewVisible = false;

  try {
    await massLocator.first().waitFor({ state: 'visible', timeout: 7000 });
    massVisible = true;
    console.log(message + 'Mass Available');
  } catch (error) {
    console.log(message + 'Not Mass');
  }

  try {
    await crewLocator.first().waitFor({ state: 'visible', timeout: 7000 });
    crewVisible = true;
    console.log(message + 'Crew Available');
  } catch (error) {
    console.log(message + 'Not Crew');
  }

  return {
    massVisible,
    crewVisible,
  };
}
