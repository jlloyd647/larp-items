import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface AdminFormProps {
  adminView: boolean;
  setAdminView: (value: boolean) => void;
  printPlayerStub: boolean;
  setPrintPlayerStub: (value: boolean) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ adminView, setAdminView, printPlayerStub, setPrintPlayerStub }) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleAdminViewToggle = (checked: boolean) => {
    if (checked) {
      if (password === '12345') {
        setAdminView(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    } else {
      setAdminView(false);
      setError('');
    }
  };

  const handlePlayerStubToggle = (checked: boolean) => {
    if (checked) {
      if (password === '12345') {
        setPrintPlayerStub(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    } else {
      setPrintPlayerStub(false);
      setError('');
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Admin Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
          <div className="flex items-center gap-3">
            <Label htmlFor="admin-toggle">Admin Mode</Label>
            <Checkbox
              id="admin-toggle"
              checked={adminView}
              onCheckedChange={handleAdminViewToggle}
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="admin-toggle">Print Player Stub</Label>
            <Checkbox
              id="print-player-stub-toggle"
              checked={printPlayerStub}
              onCheckedChange={handlePlayerStubToggle}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <Label htmlFor="admin-password">Admin Password</Label>
            <span className="text-xs text-muted-foreground mb-1">Enter the admin password to enable admin mode and unlock restricted tabs.</span>
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full"
            />
            {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        {/* Add any admin actions here if needed */}
      </CardFooter>
    </Card>
  );
};

export default AdminForm;
