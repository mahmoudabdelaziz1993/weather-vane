import Link from "next/link";
import * as React from "react";
import { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <Link href={'/'} className="btn btn-ghost text-xl">
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48"
    className="active:animate-spin duration-300">
      <path fill="none" d="M0 0h48v48H0z" />
      <path
        fill="none"
        stroke="oklch(var(--p))"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24.003 23.965C20.703 7.12 27.079 3.92 41.853 6.112c-4.927 7.39-10.791 13.46-17.851 17.853h0Zm-.002.07C27.299 40.88 20.923 44.08 6.149 41.888c4.927-7.39 10.792-13.46 17.852-17.853Zm.036-.037C40.88 20.7 44.08 27.076 41.888 41.852c-7.389-4.927-13.46-10.793-17.851-17.854Zm-.074.002C7.12 27.3 3.92 20.922 6.112 6.148 13.501 11.074 19.572 16.939 23.963 24Zm-7.926-9.823c2.214-1.77 4.799-2.845 7.855-2.845m10.125 4.62c1.902 2.253 3.04 4.925 3.04 8.105m-5.123 9.857c-2.246 1.876-4.663 3.333-7.818 3.333M14.054 32.04a12.894 12.894 0 0 1-2.71-7.93m20.638 9.797L24 41.89l-1.976-1.976m-7.903-7.903L6.114 24l1.95-1.95m7.933-7.935 8.004-8.004 1.964 1.965m7.95 7.951L41.889 24l-1.956 1.957"
      />
    </svg>
    Vine
  </Link>
);
export default Logo;
