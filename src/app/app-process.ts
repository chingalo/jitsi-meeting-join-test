import { PuppeteerProcess } from '.';

export class AppProcess {
  constructor() {}

  async startProcess() {
    try {
      const puppeteerProcess = new PuppeteerProcess();
      await puppeteerProcess.startProcess();
    } catch (error: any) {
      console.log('Error in AppProcess:', error);
    }
  }
}
