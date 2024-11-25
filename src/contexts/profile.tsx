'use client';

import { saveProfileCookie } from '@/actions/cookie';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ProfileContextProps = {
  profile: Profile | null;
  saveProfile: (profile: Profile) => Promise<void>;
};

export type Profile = {
  nota_cn: number;
  nota_ch: number;
  nota_l: number;
  nota_m: number;
  nota_r: number;
};

type ProfileProviderProps = {
  initialProfile: Profile | null;
  children: ReactNode;
};

const ProfileContext = createContext({} as ProfileContextProps);
export function ProfileProvider({
  children,
  initialProfile,
}: ProfileProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);

  const saveProfile = useCallback(
    async (data: Profile) => {
      setProfile(data);
      await saveProfileCookie(data);
    },
    [setProfile],
  );

  const data = useMemo(() => {
    return {
      profile,
      saveProfile,
    };
  }, [profile, saveProfile]);

  return (
    <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
