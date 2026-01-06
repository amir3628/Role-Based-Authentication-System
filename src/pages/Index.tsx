import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Dashboard } from '@/components/auth/Dashboard';

type AuthView = 'login' | 'signup' | 'forgot-password' | 'reset-password';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  // In real app, this would come from URL params
  const [resetToken] = useState<string>('mock-reset-token');

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
        <div className="w-full">
          <Dashboard />
        </div>
      </div>
    );
  }

  const renderAuthView = () => {
    switch (authView) {
      case 'signup':
        return <SignupForm onSwitchToLogin={() => setAuthView('login')} />;
      case 'forgot-password':
        return <ForgotPasswordForm onBackToLogin={() => setAuthView('login')} />;
      case 'reset-password':
        return (
          <ResetPasswordForm
            token={resetToken}
            onSuccess={() => setAuthView('login')}
            onBackToLogin={() => setAuthView('login')}
          />
        );
      default:
        return (
          <LoginForm
            onSwitchToSignup={() => setAuthView('signup')}
            onForgotPassword={() => setAuthView('forgot-password')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full">
        {renderAuthView()}
      </div>
    </div>
  );
};

export default Index;
