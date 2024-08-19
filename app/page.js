'use client'
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import Head from "next/head";
import {useRouter} from "next/navigation";

export default function Home() {

    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_session', {
            method: 'POST',
            headers: {
                origin: 'http://localhost:3000',
            }
        })
        const checkoutSessionJson = await checkoutSession.json()

        if (checkoutSession.statusCode === 500) {
            console.error(checkoutSession.message)
            return
        }

        const stripe = await getStripe()
        const {error} = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id
        })

        if (error) {
            console.warn(error.message)
        }
    }

    const router = useRouter();
    const handleGetStarted = () => {
        router.push('/generate');
    }
  return (
  <Container maxWidth='lg'>
      <Head>
            <title>Flashcards</title>
            <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar>
          <Toolbar>
              <Typography variant='h6' style={{flexGrow: 1}}>
                  Flashcards SaaS
              </Typography>
              <SignedOut>
                  <Button color='inherit' href='/sign-in'>Login</Button>
                  <Button color='inherit' href={'/sign-up'}>SignUp</Button>
              </SignedOut>
              <SignedIn>
                  <UserButton />
              </SignedIn>
          </Toolbar>
      </AppBar>
      <Box sx={{
            textAlign: 'center',
            my:10,
        }}>
            <Typography variant='h2' gutterBottom>Welcome to Flashcards SaaS</Typography>
            <Typography variant='h5' gutterBottom>Create flashcards from your text</Typography>
            <Button variant='contained' color='primary' sx={{mt:2}} onClick={handleGetStarted}>
                Get Started
            </Button>
            <SignedIn>
                <Button variant='contained' color='secondary' sx={{mt:2}} onClick={() => router.push('/flashcards')}>
                    View Flashcards
                </Button>
            </SignedIn>
      </Box>
      <Box sx={{my:6}}>
          <Typography variant='h4' gutterBottom>Features</Typography>
          <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                    <Typography variant='h6' gutterBottom>Smart Flashcards</Typography>
                    <Typography>
                        {' '}
                        Create flashcards from your text
                    </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                    <Typography variant='h6' gutterBottom >Smart Flashcards</Typography>
                    <Typography>
                        {' '}
                        Create flashcards from your text
                    </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                    <Typography variant='h6' gutterBottom>Smart Flashcards</Typography>
                    <Typography>
                        {' '}
                        Create flashcards from your text
                    </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                    <Typography variant='h6' gutterBottom>Smart Flashcards</Typography>
                    <Typography>
                        {' '}
                        Create flashcards from your text
                    </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                    <Typography variant='h6' gutterBottom>Smart Flashcards</Typography>
                    <Typography>
                        {' '}
                        Create flashcards from your text
                    </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                    <Typography variant='h6' gutterBottom>Smart Flashcards</Typography>
                    <Typography>
                        {' '}
                        Create flashcards from your text
                    </Typography>
              </Grid>
          </Grid>
      </Box>

      <Box sx={{my:6, textAlign: 'center'}}>
          <Typography variant='h4' gutterBottom>Pricing</Typography>

          <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Grid item xs={12} md={6}>
                  <Box sx={{
                      p:3,
                      border: '1x solid',
                      borderColor: 'grey.300',
                      borderRadius:2}}>


                    <Typography variant='h5' gutterBottom>Pro</Typography>
                    <Typography variant='h6' gutterBottom>$10/month</Typography>
                    <Typography>
                        {' '}
                        Unlimited flashcards and storage, with priority support.
                    </Typography>
                      <Button variant='contained' color='primary' sx={{mt:2}} onClick={handleSubmit}>
                          Choose pro
                      </Button>
                  </Box>

              </Grid>

          </Grid>
      </Box>


  </Container>
  );
}
