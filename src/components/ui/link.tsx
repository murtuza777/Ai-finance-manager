import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

type CustomLinkProps = Omit<LinkProps, 'href'> & {
  href: string;
  children: React.ReactNode;
};

export const Link = ({ href, children, ...props }: CustomLinkProps) => {
  const router = useRouter();
  const basePath = '/Ai-finance-manager';
  
  // Now href is explicitly a string
  const fullHref = href.startsWith('http') || href.startsWith('#') 
    ? href 
    : `${basePath}${href}`;

  return <NextLink href={fullHref} {...props}>{children}</NextLink>;
}; 