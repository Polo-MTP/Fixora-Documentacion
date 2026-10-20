'use client';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { staticClient } from 'fumadocs-core/search/client/orama-static';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { create } from 'zbsearch';

/** La base del navegador debe usar el mismo idioma que el índice (api/search/route.ts), o no separa la ñ ni las tildes. */
function initOrama() {
  return create({ schema: { _: 'string' }, language: 'spanish' });
}

const client = staticClient({ initOrama });

/** Buscador (Ctrl K) para el sitio exportado: descarga el índice una vez y busca sin servidor. */
export default function StaticSearchDialog(props: SharedProps) {
  const search = useDocsSearch({ client });

  return (
    <SearchDialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  );
}
