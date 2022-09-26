import Head from 'next/head'

const Home = () => {
  return (
    <div className="flex flex-col py-2">
      <Head>
        <title>Life Domain Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col px-20 text-center">
        <div className='text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-50 pb-6'>Mint Your Domain</div>
        
        <div className='text-xl font-bold pb-8'>Your immortal identity on the blockchain</div>
        
        <div className='flex flex-col justify-center items-center gap-y-8'>
          <div className='flex'>
            <input type="text" placeholder='Enter your domain' className='px-8 py-2 w-80 bg-gray-800 rounded-l-md focus:outline-none font-bold'/>
            <span className='font-bold px-4 py-2 bg-gray-800 w-16 rounded-r-md'>.life</span>
          </div>

          <input type="text" placeholder='Enter record' className='px-8 py-2 bg-gray-800 rounded-md w-96 focus:outline-none font-bold'/>
          
          <button className="px-12 py-2 border-2 border-purple-400 rounded font-bold">
            Mint Domain
          </button>
        </div>
        
        <div></div>
      </main>
    </div>
  )
}

export default Home
