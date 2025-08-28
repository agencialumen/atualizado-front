"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    fbq: any
    ttq: any
  }
}

export default function QuizLandingPage() {
  const router = useRouter()

  const handleStartQuiz = () => {
    // Track quiz start with Meta Pixel only
    if (typeof window !== "undefined") {
      // Meta Pixel
      if (window.fbq) {
        window.fbq("track", "PageView")
      }

      // TikTok Pixel - only pageview is necessary here
      if (window.ttq) {
        window.ttq("track", "PageView")
      }
    }

    router.push("/quiz")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Bar */}
      <div className="w-full bg-[#00a9a4] py-2 px-4 flex justify-center items-center">
        <div className="w-20 h-10 relative">
          <Image src="/images/pampers-logo.svg" alt="Pampers Logo" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-lg border-2 border-[#00E0FF] bg-[#bae3e3] p-4">
          {/* Top Section with Image */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-4">
            <Image src="/images/bv.png" alt="Bem-Vinda ao Quiz Premiado" layout="fill" objectFit="cover" priority />
          </div>

          {/* Text Content */}
          <div className="text-center text-[#008080] mb-6 px-2">
            <p className="text-sm mb-1">Participe do Quiz Especial da Pampers e</p>
            <p className="text-lg font-bold mb-2">GANHE</p>
            <p className="text-sm mb-4">
              Responda algumas perguntinhas simples e garanta até 17 pacotes de fraldas grátis + 11 lenços umedecidos.
            </p>
            <p className="text-xs italic">*Permitido apenas um resgate por e-mail*</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 mb-6 px-2">
            <Input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-full px-4 py-2 text-center border-2 border-[#00E0FF] focus:border-[#00E0FF] focus:ring-0"
            />
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="w-full rounded-full px-4 py-2 text-center border-2 border-[#00E0FF] focus:border-[#00E0FF] focus:ring-0"
            />
          </div>

          {/* Call to Action Button */}
          <div className="px-2 pb-4">
            <Button
              onClick={handleStartQuiz}
              className="w-full rounded-full py-3 text-lg font-bold text-white bg-gradient-button shadow-lg hover:opacity-90 transition-opacity"
              style={{
                boxShadow: "0 4px 15px rgba(255, 0, 92, 0.4), 0 4px 15px rgba(255, 138, 0, 0.4)",
              }}
            >
              COMEÇAR DESAFIO
            </Button>
          </div>
        </div>

        {/* Footer Text Below Quiz Window */}
        <div className="mt-8 text-center px-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            © Pampers Online. Todos os direitos reservados.
          </p>
          <p className="text-xs">
            <a href="#" className="text-orange-500 hover:text-orange-600 underline">
              Termos e condições
            </a>
            {" | "}
            <a href="#" className="text-orange-500 hover:text-orange-600 underline">
              Política de privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
