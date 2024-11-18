import theme from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
            <CssBaseline />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
