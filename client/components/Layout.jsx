import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col justify-between bg-gradient-to-br from-black via-gray-900 to-black text-violet-200">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout