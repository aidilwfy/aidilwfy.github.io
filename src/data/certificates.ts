import type { Certificate } from "@/types";

/**
 * ============================================================
 *  CERTIFICATES — shown in the "Certificates" tab of Awards
 * ============================================================
 *  1. Put the image in /public/images/certificates/ (JPG or PNG)
 *  2. Set `image` to its path, e.g. "/images/certificates/gold-ivic.jpg"
 *  Entries without an image show a "coming soon" placeholder.
 *  Add or remove entries freely.
 */
export const certificates: Certificate[] = [
  {
    title: "Gold Award — Road to Khatam",
    issuer: "International Vocational Innovative Competition (IVIC)",
    image: "",
  },
  {
    title: "Bronze Award — SPARK",
    issuer: "VISTA 2026",
    year: "2026",
    image: "",
  },
  {
    title: "Certificate in Database Management System and Web Application",
    issuer: "Kolej Vokasional Kuala Selangor",
    image: "",
  },
];
