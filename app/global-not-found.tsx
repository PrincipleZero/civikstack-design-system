/** Own <html>: with two root layouts, no single layout can host the 404. */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "ui-sans-serif, system-ui", background: "#fff", color: "#000",
        display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.14em",
            textTransform: "uppercase", opacity: 0.45 }}>Wayfinder</p>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: "8px 0" }}>Not part of the catalogue.</h1>
          <a href="/" style={{ fontSize: 14, textDecoration: "underline" }}>Back to the system</a>
        </div>
      </body>
    </html>
  );
}
