import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ion.cap.background.api.notification',
  appName: 'Background Api Notification',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    BackgroundRunner: {
      label: 'ion.cap.background.api.notification.apinotification',
      src: 'runners/runner.js',
      event: 'getMessageBySeniorCitizen',
      repeat: true,
      interval: 1,
      autoStart: true,
    },
  },
};

export default config;
