export default function imageLoader({ src }) {
  const basePath = '/Ai-finance-manager';
  return src.startsWith('http') ? src : `${basePath}${src}`;
} 