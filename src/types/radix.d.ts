declare module '@radix-ui/react-avatar' {
  import * as React from 'react';
  
  export interface AvatarProps extends React.ComponentPropsWithoutRef<'span'> {
    ref?: React.Ref<HTMLSpanElement>;
  }
  
  export interface AvatarImageProps extends React.ComponentPropsWithoutRef<'img'> {
    ref?: React.Ref<HTMLImageElement>;
  }
  
  export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<'span'> {
    ref?: React.Ref<HTMLSpanElement>;
  }
  
  export const Root: React.ForwardRefExoticComponent<AvatarProps>;
  export const Image: React.ForwardRefExoticComponent<AvatarImageProps>;
  export const Fallback: React.ForwardRefExoticComponent<AvatarFallbackProps>;
}

declare module '@radix-ui/react-separator' {
  import * as React from 'react';
  
  export interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    ref?: React.Ref<HTMLDivElement>;
  }
  
  export const Root: React.ForwardRefExoticComponent<SeparatorProps>;
} 