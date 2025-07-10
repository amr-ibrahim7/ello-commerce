import { auth } from "@/lib/services/auth";
import HeaderClient from "./HeaderClient";
import { AuthSession } from "@/lib/types/auth";



export default async function Header() {
  const session = (await auth()) as AuthSession | null;
  console.log(session);
  
  return <HeaderClient session={session} />;
}
