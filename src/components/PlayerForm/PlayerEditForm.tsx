'use client';

import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import type { Player } from '@/types';
import { usePlayerStore } from '@/stores/usePlayerStore';

type PlayerEditFormProps = {
  playerId: number;
};

export const PlayerEditForm = ({ playerId }: PlayerEditFormProps) => {
  const player = usePlayerStore((state) =>
    state.players.find((p) => Number(p.id) === playerId)
  );

  const [name, setName] = useState(player?.name ?? '');
  const [email, setEmail] = useState(player?.email ?? '');
  const [emergencyContactName, setEmergencyContactName] = useState(player?.emergencyContactName ?? '');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(player?.emergencyContactNumber ?? '');
  const [waiverSigned, setWaiverSigned] = useState(player?.liabilityWaiverSigned ?? false);
  const [inactive, setInactive] = useState(player?.inactive ?? false);
  const [isDirty, setIsDirty] = useState(false);

  const updatePlayer = usePlayerStore((state) => state.updatePlayer);

  useEffect(() => {
    if (!player) return;

    const dirty =
      name !== player.name ||
      email !== (player.email ?? '') ||
      emergencyContactName !== (player.emergencyContactName ?? '') ||
      emergencyContactNumber !== (player.emergencyContactNumber ?? '') ||
      waiverSigned !== (player.liabilityWaiverSigned ?? false) ||
      inactive !== (player.inactive ?? false);

    setIsDirty(dirty);
  }, [name, email, emergencyContactName, emergencyContactNumber, waiverSigned, inactive, player]);

  useEffect(() => {
    if (!player) return;

    setName(player.name);
    setEmail(player.email ?? '');
    setEmergencyContactName(player.emergencyContactName ?? '');
    setEmergencyContactNumber(player.emergencyContactNumber ?? '');
    setWaiverSigned(player.liabilityWaiverSigned ?? false);
    setInactive(player.inactive ?? false);
  }, [player]);

  const handleSave = () => {
    if (!player) return;

    const updatedPlayer: Player = {
      ...player,
      name,
      email,
      emergencyContactName,
      emergencyContactNumber,
      liabilityWaiverSigned: waiverSigned,
      inactive,
    };

    updatePlayer(updatedPlayer);
    setIsDirty(false);
  };

  if (!player) return null;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Row 2: Emergency Contact Name + Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Row 3: Waiver */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="waiver"
          checked={waiverSigned}
          onCheckedChange={(checked) => setWaiverSigned(!!checked)}
        />
        <Label htmlFor="waiver">Liability Waiver Signed</Label>
      </div>

      {/* Row 4: Inactive checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inactive"
          checked={inactive}
          onCheckedChange={(checked) => setInactive(!!checked)}
        />
        <Label htmlFor="inactive">Inactive</Label>
      </div>

      {/* Save Button: bottom right */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={!isDirty}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PlayerEditForm;
