import {getRequestConfig} from 'next-intl/server';
import {locales} from '@/navigation';
import {notFound} from 'next/navigation';
import fs from 'fs';
import path from 'path';
 
export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Use a more reliable way to find the messages directory
  // In Next.js, __dirname is available in server-side files
  const clientRoot = path.resolve(process.cwd());
  const messagesPath = path.join(clientRoot, 'messages', `${locale}.json`);
  
  let messages;
  try {
    const fileContent = fs.readFileSync(messagesPath, 'utf8');
    messages = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading messages for ${locale}:`, error);
    // Absolute fallback for dev
    const fallbackPath = path.join(clientRoot, 'messages', 'en.json');
    messages = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
  }

  return {
    locale,
    messages
  };
});
