type MetaEnv = Record<string, string | boolean | undefined>;

interface ImportMetaEnv extends Readonly<MetaEnv> {
	readonly VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
