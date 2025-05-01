const Badge = ({ children, color = "bg-cyan-700" }) => (
  <span className={`${color} text-white text-xs px-2 py-1 rounded-full`}>
    {children}
  </span>
);

export default Badge;