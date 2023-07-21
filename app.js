import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

let MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code

let name = '';

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

app.get('/top-fossils', (req, res) =>
{
  let fossils = [MOST_LIKED_FOSSILS.aust, MOST_LIKED_FOSSILS.quetz, MOST_LIKED_FOSSILS.steg, MOST_LIKED_FOSSILS.trex]
  let arr = [0, 1, 2, 3]

  if (name !== '')
  {
    res.render('top-fossils.html.njk', 
    {
      fossils: fossils,
      arr: arr,
      name: name
    })
  }
  else
  {
    res.redirect('/')
  }   
})

app.get('/', (req, res) =>
{
  if (name === '')
  {
    res.render('homepage.html.njk')
  }
  else
  {
    res.redirect('top-fossils')
  }
})

app.get('/get-name', (req, res) =>
{
  name = req.query.name
  
  res.redirect('top-fossils')
})

app.post('/like-fossil', (res, req) =>
{
  let liked = req.body.drop
  
  MOST_LIKED_FOSSILS.liked.num_likes += 1

  res.render('thank-you.html.njk')
})