import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import App from "./App";

const Page = () => {
  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <App />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Page />
    </AdaptivityProvider>
  </ConfigProvider>
);
