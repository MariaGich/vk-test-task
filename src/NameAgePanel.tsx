import { Button, Group, Panel, PanelHeader } from "@vkontakte/vkui";
import AgeForm from "./components/AgeForm";

function NameAgePanel({
  setActivePanel,
  id,
}: {
  setActivePanel: (_: string) => void;
  id: string;
}) {
  return (
    <Panel id={id}>
      <PanelHeader>Давай узнаем твой возраст!</PanelHeader>
      <Button
        style={{ width: 150, margin: "15px 0" }}
        mode="secondary"
        onClick={() => setActivePanel("catPanel")}
      >
        Факт про котика
      </Button>
      <Group>
        <AgeForm />
      </Group>
    </Panel>
  );
}

export default NameAgePanel;
