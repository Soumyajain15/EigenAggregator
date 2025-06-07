export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 text-center mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} EigenAggregator. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Data provided for informational purposes only. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
