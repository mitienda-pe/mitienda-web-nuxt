<script setup lang="ts">
useSeoMeta({
  title: 'Políticas de Privacidad - miTienda',
  description: 'Políticas de privacidad de miTienda',
})
</script>

<template>
  <div class="politicas-privacidad">
    <div class="container texto_terminos py-5">
      <div class="row">
        <div class="col-md-12">
          <h2>Política de Privacidad / miTienda</h2>
          <p>Su privacidad es importante para nosotros. Es política de MiTienda respetar su privacidad con respecto a cualquier información que podamos recopilar de usted en nuestro sitio web, https://mitienda.pe, y otros sitios que poseemos y operamos.</p>

          <p>Para utilizar los servicios ofrecidos por MiTienda los Usuarios deberán facilitar determinados datos de carácter personal. Los Usuarios han proporcionado de manera libre y voluntaria sus Datos Personales al momento del Registro. Su información personal se procesa y almacena en servidores o medios magnéticos que mantienen altos estándares de seguridad y protección tanto física como tecnológica de conformidad con lo establecido en la Ley Nº 29733.</p>

          <p>Los Datos Personales proporcionados serán utilizados por MiTienda para los fines dispuestos en nuestros <NuxtLink to="/terminos-y-condiciones">Términos y Condiciones</NuxtLink>:</p>

          <ol type="I">
            <li>Para mejorar y promocionar los servicios prestados por MiTienda y/o sus empresas vinculadas.</li>
            <li>Para proporcionar información relevante sobre el sitio web y/o la plataforma Tienda Virtual miTienda.</li>
            <li>Para promocionar ofertas, descuentos o información especial a solicitud de algún comercio afiliado, siempre y cuando dicha información beneficie al titular a criterio de MiTienda. Para ello, los usuarios autorizan a MiTienda a valerse de todos los medios y/o canales contenidos en la información proporcionada, sea personal o de sus representantes legales, para promocionar dicha información, incluyendo direcciones domiciliarios, correos electrónicos o teléfonos.</li>
            <li>MiTienda no divulgará ni proporcionará los datos personales de los usuarios a los comercios afiliados. Los datos de carácter personal tampoco serán transferidos, comercializados y/o negociados económicamente con terceros.</li>
            <li>Los usuarios tienen derecho a oponerse a la utilización de sus Datos Personales para cualquier uso distinto al de mejorar y promocionar los servicios prestados en el sitio web y/o en la plataforma Tienda Virtual.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.texto_terminos {
  padding-top: 100px;
}

.texto_terminos h2 {
  color: var(--primary-color);
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.texto_terminos p {
  text-align: justify;
  line-height: 1.8;
}

.texto_terminos ol {
  margin-bottom: 1.5rem;
}

.texto_terminos li {
  margin-bottom: 0.75rem;
  text-align: justify;
  line-height: 1.8;
}
</style>
