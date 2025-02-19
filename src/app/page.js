import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "@/components/Home/Hero";
import GameList from "@/components/Home/GameList";
import Search from "@/components/Home/Search";

const Home = ({Component, pageProps}) => <>
    <Header/>
    <Hero/>
    <Search/>
    <GameList/>
    <Footer/>
  </>

export default Home;
