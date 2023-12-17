import { CssBaseline, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import { SelectLanguage } from "./components/SelectLanguage";
import {
  LanguageContext,
  LanguageContextProvider,
} from "./contexts/language-context";
import { ToastContextProvider } from "./contexts/toast-context";
import { PasswordInput } from "./components/PasswordInput";
import { PasswordControls } from "./components/PasswordControls";
import { EncryptMessage } from "./components/EncryptMessage";
import { DecryptMessage } from "./components/DecryptMessage";
import { ShareEncryptedButton } from "./components/ShareEncryptedButton";
import { PasswordContextProvider } from "./contexts/password-context";
import { MessageContextProvider } from "./contexts/message-context";
import { useMediaQuery } from "./hooks/use-media-query";
import { ThemeContextProvider } from "./contexts/theme-context";
import { SelectTheme } from "./components/SelectTheme";

function App() {
  const { isLessThanSmScreen } = useMediaQuery();

  const { l } = useContext(LanguageContext);

  const shareButton = <ShareEncryptedButton />;

  const content = (
    <Grid container spacing={2} p={2}>
      {!isLessThanSmScreen ? <Grid item xs={0} sm={8}></Grid> : null}

      <Grid item xs={6} sm={2}>
        <SelectTheme />
      </Grid>
      <Grid item xs={6} sm={2}>
        <SelectLanguage />
      </Grid>

      {isLessThanSmScreen ? (
        <Grid item xs={12}>
          <Divider />
        </Grid>
      ) : null}

      <Grid item xs={12} sm={6}>
        <PasswordInput />
      </Grid>

      <Grid item xs={12} sm={6} container spacing={2}>
        <PasswordControls />
      </Grid>

      <Grid item xs={12}>
        <Divider>{isLessThanSmScreen ? l.actions.encrypt : ""}</Divider>
      </Grid>

      <Grid item xs={12} sm={6} container spacing={2}>
        <EncryptMessage />
      </Grid>

      {isLessThanSmScreen ? (
        <Grid item xs={12} sm={6}>
          {shareButton}
        </Grid>
      ) : null}

      {isLessThanSmScreen ? (
        <Grid item xs={12}>
          <Divider>{l.actions.decrypt}</Divider>
        </Grid>
      ) : null}

      <Grid item xs={12} sm={6} container spacing={2}>
        <DecryptMessage />
      </Grid>

      {!isLessThanSmScreen ? (
        <Grid item xs={12} sm={6}>
          {shareButton}
        </Grid>
      ) : null}
    </Grid>
  );

  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <ToastContextProvider>
          <PasswordContextProvider>
            <MessageContextProvider>
              <CssBaseline />
              {content}
            </MessageContextProvider>
          </PasswordContextProvider>
        </ToastContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
