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
    this.faqs = [
      { id: 1, titulo:"¿Una vez hecha la compra cuento con servicio post venta?"
  , descripcion: "Despreocupate, tendrás un servicio personalizado. Una vez hecha tu compra un acesor de CONEVENTO te contactará en menos de 24 horas habiles, el te ayudará con cualquier duda o petición, Podrás agregar o cambiar cosas directamente con el."},

{ id: 2, titulo:"¿Quiénes son los trabajadores?", 
descripcion: " Contamos con trabajadores certificados en los diferentes oficios, todos los trabajadores pasan por un filtro de seguridad, Para trabajar con CONEVENTO es necesario aprobar: una investigación, documentos oficiales, domicilio habitacional, entrevista personal y trabajos de prueba."}, 

{ id: 3, titulo:"¿Qué estoy pagando?", 
descripcion: "Al seleccionar los servicios requeridos, se hará el apartado del pago de; la entrega de articulos en día del evento asi como la visita de la mano de obra del servicio requerido (por ej. Mesero)."}, 

{ id: 4, titulo:"¿Con cuanta anticipación debo contar para solicitar los servicios requeridos?"
, descripcion: "72 hrs antes del inicio de tu evento."}, 

{ id: 5, titulo:"¿Qué pasa si ya no necesito el servicio?", 
descripcion: "El servicio se puede cancelar en cualquier momento 72hrs antes del inicio del evento, por medio de la página web, o contacto directo via mensaje con Conevento. En caso de cancelar el dinero será devuelto en su totalidad. Si se cancela con un periodo menor se cobrará el 50% de multa."}, 

{ id: 6, titulo:"¿Qué pasa si quiero un reembolso?", 
descripcion: "Los reembolsos serán autorizados por CONEVENTO después de haber analizado la situación y llegar a un mutuo acuerdo con El Cliente. Éstos podrán ser parciales o totales, el reembolso del servicio no toma en cuenta los viáticos (en caso de que el servicio los incluya) , ya que éstos son ajenos al costo del servicio y se dan de manera integra al Personal para su transportación."},

{ id: 7, titulo:"¿Qué pasa si por alguna razón algun servicio contratado debe ser cancelado por CONEVENTO debido a causas mayores?", 
descripcion: "Conevento avisará al cliente vía mail y llamada para explicar la situación con al menos 48hrs de anticipación. Conevento reembolsará la totalidad del pago efectuado por el cliente."}, 

{ id: 8, titulo:"¿Cómo cancelo mi evento?", 
descripcion: " Si por alguna razón debes cancelar tu cita, hazlo con 72 horas de anticipación para poder obtener el 100% de tu dinero. Para hacerlo, solo envíanos un mail a _______ o llámanos al (__________). Si no cancelas con 72 horas de anticipación, solo se te regresará el 50% de tu pago."}, 

{ id: 9, titulo:"¿Cuáles son las zonas donde operan?", 
descripcion: "CDMX:  Alvaro Obregon, Magdalena Contreras, Cuahutemoc,Miguel Hidalgo,Coyoacan,Benito Juarez,Cuajimalpa de Morelos."}, 

{ id: 10, titulo:"¿Qué hago si tengo un problema con algun servicio para mi evento?", 
descripcion: "En Conevento nos enfocamos a mejorar siempre tu experiencia Conevento, por eso si tienes algún problema, queja o sugerencia, puedes comunicarte a ____________ o marcarnos al (____________)."},

{ id: 11, titulo:"¿Cómo cambio de fecha mi evento?", 
descripcion: "Cualquier cambio de horario, fecha o servicio debe hacerse con 72 horas de anticipación, de lo contrario se cancelará el servicio y se te cobrará el 50% de tu evento. Para hacer un cambio de fecha, escríbenos a ____________ o marcarnos al (____________) ."}, 

{ id: 12, titulo:"¿Qué servicios ofrece Conevento?", 
descripcion: "Conevento ofrece los mejores servicios  de personal y articulos para tu evento, los cuales son los siguientes: -Personal de Mesero -Personal de Bartender -Personal de Talento -Personal de Limpieza PostEvento -Renta de Mobiliario -Renta de Audio y Luz.  -Compra de Bebidas."}, 

{ id: 13, titulo:"¿Cómo pago mi cita?", 
descripcion: " Todos nuestros servicios y estilos se pagan por adelantado a través de nuestra plataforma. Puedes pagar con tarjeta de crédito o débito, Paypal, transferencia bancaria o en efectivo pagando en Oxxo. Estas opciones están disponibles a través de nuestra website."}, 

{ id: 14, titulo:"¿Qué seguridad tengo de ingresar mis datos bancarios en su website o app?",
 descripcion: "Nuestro proveedor es Swipe y es el más seguro en pagos online. Puedes checar la página de Swipe."},

{ id: 15, titulo:"¿Puedo agendar un evento si no tengo tarjeta de crédito?", 
descripcion: " Sí, puedes pagar un servicio aún sin tarjeta de crédito. Las opciones de pago que tenemos en nuestra página son: tarjeta de débito, Paypal, transferencia bancaria, SPEI, pago en oxxos."},

{ id: 16, titulo:"¿Porqué se pagan viaticos o flete adicionales?", 
descripcion: " Tenemos Personal en diferentes zonas, se cobran viáticos de transportación para que el Personal más cercano pueda atenderte. En caso de servicio de material es para el envio y recolección del mismo al día siguiente del evento (Flete)."}, 

{ id: 17, titulo:"Si contrato un servicio de renta de Artículos ¿ cuándo son recogidos?", 
descripcion: "Dentro de las siguientes 24hrs del termino de tu evento, si el día siguiente a tu evento es Domingo se recogen el siguiente día habil. De todas maneras tu asesor de Conevento coordinará todo contigo para que se recoja en tiempo y forma."},

{ id: 18, titulo:"¿Cómo se calculan el flete o viáticos?", 
descripcion: " Los viáticos se calculan midiendo la distancia entre la dirección de tu Venue (donde ocurrirá el evento) y la dirección del Personal o Bodega más cercana."},

{ id: 19, titulo:"¿Cómo identifico al servicio de personal que viene de Conevento?", 
descripcion: "Nuestro Personal lleva un gafete de Conevento con su nombre y fotografía, así como la playera de Conevento."}, 

{ id: 20, titulo:"¿Qué tan seguro es el Personal Conevento de Personal que mandan a los eventos?", 
descripcion: " Sabemos que tu seguridad es lo más importante, por lo que Conevento tiene un proceso de selección y reclutamiento muy riguroso para poder trabajar como mesero, bartender, talento o servicio de limpieza post evento. Nuestro departamento de reclutamiento no solo les hace pruebas de habilidades, sino también se les aplican pruebas psicométricas y hacen una evaluación de antecedentes no penales.Adicionalmente tus datos personales están protegidos de acuerdo a las leyes mexicanas vigentes por lo que el Personal Conevento solo conocee la información indispensable para acudir a tu cita. Puedes revisar nuestro Aviso de Privacidad que se encuentra en nuestra sitio web (conevento.com)."}, 

{ id: 21, titulo:"Soy profesional de mesero, bartender, talento o servicio de limpieza post evento, ¿cómo puedo empezar a trabajar con Conevento?",
 descripcion: "Siempre estamos en búsqueda de los y las mejores profesionales de belleza y spa. Si quieres trabajar con nosotros debes aplicar a través de nuestro formulario online. Ve aquí donde encontrarás nuestro formulario y posteriormente te contactaremos."}, 

{ id: 22, titulo:"¿Qué pasa si daño mobiliario o servicio de audio y luz?",
 descripcion: " Se deja el material en perfectas condiciones verificando con el cliente (persona que pidio el servicio), para que al ser recogido al siguiente dia este en las mismas condiciones (puede estar sucio). En caso de algun daño, este será cobrado directamente al cliente y el pago pordrá ser por el medio que mejor se le acomode. Perjuicios a CONEVENTO o usuarios.No puedes acceder, usar, copiar, adaptar, modificar, preparar obras derivadas de nuestros Servicios, ni distribuir, licenciar, sublicenciar, transferir, mostrar, ejecutar o explotar de otro modo nuestros Servicios de maneras inadmisibles o no autorizadas, o de formas que nos afecten, perjudiquen o dañen a nosotros, a nuestros Servicios, a nuestros sistemas, a nuestros usuarios o a otras personas. Tampoco debes, directamente o a través de medios automatizados: (a) aplicar ingeniería inversa, alterar, modificar, crear obras derivadas, descompilar o extraer código de nuestros Servicios; (b) enviar, almacenar o transmitir un virus u otro código informático dañino a través de nuestros Servicios o en ellos; (c) obtener o intentar obtener acceso no autorizado a nuestros Servicios o sistemas; (d) interrumpir o interferir con la integridad o el rendimiento de nuestros Servicios; (e) crear cuentas para nuestros Servicios a través de medios automatizados o no autorizados; (f) recopilar la información sobre nuestros usuarios de cualquier forma inadmisible o no autorizada; (g) vender, revender, alquilar o cobrar por nuestros Servicios; o (h) distribuir o poner en disponibilidad nuestros Servicios en una red donde podrían usarse en varios dispositivos a la misma vez o ayudar a otros a realizar cualquiera de las actividades anteriormente mencionadas o similares"}


    ]
  }

  public set_acordeon(){
    
  }

}
