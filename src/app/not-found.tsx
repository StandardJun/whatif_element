import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
      <div className="text-center max-w-md w-full px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg">
          <p className="text-6xl font-bold text-orange-300 mb-2">404</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-gray-500 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="block py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              테스트 시작하기
            </Link>
            <Link
              href="/elements"
              className="block py-3 rounded-2xl bg-white border border-orange-200 text-gray-700 font-medium hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
            >
              원소 도감 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
