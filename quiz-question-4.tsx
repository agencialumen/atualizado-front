"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

const quizOptions: QuizOption[] = [
  { id: "1", text: "Ar circulante", isCorrect: false },
  { id: "2", text: "Microbolhas de ar", isCorrect: false },
  { id: "3", text: "Canais de absorção", isCorrect: true },
  { id: "4", text: "Zíper qualitex", isCorrect: false },
]

export default function QuizQuestion4() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [points, setPoints] = useState(150) // Pontos acumulados
  const router = useRouter()
  const errorAudioRef = useRef<HTMLAudioElement>(null)
  const successAudioRef = useRef<HTMLAudioElement>(null)

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setTimeout(() => {
      setShowResult(true)

      const selectedOptionData = quizOptions.find((option) => option.id === optionId)
      if (selectedOptionData?.isCorrect) {
        // Safely play success audio
        if (successAudioRef.current) {
          successAudioRef.current.play().catch((error) => {
            console.log("Audio play interrupted:", error)
          })
        }
        setShowCelebration(true)

        // Atualizar pontos
        setTimeout(() => {
          setPoints(200)
        }, 1000)

        setTimeout(() => {
          router.push("/quiz/question-5")
        }, 2000)
      } else {
        // Safely play error audio
        if (errorAudioRef.current) {
          errorAudioRef.current.play().catch((error) => {
            console.log("Audio play interrupted:", error)
          })
        }
        setTimeout(() => {
          setSelectedOption(null)
          setShowResult(false)
        }, 2000)
      }
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Audio elements */}
      <audio ref={errorAudioRef} preload="auto">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SOM%20NEGADO%20OK-UTCE7VkKJOha7x5vtMo6JN0HKjld6J.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={successAudioRef} preload="auto">
        <source src="/sounds/success-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Header Bar */}
      <div className="w-full bg-[#00a9a4] py-2 px-4 flex justify-center items-center">
        <div className="w-20 h-10 relative">
          <Image src="/images/pampers-logo.svg" alt="Pampers Logo" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-40 h-40 relative">
            <Image
              src="/images/success-celebration.gif"
              alt="Parabéns!"
              layout="fill"
              objectFit="contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Quiz Container */}
          <div className="bg-[#bae3e3] rounded-3xl p-6 shadow-lg border-2 border-[#00E0FF] relative">
            {/* Points Counter */}
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-xs font-semibold">SEUS PONTOS</div>
                <div className="text-lg font-bold">🏆 {points}</div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6 mt-4">
              <div className="bg-white rounded-xl p-4 mb-4 border-2 border-yellow-300">
                <div className="text-center text-yellow-700 text-sm font-bold mb-2">
                  💡 CADA RESPOSTA CERTA = +50 PONTOS
                </div>
                <div className="text-center text-yellow-600 text-xs">Troque seus pontos no final!</div>
              </div>

              <h2 className="text-[#008080] text-lg font-semibold mb-4">
                4. Qual tecnologia exclusiva ajuda a distribuir o xixi uniformemente na fralda Pampers?
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {quizOptions.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => !showResult && handleOptionSelect(option.id)}
                  disabled={showResult}
                  className={`
                    w-full p-4 text-left rounded-xl text-white font-medium transition-all duration-300 min-h-[60px] flex items-center
                    ${
                      selectedOption === option.id
                        ? showResult
                          ? option.isCorrect
                            ? "bg-green-500 hover:bg-green-500 scale-105 shadow-lg"
                            : "bg-red-500 hover:bg-red-500"
                          : "bg-[#00a9a4] hover:bg-[#00a9a4] ring-2 ring-white"
                        : "bg-[#00a9a4] hover:bg-[#008a86]"
                    }
                    ${showResult ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}
                  `}
                >
                  <span className="text-sm leading-relaxed whitespace-normal break-words flex-1 pr-2">
                    {option.text}
                  </span>
                  {showResult && selectedOption === option.id && option.isCorrect && (
                    <span className="ml-2 flex-shrink-0">✓ +50 pontos!</span>
                  )}
                </Button>
              ))}
            </div>

            {/* Motivation Footer */}
            <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-3">
              <div className="text-center text-[#008080] text-sm font-semibold">
                🚀 Você está quase lá! Mais 3 perguntas para trocar seus pontos!
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-6 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-2 bg-[#00a9a4] rounded-full animate-pulse"></div>
              <div className="w-6 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-auto pt-8 text-center px-4">
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
