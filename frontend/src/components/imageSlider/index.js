import React, { useContext, useState } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import recommedationService from '../../api/recommedationService';
import { useQuery } from 'react-query';
import Spinner from '../spinner';
import { AuthContext } from '../../context/authContext';
import MediasBarCard from '../mediasBarCard';

const ImageContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageSlider = () => {
  const authContext = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, error, isLoading, isError } = useQuery(
    ["recommendMovies", { id: authContext.userProfile.id }], recommedationService.getById
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  const medias = data.data;


  const handleClickPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? medias.length - 1 : prevIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === medias.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      {
        medias.length === 0 ? null :
          <>
            <Typography variant={"h6"}>You may like</Typography>
            <Grid item xs={12} my={2}>
              <ImageContainer>
                <IconButton onClick={handleClickPrevious} color='primary'>
                  <ArrowBackIos />
                </IconButton>
                <MediasBarCard item={medias[currentImageIndex]} xs={8} />
                <IconButton onClick={handleClickNext} color='primary'>
                  <ArrowForwardIos />
                </IconButton>
              </ImageContainer>
            </Grid>
          </>
      }
    </>
  );
};

export default ImageSlider;