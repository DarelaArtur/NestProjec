<template>
  <v-layout column justify-right align-right>
    <v-flex>
      <br />
      <v-container fluid>
        <v-row dense> </v-row>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="select"
                @change="setLocations()"
                :items="items"
                label="Escolha a cidade"
                outlined
                dense
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>

        <GMap
          :key="this.locations"
          ref="gMap"
          language="pt"
          :center="{ lat: locations[0].lat, lng: locations[0].lng }"
          :options="{ fullscreenControl: true, styles: mapStyle }"
          :zoom="13"
        >
          <GMapMarker
            v-for="(location, index) in locations"
            :key="index"
            :position="{ lat: location.lat, lng: location.lng }"
            :options="{
              icon:
                location === currentLocation ? pins.selected : pins.notSelected
            }"
            @click="currentLocation = location"
          >
            <GMapInfoWindow :options="{ maxWidth: 200 }">
              <code> {{ location.descricao }}, </code>
            </GMapInfoWindow>
          </GMapMarker>
          <GMapCircle :options="circleOptions" />
        </GMap>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapGetters } from 'vuex'

import moment from 'moment'

export default {
  components: {
    Logo
  },

  data: () => ({
    currentLocation: {},
    show: false,
    circleOptions: {},
    select: '',
    items: [
      'Tubarao',
      'Capivari de Baixo',
      'Laguna',
      'Braço do Norte',
      'Jaguaruna'
    ],
    locations: [{}],
    locationsTubarao: [
      {
        descricao:
          'Endereço: R. José João Mateus, 82 - São João Margem Esquerda, Tubarão',
        lat: -28.479482704486347,
        lng: -49.035851781920826
      },
      {
        descricao:
          'Endereço: Av. Patrício Lima, 2200 - Humaitá de Cima, Tubarão',
        lat: -28.46321642264528,
        lng: 49.02111985770747
      },
      {
        descricao: 'Endereço: R. Antônio Hulse, 411 - Dehon, Tubarão',
        lat: -28.47949891133252,
        lng: -49.01482126140722
      },
      {
        descricao:
          'Endereço: Av. Expedicionário José Pedro Coelho, 2023 - Revoredo, Tubarão',
        lat: -28.473425420362606,
        lng: -49.000529230721405
      },
      {
        descricao: 'R. Salomão Lopes, 252 - Passagem, Tubarão',
        lat: -28.469497674237804,
        lng: -48.9816493037357
      },
      {
        descricao: ' R. Lauro Müller, 2765 - Centro, Tubarão',
        lat: -28.46735230333876,
        lng: -48.98495937250785
      },
      {
        descricao: 'R. Dalmari Luciano Luiz, 128 - Passagem, Tubarão',
        lat: -28.47151132049478,
        lng: -48.98004840188565
      },
      {
        descricao: 'R. Dalmari Luciano Luiz, 128 - Passagem, Tubarão',
        lat: -28.47151132049478,
        lng: -48.98004840188565
      },
      {
        descricao: 'R. Wenceslau Bráz, 82 - Vila Moema, Tubarão',
        lat: -28.47754027681421,
        lng: -48.99651367304995
      },
      {
        descricao: 'R. Rio Branco, 67 - Aeroporto, Tubarão',
        lat: -28.475896254257144,
        lng: -48.99902451722866
      },
      {
        descricao: 'R. Conselheiro Mafra, 142 - Centro, Tubarão',
        lat: -28.483582709754863,
        lng: -49.00403944421407
      },
      {
        descricao: 'R. Sen. Richard, 110 - Centro, Tubarão',
        lat: -28.48389722966184,
        lng: -49.00612661167827
      },
      {
        descricao: 'R. Santos Dumont, S/n - Centro, Tubarão',
        lat: -28.48577461347323,
        lng: -49.01229950188539
      }
    ],
    locationsCapivari: [
      {
        descricao:
          'Endereço: Av. Ernâni Cotrim, 187 - Centro, Capivari de Baixo - SC, 88745-000 | Prefeitura de Capivari de Baixo',
        lat: -28.450421285216024,
        lng: -48.966004815378966
      },
      {
        descricao:
          'Endereço: R. João Rodrigues Martins, 604 - Centro, Capivari de Baixo - SC, 88745-000 | Supermercados Manentti',
        lat: -28.450702424999,
        lng: -48.9583820902435
      },
      {
        descricao:
          'Endereço: R. José Anastácio Teixeira, 70 - Alvorada, Capivari de Baixo - SC, 88745-000 | Líder Atacadista Capivari de Baixo',
        lat: -28.438760277600192,
        lng: -48.96067968839367
      }
    ],
    locationsJaguaruna: [
      {
        descricao:
          'Endereço: R. Nereu Ramos, 99, Jaguaruna - SC, 88715-000 | Secretaria de assistência social',
        lat: -28.617145118672244,
        lng: -49.02426653071845
      },
      {
        descricao:
          'Endereço: R. Cel. Ernesto Lacombe, 651-763, Jaguaruna - SC, 88715-000 | Cras jaguaruna ',
        lat: -28.61895085972969,
        lng: -49.03231258653968
      }
    ],
    locationsBracoDoNorte: [
      {
        descricao:
          'Endereço: Av. Felipe Schmidt, 3041 - Trevo, Braço do Norte - SC, 88750-000 | ACIVALE - Associação Empresarial do Vale do Braço do Norte',
        lat: -28.282777354323013,
        lng: -49.15889273072546
      },
      {
        descricao:
          'Endereço: R. Sen. Nereu Ramos, 1761 - São Basílio, Braço do Norte - SC, 88750-000 | Câmara Municipal Braço Norte ',
        lat: -28.27897322208369,
        lng: -49.16486673072572
      },
      {
        descricao:
          'Endereço: 136, R. Osvaldo Westfal, 2 - Centro, Braço do Norte - SC, 88750-000 | Secretaria Municipal de Agricultura De Braço do Norte ',
        lat: -28.27771047094116,
        lng: -49.16351211723288
      },
      {
        descricao:
          'Endereço: RUA NOSSA SENHORA DE GUADALUPE - Santa Augusta, Braço do Norte - SC, 88750-000 | ASACAD ',
        lat: -28.269770702496725,
        lng: -49.15680044421869
      },
      {
        descricao:
          'Endereço: R. Paulo André Gesser, 349 - Inss, Braço do Norte - SC, 88750-000 | Sindicato Rural de Braço do Norte ',
        lat: -28.268149299046357,
        lng: -49.17365330189
      }
    ],
    locationsLaguna: [
      {
        descricao: ' R. Oscar Guimarães Pinto, 351 - Magalhães, Laguna',
        lat: -28.49208818293765,
        lng: -48.77761105955669
      },
      {
        descricao:
          'Av. Colombo Machado Sálless, 48 - Vila Ponta das Pedras, Laguna',
        lat: -28.490004802410954,
        lng: -48.78554760188546
      },
      {
        descricao: 'Avendia João Pinho, 785 - Navegantes, Laguna',
        lat: -28.48823516625593,
        lng: -48.77083827119969
      },
      {
        descricao: ' R. Voluntário Carpes, 20 - Centro, Laguna',
        lat: -28.485705213355587,
        lng: -48.77983015955699
      },
      {
        descricao: ' R. Ten. Bessa, 211 - Centro, Laguna',
        lat: -28.482465186926593,
        lng: -48.781263415378206
      },
      {
        descricao: 'Av. Colombo Machado Sálless, 145 - Centro, Laguna',
        lat: -28.47954271639342,
        lng: -48.78456588654265
      },
      {
        descricao: ' Av. Calistrato Müller Salles, 1868 - Portinho, Laguna',
        lat: -28.4614175352298,
        lng: -48.786919853188955
      }
    ],

    pins: {
      selected:
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
      notSelected:
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png'
    },
    mapStyle: [],
    clusterStyle: [
      {
        // url:
        //   'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
        // width: 56,
        // height: 56,
        // textColor: '#fff'
      }
    ]
  }),

  computed: {
    ...mapGetters({
      currentMonth: 'dashboard/getCurrentMonth'
    }),
    successMessage() {
      return this.$t('expense_success_message')
    }
  },
  mounted() {},

  beforeMount() {},
  methods: {
    setLocations() {
      if (this.select == 'Tubarao') {
        this.locations = this.locationsTubarao
      } else if (this.select == 'Capivari de Baixo') {
        this.locations = this.locationsCapivari
      } else if (this.select == 'Laguna') {
        this.locations = this.locationsLaguna
      } else if (this.select == 'Braço do Norte') {
        this.locations = this.locationsBracoDoNorte
      } else if (this.select == 'Jaguaruna') {
        this.locations = this.locationsJaguaruna
      }
    },
    onChange(value) {
      console.log('sdasdasdas', value)
    }
  }
}
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
