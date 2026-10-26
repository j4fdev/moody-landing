export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://moody.j4f.dev/#software",
        name: "Moody",
        alternateName: [
          "Moody App",
          "Moody Bienestar Emocional",
          "Moody Santuario Emocional",
          "Moody Emotional Sanctuary",
        ],
        operatingSystem: "iOS, Android, Web",
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Emotional Well-Being, Mental Health, Mindfulness",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Moody es una app para bienestar emocional y salud mental preventiva sin positividad tóxica. Basada en ACT, mindfulness somático y privacidad radical.",
        featureList: [
          "Registro consciente de emociones y mapeo somático corporal",
          "Dinámicas reflexivas de 2 a 3 minutos (One Day One Victory, 5 Cosas, Caja de Preocupaciones)",
          "Ejercicios SOS de respiración parasimpática 4-7-8 y técnica de grounding 5-4-3-2-1",
          "Rachas compasivas con días de gracia para proteger el descanso",
          "Chat reflexivo y empático con IA para cuando el usuario no desea interacción humana",
          "Comunidad de resonancia 100% privada y anónima libre de contadores de seguidores",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "380",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://moody.j4f.dev/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Qué es Moody y qué la hace diferente a otras apps de emociones?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Moody es un santuario de bienestar emocional de género neutro basado en la Terapia de Aceptación y Compromiso (ACT). No impone positivismo forzado ni castiga con rachas rotas si tienes un día difícil. Te ayuda a reconocer dónde sientes las emociones en tu cuerpo y a autorregularte con micro-dinámicas de 2 minutos.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo cuida Moody la privacidad de mis datos emocionales?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Moody opera bajo el principio de 'Privacidad por defecto'. Todo tu diario y registros permanecen estrictamente cifrados. Jamás vendemos datos personales ni perfilamos usuarios para anunciantes.",
            },
          },
          {
            "@type": "Question",
            name: "¿Moody sustituye la terapia psicológica profesional?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Moody es una herramienta complementaria de autoconocimiento, regulación somática y acompañamiento diario. Ante emergencias psiquiátricas o crisis severas, la app cuenta con un directorio directo a líneas telefónicas oficiales y gratuitas de prevención y salud mental.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo unirme a la lista de espera (waitlist) y obtener acceso anticipado?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Puedes ingresar tu correo en la sección de Waitlist. Recibirás tu turno en la fila y un enlace exclusivo con el que puedes invitar a personas conocidas y escalar posiciones para entrar en las primeras oleadas de lanzamiento.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://moody.j4f.dev/#website",
        url: "https://moody.j4f.dev",
        name: "Moody — Santuario de Bienestar Emocional",
        inLanguage: ["es", "en", "pt"],
        publisher: {
          "@type": "Organization",
          name: "J4F Ecosystem",
          url: "https://j4f.dev",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
