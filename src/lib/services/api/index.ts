
export async function fetchAPI<T>(endpoint: string, handle404AsNull = false): Promise<T | null> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404 && handle404AsNull) {
        console.log(`404 Not Found for ${endpoint} - returning null`);
        return null;
      }
      const message = `Error fetching ${endpoint}: ${res.status} ${res.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return await res.json() as T;
  } catch (error) {
    if (handle404AsNull && error instanceof TypeError) {
      console.log(`Network/Parse error for ${endpoint} - returning null`);
      return null;
    }
    
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
