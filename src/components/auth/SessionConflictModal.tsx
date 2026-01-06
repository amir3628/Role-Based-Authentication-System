import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Monitor, AlertTriangle } from 'lucide-react';

interface SessionConflictModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const SessionConflictModal: React.FC<SessionConflictModalProps> = ({
  isOpen,
  onCancel,
  onContinue,
  isLoading = false,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <AlertTriangle className="h-7 w-7 text-amber-600 dark:text-amber-400" />
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Active Session Detected
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Monitor className="h-4 w-4" />
              <span>Another device is currently logged in</span>
            </div>
            <p>
              You are already logged in on another device. Do you want to continue and log out from the active session?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <AlertDialogAction
            onClick={onContinue}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Logging in...' : 'Continue & Logout Other Session'}
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isLoading}
            className="w-full mt-0"
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
