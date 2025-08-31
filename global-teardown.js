import { stopServer } from './server-manager';

export default async () => {
  console.log('🧹 Stopping FastAPI server...');
  stopServer();
};
