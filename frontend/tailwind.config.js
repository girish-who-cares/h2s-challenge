/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "primary": "#4F6DFF",
              "on-primary": "#ffffff",
              "primary-container": "#E0E7FF",
              "on-primary-container": "#4F6DFF",
              "secondary": "#006a61",
              "surface": "#f7f9fe",
              "surface-variant": "#e4e1ee",
              "on-surface": "#1b1b24",
              "on-surface-variant": "#464555",
              "surface-container-highest": "#e4e1ee",
              "surface-container-high": "#eae6f4",
              "surface-container": "#f1f4f9",
              "surface-container-low": "#f1f4f9",
              "surface-container-lowest": "#ffffff",
              "outline": "#777587",
              "outline-variant": "#c7c4d8",
              "text-main": "#1E293B",
              "text-muted": "#64748B",
              "urgency-critical": "#EF4444",
              "urgency-warning": "#F59E0B",
              "urgency-safe": "#10B981",
              "urgency-muted": "#94A3B8",
              "success-bg": "#F0FDF4",
              "error": "#EF4444"
      },
      "borderRadius": {
              "DEFAULT": "8px",
              "lg": "8px",
              "xl": "12px",
              "2xl": "1rem",
              "full": "9999px"
      },
      "spacing": {
              "sm": "8px",
              "xl": "32px",
              "lg": "24px",
              "container-max": "600px",
              "md": "16px",
              "unit": "4px",
              "xs": "4px"
      },
      "fontFamily": {
              "body-lg": ["Manrope"],
              "label-caps": ["Manrope"],
              "body-md": ["Manrope"],
              "h1": ["Plus Jakarta Sans"],
              "h2": ["Plus Jakarta Sans"],
              "deadline-pill": ["Manrope"]
      },
      "fontSize": {
              "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
              "label-caps": ["12px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "700"}],
              "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
              "h1": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}],
              "h2": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
              "deadline-pill": ["14px", {"lineHeight": "1", "fontWeight": "600"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
