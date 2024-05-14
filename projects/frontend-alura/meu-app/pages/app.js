import '../styles/globals.css';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    background: {
      default: '#fff'  
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />  // Reset CSS e define o fundo padrão
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
