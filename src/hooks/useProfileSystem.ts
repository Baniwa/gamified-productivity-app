import { useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  avatarUrl: string;
  className: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Sung Jin-Woo',
  avatarUrl: 'https://i.pinimg.com/736x/8e/3c/6f/8e3c6f4a860367bf6fc2cb3f0907e5f3.jpg',
  className: 'Shadow Monarch'
};

export function useProfileSystem() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('questlog_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('questlog_profile', JSON.stringify(newProfile));
  };

  return {
    profile,
    updateProfile,
    isLoaded
  };
}
