# Legion Component Mapping

Status migrasi primitif UI CNS → komponen `@legion-ui-kit/react-core` (profil
Legion). Aturan: migrasi hanya bila **perilaku, a11y (WCAG 2.2 AA), dan dark mode
tetap benar** dan test existing tetap hijau. Primitif di `src/components/ui/*`
tetap menjadi warisan API aplikasi; komponen Legion dipakai langsung di surface
yang memakainya.

## Integrasi kit (terpasang)

- CSS: `core-styles.css` → `legion.css` → `globals.css` (urutan wajib;
  `globals.css` menang di akhir). Reset font kit (`* { font-family: Nunito
  Sans }`) dipulihkan kembali ke token CNS di akhir `globals.css`.
- Font: kit selalu Nunito Sans via rule `[class*="legion"]` + variabel
  `--font-legion` (next/font).
- Token: alias Legion `foreground` → `text-primary`, `accent` → `brand-cocoa`
  (mengikuti rantai token CNS, otomatis dark mode).
- Ikon: **wajib** `@tabler/icons-react` (migrasi penuh dari lucide-react ✓).
- Chart: **wajib** recharts (trend + funnel admin ✓).
- Toast: **wajib** sonner (`toast()` + `<Toaster />` sekali di root layout ✓).
- Dark mode: class-based `html.dark` + variabel berpasangan (✓ di `globals.css`).
- Dark-mode trap kit: label `TextField/Select/TextArea` perlu `!text-foreground`;
  background `Card` perlu `!bg-surface` eksplisit — sudah diterapkan di pemakaian.

## Mapping per primitif

| CNS (`src/components/ui/*`) | Legion | Status | Alasan |
| --- | --- | --- | --- |
| `button.tsx` (Button/ButtonLink) | `Button` | Showcase + surface baru; belum ganti global | API CNS: 7 varian brand (`primary/brand/secondary/ghost/ai/inverse/text`), `ButtonLink` (next/link), `loading` + `leadingIcon`; dipakai 60+ file + kontrak e2e. Legion `Button` punya `color`/`variant` (`solid/soft/outline/transparent`) tanpa routing. |
| `card.tsx` | `Card`/`CardBody`/`CardHeader` | **Adopted** di panel chart admin (trend + 3 funnel) & showcase | Superfisial terbatas, dark-mode trap teratasi (`!bg-surface`). Sisa call site menyusul per-bagian. |
| `badge.tsx` | `Badge` | Dipertahankan | `Badge` = solid fill only, label ≤ 5 karakter; CNS memakai label panjang ("Terdaftar BPOM", dsb). |
| `input.tsx` | `TextField` | Showcase; belum ganti global | Perubahan kontrak (label/caption/hint bawaan, controlled) menyentuh semua form + e2e. |
| `textarea.tsx` | `TextArea` | Showcase; belum ganti global | Sama dengan `TextField`. |
| `select.tsx` | `Select` | Showcase; belum ganti global | Beda kontrak: `onChange(value)` vs `onChange(event)` — butuh perubahan di setiap call site. |
| `dialog.tsx` | `Modal` | Dipertahankan | Native `<dialog>` + fokus trap + motion CNS sudah lulus audit; `Modal` mengelola `open` sendiri. |
| `choice.tsx` (Checkbox/Radio) | `Checkbox`/`Radio` | Dipertahankan | Kontrak `ChoiceGroup` + fieldset/legend a11y tidak punya padanan langsung. |
| `states.tsx` (Empty/Error/Loading/Skeleton) | `Alert`/`Spinner` | Dipertahankan | Konteks konten Indonesia + skeleton paralel khusus halaman. |
| `icon-button.tsx` | `Button` + ikon | Dipertahankan | Wajib `label` a11y; kebutuhan IconButton beda dari Button. |
| — (toast) | `Snackbar` | **Tidak dipakai** | Aturan Legion: toast = sonner (`toast()`); `snackbar` hanya untuk komponen kit sendiri. |
| — (chart) | (recharts) | **Adopted** | `TrendChartGraphic` + `FunnelChart` (LineChart/BarChart + ResponsiveContainer). |
| — (ikon) | (tabler) | **Adopted** | 61 file, `lucide-react` dihapus. |

## Jalur lanjutan (follow-up)

1. Migrasi `Card` di surface lain (product card, admin panels) setelah regresi
   visual per bagian.
2. Evaluasi `TextField`/`Select`/`TextArea` per-form (checkout → admin) dengan
   kontrak API baru didokumentasikan lebih dulu.
3. Pertahankan audit kontras setiap penambahan warna/variant baru (light & dark).
