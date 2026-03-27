// ---------------------------------------------------------------------------
// Inline SVG icon components — used instead of @iconify/react for offline support.
// Add new icons here as needed; keep @iconify/react only for icons not yet inlined.
// ---------------------------------------------------------------------------

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconDelete(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M19.45 7.5H4.55a.5.5 0 0 0-.5.54l1.28 14.14a2 2 0 0 0 2 1.82h9.34a2 2 0 0 0 2-1.82L20 8a.5.5 0 0 0-.5-.54Zm-9.2 13a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 1.5 0Zm5 0a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 1.5 0ZM22 4h-4.75a.25.25 0 0 1-.25-.25V2.5A2.5 2.5 0 0 0 14.5 0h-5A2.5 2.5 0 0 0 7 2.5v1.25a.25.25 0 0 1-.25.25H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2M9 3.75V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1.25a.25.25 0 0 1-.25.25h-5.5A.25.25 0 0 1 9 3.75"
      />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
      />
    </svg>
  );
}

export function IconDatabase(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4s8-1.79 8-4s-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4"
      />
    </svg>
  );
}

export function IconDatabaseOff(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M12 21q-1.025 0-2.562-.213T6.475 20.1t-2.45-1.237T3 17v-2.5q0 1.1 1.025 1.863t2.45 1.237t2.963.688T12 18.5q1.05 0 2.588-.213t2.987-.712l1.75 1.75q-1.55.9-3.75 1.288T12 21m8.775-3.05l-1.25-1.25q.675-.425 1.075-.975T21 14.5V17q0 .275-.05.5t-.175.45M12 16q-1.025 0-2.563-.213T6.475 15.1t-2.45-1.237T3 12V9.5q0 1.1 1.025 1.863t2.45 1.237t2.963.688T12 13.5q.3 0 .663-.012t.762-.063L15.6 15.6q-1.025.2-1.962.3T12 16m5.825-1l-1.95-1.95q1.925-.425 3.525-1.275T21 9.5V12q0 1.05-.913 1.788T17.825 15m-6.85-4.025q-3.4-.175-5.687-1.3T3 7q0-.65.438-1.237t1.237-1.088zm2.775-.05L6.625 3.8q1.125-.375 2.488-.587T12 3q3.75 0 6.375 1.175T21 7q0 1.45-2.062 2.55t-5.188 1.375M19.075 21.9L2.1 4.925q-.275-.275-.275-.687t.275-.713q.3-.3.713-.3t.712.3L20.5 20.5q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288"
      />
    </svg>
  );
}

export function IconDatabaseCheck(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M12 3c4.42 0 8 1.79 8 4s-3.58 4-8 4s-8-1.79-8-4s3.58-4 8-4M4 9c0 2.21 3.58 4 8 4s8-1.79 8-4v3.08L19 12c-2.59 0-4.8 1.64-5.64 3.94L12 16c-4.42 0-8-1.79-8-4zm0 5c0 2.21 3.58 4 8 4h1c0 1.05.27 2.04.75 2.9L12 21c-4.42 0-8-1.79-8-4zm14 7.08l-2.75-3l1.16-1.16L18 18.5l3.59-3.58l1.16 1.41z"
      />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" {...props}>
      <rect width="20" height="20" fill="none" />
      <path
        fill="currentColor"
        d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0c.436.445.408 1.197 0 1.615c-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163s-.436-1.17 0-1.615"
      />
    </svg>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"
      />
    </svg>
  );
}

export function IconPlusCircle(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M12 17a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1" />
        <path d="M17 12a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1" />
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 8a8 8 0 1 0 0-16a8 8 0 0 0 0 16" />
      </g>
    </svg>
  );
}

