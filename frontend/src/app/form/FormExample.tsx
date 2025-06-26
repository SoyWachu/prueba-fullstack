"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  motivacion?: string;
  lenguaje: string;
};

export default function RespuestaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const onSubmit = async (data: FormData) => {
    console.log(data, "data from ");
    const formObj = {
      email: data?.email,
      lenguaje: data?.lenguaje,
      motivacion: data?.motivacion,
    };
    try {
      const res = await fetch(
        "http://localhost:4001/dev/backend/api/responses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formObj),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.error || "Error desconocido.");
      } else {
        setSubmitted(true);
        setShowModal(true);
        reset();
        setErrorMsg("");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error al enviar el formulario.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">
          Formulario de Respuestas
        </h1>

        <div className="mb-4">
          <label className="block mb-1">
            ¿Qué te motivó a aplicar a esta posición?
          </label>
          <textarea
            {...register("motivacion")}
            className="w-full border border-gray-300 p-2 rounded"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            ¿Cuál es tu lenguaje de programación favorito?
          </label>
          <select
            {...register("lenguaje", {
              required: "Este campo es obligatorio.",
            })}
            className="w-full border border-gray-300 p-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.lenguaje && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lenguaje.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Correo electrónico</label>
          <input
            {...register("email", {
              required: "El correo es obligatorio.",
              pattern: {
                value: /^[\w-.]+@[\w-]+\.[\w-.]+$/,
                message: "Formato de correo inválido.",
              },
            })}
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {errorMsg && (
          <div className="text-red-600 text-sm mb-2">{errorMsg}</div>
        )}
        {submitted && !showModal && (
          <div className="text-green-600 text-sm mb-2">
            ¡Respuesta enviada correctamente!
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enviar respuesta
        </button>

        <button
          type="submit"
          onClick={() => router.push("/dashboard")}
          className="w-full bg-white text-blue-600 border border-blue-600 p-2 rounded hover:bg-blue-50 mt-4"
        >
          Ir al Dashboard
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              ¿Deseas continuar al Dashboard?
            </h2>
            <div className="flex justify-around">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Salir
              </button>
              <button
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => router.push("/dashboard")}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
