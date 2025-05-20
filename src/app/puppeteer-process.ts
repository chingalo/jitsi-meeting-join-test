import puppeteer, { LaunchOptions, Page } from 'puppeteer';
import { faker } from '@faker-js/faker';
import {
  JOIN_BUTTOM_SELECTOR,
  MEETING_NAME,
  MEETING_URL,
  NAME_SELECTOR,
  NUMBER_OF_USERS,
  SCREENSHOT_HEIGHT,
  SCREENSHOT_WIDTH
} from '../constants';

export class PuppeteerProcess {
  constructor() {}

  async startProcess() {
    const names = this.getMeetingParticipants();
    console.log('Names:', names);
  
    for (const name of names) {
      const browser = await this.createPuppeteerBrowser(false);
      const page = await browser.newPage();
      this.joinTheMeeting(page, name);
    }
  }

  async joinTheMeeting(page: Page, name: string) {
    console.log('Joining the meeting with name:', name);
    await page.goto(`${MEETING_URL}/${encodeURIComponent(MEETING_NAME)}`, {
      waitUntil: 'networkidle2'
    });
    try {
      await page.waitForSelector(`${NAME_SELECTOR}`, { timeout: 15000 });
      await page.type(`${NAME_SELECTOR}`, name);
      await page.waitForSelector(`${JOIN_BUTTOM_SELECTOR}`, { timeout: 10000 });
      await page.click(`${JOIN_BUTTOM_SELECTOR}`);
      console.log(`Joined meeting '${MEETING_NAME}' as '${name}'`);
    } catch (error) {
      console.log('Error in joinTheMeeting:', error);
    }
  }

  getMeetingParticipants(): string[] {
    return Array.from({ length: NUMBER_OF_USERS }, () =>
      faker.person.fullName()
    );
  }

  async createPuppeteerBrowser(debug: boolean) {
    const defaultViewport = {
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT
    };
    const browserOptions: LaunchOptions = debug
      ? {
          headless: false,
          devtools: false,
          defaultViewport,
          args: [
            `--window-size=${SCREENSHOT_WIDTH},${SCREENSHOT_HEIGHT}`,
            `--window-position=${SCREENSHOT_HEIGHT},0`,
            '--no-sandbox',
            '--enable-gpu',
            '--use-fake-ui-for-media-stream',
            '--disable-setuid-sandbox'
          ]
        }
      : {
          headless: true,
          defaultViewport,
          args: [
            '--no-sandbox',
            '--enable-gpu',
            '--use-fake-ui-for-media-stream',
            '--disable-setuid-sandbox'
          ]
        };
    const browser = await puppeteer.launch(browserOptions);
    return browser;
  }
}
