import { Phase } from '../types';

export const phases: Phase[] = [
  {
    id: 'antes-de-irte',
    title: 'Antes de irte de España',
    description: 'Prepara toda la documentación necesaria desde España',
    color: 'bg-red-50 border-red-200',
    icon: '📋',
    estimatedDuration: '2-4 semanas',
    tasks: [
      {
        id: 'certificado-nacimiento',
        title: 'Solicitar certificado de nacimiento plurilingüe',
        description: 'Necesario para todos los trámites oficiales en Suiza. Debe incluir apostilla de La Haya para ser válido internacionalmente.',
        status: 'active',
        priority: 'critical',
        estimatedTime: '1-2 semanas',
        links: [
          {
            title: 'Registro Civil Central',
            url: 'https://www.mjusticia.gob.es/es/ciudadanos/tramites/certificado-nacimiento',
            description: 'Portal oficial para solicitar certificados'
          }
        ],
        tip: 'Pide varios ejemplares originales, los necesitarás para diferentes trámites. El proceso puede tardar hasta 15 días laborables.',
        consequences: 'Sin este documento no podrás realizar ningún trámite oficial en Suiza.',
        fileRequired: 'Certificado de nacimiento apostillado'
      },
      {
        id: 'vida-laboral',
        title: 'Pedir vida laboral y apostillar títulos',
        description: 'Obtén tu vida laboral actualizada y apostilla todos tus títulos universitarios y de formación profesional.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '2-3 semanas',
        links: [
          {
            title: 'Vida Laboral - Seguridad Social',
            url: 'https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/Afiliacion/10548/28408',
            description: 'Descarga tu vida laboral actualizada'
          },
          {
            title: 'Apostilla de documentos',
            url: 'https://www.mjusticia.gob.es/es/ciudadanos/tramites/apostilla-haya',
            description: 'Información sobre apostilla de La Haya'
          }
        ],
        tip: 'Los títulos apostillados pueden tardar varias semanas. Inicia el proceso cuanto antes.',
        consequences: 'Necesarios para demostrar tu experiencia laboral y cualificaciones.',
        fileRequired: 'Vida laboral y títulos apostillados'
      },
      {
        id: 'antecedentes-penales',
        title: 'Solicitar certificado de antecedentes penales',
        description: 'Documento oficial que certifica que no tienes antecedentes penales en España.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '1-2 semanas',
        tip: 'Solicítalo con apostilla de La Haya directamente para ahorrar tiempo.',
        consequences: 'Requerido para muchos trabajos y trámites oficiales en Suiza.',
        fileRequired: 'Certificado de antecedentes penales apostillado'
      },
      {
        id: 'formulario-u2',
        title: 'Solicitar Formulario U2 (si cobras paro)',
        description: 'Documento que te permite cobrar el paro en Suiza durante los primeros meses mientras buscas trabajo.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1 semana',
        isOptional: true,
        optionalReason: 'Solo si estás cobrando paro en España',
        links: [
          {
            title: 'SEPE - Formulario U2',
            url: 'https://www.sepe.es/HomeSepe/Personas/internacional',
            description: 'Información sobre prestaciones en el extranjero'
          }
        ],
        tip: 'Tienes 7 días desde tu llegada a Suiza para registrarte en la oficina de empleo suiza.',
        consequences: 'Sin este formulario perderás el derecho a cobrar el paro en Suiza.',
        fileRequired: 'Formulario U2 sellado'
      },
      {
        id: 'seguro-viaje',
        title: 'Contratar seguro de viaje temporal',
        description: 'Seguro que te cubra los primeros días hasta que tengas el seguro suizo obligatorio activo.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1 día',
        tip: 'Asegúrate de que cubra gastos médicos de al menos 30.000€ y que sea válido en Suiza.',
        consequences: 'Los gastos médicos en Suiza son extremadamente altos sin seguro.',
        fileRequired: 'Póliza de seguro de viaje'
      },
      {
        id: 'cv-suizo',
        title: 'Adaptar CV al formato suizo',
        description: 'El CV suizo incluye foto, fecha de nacimiento, estado civil y es más detallado que el español.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '2-3 días',
        tip: 'Incluye referencias de trabajos anteriores y sé muy específico con las competencias técnicas.',
        fileRequired: 'CV adaptado al formato suizo'
      },
      {
        id: 'carta-motivacion',
        title: 'Redactar carta de motivación',
        description: 'Carta personalizada explicando por qué quieres emigrar a Suiza y qué puedes aportar.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1-2 días',
        tip: 'Personaliza cada carta según la empresa y el puesto. Muestra conocimiento sobre Suiza.',
        fileRequired: 'Carta de motivación'
      },
      {
        id: 'presupuesto-inicial',
        title: 'Preparar presupuesto inicial',
        description: 'Calcula los gastos de los primeros meses: alojamiento, comida, transporte, seguros.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '1 día',
        tip: 'Cuenta con al menos 3.000-5.000 CHF para los primeros meses. Suiza es cara.',
        consequences: 'Sin presupuesto adecuado podrías tener problemas financieros graves.',
        fileRequired: 'Hoja de cálculo con presupuesto'
      },
      {
        id: 'curso-aleman-opcional',
        title: 'Curso básico de alemán (recomendado)',
        description: 'Aunque no es obligatorio, conocer alemán básico te ayudará enormemente en la vida diaria y laboral.',
        status: 'blocked',
        priority: 'low',
        estimatedTime: '2-3 meses',
        isOptional: true,
        optionalReason: 'Recomendado si vas a vivir en la zona alemana de Suiza',
        tip: 'Incluso un nivel A1-A2 marca una gran diferencia en las entrevistas de trabajo.',
        consequences: 'Sin alemán básico tendrás más dificultades para encontrar trabajo y relacionarte.',
        links: [
          {
            title: 'Duolingo - Alemán',
            url: 'https://www.duolingo.com/course/de/es',
            description: 'Curso gratuito online'
          },
          {
            title: 'Instituto Goethe',
            url: 'https://www.goethe.de/ins/es/es/index.html',
            description: 'Cursos oficiales de alemán'
          }
        ]
      }
    ]
  },
  {
    id: 'buscar-alojamiento',
    title: 'Buscar alojamiento temporal',
    description: 'Asegurar un lugar donde quedarte al llegar',
    color: 'bg-yellow-50 border-yellow-200',
    icon: '🏠',
    estimatedDuration: '1-2 semanas',
    tasks: [
      {
        id: 'alojamiento-temporal',
        title: 'Reservar alojamiento temporal',
        description: 'Hotel, Airbnb o habitación temporal para las primeras semanas mientras buscas algo permanente.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1-2 días',
        links: [
          {
            title: 'Airbnb Suiza',
            url: 'https://www.airbnb.com/switzerland',
            description: 'Apartamentos temporales'
          },
          {
            title: 'Booking.com',
            url: 'https://www.booking.com/',
            description: 'Hoteles y apartamentos'
          }
        ],
        tip: 'Reserva al menos 2-3 semanas. Necesitarás una dirección para registrarte en la comuna.',
        consequences: 'Sin dirección no puedes hacer el registro obligatorio en la comuna.',
        fileRequired: 'Confirmación de reserva'
      },
      {
        id: 'busqueda-piso-permanente',
        title: 'Iniciar búsqueda de apartamento permanente',
        description: 'Utiliza las principales plataformas inmobiliarias suizas para encontrar vivienda permanente.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: 'Continuo',
        links: [
          {
            title: 'Homegate.ch',
            url: 'https://www.homegate.ch/',
            description: 'Principal portal inmobiliario suizo'
          },
          {
            title: 'Immoscout24.ch',
            url: 'https://www.immoscout24.ch/',
            description: 'Portal inmobiliario con muchas ofertas'
          }
        ],
        tip: 'Empieza la búsqueda desde España. El mercado inmobiliario suizo es muy competitivo.',
        fileRequired: 'Lista de apartamentos favoritos'
      },
      {
        id: 'contacto-agencias-inmobiliarias',
        title: 'Contactar agencias inmobiliarias locales',
        description: 'Establece contacto con agencias inmobiliarias en la zona donde planeas vivir para acceder a más opciones.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1-2 días',
        isOptional: true,
        optionalReason: 'Útil si buscas en zonas muy demandadas o tienes presupuesto alto',
        tip: 'Las agencias suelen tener acceso a propiedades que no se publican online.',
        consequences: 'Podrías perder oportunidades de apartamentos exclusivos.',
        links: [
          {
            title: 'Engel & Völkers Suiza',
            url: 'https://www.engelvoelkers.com/ch/',
            description: 'Agencia inmobiliaria premium'
          }
        ]
      }
    ]
  },
  {
    id: 'llegada-suiza',
    title: 'Llegada a Suiza',
    description: 'Primeros pasos obligatorios al llegar al país',
    color: 'bg-blue-50 border-blue-200',
    icon: '🇨🇭',
    estimatedDuration: '1-2 semanas',
    tasks: [
      {
        id: 'registro-comuna',
        title: 'Registrarse en la comuna (Anmeldung)',
        description: 'Obligatorio en los primeros 14 días. Necesitas contrato de alquiler o prueba de alojamiento temporal.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1 día',
        links: [
          {
            title: 'Portal de comunas suizas',
            url: 'https://www.ch.ch/es/residencia-y-llegada/',
            description: 'Información oficial sobre registro'
          }
        ],
        tip: 'Sin este registro no puedes hacer ningún otro trámite oficial. Es tu primera prioridad.',
        consequences: 'Multa de hasta 100 CHF por cada día de retraso después de los 14 días.',
        fileRequired: 'Certificado de registro comunal'
      },
      {
        id: 'permiso-residencia',
        title: 'Solicitar permiso de residencia',
        description: 'Permiso B para trabajadores o permiso L para estancias cortas. Necesario para trabajar legalmente.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '2-6 semanas',
        tip: 'El trámite puede durar varias semanas, solicítalo inmediatamente después del registro.',
        consequences: 'No puedes trabajar legalmente sin este permiso.',
        fileRequired: 'Permiso de residencia'
      },
      {
        id: 'numero-ahv',
        title: 'Obtener número AHV/AVS',
        description: 'Número de seguridad social suizo, equivalente al número de la Seguridad Social española.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1-2 semanas',
        tip: 'Lo necesitas para trabajar y para todos los trámites oficiales. Se obtiene automáticamente al registrarte.',
        consequences: 'Sin este número no puedes trabajar ni acceder a servicios sociales.',
        fileRequired: 'Tarjeta AHV/AVS'
      },
      {
        id: 'registro-consulado-espanol',
        title: 'Registrarse en el consulado español',
        description: 'Registro consular para mantener tus derechos como ciudadano español en el extranjero.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1 día',
        isOptional: true,
        optionalReason: 'Recomendado para mantener derechos consulares y facilitar trámites futuros',
        tip: 'Te ayudará con renovaciones de documentos y en caso de emergencias.',
        consequences: 'Podrías tener dificultades para renovar documentos españoles desde Suiza.',
        links: [
          {
            title: 'Consulado de España en Suiza',
            url: 'https://www.exteriores.gob.es/Consulados/berna/es/Paginas/index.aspx',
            description: 'Portal oficial del consulado'
          }
        ]
      }
    ]
  },
  {
    id: 'tramites-esenciales',
    title: 'Trámites esenciales',
    description: 'Documentación básica para vivir en Suiza',
    color: 'bg-green-50 border-green-200',
    icon: '📄',
    estimatedDuration: '1-2 semanas',
    tasks: [
      {
        id: 'cuenta-bancaria',
        title: 'Abrir cuenta bancaria',
        description: 'Imprescindible para recibir salario y realizar pagos. Los principales bancos son UBS, Credit Suisse y PostFinance.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1-2 días',
        links: [
          {
            title: 'PostFinance (más accesible)',
            url: 'https://www.postfinance.ch/',
            description: 'Banco más accesible para extranjeros'
          },
          {
            title: 'UBS',
            url: 'https://www.ubs.com/ch/es.html',
            description: 'Uno de los bancos principales'
          }
        ],
        tip: 'PostFinance suele ser más fácil para extranjeros recién llegados. Lleva todos tus documentos.',
        consequences: 'Sin cuenta bancaria no puedes recibir tu salario ni realizar pagos importantes.',
        fileRequired: 'Documentos de apertura de cuenta'
      },
      {
        id: 'seguro-obligatorio',
        title: 'Contratar seguro de salud obligatorio',
        description: 'Obligatorio por ley. Tienes 3 meses desde el registro para contratarlo, pero es retroactivo.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1 día',
        links: [
          {
            title: 'Comparador oficial de seguros',
            url: 'https://www.priminfo.admin.ch/',
            description: 'Compara precios de todas las aseguradoras'
          }
        ],
        tip: 'Compara precios, pueden variar mucho entre aseguradoras. El seguro básico es el mismo en todas.',
        consequences: 'Multa y cobertura retroactiva obligatoria si no lo contratas a tiempo.',
        fileRequired: 'Póliza de seguro de salud'
      },
      {
        id: 'telefono-movil',
        title: 'Contratar línea móvil',
        description: 'Necesario para muchos trámites y verificaciones. Principales operadores: Swisscom, Salt, Sunrise.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '1 día',
        tip: 'Muchos trámites requieren verificación por SMS. Elige un plan con datos suficientes.',
        fileRequired: 'Contrato de teléfono móvil'
      },
      {
        id: 'tarjeta-transporte-publico',
        title: 'Obtener tarjeta de transporte público',
        description: 'Tarjeta Half-Fare o abono general para usar el excelente sistema de transporte público suizo.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1 día',
        isOptional: true,
        optionalReason: 'Solo si planeas usar transporte público regularmente',
        tip: 'La tarjeta Half-Fare (185 CHF/año) te da 50% descuento en todos los transportes.',
        consequences: 'Pagarás precios completos en transporte público, que puede ser muy caro.',
        links: [
          {
            title: 'SBB - Ferrocarriles Suizos',
            url: 'https://www.sbb.ch/',
            description: 'Portal oficial de transporte público'
          }
        ]
      }
    ]
  },
  {
    id: 'buscar-trabajo',
    title: 'Buscar trabajo',
    description: 'Estrategias y herramientas para encontrar empleo',
    color: 'bg-purple-50 border-purple-200',
    icon: '💼',
    estimatedDuration: '1-3 meses',
    tasks: [
      {
        id: 'homologar-titulos',
        title: 'Homologar títulos (si es necesario)',
        description: 'Algunos sectores regulados requieren homologación oficial de títulos universitarios.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '2-6 meses',
        isOptional: true,
        optionalReason: 'Solo para profesiones reguladas (medicina, derecho, etc.)',
        links: [
          {
            title: 'SERI - Reconocimiento de títulos',
            url: 'https://www.sbfi.admin.ch/sbfi/es/home/bildung/diploma/anerkennungsverfahren-bei-niederlassung.html',
            description: 'Información oficial sobre homologación'
          }
        ],
        tip: 'No todos los trabajos requieren homologación. Consulta primero si es necesario en tu sector.'
      },
      {
        id: 'portales-empleo',
        title: 'Registrarse en portales de empleo',
        description: 'Crear perfiles en las principales plataformas de búsqueda de empleo suizas.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '1 día',
        links: [
          {
            title: 'jobs.ch',
            url: 'https://www.jobs.ch/',
            description: 'Principal portal de empleo suizo'
          },
          {
            title: 'LinkedIn Suiza',
            url: 'https://www.linkedin.com/jobs/',
            description: 'Red profesional internacional'
          },
          {
            title: 'Xing',
            url: 'https://www.xing.com/',
            description: 'Red profesional popular en países germanófonos'
          }
        ],
        tip: 'Actualiza tu perfil regularmente y personaliza cada solicitud. La calidad es más importante que la cantidad.'
      },
      {
        id: 'networking',
        title: 'Hacer networking profesional',
        description: 'Únete a grupos profesionales, asiste a eventos y conecta con compatriotas en tu sector.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: 'Continuo',
        tip: 'Muchos trabajos se consiguen por contactos. Invierte tiempo en crear una red profesional sólida.'
      },
      {
        id: 'curso-especializacion',
        title: 'Curso de especialización local',
        description: 'Considera hacer un curso de especialización en Suiza para mejorar tu perfil y hacer contactos.',
        status: 'blocked',
        priority: 'low',
        estimatedTime: '3-6 meses',
        isOptional: true,
        optionalReason: 'Útil si quieres cambiar de sector o mejorar significativamente tu perfil',
        tip: 'Los cursos en universidades suizas tienen muy buena reputación y facilitan el networking.',
        consequences: 'Podrías perder oportunidades de mejora profesional y contactos valiosos.',
        links: [
          {
            title: 'ETH Zurich - Cursos',
            url: 'https://ethz.ch/en/studies/continuing-education.html',
            description: 'Cursos de educación continua'
          }
        ]
      }
    ]
  },
  {
    id: 'alojamiento-permanente',
    title: 'Alojamiento permanente',
    description: 'Conseguir vivienda definitiva',
    color: 'bg-orange-50 border-orange-200',
    icon: '🏡',
    estimatedDuration: '1-6 meses',
    tasks: [
      {
        id: 'dossier-inquilino',
        title: 'Preparar dossier de inquilino',
        description: 'Documentación completa requerida para alquilar: extracto de deudores, referencias, etc.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '1 día',
        tip: 'El extracto del registro de deudores es obligatorio y cuesta unos 20 CHF. Prepáralo con antelación.'
      },
      {
        id: 'visitas-apartamentos',
        title: 'Realizar visitas a apartamentos',
        description: 'Programa visitas y presenta tu dossier completo en cada una.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: 'Continuo',
        tip: 'Lleva el dossier impreso y completo a cada visita. La competencia es muy alta.'
      },
      {
        id: 'deposito-garantia',
        title: 'Depositar garantía de alquiler',
        description: 'Normalmente 2-3 meses de alquiler como garantía, debe depositarse en cuenta bloqueada.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '1 día',
        tip: 'Algunos bancos ofrecen garantías bancarias en lugar de depósito en efectivo.'
      },
      {
        id: 'seguro-hogar',
        title: 'Contratar seguro de hogar',
        description: 'Seguro de responsabilidad civil y contenido del hogar, muy recomendado en Suiza.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1 día',
        isOptional: true,
        optionalReason: 'Altamente recomendado pero no obligatorio por ley',
        tip: 'Muchos propietarios lo exigen. Es muy barato (50-100 CHF/año) y te protege de problemas costosos.',
        consequences: 'Podrías tener que pagar de tu bolsillo daños accidentales muy costosos.',
        links: [
          {
            title: 'Comparis - Seguros de hogar',
            url: 'https://www.comparis.ch/hausratversicherung/',
            description: 'Comparador de seguros de hogar'
          }
        ]
      }
    ]
  },
  {
    id: 'adaptacion-cultural',
    title: 'Adaptación cultural',
    description: 'Integrarse en la sociedad suiza y entender la cultura local',
    color: 'bg-indigo-50 border-indigo-200',
    icon: '🤝',
    estimatedDuration: '3-6 meses',
    tasks: [
      {
        id: 'aprender-normas-sociales',
        title: 'Aprender las normas sociales suizas',
        description: 'Entender las reglas no escritas de la sociedad suiza: puntualidad, silencio, respeto por las normas.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: '1-2 semanas',
        links: [
          {
            title: 'Guía cultural oficial',
            url: 'https://www.ch.ch/es/vivir-en-suiza/',
            description: 'Portal oficial sobre la vida en Suiza'
          },
          {
            title: 'SwissCommunity',
            url: 'https://www.swisscommunity.org/',
            description: 'Red de suizos en el extranjero con consejos culturales'
          }
        ],
        tip: 'La puntualidad es sagrada en Suiza. Llegar 5 minutos tarde se considera una falta de respeto.',
        consequences: 'No entender las normas sociales puede afectar tus relaciones laborales y personales.',
        fileRequired: 'Notas sobre normas culturales aprendidas'
      },
      {
        id: 'curso-idioma-local',
        title: 'Curso intensivo del idioma local',
        description: 'Alemán, francés o italiano según la región. Fundamental para la integración completa.',
        status: 'blocked',
        priority: 'critical',
        estimatedTime: '3-6 meses',
        links: [
          {
            title: 'Migros Klubschule',
            url: 'https://www.klubschule.ch/',
            description: 'Cursos de idiomas populares y accesibles'
          },
          {
            title: 'Berlitz Suiza',
            url: 'https://www.berlitz.com/ch',
            description: 'Cursos intensivos de idiomas'
          },
          {
            title: 'Universidad Popular',
            url: 'https://www.vhs.ch/',
            description: 'Cursos de idiomas económicos'
          }
        ],
        tip: 'Muchas comunas ofrecen cursos de idiomas gratuitos o subvencionados para inmigrantes.',
        consequences: 'Sin el idioma local tendrás limitaciones significativas en trabajo y vida social.',
        fileRequired: 'Certificado de curso de idiomas'
      },
      {
        id: 'unirse-asociaciones',
        title: 'Unirse a asociaciones y clubs locales',
        description: 'Participa en clubs deportivos, culturales o de hobbies para hacer amigos suizos.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1 día',
        links: [
          {
            title: 'Directorio de asociaciones',
            url: 'https://www.vereinsliste.ch/',
            description: 'Buscador de asociaciones por región'
          }
        ],
        tip: 'Los suizos valoran mucho las actividades en grupo. Es la mejor forma de hacer amigos locales.',
        consequences: 'Sin conexiones sociales locales la integración será mucho más difícil.',
        fileRequired: 'Comprobante de membresía en asociación'
      },
      {
        id: 'entender-sistema-politico',
        title: 'Entender el sistema político suizo',
        description: 'Aprende sobre la democracia directa, votaciones populares y el sistema federal suizo.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1-2 días',
        links: [
          {
            title: 'Portal oficial del gobierno',
            url: 'https://www.admin.ch/gov/es/inicio.html',
            description: 'Información oficial sobre el sistema político'
          },
          {
            title: 'Easyvote',
            url: 'https://www.easyvote.ch/',
            description: 'Explicaciones simples sobre votaciones'
          }
        ],
        tip: 'En Suiza votas cada 3-4 meses sobre temas diversos. Es importante entender el sistema.',
        consequences: 'No entender el sistema político te excluye de participar en la democracia local.',
        fileRequired: 'Resumen del sistema político suizo'
      },
      {
        id: 'conocer-tradiciones-locales',
        title: 'Conocer tradiciones y festivales locales',
        description: 'Participa en festivales tradicionales, mercados navideños y celebraciones regionales.',
        status: 'blocked',
        priority: 'low',
        estimatedTime: 'Continuo',
        isOptional: true,
        optionalReason: 'Ayuda mucho con la integración cultural pero no es esencial',
        tip: 'Cada región tiene sus propias tradiciones. Pregunta a vecinos sobre eventos locales.',
        consequences: 'Te perderás oportunidades de conectar con la cultura local.',
        links: [
          {
            title: 'Calendario de eventos',
            url: 'https://www.myswitzerland.com/es/experiencias/eventos/',
            description: 'Eventos y festivales en Suiza'
          }
        ]
      },
      {
        id: 'establecer-rutinas-locales',
        title: 'Establecer rutinas de vida suiza',
        description: 'Adapta tus horarios a los suizos: compras, comidas, actividades de fin de semana.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '2-4 semanas',
        tip: 'Las tiendas cierran temprano y los domingos. Planifica tus compras con antelación.',
        consequences: 'No adaptarte a los horarios locales complicará tu vida diaria.',
        fileRequired: 'Plan de rutinas semanales adaptadas'
      },
      {
        id: 'networking-cultural',
        title: 'Crear red de contactos multiculturales',
        description: 'Conecta tanto con suizos como con otros expatriados para tener una red social equilibrada.',
        status: 'blocked',
        priority: 'high',
        estimatedTime: 'Continuo',
        links: [
          {
            title: 'Internations',
            url: 'https://www.internations.org/',
            description: 'Red global de expatriados'
          },
          {
            title: 'Meetup Suiza',
            url: 'https://www.meetup.com/',
            description: 'Grupos de interés local'
          }
        ],
        tip: 'Equilibra contactos suizos (para integración) con expatriados (para apoyo emocional).',
        consequences: 'Sin red social sólida la adaptación será más lenta y difícil.'
      },
      {
        id: 'curso-integracion-civica',
        title: 'Curso de integración cívica',
        description: 'Curso oficial sobre valores suizos, historia y funcionamiento de la sociedad.',
        status: 'blocked',
        priority: 'medium',
        estimatedTime: '1-2 meses',
        isOptional: true,
        optionalReason: 'Requerido para naturalización futura, pero útil para integración inmediata',
        links: [
          {
            title: 'Cursos de integración',
            url: 'https://www.sem.admin.ch/sem/es/home/integration-einbuergerung/integrationsfoerderung.html',
            description: 'Información oficial sobre cursos de integración'
          }
        ],
        tip: 'Muchos cantones subvencionan estos cursos. Consulta en tu comuna.',
        consequences: 'Sin este curso será más difícil obtener la nacionalidad suiza en el futuro.',
        fileRequired: 'Certificado de curso de integración'
      }
    ]
  }
];