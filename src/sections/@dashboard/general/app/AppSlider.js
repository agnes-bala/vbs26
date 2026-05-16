import PropTypes from "prop-types";

import Slider from "react-slick";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";
// utils

// components

import { CarouselDots } from "../../../../components/carousel";

// ----------------------------------------------------------------------

const HEIGHT = 276;

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  height: HEIGHT,
  "& .slick-list": {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const CardItemStyle = styled("div")(({ theme }) => ({
  position: "relative",
  height: HEIGHT - 16,
  backgroundSize: "cover",
  padding: theme.spacing(3),
  backgroundRepeat: "no-repeat",
  color: theme.palette.common.white,
  backgroundImage: 'url("/assets/bg_card.png")',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const shadowStyle = {
  mx: "auto",
  width: "calc(100% - 16px)",
  borderRadius: 2,
  position: "absolute",
  height: 200,
  zIndex: 8,
  bottom: 8,
  left: 0,
  right: 0,
  bgcolor: "grey.500",
  opacity: 0.32,
};

// ----------------------------------------------------------------------

AppSlider.propTypes = {
  list: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default function AppSlider({ list, sx }) {
  const theme = useTheme();

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 500,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    ...CarouselDots({ position: "absolute", right: 16, bottom: 16 }),
  };

  return (
    <RootStyle sx={sx}>
      <Box sx={{ position: "relative", zIndex: 9 }}>
        <Slider {...settings}>
          {list.eventList.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Slider>
      </Box>

      <Box sx={{ ...shadowStyle }} />

      <Box
        sx={{
          ...shadowStyle,
          opacity: 0.16,
          bottom: 0,
          zIndex: 7,
          width: "calc(100% - 40px)",
        }}
      />
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

CardItem.propTypes = {
  card: PropTypes.shape({
    eventId: PropTypes.string,
    eventTitle: PropTypes.string,
    eventSubTitle: PropTypes.string,
    place: PropTypes.string,
    speakers: PropTypes.string,
    eventDate: PropTypes.string,
    eventTime: PropTypes.string,
    eventMeta: PropTypes.string,
    eventLink: PropTypes.string,
    contactInfo: PropTypes.string,
    regStateDate: PropTypes.string,
    regEndDate: PropTypes.string,
    regLink: PropTypes.string,
    regMeta: PropTypes.string,
    eventImage: PropTypes.string,
    isFeatured: PropTypes.number,
  }),
};

function CardItem({ card }) {
  const {
    eventTitle,
    eventDate,
    eventTime,
  } = card;

  return (
    <CardItemStyle>
      <div>
        <Typography sx={{ mb: 2, typography: "h3" }}>{eventTitle}</Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ typography: "h6" }}>{eventDate}</Typography>
        </Stack>
      </div>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <Typography sx={{ typography: "subtitle1", textAlign: "right" }}>
          {eventTime}
        </Typography>
      </Stack>
    </CardItemStyle>
  );
}

// ----------------------------------------------------------------------
