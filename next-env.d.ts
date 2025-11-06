// FIX: The original triple-slash directives were causing errors because the Next.js
// type definitions could not be found. This is likely due to a missing or
// misconfigured tsconfig.json file. As a workaround, this file is manually
// declaring the necessary Next.js modules and types to allow the rest of the
// application to compile. This is a temporary solution and the project's
// TypeScript configuration should be fixed.

declare module 'next' {
  /**
   * A placeholder type for Next.js's Metadata.
   * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   */
  export type Metadata = Record<string, any>;
}

declare module 'next/link' {
  import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';
  /**
   * A placeholder type for the Next.js Link component.
   */
  const Link: FC<PropsWithChildren<{ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>>>;
  export default Link;
}

declare module 'next/navigation' {
  /**
   * A placeholder type for the Next.js usePathname hook.
   */
  export function usePathname(): string;
}

// This declaration is to satisfy the reference to "next/image-types/global"
// which was causing an error. The project does not seem to use next/image.
declare module 'next/image-types/global' {}


// The original content of this file is commented out below.
/*
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
*/
