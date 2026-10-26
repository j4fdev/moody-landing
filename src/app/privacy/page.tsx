import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad y Ética de Datos — Moody",
  description: "Privacidad radical por defecto, cero venta de datos, cifrado de notas y ética en bienestar emocional.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-moody-surface dark:bg-moody-surfaceDark text-moody-textPrimary dark:text-moody-textPrimaryDark py-16 px-4 sm:px-6 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-moody-primary dark:text-moody-primaryDark hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio de Moody</span>
        </Link>

        <header className="border-b border-moody-oat dark:border-moody-surfaceContainerDark pb-6 space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Política de Privacidad & Ética de Datos
          </h1>
          <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark">
            Última actualización: 26 de Octubre de 2026 • Moody (Ecosistema J4F)
          </p>
        </header>

        <div className="space-y-6 text-sm text-moody-textPrimary/90 dark:text-moody-textPrimaryDark/90 leading-relaxed">
          <div className="p-4 rounded-2xl bg-moody-primary/10 border border-moody-primary/20 flex items-start gap-3">
            <Lock className="w-5 h-5 text-moody-primary dark:text-moody-primaryDark shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block text-moody-primary dark:text-moody-primaryDark font-bold mb-0.5">
                Nuestro Manifiesto Ético: Privacidad por Defecto
              </strong>
              Creemos firmemente que la salud emocional no puede florecer bajo vigilancia publicitaria. Moody jamás venderá tus datos, ni perfilará tus emociones para mostrarte anuncios.
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              1. Datos que Recolectamos en la Landing Page
            </h2>
            <p>
              En esta landing page únicamente capturamos la información estrictamente necesaria cuando decides registrarte en nuestra lista de espera:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Correo Electrónico:</strong> Para notificarte sobre tu turno de acceso y novedades del lanzamiento.</li>
              <li><strong>Nombre o Alias:</strong> De carácter opcional para saludarte cordialmente.</li>
              <li><strong>Fuente de Llegada y Código de Referido:</strong> Para contabilizar tus invitaciones y darte prioridad.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              2. Votación en el Roadmap y Telemetría Anónima
            </h2>
            <p>
              Para permitir que votes por funcionalidades en el Roadmap sin requerir cuentas de usuario invasivas, generamos un identificador cifrado con sal (hash no reversible). No almacenamos tu dirección IP en texto plano ni instalamos rastreadores de terceros (como píxeles de Meta o redes de seguimiento agresivas).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              3. IA Empática y Confidencialidad
            </h2>
            <p>
              El chat reflexivo de Moody actúa como un confidente de desahogo. Las conversaciones no se indexan públicamente ni se utilizan para enriquecer bases de datos comerciales abiertas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              4. Tus Derechos (ARCO / GDPR)
            </h2>
            <p>
              Puedes solicitar en cualquier momento la eliminación total e irrevocable de tu correo de la lista de espera o la exportación de tus datos escribiendo a <code>contacto@j4f.dev</code>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
