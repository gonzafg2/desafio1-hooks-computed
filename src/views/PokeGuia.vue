<template>
  <div class="container mt-md-5 mt-3 pokeguia">
    <div v-show="alert" class="alert alert-danger alerta" role="alert">
      El pokemon buscado no existe. Por favor escribe nuevamente.
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-12 my-md-5 mb-3 d-flex justify-content-center">
        <img
          src="./../assets/logopoke.png"
          alt="Logo2"
          class="d-none d-md-block"
        />
        <h2 class="d-block d-md-none">PokeGuía</h2>
      </div>
      <div class="col-md-5 col-12 d-flex justify-content-center">
        <div class="input-group my-md-3">
          <div class="input-group-prepend">
            <span class="input-group-text py-0"
              ><img src="./../assets/logopoke.png" height="30px" alt="Logopoke"
            /></span>
          </div>
          <input
            v-model="pokeName"
            type="text"
            placeholder="Busca un pokemon.."
            class="form-control"
            @keyup.enter="getPoke"
            @keyup.esc="cleanPoke"
          />
          <small class="form-text text-muted"
            >Presiona Enter para buscar y Esc para limpiar y volver a
            Pikachu.</small
          >
          <button
            @click="getPoke"
            class="mt-2 col-5 btn btn-success btn-block d-md-none"
          >
            Buscar
          </button>
          <div class="col"></div>
          <button
            @click="cleanPoke"
            class="mt-2 col-5 mt-0 btn btn-warning btn-block d-md-none"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-12 d-flex justify-content-center">
        <h4>{{ getName }}</h4>
      </div>
      <div class="col-12 d-flex justify-content-center mb-3">
        <img width="20%" :src="getImg" alt="Pikachu" />
      </div>
      <!-- <div class="col-12 d-flex justify-content-center mb-5">
        <button @click="destruir" class="btn btn-danger" >Destroy Parent</button>

      </div> -->
      <div
        class="col-6 d-flex flex-column justify-content-start align-items-center justify-content-center"
      >
        <h3>Movimientos</h3>
        <ol>
          <li v-for="item in getMoves" :key="item.id">
            {{ item.move.name.toUpperCase() }}
          </li>
        </ol>
      </div>
      <div
        class="col-6 d-flex flex-column justify-content-start align-items-center my-md-3"
      >
        <h3>Habilidades</h3>
        <ol>
          <li v-for="item in getAbilities" :key="item.id">
            {{ item.ability.name.toUpperCase() }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokeGuia",
  data() {
    return {
      pokeName: "pikachu",
      pokeNameAPI: "",
      pokeImg: "",
      pokeMoves: [],
      pokeAbilities: [],
      alert: false
    };
  },
  created() {
    this.getPoke();
  },
  computed: {
    getName() {
      return this.pokeNameAPI.toUpperCase();
    },
    getImg() {
      return this.pokeImg;
    },
    getMoves() {
      return this.pokeMoves.slice(0, 10);
    },
    getAbilities() {
      return this.pokeAbilities.slice(0, 10);
    }
  },
  methods: {
    // destruir(){
    //   // this.$parent.$destroy();
    //   // this.$root.$destroy();
    //   this.$destroy();
    // },
    async getPoke() {
      try {
        this.alert = false;
        let pokeNameInput = this.pokeName.trim().toLowerCase();
        await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNameInput)
          .then(res => res.json())
          .then(data => {
            this.pokeNameAPI = data.name;
            this.pokeImg = data.sprites.front_default;
            this.pokeMoves = data.moves;
            this.pokeAbilities = data.abilities;
          });
      } catch (error) {
        console.log(error);
        this.pokeName = "pikachu";
        this.getPoke();
        this.alert = true;
      }
    },
    cleanPoke() {
      this.alert = false;
      this.pokeName = "pikachu";
      this.getPoke();
    }
  }
};
</script>

<style lang="scss" scoped>
.pokeguia {
  position: relative;
}
.alert {
  position: absolute;
  top: -48px;
  left: 0;
  width: 100%;
  animation: appear 500ms linear;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
