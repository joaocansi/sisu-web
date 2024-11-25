'use client';

import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

type SnackbarContainerProps = {
  children: ReactNode;
};

export default function SnackbarContainer({
  children,
}: SnackbarContainerProps) {
  return <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>;
}
