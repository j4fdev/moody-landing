"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { X, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LegalModalProps {
  type: "terms" | "privacy" | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const { t } = useI18n();

  if (!type) return null;

  const isTerms = type === "terms";
  const title = isTerms ? t.legal.termsTitle : t.legal.privacyTitle;
  const pageHref = isTerms ? "/terms" : "/privacy";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-moody-surface dark:bg-moody-surfaceDark rounded-3xl border border-moody-oat dark:border-moody-surfaceContainerDark shadow-2xl p-6 md:p-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-moody-oat dark:border-moody-surfaceContainerDark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-moody-primary/10 dark:bg-moody-primaryDark/15 flex items-center justify-center text-moody-primary dark:text-moody-primaryDark">
              {isTerms ? <FileText className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                {title}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark">
                {t.legal.lastUpdated}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-moody-surfaceContainer dark:hover:bg-moody-surfaceContainerDark text-moody-textSecondary dark:text-moody-textSecondaryDark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 overflow-y-auto space-y-4 text-sm text-moody-textPrimary/90 dark:text-moody-textPrimaryDark/90 leading-relaxed pr-2">
          {isTerms ? (
            <>
              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  1. Naturaleza del Santuario Moody
                </h4>
                <p>
                  Moody es una plataforma digital de bienestar personal, registro emocional y mindfulness preventivo. Moody <strong>NO es un dispositivo médico, servicio de urgencias médicas ni un sustituto de diagnóstico, tratamiento o psicoterapia clínica profesional</strong>. Si te encuentras en una crisis severa o riesgo vital, debes contactar de inmediato con los servicios de emergencia de tu país o las líneas de prevención del suicidio disponibles en nuestro directorio de crisis.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  2. Uso Respetuoso y Filosofía de Género Neutro
                </h4>
                <p>
                  Moody ha sido concebido como un refugio seguro, libre de toxicidad, hostigamiento o discriminación. Al interactuar en las funciones comunitarias (cuando decidas participar de forma anónima o identificada), aceptas mantener un tono empático y abstenerte de publicar contenidos ilegales, abusivos o difamatorios.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  3. Rachas Compasivas y Propiedad de tus Datos
                </h4>
                <p>
                  A diferencia de apps convencionales, Moody no penaliza tu ausencia ni utiliza dinámicas punitivas. Tus notas, registros de estados de ánimo y reflexiones son de tu exclusiva propiedad; puedes exportarlas o eliminarlas en cualquier momento.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  4. Lista de Espera (Waitlist) y Acceso Anticipado
                </h4>
                <p>
                  La inscripción en la lista de espera confiere prioridad de acceso sujeta a disponibilidad técnica y despliegue por oleadas. No existe obligación de permanencia ni cobro alguno por registrarse en el período de acceso temprano.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  1. Privacidad por Defecto: Lo que sientes te pertenece
                </h4>
                <p>
                  En Moody creemos que la vulnerabilidad exige confianza absoluta. Por ello, tus registros de estado de ánimo, diarios personales y mapeos somáticos nacen <strong>100% privados y cifrados</strong>. Jamás vendemos, alquilamos ni monetizamos tus datos emocionales con anunciantes ni terceros.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  2. Datos que Recolectamos en la Landing
                </h4>
                <p>
                  En esta landing page únicamente capturamos la información que proporcionas de forma voluntaria al sumarte a la lista de espera: dirección de correo electrónico, nombre o apodo (opcional) y el código de referido o procedencia. Estos datos se almacenan de forma segura para notificarte la apertura de tu acceso.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  3. Anonimato y Votaciones sin Rastreo Invasivo
                </h4>
                <p>
                  Para la votación en nuestro Roadmap de funcionalidades públicas, generamos un identificador anónimo de sesión mediante hashes con salt (sin almacenar tu dirección IP en texto claro ni compartir identificadores publicitarios).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-moody-primary dark:text-moody-primaryDark">
                  4. IA Empática y Confidencialidad
                </h4>
                <p>
                  Las interacciones reflexivas con nuestro modelo de IA empática no son utilizadas para entrenar modelos públicos abiertos ni son vinculadas a tu identidad civil. Operan como un espacio de desahogo seguro.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-moody-oat dark:border-moody-surfaceContainerDark">
          <Link
            href={pageHref}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-moody-primary dark:text-moody-primaryDark hover:underline"
          >
            <span>{t.legal.readFullPage}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-moody-primary text-white text-xs font-bold hover:bg-moody-primaryHover transition-colors"
          >
            {t.legal.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
}
