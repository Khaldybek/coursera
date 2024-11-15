import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Grid, Button, Divider } from '@mui/material';
import { Carousel } from 'antd';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    sectionHeader: {
        textAlign: 'center',
        padding: '60px 0 20px',
    },
    featureCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
    },
    statsSection: {
        textAlign: 'center',
        padding: '60px 0',
        backgroundColor: '#f5f5f5',
    },
    statsItem: {
        fontWeight: 'bold',
        fontSize: '1.8rem',
        color: '#4d65ff',
        marginBottom: '8px',
    },
    galleryHeader: {
        margin: '60px 0 20px',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        padding: '40px 0',
        textAlign: 'center',
    },
});

const Header = () => {
    const classes = useStyles();
    return (
        <Box className={classes.sectionHeader}>
            <Typography variant="h2" color="primary" gutterBottom>
                What is Lorem Ipsum?
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.
            </Typography>
        </Box>
    );
};

const Features = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" style={{ marginTop: '40px' }}>
            <Box className={classes.sectionHeader}>
                <Typography variant="h4" color="primary" gutterBottom>
                    It is a long established fact that a reader will be distracted.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {[...Array(6)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className={classes.featureCard} elevation={3}>
                            <Avatar src="style/66ce000889d64ea2e38b044b_Icons=Membership.png" />
                            <CardContent>
                                <Typography variant="h6">Take Ownership</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Be curious. Be accountable.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

const StatsSection = () => {
    const classes = useStyles();
    return (
        <Box className={classes.statsSection}>
            <Container maxWidth="lg">
                <Grid container spacing={5} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Typography className={classes.statsItem}>$8B+</Typography>
                        <Typography variant="body2">dollars</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography className={classes.statsItem}>20M+</Typography>
                        <Typography variant="body2">people lives</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography className={classes.statsItem}>10K+</Typography>
                        <Typography variant="body2">cities</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const ImageCarousel = () => (
    <Carousel autoplay>
        {[1, 2, 3, 4, 5].map((index) => (
            <div key={index}>
                <img src={`style/card${index}.jpg`} alt={`Card ${index}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </div>
        ))}
    </Carousel>
);

const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.footer}>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Join Us
                </Typography>
                <Typography variant="body1" color="inherit">
                    Sign up today to stay updated on our latest offers and news.
                </Typography>
                <Box mt={3}>
                    <Button variant="contained" color="secondary" href="https://#Open-Positions">
                        See Open Positions →
                    </Button>
                </Box>
                <Divider variant="middle" style={{ backgroundColor: 'white', margin: '40px 0' }} />
                <Typography variant="body2">© 2024 Company Name. All rights reserved.</Typography>
            </Container>
        </Box>
    );
};

const AboutUs = () => {
    const classes = useStyles();
    return (
        <Box>
            <Header />
            <Container maxWidth="lg">
                <Features />
                <StatsSection />
                <Box my={5} className={classes.galleryHeader}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Our Gallery
                    </Typography>
                    <ImageCarousel />
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default AboutUs;
