import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { Profile, ProfileProvider } from '@/contexts/profile';
import { cookies } from 'next/headers';
import DynamicSearch from '@/components/dynamic-search';
import EditProfile from '../components/edit-profile';
import SnackbarContainer from '../components/snackbar-container';

async function getProfileCookie(): Promise<Profile | null> {
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

export default async function Home() {
  const profile = await getProfileCookie();

  return (
    <Container>
      <Box my={2} component="header">
        <Typography component="h1">
          <Image priority src="/logo.png" width={250} height={83} alt="SISU" />
        </Typography>
      </Box>
      <Box component="main">
        <Typography>
          Esta plataforma foi desenvolvida com o objetivo de ajudar os
          estudantes a tomarem decisões sobre seus cursos universitários. Aqui,
          você poderá encontrar informações sobre as instituições de ensino
          superior que mais se adequam às suas notas no Sistema de Seleção
          Unificada (SISU). É importante ressaltar que as informações fornecidas
          referem-se a edições anteriores e, portanto, podem não condizer com
          resultados de edições futuras.
        </Typography>

        <SnackbarContainer>
          <ProfileProvider initialProfile={profile}>
            <EditProfile />
            <DynamicSearch />
          </ProfileProvider>
        </SnackbarContainer>
      </Box>
    </Container>
  );
}
