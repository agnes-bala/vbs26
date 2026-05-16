// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

// hooks
import useSettings from "../../hooks/useSettings";
// _mock_

import {
  _appFeatured,
  _bankingCreditCard,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from "../../_mock";

// components
import Page from "../../components/Page";

// sections
import { AppSlider, EventCard } from "../../sections/@dashboard/general/app";

// ----------------------------------------------------------------------
const event = {
  eventList: [
    {
      eventId: "1",
      eventTitle: "Revival Igniters",
      eventSubTitle: "2022",
      place: "Tabernacle of God, Nalumavadi",
      speakers: "Bro.Mohan C Lazarus",
      eventDate: "Nov 3, 2022",
      eventTime: "10am - 2pm",
      eventMeta: "Food will be provided",
      eventLink: "http://youtube.com/watch=v?wef;mbKBK",
      contactInfo: "+91 9876543210, 04639 - 353535",
      regStateDate: "2022-08-21",
      regEndDate: "2022-09-17",
      regMeta: "PLEASE BRING PLATE, BEDSHEET",
      eventImage: "https://www.gstatic.com/webp/gallery3/1.sm.png",
      isFeatured: "1",
    },

    {
      eventId: "2",
      eventTitle: "Leaders Camp",
      eventSubTitle: "",
      place: "Trichy",
      speakers: "Mohan C",
      eventDate: "26 - 30 Dec 2022",
      eventTime: "Every Day 10am - 2pm",
      eventMeta: "",
      eventLink:
        "https://youth.jesusredeems.com/wp-content/uploads/sites/2/2022/08/Aug17_Eng.jpeg",
      contactInfo: "0456-854546, +91 9596842103",
      regStateDate: "",
      regEndDate: "",
      regMeta: "",
      eventImage: "",
      isFeatured: "0",
    },

    {
      eventId: "3",
      eventTitle: "Youth Festival",
      eventSubTitle: " for chennai",
      place: "Nalumavadi",
      speakers: "Bro.Mohan C Lazarus & Bro. Vincent Selvakumar",
      eventDate: "oct 3 2022",
      eventTime: "9am - 5pm",
      eventMeta: "All church youths are invited",
      eventLink: "http://youth.jesusredeems.com",
      contactInfo: "9487935315",
      regStateDate: "2022-08-21",
      regEndDate: "2022-09-20",
      regMeta: "Need Aadhar for verification before Camp",
      eventImage:
        "https://media.newyorker.com/photos/5b5a414992497e4fd0017662/16:9/w_1280,c_limit/Sunday-Reading-Under-the-Sea.jpg",
      isFeatured: "0",
    },

    {
      eventId: "4",
      eventTitle: "Tirappin Vasal Jebam",
      eventSubTitle: "",
      place: "",
      speakers: "",
      eventDate: "Jan 26",
      eventTime: "",
      eventMeta: "",
      eventLink: "",
      contactInfo: "",
      regStateDate: "",
      regEndDate: "",
      regMeta: "",
      eventImage:
        "https://youth.jesusredeems.com/wp-content/uploads/sites/2/2021/10/VUYW.jpg",
      isFeatured: "1",
    },
  ],
};

export default function Events() {
  const [feed, setFeed] = useState({ feedList: [] });

  useEffect(() => {
    fetch(
      "http://jrmpartnerservice-stage.us-west-2.elasticbeanstalk.com/jrms/v1/feed/home"
    )
      .then((data) => data.json())
      .then((data) => setFeed(data));
  }, []);
  console.log(feed);
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Events">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              color={theme.palette.primary.dark}
            >
              General Events
            </Typography>
            <AppSlider list={event} />

            <br />
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              color={theme.palette.primary.dark}
            >
              Upcoming Events
            </Typography>
            <EventCard list={event} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
