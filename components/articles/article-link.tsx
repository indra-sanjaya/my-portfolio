export function ArticleLink(props: React.ComponentProps<'a'>) {
  const isExternal = props.href?.startsWith('http');

  return (
    <a
      {...props}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="font-medium text-foreground underline decoration-hazard decoration-2 underline-offset-4 transition-colors hover:text-hazard"
    />
  );
}
