import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const CastCard = (props) => {
  return (
    <Grid width={120} mr={1.3} ml={1.3}>
      <Card elevation={0} sx={{ height: 264 }}>
        <CardMedia
          sx={{ height: 170, width: 120 }}
          image={`https://image.tmdb.org/t/p/w500/${props.person.profile_path}`}
          title={props.person.name}
        />
        <CardContent sx={{ paddingX: 0 }}>
          <Typography gutterBottom variant="body1" component="div">
            {props.person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">

            {props.job === 'director' ? (
              <>
                {props.person.job}
              </>
            ) : (
              <>
                {props.person.character}
              </>
            )}
          </Typography>
        </CardContent>

      </Card>
    </Grid>
  )
}

export default CastCard;