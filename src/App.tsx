import { useState } from "react";
import { View } from "@vkontakte/vkui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CatFactPanel from "./CatFactPanel";
import NameAgePanel from "./NameAgePanel";

function App() {
  const [activePanel, setActivePanel] = useState("catPanel");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View activePanel={activePanel}>
        <CatFactPanel setActivePanel={setActivePanel} id="catPanel" />
        <NameAgePanel setActivePanel={setActivePanel} id="agePanel" />
      </View>
    </QueryClientProvider>
  );
}

export default App;
