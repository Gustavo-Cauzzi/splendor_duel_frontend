import { AppRouter } from "./routes";
import { ThemeProvider } from "./shared/theme";
import { store } from "./shared/store/store";
import { Provider } from "react-redux";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
