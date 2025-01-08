import { MenuResponse } from '../types/menu';

export async function fetchMenu(lang: string): Promise<MenuResponse> {
  const response = await fetch(`/api/menu`, {
    method: 'GET',
    headers: {
      'Accept-Language': lang,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch menu data: ${response.status} ${response.statusText}`);
  }

  return response.json();
} 