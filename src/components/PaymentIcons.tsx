import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Official bKash Origami Bird Icon
 * Accurately represents the multi-faceted origami bird on the signature bKash magenta background (#E2136E).
 */
export function BkashIcon({ className = "w-6 h-6", size = 48 }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* bKash Signature Magenta Background with smooth rounded corners */}
      <rect width="48" height="48" rx="10" fill="#E2136E" />
      
      {/* Background subtle faceted ambient highlight */}
      <path
        d="M24 6L6 24l18 18 18-18L24 6z"
        fill="#FFFFFF"
        opacity="0.06"
      />

      {/* bKash Iconic Origami Bird Shapes */}
      {/* Wing Top Left */}
      <path
        d="M24.8 9.5L13.2 24.8l10.4-3.1 1.2-12.2z"
        fill="#FFFFFF"
      />
      {/* Beak / Head pointing forward */}
      <path
        d="M24.8 9.5l4.8 7.2-5.8 5 1-12.2z"
        fill="#FFE3ED"
      />
      {/* Main Center Body */}
      <path
        d="M23.8 21.7L10.5 25.5l14 7.2 4.2-7.5-4.9-3.5z"
        fill="#FFFFFF"
      />
      {/* Upper Wing Sweep */}
      <path
        d="M29.6 16.7l9.8 4.8-10.7 3.2.9-8z"
        fill="#FFD2E3"
      />
      {/* Lower Tail Sweep */}
      <path
        d="M24.5 32.7l-4.5 6.8 9.2-4.2-4.7-2.6z"
        fill="#F890B9"
      />
      {/* Tail Fin */}
      <path
        d="M29.2 35.3l8.3-8.8-8.8 1.3.5 7.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official Nagad Swirl & Flame Icon
 * Matches the official Nagad warm orange-red gradient and dynamic ribbon swirl.
 */
export function NagadIcon({ className = "w-6 h-6", size = 48 }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nagadGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F99F1B" />
          <stop offset="60%" stopColor="#F15A24" />
          <stop offset="100%" stopColor="#D91B24" />
        </linearGradient>
        <linearGradient id="nagadInner" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFF1E0" />
        </linearGradient>
      </defs>

      {/* Nagad Brand Gradient Base */}
      <rect width="48" height="48" rx="10" fill="url(#nagadGrad)" />

      {/* Outer Glow Ring */}
      <circle cx="24" cy="24" r="17" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.25" />

      {/* Nagad Signature Dynamic Ribbon Loop */}
      <path
        d="M24 11C16.8 11 11 16.8 11 24s5.8 13 13 13c3.8 0 7.2-1.6 9.6-4.2l-3.8-3.6c-1.5 1.6-3.6 2.6-5.8 2.6-4.6 0-8.2-3.7-8.2-8.2 0-4.6 3.7-8.2 8.2-8.2 2.3 0 4.3 1 5.8 2.6l3.8-3.6C31.2 12.6 27.8 11 24 11z"
        fill="url(#nagadInner)"
      />
      {/* Inner Flame Swoosh Core */}
      <path
        d="M24 17c-3.9 0-7 3.1-7 7s3.1 7 7 7c2.2 0 4.1-1 5.3-2.5l-3.3-2.7c-.5.7-1.3 1.1-2 1.1-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9c.7 0 1.5.4 2 1.1l3.3-2.7C28.1 18 26.2 17 24 17z"
        fill="#C11119"
      />
      {/* Center Energy Dot */}
      <circle cx="24" cy="24" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Official Visa Card Icon
 * Accurately rendered with Visa Royal Blue background and the iconic gold flick on the 'V'.
 */
export function VisaIcon({ className = "w-6 h-6", size = 48 }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="visaBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#172B85" />
          <stop offset="100%" stopColor="#0B1A5C" />
        </linearGradient>
      </defs>

      {/* Card Body */}
      <rect width="48" height="48" rx="10" fill="url(#visaBg)" stroke="#233B9B" strokeWidth="1" />

      {/* Subtle chip texture glow */}
      <circle cx="38" cy="12" r="14" fill="#FFFFFF" fillOpacity="0.04" />

      {/* Gold wing/flag on upper-left of 'V' */}
      <path
        d="M10.2 17.2h5.4l-1.6 7.6c-.6-2.6-2-5.4-3.8-7.6z"
        fill="#F7B600"
      />

      {/* Main VISA Typography (Clean Geometric SVG Wordmark) */}
      {/* V */}
      <path
        d="M14 24.8l3.6-7.6h3.4l-5.3 12.8h-3.2L8.8 19.3c1.9 1.1 3.7 3.2 4.4 5.5h.8z"
        fill="#FFFFFF"
      />
      {/* I */}
      <path
        d="M20.6 17.2h3.2l-2 12.8h-3.2l2-12.8z"
        fill="#FFFFFF"
      />
      {/* S */}
      <path
        d="M28.4 17.1c-1.4 0-2.4.7-2.9 1.5l2.6 1.1c.3-.5.8-.8 1.4-.8.7 0 1.2.3 1.2.7 0 .5-.5.8-1.4 1.2-1.5.6-2.5 1.3-2.5 2.6 0 1.8 1.6 2.8 3.5 2.8 1.3 0 2.3-.4 2.9-.9l-.6-2.1c-.5.4-1.2.7-2 .7-.7 0-1.2-.3-1.2-.7 0-.5.5-.8 1.4-1.2 1.6-.7 2.5-1.4 2.5-2.7-.1-1.6-1.5-2.5-3.4-2.5z"
        fill="#FFFFFF"
      />
      {/* A */}
      <path
        d="M36.8 17.2h-2.5c-.8 0-1.4.4-1.7 1.2l-4.7 11.6h3.4l.7-1.9h4.1l.4 1.9h3l-2.7-12.8zm-3.8 8l1.7-4.6c.1-.2.4-1.1.5-1.5l.3 1.4.9 4.7h-3.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Mastercard Icon
 * Accurately rendered overlapping red & orange-yellow circles.
 */
export function MastercardIcon({ className = "w-6 h-6", size = 48 }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="10" fill="#0E0E14" stroke="#27272A" strokeWidth="1" />
      {/* Red Circle */}
      <circle cx="19" cy="24" r="10.5" fill="#EB001B" />
      {/* Yellow/Orange Circle */}
      <circle cx="29" cy="24" r="10.5" fill="#F79E1B" />
      {/* Overlap Lens */}
      <path
        d="M24 16.2a10.45 10.45 0 0 0-4.8 7.8 10.45 10.45 0 0 0 4.8 7.8 10.45 10.45 0 0 0 4.8-7.8 10.45 10.45 0 0 0-4.8-7.8z"
        fill="#FF5F00"
      />
    </svg>
  );
}
