export const fetcher = async (url: string, headerValue: object) => {
  const response = await fetch(url, headerValue);
  return response.json();
};
