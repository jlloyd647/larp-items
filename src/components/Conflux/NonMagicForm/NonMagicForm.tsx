import React from "react";
import AddNonMagic from "./AddNonMagic";
import NonMagicSelector from "@/components/Selectors/Conflux/NonMagicSelector";
import { useNonMagicItemStore } from "@/stores/ConfluxStores/useNonMagicStore";
import type { NonMagicItem } from "@/confluxTypes";

type NonMagicFormProps = {
  nonMagicItem: NonMagicItem;
};

const NonMagicForm: React.FC<NonMagicFormProps> = ({ nonMagicItem }) => {
  const nonMagicItems = useNonMagicItemStore((state) => state.nonMagicItems);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  return (
    <div className="flex flex-row gap-4">
      <div>
        <NonMagicSelector
          list={nonMagicItems}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>
      <div>
        {selectedId && (
          <AddNonMagic />
        )}
      </div>
    </div>
  );
};

export default NonMagicForm;
