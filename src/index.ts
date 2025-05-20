import { AppProcess } from './app/app-process';

starApp();

async function starApp() {
  try {
    await new AppProcess().startProcess();
  } catch (error: any) {
    error = error.message || error;
    console.log({ error });
  }
}