export function IconSpinner(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <defs>
        <filter id="finamt-spinner-filter">
          <feGaussianBlur in="SourceGraphic" result="y" stdDeviation="1" />
          <feColorMatrix in="y" result="z" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
          <feBlend in="SourceGraphic" in2="z" />
        </filter>
      </defs>
      <g filter="url(#finamt-spinner-filter)">
        <circle cx="5" cy="12" r="4" fill="currentColor">
          <animate attributeName="cx" calcMode="spline" dur="2s" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" values="5;8;5" />
        </circle>
        <circle cx="19" cy="12" r="4" fill="currentColor">
          <animate attributeName="cx" calcMode="spline" dur="2s" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" values="19;16;19" />
        </circle>
        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Category icons
// ---------------------------------------------------------------------------

export function IconEducation(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="m21.45 8.61l-9-4.5a1 1 0 0 0-.89 0l-6 3l-3 1.5l-1 .5a1 1 0 0 0-.55.89v6h2v-5.38l8.55 4.28c.14.07.29.11.45.11s.31-.04.45-.11l9-4.5c.34-.17.55-.52.55-.89s-.21-.72-.55-.89Z"
      />
      <path
        fill="currentColor"
        d="M12 17c-.46 0-.93-.11-1.34-.32L5 13.85v1.59C5 17.5 8.12 20 12 20s7-2.49 7-4.56v-1.59l-5.66 2.83c-.41.21-.88.32-1.34.32"
      />
    </svg>
  );
}

export function IconEmail(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
      />
    </svg>
  );
}

export function IconFinance(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="m21.49 7.13l-9-5a.99.99 0 0 0-.97 0l-9.01 5C2.19 7.31 2 7.64 2 8v2c0 .55.45 1 1 1h2v7H3c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-2v-7h2c.55 0 1-.45 1-1V8a1 1 0 0 0-.51-.87M9 18H7v-7h2zm4 0h-2v-7h2zm-1-9c-.83 0-1.5-.67-1.5-1.5S11.17 6 12 6s1.5.67 1.5 1.5S12.83 9 12 9m5 9h-2v-7h2z"
      />
    </svg>
  );
}

export function IconGaming(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15" {...props}>
      <rect width="15" height="15" fill="none" />
      <path
        fill="currentColor"
        d="M13.1 11.5c-.6.3-1.4.1-1.8-.5l-1.1-1.4H4.8L3.7 11c-.5.7-1.4.8-2.1.3c-.5-.4-.7-1-.6-1.5l.7-3.7C1.9 4.9 3 4 4.2 4H7V2.5C7 1.7 7.6 1 8.4 1h3.1c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5.2-.5.4V4h2.8c1.2 0 2.3.9 2.5 2.1l.7 3.7c.1.7-.2 1.4-.9 1.7M6 6.5C6 5.7 5.3 5 4.5 5S3 5.7 3 6.5S3.7 8 4.5 8S6 7.3 6 6.5m6 0c0-.3-.2-.5-.5-.5H11v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V6h-.5c-.3 0-.5.2-.5.5s.2.5.5.5h.5v.5c0 .3.2.5.5.5s.5-.2.5-.5V7h.5c.3 0 .5-.2.5-.5"
      />
    </svg>
  );
}

export function IconShopping(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M18 15H7L5.5 6H21z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 3h2l.5 3m0 0L7 15h11l3-9z"
      />
      <circle cx="8" cy="20" r="1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="17" cy="20" r="1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function IconSocial(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
      />
    </svg>
  );
}

export function IconSoftware(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <path
        fill="currentColor"
        d="M168 168c0 4.75-1.11 9.16-3.05 12.11A7.77 7.77 0 0 1 158 184c-9.72 0-10-14.36-10-16c0-4.74 1.11-9.16 3.05-12.11A7.77 7.77 0 0 1 158 152c9.72 0 10 14.36 10 16m56-120v160a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16m-83.16 27.58a8 8 0 0 0 10.74 3.58l4.42-2.22V112a8 8 0 0 0 16 0V64a8 8 0 0 0-11.58-7.16l-16 8a8 8 0 0 0-3.58 10.74M112 144a8 8 0 0 0-11.58-7.16l-16 8a8 8 0 0 0 7.16 14.32l4.42-2.22V192a8 8 0 0 0 16 0Zm16-56c0-18.84-10.69-32-26-32S76 69.16 76 88s10.69 32 26 32s26-13.16 26-32m56 80c0-18.84-10.69-32-26-32s-26 13.16-26 32s10.69 32 26 32s26-13.16 26-32m-82-96a7.77 7.77 0 0 0-7 3.89c-1.94 3-3 7.37-3 12.11c0 1.64.28 16 10 16a7.77 7.77 0 0 0 7-3.89c1.94-3 3-7.36 3-12.11c0-1.64-.28-16-10-16"
      />
    </svg>
  );
}

