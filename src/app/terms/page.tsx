import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso — Moody",
  description: "Términos de servicio, consideraciones de salud mental, privacidad de datos y marco legal de Moody.",
};

export default function TermsPage() {
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
            Términos y Condiciones de Uso
          </h1>
          <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark">
            Última actualización: 26 de Octubre de 2026 • Plataforma Moody (Ecosistema J4F)
          </p>
        </header>

        <div className="space-y-6 text-sm text-moody-textPrimary/90 dark:text-moody-textPrimaryDark/90 leading-relaxed">
          <div className="p-4 rounded-2xl bg-moody-secondary/10 border border-moody-secondary/20">
            <h3 className="font-bold text-moody-secondary dark:text-moody-secondaryDark mb-1">
              Aviso Médico y Clínico Fundamental
            </h3>
            <p className="text-xs leading-relaxed">
              Moody es una herramienta de bienestar personal, autoconocimiento y registro introspectivo basada en la Terapia de Aceptación y Compromiso (ACT). <strong>Moody NO presta servicios médicos, psicológicos clínicos ni psiquiátricos</strong>. La aplicación nunca debe utilizarse como sustituto del diagnóstico, orientación o tratamiento de un profesional de la salud cualificado.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder a este sitio web o utilizar las aplicaciones móviles de Moody, aceptas quedar vinculado por estos Términos y Condiciones, así como por nuestra Política de Privacidad. Si no estás de acuerdo con alguna parte de los términos, te solicitamos abstenerte de utilizar la plataforma.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              2. Filosofía del Santuario y Reglas de Convivencia
            </h2>
            <p>
              Moody fue fundado como un refugio de género neutro, inclusivo y seguro. Los usuarios que decidan participar voluntariamente en la Comunidad de Resonancia (publicando reflexiones de forma anónima o con perfil) se comprometen a:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Tratar con respeto y empatía la vulnerabilidad ajena.</li>
              <li>No hostigar, acosar, denigrar ni difundir contenido que incite al odio.</li>
              <li>No publicar contenido publicitario no solicitado (spam) ni enlaces maliciosos.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              3. Propiedad Intelectual y Soberanía de Datos
            </h2>
            <p>
              Todo el contenido gráfico, diseño Japandi, código fuente y elementos de marca son propiedad de Moody y el ecosistema J4F. Por su parte, todas tus notas de diario, reflexiones y registros emocionales son de <strong>tu exclusiva propiedad personal</strong>. Moody no reclama ningún derecho de comercialización sobre lo que escribes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              4. Lista de Espera y Acceso Anticipado
            </h2>
            <p>
              El registro en la lista de espera (Waitlist) te otorga una posición de turno para acceder gradualmente al servicio conforme se habilitan nuevos servidores y grupos de prueba. Nos reservamos el derecho de revocar códigos de referido obtenidos mediante automatizaciones o prácticas fraudulentas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-moody-primary dark:text-moody-primaryDark">
              5. Contacto
            </h2>
            <p>
              Para cualquier consulta legal o de cumplimiento ético, puedes escribirnos a <code>contacto@j4f.dev</code>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
