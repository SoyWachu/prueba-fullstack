import AnswersCount from "@/components/AnswersCount/AnswersCount";
import LastestAnswers from "@/components/LastestAnswers/LastestAnswers";
import TotalAnswers from "@/components/TotalAnwers/TotalAnswers";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold text-center mt-8 mb-12">
        Bienvenido al Dashboard
      </h1>

      <main className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
        <div className="w-full md:w-auto">
          <LastestAnswers />
        </div>
        <div className="w-full md:w-auto space-y-8">
          <TotalAnswers />
          <AnswersCount />
        </div>
      </main>

      <div className="mt-12 flex justify-center">
        <Link href="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
