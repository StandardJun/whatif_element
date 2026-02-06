import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 만약...',
  description: '만약... 사이트의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
            &larr; 홈으로 돌아가기
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-6">개인정보처리방침</h1>
          <p className="text-sm text-gray-400 mb-8">시행일: 2026년 2월 6일</p>

          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed mb-4">
              만약... (manyak.xyz)은 이용자의 개인정보를 중요하게 생각하며, 개인정보보호법 등 관련 법령을 준수하고 있습니다.
              본 개인정보처리방침은 당사가 제공하는 원소 성격 테스트 서비스를 이용하는 과정에서 수집되는 정보와 그 활용 방법에 대해 안내합니다.
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">1. 수집하는 개인정보</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  본 사이트는 성격 테스트 진행을 위해 이용자가 입력한 <strong>이름</strong>을 사용합니다.
                </li>
                <li>
                  입력된 이름은 <strong>서버에 저장되지 않으며</strong>, 브라우저 세션 내에서만 일시적으로 사용됩니다.
                </li>
                <li>
                  브라우저를 종료하거나 페이지를 새로고침하면 해당 정보는 자동으로 삭제됩니다.
                </li>
                <li>
                  별도의 회원가입이나 로그인 기능이 없으며, 이메일, 전화번호 등의 개인식별정보를 수집하지 않습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">2. 쿠키 및 광고</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                본 사이트는 Google AdSense를 통해 광고를 게재하고 있습니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  Google 및 제3자 광고 네트워크는 쿠키를 사용하여 이용자의 이전 방문 기록을 기반으로 광고를 게재할 수 있습니다.
                </li>
                <li>
                  Google의 광고 쿠키 사용에 대한 자세한 내용은{' '}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Google 광고 개인정보보호 FAQ
                  </a>
                  를 참조하시기 바랍니다.
                </li>
                <li>
                  이용자는{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Google 광고 설정
                  </a>
                  에서 맞춤 광고를 비활성화할 수 있습니다.
                </li>
                <li>
                  AdSense 게시자 ID: ca-pub-4466574123469106
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">3. 분석 도구</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                본 사이트는 서비스 개선 및 이용 현황 파악을 위해 웹 분석 도구를 사용할 수 있습니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  수집되는 정보: 방문 페이지, 체류 시간, 브라우저 종류, 유입 경로, 디바이스 정보 등
                </li>
                <li>
                  이러한 정보는 통계적 목적으로만 사용되며, 개인을 식별할 수 없는 형태로 수집됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">4. 개인정보의 제3자 제공</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  본 사이트는 법령에 의한 경우를 제외하고 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                </li>
                <li>
                  광고 게재를 위해 Google AdSense를 이용하며, 이 과정에서 Google의 개인정보처리방침이 적용됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">5. 이용자의 권리</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  <strong>쿠키 거부:</strong> 브라우저 설정에서 쿠키 수신을 거부하거나 삭제할 수 있습니다.
                  단, 쿠키를 거부할 경우 일부 기능이 제한될 수 있습니다.
                </li>
                <li>
                  <strong>맞춤 광고 비활성화:</strong>{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Google 광고 설정
                  </a>
                  에서 맞춤 광고를 비활성화할 수 있습니다.
                </li>
                <li>
                  <strong>Do Not Track (DNT):</strong> 브라우저의 DNT 설정을 활성화하여 추적을 거부할 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">6. 개인정보 보호를 위한 기술적/관리적 대책</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  본 사이트는 HTTPS 프로토콜을 사용하여 통신을 암호화합니다.
                </li>
                <li>
                  서버에 개인정보를 저장하지 않으므로, 데이터 유출의 위험이 최소화되어 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">7. 개인정보처리방침의 변경</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                본 개인정보처리방침은 법령 또는 서비스의 변경사항을 반영하기 위해 수정될 수 있습니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  개인정보처리방침이 변경되는 경우, 변경사항은 본 페이지를 통해 공지됩니다.
                </li>
                <li>
                  중요한 변경사항이 있을 경우, 사이트 메인 페이지에 별도 공지할 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">8. 문의</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                개인정보처리방침에 대한 문의사항이나 개인정보 관련 요청사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>이메일: jkgkgj@naver.com</li>
                <li>사이트: manyak.xyz</li>
              </ul>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Privacy Policy (English)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                manyak.xyz ("we" or "the site") respects your privacy and complies with relevant data protection laws.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">1. Information We Collect</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>We collect your <strong>name</strong> for the personality test experience.</li>
                <li>This information is <strong>not stored on our servers</strong> and exists only in your browser session.</li>
                <li>No registration or login is required. We do not collect email addresses or phone numbers.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2. Cookies and Advertising</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>We use Google AdSense to display advertisements.</li>
                <li>Google and third-party ad networks may use cookies based on your browsing history.</li>
                <li>
                  You can opt out of personalized advertising at{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Google Ad Settings
                  </a>
                  .
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">3. Analytics</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>We may use web analytics tools to understand site usage.</li>
                <li>Data collected includes page views, time on site, browser type, etc. (non-personally identifiable).</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">4. Your Rights</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>You can disable cookies in your browser settings.</li>
                <li>You can opt out of personalized ads via Google Ad Settings.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">5. Contact</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                For questions about this privacy policy, contact us at: jkgkgj@naver.com
              </p>
            </section>
          </div>

          <footer className="mt-12 text-center text-gray-400 text-xs">
            <p>&copy; 2026 만약... All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
