export default function handler(_req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const paused =
    String(process.env.GOOGLE_MAPS_PAUSED || '').toLowerCase() === 'true' ||
    String(process.env.VITE_GOOGLE_MAPS_PAUSED || '').toLowerCase() === 'true';
  if (paused) {
    return res.status(200).json({
      apiKey: '',
      configured: false,
      paused: true,
    });
  }
  const apiKey =
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  return res.status(200).json({
    apiKey,
    configured: Boolean(apiKey),
    paused: false,
  });
}
