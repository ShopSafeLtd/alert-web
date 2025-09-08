import type { Context } from 'https://edge.netlify.com';

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Only handle /api/* paths
  if (!url.pathname.startsWith('/api/')) {
    return;
  }

  // Build the target URL - replace /api/ with the Azure base URL
  const targetPath = url.pathname.replace('/api/', '/');
  const targetUrl = `https://shopsafe-alert.azurewebsites.net${targetPath}${url.search}`;

  try {
    // Forward the request with all original headers and body
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      // Forward credentials if needed
      ...(request.method !== 'GET' &&
        request.method !== 'HEAD' && { duplex: 'half' }),
    });

    // Return the response with original headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return new Response('API proxy error', { status: 502 });
  }
};

export const config = {
  path: "/api/*"
};
