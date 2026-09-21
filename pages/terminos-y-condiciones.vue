<script setup lang="ts">
const { country, brandName } = useCountry()
const site = computed(() => `https://${country.value.landingDomain}`)

useSeoMeta({
  title: () => `Términos y Condiciones - ${brandName.value}`,
  description: () => `Términos y condiciones de uso de ${brandName.value}`,
})
</script>

<template>
  <div class="terminos">
    <div class="container texto_terminos py-5">
      <div class="row">
        <div class="col-md-12">
          <h2>Términos y Condiciones / {{ brandName }}</h2>
          <p>Versión 7<br />Última actualización: <time datetime="2026-09-21">21 de septiembre de 2026</time></p>

          <h3>Introducción</h3>
          <p>
            La empresa Tiendas Virtuales Latinoamérica SAC ha desarrollado la plataforma de comercio electrónico que
            opera bajo la marca "MiTienda" en Perú (<a href="https://mitienda.pe">https://mitienda.pe</a>) y bajo la
            marca "TiendaBox" en Ecuador (<a href="https://tiendabox.ec">https://tiendabox.ec</a>) y Colombia
            (<a href="https://tiendabox.co">https://tiendabox.co</a>), en la que diversas empresas y comercios, sean
            estos personas naturales o jurídicas distintas a Tiendas Virtuales Latinoamérica SAC, pueden autogestionar
            tiendas virtuales para ofrecer sus bienes y servicios a terceros, facilitando así la conexión entre
            compradores y ofertantes.
          </p>

          <h3>Definiciones</h3>
          <p>
            En los presentes Términos y Condiciones, cuando la primera letra de los siguientes términos sea
            mayúscula, dichos términos tendrán el significado que se les asigna a continuación:
          </p>
          <p><strong>MiTienda:</strong> Es la plataforma digital creada y desarrollada por Tiendas Virtuales
            Latinoamérica SAC, mediante la cual el Usuario podrá autogestionar su Tienda Virtual, a través de la cual
            ofrecerá sus Productos al Usuario Final. Según el país, la plataforma opera bajo la marca MiTienda
            (<a href="https://mitienda.pe">https://mitienda.pe</a>) o TiendaBox
            (<a href="https://tiendabox.ec">https://tiendabox.ec</a>,
            <a href="https://tiendabox.co">https://tiendabox.co</a>). Toda referencia a MiTienda en estos Términos y
            Condiciones comprende también a TiendaBox.</p>
          <p><strong>Comercio Afiliado:</strong> Es toda (i) persona natural mayor de 18 años de edad con capacidad
            legal para celebrar contratos; o (ii) persona jurídica representada e individualizada por una persona
            natural con facultades de representación, que se suscribe para recibir el Servicio de Tiendas Virtuales
            Latinoamérica SAC, a fin de crear y autogestionar una Tienda Virtual propia y ofertar a través de ella sus
            Productos al Usuario Final. También será denominado "Usuario".</p>
          <p><strong>Comprador:</strong> Es toda (i) persona natural mayor de 18 años de edad con capacidad legal para
            celebrar contratos; o (ii) persona jurídica representada e individualizada por una persona natural con
            facultades de representación, que navegue en la Tienda Virtual y adquiera Productos ofertados por el
            Usuario a través de ella. También será denominado "Usuario Final".</p>
          <p><strong>Límites de Uso:</strong> Son las cantidades máximas y las condiciones de uso de cada
            funcionalidad o módulo de MiTienda (por ejemplo, el número de productos, de usuarios administradores, de
            documentos emitidos, de correos enviados o de ítems que puede procesar un módulo) que Tiendas Virtuales
            Latinoamérica SAC define para cada Plan.</p>
          <p><strong>Plan:</strong> Es cada una de las modalidades de suscripción al Servicio, con las
            funcionalidades, módulos y Límites de Uso que le correspondan.</p>
          <p><strong>Producto:</strong> Son los bienes y/o servicios que oferta el Usuario/Comercio Afiliado al Usuario
            Final/Comprador a través de su Tienda Virtual generada mediante MiTienda.</p>
          <p><strong>Requisitos Técnicos:</strong> Son las condiciones mínimas que deben cumplir los equipos del
            Usuario para utilizar MiTienda: un navegador web actualizado, en su versión vigente o la inmediatamente
            anterior, con JavaScript y cookies habilitados, y una conexión a Internet estable.</p>
          <p><strong>Servicio:</strong> Es el servicio que brinda Tiendas Virtuales Latinoamérica SAC a fin de
            permitir al Usuario el uso de MiTienda para autogestionar su propia Tienda Virtual, a través de la cual el
            Usuario ofertará sus Productos al Usuario Final, una vez que el Usuario se suscriba al Servicio.</p>
          <p><strong>Servidor:</strong> Son los procesadores y medios de almacenamiento, propios o contratados por
            Tiendas Virtuales Latinoamérica SAC, en los que se ejecutan y alojan las aplicaciones informáticas de todas
            y cada una de las tiendas virtuales creadas a través de MiTienda, así como sus bases de datos y contenidos
            (imágenes, textos, etc.).</p>
          <p><strong>Términos y Condiciones:</strong> Son los presentes términos y condiciones.</p>
          <p><strong>Territorio:</strong> Es la República del Perú, la República del Ecuador, la República de Colombia
            y cualquier otro país en el que Tiendas Virtuales Latinoamérica SAC ofrezca el Servicio en el futuro.</p>
          <p><strong>Tienda Virtual:</strong> Es la tienda virtual que el Usuario/Comercio Afiliado crea y
            autogestiona mediante el acceso a MiTienda, y a través de la cual oferta sus Productos al Usuario
            Final/Comprador en el Territorio, una vez que el Usuario/Comercio Afiliado se suscriba al Servicio de
            Tiendas Virtuales Latinoamérica SAC.</p>
          <p><strong>Usuario:</strong> Es toda (i) persona natural mayor de 18 años de edad con capacidad legal para
            celebrar contratos; o (ii) persona jurídica representada e individualizada por una persona natural con
            facultades de representación, que se suscribe para recibir el Servicio de Tiendas Virtuales Latinoamérica
            SAC, a fin de crear y autogestionar una Tienda Virtual propia y ofertar a través de ella sus Productos al
            Usuario Final. También será denominado "Comercio Afiliado".</p>
          <p><strong>Usuario Final:</strong> Es toda (i) persona natural mayor de 18 años de edad con capacidad legal
            para celebrar contratos; o (ii) persona jurídica representada e individualizada por una persona natural
            con facultades de representación, que navegue en la Tienda Virtual y adquiera Productos ofertados por el
            Usuario a través de ella. También será denominado "Comprador".</p>

          <h3>Declaraciones de Tiendas Virtuales Latinoamérica SAC</h3>
          <p>Tiendas Virtuales Latinoamérica SAC declara que:</p>
          <ol type="I">
            <li>Toda vez que Tiendas Virtuales Latinoamérica SAC no participa en la transacción final, no garantiza
              ni respalda la operatividad, idoneidad de los Productos o información de los mismos que ofrece el
              Usuario/Comercio Afiliado, ni atiende reclamos o atención postventa de tales Productos, los cuales se
              rigen conforme a los términos y condiciones estipulados por el Usuario/Comercio Afiliado.
            </li>
            <li>Cada Tienda Virtual debe tener sus propios términos y condiciones que regulen la relación entre el
              Usuario/Comercio Afiliado y el Usuario Final/Comprador.</li>
            <li>Los términos y condiciones contenidos en la Tienda Virtual de cada Usuario/Comercio Afiliado se
              aplicarán en su totalidad y, por referencia, se aplicarán los presentes Términos y Condiciones sin
              distinción alguna a todos los Servicios que se presten en la Tienda Virtual. Cualquier Usuario/Comercio
              Afiliado o Usuario Final/Comprador que no acepte estos Términos y Condiciones, los cuales tienen
              carácter obligatorio y vinculante, deberá abstenerse de adquirir los Productos del Usuario/Comercio
              Afiliado o de utilizar los Servicios de MiTienda, según corresponda.</li>
            <li>El Usuario/Comercio Afiliado debe leer, entender y aceptar todas las condiciones establecidas en los
              Términos y Condiciones, así como en los demás documentos incorporados por referencia, de forma previa a
              su suscripción al Servicio.</li>
            <li>El Usuario Final/Comprador debe leer, entender y aceptar todas las condiciones establecidas en los
              propios términos y condiciones del Usuario/Comercio Afiliado y, por referencia, en los Términos y
              Condiciones, así como en los demás documentos incorporados por referencia, de forma previa a la
              adquisición del Producto.</li>
            <li>Si el Usuario/Comercio Afiliado hiciera uso de MiTienda registrando sus datos y accediendo a nuestra
              plataforma, ello implicará la aceptación plena de las condiciones establecidas en los Términos y
              Condiciones.</li>
            <li>Tiendas Virtuales Latinoamérica SAC no almacena en sus Servidores los datos completos de tarjetas de
              crédito o débito (número completo, fecha de vencimiento ni código de seguridad). Cuando el
              Usuario/Comercio Afiliado registra una tarjeta para el cobro recurrente de su suscripción, o cuando el
              Usuario Final/Comprador paga con tarjeta en una Tienda Virtual, esos datos son recibidos y custodiados
              directamente por la pasarela de pago correspondiente, la cual entrega a Tiendas Virtuales Latinoamérica
              SAC únicamente un identificador cifrado (token) y datos no sensibles, tales como la marca y los últimos
              cuatro dígitos de la tarjeta, que permiten efectuar los cargos autorizados. En ese sentido, Tiendas
              Virtuales Latinoamérica SAC no será responsable del uso o tratamiento que las pasarelas de pago den a
              dicha información.</li>
            <li>El Servidor es compartido por todas las tiendas virtuales creadas a través de MiTienda.</li>
            <li>Tiendas Virtuales Latinoamérica SAC se reserva el derecho a suspender la prestación del Servicio a
              cualquier persona que efectúe actos indebidos o contrarios a la ley, incluyendo, pero no limitado a,
              la proporción de datos falsos y/o inexactos.</li>
          </ol>

          <h3>Declaraciones del Usuario o Comercio Afiliado</h3>
          <p>El <strong>Usuario/Comercio Afiliado</strong> declara que:</p>
          <ol type="I">
            <li>El presente documento contiene los Términos y Condiciones que regulan el acceso o uso de MiTienda que
              el Usuario haga como Comercio Afiliado y, por lo tanto, debe ser aceptado por quienes deseen utilizar
              MiTienda para la creación de su Tienda Virtual;</li>
            <li>Los Productos ofertados a través de la Tienda Virtual son de propiedad del Usuario/Comercio
              Afiliado;</li>
            <li>Tiendas Virtuales Latinoamérica SAC no califica como proveedor de los Productos del Usuario/Comercio
              Afiliado, no tiene posesión de ellos, ni interviene en el perfeccionamiento de las operaciones
              realizadas entre el Usuario/Comercio Afiliado y el Usuario Final/Comprador, ni en la posterior
              negociación, el perfeccionamiento de la operación, la atención postventa o las obligaciones asumidas
              en el contrato definitivo, las cuales se acordarán por cuenta, costo y riesgo del Usuario/Comercio
              Afiliado y el Usuario Final/Comprador, por lo cual Tiendas Virtuales Latinoamérica SAC no es
              responsable por la idoneidad y/o información de los mismos, lo cual recae única y exclusivamente en el
              Usuario/Comercio Afiliado;</li>
            <li>En ningún caso el Servicio prestado al Usuario/Comercio Afiliado por parte de Tiendas Virtuales
              Latinoamérica SAC derivará o generará una relación de consumo entre Tiendas Virtuales Latinoamérica SAC
              y el Usuario Final/Comprador, por cuanto las prestaciones y las obligaciones de cada uno son
              distintas;</li>
            <li>Reconoce y acepta que Tiendas Virtuales Latinoamérica SAC se limita a prestarle el Servicio a fin de
              que el Usuario/Comercio Afiliado cree y autogestione su Tienda Virtual, a través de la cual ofrecerá sus
              Productos al Usuario Final/Comprador, por lo que la relación contractual originada en la adquisición
              del Producto es absolutamente ajena a Tiendas Virtuales Latinoamérica SAC;</li>
            <li>Conoce que el Servidor es compartido con otros usuarios, por lo que reconoce y acepta que su Tienda
              Virtual no deberá generar un tráfico web o un consumo de recursos tal que afecte el normal
              funcionamiento de las tiendas virtuales de otros usuarios. De verificarse este evento por alguna acción
              u omisión del Usuario/Comercio Afiliado (sin limitar y a modo de ejemplo, el lanzamiento de alguna
              campaña promocional), Tiendas Virtuales Latinoamérica SAC se reserva el derecho de suspender el
              Servicio, o de cancelarlo en forma permanente en caso el Usuario/Comercio Afiliado reincida en tal
              evento, sin que ello implique el pago de indemnización alguna a favor del Usuario/Comercio
              Afiliado;</li>
            <li>Exime a Tiendas Virtuales Latinoamérica SAC de cualquier tipo de reclamo o acción legal respecto al
              Producto o a cualquier causa ajena al control de Tiendas Virtuales Latinoamérica SAC relacionada con
              concretar la operación de enajenación del Producto. En ese sentido, el Usuario/Comercio Afiliado
              mantendrá indemne a Tiendas Virtuales Latinoamérica SAC, así como a sus directores, gerentes,
              empleados, agentes, operarios, representantes y apoderados, incluyendo asumir los gastos de honorarios
              profesionales, costos y costas de cualquier reclamo relacionado con lo indicado en este numeral.</li>
          </ol>

          <h3>Declaraciones del Usuario Final o Comprador</h3>
          <ol type="I">
            <li>El presente documento contiene los Términos y Condiciones que aplican por referencia a los términos
              y condiciones del Usuario/Comercio Afiliado en relación con el Producto, por lo que la aceptación de los
              términos y condiciones del Usuario/Comercio Afiliado implica la aceptación de los Términos y
              Condiciones.</li>
            <li>El Usuario Final/Comprador declara y acepta que el Producto que adquiere del Usuario/Comercio Afiliado
              a través de la Tienda Virtual es de propiedad del Usuario/Comercio Afiliado; por lo que Tiendas
              Virtuales Latinoamérica SAC no califica como proveedor del Producto del Usuario/Comercio Afiliado, no
              tiene posesión de él, ni interviene en el perfeccionamiento de las operaciones realizadas entre el
              Usuario/Comercio Afiliado y el Usuario Final/Comprador, ni en la posterior negociación, el
              perfeccionamiento de la operación, la atención postventa o las obligaciones asumidas en el contrato
              definitivo, las cuales se acordarán por cuenta, costo y riesgo del Usuario/Comercio Afiliado y el
              Usuario Final/Comprador. En ese sentido, Tiendas Virtuales Latinoamérica SAC no es responsable por la
              idoneidad y/o información de los mismos, lo cual recae única y exclusivamente en el Usuario/Comercio
              Afiliado;</li>
            <li>El Usuario Final/Comprador reconoce y acepta que en ningún caso el Servicio prestado por Tiendas
              Virtuales Latinoamérica SAC al Usuario/Comercio Afiliado derivará o generará una relación de consumo
              entre Tiendas Virtuales Latinoamérica SAC y el Usuario Final/Comprador, por cuanto las prestaciones y
              las obligaciones de cada uno son distintas;</li>
            <li>El Usuario Final/Comprador reconoce y acepta que Tiendas Virtuales Latinoamérica SAC no respalda ni
              garantiza el Producto que ofrece el Usuario/Comercio Afiliado, por lo que no deberá adoptar decisiones
              de consumo asumiendo que estas son avaladas o respaldadas por Tiendas Virtuales Latinoamérica SAC; por
              el contrario, deberá actuar de manera diligente y razonable, informándose por su propia cuenta y
              riesgo.</li>
            <li>El Usuario Final/Comprador exime a Tiendas Virtuales Latinoamérica SAC de cualquier tipo de reclamo o
              acción legal respecto a los Productos o a cualquier causa relacionada con concretar la operación de
              adquisición de los Productos. En ese sentido, el Usuario Final/Comprador no efectuará ningún tipo de
              reclamo o denuncia a Tiendas Virtuales Latinoamérica SAC, debiendo dirigirlo al Usuario/Comercio
              Afiliado con el que contrató la adquisición del Producto.</li>
          </ol>

          <h3>Aceptación</h3>
          <p>
            Mediante la utilización en cualquier forma del Servicio, el Usuario y/o el Usuario Final, este último
            por referencia, aceptan todos los Términos y Condiciones. Asimismo, se entiende que aceptan las
            disposiciones de operación, políticas y/o procedimientos, o modificaciones a los mismos, que puedan ser
            publicados por Tiendas Virtuales Latinoamérica SAC o comunicados por esta al Usuario mediante el contacto
            registrado al efecto, cada uno de los cuales se incorpora por referencia. Sin perjuicio de lo anterior,
            la adquisición del Producto a través de la Tienda Virtual de cada Usuario/Comercio Afiliado o cualquier
            uso del Servicio estará sujeto a los propios términos y condiciones del Usuario/Comercio Afiliado, que se
            incorporan a los presentes Términos y Condiciones por referencia. En ese sentido, en caso el Usuario y/o
            el Usuario Final no los acepte, deberá abstenerse de adquirir el Producto a través de la Tienda Virtual o
            de hacer uso del Servicio, según sea el caso.
          </p>

          <h3>Alcances</h3>
          <p>El presente documento contiene los Términos y Condiciones que regirán la contratación y ejecución del
            Servicio que brinda Tiendas Virtuales Latinoamérica SAC al Usuario, siendo obligatorios durante toda la
            relación entre el Usuario y Tiendas Virtuales Latinoamérica SAC y, por referencia, para los Usuarios
            Finales.</p>
          <p>Por su parte, todas las visitas, contratos y transacciones que se realicen en las tiendas virtuales de
            MiTienda estarán sujetos a sus reglas, a la legislación aplicable en el país del Territorio en que se
            realicen y, por referencia, a los Términos y Condiciones.</p>

          <h3>Características, Renovación, Suspensión y Cancelación del Servicio</h3>
          <p>Tiendas Virtuales Latinoamérica SAC brinda el Servicio por el cual el Usuario/Comercio Afiliado puede
            autogestionar su propia Tienda Virtual y ofrecer su Producto a través de ella, para lo cual cuenta con
            distintos planes de suscripción prepago (mensuales o anuales), según las necesidades del
            Usuario/Comercio Afiliado que se desee afiliar, que se encuentran detallados en la siguiente dirección:
            <NuxtLink to="/planes">{{ site }}/planes</NuxtLink>.</p>
          <p>Si el Usuario/Comercio Afiliado no está convencido de que el Servicio de MiTienda es el idóneo para su
            actividad comercial, le recomendamos acceder a la plataforma con la "Prueba Gratis" antes de suscribirse
            a cualquiera de nuestros planes: <NuxtLink to="/registro-v2">{{ site }}/registro-v2</NuxtLink>.</p>
          <p>Tiendas Virtuales Latinoamérica SAC ofrece al Usuario/Comercio Afiliado un período de prueba gratis de 14
            días, contados a partir del momento en que el Usuario registra y envía sus datos. Al finalizar el período
            de prueba, el Usuario/Comercio Afiliado podrá suscribirse a uno de los planes prepago (mensuales o
            anuales) y seleccionar la modalidad de pago (tarjeta de crédito, tarjeta de débito, depósito o
            transferencia bancaria), y la suscripción se mantendrá hasta que el Usuario la cancele de forma manual.
            En caso el Usuario/Comercio Afiliado opte por la tarjeta de crédito como medio de pago, la suscripción
            prepago se renovará de forma automática por cada nuevo período de Servicio, por lo que, en caso decida
            cancelar el Servicio, deberá hacerlo manualmente desde la sección "Suscripciones" de su panel o por
            correo electrónico a <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a>. Si al momento en que
            el Usuario/Comercio Afiliado cancela su suscripción aún queda tiempo de su período de Servicio
            prepagado, podrá utilizar su Tienda Virtual hasta finalizar dicho período. En ese sentido, después de
            efectuado el cargo en su tarjeta de crédito, no podrá reclamar la devolución o el extorno parcial o total
            del cargo, y su suscripción seguirá vigente hasta finalizar el período de suscripción prepagado.
            <strong>La cancelación de cualquiera de nuestros planes de suscripción no dará derecho a la devolución
              del monto prepagado.</strong>
          </p>
          <p>En caso el Usuario/Comercio Afiliado desee renovar su suscripción con MiTienda, podrá hacerlo de forma
            mensual o anual, y la renovación será automática al término del período vigente que haya elegido; para
            ello deberá contar con una tarjeta de crédito o débito afiliada a su cuenta.</p>
          <p>Al final de cada período se procederá a efectuar el cargo automático por la suscripción. En el supuesto
            de que el cargo a la tarjeta falle, se volverá a intentar dentro de las 24 horas, por un máximo de 3
            veces; si el tercer intento falla, se cancelará la suscripción del Comercio Afiliado y se le notificará
            para que realice el pago de manera manual, si así lo desea. La suscripción podrá renovarse las veces que
            se desee y, cada vez que se renueve, se activará nuevamente el cobro automático, salvo que el Usuario
            decida cancelarlo.</p>
          <p>El Usuario/Comercio Afiliado podrá cancelar su suscripción en cualquier momento, la cual permanecerá
            activa durante el período vigente prepagado. Para tal efecto, deberá hacerlo manualmente desde la
            sección "Suscripciones" de su panel o por correo electrónico a
            <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a>.</p>
          <p>Finalmente, sin perjuicio de las demás causales de suspensión del Servicio contenidas en los presentes
            Términos y Condiciones, Tiendas Virtuales Latinoamérica SAC se reserva el derecho a suspender el Servicio
            al Usuario/Comercio Afiliado, sin que ello implique el pago de indemnización alguna a su favor, en caso
            se verifique que (i) cualquier persona que haga uso del Servicio efectúe actos indebidos o contrarios a
            la ley, incluyendo, pero no limitado a, la proporción de datos falsos y/o inexactos; (ii) las personas
            que hagan uso del Servicio no tengan capacidad legal para contratar, o su capacidad legal para contratar
            haya sido suspendida; (iii) Tiendas Virtuales Latinoamérica SAC realice mejoras, reparaciones,
            mantenimiento o modificaciones al sistema de MiTienda; (iv) alguna acción u omisión del Usuario/Comercio
            Afiliado (sin limitar y a modo de ejemplo, el lanzamiento de alguna campaña promocional) genere un
            tráfico web o un consumo de recursos tal que afecte el normal funcionamiento de las tiendas virtuales de
            otros usuarios, toda vez que el Usuario/Comercio Afiliado declara conocer que el Servidor es compartido
            con otros usuarios; o (v) se incumplan estos Términos y Condiciones.</p>

          <h3>Planes, Funcionalidades y Límites de Uso</h3>
          <ol type="I">
            <li>Las funcionalidades, módulos, integraciones y Límites de Uso de cada Plan son determinados
              exclusivamente por Tiendas Virtuales Latinoamérica SAC. La página de planes describe las principales
              características de cada Plan de forma referencial y no constituye una lista exhaustiva de todas las
              funcionalidades disponibles ni de sus Límites de Uso.</li>
            <li>Además de los Límites de Uso publicados en la página de planes, cada funcionalidad o módulo puede
              tener Límites de Uso propios, establecidos para preservar la estabilidad y el rendimiento del Servidor
              compartido por todas las tiendas virtuales. A modo de ejemplo, y sin carácter limitativo: la cantidad de
              productos que puede incluir un catálogo en PDF, el tamaño de los archivos, la cantidad de registros que
              se pueden importar o exportar en una sola operación, o la frecuencia de las sincronizaciones con
              sistemas externos. Estos Límites de Uso se informan en el panel de administración, en el centro de
              ayuda (<a :href="country.helpUrl" target="_blank" rel="noopener">{{ country.helpUrl }}</a>) o al
              momento de utilizar la funcionalidad correspondiente.</li>
            <li>Las funcionalidades y módulos que no figuren expresamente en la descripción del Plan contratado se
              ofrecen como un beneficio adicional, sin costo adicional y en el estado en que se encuentren, por lo que
              Tiendas Virtuales Latinoamérica SAC podrá modificarlos, limitarlos, sustituirlos o discontinuarlos en
              cualquier momento.</li>
            <li>El Usuario/Comercio Afiliado reconoce que contrata el Servicio estándar de MiTienda, común a todos los
              usuarios de su Plan, y que la suscripción no le otorga derecho a exigir desarrollos a medida, la
              ampliación de Límites de Uso, ni la incorporación, modificación o conservación de funcionalidades
              específicas. Cualquier personalización o ampliación de Límites de Uso solo será exigible si consta en un
              acuerdo escrito suscrito por Tiendas Virtuales Latinoamérica SAC, en las condiciones económicas que en
              él se establezcan.</li>
            <li>Tiendas Virtuales Latinoamérica SAC podrá mejorar, modificar o reorganizar las funcionalidades de los
              Planes. Si una modificación reduce de forma sustancial una funcionalidad incluida expresamente en la
              descripción del Plan contratado, se comunicará al Usuario/Comercio Afiliado con al menos treinta (30)
              días calendario de anticipación, mediante el contacto registrado, y este podrá cancelar su suscripción
              conforme a lo indicado en la sección "Características, Renovación, Suspensión y Cancelación del
              Servicio".</li>
            <li>Si el uso que una Tienda Virtual hace del Servicio excede de manera sostenida el uso razonable para su
              Plan, Tiendas Virtuales Latinoamérica SAC podrá aplicar límites técnicos, proponer al Usuario/Comercio
              Afiliado el cambio a un Plan acorde con su consumo o, si el exceso afecta a otros usuarios, suspender el
              Servicio conforme a la sección "Características, Renovación, Suspensión y Cancelación del
              Servicio".</li>
            <li>Las integraciones con servicios de terceros (entre otros, pasarelas de pago, empresas de courier,
              proveedores de facturación electrónica, sistemas ERP, marketplaces y redes sociales) dependen de la
              disponibilidad y de las condiciones que fijen dichos terceros, que pueden cambiarlas o discontinuarlas
              por decisión propia. Tiendas Virtuales Latinoamérica SAC no garantiza la continuidad de tales
              integraciones ni responde por las fallas o cambios de los servicios de terceros. Cuando corresponda, el
              Usuario/Comercio Afiliado deberá contratar directamente con dichos terceros y aceptar sus propios
              términos y condiciones.</li>
            <li>Algunas funcionalidades de MiTienda utilizan inteligencia artificial para generar o sugerir contenido
              (por ejemplo, descripciones de productos, textos o respuestas de asistentes virtuales). Dicho contenido
              puede contener errores o imprecisiones; el Usuario/Comercio Afiliado es responsable de revisarlo antes
              de publicarlo, así como de todo el contenido que publique en su Tienda Virtual.</li>
          </ol>

          <h3>Capacidad</h3>
          <p>
            Los Servicios prestados por Tiendas Virtuales Latinoamérica SAC a favor del Usuario/Comercio Afiliado,
            así como la enajenación de Productos del Usuario/Comercio Afiliado al Usuario Final/Comprador, solo están
            disponibles para personas que tengan capacidad legal para contratar; es decir, (i) personas naturales
            mayores de 18 años de edad con capacidad legal para celebrar contratos; o (ii) personas jurídicas
            representadas e individualizadas por una persona natural con facultades de representación. En ese
            sentido, no podrán utilizar los Servicios ni adquirir Productos, según sea el caso, los menores de edad,
            las personas que no tengan capacidad legal para contratar, ni las personas que hayan sido suspendidas o
            dadas de baja del sistema, temporal o definitivamente, por haber incumplido los Términos y Condiciones o
            por haber incurrido, a criterio de Tiendas Virtuales Latinoamérica SAC, en conductas o actos dolosos o
            fraudulentos mediante el uso de MiTienda. Asimismo, Tiendas Virtuales Latinoamérica SAC se reserva el
            derecho a suspender la prestación de su Servicio a cualquier persona que efectúe actos indebidos o
            contrarios a la ley, incluyendo, pero no limitado a, la proporción de datos falsos y/o inexactos.
          </p>

          <h3>Registro</h3>
          <p>
            Es obligatorio completar el registro en todos sus campos con datos válidos para participar de MiTienda.
            El futuro Usuario/Comercio Afiliado deberá completarlo con su información personal de manera exacta y
            verdadera ("Datos Personales") y asume el compromiso de actualizar los Datos Personales conforme resulte
            necesario. Tiendas Virtuales Latinoamérica SAC podrá utilizar diversos medios para identificar a sus
            Usuarios, pero NO se responsabiliza por la certeza de los Datos Personales provistos por ellos. El
            Usuario/Comercio Afiliado garantiza y responde, en cualquier caso, por la veracidad, exactitud, vigencia
            y autenticidad de los Datos Personales ingresados. Tiendas Virtuales Latinoamérica SAC se reserva el
            derecho de suspender temporal o definitivamente a aquel Usuario cuyos datos no hayan podido ser
            confirmados o cuya falsedad o inexactitud se haya verificado.
          </p>

          <h3>Privacidad de la Información</h3>
          <p>Para utilizar los Servicios, el Usuario/Comercio Afiliado deberá facilitar determinados Datos
            Personales. El tratamiento de dichos datos por parte de Tiendas Virtuales Latinoamérica SAC se rige por
            nuestra <NuxtLink to="/politicas-de-privacidad">Política de Privacidad</NuxtLink>, que forma parte de
            estos Términos y Condiciones por referencia, y se realiza de conformidad con la Ley N° 29733, Ley de
            Protección de Datos Personales, su Reglamento aprobado por Decreto Supremo N° 016-2024-JUS y, cuando
            corresponda, la normativa de protección de datos personales del país del Territorio en que se preste el
            Servicio.</p>
          <p>Respecto de los datos personales de los Usuarios Finales/Compradores que el Usuario/Comercio Afiliado
            recopila a través de su Tienda Virtual, el Usuario/Comercio Afiliado es el titular del banco de datos y
            el responsable de su tratamiento, mientras que Tiendas Virtuales Latinoamérica SAC actúa como encargado
            del tratamiento y los trata únicamente por cuenta del Usuario/Comercio Afiliado y para prestar el
            Servicio. El Usuario/Comercio Afiliado es responsable de contar con una política de privacidad propia,
            obtener los consentimientos que correspondan y cumplir las demás obligaciones que la normativa aplicable
            le imponga.</p>

          <h3>Limitación de Responsabilidad</h3>
          <p>Queda establecido que Tiendas Virtuales Latinoamérica SAC no es responsable de examinar o calificar, ni
            en ningún caso garantiza, los Productos que ofrece el Usuario/Comercio Afiliado a través de su Tienda
            Virtual; tampoco es responsable del contenido publicado en la Tienda Virtual por el Usuario/Comercio
            Afiliado ni en sus respectivos sitios web. Tiendas Virtuales Latinoamérica SAC no asume responsabilidad
            alguna por las acciones, productos y contenidos del Usuario/Comercio Afiliado.</p>
          <p>Sugerimos al Usuario Final/Comprador que revise detenidamente los términos y condiciones de uso del
            Usuario/Comercio Afiliado que ofrece sus Productos a través de su Tienda Virtual. En ese sentido, el
            Usuario Final/Comprador exime a Tiendas Virtuales Latinoamérica SAC de cualquier tipo de reclamo,
            denuncia o acción legal respecto al Producto de cualquier Usuario/Comercio Afiliado que adquiera a través
            de la Tienda Virtual.</p>
          <p>De igual forma, queda establecido que Tiendas Virtuales Latinoamérica SAC no es ni el comprador ni el
            vendedor de los Productos ofrecidos por el Usuario/Comercio Afiliado a través de su Tienda Virtual. Por
            consiguiente, el contrato que se genera una vez realizada la compra de cualquier Producto vendido por el
            Usuario/Comercio Afiliado concierne única y exclusivamente al Usuario/Comercio Afiliado y al Usuario
            Final/Comprador. Toda vez que Tiendas Virtuales Latinoamérica SAC no forma parte de ese contrato, no
            asume ninguna responsabilidad relacionada con él, ni actúa como representante del Usuario/Comercio
            Afiliado. En ese sentido, el Usuario/Comercio Afiliado es el único responsable de la venta de sus
            Productos, así como de ofrecer asistencia respecto de las reclamaciones del Usuario Final/Comprador o de
            cualquier asunto relacionado con dicho contrato entre el comprador y el vendedor.</p>
          <p>El Usuario/Comercio Afiliado es directamente responsable de la información publicada en su Tienda
            Virtual respecto de sus Productos, incluyendo sin limitación el precio, la moneda, la forma de pago, las
            características del Producto, los términos y condiciones (que por referencia incluyen estos Términos y
            Condiciones) y la política de devoluciones, entre otros aspectos, así como del valor total, incluyendo
            los impuestos y otros gastos que puedan incidir en el precio final.</p>
          <p>Asimismo, Tiendas Virtuales Latinoamérica SAC no asume responsabilidad por dolo, culpa inexcusable o
            culpa leve, intereses, daños consecuenciales, daños indirectos, lucro cesante, daño ulterior, pérdida de
            producción o de ventas, pérdida de información, ni cualquiera en virtud de la teoría de los contratos, la
            culpa (incluida la negligencia), el delito, los hechos ilícitos, el incumplimiento de un deber legal u
            otros similares, en relación con el lucro cesante, el menoscabo de los ahorros o negocios previstos, la
            pérdida o el detrimento del valor llave o la reputación, el aumento de los costos de producción, o las
            pérdidas o los daños y perjuicios indirectos, ni bajo ningún concepto por causas ajenas al control de
            Tiendas Virtuales Latinoamérica SAC o por acciones u omisiones del Usuario/Comercio Afiliado o del Usuario
            Final/Comprador, sus dependientes o terceros, ni asume responsabilidad solidaria con ningún tercero,
            proveniente de o en relación con (i) el uso de MiTienda por parte del Usuario/Comercio Afiliado o de
            otros usuarios; (ii) el rendimiento o la navegación en MiTienda, en la Tienda Virtual o en enlaces a otros
            sitios web, según corresponda; (iii) la seguridad del Producto ofrecido por el Usuario/Comercio Afiliado;
            (iv) la información errónea, incorrecta o incompleta de los Productos; (v) los medios de pago para la
            adquisición del Producto; y (vi) cualquier otra situación anómala de carácter informático.</p>
          <p>En ningún caso la responsabilidad total, de manera individual y acumulada, de Tiendas Virtuales
            Latinoamérica SAC ante el Usuario/Comercio Afiliado excederá el monto pagado por este último.</p>

          <h3>Indemnidad</h3>
          <p>
            El Usuario/Comercio Afiliado exime a Tiendas Virtuales Latinoamérica SAC de cualquier tipo de reclamo o
            acción legal respecto a los Productos o a cualquier evento relacionado con concretar la operación de
            enajenación de los Productos. En ese sentido, el Usuario/Comercio Afiliado mantendrá indemne a Tiendas
            Virtuales Latinoamérica SAC, así como a sus directores, gerentes, empleados, agentes, operarios,
            representantes y apoderados, frente a cualquier pérdida, reclamo, acción, costo, daño, sanción, multa y
            gasto, incluyendo sin limitación honorarios profesionales, costos y costas, que surjan del uso no
            autorizado de MiTienda por parte del Usuario/Comercio Afiliado o del Usuario Final/Comprador, o de
            cualquier incumplimiento de los Términos y Condiciones, incluyendo sin limitación el incumplimiento de
            cualquier ley aplicable.
          </p>

          <h3>Medios de Pago que se Podrán Utilizar en la Tienda Virtual</h3>
          <p>Tiendas Virtuales Latinoamérica SAC facilita, pero no es responsable de, la contratación de pasarelas de
            pago virtuales. Cada Usuario/Comercio Afiliado gestionará sus medios de pago, que podrían ser el depósito
            o la transferencia bancaria, el pago contra entrega o la contratación de pasarelas de pago virtuales que
            le permitan a su negocio vender en línea y, por ende, aceptar tarjetas de crédito.</p>
          <p>Si el Usuario/Comercio Afiliado contrata una pasarela de pago, dicha empresa será la responsable de
            recaudar o percibir el valor del Producto ofrecido en la Tienda Virtual a través de sus propios sistemas,
            preparados para tal efecto, incluyendo las formas de pago que ofrezca, tales como tarjetas de crédito,
            débito y prepagadas (Visa, Mastercard, American Express y Diners Club), billeteras digitales o pagos en
            efectivo en agentes y bancas por internet. El uso de las tarjetas se sujetará a lo establecido en estos
            Términos y Condiciones y, en relación con su emisor, a lo pactado en los respectivos contratos y
            reglamentos de uso. Por lo tanto, tratándose de tarjetas bancarias aceptadas por los comercios afiliados,
            los aspectos relativos a estas, tales como la fecha de emisión, la caducidad, el cupo, los bloqueos,
            etc., se regirán por el respectivo contrato y reglamento de uso. En ese sentido, Tiendas Virtuales
            Latinoamérica SAC no tendrá responsabilidad alguna en cualquiera de los aspectos señalados, y tanto el
            Usuario/Comercio Afiliado como el Usuario Final/Comprador eximen a Tiendas Virtuales Latinoamérica SAC de
            cualquier tipo de reclamo, denuncia o acción legal respecto de los aspectos señalados en la presente
            sección.</p>

          <h3>Artículos Prohibidos</h3>
          <p>Solo se podrán comercializar a través de la Tienda Virtual Productos cuya venta no se encuentre tácita o
            expresamente prohibida en este acuerdo o por la ley vigente. Está expresamente prohibida la venta de
            armas de fuego, estupefacientes, propiedad robada, órganos o residuos humanos, animales salvajes o
            especies en vías de extinción, moneda o estampillas falsificadas, artículos de contrabando, artículos
            falsificados o adulterados, pólvora o material explosivo, medicamentos sujetos a prescripción médica,
            servicios relacionados con la prostitución o similares, material pornográfico, obsceno o contrario a la
            moral y las buenas costumbres, Productos que promuevan la violencia y/o la discriminación basada en
            cuestiones de raza, religión, sexo, nacionalidad, orientación sexual o de cualquier otro tipo, y, en
            general, cualquier Producto cuya venta esté prohibida por las leyes vigentes.</p>
          <p>Es responsabilidad exclusiva del Usuario/Comercio Afiliado velar por la legalidad de la venta de su
            Producto, por lo que Tiendas Virtuales Latinoamérica SAC no asume ninguna responsabilidad por la
            existencia en el sitio de artículos o servicios que no cumplan con esta restricción, ni por las
            transacciones sobre ellos. Asimismo, en caso de incumplimiento de esta obligación por parte del
            Usuario/Comercio Afiliado, el Usuario Final/Comprador exime a Tiendas Virtuales Latinoamérica SAC, así
            como a sus directores, gerentes, empleados, agentes, operarios, representantes y apoderados, de
            cualquier tipo de reclamo o acción legal al respecto, por lo que el Usuario Final/Comprador no efectuará
            ningún tipo de reclamo o denuncia a Tiendas Virtuales Latinoamérica SAC, debiendo dirigirlo al
            Usuario/Comercio Afiliado con el que contrató la adquisición del Producto.</p>

          <h3>Otros Sitios Web</h3>
          <p>La Tienda Virtual puede contener enlaces a otros sitios web, lo cual no indica que sean de propiedad de
            Tiendas Virtuales Latinoamérica SAC ni que sean operados por ella. La presencia de enlaces a otros sitios
            web no implica una sociedad, relación, aprobación o respaldo de Tiendas Virtuales Latinoamérica SAC a
            dichos sitios y sus contenidos.</p>
          <p>Tiendas Virtuales Latinoamérica SAC no asumirá ni tendrá responsabilidad sobre la información
            proporcionada por otros sitios web ni sobre las consecuencias que de ello se deriven; tampoco garantiza,
            avala ni respalda de ninguna forma el acceso, la información o el contenido de cualquier otro sitio web o
            portal en los casos en que dicho acceso se efectúe desde o hacia este, ya sea mediante un enlace, un
            banner o cualquier otro dispositivo disponible en la red. En virtud de que el sitio web no tiene control
            sobre tales sitios, no será responsable por los contenidos, materiales, acciones y/o servicios prestados
            por ellos, ni por los daños o pérdidas ocasionados por su utilización, sean causados directa o
            indirectamente.</p>
          <p>En ese sentido, el Usuario Final/Comprador exime a Tiendas Virtuales Latinoamérica SAC, así como a sus
            directores, gerentes, empleados, agentes, operarios, representantes y apoderados, de cualquier tipo de
            reclamo o acción legal al respecto, por lo que el Usuario Final/Comprador no efectuará ningún tipo de
            reclamo o denuncia a Tiendas Virtuales Latinoamérica SAC, debiendo dirigirlo al Usuario/Comercio
            Afiliado con el que contrató la adquisición del Producto.</p>

          <h3>Modificación de los Términos y Condiciones</h3>
          <p>Tiendas Virtuales Latinoamérica SAC podrá, a su sola discreción, modificar los Términos y Condiciones.
            Las modificaciones se publicarán en esta página, indicando la versión y la fecha de la última
            actualización, y se comunicarán al Usuario mediante el contacto registrado al efecto. Las modificaciones
            regirán para las transacciones que se celebren con posterioridad a su entrada en vigencia, sin alterar
            las transacciones celebradas con anterioridad. Todos los términos modificados entrarán en vigencia a los
            2 (dos) días de su publicación.</p>
          <p>Dentro de los 5 (cinco) días siguientes a la publicación de las modificaciones introducidas, el
            Usuario/Comercio Afiliado deberá comunicar por correo electrónico a
            <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a> si no las acepta. En tal caso, quedará
            disuelto el vínculo contractual y será inhabilitado como Usuario/Comercio Afiliado, cancelándose su
            suscripción. Vencido este plazo, se considerará que el Usuario acepta los nuevos términos y el contrato
            continuará vinculando a ambas partes.</p>

          <h3>Fallas en el Sistema</h3>
          <p>El estado actual de la tecnología no permite desarrollar ni utilizar programas informáticos (software)
            ni dispositivos de tratamiento de datos (hardware) absolutamente libres de fallas y/o errores, como
            tampoco evitar todas las circunstancias imponderables relacionadas con Internet como medio de
            comunicación. En ese sentido, Tiendas Virtuales Latinoamérica SAC no se responsabiliza por la no
            concreción de la venta de algún Producto debido a tales fallas.</p>
          <p>Tiendas Virtuales Latinoamérica SAC no se responsabiliza por cualquier daño, perjuicio o pérdida en el
            equipo del Usuario causado por fallas en el sistema, en el Servidor o en Internet. Tampoco será
            responsable por cualquier virus que pudiera infectar el equipo del Usuario como consecuencia del acceso,
            uso o examen de su sitio web, o a raíz de cualquier transferencia de datos, archivos, imágenes, textos o
            audio contenidos en él.</p>
          <p>Toda vez que el Usuario/Comercio Afiliado declara conocer que el Servidor es compartido con otros
            usuarios, reconoce y acepta que su Tienda Virtual no deberá generar un tráfico web o un consumo de
            recursos tal que afecte el normal funcionamiento de las tiendas virtuales de otros usuarios. De
            verificarse este evento por alguna acción u omisión del Usuario/Comercio Afiliado (sin limitar y a modo
            de ejemplo, el lanzamiento de alguna campaña promocional), Tiendas Virtuales Latinoamérica SAC se reserva
            el derecho de suspender el Servicio, o de cancelarlo en forma permanente en caso el Usuario/Comercio
            Afiliado reincida en tal evento, sin que ello implique el pago de indemnización alguna a favor del
            Usuario/Comercio Afiliado, de acuerdo con lo indicado en la sección "Características, Renovación,
            Suspensión y Cancelación del Servicio".</p>
          <p>El Usuario/Comercio Afiliado no podrá imputar responsabilidad alguna a Tiendas Virtuales Latinoamérica
            SAC ni exigir el pago por lucro cesante, daños directos o indirectos, pérdida de producción o de ventas,
            ni por cualquier otro concepto contenido en la sección "Limitación de Responsabilidad", en virtud de
            perjuicios resultantes de dificultades técnicas o fallas en los sistemas o en Internet, o de cualquier
            otra circunstancia ajena a Tiendas Virtuales Latinoamérica SAC.</p>
          <p>Tiendas Virtuales Latinoamérica SAC no garantiza el acceso y uso continuado o ininterrumpido de MiTienda.
            El sistema puede eventualmente no estar disponible debido a dificultades técnicas o fallas de Internet, o
            por cualquier otra circunstancia ajena a Tiendas Virtuales Latinoamérica SAC; en tales casos se
            adoptarán los mejores esfuerzos para asegurar la disponibilidad, sin interrupciones, del Servicio, así
            como la ausencia de errores en cualquier transmisión de información que pudiera tener lugar. Asimismo,
            si el acceso a los Servicios pudiera ocasionalmente verse suspendido o restringido a efectos de la
            realización de trabajos de reparación o mantenimiento, o de la introducción de nuevos productos o
            servicios, se procurará limitar la frecuencia y duración de tales suspensiones o restricciones y
            restablecerlo con la mayor rapidez posible, sin que por ello pueda imputársele algún tipo de
            responsabilidad.</p>
          <p>Tiendas Virtuales Latinoamérica SAC no asegura ni garantiza el acceso, ni la prestación continua e
            ininterrumpida de su Servicio, a los Usuarios/Comercios Afiliados cuyos equipos no cumplan los Requisitos
            Técnicos.</p>
          <p>Tiendas Virtuales Latinoamérica SAC no será responsable de pérdida alguna que no sea directamente
            atribuible a un incumplimiento de su parte, como las pérdidas empresariales (incluyendo lucro cesante,
            pérdida de ingresos, de contratos o de datos, y gastos innecesarios incurridos), ni de las pérdidas
            indirectas o de carácter consecuencial que no fueran razonablemente previsibles por ambas partes en el
            momento en que el Usuario hubiera comenzado a utilizar el Servicio, ni por cualquier otro concepto
            contenido en la sección "Limitación de Responsabilidad". Tampoco lo será cuando las fallas técnicas sean
            ajenas a su control objetivo y deriven de deficiencias en el servicio de Internet, o ante hechos que
            califiquen como caso fortuito o fuerza mayor. Sin perjuicio de lo anterior, y aunque Tiendas Virtuales
            Latinoamérica SAC toma todas las medidas a su alcance para proveer un servicio continuo y eficiente, no
            garantiza: (i) la ausencia de virus y/o demás componentes dañinos en el sitio o en el Servidor que lo
            suministra; (ii) la invulnerabilidad del sitio y/o la inexpugnabilidad de las medidas de seguridad que se
            adopten en él; (iii) los efectos secundarios de una vulneración de los sistemas de seguridad del sitio,
            tales como el robo de claves secretas, el envío de spam o el hackeo de cuentas del Usuario/Comercio
            Afiliado o del Usuario Final/Comprador; ni (iv) cualquier otra situación anómala de carácter
            informático.</p>

          <h3>Propiedad Intelectual</h3>
          <p>Todos los contenidos establecidos en el sitio web o plataforma virtual MiTienda, así como los programas,
            aplicaciones, software, bases de datos, redes y archivos, entre otras configuraciones creadas o que se
            habiliten en el futuro para permitir al Usuario/Comercio Afiliado el acceso y uso de su cuenta y, en
            consecuencia, de su Tienda Virtual, son de creación y titularidad exclusiva de Tiendas Virtuales
            Latinoamérica SAC y, por lo tanto, están protegidos por las normas nacionales e internacionales relativas
            a la propiedad intelectual de dichos elementos.</p>
          <p>El Usuario/Comercio Afiliado se encuentra autorizado a utilizar el sitio web o plataforma MiTienda, así
            como a descargar el material exhibido en ella, pero únicamente para uso personal. Se encuentra
            expresamente prohibida la reproducción, copia, publicación, descarga, codificación, modificación,
            traducción, interpretación, exhibición, distribución, transmisión, divulgación o comunicación pública,
            el uso indebido y/o la comercialización sin contar con la autorización previa, expresa y por escrito de
            Tiendas Virtuales Latinoamérica SAC. En ese sentido, también quedan prohibidos el uso indebido, así como
            la reproducción y/o comercialización total o parcial no autorizada, de cualquiera de los contenidos
            descritos en el párrafo anterior. El incumplimiento de esta obligación por parte del Usuario/Comercio
            Afiliado o del Usuario Final/Comprador habilita a Tiendas Virtuales Latinoamérica SAC a iniciar las
            acciones legales que correspondan de acuerdo a ley.</p>
          <p>Se recalca que los derechos de autor y demás derechos de propiedad intelectual, con independencia de su
            descarga por parte del Usuario/Comercio Afiliado o del Usuario Final/Comprador, son de titularidad de
            Tiendas Virtuales Latinoamérica SAC, haciendo expresa reserva del ejercicio de todas las acciones legales
            destinadas al resguardo de sus legítimos derechos de propiedad intelectual e industrial.</p>
          <p>Los contenidos que el Usuario/Comercio Afiliado cargue en su Tienda Virtual (imágenes, textos, marcas,
            logotipos y demás) son de su titularidad o cuenta con autorización para usarlos, y es responsable de
            ello. El Usuario/Comercio Afiliado otorga a Tiendas Virtuales Latinoamérica SAC una autorización no
            exclusiva y gratuita para alojar, reproducir, adaptar técnicamente (por ejemplo, redimensionar imágenes)
            y mostrar dichos contenidos, únicamente en la medida necesaria para prestar el Servicio.</p>

          <h3>Ley Aplicable</h3>
          <p>Estos Términos y Condiciones se rigen en todos sus puntos por las leyes vigentes en la República del
            Perú, con independencia del país del Territorio desde el que se contrate el Servicio. Lo anterior no
            limita los derechos que las normas imperativas de protección al consumidor del país del Usuario
            Final/Comprador le reconozcan frente al Usuario/Comercio Afiliado.</p>

          <h3>Libro de Reclamaciones</h3>
          <p>Conforme a lo establecido en el artículo 150 y siguientes de la Ley N° 29571, Código de Protección y
            Defensa del Consumidor, y en el Reglamento del Libro de Reclamaciones aprobado por Decreto Supremo
            N° 011-2011-PCM y sus modificatorias, el sitio web de MiTienda en Perú, así como las tiendas virtuales que
            habilite en Perú cada comercio que se suscriba a la plataforma, contarán con un Libro de Reclamaciones
            propio de naturaleza virtual, válido solo para Perú, el cual deberá contar con un aviso exhibido en un
            lugar visible y fácilmente accesible de la página correspondiente a cada titular. Cada Usuario/Comercio
            Afiliado es responsable de la colocación del aviso del Libro de Reclamaciones virtual en su Tienda
            Virtual, y MiTienda no será responsable del incumplimiento de dicha obligación por parte del
            Usuario/Comercio Afiliado, quien se da por notificado de esta obligación con la aceptación de los
            Términos y Condiciones.</p>
          <p>El Libro de Reclamaciones de cada titular deberá ser de fácil acceso para el consumidor, a fin de que,
            cuando lo solicite a través de la plataforma o de la Tienda Virtual, pueda consignar su reclamo y/o queja
            en el formulario correspondiente. Asimismo, al concluir el proceso de ingreso del reclamo o queja, se
            debe permitir la impresión de la Hoja de Reclamación y su envío automático al correo electrónico indicado
            por el consumidor, dejándose constancia de la fecha y hora de presentación del reclamo o queja.</p>
          <p>Tanto MiTienda como los comercios usuarios de la plataforma tienen un plazo no mayor de quince (15) días
            hábiles improrrogables para responder los reclamos y/o quejas que se consignen en sus respectivos Libros
            de Reclamaciones, no siendo responsabilidad de MiTienda el incumplimiento de esta obligación por parte de
            los titulares de las tiendas virtuales suscritas a la plataforma.</p>
          <p>En los demás países del Territorio, cada Usuario/Comercio Afiliado es responsable de implementar los
            mecanismos de atención de reclamos que exija la normativa de protección al consumidor aplicable.</p>

          <h3>Domicilio y Notificaciones</h3>
          <p>
            Se fija como domicilio fiscal y legal de Tiendas Virtuales Latinoamérica SAC el ubicado en Av. Arequipa N° 4130, of. 02, distrito de Miraflores, Lima 18, Perú, y como contacto el siguiente:
            <a href="mailto:soporte@mitienda.pe">soporte@mitienda.pe</a>. El centro de ayuda se encuentra disponible
            en <a :href="country.helpUrl" target="_blank" rel="noopener">{{ country.helpUrl }}</a>.
          </p>
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

.texto_terminos p strong {
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
