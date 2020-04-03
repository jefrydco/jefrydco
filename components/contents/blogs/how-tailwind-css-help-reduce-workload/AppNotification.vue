<i18n>
{
  "id": {
    "title": "Pesan Baru dari Bos",
    "defaultContent": "Selamat, gaji kamu bulan depan naik!",
    "successContent": "Bulan depan kamu saya angkat jadi CTO ya!",
    "errorContent": "Cepat ke meja saya sekarang!"
  },
  "en": {
    "title": "New Message from Boss",
    "defaultContent": "Congratulations, your salary is increased next month!",
    "successContent": "Next month you're the CTO ya!",
    "errorContent": "Come to my desk, quick!"
  }
}
</i18n>

<template>
  <div id="notification">
    <div
      class="max-w-lg mx-auto flex p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl mb-10"
    >
      <div class="flex-shrink-0">
        <svg
          class="h-12 w-12"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="default-a" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#2397B3" offset="0%"></stop>
              <stop stop-color="#13577E" offset="100%"></stop>
            </linearGradient>
            <linearGradient id="default-b" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#73DFF2" offset="0%"></stop>
              <stop stop-color="#47B1EB" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <path
              d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z"
              fill="url(#default-a)"
              transform="translate(1 1)"
            ></path>
            <path
              d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z"
              fill="url(#default-b)"
              transform="translate(1 1)"
            ></path>
            <path
              d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </div>
      <div class="ml-6 pt-1">
        <div class="text-xl text-gray-900 leading-tight mt-0 mb-1">
          {{ $t('title') }}
        </div>
        <div class="text-base text-gray-600 leading-normal m-0">
          {{ $t('defaultContent') }}
        </div>
      </div>
    </div>

    <div
      class="max-w-lg mx-auto flex p-6 bg-green-500 rounded-lg shadow-lg hover:shadow-2xl mb-10"
    >
      <div class="flex-shrink-0">
        <svg
          class="h-12 w-12"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="success-a" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#2397B3" offset="0%"></stop>
              <stop stop-color="#13577E" offset="100%"></stop>
            </linearGradient>
            <linearGradient id="success-b" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#73DFF2" offset="0%"></stop>
              <stop stop-color="#47B1EB" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <path
              d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z"
              fill="url(#success-a)"
              transform="translate(1 1)"
            ></path>
            <path
              d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z"
              fill="url(#success-b)"
              transform="translate(1 1)"
            ></path>
            <path
              d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </div>
      <div class="ml-6 pt-1">
        <div class="text-xl text-white leading-tight mt-0 mb-1">
          {{ $t('title') }}
        </div>
        <div class="text-base text-white leading-normal m-0">
          {{ $t('successContent') }}
        </div>
      </div>
    </div>

    <div
      class="max-w-lg mx-auto flex p-6 bg-red-500 rounded-lg shadow-lg hover:shadow-2xl mb-10"
    >
      <div class="flex-shrink-0">
        <svg
          class="h-12 w-12"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="error-a" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#2397B3" offset="0%"></stop>
              <stop stop-color="#13577E" offset="100%"></stop>
            </linearGradient>
            <linearGradient id="error-b" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#73DFF2" offset="0%"></stop>
              <stop stop-color="#47B1EB" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <path
              d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z"
              fill="url(#error-a)"
              transform="translate(1 1)"
            ></path>
            <path
              d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z"
              fill="url(#error-b)"
              transform="translate(1 1)"
            ></path>
            <path
              d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </div>
      <div class="ml-6 pt-1">
        <div class="text-xl text-white leading-tight mt-0 mb-1">
          {{ $t('title') }}
        </div>
        <div class="text-base text-white leading-normal m-0">
          {{ $t('errorContent') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNotification',
}
</script>
