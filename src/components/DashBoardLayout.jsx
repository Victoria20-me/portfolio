export default function DashBoardLayout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {children}
    </div>
  );
}
