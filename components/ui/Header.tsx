export default function Header({ children }: { children: string }) {
  return <h1 className="text-4xl font-semibold">{children}</h1>;
}
