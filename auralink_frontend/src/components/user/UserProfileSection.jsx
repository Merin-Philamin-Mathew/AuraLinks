import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { logoutUser } from '@/redux/userSlice';
import { persistor } from '@/redux/store';

const UserProfileSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_details } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    persistor.flush();
    navigate('/');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer hover:bg-accent/10 rounded-lg p-2">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src={user_details?.avatar_url} alt={user_details?.display_name} />
            <AvatarFallback>{user_details?.display_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-foreground">{user_details?.display_name}</div>
            <div className="text-xs text-muted-foreground">{user_details?.email}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-4 py-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user_details?.avatar_url} alt={user_details?.display_name} />
            <AvatarFallback>{user_details?.display_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user_details?.display_name}</h3>
            <p className="text-sm text-muted-foreground">{user_details?.email}</p>
            <p className="text-sm text-muted-foreground">@{user_details?.username}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => navigate('/settings')}>
            Account Settings
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileSection;