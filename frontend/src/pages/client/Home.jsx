import Navbar from '../../components/client/Navbar'
import Header from '../../components/client/Header'
import './Home.css'
import Featured from '../../components/client/Featured'
import FeaturedProperties from '../../components/client/FeaturedProperties'
import FeaturedBlogs from '../../components/client/FeaturedBlogs'
import MailList from '../../components/client/MailList'
import Footer from '../../components/client/Footer'

export default function Home () {
  return (
    <div >
      <Navbar />
   
      <Header />
    
     
      <div className='homeContainer'>
        <Featured />
        <div className='homeTitle_C'>
          <h1 className='homeTitle'>Home guests love</h1>
        </div>

        <FeaturedProperties />
        <div className='homeTitle_C'>
          <h1 className='homeTitle'>Get inspiration for your next trip</h1>
        </div>

        <FeaturedBlogs />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}
