<template>
  <div class="container">
    <!-- <div class="row pt-5" v-if="blockchain.length">
      <div class="col-4 mb-3" v-for="(block, index) in blockchain" :key="index">
        <Card :block="block" :index="index" />
      </div>
    </div>
    <b-alert show class="my-5" v-else>На данный момент блоков нет!</b-alert> -->
    <h2 class="pt-3">Список всех блокчейнов</h2>
    <hr>
    <!-- <pre>
      {{blockchains}}
    </pre> -->
    <div class="blockchains pt-3" v-if="blockchains.length">
      <BlockchainCard  v-for="(blockchainItem, index) in blockchains" :key="index" :blockchainItem="blockchainItem"/>
    </div>
     <b-alert show class="my-5" v-else>На данный момент блокчейнов нет!</b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  fetch() {},
  methods: {},
  computed: {
    ...mapGetters("blockchain", ["blockchain", "blockchains"]),
  },
};
</script>