"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Styled Clerk SignIn */}
      <div className="z-10">
        <SignIn
  appearance={{
    variables: {
      colorPrimary: "#2563eb",
      colorText: "white",
      colorBackground: "transparent",
      colorInputBackground: "#18181b",
    },
   elements: {
  card: "backdrop-blur-md bg-white/10 text-white shadow-xl rounded-xl border border-white/20",
  headerTitle: "text-white text-xl font-semibold",
  headerSubtitle: "text-gray-300 text-sm",
  formFieldLabel: "text-white text-sm",
  formFieldInput:
    "bg-zinc-900 text-white placeholder:text-gray-400 border border-gray-700",
  formButtonPrimary:
    "bg-blue-600 hover:bg-blue-700 text-white font-medium",
  socialButtonsBlockButton:
    "bg-white text-black hover:bg-gray-100 shadow-md backdrop-blur-md rounded-md transition",
  footerActionText: "text-gray-400",
  footerActionLink: "text-blue-400 hover:text-blue-600",
},

  }}
/>

      </div>
    </div>
  );
}
