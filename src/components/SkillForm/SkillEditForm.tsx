import { useSkillStore } from '@/stores/useSkillStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import type { Skill } from '@/types';
import { set } from 'react-hook-form';

type SkillEditFormProps = {
  skillId: number;
};

const categoryOptions = ["Adaptability", "Combat", "Gunslinger", "Doctoring", "Social", "Espionage", "Production"];

const SkillEditForm = ({ skillId }: SkillEditFormProps) => {
  const skill = useSkillStore((state) =>
    state.skills.find((s) => s.id === skillId)
  );
  const updateSkill = useSkillStore((state) => state.updateSkill);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Combat');
  const [xpCost, setXpCost] = useState(0);
  const [ranks, setRanks] = useState(1);
  const [skillCost, setSkillCost] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setDesc(skill.desc);
      setCategory(skill.category);
      setXpCost(skill.xpCost);
      setRanks(skill.ranks);
      setSkillCost(skill.skillCost);
      setHasChanges(false); // reset change flag when loading
    }
  }, [skill]);

  useEffect(() => {
    if (skill) {
      console.log('Skill loaded:', skill);
      setCategory(skill.category);
    }
  }, [skill]);

  // Watch for form changes
  useEffect(() => {
    if (!skill) return;
    const changed =
      name !== skill.name ||
      desc !== skill.desc ||
      category !== skill.category ||
      xpCost !== skill.xpCost ||
      ranks !== skill.ranks ||
      skillCost !== skill.skillCost;

    setHasChanges(changed);
  }, [name, desc, xpCost, ranks, skillCost, skill]);

  const handleSave = () => {
    if (!skill || !hasChanges) return;

    updateSkill({
      ...skill,
      name,
      desc,
      xpCost: Number(xpCost),
      ranks: Number(ranks),
      skillCost: Number(skillCost),
    });

    setHasChanges(false);
  };

  if (!skill) return <p className="text-sm text-destructive">Skill not found.</p>;

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label htmlFor="skill-name">Name</Label>
        <Input
          id="skill-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="skill-desc">Description</Label>
        <Textarea
          id="skill-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Category</Label>
        <div className="flex gap-2">
          {categoryOptions.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "ghost"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="xp-cost">XP Cost</Label>
        <Input
          id="xp-cost"
          type="number"
          value={xpCost}
          onChange={(e) => setXpCost(Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="ranks">Ranks</Label>
        <Input
          id="ranks"
          type="number"
          value={ranks}
          onChange={(e) => setRanks(Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="skill-cost">Skill Cost</Label>
        <Input
          id="skill-cost"
          type="number"
          value={skillCost}
          onChange={(e) => setSkillCost(Number(e.target.value))}
        />
      </div>

      <Button
        type="button"
        onClick={handleSave}
        className="w-full mt-4"
        disabled={!hasChanges}
      >
        💾 Save Skill
      </Button>
    </form>
  );
};

export default SkillEditForm;
