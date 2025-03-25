'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import type { Player } from '@/types';
import { usePlayerStore } from '@/stores/usePlayerStore';

type PlayerEditFormProps = {
  player: Player;
};

export const PlayerEditForm = ({ player }: PlayerEditFormProps) => {
  const [name, setName] = useState(player.name);
  const [email, setEmail] = useState(player.email ?? '');
  const [emergencyContactName, setEmergencyContactName] = useState(player.emergencyContactName ?? '');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(player.emergencyContactNumber ?? '');
  const [waiverSigned, setWaiverSigned] = useState(player.liabilityWaiverSigned ?? false);

  const updatePlayer = usePlayerStore((state) => state.updatePlayer);

  const handleSave = () => {
    const updatedPlayer: Player = {
      ...player,
      name,
      email,
      emergencyContactName,
      emergencyContactNumber,
      liabilityWaiverSigned: waiverSigned,
    };

    updatePlayer(updatedPlayer);
    // You could also add a toast or visual confirmation here
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="emergencyName">Emergency Contact Name</Label>
        <Input
          id="emergencyName"
          value={emergencyContactName}
          onChange={(e) => setEmergencyContactName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
        <Input
          id="emergencyNumber"
          value={emergencyContactNumber}
          onChange={(e) => setEmergencyContactNumber(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="waiver"
          checked={waiverSigned}
          onCheckedChange={(checked) => setWaiverSigned(!!checked)}
        />
        <Label htmlFor="waiver">Liability Waiver Signed</Label>
      </div>

      <div className="pt-4">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default PlayerEditForm;
