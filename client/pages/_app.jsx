import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout.jsx'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen min-w-fit">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp