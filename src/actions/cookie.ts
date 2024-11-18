'use server';

import { cookies } from 'next/headers';

type Profile = {
  nota_cn: number;
  nota_ch: number;
  nota_l: number;
  nota_m: number;
  nota_r: number;
};

export async function saveProfileCookie(data: Profile) {
  const cookieStore = await cookies();
  cookieStore.set('sisu-perfil', JSON.stringify(data), {
    maxAge: 1000000000,
    httpOnly: true,
  });
}

export async function getProfileCookie(): Promise<Profile | null> {
  const cookieStore = await cookies();
  if (!cookieStore.has('sisu-perfil')) {
    return null;
  }

  try {
    const data = cookieStore.get('sisu-perfil');
    if (!data) throw Error();

    const profile = JSON.parse(data.value);
    return profile;
  } catch (error) {
    return null;
  }
}
