'use client';

import { Alert } from '@mui/material';

export default function EditProfileAlert() {
  return (
    <Alert variant="filled" severity="error" sx={{ my: 2 }}>
      É preciso preencher seu perfil para utilizar a seção de pesquisa. O perfil
      irá auxiliar a plataforma para encontrar cursos e faculdades de acordo com
      sua nota. Para criar/editar um perfil, clique no botão abaixo.
    </Alert>
  );
}
