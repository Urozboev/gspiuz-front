"use client";

/**
 * Root layout darajasidagi xato — bu yerda kontekst provayderlari ham
 * ishlamayotgan bo'lishi mumkin, shuning uchun hech qanday hook va
 * tarjima ishlatilmaydi, uslublar inline beriladi.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uz">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          background: "#f5f7fb",
          color: "#1c2539",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>
            Xatolik yuz berdi
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#5d666f", lineHeight: 1.6 }}>
            Saytni yuklashda kutilmagan xatolik yuz berdi. Qayta urinib ko&apos;ring.
          </p>
          {error.digest && (
            <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#9aa3ad" }}>
              {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.75rem",
              padding: "0.85rem 1.5rem",
              border: 0,
              borderRadius: "0.75rem",
              background: "#0f1e6b",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Qayta urinish
          </button>
        </div>
      </body>
    </html>
  );
}
