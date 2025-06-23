import Navbar from "@/components/navbar";
import Image from "next/image";
import ChatPage from "./chat/page";

export default function Home() {
  return (
   <>
   <Navbar/>
   <ChatPage/>
   </>
  );
}
