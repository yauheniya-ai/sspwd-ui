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

// ---------------------------------------------------------------------------
// UI / action icons (offline replacements for @iconify/react)
// ---------------------------------------------------------------------------

export function IconCheck(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
    </svg>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" />
    </svg>
  );
}

export function IconEyeOff(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" />
    </svg>
  );
}

export function IconLockOutline(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3" />
    </svg>
  );
}

export function IconOpenInNew(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z" />
    </svg>
  );
}

export function IconChevronUp(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
    </svg>
  );
}

export function IconPencil(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" />
    </svg>
  );
}

export function IconImageMultiple(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M21 17H7V3h14m0-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2M3 5H1v16a2 2 0 0 0 2 2h16v-2H3m12.96-10.71l-2.75 3.54l-1.96-2.36L8.5 15h11z" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M6.5 20q-2.28 0-3.89-1.57Q1 16.85 1 14.58q0-1.95 1.17-3.48q1.18-1.53 3.08-1.95q.63-2.3 2.5-3.72Q9.63 4 12 4q2.93 0 4.96 2.04Q19 8.07 19 11q1.73.2 2.86 1.5q1.14 1.28 1.14 3q0 1.88-1.31 3.19T18.5 20H13q-.82 0-1.41-.59Q11 18.83 11 18v-5.15L9.4 14.4L8 13l4-4l4 4l-1.4 1.4l-1.6-1.55V18h5.5q1.05 0 1.77-.73q.73-.72.73-1.77t-.73-1.77Q19.55 13 18.5 13H17v-2q0-2.07-1.46-3.54Q14.08 6 12 6Q9.93 6 8.46 7.46Q7 8.93 7 11h-.5q-1.45 0-2.47 1.03Q3 13.05 3 14.5T4.03 17q1.02 1 2.47 1H9v2m3-7" />
    </svg>
  );
}

export function IconDice(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7.5 6C6.7 6 6 6.7 6 7.5S6.7 9 7.5 9S9 8.3 9 7.5S8.3 6 7.5 6m9 9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5s1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5m0-4.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S18 12.8 18 12s-.7-1.5-1.5-1.5m0-4.5c-.8 0-1.5.7-1.5 1.5S15.7 9 16.5 9S18 8.3 18 7.5S17.3 6 16.5 6m-9 4.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S9 12.8 9 12s-.7-1.5-1.5-1.5m0 4.5c-.8 0-1.5.7-1.5 1.5S6.7 18 7.5 18S9 17.3 9 16.5S8.3 15 7.5 15" />
    </svg>
  );
}

export function IconTableEdit(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="m21.7 13.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M12 18.94l6.07-6.06l2.05 2.05L14.06 21H12zM4 2h14a2 2 0 0 1 2 2v4.17L16.17 12H12v4.17L10.17 18H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 4v4h6V6zm8 0v4h6V6zm-8 6v4h6v-4z" />
    </svg>
  );
}

export function IconFolderPlus(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M13 19c0 .34.04.67.09 1H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h8a2 2 0 0 1 2 2v5.81c-.61-.35-1.28-.59-2-.72V8H4v10h9.09c-.05.33-.09.66-.09 1m7-1v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
    </svg>
  );
}

export function IconGithub(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
    </svg>
  );
}

export function IconApi(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M7 7H5a2 2 0 0 0-2 2v8h2v-4h2v4h2V9a2 2 0 0 0-2-2m0 4H5V9h2m7-2h-4v10h2v-4h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m0 4h-2V9h2m6 0v6h1v2h-4v-2h1V9h-1V7h4v2Z" />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M21 4H3a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M3 19V6h8v13zm18 0h-8V6h8zm-7-9.5h6V11h-6zm0 2.5h6v1.5h-6zm0 2.5h6V16h-6z" />
    </svg>
  );
}

export function IconCalendarStar(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V9h14zm0-12H5V5h14zm-8 6H7.8l2.6 2l-1 3l2.6-1.8l2.6 1.8l-1-3l2.6-2H13l-1-3z" />
    </svg>
  );
}

export function IconCalendarPlus(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M13 13h3v2h-3v3h-2v-3H8v-2h3v-3h2zm8-8v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2M5 5v2h14V5zm14 14V9H5v10z" />
    </svg>
  );
}

export function IconCalendarEdit(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="m21.7 13.35l-1 1l-2.05-2l1-1c.2-.21.54-.22.77 0l1.28 1.28c.19.2.19.52 0 .72M12 18.94V21h2.06l6.06-6.12l-2.05-2zM5 19h5v2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2v4H5zM5 5v2h14V5z" />
    </svg>
  );
}

