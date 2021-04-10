import AlternateCard from "../AlternateCard";
import {Grid} from '@material-ui/core';

import guideImg from "../../statics/guide.jpg";
import contirubuteImg from "../../statics/explore.jpg";
import bucketListImg from '../../statics/bucket.jpg';

const cards = [
  {
    title: 'Start sharing your travel ideas',
    body: 'Create a Destination to save and share all of your travel destinations, and see them on a map',
    btn: 'Create a Destination',
    btnLink: '/contribute',
    img: contirubuteImg,
  },{
    title: 'Want to be a Guide?',
    body: 'Be a guide and share what you have in you',
    btn: 'Be a Guide',
    btnLink: '/beguide',
    dir: 'row-reverse',
    img: guideImg,
  },{
    title: 'Create your bucketlist',
    body: 'Add destinations to you bucketlist and customize your travelling experience',
    btn: 'Checkout Bucketlist',
    btnLink: '/bucketlist',
    img: bucketListImg,
  },
]

const HomeCards = () => {
  return (
    cards.map((card,index) => {
      return (
        <Grid
          item
          container
          justify={index % 2 ===0 ? "flex-start" : 'flex-end'}
          key={index}
          >
          <AlternateCard
            img={card.img}
            title={card.title}
            body={card.body}
            btn={card.btn}
            btnLink={card.btnLink}
            dir={card.dir}
          />
        </Grid>
      )
    })
  )
};

export default HomeCards;
