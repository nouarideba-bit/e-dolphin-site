module.exports = {
  content: ['./v2/**/*.html', './v2/assets/js/*.js'],
  theme: {
    extend: {
      colors: { abyss: '#06131C', deep: '#0A1E2B', foam: '#F6F8F7', brume: '#8FA3AE', lagoon: '#2EE6A8', teal: '#0FA3B1', lime: '#9BE15D', sand: '#CBB994' },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      }
    }
  }
};
