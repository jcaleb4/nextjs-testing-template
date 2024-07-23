import type { Metadata } from 'next';
import HomePage from '@/views/home/HomePage';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return (
    <section>
      <HomePage />
    </section>
  );
};

export default Home;
