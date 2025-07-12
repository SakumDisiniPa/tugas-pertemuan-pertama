import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tentang Sakum Hosting</h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>

      {/* Company Overview */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="md:w-1/2">
          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Tim Sakum Hosting"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Siapa Kami?</h2>
          <p className="text-gray-600 mb-4">
            Sakum Hosting adalah penyedia layanan hosting terkemuka di Indonesia yang telah beroperasi sejak 2015. Kami berkomitmen untuk menyediakan solusi hosting terbaik dengan teknologi terkini.
          </p>
          <p className="text-gray-600 mb-4">
            Dengan tim ahli yang berpengalaman lebih dari 10 tahun di industri hosting, kami memahami betul kebutuhan pelanggan Indonesia akan layanan hosting yang cepat, stabil, dan terjangkau.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
            <p className="text-blue-800 font-medium">
              "Memberikan layanan terbaik dengan uptime 99.9% dan dukungan teknis 24/7 adalah komitmen kami kepada pelanggan."
            </p>
          </div>
        </div>
      </div>

      {/* Visi Misi */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Visi Kami
          </h3>
          <p className="text-gray-600">
            Menjadi penyedia layanan hosting dan server terdepan di Indonesia dengan inovasi teknologi dan pelayanan terbaik.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Misi Kami
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Menyediakan infrastruktur hosting berkinerja tinggi
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Memberikan dukungan teknis 24 jam
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Menjangkau seluruh wilayah Indonesia
            </li>
          </ul>
        </div>
      </div>

      {/* Fasilitas Data Center */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Fasilitas Data Center Kami</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Tier-3 Data Center",
              desc: "Data center berstandar internasional dengan redundansi tinggi",
              icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              image: "https://plus.unsplash.com/premium_photo-1664299525458-b76f4e1ce5f7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              title: "Jaringan Internasional",
              desc: "Koneksi langsung ke jaringan global dengan bandwidth besar",
              icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
              image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            },
            {
              title: "Keamanan 24/7",
              desc: "Pengawasan CCTV dan sistem keamanan berlapis",
              icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              image: "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 pl-14">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tim Kami */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Tim Kami</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Budi Santoso",
              position: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            },
            {
              name: "Ani Wijaya",
              position: "CTO",
              image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            },
            {
              name: "Cahyo Pratama",
              position: "Head of Support",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            },
            {
              name: "Dewi Lestari",
              position: "Marketing Director",
              image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image 
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-blue-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}