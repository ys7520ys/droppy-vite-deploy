// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;



// const nextConfig = {
//   reactStrictMode: true,
//   output: "export", // ✅ 추가!
// };

// export default nextConfig;





// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,  // ✅ 이미지 최적화 비활성화!
//   },
// };

// export default nextConfig;




// @type {import('next').NextConfig} */
//const nextConfig = {
 // reactStrictMode: true,
//  images: {
//    unoptimized: true,
//  },
//  output: 'export', // ✅ 정적 사이트로 export 명시
//};

//export default nextConfig;





// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
// };

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   trailingSlash: true,
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;





// 05/24/02:06
// // next.config.js
// const nextConfig = {
//   // output: 'export',
//   trailingSlash: true,
//   images: { unoptimized: true },
// };
// module.exports = nextConfig;


//멀쩡한 상태
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig; 




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//   },
//   trailingSlash: true, // ✅ export 후 슬래시 유지
//   webpack: (config) => {
//     config.output.filename = 'static/chunks/[name].js'; // ✅ JS 이름 고정
//     return config;
//   },
// };

// module.exports = nextConfig;








// next.config.js
const nextConfig = {
  output: "export", // ✅ export 모드로 전환
  trailingSlash: true, // ✅ /index.html 로 접근하게 하기 위해
};

module.exports = nextConfig;