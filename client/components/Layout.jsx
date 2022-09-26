import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col justify-between bg-[#e5e5e5]">
      {children}
      <Footer />
    </div>
  )
}

export default Layout