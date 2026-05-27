import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const MESSAGES_DIR = join(process.cwd(), 'messages');
const SOURCE_LOCALE = 'en.json';

function getNestedKeys(obj: any, prefix = ''): string[] {
  return Object.keys(obj).reduce((res: string[], el) => {
    if (Array.isArray(obj[el])) return res;
    if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...getNestedKeys(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);
}

function getValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function setValue(obj: any, path: string, value: any) {
  const parts = path.split('.');
  const last = parts.pop()!;
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {};
    return acc[part];
  }, obj);
  target[last] = value;
}

const sourceContent = JSON.parse(readFileSync(join(MESSAGES_DIR, SOURCE_LOCALE), 'utf-8'));
const sourceKeys = getNestedKeys(sourceContent);

const files = readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json') && f !== SOURCE_LOCALE);

console.log('🔍 Checking locale synchronization...');

files.forEach(file => {
  const filePath = join(MESSAGES_DIR, file);
  const targetContent = JSON.parse(readFileSync(filePath, 'utf-8'));
  const targetKeys = getNestedKeys(targetContent);

  const missingKeys = sourceKeys.filter(key => !targetKeys.includes(key));

  if (missingKeys.length > 0) {
    console.log(`\nFound ${missingKeys.length} missing keys in ${file}:`);
    missingKeys.forEach(key => {
      const originalValue = getValue(sourceContent, key);
      console.log(` - ${key}: "${originalValue}"`);
      // For now, we add placeholders. In a real AI script, you'd replace this with an API call.
      setValue(targetContent, key, `MISSING: ${originalValue}`);
    });

    // Sort keys to match order if desired, here we just write back
    writeFileSync(filePath, JSON.stringify(targetContent, null, 2), 'utf-8');
    console.log(`✅ Updated ${file} with missing keys marked.`);
  } else {
    console.log(`✨ ${file} is fully synchronized.`);
  }
});
