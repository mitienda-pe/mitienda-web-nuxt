<script setup lang="ts">
const { country, brandName } = useCountry()

useSeoMeta({
  title: () => `Políticas de Privacidad - ${brandName.value}`,
  description: () => `Políticas de privacidad de ${brandName.value}`,
})
</script>

<template>
  <div class="politicas-privacidad">
    <div class="container texto_terminos py-5">
      <div class="row">
        <div class="col-md-12">
          <h2>Política de Privacidad / {{ brandName }}</h2>
          <p>Última actualización: <time datetime="2026-09-21">21 de septiembre de 2026</time></p>

          <p>Su privacidad es importante para nosotros. Esta Política de Privacidad explica qué datos personales
            recopilamos, para qué los usamos, con quién los compartimos y cómo puede ejercer sus derechos cuando usa
            la plataforma de comercio electrónico que opera bajo la marca MiTienda en Perú
            (<a href="https://mitienda.pe">https://mitienda.pe</a>) y TiendaBox en Ecuador
            (<a href="https://tiendabox.ec">https://tiendabox.ec</a>) y Colombia
            (<a href="https://tiendabox.co">https://tiendabox.co</a>), incluyendo sus sitios web, el panel de
            administración, el punto de venta y las aplicaciones asociadas (en conjunto, la "Plataforma").</p>
          <p>Los términos con mayúscula inicial que no se definen aquí tienen el significado que se les asigna en
            nuestros <NuxtLink to="/terminos-y-condiciones">Términos y Condiciones</NuxtLink>.</p>

          <h3>1. Responsable del tratamiento</h3>
          <p>El responsable del tratamiento de los datos personales descritos en esta Política es Tiendas Virtuales
            Latinoamérica SAC, con domicilio en Av. Arequipa N° 4130, of. 02, distrito de Miraflores, Lima 18,
            Perú. Puede contactarnos en <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a>.</p>

          <h3>2. Datos que recopilamos</h3>
          <ul>
            <li><strong>Datos de registro y de la cuenta:</strong> nombre, correo electrónico, teléfono, contraseña
              (almacenada de forma cifrada), nombre y rubro de la tienda, y los datos de los usuarios
              administradores que el Usuario invite a su cuenta.</li>
            <li><strong>Datos de facturación:</strong> razón social o nombre, número de identificación tributaria
              o documento de identidad y dirección, necesarios para emitir los comprobantes de la suscripción.</li>
            <li><strong>Datos de pago:</strong> no almacenamos los datos completos de tarjetas. La pasarela de pago
              recibe y custodia esos datos, y nos entrega únicamente un identificador cifrado (token) y datos no
              sensibles, como la marca y los últimos cuatro dígitos de la tarjeta.</li>
            <li><strong>Datos de uso y navegación:</strong> dirección IP, tipo de dispositivo y navegador, páginas
              visitadas y acciones realizadas en la Plataforma, obtenidos en parte mediante cookies, según se
              describe en nuestra <NuxtLink to="/politica-de-cookies">Política de Cookies</NuxtLink>.</li>
            <li><strong>Comunicaciones:</strong> los mensajes que nos envía por correo electrónico, WhatsApp o el
              chat de soporte (incluidas las conversaciones con nuestro asistente virtual) y, en Perú, los reclamos
              y quejas registrados en nuestro Libro de Reclamaciones.</li>
          </ul>

          <h3>3. Finalidades del tratamiento</h3>
          <p>Usamos sus datos personales para:</p>
          <ol type="I">
            <li>Crear y administrar su cuenta y prestarle el Servicio contratado.</li>
            <li>Gestionar su suscripción, los cobros y la emisión de comprobantes de pago.</li>
            <li>Brindarle soporte y responder sus consultas, reclamos y quejas.</li>
            <li>Enviarle comunicaciones sobre el Servicio, como avisos técnicos, cambios en los planes o
              modificaciones de los Términos y Condiciones o de esta Política.</li>
            <li>Proteger la seguridad de la Plataforma y prevenir el fraude y los usos indebidos.</li>
            <li>Cumplir las obligaciones legales, tributarias y regulatorias que nos correspondan.</li>
            <li>Analizar el uso de la Plataforma para mejorarla y desarrollar nuevas funcionalidades.</li>
            <li>Enviarle información comercial, novedades y promociones de MiTienda y de sus empresas vinculadas,
              siempre que usted no se haya opuesto a ello.</li>
          </ol>
          <p>Las finalidades I a VI son necesarias para la ejecución de la relación contractual o para cumplir
            obligaciones legales. Las finalidades VII y VIII se basan en su consentimiento o en nuestro interés en
            mejorar el Servicio, y usted puede oponerse a ellas en cualquier momento sin que ello afecte la
            prestación del Servicio.</p>

          <h3>4. Con quién compartimos sus datos</h3>
          <p>No vendemos, alquilamos ni comercializamos sus datos personales. Solo los compartimos con:</p>
          <ul>
            <li><strong>Proveedores que nos prestan servicios</strong> y que tratan los datos por nuestra cuenta y
              bajo nuestras instrucciones, tales como proveedores de infraestructura en la nube, almacenamiento y
              distribución de contenidos, envío de correos electrónicos y mensajes, pasarelas de pago, facturación
              electrónica, analítica web, publicidad digital y servicios de inteligencia artificial utilizados por
              el chat de soporte y otras funcionalidades de la Plataforma.</li>
            <li><strong>Empresas vinculadas</strong> a Tiendas Virtuales Latinoamérica SAC, para las mismas
              finalidades descritas en esta Política.</li>
            <li><strong>Autoridades competentes</strong>, cuando una norma o un mandato judicial o administrativo
              así lo exija.</li>
          </ul>
          <p>No compartimos los datos personales de los Usuarios con otros Comercios Afiliados.</p>

          <h3>5. Transferencias internacionales</h3>
          <p>Algunos de nuestros proveedores pueden almacenar o tratar los datos en servidores ubicados fuera del país
            del Usuario. En esos casos, adoptamos las medidas necesarias para que el destinatario ofrezca un nivel de
            protección adecuado, conforme a la normativa aplicable.</p>

          <h3>6. Datos de los compradores de las tiendas virtuales</h3>
          <p>Los datos personales de los Usuarios Finales/Compradores que cada Comercio Afiliado recopila a través de
            su Tienda Virtual (por ejemplo, al registrar un pedido) pertenecen al banco de datos del Comercio
            Afiliado, que es el responsable de su tratamiento. Tiendas Virtuales Latinoamérica SAC actúa únicamente
            como encargado del tratamiento: los aloja y procesa por cuenta del Comercio Afiliado para prestar el
            Servicio, y no los usa para fines propios ni los comparte con otros comercios. Si usted compró en una
            tienda virtual y desea ejercer sus derechos sobre esos datos, debe dirigirse al comercio
            correspondiente.</p>

          <h3>7. Plazo de conservación</h3>
          <p>Conservamos sus datos personales mientras su cuenta se encuentre activa y, luego de ello, durante los
            plazos exigidos por la normativa tributaria, contable y de protección al consumidor, o por el tiempo
            necesario para atender posibles reclamos o responsabilidades. Vencidos esos plazos, los datos se
            eliminan o se anonimizan.</p>

          <h3>8. Seguridad</h3>
          <p>Aplicamos medidas de seguridad técnicas, organizativas y legales para proteger sus datos personales
            frente a su pérdida, alteración o acceso no autorizado, entre ellas el cifrado de las comunicaciones, el
            cifrado de determinados datos almacenados y el control de acceso a la información. Ningún sistema es
            completamente invulnerable, por lo que no podemos garantizar una seguridad absoluta.</p>

          <h3>9. Sus derechos</h3>
          <p>Como titular de sus datos personales, usted puede ejercer en cualquier momento sus derechos de acceso,
            rectificación, cancelación (supresión) y oposición, así como revocar el consentimiento que nos haya
            otorgado y los demás derechos que le reconozca la normativa aplicable. Para ello, escríbanos a
            <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a> con el asunto "Protección de datos
            personales", indicando su solicitud y adjuntando una copia de su documento de identidad (o del documento
            que acredite la representación, si actúa por cuenta de otra persona). Atenderemos su solicitud dentro de
            los plazos establecidos por la ley.</p>
          <p>Si considera que no hemos atendido su solicitud adecuadamente, puede presentar un reclamo ante la
            autoridad de protección de datos de su país: en Perú, la Autoridad Nacional de Protección de Datos
            Personales del Ministerio de Justicia y Derechos Humanos; en Ecuador, la Superintendencia de Protección
            de Datos Personales; y en Colombia, la Superintendencia de Industria y Comercio.</p>

          <h3>10. Normativa aplicable</h3>
          <p>El tratamiento de datos personales se realiza de conformidad con la Ley N° 29733, Ley de Protección de
            Datos Personales, y su Reglamento aprobado por Decreto Supremo N° 016-2024-JUS (Perú) y, cuando
            corresponda, con la Ley Orgánica de Protección de Datos Personales (Ecuador) y la Ley Estatutaria 1581 de
            2012 y sus normas reglamentarias (Colombia).</p>

          <h3>11. Menores de edad</h3>
          <p>La Plataforma está dirigida a personas mayores de 18 años. No recopilamos de forma intencional datos
            personales de menores de edad; si detectamos que lo hemos hecho, los eliminaremos.</p>

          <h3>12. Cambios en esta Política</h3>
          <p>Podemos actualizar esta Política de Privacidad. Publicaremos la nueva versión en esta página, con su
            fecha de actualización, y le comunicaremos los cambios relevantes mediante el correo electrónico
            registrado en su cuenta.</p>

          <p>Si tiene alguna consulta sobre esta Política, puede escribirnos a
            <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a> o visitar nuestro centro de ayuda en
            <a :href="country.helpUrl" target="_blank" rel="noopener">{{ country.helpUrl }}</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.texto_terminos {
  padding-top: 100px;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}

.texto_terminos h2 {
  color: var(--primary-color);
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.texto_terminos h3 {
  color: var(--text-dark);
  font-weight: 700;
  font-size: 1.3rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.texto_terminos p {
  text-align: justify;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.texto_terminos p strong,
.texto_terminos li strong {
  font-weight: 700;
}

.texto_terminos ol,
.texto_terminos ul {
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  padding-left: 2rem;
}

.texto_terminos ol {
  list-style-type: upper-roman;
}

.texto_terminos ul {
  list-style-type: disc;
}

.texto_terminos li {
  margin-bottom: 0.75rem;
  text-align: justify;
  line-height: 1.8;
}

.texto_terminos a {
  color: var(--primary-color);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.texto_terminos a:hover {
  color: var(--primary-hover);
}
</style>
