import { useProfile } from '@/contexts/profile';
import { Alert } from '@mui/material';

export default function EditProfileAlert() {
  const { profile } = useProfile();

  return (
    <Alert
      variant="filled"
      severity={profile ? 'success' : 'error'}
      sx={{ my: 2 }}
    >
      {profile
        ? 'Detectamos que seu perfil se encontra preenchido. Caso deseje editar alguma informação, você poderá fazer quando quiser. Para isso, basta clicar no botão abaixo.'
        : 'É preciso preencher seu perfil para utilizar a seção de pesquisa. O perfil irá auxiliar a plataforma para encontrar cursos e faculdades de acordo com sua nota. Para criar/editar um perfil, clique no botão abaixo.'}
    </Alert>
  );
}
