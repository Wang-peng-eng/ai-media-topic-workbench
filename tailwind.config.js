export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1117",
        panel: "#131922",
        panel2: "#171f2b",
        panel3: "#0f151f",
        line: "#273244",
        text: "#e6edf3",
        muted: "#8b949e",
        cyan: "#2dd4bf",
        gold: "#f2c94c",
        red: "#ff6b6b"
      },
      boxShadow: {
        workbench: "0 1px 0 rgba(255,255,255,.03), 0 18px 60px rgba(0,0,0,.24)"
      }
    }
  },
  plugins: []
};