export function IconUnlock(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7 7a5 5 0 0 1 9.843-1.25a1 1 0 0 1-1.937.5A3 3 0 0 0 9 7v3h8.4c.88 0 1.6.72 1.6 1.6v7c0 1.32-1.08 2.4-2.4 2.4H7.4C6.08 21 5 19.92 5 18.6v-7c0-.88.72-1.6 1.6-1.6H7zm5 5.25a1.75 1.75 0 0 0-.75 3.332V18a.75.75 0 0 0 1.5 0v-2.418A1.75 1.75 0 0 0 12 12.25" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 2a5 5 0 0 0-5 5v3h-.4c-.88 0-1.6.72-1.6 1.6v7C5 19.92 6.08 21 7.4 21h9.2c1.32 0 2.4-1.08 2.4-2.4v-7c0-.88-.72-1.6-1.6-1.6H17V7a5 5 0 0 0-5-5m3 8V7c0-1.658-1.342-3-3-3S9 5.342 9 7v3z" />
    </svg>
  );
}

export function IconPypi(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M23.922 13.58v3.912L20.55 18.72l-.078.055l.052.037l3.45-1.256l.026-.036v-3.997l-.053-.036l-.025.092zm-.301-7.962l-3.04 1.107v3.912l3.339-1.215V5.509zm.299 7.839V9.544l-3.336 1.215v3.913zm-3.45 1.253V10.8l-3.3 1.2v3.913zm-3.436 5.286v-3.912l-3.313 1.206v3.912zm.136-3.939v3.868l3.314-1.206V14.85zm2.093 1.882c-.367.134-.663-.074-.663-.46s.296-.814.663-.947c.365-.133.662.075.662.464s-.297.814-.662.946m-6.038-8.624l.365-.132l-3.285-1.197l-3.323 1.21l.102.037l3.184 1.16zm7.282 1.349V6.751L17.17 7.965v3.913zm-3.449 1.254V8.005l-3.302 1.202v3.912zm-3.415-2.672l-3.336 1.215v3.913l3.336-1.215zm-6.736 3.919l3.322 1.209v-3.913L6.907 9.252zm3.433-5.292l3.281 1.193V5.198l-3.28-1.193zm10.167-5.158L17.19 3.922v3.913l3.317-1.207zM16.95 3.903L13.724 2.73l-3.269 1.19l3.225 1.174zm-1.585.703l-1.624.592v3.868l3.317-1.207V3.991zm-.391 2.778c-.367.134-.662-.074-.662-.464s.295-.813.662-.946c.366-.133.663.074.663.464s-.297.813-.663.946M10.229 18.41v-3.914l-3.322-1.209V17.2zm3.449-1.228v-3.913l-3.371 1.227v3.913zm.078-.028l3.3-1.2V12.04l-3.3 1.2zm-.078 4.063l-3.371 1.227v-3.912h-.078v3.912l-3.322-1.209v-3.913l-.053-.058l-.025-.06l-3.336-1.21v-3.948l.034.013l3.287 1.196l.015-.078l-3.261-1.187l3.26-1.187v-.109L3.876 9.62l-.307-.112l3.26-1.188v.877l.079-.055V6.769l3.257 1.185l.058-.061L7.084 6.75l-.102-.037l3.24-1.179v-.083L6.854 6.677v.018l-.025.018v1.523L3.44 9.47v.02l-.025.017v4.007l-3.39 1.233v.019L0 14.784v3.995l.025.037l3.4 1.237l.008-.006l.007.01l3.4 1.238l.008-.006l.006.01l3.4 1.237l.014-.009l.012.01l3.45-1.256l.026-.037zM3.493 9.563l3.257 1.185l-3.257 1.187V9.562zM3.4 19.96L.078 18.752v-3.913l2.361.86l.96.349zm.015-3.99l-3.08-1.12l-.182-.066l3.262-1.187zm3.399 5.231l-3.321-1.209V16.08l3.321 1.209zM23.791 5.434l-3.21-1.17v2.338zm-3.404-2.791l-3.24-1.18l-3.27 1.19l3.247 1.182z" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1" />
    </svg>
  );
}

export function IconEmailOutline(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5" />
    </svg>
  );
}

export function IconCloseCircle(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z" />
    </svg>
  );
}

export function IconSortAsc(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M19 17h3l-4 4l-4-4h3V3h2M2 17h10v2H2M6 5v2H2V5m0 6h7v2H2z" />
    </svg>
  );
}

export function IconSortDesc(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M19 7h3l-4-4l-4 4h3v14h2M2 17h10v2H2M6 5v2H2V5m0 6h7v2H2z" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect width="24" height="24" fill="none" />
      <path fill="currentColor" d="M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7z" />
    </svg>
  );
}







