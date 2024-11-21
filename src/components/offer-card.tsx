import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';

export default function OfferCard() {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom color="textSecondary" fontSize="xl">
            UNIRIO - Rio de Janeiro, RJ
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Universidade Federal do Estado do Rio de Janeiro
          </Typography>
          <Box display="flex" gap={0.5} alignItems="center" mb={1.5}>
            <Chip label="Campus" />
            <Typography color="textSecondary">Praia Vermelha</Typography>
          </Box>
          <Chip
            label="Bacharelado em Sistemas de Informação"
            color="info"
            sx={{ mr: 1, fontSize: 15 }}
          />
        </CardContent>
        <CardActions>
          <Button size="small">Saber mais</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
