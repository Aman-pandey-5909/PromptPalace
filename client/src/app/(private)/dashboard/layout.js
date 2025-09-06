export default function DashboardLayout({ children, modal }) {
  return (
    <div className="relative">
      {children}  {/* Main page content */}
      {modal}     {/* Parallel route slot */}
    </div>
  )
}
