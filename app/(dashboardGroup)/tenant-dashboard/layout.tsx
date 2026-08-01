export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Tenant Dashboard Layout</h1>

      {children}
    </div>
  );
}