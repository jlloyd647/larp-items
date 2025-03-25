import type { Player } from '@/types';

type PlayerViewProps = {
  player: Player;
};

export const PlayerView = ({ player }: PlayerViewProps) => {
  return (
    <div className="space-y-2">
      <p><strong>Email:</strong> {player?.email ?? '—'}</p>
      <p><strong>Emergency Contact:</strong> {player?.emergencyContactName ?? '—'}</p>
      <p><strong>Contact Number:</strong> {player?.emergencyContactNumber ?? '—'}</p>
      <p><strong>Liability Waiver Signed:</strong> {player?.liabilityWaiverSigned ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default PlayerView;