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

// module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 🚀 정적 사이트로 내보내기

  trailingSlash: true, // 🔗 각 경로에 / 붙이기 (/about → /about/)
  reactStrictMode: true, // 🔍 개발 중 오류 경고 강화

  images: {
    unoptimized: true, // 🖼 정적 export 시 next/image 최적화 끄기 (필수)
  },

  // basePath: "/my-sub-path", // (선택) 서브디렉토리 배포 시 사용
};

export default nextConfig;
