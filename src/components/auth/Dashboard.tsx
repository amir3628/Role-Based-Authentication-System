import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { LogOut, User, Shield, Settings, Users, BarChart3, FileText, Bell } from 'lucide-react';

const AdminPanel = () => (
  <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <CardTitle className="text-lg">Admin Panel</CardTitle>
      </div>
      <CardDescription>Manage your application</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <Users className="h-4 w-4" />
          <span>Users</span>
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <FileText className="h-4 w-4" />
          <span>Logs</span>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const UserPanel = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">User Dashboard</CardTitle>
      </div>
      <CardDescription>Your personal workspace</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-auto py-3">
          <FileText className="h-4 w-4" />
          <span>Documents</span>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { user, logout, isLoading, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully', {
      description: 'See you next time!',
    });
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="shadow-xl border-border/50 bg-card/95 backdrop-blur">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl capitalize">{user.name}</CardTitle>
                <CardDescription className="text-sm">{user.email}</CardDescription>
              </div>
            </div>
            <Badge 
              variant={isAdmin ? 'default' : 'secondary'}
              className={isAdmin ? 'bg-amber-500 hover:bg-amber-600' : ''}
            >
              {isAdmin ? (
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Admin
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  User
                </span>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Logging out...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
};
