import Image from 'next/image';

export function ArticleImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;

  return (
    <span className="my-8 block overflow-hidden rounded-lg border border-border">
      <Image src={src} alt={alt ?? ''} width={1200} height={675} sizes="100vw" className="h-auto w-full" />
    </span>
  );
}
