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





/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export', // ✅ 정적 사이트로 export 명시
};

export default nextConfig;
