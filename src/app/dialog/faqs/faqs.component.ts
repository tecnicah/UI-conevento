import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor() { }
  public faqs: any = [];
  
  ngOnInit(): void {
    this.get_faqs();
  }

  public get_faqs(){

this.faqs =[
{id:1	,titulo:'¿Una vez hecha la compra cuento con servicio post venta?', descripcion:	'Despreocupate, tendrás un servicio personalizado. Una vez hecha tu compra un asesor de CONEVENTO te contactará en menos de 24 horas hábiles, el te ayudará con cualquier duda o petición. Podrás agregar o cambiar cosas directamente con el.'},
{id:2	,titulo:'¿Quiénes son los trabajadores?', descripcion:	'Contamos con trabajadores certificados en los diferentes oficios, todos los trabajadores pasan por un filtro de seguridad. Para trabajar con CONEVENTO es necesario aprobar: una investigación, documentos oficiales, domicilio habitacional, entrevista personal y trabajos de prueba.'},
{id:3	,titulo:'¿Qué estoy pagando?', descripcion:	'Al seleccionar los servicios requeridos, se hará el apartado del pago de; la entrega de articulos en día del evento asi como la visita del personal requerido (por ej. Mesero).'},
{id:4	,titulo:'¿Con cuanta anticipación debo contar para solicitar los servicios requeridos?', descripcion:	'4 días antes del inicio de tu evento.'},
{id:5	,titulo:'¿Como se hace el pago de los articulos que no tienen costo (por ej. carpa)? ¿Se puede pagar en efectivo?', descripcion:	'Los articulos (carpas, baños, tarimas, cabina de luces, planta de luz, cristalería y vajiila) salen sin costo ya que para poder ser cotizados con exactitud se necesitan cierto tipo de datos, por ejemplo para la carpa la dimensión del lugar asi como el tipo de suelo. Es por esto, que como lo comentan los articulos en plataforma estos son pagados directamente con tu asesor CONEVENTO designado, este pago puede ser vía transferencia, tarjeta o efectivo.'},
{id:6	,titulo:'¿Cuáles son las zonas donde operan?', descripcion:	'CDMX: Alvaro Obregon, *Magdalena Contreras,* Cuahutemoc,* Miguel Hidalgo,* Coyoacan,* Benito Juarez,* Cuajimalpa de Morelos. Proximamente estaremos abriendo más zonas.'},
{id:7	,titulo:'¿Qué pasa si ya no necesito el servicio? ¿Puedo cancelar?', descripcion:	'El servicio se puede cancelar en cualquier momento 4 días antes del inicio del evento informando a tu asesor asignado o vía mail a contacto@conevento.com. En caso de cancelar el dinero será devuelto en su totalidad. Si se cancela con un periodo menor al previamente mencionado se cobrará el 50% de multa.'},
{id:8	,titulo:'¿Qué pasa si quiero un reembolso?', descripcion:	'Los reembolsos serán autorizados por CONEVENTO después de haber analizado la situación y llegar a un mutuo acuerdo con El Cliente. En caso de requerirlo es indispensable informarlo a travez de tu asesor asignado o vía mail a contacto@conevento.com. Éstos podrán ser parciales o totales , el reembolso del servicio no toma en cuenta el flete (en caso de que el servicio los incluya) , ya que éstos son ajenos al costo del servicio y se dan de manera integra al Personal. Si se requiere un reembolso antes de que ocurra tu evento, si es informado a CONEVENTO 4 días antes del inicio de tu evento se devolverá la totalidad del pago. Si se cancela con un periodo menor al previamente mencionado se cobrará el 50% de multa.'},
{id:9	,titulo:'¿Qué pasa si por alguna razón algun servicio contratado debe ser cancelado por CONEVENTO debido a causas mayores (por ej. Talento enfermo)?', descripcion:	'Conevento avisará al cliente vía mail y llamada a travez del asesor designado para explicar la situación con al menos con 48hrs de anticipación. CONEVENTO reembolsará la totalidad del pago efectuado por el cliente.'},
{id:10	,titulo:'¿Qué hago si tengo un problema con algun servicio contratado para mi evento?', descripcion:	'En Conevento nos enfocamos a mejorar siempre tu experiencia Conevento, por eso si tienes algún problema, queja o sugerencia, puedes comunicarte a contacto@conevento.com o marcarnos al 55 6810 4838 o hacerlo directamente con tu asesor.'},
{id:11	,titulo:'¿Cómo cambio de fecha mi evento?', descripcion:	'Cualquier cambio de horario, fecha o servicio debe hacerse con 72 horas de anticipación, de lo contrario se cancelará el servicio y se te cobrará el 50% de tu evento. Para hacer un cambio de fecha, escríbenos a contacto@conevento.com o marcarnos al 55 6810 4838 o hacerlo directamente con tu asesor. Es posible que al realizar cambio de fecha no se tenga disponbibilidad de algun servicio previamente contratado, en este caso se te devolverá el 100% de tu pago.'},
{id:12	,titulo:'¿Qué servicios ofrece Conevento?', descripcion:	'Conevento ofrece los mejores servicios  de personal y articulos para tu evento, los cuales son los siguientes: -Personal de Mesero -Personal de Bartender-Personal de Talento-Personal de Limpieza PostEvento-Renta de Mobiliario-Renta de Audio y Luz. -Compra de Bebidas y Alimentos.'},
{id:13	,titulo:'¿Cómo pago mi cita?', descripcion:	'Todos nuestros servicios se pagan por adelantado a través de nuestra plataforma. Puedes pagar con tarjeta de crédito o débito, Paypal, o en efectivo pagando en Oxxo. Estas opciones están disponibles a través de nuestra website.'},
{id:14	,titulo:'¿Qué seguridad tengo de ingresar mis datos bancarios en su website o app?', descripcion:	'Nuestro proveedor es Stripe y es el más seguro en pagos online. Puedes checar la página de Stripe.'},
{id:15	,titulo:'¿Puedo agendar un evento si no tengo tarjeta de crédito?', descripcion:	'Sí, puedes pagar un servicio aún sin tarjeta de crédito. Las opciones de pago que tenemos en nuestra página son: tarjeta de débito, Paypal, pago en oxxos.'},
{id:16	,titulo:'¿Porqué se paga flete?', descripcion:	'Es para el envio de los articulos de mobiliario, luz y sonido; asi como la recoleccíon de los mismos.'},
{id:17	,titulo:'Si contrato un servicio de renta de Artículos ¿cuándo son recogidos?', descripcion:	'Dentro de las siguientes 24hrs del termino de tu evento, si el día siguiente a tu evento es Domingo se recogen el siguiente día habil. De todas maneras tu asesor de Conevento coordinará todo contigo para que se recoja en tiempo y forma.'},
{id:18	,titulo:'¿Cómo se calcula el flete?', descripcion:	'Midiendo la distancia entre la dirección de tu Venue (donde ocurrirá el evento) y la dirección de la Bodega más cercana.'},
{id:19	,titulo:'¿Cómo identifico al servicio de personal que viene de Conevento?', descripcion:	'Tu Asesor se encargará de presentarte al personal, asi como coordinar que lleguen en tiempo y forma.'},
{id:20	,titulo:'¿Qué tan seguro es el Personal Conevento de Personal que mandan a los eventos?', descripcion:	'Sabemos que tu seguridad es lo más importante, por lo que Conevento tiene un proceso de selección y reclutamiento muy riguroso para poder trabajar como mesero, bartender, talento o servicio de limpieza post evento. Nuestro departamento de reclutamiento no solo les hace pruebas de habilidades, sino también se les aplican pruebas psicométricas y hacen una evaluación de antecedentes no penales. Adicionalmente tus datos personales están protegidos de acuerdo a las leyes mexicanas vigentes por lo que el Personal Conevento solo conocee la información indispensable para acudir a tu cita. Puedes revisar nuestro Aviso de Privacidad que se encuentra en nuestra sitio web (conevento.com).'},
{id:21	,titulo:'Soy profesional de mesero, bartender, talento o servicio de limpieza post evento, ¿cómo puedo empezar a trabajar con Conevento?', descripcion:	'Siempre estamos en búsqueda de los y las mejores profesionales. Si quieres trabajar con nosotros debes aplicar a través de nuestro formulario online el cual se encuentra en el home de nuestra plataforma conevento.com'},
{id:22	,titulo:'¿Qué pasa si daño mobiliario o servicio de audio y luz?', descripcion:	'Se deja el material en perfectas condiciones verificando con el cliente (persona que pidio el servicio), para que al ser recogido al siguiente dia este en las mismas condiciones (puede estar sucio). En caso de algun daño, este será cobrado directamente al cliente y el pago pordrá ser por el medio que mejor se le acomode.'},
{id:23	,titulo:'Perjuicios a CONEVENTO o usuarios.', descripcion:	'No puedes acceder, usar, copiar, adaptar, modificar, preparar obras derivadas de nuestros Servicios, ni distribuir, licenciar, sublicenciar, transferir, mostrar, ejecutar o explotar de otro modo nuestros Servicios de maneras inadmisibles o no autorizadas, o de formas que nos afecten, perjudiquen o dañen a nosotros, a nuestros Servicios, a nuestros sistemas, a nuestros usuarios o a otras personas. Tampoco debes, directamente o a través de medios automatizados: (a) aplicar ingeniería inversa, alterar, modificar, crear obras derivadas, descompilar o extraer código de nuestros Servicios; (b) enviar, almacenar o transmitir un virus u otro código informático dañino a través de nuestros Servicios o en ellos; (c) obtener o intentar obtener acceso no autorizado a nuestros Servicios o sistemas; (d) interrumpir o interferir con la integridad o el rendimiento de nuestros Servicios; (e) crear cuentas para nuestros Servicios a través de medios automatizados o no autorizados; (f) recopilar la información sobre nuestros usuarios de cualquier forma inadmisible o no autorizada; (g) vender, revender, alquilar o cobrar por nuestros Servicios; o (h) distribuir o poner en disponibilidad nuestros Servicios en una red donde podrían usarse en varios dispositivos a la misma vez o ayudar a otros a realizar cualquiera de las actividades anteriormente mencionadas o similares'},
{id:24	,titulo:'Descargos de responsabilidad.', descripcion:	'Tú decides usar nuestros servicios a tu propio riesgo y sujeto a los siguientes descargos de responsabilidad. Proveemos nuestros servicios ""tal como están"" y sin ningún tipo de garantía expresa o implícita, lo que incluye, entre otras, garantías de comerciabilidad, idoneidad para un propósito particular, título, no infracción y ausencia de cualquier virus informático u otro tipo de código dañino. No garantizamos que ninguna información proporcionada por nosotros sea precisa, completa o útil, que nuestros servicios sean operativos, estén exentos de errores, protegidos o seguros, o que nuestros servicios funcionen sin interrupciones, demoras o imperfecciones. No controlamos y no somos responsables de controlar cómo o cuándo nuestros usuarios usan nuestros servicios o las funciones, los servicios y las interfaces que nuestros servicios proporcionan. No somos responsables ni estamos obligados a controlar las acciones ni la información (incluido el contenido) de nuestros usuarios u otros terceros. Nos liberas a nosotros, y a nuestros directores, gerentes, empleados, socios comerciales y agentes (en conjunto, la ""organización de conevento”) de cualquier reclamo, queja, demanda, controversia o conflicto (en conjunto, ""reclamo"") y daños, conocidos o desconocidos, relacionados, derivados o conectados de algún modo con cualquier reclamo que tengas en contra de cualquier tercero. Recalcando que conevento únicamente funge como la relación entre clientes y prestadores de servicios, no existe relación laboral alguna con los prestadores de servicios (socios conevento), reconocen que conevento no adquiere ninguna obligación con los socios ni con el personal o trabajadores que éste último contrate para el cumplimiento de su trabajo, por lo que conevento no será considerado como patrón, ni sustituto de los empleados del socio. El socio será responsable solidario por la negligencia, impericia o dolo en que incurran los trabajadores a su servicio o los terceros que contrate.Conevento es una persona independiente a los usuarios; por lo tanto, los socios y su personal no son sus empleados. En consecuencia, estas personas no tienen derecho a solicitar salarios ordinarios, extraordinarios, descansos legales y semanarios, vacaciones, prima vacacional, aguinaldo, participación en las utilidades, prima legal de antigüedad o ningún otro concepto laboral a milusos conevento no tendrá obligación alguna de inscribir o efectuar los pagos por concepto de seguridad social, ni realizar cualquier otra prestación a que se obligue a los patrones de acuerdo con la ley federal del trabajo o cualquier otra ley. Coenvento no será considerado bajo ningún aspecto como patrón sustituto ni como beneficiario exclusivo ni preponderante respecto de las actividades del personal contratado por los usuarios, ni se considerará que existe pluralidad de patrones ni obligaciones patronales solidarias'}
]


//     this.faqs_ = [
//       { id: 1, titulo:"¿Una vez hecha la compra cuento con servicio post venta?"
//   , descripcion: "Despreocupate, tendrás un servicio personalizado. Una vez hecha tu compra un acesor de CONEVENTO te contactará en menos de 24 horas habiles, el te ayudará con cualquier duda o petición, Podrás agregar o cambiar cosas directamente con el."},

// { id: 2, titulo:"¿Quiénes son los trabajadores?", 
// descripcion: " Contamos con trabajadores certificados en los diferentes oficios, todos los trabajadores pasan por un filtro de seguridad, Para trabajar con CONEVENTO es necesario aprobar: una investigación, documentos oficiales, domicilio habitacional, entrevista personal y trabajos de prueba."}, 

// { id: 3, titulo:"¿Qué estoy pagando?", 
// descripcion: "Al seleccionar los servicios requeridos, se hará el apartado del pago de; la entrega de articulos en día del evento asi como la visita de la mano de obra del servicio requerido (por ej. Mesero)."}, 

// { id: 4, titulo:"¿Con cuanta anticipación debo contar para solicitar los servicios requeridos?"
// , descripcion: "72 hrs antes del inicio de tu evento."}, 

// { id: 5, titulo:"¿Qué pasa si ya no necesito el servicio?", 
// descripcion: "El servicio se puede cancelar en cualquier momento 72hrs antes del inicio del evento, por medio de la página web, o contacto directo via mensaje con Conevento. En caso de cancelar el dinero será devuelto en su totalidad. Si se cancela con un periodo menor se cobrará el 50% de multa."}, 

// { id: 6, titulo:"¿Qué pasa si quiero un reembolso?", 
// descripcion: "Los reembolsos serán autorizados por CONEVENTO después de haber analizado la situación y llegar a un mutuo acuerdo con El Cliente. Éstos podrán ser parciales o totales, el reembolso del servicio no toma en cuenta los viáticos (en caso de que el servicio los incluya) , ya que éstos son ajenos al costo del servicio y se dan de manera integra al Personal para su transportación."},

// { id: 7, titulo:"¿Qué pasa si por alguna razón algun servicio contratado debe ser cancelado por CONEVENTO debido a causas mayores?", 
// descripcion: "Conevento avisará al cliente vía mail y llamada para explicar la situación con al menos 48hrs de anticipación. Conevento reembolsará la totalidad del pago efectuado por el cliente."}, 

// { id: 8, titulo:"¿Cómo cancelo mi evento?", 
// descripcion: " Si por alguna razón debes cancelar tu cita, hazlo con 72 horas de anticipación para poder obtener el 100% de tu dinero. Para hacerlo, solo envíanos un mail a _______ o llámanos al (__________). Si no cancelas con 72 horas de anticipación, solo se te regresará el 50% de tu pago."}, 

// { id: 9, titulo:"¿Cuáles son las zonas donde operan?", 
// descripcion: "CDMX:  Alvaro Obregon, Magdalena Contreras, Cuahutemoc,Miguel Hidalgo,Coyoacan,Benito Juarez,Cuajimalpa de Morelos."}, 

// { id: 10, titulo:"¿Qué hago si tengo un problema con algun servicio para mi evento?", 
// descripcion: "En Conevento nos enfocamos a mejorar siempre tu experiencia Conevento, por eso si tienes algún problema, queja o sugerencia, puedes comunicarte a ____________ o marcarnos al (____________)."},

// { id: 11, titulo:"¿Cómo cambio de fecha mi evento?", 
// descripcion: "Cualquier cambio de horario, fecha o servicio debe hacerse con 72 horas de anticipación, de lo contrario se cancelará el servicio y se te cobrará el 50% de tu evento. Para hacer un cambio de fecha, escríbenos a ____________ o marcarnos al (____________) ."}, 

// { id: 12, titulo:"¿Qué servicios ofrece Conevento?", 
// descripcion: "Conevento ofrece los mejores servicios  de personal y articulos para tu evento, los cuales son los siguientes: -Personal de Mesero -Personal de Bartender -Personal de Talento -Personal de Limpieza PostEvento -Renta de Mobiliario -Renta de Audio y Luz.  -Compra de Bebidas."}, 

// { id: 13, titulo:"¿Cómo pago mi cita?", 
// descripcion: " Todos nuestros servicios y estilos se pagan por adelantado a través de nuestra plataforma. Puedes pagar con tarjeta de crédito o débito, Paypal, transferencia bancaria o en efectivo pagando en Oxxo. Estas opciones están disponibles a través de nuestra website."}, 

// { id: 14, titulo:"¿Qué seguridad tengo de ingresar mis datos bancarios en su website o app?",
//  descripcion: "Nuestro proveedor es Swipe y es el más seguro en pagos online. Puedes checar la página de Swipe."},

// { id: 15, titulo:"¿Puedo agendar un evento si no tengo tarjeta de crédito?", 
// descripcion: " Sí, puedes pagar un servicio aún sin tarjeta de crédito. Las opciones de pago que tenemos en nuestra página son: tarjeta de débito, Paypal, transferencia bancaria, SPEI, pago en oxxos."},

// { id: 16, titulo:"¿Porqué se pagan viaticos o flete adicionales?", 
// descripcion: " Tenemos Personal en diferentes zonas, se cobran viáticos de transportación para que el Personal más cercano pueda atenderte. En caso de servicio de material es para el envio y recolección del mismo al día siguiente del evento (Flete)."}, 

// { id: 17, titulo:"Si contrato un servicio de renta de Artículos ¿ cuándo son recogidos?", 
// descripcion: "Dentro de las siguientes 24hrs del termino de tu evento, si el día siguiente a tu evento es Domingo se recogen el siguiente día habil. De todas maneras tu asesor de Conevento coordinará todo contigo para que se recoja en tiempo y forma."},

// { id: 18, titulo:"¿Cómo se calculan el flete o viáticos?", 
// descripcion: " Los viáticos se calculan midiendo la distancia entre la dirección de tu Venue (donde ocurrirá el evento) y la dirección del Personal o Bodega más cercana."},

// { id: 19, titulo:"¿Cómo identifico al servicio de personal que viene de Conevento?", 
// descripcion: "Nuestro Personal lleva un gafete de Conevento con su nombre y fotografía, así como la playera de Conevento."}, 

// { id: 20, titulo:"¿Qué tan seguro es el Personal Conevento de Personal que mandan a los eventos?", 
// descripcion: " Sabemos que tu seguridad es lo más importante, por lo que Conevento tiene un proceso de selección y reclutamiento muy riguroso para poder trabajar como mesero, bartender, talento o servicio de limpieza post evento. Nuestro departamento de reclutamiento no solo les hace pruebas de habilidades, sino también se les aplican pruebas psicométricas y hacen una evaluación de antecedentes no penales.Adicionalmente tus datos personales están protegidos de acuerdo a las leyes mexicanas vigentes por lo que el Personal Conevento solo conocee la información indispensable para acudir a tu cita. Puedes revisar nuestro Aviso de Privacidad que se encuentra en nuestra sitio web (conevento.com)."}, 

// { id: 21, titulo:"Soy profesional de mesero, bartender, talento o servicio de limpieza post evento, ¿cómo puedo empezar a trabajar con Conevento?",
//  descripcion: "Siempre estamos en búsqueda de los y las mejores profesionales de belleza y spa. Si quieres trabajar con nosotros debes aplicar a través de nuestro formulario online. Ve aquí donde encontrarás nuestro formulario y posteriormente te contactaremos."}, 

// { id: 22, titulo:"¿Qué pasa si daño mobiliario o servicio de audio y luz?",
//  descripcion: " Se deja el material en perfectas condiciones verificando con el cliente (persona que pidio el servicio), para que al ser recogido al siguiente dia este en las mismas condiciones (puede estar sucio). En caso de algun daño, este será cobrado directamente al cliente y el pago pordrá ser por el medio que mejor se le acomode. Perjuicios a CONEVENTO o usuarios.No puedes acceder, usar, copiar, adaptar, modificar, preparar obras derivadas de nuestros Servicios, ni distribuir, licenciar, sublicenciar, transferir, mostrar, ejecutar o explotar de otro modo nuestros Servicios de maneras inadmisibles o no autorizadas, o de formas que nos afecten, perjudiquen o dañen a nosotros, a nuestros Servicios, a nuestros sistemas, a nuestros usuarios o a otras personas. Tampoco debes, directamente o a través de medios automatizados: (a) aplicar ingeniería inversa, alterar, modificar, crear obras derivadas, descompilar o extraer código de nuestros Servicios; (b) enviar, almacenar o transmitir un virus u otro código informático dañino a través de nuestros Servicios o en ellos; (c) obtener o intentar obtener acceso no autorizado a nuestros Servicios o sistemas; (d) interrumpir o interferir con la integridad o el rendimiento de nuestros Servicios; (e) crear cuentas para nuestros Servicios a través de medios automatizados o no autorizados; (f) recopilar la información sobre nuestros usuarios de cualquier forma inadmisible o no autorizada; (g) vender, revender, alquilar o cobrar por nuestros Servicios; o (h) distribuir o poner en disponibilidad nuestros Servicios en una red donde podrían usarse en varios dispositivos a la misma vez o ayudar a otros a realizar cualquiera de las actividades anteriormente mencionadas o similares"}


//     ]
  }

  public set_acordeon(){
    
  }

}
