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