export function IconTechnology(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" {...props}>
      <rect width="16" height="16" fill="none" />
      <path fill="currentColor" d="M6 6v4h4V6z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2H1.75a.75.75 0 0 0 0 1.5H3v.75H1.75a.75.75 0 0 0 0 1.5H3v.75H1.75a.75.75 0 0 0 0 1.5H3a2 2 0 0 0 2 2v1.25a.75.75 0 0 0 1.5 0V13h.75v1.25a.75.75 0 0 0 1.5 0V13h.75v1.25a.75.75 0 0 0 1.5 0V13a2 2 0 0 0 2-2h1.25a.75.75 0 0 0 0-1.5H13v-.75h1.25a.75.75 0 0 0 0-1.5H13V6.5h1.25a.75.75 0 0 0 0-1.5H13a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-.75V1.75a.75.75 0 0 0-1.5 0V3H6.5V1.75A.75.75 0 0 0 5.75 1M11 4.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconTelecom(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="m9.74 23.53l-3.78-3.77a.976.976 0 0 1-.95.75a1.003 1.003 0 0 1-1-1a.99.99 0 0 1 .75-.95l-3.51-3.51a6 6 0 0 1 8.49 8.48"
      />
      <path
        fill="currentColor"
        d="m22.46 12.45l-2.94-2.94l.86-.86a1.956 1.956 0 0 0 0-2.76L18.9 4.41a1.97 1.97 0 0 0-2.77 0l-.85.85l-2.95-2.94a1.67 1.67 0 0 0-2.36 0L6.2 6.09a1.67 1.67 0 0 0 0 2.36l2.95 2.95l-.15.14a1.95 1.95 0 0 0 0 2.77l.74.74l.74.74a1.955 1.955 0 0 0 2.76 0l.15-.15l2.94 2.94a1.68 1.68 0 0 0 2.37 0l3.76-3.76a1.666 1.666 0 0 0 0-2.37M7.38 7.27l3.77-3.77l2.94 2.95l-3.76 3.76ZM17.52 17.4l-2.95-2.94l3.77-3.77l2.94 2.94Z"
      />
    </svg>
  );
}

export function IconUtilities(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" {...props}>
      <rect width="16" height="16" fill="none" />
      <path
        fill="currentColor"
        d="M4.41 15.89c-.15 0-.27-.05-.37-.11c-.32-.22-.4-.67-.21-1.2L6.24 8H4.5c-.3 0-.55-.13-.7-.36c-.16-.23-.17-.54-.05-.84l2.57-6c.2-.45.71-.8 1.18-.8h5.17c.29 0 .55.13.7.36c.16.24.17.54.05.84L10.33 7h1.84c.37 0 .66.17.78.47c.08.21.14.63-.42 1.15l-7.29 6.87c-.34.3-.61.4-.83.4"
      />
    </svg>
  );
}

export function IconWork(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        d="M14 3a3 3 0 0 1 3 3h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3a3 3 0 0 1 3-3zm5 7H5a1 1 0 0 0-.117 1.993L5 12h6v1a1 1 0 0 0 1.993.117L13 13v-1h6a1 1 0 0 0 .117-1.993zm-5-5h-4a1 1 0 0 0-.993.883L9 6h6a1 1 0 0 0-.883-.993z"
      />
    </svg>
  );
}

export function IconOther(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconArchive(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" {...props}>
      <rect width="512" height="512" fill="none" />
      <path
        fill="currentColor"
        d="M32 448c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V160H32zm160-212c0-6.6 5.4-12 12-12h104c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12zM480 32H32C14.3 32 0 46.3 0 64v48c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.7-14.3-32-32-32"
      />
    </svg>
  );
}







