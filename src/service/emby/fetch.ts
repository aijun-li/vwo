import { fetch } from '@tauri-apps/plugin-http';
import { camelCase, mapKeys } from 'lodash-es';

export async function embyFetch(input: RequestInfo | URL, init?: RequestInit) {
  const result = await fetch(input, init);

  result.json = async () => {
    const raw = await result.text();
    console.log('raw', raw);
    return JSON.parse(raw, (_, value) => {
      if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
        return mapKeys(value, (_, key) => camelCase(key));
      } else {
        return value;
      }
    });
  };

  return result;
}
