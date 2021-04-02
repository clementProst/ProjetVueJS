<template>
  <div>
    <table border="0">
      <tr>
        <td><h1>Parts</h1></td>
      </tr>
      <tr>
        <td>
          <CheckedList :fields="['code']" :entries="$store.state.parts" @chosen-changed="chosenParts = $event" />
        </td>
      </tr>
    </table>
    <button :disabled="chosenParts.length==0" @click="mix()">Mixing</button>

    <hr/>
    <button @click="$router.push({path:'/labo/slice'})">Go to slicer</button>

    <hr/>
    <p v-if="newVirus != null">New virus: <input v-model="newVirus.name"> {{newVirus.code}} {{newVirus.mortalite}}
    <button @click="sendToLibrary">Send to library</button>
    </p>

  </div>
</template>

<script>
  import {Virus, viruses} from '../model.js'
  import CheckedList from '../components/CheckedList.vue'
  import {mapMutations, mapState} from "vuex";

  export default {
    name: 'Mixer',
    data : () => {
      return {
        chosenParts:[],
        newVirus : null
      }
    },
    components: {
      CheckedList
    },

    computed: {
      ...mapState(["viruses", "parts","samples"]),
      ...mapMutations(["store_viruses"])
    },
    methods: {
      mix : function() {
        let newCode="";

        let chosen = [...this.chosenParts]; // real copy so that we can splice on the copy
        let nb = chosen.length;
        for(let i=0;i<nb;i++) {
          // choose randomly a part among the selected ones
          let idx = Math.floor(Math.random() * chosen.length);
          let p = this.$store.state.parts[chosen[idx]];
          newCode = newCode+p.code;
          chosen.splice(idx,1);
        }
        this.newVirus = new Virus(this.$store.state.viruses.length,'mixedvirus',newCode);
        // remove chosen parts
        for(let i=this.chosenParts.length-1;i>=0;i--) {
          this.$store.state.parts.splice(this.chosenParts[i],1);
        }
        // unselect all
        this.chosenParts.splice(0,this.chosenParts.length)
      },
      sendToLibrary : function() {
        this.$store.commit('store_viruses',this.newVirus);
        this.newVirus = null;
      }
    }
  }
</script>

<style scoped>
</style>
