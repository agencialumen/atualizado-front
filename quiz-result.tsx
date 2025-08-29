"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function QuizResult() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(5 * 60) // 5 minutos em segundos
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Marina S.",
      location: "São Paulo - SP",
      text: "Incrível! Recebi 9 pacotes + 6 lenços pagando só o frete de R$ 9,90. Minha filha não teve mais assaduras!",
      rating: 5,
    },
    {
      name: "Carla M.",
      location: "Rio de Janeiro - RJ",
      text: "Pensei que era pegadinha... Mas chegou tudo grátis mesmo! Só paguei o frete. Economizei mais de R$ 300!",
      rating: 5,
    },
    {
      name: "Juliana R.",
      location: "Belo Horizonte - MG",
      text: "Melhor promoção que já vi! Produtos originais, entrega rápida e só paguei R$ 9,90 de frete. Recomendo!",
      rating: 5,
    },
    {
      name: "Amanda L.",
      location: "Brasília - DF",
      text: "Gente, é real! Kit completo grátis, qualidade perfeita. Vale muito a pena pagar só o frete!",
      rating: 5,
    },
  ]

  useEffect(() => {
    // Meta Pixel - CompleteRegistration quando chega na página de resultado
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration", {
        content_name: "Quiz Pampers Completed",
        content_category: "Quiz",
        value: 0.0,
        currency: "BRL",
      })
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Rotate testimonials
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(testimonialTimer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClaimDiscount = () => {
    // Meta Pixel - Purchase quando clica para resgatar
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        content_name: "Pampers Discount Claimed",
        content_category: "Discount",
        value: 98.0,
        currency: "BRL",
      })
    }

    // Redireciona para a página de resgate do desconto
    window.open("https://pamperspag.netlify.app", "_blank")
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
      <div className="flex flex-col flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Result Container */}
          <div className="bg-[#ccd0dc] rounded-3xl overflow-hidden shadow-lg border-2 border-[#00E0FF]">
            {/* Result Image */}
            <div className="relative w-full h-[400px]">
              <Image
                src="/images/quiz-result.png"
                alt="Parabéns! Você ganhou 09 pacotes de fraldas + 06 lenços umedecidos"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-6 bg-[#ccd0dc]">
              {/* Congratulations */}
              <div className="text-center mb-6">
                <p className="text-[#008080] text-xl font-bold mb-2">🎉 PARABÉNS! Você ganhou seu kit grátis!</p>
                <p className="text-[#008080] text-sm">9 pacotes de fraldas + 6 lenços umedecidos Pampers</p>
              </div>

              {/* Price Info */}
              <div className="bg-green-100 rounded-xl p-4 mb-6 border-2 border-green-400">
                <div className="text-center">
                  <div className="text-green-800 text-2xl font-bold mb-1">🎁 TOTALMENTE GRÁTIS</div>
                  <div className="text-green-700 text-lg">Você paga apenas o frete</div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm mr-2">
                    {"★".repeat(testimonials[currentTestimonial].rating)}
                  </div>
                  <span className="text-green-600 text-xs font-bold">✓ ENTREGA CONFIRMADA</span>
                </div>
                <p className="text-gray-800 text-sm italic mb-2">"{testimonials[currentTestimonial].text}"</p>
                <div className="text-xs text-gray-600">
                  <strong>{testimonials[currentTestimonial].name}</strong> - {testimonials[currentTestimonial].location}
                </div>
              </div>

              {/* Timer - Movido para cá, mais sutil */}
              <div className="bg-orange-100 border-l-4 border-orange-500 p-3 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-orange-800 text-sm font-bold">⏰ Oferta expira em:</div>
                    <div className="text-orange-700 text-xs">Garante o seu agora!</div>
                  </div>
                  <div className="text-orange-800 text-xl font-bold">{formatTime(timeLeft)}</div>
                </div>
              </div>

              <Button
                onClick={handleClaimDiscount}
                className="w-full rounded-full py-4 text-lg font-bold text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg hover:opacity-90 transition-opacity"
                style={{
                  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)",
                }}
              >
                🎁 RESGATAR MEU KIT GRÁTIS
              </Button>

              <div className="text-center mt-3">
                <div className="text-xs text-gray-600">🔒 Pagamento seguro • 📦 Entrega em 3-7 dias úteis</div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-4 text-center">
            <div className="text-gray-600 text-sm">👥 1.247 mães resgataram hoje</div>
            <div className="text-gray-500 text-xs">⭐ Avaliação: 4.9/5 estrelas</div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-auto pt-8 text-center px-4">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">© Pampers Online. Todos os direitos reservados.</p>
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
  )
}
