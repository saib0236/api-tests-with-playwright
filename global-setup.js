import { startServer } from './server-manager';

export default async () => {
  console.log('🚀 Starting FastAPI server...');
  await startServer();
};
