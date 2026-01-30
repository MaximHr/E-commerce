import Banner from '../Components/Banner';
import Isle from '../Components/Isle';
import About from '../Components/About';
import Grid from '../Components/Grid';
import { useOutletContext } from 'react-router-dom';

const Landing = () => {
	const { mainProducts } = useOutletContext();

  return (
    <div>
      <Banner />
      <Isle title='Most Popular Toys' items={mainProducts} />
      <Grid/>
      <About />
    </div>
  )
}

export default Landing;