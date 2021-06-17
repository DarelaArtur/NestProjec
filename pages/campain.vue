<template>
  <v-layout row>
    <v-flex>
      <br />

      <v-container collum>
        <v-card class="mx-auto" max-width="500">
          <v-img src="/fazerbem.jpg" height="300px"></v-img>

          <v-card-title>
            Fazer o Bem!
          </v-card-title>

          <v-card-subtitle>
            O projeto é uma iniciativa dos servidores da Câmara de Vereadores.
            Eles estão arrecadando alimentos, roupas, materiais de higiene e
            limpeza para doar para pessoas necessitadas do município.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="show = !show">
              Mais sobre
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                As doações serão destinadas à Cruz Vermelha, que fará a
                distribuição dos mantimentos às famílias necessitadas. “Nós
                agradecemos a iniciativa da Câmara, em um momento que é oportuno
                e urgente. Precisamos desse tipo de ação para que as pessoas
                possam fazer suas doações e assim nós fizemos a ponte daqueles
                que podem doar e dos que precisam receber”, reforça o presidente
                da Cruz Vermelha
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>

        <v-col cols="20"> <v-divider></v-divider> </v-col
        ><v-card class="mx-auto" max-width="500">
          <v-img src="/campanhaagasalho.jpg" height="300px"></v-img>

          <v-card-title>
            Campanha do Agasalho
          </v-card-title>

          <v-card-subtitle>
            O inverno está chegando e grande parte das pessoas que vivem em
            situação de vulnerabilidade poderão enfrentar dificuldades devido a
            onda de frio que atinge grande parte do país
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="show1 = !show1">
              Mais sobre
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show1">
              <v-divider></v-divider>

              <v-card-text>
                Hoje o programa Pátria Voluntária inicia a campanha do agasalho
                com o objetivo de contemplar, por meio de instituições da
                sociedade civil cadastradas na Plataforma do Programa, as
                pessoas que se encontram em situação de vulnerabilidade e são
                impactadas pelo frio que se aproxima.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <v-col cols="20"> <v-divider></v-divider> </v-col>
        <v-card class="mx-auto" max-width="500">
          <v-img src="/fazerbemsol.jpg" height="300px"></v-img>

          <v-card-title>
            Um por todos
          </v-card-title>

          <v-card-subtitle>
            A Fundação Municipal de Desenvolvimento Social (FMDS) lançou uma
            campanha de doação para auxiliar as famílias carentes que enfrentam
            dificuldades para a aquisição ou obtenção de produtos básicos nesse
            período de quarentena para prevenção e combate à Covid-19.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="show2 = !show2">
              Mais sobre
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show2">
              <v-divider></v-divider>

              <v-card-text>
                A proposta da campanha é doar principalmente alimentos e
                produtos de higiene pessoal e de limpeza, fundamentais para
                atender as orientações dos órgãos de Saúde e do Poder Público.
                Todos os procedimentos de arrecadação e distribuição dos
                donativos serão realizados de acordo com os protocolos de
                prevenção e de controle da disseminação do novo coronavírus
                estabelecidos pelas autoridades de Saúde.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    show: false,
    show1: false,
    show2: false
  })
}
</script>
