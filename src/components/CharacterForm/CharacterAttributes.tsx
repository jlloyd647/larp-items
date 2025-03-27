import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useSpellStore } from '@/stores/useSpellStore';
import type { Character } from "@/types";
import CharacterSpellList from "./CharacterSpellList";
import CharacterSkillList from "./CharacterSkills";
import CharacterBoonList from "./CharacterBoonList";

type CharacterAttributesProps = {
  character: Character;
  getSkillNameWithRank: (skillId: number, rank: number) => string;
};

const CharacterAttributes = ({
  character,
  getSkillNameWithRank,
}: CharacterAttributesProps) => {
  const getSpellById = useSpellStore((state) => state.getSpellById);
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="skills">
          <TabsList className="mb-4 flex flex-wrap gap-2">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="magic">Magic</TabsTrigger>
            <TabsTrigger value="boons">Boons</TabsTrigger>
            <TabsTrigger value="banes">Banes</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <CharacterSkillList character={character} getSkillNameWithRank={getSkillNameWithRank} />
          </TabsContent>

          {/* Magic Tab */}
          <TabsContent value="magic">
            <CharacterSpellList character={character} />
          </TabsContent>

          {/* Boons Tab */}
          <TabsContent value="boons">
            <CharacterBoonList character={character} />
          </TabsContent>

          {/* Banes Tab */}
          <TabsContent value="banes">
            <p className="text-sm text-muted-foreground mb-2">Banes</p>
            <div className="text-sm text-muted">No banes assigned yet.</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CharacterAttributes;
