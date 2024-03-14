import { Button, Group, Panel, PanelHeader } from "@vkontakte/vkui";
import CatForm from "./components/CatForm";

function CatFactPanel({
  setActivePanel,
  id,
}: {
  setActivePanel: (_: string) => void;
  id: string;
}) {
  return (
    <Panel id={id}>
      <PanelHeader>Факт про котиков! </PanelHeader>
      <Button
        mode="secondary"
        style={{ width: 150, margin: "15px 0" }}
        onClick={() => setActivePanel("agePanel")}
      >
        Сколько лет?...
      </Button>
      <Group>
        <CatForm />
      </Group>
    </Panel>
  );
}

export default CatFactPanel;
