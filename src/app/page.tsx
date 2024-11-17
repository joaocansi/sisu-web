import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import EditProfile from '../components/edit-profile';

export default async function Home() {
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

        <EditProfile />
      </Box>
    </Container>
  );
}