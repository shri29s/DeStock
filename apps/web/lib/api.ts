// API utility for backend requests
export async function fetchShareholderBalance(
  companyId: number,
  address: string
): Promise<number> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/shareholders/${companyId}`
  );
  if (!res.ok) return 0;
  const data = await res.json();
  const shareholder = data.find(
    (s: any) => s.address.toLowerCase() === address.toLowerCase()
  );
  return shareholder ? shareholder.balance : 0;
}
