export function Footer() {
  return (
    <footer className="py-8 section-padding border-t border-border">
      <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Indra Sanjaya</p>
        <p className="text-sm text-muted-foreground">Built with precision</p>
      </div>
    </footer>
  );
}
