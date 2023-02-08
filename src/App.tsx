import { AppRouter } from "./routes";
import { ThemeProvider } from "./shared/theme";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
