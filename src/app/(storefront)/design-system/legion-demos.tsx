"use client";

import { useState } from "react";

import { Badge, Button, Card, CardBody, Select, TextArea, TextField } from "@legion-ui-kit/react-core";
import { IconSearch, IconShoppingBag } from "@tabler/icons-react";

const SKIN_OPTIONS = [
  { label: "Kering", value: "dry" },
  { label: "Berminyak", value: "oily" },
  { label: "Kombinasi", value: "combination" },
  { label: "Sensitif", value: "sensitive" },
];

/**
 * Legion UI Kit showcase — parity checks for the kit's document-level pieces.
 * Status mapping card lama → komponen Legion: docs/LEGION_COMPONENT_MAPPING.md.
 * Dark-mode fixes applied: label `!text-foreground`, CardBody `!bg-surface`.
 */
export function LegionDemos() {
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [skin, setSkin] = useState<string | number>("");

  return (
    <div className="grid gap-8 desktop:grid-cols-2">
      <Card className="m-0 w-full" bordered noPadding>
        <CardBody className="!bg-surface flex flex-col gap-4 p-6">
          <p className="text-body-s text-text-secondary">
            Button + Badge (solid fill, label ≤5 karakter, <code>rounded-full</code>).
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button color="primary" variant="solid">
              <IconShoppingBag aria-hidden /> Beli sekarang
            </Button>
            <Button color="secondary" variant="outline">
              Simpan
            </Button>
            <Button color="error" variant="soft">
              Hapus
            </Button>
            <Button variant="transparent" className="!text-foreground">
              Batal
            </Button>
            <Badge label="BPOM" color="success" className="rounded-full" />
            <Badge label="Baru" color="error" className="rounded-full" />
          </div>
          <p className="text-body-s text-text-secondary">Loading state (<code>isLoading</code> + <code>loadingText</code>):</p>
          <div>
            <Button color="primary" variant="solid" isLoading loadingText="Memproses...">
              Proses
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="m-0 w-full" bordered noPadding>
        <CardBody className="!bg-surface flex flex-col gap-4 p-6">
          <p className="text-body-s text-text-secondary">
            TextField, TextArea, Select — selalu controlled; label diberi{" "}
            <code>!text-foreground</code> agar tetap terbaca di dark mode.
          </p>
          <TextField
            block
            label={<span className="!text-foreground">Cari produk</span>}
            placeholder="Serum, toner, ..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            iconLeft={<IconSearch aria-hidden />}
            hint="Ketik minimal 3 huruf."
          />
          <TextArea
            block
            label={<span className="!text-foreground">Catatan pesanan</span>}
            placeholder="Contoh: tolong dibungkus kado."
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <Select
            block
            label={<span className="!text-foreground">Jenis kulit</span>}
            placeholder="Pilih jenis kulit"
            options={SKIN_OPTIONS}
            value={skin}
            onChange={(value: string | number) => setSkin(value)}
          />
        </CardBody>
      </Card>
    </div>
  );
}
