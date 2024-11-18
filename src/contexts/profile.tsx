'use client';

import { saveProfileCookie } from '@/actions/cookie';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ProfileContextProps = {
  profile: Profile | null;
  setProfile: Dispatch<SetStateAction<Profile | null>>;
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

  useEffect(() => {
    (async () => {
      if (profile) {
        await saveProfileCookie(profile);
      }
    })();
  }, [profile]);

  const data = useMemo(() => {
    return {
      profile,
      setProfile,
    };
  }, [profile, setProfile]);

  return (
    <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
