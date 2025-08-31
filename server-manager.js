import  { spawn } from 'child_process';
import { resolve as _resolve } from 'path';
import { get } from 'http';

let serverProcess = null;

export function waitForServerReady(url, timeout = 10000, interval = 500) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      get(url, (res) => {
        if (res.statusCode === 200) resolve();
        else retry();
      }).on('error', retry);
    };
    const retry = () => {
      if (Date.now() - start > timeout) {
        reject(new Error('Timed out waiting for server to be ready'));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}

export function startServer() {
  return new Promise((resolve, reject) => {
    const cwd = _resolve(__dirname, 'bookstore');
    const command = 'py';
    const args = ['-m', 'uvicorn', 'main:app', '--reload'];

    try {
      serverProcess = spawn(command, args, {
        cwd,
        stdio: ['ignore', 'pipe', 'pipe'], // No shell
      });
    } catch (error) {
      console.error('❌ Failed to spawn process:', error);
      reject(error);
      return;
    }

    if (!serverProcess || !serverProcess.stdout) {
      reject(new Error('❌ Failed to start FastAPI server (no process or stdout)'));
      return;
    }

    serverProcess.stdout.on('data', (data) => {
      console.log(`[Server] ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
      console.log(`[Server] ${data}`);
    });

    serverProcess.on('error', (err) => {
      console.error('❌ Server process error:', err);
      reject(err);
    });

    waitForServerReady('http://127.0.0.1:8000/health')
      .then(() => {
        console.log('✅ FastAPI server is ready!');
        resolve();
      })
      .catch((err) => {
        console.error('❌ Server did not become ready:', err);
        reject(err);
      });
  });
}

export function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
    console.log('🛑 Server stopped.');
  }
}

